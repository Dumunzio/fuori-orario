/* Lingua: il gioco in italiano o in inglese, con il pulsante IT/EN.
   Non cambia i testi degli altri file: li traduce mentre vengono mostrati (dialoghi, finestre, HUD, tela),
   usando il dizionario LINGUA_EN di lingua-en.js. Partita e diario restano salvati in italiano,
   così si può cambiare lingua in ogni momento. Va caricato dopo tutte le sale e prima di avvio.js.
   Prova sul ramo lingua. Vedi CLAUDE.md. */
{
const CHIAVE='fuoriOrario.lingua';
let lingua=(()=>{try{return new URLSearchParams(location.search).get('lang')||localStorage.getItem(CHIAVE)||'it'}catch(e){return 'it'}})();
if(lingua!=='en')lingua='it';

/* ---------- Dizionario ---------- */
const norm=s=>s.replace(/\s+/g,' ').trim();
const D=new Map(),MODELLI=[];
for(const [it,en] of Object.entries(typeof LINGUA_EN!=='undefined'?LINGUA_EN:{})){
  if(it===en)continue;
  if(it.includes('{}'))MODELLI.push({re:new RegExp('^'+it.split('{}').map(p=>p.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('(.+?)')+'$'),en,fisso:it.replace(/\{\}/g,'').length});
  else D.set(it,en);
}
// prima i modelli con più testo fisso: «Rompicapo · {}» non deve vincere su una frase più precisa
MODELLI.sort((a,b)=>b.fisso-a.fisso);
// i cartellini finiscono nel diario con le righe unite: aggiungo anche le frasi intere
const unisci=o=>{if(!o||typeof o!=='object')return;
  if(Array.isArray(o)&&o.length>1&&o.every(s=>typeof s==='string'&&D.has(s)))D.set(o.join(' '),o.map(s=>D.get(s)).join(' '));
  Object.values(o).forEach(unisci)};
[typeof PLAQUES!=='undefined'&&PLAQUES,typeof SALA!=='undefined'&&SALA,typeof LUOGHI_REALI!=='undefined'&&LUOGHI_REALI].forEach(unisci);

// Traduce una frase; se non la conosce prova i modelli con {} e i pezzi separati da « · ».
function tr(s,prof=0){
  if(lingua!=='en'||typeof s!=='string'||!/[A-Za-zÀ-ÿ]/.test(s))return s;
  const n=norm(s);if(!n)return s;
  let r=D.get(n);
  if(r===undefined&&prof<3)for(const m of MODELLI){const x=n.match(m.re);if(x){let k=1;r=m.en.replace(/\{\}/g,()=>tr(x[k++],prof+1));break}}
  if(r===undefined&&prof<3&&n.includes(' · ')){const p=n.split(' · ').map(t=>tr(t,prof+1));if(p.join(' · ')!==n)r=p.join(' · ')}
  // un simbolo davanti alla frase («✓ Ingresso», «▲ 3»): traduco quello che segue
  if(r===undefined&&prof<3){const x=n.match(/^([^A-Za-zÀ-ÿ0-9«“"']+)(.+)$/);if(x){const t=tr(x[2],prof+1);if(t!==x[2])r=x[1]+t}}
  if(r===undefined)return s;
  return s.match(/^\s*/)[0]+r+s.match(/\s*$/)[0];
}
// Da inglese a italiano, per le domande d'esempio del custode
const inverso=()=>{const m=new Map();D.forEach((en,it)=>m.set(en,it));return m};

/* ---------- Testi della pagina ---------- */
const orig=new WeakMap();   // nodo di testo -> {it, mostrato}
const origAttr=new WeakMap(); // elemento -> {attributo: it}
const ATTR=['aria-label','placeholder','title','alt'];
const escluso=el=>el&&el.closest&&el.closest('[data-nolingua],#dText,#dWho,script,style');
function testo(nodo){
  if(escluso(nodo.parentElement))return;
  const o=orig.get(nodo);
  if(o&&nodo.data===o.mostrato)return;
  const it=nodo.data,en=tr(it);
  orig.set(nodo,{it,mostrato:en});
  if(en!==it)nodo.data=en;
}
function attributi(el){
  if(escluso(el))return;
  let o=origAttr.get(el);if(!o){o={};origAttr.set(el,o)}
  for(const a of ATTR){if(!el.hasAttribute(a))continue;const v=el.getAttribute(a);
    if(o[a]&&v===o[a].mostrato)continue;const en=tr(v);o[a]={it:v,mostrato:en};if(en!==v)el.setAttribute(a,en)}
}
function percorri(radice){
  if(radice.nodeType===3)return testo(radice);
  if(radice.nodeType!==1)return;
  attributi(radice);
  const w=document.createTreeWalker(radice,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);
  for(let n=w.nextNode();n;n=w.nextNode())n.nodeType===3?testo(n):attributi(n);
}
// Torna all'italiano: rimette i testi originali
function ripristina(radice){
  const w=document.createTreeWalker(radice,NodeFilter.SHOW_TEXT|NodeFilter.SHOW_ELEMENT);
  for(let n=w.nextNode();n;n=w.nextNode()){
    if(n.nodeType===3){const o=orig.get(n);if(o&&n.data===o.mostrato)n.data=o.it;orig.delete(n)}
    else{const o=origAttr.get(n);if(o)for(const a in o)if(n.getAttribute(a)===o[a].mostrato)n.setAttribute(a,o[a].it);origAttr.delete(n)}
  }
}
new MutationObserver(lista=>{if(lingua!=='en')return;
  for(const m of lista){
    if(m.type==='characterData')testo(m.target);
    else if(m.type==='attributes')attributi(m.target);
    else m.addedNodes.forEach(percorri);
  }
}).observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:ATTR});

/* ---------- Dialoghi, avvisi e tela ---------- */
// Il dialogo scrive una lettera alla volta: la frase va tradotta prima, intera.
const sayIt=say;say=(chi,righe,poi)=>sayIt(tr(chi),righe.map(r=>tr(r)),poi);
const toastIt=toast;toast=msg=>toastIt(tr(msg));
for(const f of ['fillText','strokeText']){const o=CanvasRenderingContext2D.prototype[f];
  CanvasRenderingContext2D.prototype[f]=function(t,...a){return o.call(this,lingua==='en'?tr(t):t,...a)}}
// Le domande d'esempio del custode: il custode capisce l'italiano, quindi gli passo la domanda originale.
document.addEventListener('click',e=>{if(lingua!=='en')return;const b=e.target.closest('#cEsempi button');if(!b)return;
  const it=inverso().get(norm(b.textContent));if(it)b.textContent=it},true);

/* ---------- Pulsante IT / EN ---------- */
const TITOLO={it:'Switch to English',en:"Passa all'italiano"};
function applica(){
  document.documentElement.lang=lingua;
  document.title=lingua==='en'?tr('Fuori Orario'):'Fuori Orario';
  document.querySelectorAll('.btnLingua').forEach(b=>{b.textContent=lingua==='en'?'IT':'EN';b.title=b.ariaLabel=TITOLO[lingua]});
  if(lingua==='en')percorri(document.body);else ripristina(document.body);
}
function cambiaLingua(l){
  lingua=l==='en'?'en':'it';try{localStorage.setItem(CHIAVE,lingua)}catch(e){}
  applica();toast(lingua==='en'?'Language: English':'Lingua: italiano');
}
const st=document.createElement('style');
st.textContent='.btnLingua{min-width:3em}#title .btnLingua{position:absolute;top:12px;right:12px}';
document.head.appendChild(st);
const crea=()=>{const b=document.createElement('button');b.type='button';b.className='btnLingua';b.dataset.nolingua='';
  b.onclick=()=>cambiaLingua(lingua==='en'?'it':'en');return b};
$('btnHint').after(crea());
$('title').appendChild(crea());
applica();
window.cambiaLingua=cambiaLingua;window.tr=tr;
}
