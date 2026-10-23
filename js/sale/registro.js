/* Sale a tema: l'atrio, il varco dal museo, i sigilli delle sale e gli strumenti comuni dei rompicapi.
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

/* ---------- Dettagli di contorno (compito 5): oggetti che riempiono le sale come nel museo ---------- */
// Un oggetto di contorno: senza nome è solo decoro; con nome e frasi si può esaminare.
// light:1 li fa illuminare dal motore, così si vedono chiari anche nelle sale più buie.
const contorno=(id,x,y,h,draw,nome,frasi)=>nome?{id,x,y,h,name:nome,draw,light:1,act:()=>say(nome,frasi)}:{id,x,y,h,draw,light:1};
// Panchina con schienale a listelli e gambe di ferro.
function drawPanchina(o){const [bx,by]=base(o);
  diamond(ctx,bx,by+2,7,3,'rgba(0,0,0,.25)');
  [[-6,0],[5,0],[-6,-3],[5,-3]].forEach(([x,y])=>R(ctx,bx+x,by+y-4,1,5,'#2b2a2e'));
  for(let k=0;k<3;k++)R(ctx,bx-7,by-6-k*2,15,1,k%2?'#8a5a3a':'#9a6a44');
  R(ctx,bx-7,by-5,15,1,'#5a3a26');R(ctx,bx-6,by-15,1,9,'#2b2a2e');R(ctx,bx+6,by-15,1,9,'#2b2a2e');
  for(let k=0;k<3;k++)R(ctx,bx-7,by-15+k*3,15,2,k%2?'#8a5a3a':'#9a6a44')}
// Grande Guerra: sacchi di sabbia, cassa, filo spinato, elmetto, barella, lanterna.
function drawSacchi(o){const [bx,by]=base(o);
  [[-7,-3],[0,-3],[-4,-7],[3,-7],[-1,-11]].forEach(([x,y],k)=>{R(ctx,bx+x,by+y,7,4,k%2?'#a8946a':'#b8a47a');R(ctx,bx+x,by+y+3,7,1,'#7a6a4e');R(ctx,bx+x+3,by+y,1,4,'#8a7a5a')})}
function drawCassa(o){const [bx,by]=base(o);box(ctx,bx,by+1,7,3,9,'#8a6a44','#6e5236','#5a4228');
  R(ctx,bx-6,by-4,6,1,'#4e3a24');R(ctx,bx+1,by-4,6,1,'#3e2e1c');R(ctx,bx-2,by-8,4,2,'#c9b98a')}
function drawFilo(o){const [bx,by]=base(o);
  R(ctx,bx-8,by-10,1,10,'#5a4630');R(ctx,bx+8,by-10,1,10,'#5a4630');
  for(let k=0;k<17;k++){const y=by-4-Math.round(Math.sin(k*1.3)*3);R(ctx,bx-8+k,y,1,1,'#8a8d95');if(k%3===0)R(ctx,bx-8+k,y-1,1,3,'#b0b4bc')}}
function drawElmetto(o){const [bx,by]=base(o);diamond(ctx,bx,by,5,2,'rgba(0,0,0,.25)');
  R(ctx,bx-5,by-2,10,1,'#4a5a3a');R(ctx,bx-4,by-5,8,3,'#5f6b4a');R(ctx,bx-2,by-6,4,1,'#6f7b5a')}
function drawBarella(o){const [bx,by]=base(o);
  R(ctx,bx-9,by-3,18,1,'#6e5236');R(ctx,bx-9,by-6,18,1,'#6e5236');R(ctx,bx-7,by-6,14,3,'#a8a07a');R(ctx,bx-1,by-6,2,3,'#c2493c');R(ctx,bx-6,by-2,1,2,'#3a2a1a');R(ctx,bx+5,by-2,1,2,'#3a2a1a')}
function drawLanterna(o,t){const [bx,by]=base(o),f=(Math.floor(tAnim(t)/180)%3);
  R(ctx,bx-3,by-1,6,1,'#2b2a2e');R(ctx,bx-3,by-9,6,8,'#3a3a40');R(ctx,bx-2,by-8,4,6,['#ffd27a','#ffe39c','#ffc85a'][f]);R(ctx,bx-1,by-12,2,3,'#3a3a40')}
// Lana: cesto di matasse, rocchetti, arcolaio, balla di lana.
function drawMatasse(o){const [bx,by]=base(o);box(ctx,bx,by+1,6,3,6,'#8a6a44','#6e5236','#5a4228');
  [['#c2493c',-5],['#e0b04f',-1],['#4a7aa8',3],['#5f8a6b',-3]].forEach(([c,x],k)=>{R(ctx,bx+x,by-9-(k===3?2:0),4,3,c);R(ctx,bx+x+1,by-8-(k===3?2:0),2,1,'rgba(0,0,0,.2)')})}
function drawRocchetti(o){const [bx,by]=base(o);box(ctx,bx,by+1,7,3,8,'#7a5236','#5a3a26','#46301f');
  ['#c2493c','#e0b04f','#4a7aa8','#efe2c4'].forEach((c,k)=>{const x=bx-6+k*3;R(ctx,x,by-14,2,1,'#8a6a44');R(ctx,x,by-13,2,4,c);R(ctx,x,by-9,2,1,'#8a6a44')})}
function drawArcolaio(o){const [bx,by]=base(o);
  R(ctx,bx-6,by-2,12,2,'#6e5236');R(ctx,bx-5,by-8,1,6,'#5a4228');R(ctx,bx+3,by-12,1,10,'#5a4228');
  for(let k=0;k<8;k++){const a=k*Math.PI/4;R(ctx,bx+3+Math.round(Math.cos(a)*6),by-18+Math.round(Math.sin(a)*6),1,1,'#8a6a44')}
  R(ctx,bx+2,by-19,3,3,'#3e2e1c');R(ctx,bx-7,by-10,4,3,'#efe2c4')}
function drawBalla(o){const [bx,by]=base(o);box(ctx,bx,by+1,7,3,10,'#e8dfc6','#c9bea2','#b3a585');R(ctx,bx-7,by-5,14,1,'#7a6a4e');R(ctx,bx-1,by-11,2,10,'#7a6a4e')}
// Acque della montagna: roccia con muschio, felce, bottiglia.
function drawRoccia(o){const [bx,by]=base(o);box(ctx,bx,by+1,7,3,6,'#7a7a72','#5f5f58','#4e4e48');
  R(ctx,bx-5,by-9,6,3,'#8a8a82');R(ctx,bx+1,by-10,4,3,'#6f6f68');R(ctx,bx-6,by-7,4,1,'#5f8a4e');R(ctx,bx+2,by-11,3,1,'#5f8a4e')}
function drawFelce(o){const [bx,by]=base(o);
  [[-6,-6,-1],[-3,-11,0],[2,-10,1],[5,-5,1]].forEach(([x,y,d])=>{for(let k=0;k<6;k++)R(ctx,bx+x+d*k,by+y+k*1,2,1,k%2?'#4f7a3e':'#5f8a4e')})}
// Storia e lettere: armatura, libreria, elica, valigia.
function drawArmatura(o){const [bx,by]=base(o);diamond(ctx,bx,by+1,4,2,'rgba(0,0,0,.3)');
  R(ctx,bx-3,by-2,6,2,'#3a3a40');R(ctx,bx-2,by-12,1,10,'#8a8d95');R(ctx,bx+1,by-12,1,10,'#8a8d95');R(ctx,bx-4,by-22,8,10,'#a0a4ac');
  R(ctx,bx-3,by-20,6,1,'#c9cdd4');R(ctx,bx-6,by-21,2,8,'#8a8d95');R(ctx,bx+4,by-21,2,8,'#8a8d95');R(ctx,bx-2,by-28,4,6,'#a0a4ac');R(ctx,bx-1,by-26,2,1,'#2b2a2e');R(ctx,bx,by-31,1,3,'#c2493c')}
function drawScaffaleLibri(o){const [bx,by]=base(o);box(ctx,bx,by+1,7,3,28,'#5a3e2a','#46301f','#3a2818');
  for(let r=0;r<4;r++)for(let k=0;k<5;k++)R(ctx,bx-6+k*2,by-26+r*6,1,4,['#c2493c','#4a7aa8','#e0b04f','#5f8a6b','#efe2c4'][(r+k)%5])}
// Barile di metallo e balla di fieno.
function drawBarile(o){const [bx,by]=base(o);diamond(ctx,bx,by+1,5,2,'rgba(0,0,0,.25)');R(ctx,bx-4,by-12,8,12,'#5f6b4a');R(ctx,bx-4,by-9,8,1,'#3e4a2e');R(ctx,bx-4,by-4,8,1,'#3e4a2e');R(ctx,bx-3,by-13,6,1,'#7a8a5e');R(ctx,bx+1,by-12,2,10,'#6f7b5a')}
function drawFieno(o){const [bx,by]=base(o);box(ctx,bx,by+1,7,3,9,'#d9b860','#b89a48','#9a7e38');R(ctx,bx-7,by-4,14,1,'#8a6a2a');[[-5,-11],[0,-12],[4,-10]].forEach(([x,y])=>R(ctx,bx+x,by+y,2,2,'#e8cc78'))}
function drawElica(o,t){const [bx,by]=base(o);R(ctx,bx-1,by-16,2,16,'#5a4228');R(ctx,bx-4,by-1,8,2,'#3a2818');
  R(ctx,bx-11,by-20,22,3,'#8a5a3a');R(ctx,bx-10,by-19,20,1,'#a87a54');R(ctx,bx-1,by-21,3,5,'#3e2e1c')}
// Arredi da museo, per ingresso, villa e uscita (js/stanza.js li usa con una freccia, perché registro.js si carica dopo).
// Colonnina d'ottone con il cordone rosso, come davanti alle opere.
function drawColonnina(o){const [bx,by]=base(o);
  [[-7,2],[7,-2]].forEach(([x,y])=>{diamond(ctx,bx+x,by+y,3,1,'#2b2416');R(ctx,bx+x-1,by+y-14,2,14,'#c9a65a');R(ctx,bx+x-2,by+y-16,4,2,'#e0b04f')});
  for(let k=0;k<=14;k++){const x=bx-7+k,y=by-12+Math.round(k*-4/14)+Math.round(Math.sin(k/14*Math.PI)*3);R(ctx,x,y,1,2,'#8f3229')}}
// Portaombrelli di ottone con un ombrello nero.
function drawPortaombrelli(o){const [bx,by]=base(o);diamond(ctx,bx,by+1,4,2,'rgba(0,0,0,.3)');
  R(ctx,bx-3,by-10,6,10,'#a8843e');R(ctx,bx-3,by-10,6,1,'#e0b04f');R(ctx,bx-1,by-20,1,10,'#2b2a2e');R(ctx,bx-3,by-21,4,2,'#2b2a2e');R(ctx,bx+1,by-16,1,6,'#5a3a26')}
// Espositore di dépliant: un leggio basso con le tasche colorate.
function drawEspositore(o){const [bx,by]=base(o);R(ctx,bx-1,by-8,2,8,'#3d3320');R(ctx,bx-4,by-1,8,2,'#2b2416');
  R(ctx,bx-6,by-22,12,14,'#5a3e2a');['#c2493c','#4a7aa8','#5f8a6b','#e0b04f'].forEach((c,k)=>R(ctx,bx-5+(k%2)*6,by-21+((k/2)|0)*7,4,5,c))}
// Colonna palladiana: base, fusto chiaro con le scanalature, capitello.
function drawColonna(o){const [bx,by]=base(o);diamond(ctx,bx,by+1,5,2,'rgba(0,0,0,.3)');
  box(ctx,bx,by+1,5,2,3,'#d9cfb4','#b8ad92','#9a907a');R(ctx,bx-3,by-30,6,28,'#e8dfc6');
  for(let k=0;k<3;k++)R(ctx,bx-2+k*2,by-29,1,26,'#c9bea2');box(ctx,bx,by-29,5,2,3,'#efe6cc','#c9bea2','#b3a585')}
// Tavolo con i disegni delle ville: fogli con piante simmetriche.
function drawTavoloDisegni(o){const [bx,by]=base(o);box(ctx,bx,by+1,10,5,9,'#7a5236','#5a3a26','#46301f');
  R(ctx,bx-7,by-12,9,5,'#efe2c4');R(ctx,bx+1,by-11,7,4,'#e8dfc6');
  [[-6,-11],[-3,-11],[-6,-9],[-3,-9],[2,-10],[5,-10]].forEach(([x,y])=>R(ctx,bx+x,by+y,2,1,'#3a4a6a'))}
// Attaccapanni con un cappotto da custode.
function drawAttaccapanni(o){const [bx,by]=base(o);diamond(ctx,bx,by+1,4,2,'rgba(0,0,0,.3)');
  R(ctx,bx-3,by-1,6,2,'#3a2818');R(ctx,bx,by-30,1,30,'#5a3a26');R(ctx,bx-3,by-30,7,1,'#5a3a26');
  R(ctx,bx-4,by-28,5,13,'#24345a');R(ctx,bx-3,by-27,3,2,'#2d3a5e');R(ctx,bx+2,by-29,3,3,'#3a2a1a')}
// Leggio con il libro delle firme dei visitatori.
function drawLibroFirme(o){const [bx,by]=base(o);diamond(ctx,bx,by+1,4,2,'rgba(0,0,0,.3)');
  R(ctx,bx-3,by-1,6,2,'#2b2416');R(ctx,bx-1,by-12,2,11,'#3d3320');R(ctx,bx-7,by-17,14,5,'#5a3e2a');
  R(ctx,bx-6,by-18,6,5,'#efe2c4');R(ctx,bx,by-18,6,5,'#e8dfc6');R(ctx,bx-5,by-16,4,1,'#3a2a1a');R(ctx,bx+1,by-15,4,1,'#3a2a1a');R(ctx,bx+3,by-21,1,4,'#2b2a2e')}
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
      'Ogni sala ha un rompicapo. Risolvilo e avrai il suo sigillo, con la foto vera del luogo.',
      'Ogni arco porta a una sala. Il leggio al centro è la guida: elenca tutte le sale e ti ci porta.',
      `La porta d'uscita si apre solo con tutti i ${sigilliTotali()} sigilli.`])}
  }));
}

/* ---------- Sigilli delle sale ---------- */
// Ogni sala vinta dà il suo sigillo, come le stanze del museo: per uscire servono tutti.
// Nel codice e nel salvataggio i sigilli delle sale si chiamano ancora «tessera» (S.tessere, SALA[id].tessera,
// voce del diario 'tessera-'+id): così la mappa, la pianta, la lingua e le partite salvate continuano a funzionare.
const tessereS=()=>S.tessere||(S.tessere={});
const tessereN=()=>SALE.filter(s=>tessereS()[s.id]).length;
// Tutti i sigilli del gioco: quelli del museo (SEALS, enigmi.js) e uno per sala.
const sigilliTotali=()=>Object.keys(SEALS).length+SALE.length;
const sigilliPresi=()=>sealCount()+tessereN();
function concediTessera(id){
  const s=SALA[id];if(tessereS()[id])return;
  tessereS()[id]=true;hudTessere();
  note('tessera-'+id,s.tessera.titolo,'Sigillo · '+s.nome,s.tessera.testo,true);
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
  openModal(`<div class="eyebrow">${nuova?'Nuovo sigillo · ':'Sigillo · '}${s.nome}</div>
    <h2>${T.titolo}</h2>
    <figure class="sl-foto${nuova?' sl-nuova':''}"><img src="${T.foto.file}" alt="${T.foto.alt}"><figcaption>${fotoCredito(T.foto)}</figcaption></figure>
    <p>${T.testo}</p>
    ${fonteHtml('tessera-'+id)}
    <div class="row end">${nuova?`<span class="eyebrow">Sigilli: ${sigilliPresi()} su ${sigilliTotali()}</span>`:''}${typeof apriMappa==='function'?'<button type="button" id="slMappa">Vedi sulla mappa</button>':''}<button type="button" id="slColl">Tutti i sigilli</button>${closeBtn}</div>`);
  $('slColl').onclick=apriCollezione;
  // la mappa del territorio (js/territorio.js) seleziona il luogo della sala, se apriMappa accetta l'id
  if($('slMappa'))$('slMappa').onclick=()=>apriMappa(id);
}
// Dove si trovano le sale: con la pianta partono dall'ingresso, senza dal varco del museo.
const doveSale=()=>MODO_PIANTA?'Le trovi nei rami del museo che partono dall\'ingresso.':'Le trovi passando dal varco sulla parete destra del museo.';
// I sigilli del museo nella collezione: senza foto, con il colore dell'ottone; si leggono dal diario.
const sigilliMuseo=()=>Object.keys(SEALS).map(k=>S.seals[k]
  ?`<div class="sl-t sl-museo" style="--c:#b8892f"><b>◆</b><span>${SEALS[k].title}</span></div>`
  :`<div class="sl-t sl-chiusa" style="--c:#b8892f"><b>?</b><span>${DOVE_SIGILLO[k]||'Museo'}</span></div>`).join('');
// Dove si trova un sigillo del museo ancora da prendere (come DOVE di enigmi.js, ma breve).
const DOVE_SIGILLO={loom:'Museo · Lanificio',chest:'Museo · Grande Guerra',archive:'Museo · Archivio',facade:'Sala delle Ville'};
function apriCollezione(){
  openModal(`<div class="eyebrow">Sigilli · ${sigilliPresi()} su ${sigilliTotali()}</div><h2>I tuoi sigilli</h2>
    <p>Ogni stanza con un rompicapo nasconde un sigillo: ${Object.keys(SEALS).length} nel museo e nella villa, uno in ogni sala del territorio. ${doveSale()} Per uscire servono tutti e ${sigilliTotali()}.</p>
    <div class="sl-collezione">${sigilliMuseo()}${SALE.map(s=>tessereS()[s.id]
      ?`<button type="button" class="sl-t" data-id="${s.id}" style="--c:${s.colore}"><img src="${s.tessera.foto.file}" alt=""><span>${s.tessera.titolo}</span></button>`
      :`<div class="sl-t sl-chiusa" style="--c:${s.colore}"><b>?</b><span>${s.nome}</span></div>`).join('')}</div>
    <div class="row end">${closeBtn}</div>`);
  $('card').querySelectorAll('.sl-t[data-id]').forEach(b=>b.onclick=()=>mostraTessera(b.dataset.id,false));
}
// Elenco delle sale, con il colore del loro arco e un pulsante per entrare.
function apriGuida(){
  openModal(`<div class="eyebrow">Atrio · ${SALE.length} sale · sigilli ${sigilliPresi()} su ${sigilliTotali()}</div><h2>Guida alle sale</h2>
    <p>Ogni arco dell'atrio porta a una sala: il colore della fascia sopra l'arco è quello qui accanto al nome. Puoi anche entrare da qui.</p>
    <div class="sl-scelte" id="slGuida">${SALE.map(s=>`<button type="button" data-id="${s.id}" style="display:flex;gap:10px;align-items:center"><span style="width:14px;height:14px;background:${s.colore};flex:none"></span><span style="flex:1">${s.nome}</span><span class="eyebrow">${tessereS()[s.id]?'sigillo preso':'da fare'} · Vai</span></button>`).join('')}</div>
    <div class="row end"><button type="button" id="slColl">Tutti i sigilli</button>${closeBtn}</div>`);
  $('slGuida').onclick=e=>{const b=e.target.closest('button');if(b){closeModal();entraInSala(b.dataset.id)}};
  $('slColl').onclick=apriCollezione;
}
// Riscrive il contatore solo quando cambia il numero: così non si rincorre con la traduzione inglese (js/lingua.js),
// che sostituisce il testo italiano con quello tradotto.
// Un solo conteggio per tutti i sigilli, museo e sale: «Sigilli 3/15». Apre la collezione.
let _tessereMostrate=null;
function hudTessere(){const b=$('btnTessere'),n=sigilliPresi()+'/'+sigilliTotali();
  if(b&&(n!==_tessereMostrate||!b.textContent)){_tessereMostrate=n;b.textContent=`Sigilli ${n}`}}
{
  const b=document.createElement('button');b.id='btnTessere';b.type='button';b.title='I tuoi sigilli';
  b.onclick=()=>{if(S.started&&$('modal').hidden)apriCollezione()}; // anche durante un dialogo, che resta sotto
  $('btnJournal').before(b);
  // Il conteggio si aggiorna da solo: così resta giusto anche dopo "Gioca ancora" o una ricarica.
  setInterval(hudTessere,400);setTimeout(hudTessere,0);
}

/* ---------- Per gli altri file (enigmi.js) ---------- */
// Per uscire servono tutti i sigilli, del museo e delle sale. Restituisce le righe da far dire alla porta se ne manca qualcuno,
// altrimenti null. Pensato per tryDoor(): const b=typeof bloccoUscita==='function'&&bloccoUscita();if(b)return say('Porta d\'uscita',b);
function bloccoUscita(){
  const tot=sigilliTotali(),n=sigilliPresi();if(n>=tot)return null;
  const museo=Object.keys(SEALS).filter(k=>!S.seals[k]).length,sale=SALE.filter(s=>!tessereS()[s.id]);
  const mancano=[museo===1?'1 sigillo nel museo o nella villa':museo?`${museo} sigilli nel museo e nella villa`:'',
    sale.length<=3?sale.map(s=>s.nome).join(', '):`${sale.length} sale del territorio`].filter(Boolean).join(' e ');
  return [`È chiusa. Sulla serratura ci sono ${tot} incavi a forma di sigillo: ne hai ${n}.`,`Ti mancano: ${mancano}.`];
}
// Se sei in una sala a tema, mostra il primo aiuto del suo rompicapo e restituisce true.
// Pensato per hint(): if(typeof aiutoSala==='function'&&aiutoSala())return;
function aiutoSala(){
  const s=SALA[S.room];if(!s)return false;
  say(s.nome,tessereS()[s.id]?['Hai già il sigillo di questa sala.',MODO_PIANTA?'Le porte accese portano alle stanze che hai già finito: segui le altre.':'Torna all\'atrio per le altre.']:[s.aiuti[0],'Nella finestra del rompicapo il pulsante Aiuto ti dà altri indizi.']);
  return true;
}
// Html con i sigilli delle sale, per la schermata finale (win), dopo quelli del museo.
function riepilogoTessere(){
  const prese=SALE.filter(s=>tessereS()[s.id]);
  return `<p class="eyebrow">Sigilli delle sale del territorio · ${prese.length} su ${SALE.length}</p>`+(prese.length
    ?`<div class="sl-collezione">${prese.map(s=>`<div class="sl-t" style="--c:${s.colore}"><img src="${s.tessera.foto.file}" alt=""><span>${s.tessera.titolo}</span></div>`).join('')}</div>`
    :`<p>Nessun sigillo delle sale, questa volta. ${doveSale()}</p>`);
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
// Rompicapo risolto: messaggio e pulsante per prendere il sigillo.
function risoltoSala(id,msg){
  const m=$('msg');m.textContent=msg;m.className='msg good';
  const row=$('card').querySelector('.row.end');row.innerHTML='<button class="primary" type="button" id="slPrendi">Prendi il sigillo</button>';
  $('slPrendi').focus();$('slPrendi').onclick=()=>{closeModal();concediTessera(id)};
}
// Azione dell'oggetto principale di una sala: rompicapo se manca il sigillo, altrimenti un ricordo.
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
.sl-museo b{position:absolute;inset:0;display:grid;place-items:center;font-size:44px;color:var(--c)}
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
