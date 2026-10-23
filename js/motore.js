/* Motore del gioco: stato, disegno isometrico, luce, movimento, input, dialoghi e finestre.
   Area: grafica-motore. Vedi CLAUDE.md prima di modificare. */
const cv=document.getElementById('cv'),ctx=cv.getContext('2d');
const VW=320,VH=210,HW=12,HH=6,WH=54;
// Dimensioni e origine della stanza corrente, e i suoi oggetti: li assegna entraStanza().
let MW=12,MH=10,OX=148,OY=64,OBJ=[];
const iso=(x,y)=>[OX+(x-y)*HW,OY+(x+y)*HH];
const DIRS=[[1,0],[-1,0],[0,1],[0,-1]];
const $=id=>document.getElementById(id);

/* ---------- Stato ---------- */
let S,P;
function fresh(){
  const k=Object.keys(SEALS);
  S={seals:Object.fromEntries(k.map(id=>[id,false])),journal:[],hint:Object.fromEntries(k.map(id=>[id,0])),elapsed:0,started:false,done:false,door:0,room:'ingresso',fade:0};
  // si comincia nell'ingresso (PIANTA.inizio), sul tappeto davanti al custode
  P={x:5,y:6,px:5,py:6,tx:5,ty:6,fx:0,fy:-1,moving:false,walk:0,path:[],pending:null};
}
fresh();
// solo i sigilli di SEALS: una partita salvata può avere ancora quelli della stanza museo, che non c'è più
const sealCount=()=>Object.keys(SEALS).filter(k=>S.seals[k]).length;

/* ---------- Disegno: primitive ---------- */
const R=(g,x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h)};
function diamond(g,cx,cy,a,b,c){g.fillStyle=c;for(let r=-b;r<=b;r++){const w=Math.round(a*(1-Math.abs(r)/b));if(w>0)g.fillRect(cx-w,cy+r,w*2,1)}}
function box(g,cx,cy,a,b,h,top,left,right){
  g.fillStyle=left;for(let i=0;i<a;i++)g.fillRect(cx-a+i,cy+Math.round(i*b/a)-h,1,h);
  g.fillStyle=right;for(let i=0;i<a;i++)g.fillRect(cx+i,cy+b-Math.round(i*b/a)-h,1,h);
  diamond(g,cx,cy-h,a,b,top);
}
// facce sinistra/destra di un box: callback per ogni colonna (x, y del bordo inferiore)
function faceL(cx,cy,a,b,fn){for(let i=0;i<a;i++)fn(cx-a+i,cy+Math.round(i*b/a),i)}
function faceR(cx,cy,a,b,fn){for(let i=0;i<a;i++)fn(cx+i,cy+b-Math.round(i*b/a),i)}
function spr(rows,pal,x,y){rows.forEach((row,j)=>{for(let i=0;i<row.length;i++){const c=pal[row[i]];if(c)R(ctx,x+i,y+j,1,1,c)}})}

/* ---------- Sfondo statico: pavimento e pareti ---------- */
// colori delle pareti: [in ombra, illuminata] per fondo, zoccolo e cornice in alto; fascia = listello sopra lo zoccolo
const MURO_MUSEO={fondo:['#2b2343','#3b3058'],zoccolo:['#1f182e','#2a1f3a'],cornice:['#3e3460','#54487e'],fascia:'#8a6a34'};
function wallCol(g,px,fy,lit,m=MURO_MUSEO){
  const top=fy-WH,k=lit?1:0;
  g.fillStyle=m.fondo[k];g.fillRect(px,top,1,WH);
  g.fillStyle=m.zoccolo[k];g.fillRect(px,fy-14,1,14);
  g.fillStyle=m.fascia;g.fillRect(px,fy-15,1,1);
  g.fillStyle=m.cornice[k];g.fillRect(px,top,1,3);
  g.fillStyle='#120e1c';g.fillRect(px,fy-2,1,2);
}
// pittura su parete: side 'R' (fila y=0) o 'L' (colonna x=0); fn(u,v,W,H) -> colore o null
function onWall(g,side,t,i0,i1,top,h,fn){
  const [cx,cy]=side==='R'?iso(t,0):iso(0,t);
  for(let i=i0;i<=i1;i++){
    const px=side==='R'?cx+i:cx-12+i, fy=side==='R'?cy+Math.floor(i/2):cy+6-Math.floor(i/2);
    for(let v=0;v<h;v++){const c=fn(i-i0,v,i1-i0,h);if(c){g.fillStyle=c;g.fillRect(px,fy-top+v,1,1)}}
  }
}
const framed=(inner,fr='#b8892f')=>(u,v,W,H)=>(u===0||u===W||v===0||v===H-1)?fr:inner(u,v,W,H);
// Emblemi 9×7 sopra i varchi a tema: '#' = colore del tema, '+' = scuro, '.' = niente.
const EMBLEMI={
  navetta:['.........','..#####..','.#+++++#.','#+++#+++#','.#+++++#.','..#####..','.........'],
  mina:['......#..','.....#...','...###...','..#####..','..##+##..','..#####..','...###...'],
  croce:['....#....','....#....','.#######.','....#....','....#....','....#....','...###...'],
  torre:['.#.#.#.#.','.#######.','..#####..','..##+##..','..##+##..','..#####..','.#######.'],
  case:['..#...#..','.###.###.','#########','#+#+#+#+#','#########','#+#+#+#+#','#########'],
  merli:['#.#.#.#.#','#########','#########','###+++###','###+++###','###+++###','#########'],
  aereo:['....#....','....#....','#########','.#.###.#.','....#....','...###...','.........'],
  fossile:['..#####..','.#+++++#.','#+###++#.','#+#+#+#+#','#+#++#+#.','.#+++++#.','..#####..'],
  onde:['.........','.##...##.','#..#.#..#','.........','.##...##.','#..#.#..#','.........'],
  libro:['.........','###...###','#++#.#++#','#++#.#++#','#++#.#++#','.###.###.','.........'],
  goccia:['....#....','...###...','..##+##..','.##+####.','.#######.','..#####..','...###...']
};
// schiarisce (k>0) o scurisce (k<0) un colore #rrggbb
const tinta=(c,k)=>'#'+[1,3,5].map(i=>{const v=parseInt(c.slice(i,i+2),16);return Math.round(k>0?v+(255-v)*k:v*(1+k)).toString(16).padStart(2,'0')}).join('');
// varco ad arco tra due stanze, sulla parete side alla casella t.
// tema facoltativo {colore, motivo}: cornice del colore del tema ed emblema di EMBLEMI sopra l'arco.
function pareteVarco(g,side,t,tema){
  const cornice=tema?tema.colore:'#b8892f',fondo=tema?tinta(tema.colore,-.75):'#2a2133';
  onWall(g,side,t,2,10,34,34,(u,v,W)=>{const r=W/2,dx=u-r,d=v<r?Math.hypot(dx,r-v):Math.abs(dx);
    return d>r+.5?(tema&&d<=r+1.6&&v<30?tinta(cornice,-.35):null):d>r-1.2?cornice:v>27?fondo:'#0d0a14'});
  const e=tema&&EMBLEMI[tema.motivo];
  // targhetta scura con bordo del colore del tema, emblema sopra
  if(e)onWall(g,side,t,1,11,46,10,(u,v,W,H)=>{if(u===0||u===W||v===0||v===H-1)return tinta(cornice,-.35);
    const c=e[v-2]?.[u-1];return c==='#'?tinta(cornice,.35):c==='+'?tinta(cornice,-.55):tinta(cornice,-.8)});
}
// cartellino appeso alla parete side alla casella t: targa d'ottone con le righe del testo e una lampada sopra
function pareteCartellino(g,side,t){
  onWall(g,side,t,2,10,40,3,(u,v,W)=>v===0?(u>2&&u<W-2?'#3a2a1a':null):u>1&&u<W-1?(v===2?'#fff1b8':'#e0b04f'):null);
  onWall(g,side,t,1,11,34,12,(u,v,W,H)=>u===0||u===W||v===0||v===H-1?'#8a6a34':v%3===1&&u>1&&u<W-1&&(u+v)%7?'#5a4426':'#e0b04f');
}
// riquadro cliccabile di un cartellino a parete
function hitCartellino(side,t){const [cx,cy]=side==='R'?iso(t,0):iso(0,t);return side==='R'?[cx+1,cy-40,11,20]:[cx-11,cy-40,11,20]}
// interno dell'arco acceso: disegnato a ogni fotogramma sopra lo sfondo, per i varchi con acceso() vero
function varcoAcceso(o,t){
  const side=o.x<0?'L':'R',tt=o.x<0?o.y:o.x,f=Math.floor(t/180)%3;
  onWall(ctx,side,tt,2,10,34,34,(u,v,W)=>{const r=W/2,dx=u-r,d=v<r?Math.hypot(dx,r-v):Math.abs(dx);
    return d>r-1.2?null:v>27?'#e0b04f':(v+u+f)%5===0?'#fff3c4':'#f7d98a'});
}
// riquadro cliccabile del varco: [x,y,larghezza,altezza]
function hitVarco(side,t){const [cx,cy]=side==='R'?iso(t,0):iso(0,t);return side==='R'?[cx+2,cy-33,9,36]:[cx-10,cy-33,9,36]}
// veduta di Villa Godi su due caselle di parete: off sposta la seconda metà
const vedutaVilla=off=>(u,v)=>{const U=u+off,W=20,H=15;
  if(U===0||U===W||v===0||v===H)return '#b8892f';
  if(v<4)return '#2d3a5e';if(v===4)return U>1&&U<W-1?'#7a4a32':'#2d3a5e';
  if(v===14)return '#3f5a34';if(U<2||U>W-2)return '#2d3a5e';
  const centro=U>=8&&U<=12;
  if(centro&&v>=6&&v<=8&&U%2===0)return '#241c2c';
  if(centro&&v>=9&&U>=9&&U<=11)return '#efe6cc';
  if(!centro&&(v===6||v===10)&&U%2===1)return '#3a2a1a';
  return centro?'#c9bea2':'#d9cfb4'};
/* ---------- Decori di stanza ---------- */
// colora la casella (x,y) del pavimento: fn(r,c,w) -> colore per la riga r e la colonna c (da -w a w-1), o null
function casella(g,x,y,fn){const [cx,cy]=iso(x,y);
  for(let r=0;r<12;r++){const w=r<6?2*r+2:2*(11-r)+2;for(let c=-w;c<w;c++){const col=fn(r,c,w);if(col){g.fillStyle=col;g.fillRect(cx+c,cy+r,1,1)}}}}
// tappeto su un rettangolo di caselle, con bordo dorato sul perimetro del rettangolo
function tappeto(g,x0,y0,x1,y1,fondo,bordo,motivo){
  for(let x=x0;x<=x1;x++)for(let y=y0;y<=y1;y++)casella(g,x,y,(r,c,w)=>{
    const lato=(x===x0&&c<0&&r<6&&c<-w+3)||(y===y0&&c>=0&&r<6&&c>w-4)||(x===x1&&c>=0&&r>=6&&c>w-4)||(y===y1&&c<0&&r>=6&&c<-w+3);
    return lato?bordo:motivo&&(r+Math.abs(c))%6===0?motivo:fondo});
}
// applique: lampada da muro con braccio d'ottone e paralume acceso
function applique(g,side,t){onWall(g,side,t,4,8,46,7,(u,v,W)=>v<3?(u>0&&u<W?'#fff1b8':null):v<4?'#e0b04f':u===2?'#8a6a34':null)}
const lampada=(side,t)=>{const [cx,cy]=side==='R'?iso(t,0):iso(0,t);return [side==='R'?cx+6:cx-6,cy-42,22,.55]};

/* ---------- Stanze ---------- */
// Come è fatta ogni stanza: dimensioni, origine del disegno, pavimento, pareti e luci fisse.
// Gli oggetti di ogni stanza sono in OGGETTI (stanza.js).
// pav: per ogni zona [colore pari, colore dispari, bordo, puntini (facoltativo)].
const STANZE={
  // Sala delle Ville: pavimento alla veneziana, intonaco chiaro, veduta di Villa Godi
  villa:{w:8,h:8,ox:160,oy:82,porta:false,
    zona:()=>'villa',
    pav:{villa:['#c9b99a','#bfae8e','#9a8a6c','#8e5a4a']},
    muro:{fondo:['#7d7362','#968a74'],zoccolo:['#564d40','#655b4b'],cornice:['#8f846f','#ada08a'],fascia:'#b8892f'},
    pareti(g){
      onWall(g,'R',3,1,11,44,16,vedutaVilla(0));onWall(g,'R',4,0,9,44,16,vedutaVilla(11));
      [2,5].forEach(t=>onWall(g,'L',t,3,9,46,22,framed((u,v,W,H)=>(u===Math.floor(W/2)||v===Math.floor(H/2))?'#5a4e3e':(u===1&&v===2?'#f4f0d8':'#24345a'),'#5a4e3e')));
      pareteVarchiPianta(g,'villa');
      pareteCartellino(g,'R',1);pareteCartellino(g,'R',6);
      // lesene: pilastri chiari tra una casella e l'altra, come nelle facciate di Palladio
      [0,2,5,7].forEach(t=>onWall(g,'R',t,0,1,WH-3,WH-17,(u,v)=>v<3?'#d6ccb4':u?'#b8ad94':'#cfc4aa'));
      [0,3,7].forEach(t=>onWall(g,'L',t,10,11,WH-3,WH-17,(u,v)=>v<3?'#d6ccb4':u?'#b8ad94':'#cfc4aa'));
      applique(g,'R',2);applique(g,'R',5);
    },
    decoro(g){tappeto(g,3,2,5,4,'#6b2a2a','#c9a65a','#8a3a32')},
    // finestre, applique e un lampadario al centro
    luci(){const [mx,my]=iso(4,4);return [...[2,5].map(t=>{const [wx,wy]=iso(0,t);return [wx-6,wy-34,20,.5]}),lampada('R',2),lampada('R',5),[mx,my-20,46,.45]]}},
  // porta = casella della parete destra dove sta la porta d'uscita, oppure false
  // Ingresso: dove si comincia e dove si esce. Marmo, pareti verde scuro, il custode, la piantina, i varchi verso i rami del museo
  // e la porta d'uscita sulla parete destra, con il cartello verde sopra.
  ingresso:{w:10,h:8,ox:148,oy:76,porta:8,
    zona:()=>'ingresso',
    pav:{ingresso:['#8d8579','#827a6e','#5f584e','#a2998a']},
    muro:{fondo:['#2f3a3a','#3c4a48'],zoccolo:['#1f2828','#283433'],cornice:['#435352','#5a6e6b'],fascia:'#b8892f'},
    pareti(g){
      pareteVarchiPianta(g,'ingresso');
      // stendardo del museo e manifesto della mostra
      onWall(g,'L',0,3,9,48,30,(u,v,W,H)=>v===H-1?(u%2?'#e0b04f':null):(u===3?'#1f4a46':'#2d6b64'));
      onWall(g,'R',6,2,10,42,22,framed((u,v,W,H)=>v<4?'#c2493c':v>H-5?'#2a2030':(u+v)%4===0?'#e0b04f':'#efe2c4'));
      onWall(g,'L',7,2,10,40,16,framed((u,v)=>v%4===1&&u>1?'#3a2a1a':'#efe2c4','#6b5226'));
      onWall(g,'R',8,4,8,44,5,(u,v,W,H)=>(u===0||u===W||v===0||v===H-1)?'#1c4a2c':'#4fd17e');
      [['R',3],['R',7],['L',4]].forEach(([s_,t])=>applique(g,s_,t));
    },
    decoro(g){tappeto(g,4,2,5,7,'#7a2a24','#c9a65a','#8f3229')},
    luci(){const l=[['R',3],['R',7],['L',4]].map(([s_,t])=>lampada(s_,t)),k=OBJ.find(o=>o.id==='keeper');
      if(k){const [kx,ky]=base(k);l.push([kx+5,ky-4,22,.7])}return l}}
};
const sfondi={};
// Grana del pavimento: con la stanza ingrandita le mattonelle a tinta unita sembravano piatte.
// Qualche pixel un po' più chiaro o più scuro del colore della mattonella, sempre negli stessi punti (niente a caso).
const tono=(hex,k)=>{const n=parseInt(hex.slice(1),16),c=v=>Math.max(0,Math.min(255,Math.round(v*k)));
  return '#'+((c(n>>16)<<16)|(c(n>>8&255)<<8)|c(n&255)).toString(16).padStart(6,'0')};
function granaPavimento(g,cx,cy,x,y,base){
  if(!/^#[0-9a-f]{6}$/i.test(base))return;const scuro=tono(base,.9),chiaro=tono(base,1.08);
  for(let r=1;r<11;r++){const w=r<6?2*r+2:2*(11-r)+2;
    for(let c=-w+2;c<w-2;c++){const h=((x*73856093)^(y*19349663)^(r*83492791)^(c*2654435761))>>>0;
      if(h%29===0){g.fillStyle=scuro;g.fillRect(cx+c,cy+r,1,1)}else if(h%41===0){g.fillStyle=chiaro;g.fillRect(cx+c,cy+r,1,1)}}}
}
function buildBg(){
  if(sfondi[S.room])return;
  const st=STANZE[S.room],c=document.createElement('canvas');c.width=VW;c.height=VH;const g=c.getContext('2d');
  for(let x=0;x<MW;x++){const [cx,cy]=iso(x,0);for(let i=0;i<12;i++)wallCol(g,cx+i,cy+Math.floor(i/2),false,st.muro)}
  for(let y=0;y<MH;y++){const [cx,cy]=iso(0,y);for(let i=0;i<12;i++)wallCol(g,cx-12+i,cy+6-Math.floor(i/2),true,st.muro)}
  g.fillStyle='#0f0b18';g.fillRect(OX,OY-WH,1,WH);
  for(let s=0;s<MW+MH;s++)for(let x=0;x<MW;x++){const y=s-x;if(y<0||y>=MH)continue;
    const [cx,cy]=iso(x,y),p=st.pav[st.zona(x,y)],base=(x+y)%2?p[0]:p[1];
    for(let r=0;r<12;r++){const w=r<6?2*r+2:2*(11-r)+2;g.fillStyle=base;g.fillRect(cx-w,cy+r,w*2,1);
      if(r<6){g.fillStyle=p[2];g.fillRect(cx-w,cy+r,1,1);g.fillRect(cx+w-1,cy+r,1,1)}}
    granaPavimento(g,cx,cy,x,y,base);
    if(p[3]&&(x+y)%2===0){g.fillStyle=p[3];g.fillRect(cx-1,cy+5,2,2)}
  }
  st.decoro&&st.decoro(g);
  st.pareti(g);
  sfondi[S.room]=c;
}
// Assegna dimensioni, oggetti e sfondo della stanza id, senza dissolvenza.
function entraStanza(id){
  const st=STANZE[id];if(!st)return;chiudiDialoghi();S.room=id;MW=st.w;MH=st.h;OX=st.ox;OY=st.oy;OBJ=OGGETTI[id]||[];buildBg();
  inquadra();TRAIETTORIE.scia=[];
  if(typeof suonaStanza==='function')suonaStanza(id); // js/musica.js
}
// Inquadratura (compito 4): la tela mostra solo il riquadro della stanza corrente, non tutto il fondo VW×VH,
// e fit() lo ingrandisce fino a riempire la finestra. Tutto si disegna ancora nelle coordinate di sempre:
// render() sposta il disegno con setTransform, toCanvas() riporta il mouse nelle stesse coordinate.
let VISTA={x:0,y:0,w:VW,h:VH};
function inquadra(){
  const m=6,x0=OX-MH*HW-m,x1=OX+MW*HW+m,y0=OY-WH-m-4,y1=OY+(MW+MH)*HH+m;
  VISTA={x:x0,y:y0,w:x1-x0,h:y1-y0};fit();
}
// Porta il giocatore nella stanza id, in (x,y). Il cambio è immediato; la dissolvenza è solo visiva.
// ultimoCambio evita i rimbalzi (tasto tenuto, doppio tocco) anche senza dissolvenza
let ultimoCambio=-1e9;
function vaiInStanza(id,x,y){
  if(S.fade||performance.now()-ultimoCambio<400)return;
  $('etichetta').hidden=true;
  ultimoCambio=performance.now();
  held=null;P.path=[];P.pending=null;P.moving=false;
  entraStanza(id);P.x=P.tx=P.px=x;P.y=P.ty=P.py=y;
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)S.fade=1;
}

/* ---------- Oggetti ---------- */
function drawLectern(o){const [bx,by]=base(o);
  diamond(ctx,bx,by+1,4,2,'rgba(0,0,0,.3)');R(ctx,bx-3,by-1,6,2,'#2b2416');R(ctx,bx-1,by-11,2,10,'#3d3320');
  R(ctx,bx-6,by-18,12,7,'#e0b04f');R(ctx,bx-5,by-17,10,5,'#b8892f');R(ctx,bx-4,by-16,8,1,'#f4dc9a');R(ctx,bx-4,by-14,6,1,'#f4dc9a');
}
function drawDesk(o,t){const [bx,by]=base(o);
  box(ctx,bx,by+1,10,5,8,'#5b3b2a','#4a2f22','#3a251b');
  R(ctx,bx-5,by-10,7,4,'#efe2c4');R(ctx,bx-4,by-9,5,1,'#8a7350');
  R(ctx,bx+4,by-16,1,7,'#3a3a3a');R(ctx,bx+2,by-18,5,3,'#2f6b4a');R(ctx,bx+3,by-15,3,1,'#fff1b8');
}
// plastico di Villa Godi: ali con finestre, loggia a tre archi al piano nobile, scalinata all'arco centrale
function drawVilla(o){const [bx,by]=base(o);
  box(ctx,bx,by+1,11,5,8,'#6b4a33','#4f3625','#3e2a1c');
  box(ctx,bx,by-7,9,4,10,'#a0583c','#d9cfb4','#c4b896');
  faceL(bx,by-7,9,4,(x,y,i)=>{if(i%2)[8,4].forEach(d=>R(ctx,x,y-d,1,2,'#3a2a1a'))});
  faceR(bx,by-7,9,4,(x,y,i)=>{
    if(i>=3&&i<=7){if(i%2)R(ctx,x,y-9,1,3,'#241c2c');R(ctx,x,y-6,1,1,'#b8b0a0')}
    else if(i%2===0)[8,4].forEach(d=>R(ctx,x,y-d,1,2,'#3a2a1a'));
    if(i===5)for(let k=0;k<5;k++)R(ctx,x-1+Math.floor(k/2),y-1-k,2,1,'#efe6cc')});
  R(ctx,bx-6,by-24,2,3,'#c4b896');R(ctx,bx+5,by-22,2,3,'#c4b896');
}
// busto di marmo su colonna
function drawBust(o){const [bx,by]=base(o);
  diamond(ctx,bx,by+1,5,2,'rgba(0,0,0,.3)');box(ctx,bx,by+1,4,2,13,'#d8d2c4','#b8b0a0','#9a9284');
  R(ctx,bx-4,by-16,8,3,'#d8d2c4');R(ctx,bx-2,by-22,4,6,'#e6e0d2');R(ctx,bx-2,by-23,4,2,'#cfc8b8');R(ctx,bx+1,by-19,1,1,'#9a9284');
}
// leggio con la pianta del museo: un foglio crema con i rami e i punti delle stanze
function drawPiantina(o,t){const [bx,by]=base(o);
  diamond(ctx,bx,by+1,5,2,'rgba(0,0,0,.3)');R(ctx,bx-1,by-12,2,12,'#3d3320');R(ctx,bx-4,by-1,8,2,'#2b2416');
  R(ctx,bx-9,by-24,18,12,'#6b5226');R(ctx,bx-8,by-23,16,10,'#efe2c4');
  [[-6,-14,0,-6],[0,-20,0,-6],[0,-20,-5,-5],[0,-20,5,-4]].forEach(([x,y,dx,dy])=>{for(let k=0;k<6;k++)R(ctx,bx+x+Math.round(dx*k/6),by+y+Math.round(dy*k/6)+(y<-15?0:0),1,1,'#8a7350')});
  [[-6,-15],[0,-15],[0,-21],[-5,-22],[5,-21],[4,-16]].forEach(([x,y],i)=>R(ctx,bx+x-1,by+y,2,2,i%2?'#c2493c':'#2d6b64'));
  if(Math.floor(t/600)%2)R(ctx,bx-1,by-14,2,2,'#e0b04f');
}
function drawBench(o){const [bx,by]=base(o);box(ctx,bx,by+1,10,5,5,'#7a5236','#5a3a26','#46301f')}
function drawPlant(o,t){const [bx,by]=base(o);
  box(ctx,bx,by+1,4,2,6,'#a0522d','#7d3f22','#62311a');
  [[-4,-14,4,5],[1,-16,4,6],[-2,-20,4,6],[-6,-10,4,3],[3,-11,4,3]].forEach(([x,y,w,h],k)=>R(ctx,bx+x,by+y,w,h,k%2?'#3f6b3a':'#5a8a46'));
}
const PERSON={
  front:['..hhhh..','.hhhhhh.','.hssssh.','.sesses.','..ssss..','.rrrrrr.','rrrrrrrr','rdrrrrdr','sdrrrrds','.rrrrrr.','.bbbbbb.','.bb..bb.','.bb..bb.','.kk..kk.'],
  back: ['..hhhh..','.hhhhhh.','.hhhhhh.','.hhhhhh.','..ssss..','.rrrrrr.','rrrrrrrr','rrrrrrrr','srrrrrrs','.rrrrrr.','.bbbbbb.','.bb..bb.','.bb..bb.','.kk..kk.'],
  walk: ['.bbbbbb.','..bb.bb.','..bb..bb','..kk..kk']
};
const PPAL={h:'#3b2618',s:'#e8b98f',e:'#1a1424',r:'#c2493c',d:'#8f3229',b:'#3b4f7a',k:'#1a1424'};
const KEEPER=['..cccc..','cccccccc','.assssa.','.sesses.','..ssss..','.uuuuuu.','uuuguuuu','uuuguuuu','suuguuus','.uuuuuu.','.uuuuuu.','.uu..uu.','.uu..uu.','.kk..kk.'];
const KPAL={c:'#22305a',a:'#bdb6a8',s:'#d9a77c',e:'#1a1424',u:'#2b3a6b',g:'#e0b04f',k:'#140f1c'};
function drawKeeper(o,t){const [bx,by]=base(o);
  diamond(ctx,bx,by+1,5,2,'rgba(0,0,0,.35)');spr(KEEPER,KPAL,bx-4,by-13-(Math.floor(t/700)%2));
  R(ctx,bx+4,by-6,2,3,'#fff1b8');
}
function drawPlayer(t){
  const [cx,cy]=iso(P.px,P.py),bx=cx,by=cy+6,step=P.moving?Math.floor(P.walk*9)%2:0;
  diamond(ctx,bx,by+1,5,2,'rgba(0,0,0,.35)');
  const rows=(P.fx<0||P.fy<0?PERSON.back:PERSON.front).slice();
  if(step)rows.splice(10,4,...PERSON.walk);
  spr(rows,PPAL,bx-4,by-13-step);
}
function sparkle(x,y,t){const b=Math.floor(t/250)%4;R(ctx,x-1,y-1-(b%2),3,3,'#e0b04f');R(ctx,x,y-(b%2),1,1,'#fff3c4');if(b===0){R(ctx,x-3,y,1,1,'#fff3c4');R(ctx,x+3,y-2,1,1,'#fff3c4')}}
const base=o=>{const [cx,cy]=iso(o.x,o.y);return [cx,cy+6]};

const solidAt=(x,y)=>OBJ.some(o=>o.x===x&&o.y===y);
const walkable=(x,y)=>x>=0&&y>=0&&x<MW&&y<MH&&!solidAt(x,y);

function drawDoor(t){
  const pt=STANZE[S.room].porta;if(pt===false||pt==null)return;
  const [cx,cy]=iso(pt,0),open=S.door;
  for(let i=2;i<=11;i++){const px=cx+i,fy=cy+Math.floor(i/2);
    for(let v=0;v<32;v++){const y=fy-32+v,edge=i===2||i===11||v===0;
      let c=edge?'#e0b04f':'#3b2a1e';
      if(!edge){const reveal=(i-3)/8<open;c=reveal?(v>26?'#d9c38a':'#f7e7b0'):((v===10||v===22)?'#5a3e2a':(i===9&&v===16?'#e0b04f':'#3b2a1e'))}
      ctx.fillStyle=c;ctx.fillRect(px,y,1,1)}}
}

/* ---------- Luce ---------- */
const lc=document.createElement('canvas');lc.width=VW;lc.height=VH;const lx=lc.getContext('2d');
function hole(x,y,r,k=1){const g=lx.createRadialGradient(x,y,0,x,y,r);
  g.addColorStop(0,`rgba(0,0,0,${k})`);g.addColorStop(.45,`rgba(0,0,0,${k})`);g.addColorStop(.45,`rgba(0,0,0,${k*.6})`);
  g.addColorStop(.72,`rgba(0,0,0,${k*.6})`);g.addColorStop(.72,`rgba(0,0,0,${k*.28})`);g.addColorStop(1,'rgba(0,0,0,0)');
  lx.fillStyle=g;lx.fillRect(x-r,y-r,r*2,r*2)}
function drawLight(t){
  lx.globalCompositeOperation='source-over';lx.clearRect(0,0,VW,VH);lx.fillStyle='rgba(9,6,22,.64)';lx.fillRect(0,0,VW,VH);
  lx.globalCompositeOperation='destination-out';
  const [pcx,pcy]=iso(P.px,P.py);hole(pcx,pcy,62);
  // centro della luce di un oggetto: sul riquadro se è appeso alla parete (hit), altrimenti a metà altezza
  const centroLuce=o=>{if(o.hit){const [x,y,w,h]=o.hit();return [x+w/2,y+h/2]}const [bx,by]=base(o);return [bx,by-o.h/2]};
  OBJ.forEach(o=>{if(o.light){const [lx_,ly_]=centroLuce(o);hole(lx_,ly_,24,.8)}});
  OBJ.forEach(o=>{if(o.acceso&&o.hit&&o.acceso()){const [x,y,w,h]=o.hit();hole(x+w/2,y+h/2,30,.9)}});
  STANZE[S.room].luci().forEach(l=>hole(...l));
  if(STANZE[S.room].porta!==false){const [dx,dy]=iso(STANZE[S.room].porta,0);hole(dx+7,dy-14,18+S.door*30,.6+S.door*.4)}
  ctx.drawImage(lc,0,0);
  ctx.globalCompositeOperation='lighter';
  OBJ.forEach(o=>{if(o.light){const [bx,cy]=centroLuce(o);const g=ctx.createRadialGradient(bx,cy,0,bx,cy,22);g.addColorStop(0,'rgba(224,176,79,.16)');g.addColorStop(1,'rgba(224,176,79,0)');ctx.fillStyle=g;ctx.fillRect(bx-22,cy-22,44,44)}});
  ctx.globalCompositeOperation='source-over';
}
const motes=Array.from({length:26},(_,i)=>({x:(i*53)%VW,y:(i*97)%VH,s:.004+((i*7)%5)*.0015,p:i}));
function drawMotes(t){motes.forEach(m=>{if(!movimentoRidotto.matches){m.y-=m.s*16;if(m.y<0)m.y=VH}R(ctx,m.x+Math.sin(t/1400+m.p)*3,m.y,1,1,'rgba(240,230,207,.35)')})}

/* ---------- Loop ---------- */
let target=null,last=performance.now();
// «Riduci movimento» (regola 4 di CLAUDE.md): il tempo delle animazioni resta fermo a 0 e il pulviscolo non cade.
// Si muove solo quello che fa il giocatore.
const movimentoRidotto=matchMedia('(prefers-reduced-motion: reduce)');
function frame(now){
  const dt=Math.min(.05,(now-last)/1000);last=now;
  update(dt);render(movimentoRidotto.matches?0:now);
  requestAnimationFrame(frame);
}
function render(t){
  ctx.setTransform(1,0,0,1,-VISTA.x,-VISTA.y);
  // fuori dalla stanza non un fondo piatto: un alone tenue dietro la stanza che sfuma nel buio ai bordi
  const fx=OX+(MW-MH)*HW/2,fy=OY+(MW+MH)*HH/2-WH/2,fondo=ctx.createRadialGradient(fx,fy,10,fx,fy,Math.max(VISTA.w,VISTA.h)*.75);
  fondo.addColorStop(0,'#1c1534');fondo.addColorStop(1,'#07050d');ctx.fillStyle=fondo;ctx.fillRect(VISTA.x,VISTA.y,VISTA.w,VISTA.h);
  ctx.drawImage(sfondi[S.room],0,0);drawDoor(t);disegnaTraiettorie();
  const accesi=OBJ.filter(o=>o.acceso&&o.hit&&o.acceso());accesi.forEach(o=>varcoAcceso(o,t));
  const list=OBJ.filter(o=>o.draw).map(o=>({d:o.x+o.y,f:()=>o.draw(o,t)}));
  list.push({d:P.px+P.py+.01,f:()=>drawPlayer(t)});
  list.sort((a,b)=>a.d-b.d).forEach(e=>e.f());
  drawMotes(t);drawLight(t);disegnaStrada();
  accesi.forEach(o=>{const [x,y,w]=o.hit();sparkle(x+Math.floor(w/2),y-14,t)});
  if(S.fade>0){ctx.fillStyle=`rgba(11,8,20,${S.fade})`;ctx.fillRect(0,0,VW,VH)}
  if(target&&!blocked()){let x,y;if(target.hit){const [hx,hy,hw]=target.hit();x=hx+Math.floor(hw/2);y=hy-8}else{[x,y]=base(target);y-=target.h+5}
    y+=Math.floor(t/300)%2;R(ctx,x-2,y,5,1,'#e0b04f');R(ctx,x-1,y+1,3,1,'#e0b04f');R(ctx,x,y+2,1,1,'#e0b04f')}
}
const blocked=()=>!S.started||!$('dialog').hidden||!$('modal').hidden||S.done||S.fade>0;
function update(dt){
  if(S.started&&!S.done){S.elapsed+=dt;const s=Math.floor(S.elapsed);$('time').textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
  if(S.door>0&&S.door<1)S.door=Math.min(1,S.door+dt*.8);
  if(S.fade>0)S.fade=Math.max(0,S.fade-dt/.35);
  if(P.moving){const dx=P.tx-P.px,dy=P.ty-P.py,d=Math.hypot(dx,dy),sp=5*dt;P.walk+=dt;
    if(d<=sp){P.px=P.tx;P.py=P.ty;P.moving=false}else{P.px+=dx/d*sp;P.py+=dy/d*sp}}
  if(!P.moving&&!blocked()){
    if(P.path.length){const [nx,ny]=P.path.shift();if(walkable(nx,ny))stepTo(nx,ny);else P.path=[]}
    else if(P.pending){const o=P.pending;P.pending=null;if(adj(o)){P.fx=Math.sign(o.x-P.x);P.fy=Math.sign(o.y-P.y);interact(o)}}
    else if(held){P.fx=held[0];P.fy=held[1];const nx=P.x+held[0],ny=P.y+held[1];if(walkable(nx,ny))stepTo(nx,ny)}
  }
  target=P.moving?null:nearest();
  const pr=$('prompt');
  if(target&&!blocked()){pr.innerHTML='<b>E</b> · '+target.name;pr.hidden=false}else pr.hidden=true;
  if(blocked())etichetta.hidden=true; // un dialogo o una finestra che si apre col mouse fermo copre il nome
}
function stepTo(nx,ny){TRAIETTORIE.scia.push([P.x,P.y]);if(TRAIETTORIE.scia.length>14)TRAIETTORIE.scia.shift();
  P.fx=nx-P.x;P.fy=ny-P.y;P.x=P.tx=nx;P.y=P.ty=ny;P.moving=true}
/* ---------- Traiettorie (compito 6, si accendono nelle impostazioni) ---------- */
// La strada che il personaggio sta per fare (P.path, dopo un clic) a puntini dorati fino alla meta,
// e dietro di lui le ultime orme. Si ricorda in localStorage (fuoriOrario.traiettorie); la scia si svuota cambiando stanza.
const TRAIETTORIE={on:(()=>{try{return localStorage.getItem('fuoriOrario.traiettorie')==='1'}catch(e){return false}})(),scia:[]};
function disegnaTraiettorie(){
  if(!TRAIETTORIE.on)return;
  const centro=(x,y)=>{const [cx,cy]=iso(x,y);return [cx,cy+6]};
  // orme: due puntini per casella, sempre più chiari verso il personaggio
  TRAIETTORIE.scia.forEach(([x,y],i,a)=>{const [cx,cy]=centro(x,y),k=(i+1)/a.length;
    ctx.fillStyle=`rgba(240,230,207,${(.12+.4*k).toFixed(2)})`;ctx.fillRect(cx-3,cy-1,2,1);ctx.fillRect(cx+1,cy+1,2,1)});
}
// La strada da fare si disegna dopo la luce, sopra tutto, così si vede anche sui tappeti e al buio:
// puntini dorati con un bordo scuro lungo i segmenti tra i centri delle caselle, poi un rombo sulla meta.
function disegnaStrada(){
  if(!TRAIETTORIE.on||!P.path.length)return;
  const punti=[[P.x,P.y],...P.path].map(([x,y])=>{const [cx,cy]=iso(x,y);return [cx,cy+6]});
  const punto=(x,y)=>{ctx.fillStyle='rgba(20,14,28,.85)';ctx.fillRect(x-2,y-1,4,3);ctx.fillStyle='#e0b04f';ctx.fillRect(x-1,y,2,1)};
  for(let i=1;i<punti.length;i++){const [ax,ay]=punti[i-1],[bx,by]=punti[i],n=Math.max(1,Math.round(Math.hypot(bx-ax,by-ay)/5));
    for(let k=1;k<=n;k++)punto(Math.round(ax+(bx-ax)*k/n),Math.round(ay+(by-ay)*k/n))}
  const [mx,my]=punti[punti.length-1];
  diamond(ctx,mx,my,10,5,'rgba(20,14,28,.6)');diamond(ctx,mx,my,8,4,'#e0b04f');diamond(ctx,mx,my,6,3,'rgba(20,14,28,.85)');
}
function traiettorie(on){TRAIETTORIE.on=!!on;TRAIETTORIE.scia=[];try{localStorage.setItem('fuoriOrario.traiettorie',on?'1':'0')}catch(e){}}
const adj=o=>Math.abs(o.x-P.x)+Math.abs(o.y-P.y)===1;
function nearest(){const c=OBJ.filter(o=>o.act&&adj(o));if(!c.length)return null;return c.find(o=>o.x-P.x===P.fx&&o.y-P.y===P.fy)||c[0]}
function interact(o){if(o&&o.act)o.act()}

function bfs(goals){
  const k=(x,y)=>x+','+y,start=k(P.x,P.y),prev=new Map([[start,null]]),q=[[P.x,P.y]];
  while(q.length){const [x,y]=q.shift(),kk=k(x,y);
    if(goals.has(kk)){const path=[];let c=kk;while(c!==start){path.unshift(c.split(',').map(Number));c=prev.get(c)}return path}
    for(const [dx,dy] of DIRS){const nx=x+dx,ny=y+dy,nk=k(nx,ny);if(!prev.has(nk)&&walkable(nx,ny)){prev.set(nk,kk);q.push([nx,ny])}}}
  return null;
}

/* ---------- Input ---------- */
let held=null;
const KEYS={ArrowUp:[0,-1],w:[0,-1],W:[0,-1],ArrowDown:[0,1],s:[0,1],S:[0,1],ArrowLeft:[-1,0],a:[-1,0],A:[-1,0],ArrowRight:[1,0],d:[1,0],D:[1,0]};
addEventListener('keydown',e=>{
  if(!$('modal').hidden){if(e.key==='Escape')closeModal();else if(modalKey)modalKey(e);return}
  if(!$('dialog').hidden&&['e','E',' ','Enter'].includes(e.key)){e.preventDefault();advance();return}
  if(KEYS[e.key]){e.preventDefault();held=KEYS[e.key];P.path=[];P.pending=null;return}
  if(['e','E',' ','Enter'].includes(e.key)&&!e.repeat&&!blocked()){e.preventDefault();interact(nearest())}
});
addEventListener('keyup',e=>{if(KEYS[e.key]&&held===KEYS[e.key])held=null});
function toCanvas(e){const r=cv.getBoundingClientRect();return [VISTA.x+(e.clientX-r.left)/r.width*VISTA.w,VISTA.y+(e.clientY-r.top)/r.height*VISTA.h]}
function hitObj(mx,my){
  // porte e varchi (con hit) prima degli oggetti che stanno davanti alla parete
  return OBJ.filter(o=>o.act).sort((a,b)=>(!!b.hit-!!a.hit)||(b.x+b.y)-(a.x+a.y)).find(o=>{
    const [x,y,w,h]=o.hit?o.hit():(()=>{const [bx,by]=base(o);return [bx-11,by-o.h,22,o.h+5]})();
    return mx>=x&&mx<x+w&&my>=y&&my<y+h});
}
cv.addEventListener('click',e=>{
  if(blocked())return;const [mx,my]=toCanvas(e),o=hitObj(mx,my);
  if(o){const goals=new Set(DIRS.map(([dx,dy])=>[o.x+dx,o.y+dy]).filter(([x,y])=>walkable(x,y)||(x===P.x&&y===P.y)).map(([x,y])=>x+','+y));
    const path=bfs(goals);if(path){P.path=path;P.pending=o}return}
  const dx=(mx-OX)/HW,dy=(my-OY)/HH,gx=Math.floor((dy+dx)/2),gy=Math.floor((dy-dx)/2);
  if(walkable(gx,gy)){const path=bfs(new Set([gx+','+gy]));if(path){P.path=path;P.pending=null}}
});
// Con il mouse sopra un oggetto compare il suo nome; sopra un varco, il nome della stanza dove porta (sul telefono no: c'è il nome in alto).
const etichetta=document.createElement('div');etichetta.id='etichetta';etichetta.hidden=true;$('stage').appendChild(etichetta);
const stanzaDelVarco=o=>o&&o.hit&&/^Varco: /.test(o.name)?o.name.replace(/^Varco: /,''):null;
const nomeAlPassaggio=o=>o?stanzaDelVarco(o)||o.name||null:null;
cv.addEventListener('pointermove',e=>{const [mx,my]=toCanvas(e),o=hitObj(mx,my);cv.style.cursor=o?'pointer':'default';
  const nome=e.pointerType==='mouse'&&!blocked()&&nomeAlPassaggio(o);etichetta.hidden=!nome;if(!nome)return;
  const s=$('stage').getBoundingClientRect();etichetta.textContent=nome;// l'etichetta è ingrandita con --zoom, che vale anche per left e top: divido per restare sotto il mouse
  const z=parseFloat(getComputedStyle(etichetta).zoom)||1;etichetta.style.left=(e.clientX-s.left)/z+'px';etichetta.style.top=(e.clientY-s.top)/z+'px'});
cv.addEventListener('pointerleave',()=>etichetta.hidden=true);
document.querySelectorAll('.dpad button').forEach(b=>{
  const d=b.dataset.d.split(',').map(Number);
  b.addEventListener('pointerdown',e=>{e.preventDefault();held=d;P.path=[];P.pending=null});
  ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,()=>{if(held===d)held=null}));
});
$('btnAct').addEventListener('click',()=>{if(!$('dialog').hidden)advance();else if(!blocked())interact(nearest())});

/* ---------- Dialoghi ---------- */
let dq=[],dcb=null,typing=null,full='';
function say(who,lines,cb){$('dWho').textContent=who;dq=lines.slice();dcb=cb||null;$('dialog').hidden=false;held=null;nextLine()}
function nextLine(){
  full=dq.shift();const el=$('dText');let i=0;clearInterval(typing);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=full;typing=null;return}
  el.textContent='';typing=setInterval(()=>{el.textContent=full.slice(0,++i);if(i>=full.length){clearInterval(typing);typing=null}},16);
}
function advance(){
  if(typing){clearInterval(typing);typing=null;$('dText').textContent=full;return}
  if(dq.length)nextLine();else{$('dialog').hidden=true;const cb=dcb;dcb=null;cb&&cb();if($('dialog').hidden&&sospesi.length)riprendiDialogo()}
}
// Compito 3: il dialogo va avanti con un clic in qualsiasi punto dello schermo, non solo sul riquadro.
// Non sui pulsanti e sui campi (fanno il loro lavoro) e non quando sopra c'è una finestra o la schermata del titolo.
document.addEventListener('click',e=>{
  if($('dialog').hidden||!$('modal').hidden||!e.target.isConnected)return; // isConnected: un pulsante appena tolto dalla finestra
  if(e.target.closest('button,a,input,select,textarea,label,#modal,#title'))return;
  advance();
});
// Compito 4: i pulsanti in alto funzionano anche durante un dialogo.
// sopraDialogo(fn) mette da parte il dialogo aperto, esegue fn (per esempio l'Aiuto, che apre un altro dialogo)
// e quando quel dialogo finisce riprende il primo dalla riga dov'era, con il suo seguito (cb).
let sospesi=[];
function sopraDialogo(fn){
  if($('dialog').hidden)return fn();
  clearInterval(typing);typing=null;
  sospesi.push({who:$('dWho').textContent,dq:[full,...dq],cb:dcb});dq=[];dcb=null;$('dialog').hidden=true;
  fn();if($('dialog').hidden)riprendiDialogo();
}
function riprendiDialogo(){
  const s=sospesi.pop();if(!s)return;
  $('dWho').textContent=s.who;dq=s.dq;dcb=s.cb;full=dq.shift();$('dText').textContent=full;$('dialog').hidden=false;held=null;
}
// Cambiando stanza (per esempio con «Vai alla stanza» dalla Mappa durante un dialogo) i dialoghi aperti si chiudono,
// ma il loro seguito si fa lo stesso: un dialogo può dare un sigillo o aprire la porta quando finisce.
function chiudiDialoghi(){
  if($('dialog').hidden&&!sospesi.length)return;
  const cbs=[dcb,...sospesi.map(s=>s.cb).reverse()].filter(Boolean);
  clearInterval(typing);typing=null;dq=[];dcb=null;sospesi=[];$('dialog').hidden=true;cbs.forEach(cb=>cb());
}

function toast(msg){const t=$('toast');t.textContent=msg;t.hidden=false;clearTimeout(toast.h);toast.h=setTimeout(()=>t.hidden=true,2400)}

let modalKey=null;
function openModal(html){$('card').innerHTML=html;$('modal').hidden=false;held=null;modalKey=null;const f=$('card').querySelector('button');f&&f.focus()}
function closeModal(){$('modal').hidden=true;modalKey=null;cv.focus?.()}
$('modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
const closeBtn='<button type="button" data-close>Chiudi</button>';
$('card').addEventListener('click',e=>{if(e.target.closest('[data-close]'))closeModal()});
function bad(el,msg){const m=$('msg');m.textContent=msg;m.className='msg bad';el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake')}
// Un'icona per ogni sigillo di SEALS, accese quelle già prese.
// Con le sale a tema il conteggio di tutti i sigilli è il pulsante «Sigilli n/15» di js/sale/registro.js: le icone si nascondono.
function hud(){
  const box=$('seals'),n=Object.keys(SEALS).length;
  box.style.display=typeof sigilliTotali==='function'?'none':'';
  while(box.querySelectorAll('i').length<n)box.appendChild(document.createElement('i'));
  while(box.querySelectorAll('i').length>n)box.querySelector('i').remove();
  box.querySelectorAll('i').forEach((el,i)=>el.classList.toggle('on',i<sealCount()));
}

// La tela ha la misura del riquadro della stanza (VISTA) e si ingrandisce fino a riempire la finestra.
// Ingrandimento intero se toglie poco spazio (pixel tutti uguali), altrimenti quello che riempie di più.
// Sugli schermi grandi scritte, pulsanti e finestre crescono con la finestra (richiesta di Dumunzio):
// 1 fino a 1280×800, la misura su cui è disegnata l'interfaccia, poi in proporzione fino a 2. Lo usa css/style.css (--zoom).
// Si moltiplica per la dimensione del testo scelta nelle impostazioni (localStorage fuoriOrario.testo), che vale anche sul telefono.
const DIMENSIONI_TESTO={piccolo:{nome:'Piccolo',k:.85},normale:{nome:'Normale',k:1},grande:{nome:'Grande',k:1.25}};
function dimensioneTesto(){try{const d=localStorage.getItem('fuoriOrario.testo');return DIMENSIONI_TESTO[d]?d:'normale'}catch(e){return 'normale'}}
function zoomInterfaccia(){const z=Math.max(1,Math.min(2,innerWidth/1280,innerHeight/800))*DIMENSIONI_TESTO[dimensioneTesto()].k;
  document.documentElement.style.setProperty('--zoom',(Math.round(z*20)/20).toString())}
function fit(){
  zoomInterfaccia();
  const st=$('stage'),w=st.clientWidth,h=st.clientHeight,v=VISTA;
  if(cv.width!==v.w||cv.height!==v.h){cv.width=v.w;cv.height=v.h}
  let s=Math.min(w/v.w,h/v.h);if(s>=2&&Math.floor(s)/s>.92)s=Math.floor(s);
  cv.style.width=Math.floor(v.w*s)+'px';cv.style.height=Math.floor(v.h*s)+'px';
}
addEventListener('resize',fit);
