/* Sala delle Acque: Recoaro, le sue fonti, le terme e le bibite.
   Fonte: Wikipedia, Recoaro Terme. Area: sale. */
{
const ID='recoaro',COL='#3f8ab0';
const WR={titolo:'Wikipedia: Recoaro Terme',url:'https://it.wikipedia.org/wiki/Recoaro_Terme'};
const C={
  rec_acque:{title:'La Conca di Smeraldo',where:'Sala delle Acque',lines:[
    'Recoaro sta a 445 metri, in una conca ai piedi delle Piccole Dolomiti chiamata Conca di Smeraldo. Qui piove più che in qualsiasi altro posto del Veneto: oltre 2.000 millimetri l\'anno.',
    'Pioggia e rocce calcaree fanno nascere moltissime sorgenti di acqua minerale.',
    'Le acque furono scoperte nel 1689 dal conte Lelio Piovene: per questo la prima sorgente si chiama fonte Lelia.']},
  rec_terme:{title:'Le Fonti Centrali',where:'Sala delle Acque',lines:[
    'Lo stabilimento delle Fonti Centrali (1873-1876) è dell\'architetto Antonio Caregaro Negrin, lo stesso del Giardino Jacquard di Schio. Doveva gareggiare con le terme più eleganti d\'Europa.',
    'Il 20 aprile 1945, con il paese occupato dalle truppe tedesche, le Fonti furono bombardate dagli Alleati.',
    'Secondo alcuni, il filosofo Friedrich Nietzsche si ispirò al paesaggio di Recoaro per «Così parlò Zarathustra».']},
  rec_bibite:{title:'Dalla fonte alla bottiglia',where:'Sala delle Acque',lines:[
    'A fine 1927 l\'acqua della fonte Giuliana arriva nei negozi. Nel 1930 all\'ingresso del paese nasce il primo vero stabilimento di imbottigliamento.',
    'Con Emilio Rigamonti la Recoaro cresce in Italia e all\'estero, con tante bibite. Due hanno un nome solo suo: il Gingerino e l\'Acqua brillante.',
    'Oggi si vende l\'acqua oligominerale Lora, mentre le altre acque si usano nelle terme.']}
};
// Tubi: maschera dei lati aperti, N=1 E=2 S=4 W=8. I=dritto, L=curva.
const rot=m=>((m<<1)|(m>>3))&15;
const FORME={I:10,L:3};
const COLS=5,RIGHE=4,ENTRA=[0,1],ESCE=[4,2];
// Soluzione: [forma, rotazioni dalla forma base] per ogni casella, riga per riga
const SOL=[
  ['L',1],['I',1],['L',2],['I',0],['L',0],
  ['I',0],['L',2],['L',1],['L',2],['I',1],
  ['L',3],['L',0],['L',3],['L',0],['I',0],
  ['I',1],['L',1],['I',0],['L',3],['L',2]
];
const SPARGI=[1,2,3,1,2,3,1,2,1,3,2,1,3,2,1,2,3,1,2,3];
const mask=(f,r)=>{let m=FORME[f];for(let k=0;k<r%4;k++)m=rot(m);return m};

/* ---------- Disegno ---------- */
function drawFontana(o,t){const [bx,by]=base(o);
  box(ctx,bx,by+1,10,5,6,'#c7b49a','#a8977e','#8a7b66');
  diamond(ctx,bx,by-5,8,4,'#3f8ab0');
  box(ctx,bx,by-5,3,1,14,'#d9c8ae','#b8a78e','#9a8b74');
  for(let k=0;k<3;k++)R(ctx,bx-1+k,by-20+((t/120+k*3)%6),1,2,'#bfe6f0');
  if(tessereS()[ID])sparkle(bx+8,by-20,t);
}
function drawBottiglie(o,t){const [bx,by]=base(o);
  box(ctx,bx,by+1,9,4,8,'#5a3e2a','#46301f','#3a2818');
  [['#7fc4dc',-6],['#c2493c',-2],['#e0b04f',2],['#7fc4dc',6]].forEach(([c,x])=>{R(ctx,bx+x-1,by-18,3,8,c);R(ctx,bx+x,by-21,1,3,'#2a2030')});
  // bollicine che salgono nelle bottiglie: è acqua frizzante
  const tt=tAnim(t);[-6,-2,2,6].forEach((x,k)=>{for(let j=0;j<2;j++){const f=(tt/900+k*.27+j*.5)%1;R(ctx,bx+x-1+((k+j)%3),by-11-Math.round(f*6),1,1,'rgba(255,255,255,'+(.8-f*.5)+')')}});
}
function drawTubo(o){const [bx,by]=base(o);
  R(ctx,bx-8,by-14,16,3,'#8a8d95');R(ctx,bx+6,by-14,3,14,'#8a8d95');R(ctx,bx-9,by-16,3,7,'#6f727a');
}
const STANZA={w:8,h:8,ox:160,oy:70,
  zona:(x,y)=>x>1&&x<6&&y>1&&y<5?'vasca':'marmo',
  pav:{marmo:['#d6cfc2','#cdc6b9','#a8a194'],vasca:['#3f8ab0','#3a83a8','#2a6a8a','#bfe6f0']},
  pareti(g){
    tintaPareti(g,'#8fae9a','#728f7d','#4a5f52','#efe2c4');
    // archi liberty e una veduta della conca
    for(let x=0;x<8;x+=2)onWall(g,'R',x,1,11,46,26,(u,v)=>(u-5)**2+(v-8)**2<26&&(u-5)**2+(v-8)**2>14?'#efe2c4':null);
    for(let y=1;y<8;y+=2)onWall(g,'L',y,1,11,46,26,(u,v)=>(u-5)**2+(v-8)**2<26&&(u-5)**2+(v-8)**2>14?'#efe2c4':null);
    quadro(g,'L',4,1,11,46,20,(u,v,W,H)=>{const m=Math.abs(u-W/2)*1.2+4;return v<m?'#9fb4c8':v<H-6?'#4f7a4e':'#2f6a8a'},'#6b5226');
  },
  luci:()=>{const [x,y]=iso(4,3);return [[x,y-6,32,.5]]}};
const OGGETTI_SALA=[
  {id:'fontana',x:4,y:3,h:22,name:'La fonte Lelia',draw:drawFontana,light:1,
    act:()=>say('La fonte Lelia',['L\'acqua scoperta nel 1689 dal conte Lelio Piovene. Da qui deve arrivare fino alle bottiglie.','I tubi sono smontati: trovi il quadro di controllo vicino alla parete.'])},
  {id:'tubi',x:6,y:1,h:16,name:'Quadro dei tubi',draw:drawTubo,light:1,
    act:oggettoSala(ID,()=>apri(),'L\'acqua scorre dalla fonte alle bottiglie, senza perdere una goccia.')},
  {id:'bottiglie',x:6,y:5,h:22,name:'Banco delle bottiglie',draw:drawBottiglie,act:()=>say('Bottiglie',['Acqua minerale, Gingerino, Acqua brillante.'])},
  cartellinoMuro('recPl1','rec_acque','R',1,COL,C.rec_acque.title),
  cartellinoMuro('recPl2','rec_terme','R',3,COL,C.rec_terme.title),
  cartellinoMuro('recPl3','rec_bibite','L',2,COL,C.rec_bibite.title)
];

/* ---------- Rompicapo: dalla fonte alla bottiglia ---------- */
function apri(){
  const r=SOL.map(([,s],i)=>s+SPARGI[i]);const L=64;
  finestraSala(ID,'Dalla fonte alla bottiglia',`
    <p class="clue">L'acqua della fonte Lelia entra da sinistra e deve arrivare alle bottiglie, a destra. Tocca un tubo per girarlo. Quando l'acqua arriva in fondo, il quadro si accende.</p>
    <canvas class="sl-tela" id="slTubi" width="${COLS*L+L}" height="${RIGHE*L}" style="max-width:384px" aria-label="Griglia di tubi da girare"></canvas>`,()=>{
    const cv2=$('slTubi'),g=cv2.getContext('2d');
    const bagnate=()=>{const vis=new Set(),coda=[];const m0=mask(SOL[ENTRA[1]*COLS+ENTRA[0]][0],r[ENTRA[1]*COLS+ENTRA[0]]);
      if(!(m0&8))return {vis,fine:false};coda.push(ENTRA);vis.add(ENTRA.join());let fine=false;
      while(coda.length){const [x,y]=coda.shift(),m=mask(SOL[y*COLS+x][0],r[y*COLS+x]);
        if(x===ESCE[0]&&y===ESCE[1]&&(m&2))fine=true;
        [[1,0,-1,4],[2,1,0,8],[4,0,1,1],[8,-1,0,2]].forEach(([b,dx,dy,opp])=>{const nx=x+dx,ny=y+dy;
          if(!(m&b)||nx<0||ny<0||nx>=COLS||ny>=RIGHE||vis.has(nx+','+ny))return;
          if(mask(SOL[ny*COLS+nx][0],r[ny*COLS+nx])&opp){vis.add(nx+','+ny);coda.push([nx,ny])}})}
      return {vis,fine}};
    const disegna=()=>{const {vis,fine}=bagnate();
      g.fillStyle='#0f1a24';g.fillRect(0,0,cv2.width,cv2.height);
      for(let y=0;y<RIGHE;y++)for(let x=0;x<COLS;x++){const m=mask(SOL[y*COLS+x][0],r[y*COLS+x]),cx=x*L+L/2+L/2,cy=y*L+L/2,w=vis.has(x+','+y);
        g.strokeStyle='#2a3a48';g.strokeRect(x*L+L/2+1,y*L+1,L-2,L-2);
        g.strokeStyle=w?'#7fc4dc':'#8a8d95';g.lineWidth=14;g.lineCap='butt';
        [[1,0,-1],[2,1,0],[4,0,1],[8,-1,0]].forEach(([b,dx,dy])=>{if(m&b){g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+dx*L/2,cy+dy*L/2);g.stroke()}});
        g.fillStyle=w?'#7fc4dc':'#8a8d95';g.fillRect(cx-7,cy-7,14,14)}
      g.fillStyle='#3f8ab0';g.fillRect(0,ENTRA[1]*L+L/2-12,L/2,24);g.fillStyle='#efe2c4';g.font=fontTela(15);g.fillText('Lelia',2,ENTRA[1]*L+L/2-16);
      g.fillStyle=fine?'#e0b04f':'#5a3e2a';g.fillRect(COLS*L+L/2-2,ESCE[1]*L+L/2-12,10,24);
      return fine};
    cv2.onclick=e=>{if(!$('slTubi')||$('slPrendi'))return;const b=cv2.getBoundingClientRect(),x=Math.floor(((e.clientX-b.left)/b.width*cv2.width-L/2)/L),y=Math.floor((e.clientY-b.top)/b.height*cv2.height/L);
      if(x<0||y<0||x>=COLS||y>=RIGHE)return;r[y*COLS+x]++;
      if(disegna())risoltoSala(ID,'L\'acqua arriva fino alle bottiglie. Recoaro, dal 1689 a oggi: una fonte, e poi un\'industria.')};
    disegna();
  });
  return r;
}

registraSala({id:ID,nome:'Sala delle Acque',colore:COL,
  benvenuto:['Sala delle Acque.','Recoaro, la conca dove piove più che in tutto il Veneto. L\'acqua della fonte Lelia non arriva più alle bottiglie: rimetti a posto i tubi.'],
  stanza:STANZA,ritorno:{lato:'L',t:6},oggetti:OGGETTI_SALA,cartellini:C,
  aiuti:['Parti dalla fonte, a sinistra: il primo tubo deve avere un\'apertura verso sinistra. Poi segui l\'acqua, un tubo alla volta. I tubi bagnati diventano azzurri.',
    'Non servono tutti i tubi: l\'acqua fa uno zig-zag tra la seconda e la terza riga.',
    'Il percorso: dalla fonte vai a destra di una casella, scendi, vai a destra, risali, vai a destra, scendi e prosegui dritto fino alle bottiglie.'],
  tessera:{titolo:'Le Terme di Recoaro',
    testo:'Lo stabilimento delle Fonti Centrali di Recoaro, progettato da Antonio Caregaro Negrin tra il 1873 e il 1876. Le acque minerali di Recoaro sono note dal 1689: oggi l\'acqua Lora è in vendita e le altre si usano alle terme.',
    foto:{file:'img/sale/recoaro.jpg',alt:'Lo stabilimento delle terme di Recoaro, un edificio chiaro con un corpo centrale più alto',autore:'Lucamenini',licenza:'CC BY-SA 3.0',pagina:'https://commons.wikimedia.org/wiki/File:Terme_recoaro1.jpg'}},
  fonti:{
    rec_acque:[{fatto:'445 m, Conca di Smeraldo, piovosità oltre 2.000 mm la più alta del Veneto, rocce calcaree, acque scoperte nel 1689 da Lelio Piovene, fonte Lelia',stato:'verificato',fonte:WR}],
    rec_terme:[{fatto:'Fonti Centrali 1873-1876 di Caregaro Negrin; bombardate dagli Alleati il 20 aprile 1945; ipotesi su Nietzsche',stato:'verificato',fonte:WR,
      nota:'L\'ispirazione di Nietzsche è un\'ipotesi («si teorizza»), non un fatto: per questo diciamo «secondo alcuni».'}],
    rec_bibite:[{fatto:'Fonte Giuliana in vendita a fine 1927; imbottigliamento dal 1930; Emilio Rigamonti, Gingerino e Acqua brillante; acqua Lora',stato:'verificato',fonte:WR}],
    'tessera-recoaro':[{fatto:'Fonti Centrali di Caregaro Negrin 1873-1876; acque dal 1689; Lora in commercio',stato:'verificato',fonte:WR}]},
  schede:[
    {id:'recoaro',chiavi:['recoaro','terme','acqua','acque','fonti','lelia','piovene'],
      testo:'Le acque minerali di Recoaro furono scoperte nel 1689 dal conte Lelio Piovene, e la prima fonte si chiama Lelia. Lo stabilimento delle Fonti Centrali (1873-1876) è di Antonio Caregaro Negrin. Qui piove più che in qualsiasi altro posto del Veneto.',fonte:WR},
    {id:'gingerino',chiavi:['gingerino','bibite','bibita','acqua brillante','rigamonti','lora'],
      testo:'Il Gingerino e l\'Acqua brillante sono due bibite con il nome della Recoaro, lanciate quando l\'azienda crebbe con Emilio Rigamonti. Oggi l\'acqua di Recoaro in vendita è la Lora.',fonte:WR}],
  test:()=>{const r=apri();SOL.forEach(([,s],i)=>{r[i]=s+4});r[0]--;const cv2=$('slTubi'),b=cv2.getBoundingClientRect(),L=64;
    cv2.dispatchEvent(new MouseEvent('click',{clientX:b.left+(L/2+L/2)*b.width/cv2.width,clientY:b.top+(L/2)*b.height/cv2.height}))}
});
}
