/* Titoli di coda: partono quando si apre la porta d'uscita, prima della finestra finale (win() in enigmi.js).
   Il personaggio cammina verso destra su un sentiero dell'Alto Vicentino, davanti a un paesaggio a strati
   (Pasubio, Fabbrica Alta, una villa, i boschi) mentre il cielo passa dalla notte all'alba. Intanto il testo scorre
   verso l'alto: il team, le foto dei sigilli con autore e licenza, le fonti, i caratteri, la musica.
   Sopra la testa del personaggio una nuvoletta ripensa ai sigilli, nell'ordine in cui li ha presi (S.journal):
   la foto del luogo e una frase in RICORDI. «Salta» o Esc vanno subito alla finestra finale; tenendo premuto si va più veloci.
   Con «riduci movimento» non si muove niente: il testo si scorre a mano e c'è «Continua».
   Il paesaggio è su una tela piccola ingrandita a pixel interi (STRATI); testo e nuvoletta sono HTML sopra.
   Nome globale: titoliDiCoda(poi). Area: sale. Bacheca: 2026-10-23_1850_sale_titoli-di-coda. */
{
// Il team, prima tutti in ordine di cognome, poi per area (nomi dati da jackjack-lab il 23/10/2026).
const TEAM=[
  {area:'Un gioco di',nomi:['Gabriele Cappelletti','Matteo Mastrantoni','Matteo Peruffo','Francesco Ravanini','Giacomo Verga','Alessandro Veronesi']},
  {area:'Grafica e motore',nomi:['Francesco Ravanini']},
  {area:'Enigmi e storia',nomi:['Francesco Ravanini']},
  {area:'Sale del territorio',nomi:['Giacomo Verga']},
  {area:'Dati aperti e AI',nomi:['Giacomo Verga']},
  {area:'Territorio e mappa',nomi:['Matteo Mastrantoni']},
  {area:'Lingua',nomi:['Matteo Peruffo']},
  {area:'Impostazioni e voce',nomi:['Gabriele Cappelletti']},
  {area:'Tester',nomi:['Alessandro Veronesi']}
];
// Cosa ricorda il personaggio di ogni sigillo: una frase breve, presa dal testo verificato della tessera.
const RICORDI={
  facade:'Villa Godi, la prima villa di Palladio: la bellezza nasce dalla simmetria.',
  tessitore:'L\'Omo di Schio: abbattuto per sbaglio da una gru nel 2003, è tornato al suo posto.',
  mine:'Sul Pasubio si combatteva anche sotto terra, scavando gallerie e contromine.',
  cimone:'La mina del 1916 ha reso più bassa la cima del Monte Cimone.',
  forti:'Forte Casa Ratti: lo fecero saltare gli austriaci stessi, ritirandosi.',
  citta:'A Valdagno Marzotto fece costruire case, scuole e uno stadio per la città.',
  castello:'Il castello di Thiene sta a metà tra la fortezza e la villa.',
  ferrarin:'Arturo Ferrarin, nato a Thiene, volò da Roma a Tokyo nel 1920.',
  grotta:'A Priabona le rocce sono piene di animali di un mare di 38-34 milioni di anni fa.',
  anguane:'Le anguane, dice la tradizione, proteggono fonti e ruscelli.',
  meneghello:'Malo è il paese di Luigi Meneghello e di «Libera nos a Malo».',
  recoaro:'Le acque di Recoaro sono note dal 1689.'
};
const VELOCITA=38,VELOCE=5;   // pixel al secondo del testo; quante volte più veloce tenendo premuto
const SCHERMO_LARGO=900,NUVOLA=220;   // da quale larghezza il testo sta a destra della nuvoletta; larghezza della nuvoletta
const fermo=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);

/* ---------- I dati ---------- */
// La foto di un sigillo: quelle delle sale nella tessera, quella della villa da fotoSigilloMuseo (registro.js).
function fotoSigillo(id){
  if(typeof SALA!=='undefined'&&SALA[id])return SALA[id].tessera.foto;
  return typeof fotoSigilloMuseo==='function'?fotoSigilloMuseo(id):null;
}
const titoloSigillo=id=>typeof SALA!=='undefined'&&SALA[id]?SALA[id].tessera.titolo:SEALS[id]?SEALS[id].title:id;
// I sigilli presi, nell'ordine del diario; quelli presi senza voce nel diario vanno in fondo.
function sigilliInOrdine(){
  const presi=[...Object.keys(SEALS).filter(k=>S.seals[k]),...(typeof SALE!=='undefined'?SALE.filter(s=>tessereS()[s.id]).map(s=>s.id):[])];
  const ordine=S.journal.filter(j=>j.seal).map(j=>j.id.replace(/^(seal|tessera)-/,'')).filter(id=>presi.includes(id));
  return [...new Set([...ordine,...presi])];
}
// Tutte le fonti citate nel gioco, una volta sola: FONTI (dati-ai) e le fonti delle sale.
// Le pagine delle foto su Wikimedia Commons no: le foto hanno già la loro sezione, con autore e licenza.
function fontiCitate(){
  const viste=new Set(),aggiungi=o=>Object.values(o||{}).forEach(l=>(Array.isArray(l)?l:[]).forEach(f=>{const s=f&&f.fonte;
    if(s&&s.titolo&&!/^Wikimedia Commons/.test(s.titolo))viste.add(s.titolo)}));
  if(typeof FONTI!=='undefined')aggiungi(FONTI);
  if(typeof SALE!=='undefined')SALE.forEach(s=>aggiungi(s.fonti));
  return [...viste].sort((a,b)=>a.localeCompare(b,'it'));
}

/* ---------- Il testo ---------- */
function testo(ricordi){
  const foto=sigilliInOrdine().map(id=>({id,f:fotoSigillo(id)})).filter(x=>x.f);
  return `<h1>FUORI ORARIO</h1><p class="ti-sotto">Fuga dal museo dopo la chiusura</p>
    <p class="ti-tempo">Sei uscito in ${fmt(S.elapsed)}</p>
    ${typeof statuineTrovate==='function'?`<p class="ti-sotto">Statuine trovate: ${statuineTrovate().n} su ${statuineTrovate().tot}</p>`:''}
    ${ricordi?`<h2>Cosa hai imparato</h2>${ricordi}`:''}
    <h2>Il team</h2>${TEAM.map(t=>`<h3>${esc(t.area)}</h3>${t.nomi.map(n=>`<p>${esc(n)}</p>`).join('')}`).join('')}
    <h2>Le foto dei sigilli</h2>${foto.map(({id,f})=>`<h3>${esc(titoloSigillo(id))}</h3><p>${esc(f.autore)} · ${esc(f.licenza)} · Wikimedia Commons</p>`).join('')}
    <h2>Le fonti</h2><p class="ti-fonti">${fontiCitate().map(esc).join('<br>')}</p>
    <h2>Caratteri</h2><p>Pixelify Sans, Jersey 10 e Jersey 15 · SIL Open Font License</p>
    <h2>Musica</h2><p>Scritta nel codice, nota per nota, con il Web Audio del browser</p>
    <p class="ti-nota">Il museo è immaginario. I fatti sono veri, e ognuno ha la sua fonte.</p>
    <p class="ti-grazie">Grazie per aver giocato</p>`;
}

/* ---------- Il paesaggio ---------- */
// Colori della palette del museo (CLAUDE.md, Animazioni).
const mix=(a,b,p)=>{const h=s=>[1,3,5].map(i=>parseInt(s.slice(i,i+2),16)),x=h(a),y=h(b);return '#'+x.map((v,i)=>Math.round(v+(y[i]-v)*p).toString(16).padStart(2,'0')).join('')};
const R_=(g,x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h)};
// Rumore deterministico: le colline sono sempre uguali per la stessa x.
const onda=(x,s)=>Math.sin(x*.013+s)*.5+Math.sin(x*.031+s*2.1)*.3+Math.sin(x*.071+s*3.7)*.2;
// Un punto di riferimento ogni tanto, sulle colline di mezzo.
function fabbrica(g,x,y,c){R_(g,x,y-34,30,34,c.mattone);for(let i=0;i<5;i++)for(let j=0;j<4;j++)R_(g,x+3+i*6,y-30+j*8,2,3,c.luce);R_(g,x+31,y-50,4,50,c.mattone)}
function villa(g,x,y,c){R_(g,x,y-16,14,16,c.intonaco);R_(g,x+28,y-16,14,16,c.intonaco);R_(g,x+14,y-20,14,20,c.intonaco);R_(g,x+12,y-24,18,4,c.tetto);
  R_(g,x-1,y-19,16,3,c.tetto);R_(g,x+27,y-19,16,3,c.tetto);for(let i=0;i<3;i++)R_(g,x+16+i*4,y-15,2,6,c.ombra);R_(g,x+18,y-4,6,4,c.ombra)}
function campanile(g,x,y,c){R_(g,x,y-40,8,40,c.intonaco);R_(g,x+2,y-34,4,5,c.ombra);R_(g,x+1,y-46,6,6,c.tetto);R_(g,x+3,y-50,2,4,c.tetto)}
function castello(g,x,y,c){R_(g,x,y-20,34,20,c.mattone);R_(g,x-4,y-30,8,30,c.mattone);R_(g,x+30,y-30,8,30,c.mattone);
  for(let i=0;i<5;i++)R_(g,x+i*7+1,y-23,3,3,c.mattone);[x-4,x+30].forEach(t=>{R_(g,t,y-33,2,3,c.mattone);R_(g,t+6,y-33,2,3,c.mattone)});R_(g,x+14,y-8,6,8,c.ombra)}
const LUOGHI=[fabbrica,villa,campanile,castello];
// Il personaggio di profilo, con i colori di PPAL (motore.js); due passi.
const LATO=['..hhhh..','.hhhhhh.','.hhhsss.','.hhsses.','..sssss.','..rrrr..','.rrrrrr.','.rrrdrr.','.rrrsr..','..rrrr..','..bbbb..'];
const PASSI=[['..bb.b..','.bb..bb.','.kk..kk.'],['...bb...','...bb...','...kk...']];
function personaggio(g,x,y,passo){
  const pal=typeof PPAL!=='undefined'?PPAL:{h:'#3b2618',s:'#e8b98f',e:'#1a1424',r:'#c2493c',d:'#8f3229',b:'#3b4f7a',k:'#1a1424'};
  [...LATO,...PASSI[passo]].forEach((riga,r)=>[...riga].forEach((ch,c)=>{if(pal[ch])R_(g,x+c*2,y+r*2,2,2,pal[ch])}));
}
// Gli strati, dal più lontano: v = quanto scorre rispetto al sentiero. p = avanzamento dei titoli, da 0 (notte) a 1 (alba).
const STRATI=[
  {v:0,disegna(g,W,H,x,p){
    const alto=mix('#1a1424','#4f7a9a',p),basso=mix('#2a2140','#e0b04f',p*p);
    for(let i=0;i<8;i++)R_(g,0,Math.floor(H*.7*i/8),W,Math.ceil(H*.7/8)+1,mix(alto,basso,i/7));
    R_(g,0,Math.floor(H*.7),W,H,basso);
    // stelle sparse a caso ma sempre negli stessi posti; spariscono verso l'alba
    const caso=i=>{const s=Math.sin(i*12.9898)*43758.5453;return s-Math.floor(s)};
    if(p<.8)for(let i=0;i<Math.round(W*H/1200);i++)R_(g,Math.floor(caso(i)*W),Math.floor(caso(i+500)*H*.5),1,1,mix('#efe2c4',alto,p/.8))
    const sole=Math.round(H*.72-p*H*.25);R_(g,Math.round(W*.75),sole,6,4,mix('#c2493c','#efe2c4',p))}},
  {v:.12,disegna(g,W,H,x,p){const c=mix('#2e2b3c','#5d6b7a',p),neve=mix('#46435a','#efe2c4',p);
    for(let i=0;i<W;i++){const h=Math.round(H*.28+onda(i+x,1)*H*.12);R_(g,i,H*.68-h,1,h+H,c);if(h>H*.33)R_(g,i,H*.68-h,1,2,neve)}}},
  {v:.35,disegna(g,W,H,x,p){
    const c={collina:mix('#24301f','#3f5a3a',p),mattone:mix('#4a2620','#8f3229',p),intonaco:mix('#4a4458','#efe2c4',p),tetto:mix('#3a2020','#c2493c',p),
      ombra:mix('#1a1424','#5a4630',p),luce:mix('#e0b04f','#5a4630',p)};
    for(let i=0;i<W;i++){const h=Math.round(H*.1+onda(i+x,4)*H*.05);R_(g,i,H*.76-h,1,h+H,c.collina)}
    const passo=170,da=Math.floor(x/passo)-1;
    for(let k=da;k<da+W/passo+3;k++){const lx=k*passo-x+40,h=Math.round(H*.1+onda(lx+x+15,4)*H*.05);LUOGHI[((k%4)+4)%4](g,lx,H*.76-h+2,c)}}},
  {v:1,disegna(g,W,H,x,p){
    const terra=mix('#3a2a1a','#5a4630',p),erba=mix('#2a3a22','#556b45',p),sasso=mix('#4a3b2c','#8a7350',p),pino=mix('#18221a','#2f4a35',p);
    const y0=Math.round(H*.8);R_(g,0,y0,W,H-y0,terra);R_(g,0,y0,W,2,erba);
    for(let i=-2;i<W/9+2;i++){const sx=Math.floor(x/9)*9+i*9;if((sx*7919)%5===0)R_(g,sx-x,y0+5+((sx*31)%3)*3,2,1,sasso)}
    for(let i=-1;i<W/60+2;i++){const tx=Math.floor(x/60)*60+i*60;if(((tx/60)*13)%3===0)continue;const px=tx-x+((tx*17)%23);
      for(let r=0;r<6;r++)R_(g,px-r*2,y0-28+r*4,r*4+2,4,pino);R_(g,px,y0-4,2,4,terra)}}}
];

/* ---------- La scena ---------- */
function titoliDiCoda(poi){
  if($('titoli'))return;
  S.done=true;   // il tempo si ferma: i titoli non contano
  const statico=fermo(),ordine=sigilliInOrdine();
  const ricordiFermi=statico?ordine.map(id=>{const f=fotoSigillo(id);return `<div class="ti-ricordo">${f?`<img src="${esc(f.file)}" alt="">`:''}<p>${esc(RICORDI[id]||titoloSigillo(id))}</p></div>`}).join(''):'';
  const el=document.createElement('div');el.id='titoli';el.setAttribute('role','dialog');el.setAttribute('aria-label','Titoli di coda');
  el.innerHTML=`<canvas id="tiTela"></canvas><div id="tiPensiero" hidden><span class="ti-bolle"><i></i><i></i></span><img alt=""><p></p></div>
    <div id="tiScorri"><div id="tiTesto">${testo(ricordiFermi)}</div></div>
    <div class="ti-pulsanti">${statico?'':'<span class="ti-aiuto">Tieni premuto per andare più veloce</span>'}<button type="button" id="tiSalta">${statico?'Continua':'Salta'}</button></div>`;
  document.body.appendChild(el);
  const tela=$('tiTela'),g=tela.getContext('2d'),scorri=$('tiScorri'),tx=$('tiTesto'),pens=$('tiPensiero');
  if(statico)scorri.classList.add('ti-fermo');
  let W=320,H=180,k=3,fine=false,ultimo=performance.now(),off=0,veloce=false,mondo=0,raf=0;
  const px=()=>Math.round(W*.24),py=()=>Math.round(H*.8)-28;
  // Né la nuvoletta né il personaggio devono coprire il testo (i crediti delle foto vanno mostrati):
  // sugli schermi larghi la colonna del testo sta a destra della nuvoletta; su quelli stretti la nuvoletta sta in alto nel cielo,
  // dove il testo arriva quando è già stato letto, e il testo ha un velo scuro davanti al personaggio.
  const misura=()=>{k=Math.max(2,Math.round(innerHeight/190));W=Math.ceil(innerWidth/k);H=Math.ceil(innerHeight/k);tela.width=W;tela.height=H;tela.style.width=W*k+'px';tela.style.height=H*k+'px';
    const largo=!statico&&innerWidth>=SCHERMO_LARGO;el.classList.toggle('ti-largo',largo);
    const sx=px()*k+8+NUVOLA+40;tx.style.marginLeft=largo?sx+'px':'';tx.style.width=largo?Math.min(560,innerWidth-sx-32)+'px':''};
  misura();addEventListener('resize',misura);
  // la nuvoletta sta sopra la testa del personaggio, in pixel dello schermo (sugli schermi stretti la mette il CSS)
  const mettiPensiero=()=>{pens.style.left=el.classList.contains('ti-largo')?(px()*k+8)+'px':'';pens.style.bottom=el.classList.contains('ti-largo')?(innerHeight-py()*k+10)+'px':''};
  const totale=()=>tx.offsetHeight+scorri.clientHeight;
  // un ricordo per sigillo, a distanza uguale lungo i titoli; ognuno resta per il 70% del suo spazio
  const ricordo=p=>{if(!ordine.length)return -1;const i=Math.floor(p*(ordine.length+1))-1,dentro=p*(ordine.length+1)%1;return i>=0&&i<ordine.length&&dentro<.7?i:-1};
  let mostrato=-1;
  const pensa=i=>{if(i===mostrato)return;mostrato=i;if(i<0){pens.classList.remove('ti-su');setTimeout(()=>{if(mostrato<0)pens.hidden=true},400);return}
    const id=ordine[i],f=fotoSigillo(id);pens.querySelector('img').hidden=!f;if(f){pens.querySelector('img').src=f.file}
    pens.querySelector('p').textContent=RICORDI[id]||titoloSigillo(id);pens.hidden=false;mettiPensiero();requestAnimationFrame(()=>pens.classList.add('ti-su'))};
  const disegna=(p,t)=>{STRATI.forEach(s=>s.disegna(g,W,H,mondo*s.v,p));personaggio(g,px(),py(),statico?0:Math.floor(t/220)%2)};
  const chiudi=()=>{if(fine)return;fine=true;cancelAnimationFrame(raf);removeEventListener('resize',misura);removeEventListener('keydown',tasti,true);el.remove();poi&&poi()};
  const tasti=e=>{e.stopImmediatePropagation();if(e.key==='Escape'||(statico&&e.key==='Enter')){e.preventDefault();chiudi()}};
  addEventListener('keydown',tasti,true);
  $('tiSalta').onclick=chiudi;$('tiSalta').focus();
  if(statico){disegna(.5,0);return}
  el.addEventListener('pointerdown',e=>{if(!e.target.closest('button'))veloce=true});
  ['pointerup','pointercancel','pointerleave'].forEach(n=>el.addEventListener(n,()=>veloce=false));
  // il sentiero scorre al doppio del testo, in pixel della tela
  const giro=t=>{const dt=Math.max(0,Math.min(.05,(t-ultimo)/1000));ultimo=t;const v=VELOCITA*(veloce?VELOCE:1);
    off+=v*dt;mondo+=v*dt*2/k;const tot=totale(),p=Math.min(1,off/tot);
    tx.style.transform=`translateY(${scorri.clientHeight-off}px)`;disegna(p,t);pensa(ricordo(p));
    if(off>=tot)return setTimeout(chiudi,600);raf=requestAnimationFrame(giro)};
  raf=requestAnimationFrame(giro);
}
window.titoliDiCoda=titoliDiCoda;

const st=document.createElement('style');st.textContent=`
#titoli{position:fixed;inset:0;z-index:40;background:var(--night);overflow:hidden;color:var(--ink);touch-action:none;user-select:none}
#tiTela{position:absolute;left:0;top:0;image-rendering:pixelated}
#tiScorri{position:absolute;inset:0;overflow:hidden;-webkit-mask-image:linear-gradient(transparent,#000 12%,#000 80%,transparent);mask-image:linear-gradient(transparent,#000 12%,#000 80%,transparent)}
#tiScorri.ti-fermo{overflow:auto;-webkit-mask-image:none;mask-image:none;background:rgba(10,8,18,.6);touch-action:pan-y}
#tiTesto{width:min(560px,calc(100% - 32px));margin:0 auto;text-align:center;text-shadow:2px 2px 0 #000;padding-bottom:24px}
#tiScorri:not(.ti-fermo) #tiTesto{position:absolute;left:0;right:0;top:0;will-change:transform}
#tiScorri.ti-fermo #tiTesto{padding:32px 0 96px}
#tiTesto h1{font-family:var(--display);color:var(--brass);font-size:clamp(36px,8vw,64px);margin:0 0 4px;letter-spacing:.04em;text-shadow:3px 3px 0 #000,5px 5px 0 var(--wool,#c2493c)}
#tiTesto h2{font-family:var(--display);color:var(--brass);font-size:22px;margin:56px 0 12px;text-transform:uppercase;letter-spacing:.08em}
#tiTesto h3{font-family:var(--display);color:#a99cc4;font-size:16px;margin:18px 0 2px;text-transform:uppercase;letter-spacing:.06em;font-weight:normal}
#tiTesto p{margin:2px 0}
#tiTesto .ti-sotto{color:#efe2c4}
#tiTesto .ti-tempo{margin-top:24px;color:var(--brass)}
#tiTesto .ti-fonti{font-size:15px;line-height:1.5;color:#d8cfe8}
#tiTesto .ti-nota{margin-top:56px;color:#a99cc4}
#tiTesto .ti-grazie{font-family:var(--display);color:var(--brass);font-size:clamp(26px,6vw,40px);margin:72px 0 40vh}
.ti-ricordo{display:flex;gap:12px;align-items:center;text-align:left;margin:10px 0}
.ti-ricordo img{width:96px;height:64px;object-fit:cover;border:2px solid var(--brass);flex:none}
#tiPensiero{position:absolute;width:min(220px,46vw);background:var(--panel,#241c33);border:2px solid var(--brass);box-shadow:4px 4px 0 #000;padding:8px;
  opacity:0;transform:translateY(6px);transition:opacity .4s,transform .4s;z-index:2}
#tiPensiero.ti-su{opacity:1;transform:none}
#tiPensiero img{display:block;width:100%;height:auto;max-height:120px;object-fit:cover;border:2px solid #000}
#tiPensiero p{margin:6px 0 0;font-size:15px;line-height:1.3}
.ti-bolle{position:absolute;left:-2px;bottom:-26px}
.ti-bolle i{position:absolute;display:block;background:var(--panel,#241c33);border:2px solid var(--brass)}
.ti-bolle i:first-child{width:10px;height:10px;left:4px;top:0}.ti-bolle i:last-child{width:6px;height:6px;left:-4px;top:14px}
/* schermi stretti: nuvoletta in alto, foto e frase affiancate; velo scuro dietro il testo, davanti al personaggio */
#titoli:not(.ti-largo) #tiPensiero{left:50%;top:12px;width:min(360px,calc(100vw - 32px));display:flex;gap:10px;align-items:center;transform:translate(-50%,-6px)}
#titoli:not(.ti-largo) #tiPensiero.ti-su{transform:translate(-50%,0)}
#titoli:not(.ti-largo) #tiPensiero img{width:42%;max-height:84px;flex:none}
#titoli:not(.ti-largo) #tiPensiero p{margin:0}
#titoli:not(.ti-largo) .ti-bolle{display:none}
#titoli:not(.ti-largo) #tiScorri:not(.ti-fermo) #tiTesto{background:rgba(10,8,18,.6);box-shadow:0 0 0 8px rgba(10,8,18,.6)}
.ti-pulsanti{position:absolute;right:max(16px,env(safe-area-inset-right,0px));bottom:16px;display:flex;gap:12px;align-items:center;z-index:3}
.ti-aiuto{font-size:14px;color:#a99cc4;text-shadow:1px 1px 0 #000}
@media (max-width:520px){.ti-aiuto{display:none}}`;
document.head.appendChild(st);
}
