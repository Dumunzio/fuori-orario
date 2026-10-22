/* Sale a tema: l'atrio, il varco dal museo, le tessere del territorio e gli strumenti comuni dei rompicapi.
   Ogni sala sta in un file suo (js/sale/<nome>.js) e si aggancia al gioco con registraSala().
   Usa il motore a stanze (STANZE, OGGETTI, entraStanza, vaiInStanza) e le primitive di disegno di motore.js,
   senza cambiarle. Area: sale. Vedi CLAUDE.md prima di modificare. */

/* ---------- Registro ---------- */
const SALE=[],SALA={};
// Posto di ogni sala nell'atrio, nell'ordine di registrazione: parete e casella del varco.
const ATRIO_POSTI=[['R',1],['R',3],['R',5],['R',7],['R',9],['R',11],['L',1],['L',3],['L',5],['L',7],['L',9]];
// Casella del pavimento davanti a un varco.
const davantiVarco=(lato,t)=>lato==='R'?[t,0]:[0,t];

/* ---------- Pianta del museo (js/pianta.js) ---------- */
// Con la pianta le sale si collegano tra loro a rami (bacheca 2026-10-23_0200); senza, si torna all'atrio.
const MODO_PIANTA=typeof PIANTA!=='undefined';
// Porte delle mie sale verso i figli nella pianta, sulla parete destra. La porta verso il genitore è sempre a sinistra, t=6.
const PORTE_FIGLI={tessitore:{citta:7},castello:{meneghello:4},forti:{mine:1,ferrarin:4,grotta:7},mine:{cimone:5},grotta:{anguane:6},anguane:{recoaro:5}};
const NOMI_STANZE={ingresso:'Ingresso',museo:'Museo',villa:'Sala delle Ville',uscita:'Uscita'};
const nomeStanza=id=>SALA[id]?SALA[id].nome:(typeof NOMI_PIANTA!=='undefined'&&NOMI_PIANTA[id])||NOMI_STANZE[id]||id;
// Il genitore di una stanza: il vicino più vicino all'ingresso (visita in ampiezza dalla stanza iniziale).
function genitore(id){
  if(!MODO_PIANTA)return null;
  const padre={[PIANTA.inizio]:null},coda=[PIANTA.inizio];
  while(coda.length){const a=coda.shift();PIANTA.vicini(a).forEach(b=>{if(!(b in padre)){padre[b]=a;coda.push(b)}})}
  return padre[id]??null;
}
// Porta il giocatore nella stanza a, davanti alla porta che riporta a da. Usa vaiVerso di pianta.js se c'è.
function _vaiVerso(da,a){
  if(typeof vaiVerso==='function')return vaiVerso(da,a);
  const p=PIANTA.porte&&PIANTA.porte[a]&&PIANTA.porte[a][da];
  vaiInStanza(a,...(p?davantiVarco(p.lato,p.t):[Math.floor((STANZE[a]?STANZE[a].w:8)/2),Math.floor((STANZE[a]?STANZE[a].h:8)/2)]));
}
// Porta nella stanza id dal suo genitore. Usa vaiInStanzaPianta di pianta.js se c'è; da fuori usate quella.
function _vaiDalGenitore(id){
  if(typeof vaiInStanzaPianta==='function')return vaiInStanzaPianta(id);
  const g=genitore(id);if(g)_vaiVerso(g,id);else vaiInStanza(id,1,1);
}

// Una sala: {id, nome, colore, benvenuto, stanza:{w,h,ox,oy,zona,pav,pareti,luci}, ritorno:{lato,t},
// oggetti, cartellini, tessera, aiuti, fonti, schede}. Vedi js/sale/tessitore.js come esempio.
function registraSala(s){
  SALE.push(s);SALA[s.id]=s;
  const st=Object.assign({porta:false,luci:()=>[]},s.stanza),pareti=st.pareti,luci=st.luci,targhe=s.oggetti.filter(o=>o.muro);
  let porte;
  if(MODO_PIANTA){
    // le porte di questa sala nella pianta: genitore a sinistra (t=6 come il vecchio ritorno), figli a destra
    const g=genitore(s.id);porte={};if(g)porte[g]={lato:s.ritorno.lato,t:s.ritorno.t};
    Object.entries(PORTE_FIGLI[s.id]||{}).forEach(([f,t])=>porte[f]={lato:'R',t});
    PIANTA.porte=PIANTA.porte||{};PIANTA.porte[s.id]=porte;
  }else{const [lato,t]=ATRIO_POSTI[SALE.length-1];s.posto={lato,t}}
  // le porte della pianta: quelle di pianta.js (pareteVarchiPianta, varchiPianta) se ci sono, altrimenti le disegno io
  const disegnaPorte=g=>{
    if(!MODO_PIANTA)return arcoVarco(g,s.ritorno.lato,s.ritorno.t,'#c9b98f');
    if(typeof pareteVarchiPianta==='function')return pareteVarchiPianta(g,s.id);
    Object.entries(porte).forEach(([v,p])=>arcoVarco(g,p.lato,p.t,SALA[v]?SALA[v].colore:'#c9b98f',MOTIVI[v]));
  };
  st.pareti=g=>{pareti(g);disegnaPorte(g);targhe.forEach(o=>targaMuro(g,o.muro.lato,o.muro.t,o.muro.colore))};
  // una luce calda sopra ogni cartellino appeso (con il motore che illumina gli oggetti a parete, ci pensa lui)
  st.luci=()=>typeof hitCartellino==='function'?luci():[...luci(),...targhe.map(o=>{const [cx,cy]=o.muro.lato==='R'?iso(o.muro.t,0):iso(0,o.muro.t);
    return o.muro.lato==='R'?[cx+6,cy-20,18,.7]:[cx-6,cy-18,18,.7]})];
  STANZE[s.id]=st;
  if(MODO_PIANTA){
    // gli oggetti varco si costruiscono quando servono: così valgono anche le porte dichiarate dopo (stanze di grafica-motore)
    const varchi=()=>typeof varchiPianta==='function'?varchiPianta(s.id):Object.entries(porte).map(([v,p])=>
      varco('porta-'+s.id+'-'+v,p.lato,p.t,'Varco: '+nomeStanza(v),()=>_vaiVerso(s.id,v),()=>typeof completata==='function'&&completata(v)));
    OGGETTI[s.id]=[...s.oggetti,...varchi()];
  }else{
    const {lato,t}=s.posto;
    OGGETTI[s.id]=[...s.oggetti,varco('ritorno-'+s.id,s.ritorno.lato,s.ritorno.t,'Varco: torna all\'atrio',()=>vaiInStanza('atrio',...davantiVarco(lato,t)))];
    OGGETTI.atrio.push(varco('varco-'+s.id,lato,t,'Varco: '+s.nome,()=>entraInSala(s.id),()=>!!tessereS()[s.id]));
  }
  Object.assign(PLAQUES,s.cartellini);
  Object.assign(FONTI,s.fonti);
  CONOSCENZA.push(...s.schede);
}
// Entra in una sala (dalla mappa, dalla guida): con la pianta arrivi davanti alla porta verso il suo genitore.
function entraInSala(id){
  const s=SALA[id];
  if(MODO_PIANTA)_vaiDalGenitore(id);else vaiInStanza(id,...davantiVarco(s.ritorno.lato,s.ritorno.t));
  benvenutoSala(id);
}
// Alla prima visita di una sala, il suo benvenuto. Con la pianta si entra anche dai varchi, quindi lo controllo a ogni cambio di stanza.
function benvenutoSala(id){
  const s=SALA[id];if(!s)return;const v=S.visitate||(S.visitate={});
  if(!v[id]){v[id]=true;say(s.nome,s.benvenuto)}
}
if(MODO_PIANTA){let ultima=null;setInterval(()=>{if(!S||!S.started||S.room===ultima)return;
  if(!$('dialog').hidden||!$('modal').hidden)return; // aspetto che dialogo e finestre siano chiusi
  ultima=S.room;benvenutoSala(S.room)},300)}

/* ---------- Varchi ---------- */
// Emblema di ogni sala sopra il suo arco nell'atrio (i motivi li disegna pareteVarco, in motore.js).
const MOTIVI={tessitore:'navetta',mine:'mina',cimone:'croce',forti:'torre',citta:'case',castello:'merli',
  ferrarin:'aereo',grotta:'fossile',anguane:'onde',meneghello:'libro',recoaro:'goccia'};
// Arco aperto nella parete (lato 'R' = parete destra, fila y=0; 'L' = parete sinistra, colonna x=0).
// Usa pareteVarco del motore quando c'è; se accetta il tema (colore e motivo) glielo passa,
// altrimenti aggiunge sopra la fascia colorata. Senza motore a varchi, disegna un arco suo.
function arcoVarco(g,lato,t,colore,motivo){
  if(typeof pareteVarco==='function'){
    if(pareteVarco.length>=4)return pareteVarco(g,lato,t,{colore,motivo});
    pareteVarco(g,lato,t);onWall(g,lato,t,3,9,47,5,()=>colore);return;
  }
  onWall(g,lato,t,1,11,40,40,(u,v)=>{
    const dx=u-5,dentro=v>=6?Math.abs(dx)<=3:dx*dx+(v-6)*(v-6)<=10,bordo=v>=5?Math.abs(dx)<=4:dx*dx+(v-6)*(v-6)<=20;
    if(dentro)return v>32?'#1a1428':'#0b0814';
    return bordo?(v%4===0?'#6f6553':'#8a7d66'):null});
  onWall(g,lato,t,3,9,47,5,()=>colore);
}
// Oggetto varco (o cartellino appeso) sulla parete. acceso: funzione facoltativa, vera quando il motore deve illuminarlo.
function varco(id,lato,t,name,act,acceso){
  const [x,y]=lato==='R'?[t,-1]:[-1,t];
  const o={id,x,y,name,act,hit:()=>{if(typeof hitVarco==='function')return hitVarco(lato,t);
    const [cx,cy]=lato==='R'?iso(t,0):iso(0,t);return lato==='R'?[cx+2,cy-38,10,40]:[cx-11,cy-36,10,40]}};
  if(acceso)o.acceso=acceso;
  return o;
}
// Font del testo del gioco, per i disegni su canvas (mappa, tubi): segue --body di style.css.
const fontTela=px=>px+'px '+(getComputedStyle(document.body).getPropertyValue('--body').trim()||'monospace');

/* ---------- Pareti e pavimenti delle sale ---------- */
// Ridipinge le due pareti della stanza corrente: chiaro a sinistra (illuminata), scuro a destra, zoccolo e cornice.
function tintaPareti(g,chiaro,scuro,zoccolo,cornice){
  const col=(c)=>(u,v)=>v<3?cornice:v>=WH-14?(v===WH-15?cornice:zoccolo):c;
  for(let x=0;x<MW;x++)onWall(g,'R',x,0,11,WH,WH,col(scuro));
  for(let y=0;y<MH;y++)onWall(g,'L',y,0,11,WH,WH,col(chiaro));
  g.fillStyle='#0f0b18';g.fillRect(OX,OY-WH,1,WH);
}
// Quadro con cornice dorata: fn(u,v,W,H) disegna l'interno.
const quadro=(g,lato,t,i0,i1,top,h,fn,cornice)=>onWall(g,lato,t,i0,i1,top,h,framed(fn,cornice));

/* ---------- Disegno: pezzi riutilizzabili ---------- */
// Tempo per le animazioni delle sale: fermo a 0 se il sistema chiede meno movimento (prefers-reduced-motion).
const MENO_MOTO=matchMedia('(prefers-reduced-motion: reduce)');
const tAnim=t=>MENO_MOTO.matches?0:t;
// Come spr() del motore, ma ogni cella è un quadrato di s pixel.
function sprS(rows,pal,x,y,s){rows.forEach((row,j)=>{for(let i=0;i<row.length;i++){const c=pal[row[i]];if(c)R(ctx,x+i*s,y+j*s,s,s,c)}})}
// Piedistallo di pietra; restituisce la quota del piano superiore.
function piedistallo(bx,by,h,c=['#8f8a7e','#6f6b61','#5a564e']){box(ctx,bx,by+1,7,3,h,...c);return by-h}
// Leggio con cartellino, come drawLectern ma con il colore della sala.
function leggio(colore){return o=>{const [bx,by]=base(o);
  diamond(ctx,bx,by+1,4,2,'rgba(0,0,0,.3)');R(ctx,bx-3,by-1,6,2,'#2b2416');R(ctx,bx-1,by-11,2,10,'#3d3320');
  R(ctx,bx-6,by-18,12,7,colore);R(ctx,bx-5,by-17,10,5,'#efe2c4');R(ctx,bx-4,by-16,8,1,'#8a7350');R(ctx,bx-4,by-14,6,1,'#8a7350')}}
function cartellino(id,k,x,y,colore,titolo){return {id,x,y,h:20,name:'Cartellino: '+titolo,draw:leggio(colore),act:()=>readPlaque(k),light:1}}
// Cartellino appeso alla parete (lato 'R' o 'L', casella t): si legge dalla casella davanti, come un varco.
// Con il motore di grafica-motore usa la sua targa (pareteCartellino, hitCartellino) e la sua luce (light:1),
// così il gioco ha un solo stile di cartellino; senza, usa la targa qui sotto.
function cartellinoMuro(id,k,lato,t,colore,titolo){const o=varco(id,lato,t,'Cartellino: '+titolo,()=>readPlaque(k));o.muro={lato,t,colore};
  if(typeof hitCartellino==='function'){o.hit=()=>hitCartellino(lato,t);o.light=1}return o}
function targaMuro(g,lato,t,colore){
  if(typeof pareteCartellino==='function')return pareteCartellino(g,lato,t);
  onWall(g,lato,t,2,10,33,14,(u,v,W,H)=>u===0||u===W||v===0||v===H-1?colore:(v%3===1&&u>1&&u<W-1?'#8a7350':'#efe2c4'));
  onWall(g,lato,t,5,7,35,2,()=>'#b8892f');
}

/* ---------- Atrio ---------- */
// Solo senza la pianta del museo: con la pianta l'atrio non esiste, così una partita salvata lì riparte dall'ingresso.
const STANZA_ATRIO={w:13,h:11,ox:148,oy:64,porta:false,
  zona:(x,y)=>(x+y)%4<2?'a':'b',
  pav:{a:['#8a8378','#827b70','#5f5950'],b:['#77706a','#6f6862','#5f5950','#9a9286']},
  pareti(g){
    tintaPareti(g,'#5d5a6e','#46435a','#2e2b3c','#b8892f');
    SALE.forEach(s=>arcoVarco(g,s.posto.lato,s.posto.t,s.colore,MOTIVI[s.id]));
  },
  // luce diffusa su tutto l'atrio, più una luce per ogni varco: così gli archi si vedono anche da lontano
  luci(){const [mx,my]=iso(6,5);return [[mx,my-10,150,.45],...SALE.map(s=>{const [cx,cy]=s.posto.lato==='R'?iso(s.posto.t,0):iso(0,s.posto.t);
    return s.posto.lato==='R'?[cx+7,cy-16,22,.8]:[cx-6,cy-14,22,.8]})]}};
function drawScala(o){const [bx,by]=base(o);
  for(let k=0;k<4;k++)box(ctx,bx,by+1-k*0,11-k*2,5-k,2+k*3,k%2?'#7a6e5c':'#8a7e6a','#5f5545','#4c4437');
  R(ctx,bx-2,by-16,4,4,'#e0b04f')}
function drawGuida(o){const [bx,by]=base(o);
  box(ctx,bx,by+1,8,4,6,'#5a3e2a','#46301f','#3a2818');R(ctx,bx-1,by-24,2,18,'#3a2818');
  R(ctx,bx-9,by-34,18,12,'#b8892f');R(ctx,bx-8,by-33,16,10,'#24345a');
  SALE.forEach((s,i)=>R(ctx,bx-7+(i%6)*2.5|0,by-31+((i/6)|0)*4,2,2,tessereS()[s.id]?'#e0b04f':s.colore))}
const OGGETTI_ATRIO=[
  {id:'scalaMuseo',x:6,y:10,h:18,name:'Scala: torna al museo',draw:drawScala,act:()=>vaiInStanza('museo',6,0)},
  {id:'guidaSale',x:6,y:5,h:34,name:'Guida alle sale',draw:drawGuida,act:()=>apriGuida(),light:1}
];
if(!MODO_PIANTA){STANZE.atrio=STANZA_ATRIO;OGGETTI.atrio=[...OGGETTI_ATRIO]}

/* ---------- Dal museo all'atrio ---------- */
// Varco sulla parete destra del museo, casella 6 (tra il ritratto e il plastico del Pasubio).
// Con la pianta del museo l'atrio non c'è: le sale si raggiungono dall'ingresso. Il codice dell'atrio resta per una seconda ala.
if(!MODO_PIANTA){
  const pareti=STANZE.museo.pareti;
  STANZE.museo.pareti=g=>{pareti(g);arcoVarco(g,'R',6,'#e0b04f')};
  OGGETTI.museo.push(varco('varcoAtrio','R',6,'Varco: le sale del territorio',()=>{
    vaiInStanza('atrio',6,9);
    const v=S.visitate||(S.visitate={});
    if(!v.atrio){v.atrio=true;say('Atrio delle sale',[
      `Qui comincia il museo del territorio: ${SALE.length} sale, una per ogni storia dell'Alto Vicentino.`,
      'Ogni sala ha un rompicapo. Risolvilo e avrai la sua tessera, con la foto vera del luogo.',
      'Ogni arco porta a una sala. Il leggio al centro è la guida: elenca tutte le sale e ti ci porta.',
      tesserePerUscire()?`Attenzione: la porta d'uscita del museo si apre solo con tutte le ${SALE.length} tessere, oltre ai sigilli.`:'Le tessere sono la tua collezione.'])}
  }));
}

/* ---------- Tessere del territorio ---------- */
const tessereS=()=>S.tessere||(S.tessere={});
const tessereN=()=>SALE.filter(s=>tessereS()[s.id]).length;
function concediTessera(id){
  const s=SALA[id];if(tessereS()[id])return;
  tessereS()[id]=true;hudTessere();
  note('tessera-'+id,s.tessera.titolo,'Tessera · '+s.nome,s.tessera.testo,true);
  mostraTessera(id,true);
}
function fotoCredito(f){return `Foto: ${f.autore} · ${f.licenza} · <a href="${f.pagina}" target="_blank" rel="noopener">Wikimedia Commons</a>`}
// Le tessere prese, nell'ordine delle sale, per la schermata finale (enigmi.js): dati della sala e della foto.
// {id, nome, colore, motivo, titolo, foto:{file, alt, autore, licenza, pagina}}
const tessereImmagini=()=>SALE.filter(s=>tessereS()[s.id]).map(s=>({id:s.id,nome:s.nome,colore:s.colore,motivo:MOTIVI[s.id],
  titolo:s.tessera.titolo,foto:{...s.tessera.foto}}));
// Come tessereImmagini, ma con la foto già caricata in img (Image), pronta per drawImage su un canvas.
// Una foto che non si carica ha img null: la schermata disegna al suo posto il colore della sala.
// Nota: aperto da file locale, il canvas con le foto non si può esportare (toBlob); via http(s) sì.
const caricaTessereImmagini=()=>Promise.all(tessereImmagini().map(t=>new Promise(fatto=>{
  const img=new Image();img.onload=()=>fatto({...t,img});img.onerror=()=>fatto({...t,img:null});img.src=t.foto.file})));
function mostraTessera(id,nuova){
  const s=SALA[id],T=s.tessera;
  openModal(`<div class="eyebrow">${nuova?'Nuova tessera · ':''}Tessera ${SALE.indexOf(s)+1} di ${SALE.length}</div>
    <h2>${T.titolo}</h2>
    <figure class="sl-foto${nuova?' sl-nuova':''}"><img src="${T.foto.file}" alt="${T.foto.alt}"><figcaption>${fotoCredito(T.foto)}</figcaption></figure>
    <p>${T.testo}</p>
    ${fonteHtml('tessera-'+id)}
    <div class="row end">${nuova?`<span class="eyebrow">Tessere: ${tessereN()} su ${SALE.length}</span>`:''}${typeof apriMappa==='function'?'<button type="button" id="slMappa">Vedi sulla mappa</button>':''}<button type="button" id="slColl">Collezione</button>${closeBtn}</div>`);
  $('slColl').onclick=apriCollezione;
  // la mappa del territorio (js/territorio.js) seleziona il luogo della sala, se apriMappa accetta l'id
  if($('slMappa'))$('slMappa').onclick=()=>apriMappa(id);
}
// Dove si trovano le sale: con la pianta partono dall'ingresso, senza dal varco del museo.
const doveSale=()=>MODO_PIANTA?'Le trovi nei rami del museo che partono dall\'ingresso.':'Le trovi passando dal varco sulla parete destra del museo.';
function apriCollezione(){
  openModal(`<div class="eyebrow">Tessere del territorio · ${tessereN()} su ${SALE.length}</div><h2>La tua collezione</h2>
    <p>Ogni sala del territorio nasconde una tessera. ${doveSale()}${tesserePerUscire()?` Per uscire dal museo servono tutte e ${SALE.length}.`:''}</p>
    <div class="sl-collezione">${SALE.map(s=>tessereS()[s.id]
      ?`<button type="button" class="sl-t" data-id="${s.id}" style="--c:${s.colore}"><img src="${s.tessera.foto.file}" alt=""><span>${s.tessera.titolo}</span></button>`
      :`<div class="sl-t sl-chiusa" style="--c:${s.colore}"><b>?</b><span>${s.nome}</span></div>`).join('')}</div>
    <div class="row end">${closeBtn}</div>`);
  $('card').querySelectorAll('.sl-t[data-id]').forEach(b=>b.onclick=()=>mostraTessera(b.dataset.id,false));
}
// Elenco delle sale, con il colore del loro arco e un pulsante per entrare.
function apriGuida(){
  openModal(`<div class="eyebrow">Atrio · ${SALE.length} sale · tessere ${tessereN()} su ${SALE.length}</div><h2>Guida alle sale</h2>
    <p>Ogni arco dell'atrio porta a una sala: il colore della fascia sopra l'arco è quello qui accanto al nome. Puoi anche entrare da qui.</p>
    <div class="sl-scelte" id="slGuida">${SALE.map(s=>`<button type="button" data-id="${s.id}" style="display:flex;gap:10px;align-items:center"><span style="width:14px;height:14px;background:${s.colore};flex:none"></span><span style="flex:1">${s.nome}</span><span class="eyebrow">${tessereS()[s.id]?'tessera presa':'da fare'} · Vai</span></button>`).join('')}</div>
    <div class="row end"><button type="button" id="slColl">Collezione</button>${closeBtn}</div>`);
  $('slGuida').onclick=e=>{const b=e.target.closest('button');if(b){closeModal();entraInSala(b.dataset.id)}};
  $('slColl').onclick=apriCollezione;
}
// Riscrive il contatore solo quando cambia il numero: così non si rincorre con la traduzione inglese (js/lingua.js),
// che sostituisce il testo italiano con quello tradotto.
let _tessereMostrate=null;
function hudTessere(){const b=$('btnTessere'),n=tessereN()+'/'+SALE.length;
  if(b&&(n!==_tessereMostrate||!b.textContent)){_tessereMostrate=n;b.textContent=`Tessere ${n}`}}
{
  const b=document.createElement('button');b.id='btnTessere';b.type='button';
  b.onclick=()=>{if(S.started&&$('modal').hidden&&$('dialog').hidden)apriCollezione()};
  $('btnJournal').before(b);
  // Il conteggio si aggiorna da solo: così resta giusto anche dopo "Gioca ancora" o una ricarica.
  setInterval(hudTessere,400);setTimeout(hudTessere,0);
}

/* ---------- Per gli altri file (enigmi.js) ---------- */
// Per uscire dal museo servono tutte le tessere. Restituisce le righe da far dire alla porta se ne manca qualcuna,
// altrimenti null. Pensato per tryDoor(): const b=typeof bloccoUscita==='function'&&bloccoUscita();if(b)return say('Porta d\'uscita',b);
// Vero quando la porta (tryDoor, in enigmi.js) controlla le tessere: i testi delle sale lo dicono solo allora.
// (enigmi.js lo fa con tessereMancanti(), che chiama bloccoUscita; il secondo controllo copre una porta che la chiama direttamente)
const tesserePerUscire=()=>typeof tessereMancanti==='function'||(typeof tryDoor==='function'&&String(tryDoor).includes('bloccoUscita'));
function bloccoUscita(){
  const mancano=SALE.filter(s=>!tessereS()[s.id]);if(!mancano.length)return null;
  return [`Sulla porta c'è un'altra serratura: ha ${SALE.length} incavi, uno per ogni tessera del territorio. Ne hai ${SALE.length-mancano.length}.`,
    mancano.length<=3?`Ti mancano: ${mancano.map(s=>s.nome).join(', ')}.`:`Ti mancano ${mancano.length} sale. ${doveSale()}`];
}
// Se sei in una sala a tema, mostra il primo aiuto del suo rompicapo e restituisce true.
// Pensato per hint(): if(typeof aiutoSala==='function'&&aiutoSala())return;
function aiutoSala(){
  const s=SALA[S.room];if(!s)return false;
  say(s.nome,tessereS()[s.id]?['Hai già la tessera di questa sala.',MODO_PIANTA?'Le porte accese portano alle stanze che hai già finito: segui le altre.':'Torna all\'atrio per le altre.']:[s.aiuti[0],'Nella finestra del rompicapo il pulsante Aiuto ti dà altri indizi.']);
  return true;
}
// Html con le tessere raccolte, per la schermata finale (win).
function riepilogoTessere(){
  const prese=SALE.filter(s=>tessereS()[s.id]);
  return `<p class="eyebrow">Tessere del territorio · ${prese.length} su ${SALE.length}</p>`+(prese.length
    ?`<div class="sl-collezione">${prese.map(s=>`<div class="sl-t" style="--c:${s.colore}"><img src="${s.tessera.foto.file}" alt=""><span>${s.tessera.titolo}</span></div>`).join('')}</div>`
    :`<p>Nessuna tessera, questa volta. ${doveSale()}</p>`);
}

/* ---------- Rompicapi: finestra comune ---------- */
// Apre la finestra del rompicapo di una sala. corpo = html; poi chiama monta() per collegare gli eventi.
function finestraSala(id,titolo,corpo,monta){
  const s=SALA[id];let aiuto=0;
  openModal(`<div class="eyebrow">Rompicapo · ${s.nome}</div><h2>${titolo}</h2>${corpo}
    <div class="msg" id="msg">&nbsp;</div>
    <div class="row end"><button type="button" id="slAiuto">Aiuto</button>${closeBtn}</div>`);
  $('slAiuto').onclick=()=>{const m=$('msg');m.className='msg';m.textContent=s.aiuti[Math.min(aiuto,s.aiuti.length-1)];aiuto++};
  monta&&monta();
}
// Rompicapo risolto: messaggio e pulsante per prendere la tessera.
function risoltoSala(id,msg){
  const m=$('msg');m.textContent=msg;m.className='msg good';
  const row=$('card').querySelector('.row.end');row.innerHTML='<button class="primary" type="button" id="slPrendi">Prendi la tessera</button>';
  $('slPrendi').focus();$('slPrendi').onclick=()=>{closeModal();concediTessera(id)};
}
// Azione dell'oggetto principale di una sala: rompicapo se manca la tessera, altrimenti un ricordo.
const oggettoSala=(id,apri,fatto)=>()=>tessereS()[id]?say(SALA[id].nome,[fatto]):apri();
// Mescola un array in modo ripetibile (stesso ordine a ogni partita): niente sorprese tra un tentativo e l'altro.
function mescola(a,seme=7){a=a.slice();for(let i=a.length-1;i>0;i--){seme=(seme*9301+49297)%233280;const j=Math.floor(seme/233280*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}

/* ---------- Stile dei rompicapi e della collezione ---------- */
{
  const st=document.createElement('style');st.textContent=`
#btnTessere{white-space:nowrap}
.sl-foto{margin:0;display:grid;gap:4px}
.sl-foto img{width:100%;max-height:280px;object-fit:cover;border:2px solid var(--line);image-rendering:auto}
.sl-foto figcaption{font-size:15px;color:var(--muted)}
.sl-collezione{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:8px}
.sl-t{position:relative;aspect-ratio:3/4;padding:0;border:3px solid var(--c);background:#120e1c;display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;text-transform:none;letter-spacing:0;box-shadow:3px 3px 0 #000}
.sl-t img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.sl-t span{position:relative;font-family:var(--body);font-size:17px;line-height:1;padding:4px 5px;background:linear-gradient(transparent,rgba(10,8,18,.9));text-align:left}
.sl-chiusa b{position:absolute;inset:0;display:grid;place-items:center;font-family:var(--display);font-size:34px;color:var(--c)}
.sl-chiusa span{color:var(--muted);background:none}
.sl-scelte{display:grid;gap:6px}
.sl-scelte button{text-transform:none;font-family:var(--body);font-size:20px;letter-spacing:0;text-align:left;padding:7px 10px}
.sl-scelte button.on{border-color:var(--brass);background:#3a2f12}
.sl-scelte button.ok{border-color:var(--ok);color:var(--ok);cursor:default}
.sl-griglia{display:grid;gap:4px;width:max-content;max-width:100%}
.sl-griglia button{min-width:40px;min-height:40px;padding:0;font-size:18px;text-transform:none}
.sl-tela{display:block;width:100%;max-width:480px;image-rendering:pixelated;border:2px solid var(--line);background:#0b0814;touch-action:none}
.sl-dial{display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end}
.sl-dial div{display:grid;gap:4px;justify-items:center}
.sl-dial b{font-family:var(--display);font-size:13px;color:var(--muted);letter-spacing:.08em}
.sl-dial output{font-family:var(--display);font-size:26px;min-width:2.6em;text-align:center;background:#0f1a12;color:#9fe0a6;border:2px solid var(--line);padding:2px 6px}
.sl-dial button{padding:2px 10px;font-size:16px}
.sl-carte{display:grid;gap:6px}
.sl-carte button{text-transform:none;font-family:var(--body);font-size:19px;letter-spacing:0;text-align:left;padding:6px 10px;display:grid;grid-template-columns:auto 1fr auto;gap:10px;align-items:baseline}
.sl-carte .amo{font-family:var(--display);font-size:13px;color:var(--brass)}
.sl-cesti{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.sl-cesti>div{border:2px dashed var(--line);padding:8px;min-height:80px;display:grid;gap:6px;align-content:start}
.sl-cesti h3{margin:0;font-family:var(--display);font-size:14px;color:var(--brass)}
.sl-giornale{background:#efe2c4;color:#2a2030;padding:10px 12px;border:2px solid #8a7350;display:grid;gap:6px}
.sl-giornale h3{margin:0;font-family:var(--display);font-size:18px;color:#2a2030;text-transform:uppercase}
.sl-giornale button{background:transparent;color:#2a2030;border:2px solid transparent;box-shadow:none;text-transform:none;font-family:var(--body);font-size:20px;letter-spacing:0;text-align:left;padding:2px 4px}
.sl-giornale button.on{border-color:#c2493c;text-decoration:line-through;text-decoration-color:#c2493c}
@media (max-width:520px){.sl-cesti{grid-template-columns:1fr}}
/* tessera appena presa: entra con un piccolo salto e un lampo dorato */
.sl-nuova img{animation:slEntra .7s cubic-bezier(.2,.9,.3,1.25) both}
.sl-nuova{animation:slLampo 1.2s ease-out both}
@keyframes slEntra{from{transform:scale(.82) rotate(-2deg);filter:brightness(1.8) saturate(.4);opacity:0}to{transform:none;filter:none;opacity:1}}
@keyframes slLampo{0%{box-shadow:0 0 0 0 rgba(224,176,79,.9)}100%{box-shadow:0 0 0 14px rgba(224,176,79,0)}}
.sl-t[data-id]{transition:transform .15s}
.sl-t[data-id]:hover,.sl-t[data-id]:focus-visible{transform:translateY(-3px)}
@media (prefers-reduced-motion:reduce){.sl-nuova,.sl-nuova img{animation:none}.sl-t[data-id]{transition:none}}
`;document.head.appendChild(st);
}
