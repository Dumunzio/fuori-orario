/* Luoghi reali dell'Alto Vicentino collegati al museo, e la mappa del territorio da consultare in gioco.
   Area: territorio. Vedi CLAUDE.md prima di modificare. */

// Coordinate e ID da Wikidata (snapshot del 22/10/2026).
// I luoghi veri da cui vengono gli oggetti e le storie del museo. Il gioco si gioca da casa:
// questi dati servono a raccontare i luoghi (mappa, foto, schede), non a obbligare ad andarci.
const LUOGHI_REALI=[
  {id:'Q3737489',nome:'Fabbrica Alta',comune:'Schio',lat:45.715,lon:11.35194},
  {id:'Q3862664',nome:'Monumento al Tessitore',comune:'Schio',lat:45.7147,lon:11.3589},
  {id:'Q16559252',nome:'Giardino Jacquard',comune:'Schio',lat:45.71583,lon:11.3525},
  {id:'Q3217568',nome:'Lanificio Conte',comune:'Schio',lat:45.71389,lon:11.35389},
  {id:'Q699595',nome:'Strada delle 52 Gallerie',comune:'Posina',lat:45.779,lon:11.228},
  {id:'Q132190315',nome:'Ossario del Pasubio',comune:'Valli del Pasubio',lat:45.75175,lon:11.19288},
  // Sala delle Ville: la villa vera dietro il rompicapo della facciata.
  {id:'Q2084394',nome:'Villa Godi',comune:'Lugo di Vicenza',lat:45.74614,lon:11.53444,
    foto:{file:'img/luoghi/Q2084394.jpg',alt:'La facciata di Villa Godi: due ali ai lati e, al centro, la loggia con tre arcate e la scalinata',
      autore:'Hans A. Rosbach',licenza:'CC BY-SA 3.0',pagina:'https://commons.wikimedia.org/wiki/File:VillaGodi_2007_07_07_01_retouched.jpg'}}
];

// Altre ville dell'Alto Vicentino che Wikidata attribuisce ad Andrea Palladio (proprietà "architetto"):
// candidate per sale future. Villa Piovene è accanto a Villa Godi, a Lonedo.
const VILLE_PALLADIANE=[
  {id:'Q2506967',nome:'Villa Piovene',comune:'Lugo di Vicenza',lat:45.74775,lon:11.53322},
  {id:'Q1405250',nome:'Villa Porto',comune:'Malo',lat:45.67275,lon:11.46387},
  {id:'Q2598094',nome:'Villa Forni Cerato',comune:'Montecchio Precalcino',lat:45.65639,lon:11.56222}
];

/* ---------- Mappa del territorio ---------- */
// Un rombo per ogni luogo vero da cui viene una storia del museo. Coordinate da Wikidata (22/10/2026).
// Il luogo è «scoperto» quando nel diario c'è una delle sue voci: un cartellino (cartellini) o la tessera della sua sala (sala).
// I luoghi di file non ancora caricati (una sala o un cartellino che non c'è) non compaiono.
const MAPPA_LUOGHI=[
  {id:'Q3737489',nome:'Fabbrica Alta',comune:'Schio',lat:45.715,lon:11.35194,cartellini:['fab','lan']},
  // a mezzo chilometro dalla Fabbrica Alta: spost sposta il rombo (in pixel della mappa) e lo lega al punto vero con una linea
  {id:'Q3862664',nome:'Monumento al Tessitore',comune:'Schio',lat:45.7147,lon:11.3589,sala:'tessitore',spost:[14,-10]},
  {id:'Q699595',nome:'Strada delle 52 Gallerie',comune:'Posina, massiccio del Pasubio',lat:45.779,lon:11.228,cartellini:['pas']},
  {id:'Q2084394',nome:'Villa Godi',comune:'Lugo di Vicenza',lat:45.74614,lon:11.53444,cartellini:['godi','palladio']},
  {id:'Q3705524',nome:'Dente Italiano',comune:'Trambileno, massiccio del Pasubio',lat:45.7943,lon:11.176,sala:'mine'},
  {id:'Q2448119',nome:'Monte Cimone di Tonezza',comune:'Tonezza del Cimone',lat:45.82271,lon:11.34626,sala:'cimone'},
  {id:'Q1438908',nome:'Forte Casa Ratti',comune:'Arsiero',lat:45.83681,lon:11.36943,sala:'forti'},
  {id:'Q3967923',nome:'Stadio dei Fiori',comune:'Valdagno',lat:45.64887,lon:11.30435,sala:'citta'},
  {id:'Q3662920',nome:'Castello di Thiene',comune:'Thiene',lat:45.7066,lon:11.47832,sala:'castello'},
  {id:'Q3606096',nome:'Aeroporto Arturo Ferrarin',comune:'Thiene',lat:45.6756,lon:11.4964,sala:'ferrarin'},
  {id:'Q49963329',nome:'Buso della Rana',comune:'Monte di Malo',lat:45.6504,lon:11.361,sala:'grotta'},
  {id:'Q16571954',nome:'Torrente Leogra',comune:'provincia di Vicenza',lat:45.68092,lon:11.42665,sala:'anguane'},
  {id:'Q46985',nome:'Malo',comune:'Malo',lat:45.65819,lon:11.40469,sala:'meneghello'},
  {id:'Q59867524',nome:'Terme di Recoaro',comune:'Recoaro Terme',lat:45.70032,lon:11.22137,sala:'recoaro'}
];
// Paesi e monti scritti sulla mappa, come riferimento (coordinate da Wikidata).
const MAPPA_PAESI=[['Schio',45.71111,11.35556],['Thiene',45.70722,11.47861],['Valdagno',45.65,11.3],['Malo',45.65819,11.40469],
  ['Arsiero',45.8,11.35],['Recoaro',45.7,11.23333],['Lugo',45.75,11.53333],['Tonezza',45.85,11.35],['Valli',45.75,11.26667],['Posina',45.78333,11.26667]];
const MAPPA_MONTI=[['Pasubio',45.79278,11.17556],['Summano',45.75972,11.39]];
// Rilievo e fiumi sono disegnati a mano: servono a orientarsi, non a misurare.
// Rilievi: [lat, lon, quota in metri, raggio in km].
const MAPPA_RILIEVI=[[45.79278,11.17556,2230,6],[45.72,11.13,1900,5],[45.775,11.31,1500,4],[45.80,11.28,1500,4],
  [45.75972,11.39,1300,3],[45.82271,11.34626,1230,3],[45.85,11.35,1100,5],[45.88,11.50,1300,8],[45.665,11.35,550,5],[45.66,11.23,900,5]];
const MAPPA_FIUMI=[
  ['Leogra',[[45.765,11.18],[45.75,11.267],[45.727,11.31],[45.705,11.36],[45.68092,11.42665]]],
  ['Astico',[[45.88,11.30],[45.80,11.35],[45.77,11.41],[45.73,11.47],[45.66,11.56]]],
  ['Posina',[[45.78333,11.26667],[45.795,11.31],[45.80,11.35]]],
  ['Agno',[[45.70,11.22],[45.65,11.30],[45.62,11.33]]]];
// Confini della mappa in gradi e misura della tela: 480 pixel per circa 34 km.
const MAPPA_BOX={n:45.865,s:45.62,o:11.14,e:11.58,w:480,h:380};
const mappaXY=(lat,lon)=>[(lon-MAPPA_BOX.o)/(MAPPA_BOX.e-MAPPA_BOX.o)*MAPPA_BOX.w,(MAPPA_BOX.n-lat)/(MAPPA_BOX.n-MAPPA_BOX.s)*MAPPA_BOX.h];
const mappaPx=MAPPA_BOX.w/((MAPPA_BOX.e-MAPPA_BOX.o)*111.32*Math.cos(45.74*Math.PI/180)); // pixel per km

// Le altre ville del Palladio (VILLE_PALLADIANE): luoghi vicini che non sono ancora una sala. Pallino chiaro, non si contano.
// Villa Piovene è a 200 metri da Villa Godi: il suo pallino si sposta come il Tessitore.
const mappaVille=()=>VILLE_PALLADIANE.map(v=>({...v,villa:true,spost:v.id==='Q2506967'?[-14,-12]:null}));
function mappaVisibili(){return MAPPA_LUOGHI.filter(l=>l.sala?typeof SALA!=='undefined'&&!!SALA[l.sala]:l.cartellini.some(k=>PLAQUES[k]))}
function mappaScoperto(l){const ids=l.sala?['tessera-'+l.sala]:l.cartellini;return S.journal.some(j=>ids.includes(j.id))}
const mappaCartellino=l=>PLAQUES[l.cartellini.find(k=>PLAQUES[k])];
function mappaDove(l){return l.sala?SALA[l.sala].nome:mappaCartellino(l).where}
function mappaPunto(l){const [x,y]=mappaXY(l.lat,l.lon),[dx,dy]=l.spost||[0,0];return [x+dx,y+dy,x,y]}

// Il fondo (rilievo e fiumi) non cambia: si disegna una volta sola, a blocchi di 2 pixel.
let mappaFondo=null;
function disegnaFondoMappa(){
  const {w,h}=MAPPA_BOX,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');
  const fiumi=MAPPA_FIUMI.map(([,p])=>p.map(([la,lo])=>mappaXY(la,lo)));
  const distFiume=(x,y)=>{let m=1e9;fiumi.forEach(p=>{for(let i=1;i<p.length;i++){const [ax,ay]=p[i-1],[bx,by]=p[i],vx=bx-ax,vy=by-ay;
    const t=Math.max(0,Math.min(1,((x-ax)*vx+(y-ay)*vy)/(vx*vx+vy*vy))),ex=ax+t*vx-x,ey=ay+t*vy-y;m=Math.min(m,ex*ex+ey*ey)}});return Math.sqrt(m)};
  const rilievi=MAPPA_RILIEVI.map(([la,lo,q,r])=>[...mappaXY(la,lo),q,r*mappaPx]);
  // quota indicativa: pianura a 110 m, più i rilievi, con le valli scavate lungo i fiumi
  const quota=(x,y)=>{let q=110;rilievi.forEach(([rx,ry,m,r])=>{q+=m*Math.exp(-((x-rx)**2+(y-ry)**2)/(r*r))});
    return q*(1-.45*Math.exp(-((distFiume(x,y)/(0.8*mappaPx))**2)))};
  const B=2,Q=[];
  for(let y=0;y<h;y+=B){const r=[];for(let x=0;x<w;x+=B)r.push(quota(x,y));Q.push(r)}
  const fasce=[[200,'#5f7d3f','#587539'],[450,'#6b8544','#62803f'],[800,'#556b38','#4a5e31'],[1300,'#6f6a4f','#655f46'],[1800,'#86826f','#7b7765'],[1e9,'#c9c6bd','#b9b5aa']];
  Q.forEach((r,j)=>r.forEach((q,i)=>{
    const f=fasce.find(f=>q<f[0]),luce=(Q[j-1]?.[i-1]??q)-q;
    g.fillStyle=(i+j)%2?f[2]:f[1];g.fillRect(i*B,j*B,B,B);
    // ombra sui versanti girati verso sud-est, luce su quelli verso nord-ovest
    if(Math.abs(luce)>14){g.fillStyle=luce>0?'rgba(0,0,0,.18)':'rgba(255,255,230,.12)';g.fillRect(i*B,j*B,B,B)}}));
  g.lineCap=g.lineJoin='round';
  fiumi.forEach(p=>{g.strokeStyle='#3d6f9a';g.lineWidth=3;g.beginPath();p.forEach(([x,y],i)=>i?g.lineTo(x,y):g.moveTo(x,y));g.stroke();
    g.strokeStyle='#6fa3c8';g.lineWidth=1;g.stroke()});
  g.strokeStyle='#4b3f6e';g.lineWidth=4;g.strokeRect(0,0,w,h);
  return c;
}
// Paesi, monti, nord e scala vanno sopra i rombi, così nessun rombo copre un nome.
let mappaScritte=null;
function disegnaScritteMappa(){
  const {w,h}=MAPPA_BOX,c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');
  const font=getComputedStyle(document.body).getPropertyValue('--body').trim()||'monospace';
  const scrivi=(t,x,y,col)=>{g.font='14px '+font;g.lineWidth=3;g.lineJoin='round';g.strokeStyle='#15111f';g.strokeText(t,x,y);g.fillStyle=col;g.fillText(t,x,y)};
  // il quadratino del paese si toglie dove c'è già un rombo (Malo, Lugo con Villa Godi)
  const rombi=MAPPA_LUOGHI.map(mappaPunto);
  MAPPA_PAESI.forEach(([n,la,lo])=>{const [x,y]=mappaXY(la,lo);
    if(!rombi.some(([px,py])=>(px-x)**2+(py-y)**2<100)){g.fillStyle='#15111f';g.fillRect(x-3,y-3,6,6);g.fillStyle='#f0e6cf';g.fillRect(x-2,y-2,4,4)}scrivi(n,x+5,y+12,'#f0e6cf')});
  MAPPA_MONTI.forEach(([n,la,lo])=>{const [x,y]=mappaXY(la,lo);g.fillStyle='#15111f';g.beginPath();g.moveTo(x,y-7);g.lineTo(x+6,y+3);g.lineTo(x-6,y+3);g.fill();scrivi(n,x+8,y+2,'#e8e2d2')});
  scrivi('N ↑',w-34,20,'#e0b04f');
  // scala di 5 km
  const k5=5*mappaPx;g.fillStyle='#15111f';g.fillRect(10,h-18,k5+2,6);g.fillStyle='#f0e6cf';g.fillRect(11,h-17,k5,4);scrivi('5 km',16+k5,h-11,'#f0e6cf');
  return c;
}
// nuovi: luoghi scoperti da quando hai aperto la mappa l'ultima volta; t: tempo dell'animazione (anello che si allarga piano).
function disegnaMappa(tela,scelto,nuovi=[],t=0){
  const g=tela.getContext('2d');mappaFondo=mappaFondo||disegnaFondoMappa();mappaScritte=mappaScritte||disegnaScritteMappa();
  g.drawImage(mappaFondo,0,0);
  mappaVille().forEach(l=>{
    const [x,y,vx,vy]=mappaPunto(l),sel=l.id===scelto?.id;
    if(l.spost){g.strokeStyle='#15111f';g.lineWidth=2;g.beginPath();g.moveTo(vx,vy);g.lineTo(x,y);g.stroke()}
    if(sel){g.fillStyle='#fff3c4';g.fillRect(x-7,y-7,14,14)}
    g.fillStyle='#15111f';g.fillRect(x-5,y-5,10,10);g.fillStyle='#efe2c4';g.fillRect(x-3,y-3,6,6);
  });
  mappaVisibili().forEach(l=>{
    const [x,y,vx,vy]=mappaPunto(l),sc=mappaScoperto(l),sel=l===scelto;
    if(l.spost){g.strokeStyle='#15111f';g.lineWidth=2;g.beginPath();g.moveTo(vx,vy);g.lineTo(x,y);g.stroke();g.fillStyle='#15111f';g.fillRect(vx-2,vy-2,4,4)}
    const r=sel?10:7,rombo=(r,c)=>{g.fillStyle=c;g.beginPath();g.moveTo(x,y-r);g.lineTo(x+r,y);g.lineTo(x,y+r);g.lineTo(x-r,y);g.fill()};
    if(sel)rombo(r+4,'#fff3c4');
    if(nuovi.includes(l)){const f=(t%1500)/1500;g.globalAlpha=1-f;g.strokeStyle='#fff3c4';g.lineWidth=2;
      const R=r+4+f*12;g.beginPath();g.moveTo(x,y-R);g.lineTo(x+R,y);g.lineTo(x,y+R);g.lineTo(x-R,y);g.closePath();g.stroke();g.globalAlpha=1}
    rombo(r+2,'#15111f');rombo(r,sc?'#e0b04f':'#4b3f6e');
    if(!sc){g.fillStyle='#a99cc4';g.fillRect(x-1,y-1,2,2)}
  });
  g.drawImage(mappaScritte,0,0);
}
// Scheda di un luogo: foto e storia solo se l'hai scoperto, altrimenti dove cercarlo nel museo.
function schedaLuogo(l){
  const osm=`https://www.openstreetmap.org/?mlat=${l.lat}&mlon=${l.lon}#map=14/${l.lat}/${l.lon}`;
  const link=`<p class="mp-link"><a href="https://www.wikidata.org/wiki/${l.id}" target="_blank" rel="noopener">Scheda su Wikidata</a> · <a href="${osm}" target="_blank" rel="noopener">Sulla mappa di OpenStreetMap</a></p>`;
  if(l.villa)return `<span class="eyebrow">${l.comune} · non ancora nel museo</span><h3>${l.nome}</h3>
    <p>Un'altra villa dell'Alto Vicentino che Wikidata attribuisce ad Andrea Palladio, come Villa Godi. Nel museo non c'è ancora una sala: puoi conoscerla dalle schede qui sotto.</p>${link}`;
  const sc=mappaScoperto(l),dove=mappaDove(l),reale=LUOGHI_REALI.find(r=>r.id===l.id);
  const foto=reale?.foto||(l.sala?SALA[l.sala].tessera.foto:null);
  const testo=l.sala?SALA[l.sala].tessera.testo:mappaCartellino(l).lines.join(' ');
  return `<span class="eyebrow">${l.comune} · nel museo: ${dove}</span><h3>${l.nome}</h3>
    ${sc?`${foto?`<figure class="mp-foto"><img src="${foto.file}" alt="${foto.alt}"><figcaption>Foto: ${foto.autore} · ${foto.licenza} · <a href="${foto.pagina}" target="_blank" rel="noopener">Wikimedia Commons</a></figcaption></figure>`:''}<p>${testo}</p>`
      :`<p>Non l'hai ancora scoperto. La sua storia ti aspetta nel museo: ${dove}.</p>`}
    ${link}${sc&&l.sala&&typeof entraInSala==='function'?`<div class="row"><button type="button" data-sala="${l.sala}">Vai alla sala</button></div>`:''}`;
}
// Apre la mappa; id facoltativo (ID Wikidata del luogo o id della sala) per partire da quel luogo.
// Per esempio, dalla scheda di una tessera: apriMappa('tessitore').
function apriMappa(id){
  const M=mappaVisibili(),n=M.filter(mappaScoperto).length,V=mappaVille(),L=[...M,...V];
  // i luoghi scoperti dall'ultima apertura pulsano qualche secondo; S.mappaViste li ricorda (si salva con il resto di S)
  const viste=S.mappaViste||(S.mappaViste={}),nuovi=M.filter(l=>mappaScoperto(l)&&!viste[l.id]);nuovi.forEach(l=>viste[l.id]=true);
  let scelto=null;
  openModal(`<div class="eyebrow">Mappa · ${n} luoghi scoperti su ${M.length}</div><h2>L'Alto Vicentino</h2>
    <p>Ogni rombo è un luogo vero da cui viene una storia del museo. Quelli dorati li hai già scoperti: tocca un rombo, o un nome qui sotto, per leggerne la scheda.</p>
    <canvas class="mp-tela" id="mpTela" width="${MAPPA_BOX.w}" height="${MAPPA_BOX.h}" role="img" aria-label="Mappa dell'Alto Vicentino con i luoghi del museo"></canvas>
    <div class="mp-scheda" id="mpScheda" aria-live="polite"></div>
    <div class="mp-lista" id="mpLista">${M.map((l,i)=>`<button type="button" data-i="${i}" class="${mappaScoperto(l)?'mp-sc':''}"><i></i>${l.nome}</button>`).join('')}
      <span class="eyebrow mp-sotto">Altre ville del Palladio, non ancora nel museo</span>
      ${V.map((l,i)=>`<button type="button" data-i="${M.length+i}" class="mp-villa"><i></i>${l.nome}</button>`).join('')}</div>
    <p class="eyebrow">Coordinate da Wikidata · monti e fiumi disegnati a mano, indicativi</p>
    <div class="row end">${closeBtn}</div>`);
  const tela=$('mpTela');
  const scegli=l=>{scelto=l;disegnaMappa(tela,l);$('mpScheda').innerHTML=schedaLuogo(l);
    $('mpLista').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',L[b.dataset.i]===l))};
  // sulla tela vince il rombo più vicino; i pallini delle ville contano solo se nessun rombo è vicino
  $('mpLista').onclick=e=>{const b=e.target.closest('button');if(b)scegli(L[b.dataset.i])};
  tela.onclick=e=>{const r=tela.getBoundingClientRect(),k=MAPPA_BOX.w/r.width,x=(e.clientX-r.left)*k,y=(e.clientY-r.top)*k;
    const vicino=(P,max)=>{let best=null,d=max*max;P.forEach(l=>{const [px,py]=mappaPunto(l),q=(px-x)**2+(py-y)**2;if(q<d){d=q;best=l}});return best};
    const l=vicino(M,14)||vicino(V,12)||vicino(M,24);if(l)scegli(l)};
  $('mpScheda').onclick=e=>{const b=e.target.closest('[data-sala]');if(b){closeModal();entraInSala(b.dataset.sala)}};
  scegli(L.find(l=>id&&(l.id===id||l.sala===id))||nuovi[0]||M.find(mappaScoperto)||L[0]);
  // 4,5 secondi di pulsazione lenta (meno di un ciclo al secondo), niente se il sistema chiede meno movimento
  if(nuovi.length&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const t0=performance.now();
    const passo=now=>{if($('mpTela')!==tela||$('modal').hidden)return;const t=now-t0;disegnaMappa(tela,scelto,t<4500?nuovi:[],t);if(t<4500)requestAnimationFrame(passo)};
    requestAnimationFrame(passo)}
}
// Stile della mappa (classi .mp-*): grafica-motore può ridisegnarle da style.css. Pulsante «Mappa» accanto al Diario.
{
  const st=document.createElement('style');st.textContent=`
.mp-tela{width:100%;height:auto;display:block;image-rendering:pixelated;cursor:pointer;box-shadow:4px 4px 0 #000}
.mp-scheda{border:2px solid var(--line);padding:10px 12px;display:grid;gap:6px}
.mp-scheda h3{margin:0;font-family:var(--display);font-size:18px;color:var(--brass)}
.mp-foto{margin:0;display:grid;gap:4px}.mp-foto img{width:100%;max-height:220px;object-fit:cover;display:block}
.mp-foto figcaption,.mp-link{font-size:16px;color:var(--muted)}
.mp-lista{display:flex;flex-wrap:wrap;gap:6px}
.mp-lista button{text-transform:none;font-family:var(--body);font-size:18px;letter-spacing:0;padding:4px 8px;display:flex;gap:6px;align-items:center}
.mp-lista i{width:9px;height:9px;transform:rotate(45deg);background:var(--line);flex:none}
.mp-lista .mp-sc i{background:var(--brass)}
.mp-lista .mp-villa i{transform:none;background:#efe2c4;border:2px solid #15111f;width:7px;height:7px}
.mp-sotto{flex-basis:100%;margin-top:4px}
.mp-lista button[aria-pressed="true"]{border-color:var(--brass)}`;
  document.head.appendChild(st);
  const b=document.createElement('button');b.id='btnMappa';b.type='button';b.textContent='Mappa';
  b.onclick=()=>{if(S.started&&$('modal').hidden&&$('dialog').hidden)apriMappa()};
  $('btnJournal').after(b);
}
