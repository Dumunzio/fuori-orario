/* La piantina interattiva dell'ingresso: le stanze del museo e i loro collegamenti, da PIANTA (js/pianta.js).
   Le stanze completate hanno il segno dorato, quella dove sei è evidenziata. Si apre con apriPianta().
   Stile come la mappa del territorio (.mp-*), più le classi .pv-*. Va caricato dopo pianta.js e dopo le sale. Vedi CLAUDE.md. */
{
const PV={w:480,h:400,m:30};
const PV_COLORI={museo:'#efe2c4',lana:'#c2493c',storia:'#a99cc4',guerra:'#86826f',acque:'#4f7a9a'};
const PV_NOMI={ingresso:'Ingresso',museo:'Museo',villa:'Sala delle Ville',uscita:'Uscita'};
const pvNome=id=>(typeof SALA!=='undefined'&&SALA[id]&&SALA[id].nome)||(typeof NOMI_PIANTA!=='undefined'&&NOMI_PIANTA[id])||PV_NOMI[id]||id;
const pvStanze=()=>Object.keys(PIANTA.posti);

// Dal disegno (0-100) alla tela, con un margine. È uno schema, non una pianta in scala: si allarga in larghezza
// e in altezza separatamente, così le stanze vicine nel disegno non si coprono.
function pvXY(id){
  const P=Object.values(PIANTA.posti),x0=Math.min(...P.map(p=>p.x)),x1=Math.max(...P.map(p=>p.x)),y0=Math.min(...P.map(p=>p.y)),y1=Math.max(...P.map(p=>p.y));
  const p=PIANTA.posti[id];
  return [Math.round(PV.m+(p.x-x0)/(x1-x0)*(PV.w-2*PV.m)),Math.round(PV.m+(p.y-y0)/(y1-y0)*(PV.h-2*PV.m))];
}
// Quante stanze servono per arrivare a id dall'ingresso: il genitore di una stanza è il vicino più vicino all'ingresso.
function pvDistanze(){
  const d={[PIANTA.inizio]:0},coda=[PIANTA.inizio];
  while(coda.length){const s=coda.shift();PIANTA.vicini(s).forEach(v=>{if(!(v in d)){d[v]=d[s]+1;coda.push(v)}})}
  return d;
}
const pvGenitore=id=>{const d=pvDistanze();return PIANTA.vicini(id).find(v=>d[v]<d[id])||null};

// Le stanze che hai già visto: si ricordano in S.stanzeViste (si salva con il resto di S). Non tocca entraStanza.
const pvViste=()=>S.stanzeViste||(S.stanzeViste={});
setInterval(()=>{if(S&&S.started&&S.room&&PIANTA.posti[S.room])pvViste()[S.room]=true},500);

// Cosa manca per completare una stanza, in una frase intera.
function pvManca(id){
  if(completata(id))return id==='ingresso'?'Da qui comincia la visita.':'Completata.';
  if(id==='uscita'){
    const ks=Object.keys(SEALS),s=ks.filter(k=>S.seals[k]).length;
    const T=typeof SALA!=='undefined'?Object.keys(SALA).length:0,t=typeof tessereS==='function'?Object.keys(tessereS()).filter(k=>tessereS()[k]).length:0;
    return `La porta si apre con tutti i sigilli e tutte le tessere. Sigilli: ${s} su ${ks.length}.`+(T?` Tessere: ${t} su ${T}.`:'');
  }
  if(SIGILLI_STANZA[id]){const m=SIGILLI_STANZA[id].filter(k=>!S.seals[k]).map(k=>SEALS[k].title);
    return m.length===1?`Manca il ${m[0]}.`:`Mancano: ${m.join(', ')}.`}
  return 'Manca la tessera di questa sala.';
}
// Porta nella stanza id, davanti alla porta verso il suo genitore.
function pvVai(id){
  if(typeof vaiInStanzaPianta==='function')return vaiInStanzaPianta(id);
  if(typeof SALA!=='undefined'&&SALA[id]&&typeof entraInSala==='function')return entraInSala(id);
}
const pvPuoiAndare=id=>id!==S.room&&!!pvViste()[id]&&(typeof vaiInStanzaPianta==='function'||(typeof SALA!=='undefined'&&!!SALA[id]&&typeof entraInSala==='function'));

// t: tempo dell'animazione; la stanza dove sei ha un anello che si allarga piano.
function disegnaPianta(tela,scelto,t){
  const g=tela.getContext('2d');
  g.fillStyle='#211b33';g.fillRect(0,0,PV.w,PV.h);
  // pavimento a scacchi di 2 pixel, come la mappa
  g.fillStyle='#262040';for(let y=0;y<PV.h;y+=4)for(let x=(y/4)%2*2;x<PV.w;x+=4)g.fillRect(x,y,2,2);
  // collegamenti: un varco tra due stanze
  PIANTA.collegamenti.forEach(([a,b])=>{const [ax,ay]=pvXY(a),[bx,by]=pvXY(b);
    g.lineCap='square';g.strokeStyle='#15111f';g.lineWidth=8;g.beginPath();g.moveTo(ax,ay);g.lineTo(bx,by);g.stroke();
    g.strokeStyle=PV_COLORI[PIANTA.posti[b].ramo]||'#efe2c4';g.lineWidth=3;g.stroke()});
  pvStanze().forEach(id=>{
    const [x,y]=pvXY(id),fatta=completata(id),qui=id===S.room,sel=id===scelto,r=sel?12:10;
    if(qui&&t!=null){const f=(t%1500)/1500,R=r+4+Math.round(f*10);g.globalAlpha=1-f;g.strokeStyle='#fff3c4';g.lineWidth=2;g.strokeRect(x-R,y-R,2*R,2*R);g.globalAlpha=1}
    if(sel||qui){g.fillStyle='#fff3c4';g.fillRect(x-r-4,y-r-4,2*r+8,2*r+8)}
    g.fillStyle='#15111f';g.fillRect(x-r-2,y-r-2,2*r+4,2*r+4);
    g.fillStyle=fatta?'#e0b04f':'#4b3f6e';g.fillRect(x-r,y-r,2*r,2*r);
    g.fillStyle=PV_COLORI[PIANTA.posti[id].ramo]||'#efe2c4';g.fillRect(x-r+3,y-r+3,2*r-6,2*r-6);
    // segno dorato: un rombo al centro delle stanze completate
    if(fatta){g.fillStyle='#15111f';g.beginPath();g.moveTo(x,y-6);g.lineTo(x+6,y);g.lineTo(x,y+6);g.lineTo(x-6,y);g.fill();
      g.fillStyle='#e0b04f';g.beginPath();g.moveTo(x,y-4);g.lineTo(x+4,y);g.lineTo(x,y+4);g.lineTo(x-4,y);g.fill()}
    // il giocatore: un omino di pixel sopra la stanza dove sei
    if(qui){g.fillStyle='#15111f';g.fillRect(x-4,y-r-15,8,12);g.fillStyle='#efe2c4';g.fillRect(x-2,y-r-14,4,4);g.fillStyle='#c2493c';g.fillRect(x-3,y-r-9,6,5)}
  });
  // il nome della stanza scelta, sotto la stanza
  if(scelto){const [x,y]=pvXY(scelto),font=getComputedStyle(document.body).getPropertyValue('--body').trim()||'monospace',n=pvNome(scelto);
    g.font='16px '+font;const w=g.measureText(n).width,tx=Math.max(4,Math.min(PV.w-w-4,x-w/2)),ty=y+30>PV.h-4?y-20:y+30;
    g.lineWidth=3;g.lineJoin='round';g.strokeStyle='#15111f';g.strokeText(n,tx,ty);g.fillStyle='#f0e6cf';g.fillText(n,tx,ty)}
}
function schedaStanza(id){
  const gen=pvGenitore(id),dopo=PIANTA.vicini(id).filter(v=>v!==gen);
  return `<span class="eyebrow">${PIANTA.rami[PIANTA.posti[id].ramo]}${id===S.room?' · sei qui':''}</span><h3>${pvNome(id)}</h3>
    <p>${pvManca(id)}</p>
    ${gen?`<p class="mp-link">Ci arrivi da: ${pvNome(gen)}.</p>`:''}
    ${dopo.length?`<p class="mp-link">Da qui vai a: ${dopo.map(pvNome).join(', ')}.</p>`:''}
    ${pvPuoiAndare(id)?`<div class="row"><button type="button" data-vai="${id}">Vai qui</button></div>`
      :id!==S.room&&!pvViste()[id]?'<p class="mp-link">Non l\'hai ancora visitata: trovala attraversando i varchi.</p>':''}`;
}
function apriPianta(id){
  const L=pvStanze(),n=L.filter(completata).length;
  let scelto=null;
  // elenco per tastiera e lettori di schermo, diviso per ramo
  const lista=Object.keys(PIANTA.rami).map(r=>`<span class="eyebrow mp-sotto">${PIANTA.rami[r]}</span>`+
    L.filter(s=>PIANTA.posti[s].ramo===r).map(s=>`<button type="button" data-s="${s}" class="${completata(s)?'mp-sc':''}"><i style="--pv:${PV_COLORI[r]}"></i>${pvNome(s)}</button>`).join('')).join('');
  openModal(`<div class="eyebrow">Piantina · ${n} stanze completate su ${L.length}</div><h2>Il museo</h2>
    <p>Ogni quadrato è una stanza, ogni linea un varco. Il colore dice il ramo del museo, il rombo dorato che hai finito la stanza. Tocca una stanza, o un nome qui sotto.</p>
    <canvas class="mp-tela" id="pvTela" width="${PV.w}" height="${PV.h}" role="img" aria-label="Piantina del museo con le stanze e i varchi"></canvas>
    <div class="mp-scheda" id="pvScheda" aria-live="polite"></div>
    <div class="mp-lista pv-lista" id="pvLista">${lista}</div>
    <div class="row end">${closeBtn}</div>`);
  const tela=$('pvTela'),animata=!matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scegli=s=>{scelto=s;disegnaPianta(tela,s,animata?0:null);$('pvScheda').innerHTML=schedaStanza(s);
    $('pvLista').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.s===s))};
  $('pvLista').onclick=e=>{const b=e.target.closest('button');if(b)scegli(b.dataset.s)};
  tela.onclick=e=>{const r=tela.getBoundingClientRect(),k=PV.w/r.width,x=(e.clientX-r.left)*k,y=(e.clientY-r.top)*k;
    let best=null,d=24*24;L.forEach(s=>{const [px,py]=pvXY(s),q=(px-x)**2+(py-y)**2;if(q<d){d=q;best=s}});if(best)scegli(best)};
  $('pvScheda').onclick=e=>{const b=e.target.closest('[data-vai]');if(b){closeModal();pvVai(b.dataset.vai)}};
  scegli(id&&PIANTA.posti[id]?id:PIANTA.posti[S.room]?S.room:PIANTA.inizio);
  // la stanza dove sei pulsa piano (un ciclo ogni 1,5 s) finché la piantina è aperta; ferma con «riduci movimento»
  if(animata){const t0=performance.now();
    const passo=now=>{if($('pvTela')!==tela||$('modal').hidden)return;disegnaPianta(tela,scelto,now-t0);requestAnimationFrame(passo)};
    requestAnimationFrame(passo)}
}
window.apriPianta=apriPianta;
const st=document.createElement('style');st.textContent=`.pv-lista i{background:var(--pv);transform:none}.pv-lista .mp-sc i{background:var(--pv);box-shadow:0 0 0 2px var(--brass)}`;
document.head.appendChild(st);
}
