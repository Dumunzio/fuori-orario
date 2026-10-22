/* Sala della Grotta: il Buso della Rana a Monte di Malo e i fossili del Priaboniano.
   Fonti: Wikipedia, Buso della Rana, Priabona, Monte di Malo. Area: sale. */
{
const ID='grotta',COL='#6b8a7a';
const WG={buso:{titolo:'Wikipedia: Buso della Rana',url:'https://it.wikipedia.org/wiki/Buso_della_Rana'},
  priabona:{titolo:'Wikipedia: Priabona',url:'https://it.wikipedia.org/wiki/Priabona'},
  malo:{titolo:'Wikipedia: Monte di Malo',url:'https://it.wikipedia.org/wiki/Monte_di_Malo'}};
const C={
  gro_buso:{title:'Il Buso della Rana',where:'Sala della Grotta',lines:[
    'Il Buso della Rana si apre a 340 metri, a Monte di Malo, lungo la strada verso Priabona. È una delle grotte più estese d\'Italia: oltre 30 chilometri di gallerie.',
    'È conosciuta da sempre: nel Neolitico era un luogo di lavoro. Gli abitanti del posto la esplorarono per la prima volta nel 1887.',
    'Il 17 marzo 2012 gli speleologi l\'hanno collegata al Buso della Pisatela, che sta sopra: insieme fanno circa 40 chilometri.']},
  gro_fossili:{title:'Animali di mare nella montagna',where:'Sala della Grotta',lines:[
    'All\'ingresso affiorano i calcari nummulitici del Priaboniano, pieni di nummuliti: gusci fossili a forma di moneta. Lì vicino, nelle rocce, si trovano anche granchi fossili.',
    'I denti di squalo invece si trovano più in fondo, setacciando la sabbia sul fondo della grotta.',
    'Il Priaboniano è un periodo geologico tra 38 e 34 milioni di anni fa. Prende il nome proprio da Priabona, la frazione di Monte di Malo dove affiorano le sue rocce.']},
  gro_sicurezza:{title:'Prima di entrare',where:'Sala della Grotta',lines:[
    'L\'ingresso si può visitare, ma l\'interno è un vero labirinto: cunicoli e laghetti che con il maltempo si allagano in fretta.',
    'Per entrare servono attrezzatura e speleologi esperti. Nel gioco ti basta una torcia: ma la batteria non è infinita.']}
};
// Il labirinto: # roccia, . passaggio, E ingresso, g granchio, n nummulite, d dente di squalo, w laghetto
const MAPPA=['###########','#E..#.....#','#.#.#.###.#','#g#n..#w#.#','#.###.#.#.#','#...#...#.#','###.#####.#','#d......#.#','###########'];
const FOSSILI={g:'un granchio fossile',n:'una nummulite',d:'un dente di squalo'};
const BATTERIA=70,CEL=32;

/* ---------- Disegno ---------- */
// Bocca della grotta: roccia con un'apertura scura.
const BOCCA=['....llrrrr....','..lrrrrrrrrr..','.rrrrkkkkrrrr.','rrrrkkkkkkrrrr','rlrkkkkkkkkrrr','rrrkkkkkkkkrlr','rrkkkkkkkkkkrr'];
const BOCCA_PAL={r:'#6f6a5c',l:'#8a8070',k:'#0b0814'};
function drawIngresso(o,t){const [bx,by]=base(o);
  diamond(ctx,bx,by+1,15,7,'#3a3429');
  sprS(BOCCA,BOCCA_PAL,bx-14,by-13,2);
  if(tessereS()[ID])sparkle(bx+12,by-14,t);
}
function drawVetrina(o){const [bx,by]=base(o);
  box(ctx,bx,by+1,8,4,10,'#3a2f4a','#2b2238','#211a2c');
  R(ctx,bx-5,by-15,4,3,'#c9b37a');R(ctx,bx,by-14,3,2,'#e6dcc4');R(ctx,bx+4,by-15,2,3,'#efe2c4');
  box(ctx,bx,by-9,8,4,12,'rgba(170,210,230,.18)','rgba(170,210,230,.12)','rgba(170,210,230,.08)');
}
function drawStalagmite(o){const [bx,by]=base(o);
  for(let r=0;r<18;r++){const w=Math.max(1,Math.round(r*.3));R(ctx,bx-w,by-18+r,w*2,1,r%5?'#8a8070':'#a89c86')}
}
const STANZA={w:8,h:8,ox:160,oy:70,
  zona:(x,y)=>x+y>9?'acqua':(x*3+y*5)%7===0?'ghiaia':'roccia',
  pav:{roccia:['#4a453c','#454037','#332f28'],ghiaia:['#5a5446','#55503f','#3c382f','#7a7260'],acqua:['#2f4a5a','#2b4554','#203440','#4f7a8a']},
  pareti(g){
    tintaPareti(g,'#57524a','#433f38','#2f2c27','#57524a');
    for(let x=0;x<8;x++)onWall(g,'R',x,0,11,WH,10,(u,v)=>v>((u*7+x*3)%6)?null:'#2f2c27');
    for(let y=0;y<8;y++)onWall(g,'L',y,0,11,WH,10,(u,v)=>v>((u*5+y*3)%6)?null:'#3a3630');
    // strati di roccia del Priaboniano
    quadro(g,'R',4,1,11,44,18,(u,v)=>['#c9b37a','#a89c86','#8a8070','#e6dcc4'][(v>>2)%4],'#4a3b2c');
  },
  luci:()=>{const [x,y]=iso(4,2);return [[x,y-10,28,.35]]}};
const OGGETTI_SALA=[
  {id:'ingresso',x:4,y:2,h:28,name:'Ingresso della grotta',draw:drawIngresso,light:1,
    act:oggettoSala(ID,()=>apri(),'La grotta è tornata buia e silenziosa. I tuoi tre fossili sono nella vetrina.')},
  {id:'vetrina',x:6,y:4,h:22,name:'Vetrina dei fossili',draw:drawVetrina,light:1,
    act:()=>say('Vetrina dei fossili',tessereS()[ID]?['Un granchio, una nummulite e un dente di squalo: animali di mare dentro una montagna.']:['La vetrina è vuota. I fossili sono ancora nella grotta.'])},
  cartellinoMuro('groPl1','gro_buso','L',2,COL,C.gro_buso.title),
  cartellinoMuro('groPl2','gro_fossili','L',4,COL,C.gro_fossili.title),
  cartellinoMuro('groPl3','gro_sicurezza','R',2,COL,C.gro_sicurezza.title),
  {id:'stalagmite',x:7,y:1,h:18,draw:drawStalagmite}
];

/* ---------- Rompicapo: con la torcia ---------- */
function apri(){
  const visti=new Set(),presi=new Set();let x=1,y=1,batteria=BATTERIA;
  const cella=(cx,cy)=>MAPPA[cy][cx];
  finestraSala(ID,'Con la torcia',`
    <p class="clue">Entra nel Buso della Rana, trova i tre fossili del cartellino e torna all'ingresso prima che la torcia si scarichi. Muoviti con le frecce della tastiera o con i pulsanti.</p>
    <canvas class="sl-tela" id="slGrotta" width="${MAPPA[0].length*CEL}" height="${MAPPA.length*CEL}" aria-label="La grotta al buio, illuminata solo intorno a te"></canvas>
    <div class="row"><span class="eyebrow" id="slStato"></span></div>
    <div class="row" id="slFrecce"><button type="button" data-d="-1,0" aria-label="Sinistra">◀</button><button type="button" data-d="0,-1" aria-label="Su">▲</button><button type="button" data-d="0,1" aria-label="Giù">▼</button><button type="button" data-d="1,0" aria-label="Destra">▶</button></div>`,()=>{
    const cv2=$('slGrotta'),g=cv2.getContext('2d');
    const illumina=()=>{for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)visti.add((x+dx)+','+(y+dy))};
    const disegna=()=>{
      g.fillStyle='#000';g.fillRect(0,0,cv2.width,cv2.height);
      MAPPA.forEach((riga,cy)=>[...riga].forEach((c,cx)=>{
        if(!visti.has(cx+','+cy))return;const vicino=Math.max(Math.abs(cx-x),Math.abs(cy-y))<=1;
        g.fillStyle=c==='#'?(vicino?'#6f6a5c':'#2f2c27'):c==='w'?(vicino?'#3f6a7a':'#1f3440'):(vicino?'#2a251e':'#14110c');
        g.fillRect(cx*CEL,cy*CEL,CEL,CEL);
        if(c==='E'){g.fillStyle='#7aa86a';g.fillRect(cx*CEL+10,cy*CEL+10,12,12)}
        if(FOSSILI[c]&&!presi.has(c)){g.fillStyle=vicino?'#e6dcc4':'#7a7260';g.beginPath();g.arc(cx*CEL+16,cy*CEL+16,6,0,7);g.fill()}
      }));
      const gr=g.createRadialGradient(x*CEL+16,y*CEL+16,4,x*CEL+16,y*CEL+16,52);gr.addColorStop(0,'rgba(255,230,160,.25)');gr.addColorStop(1,'rgba(255,230,160,0)');
      g.fillStyle=gr;g.fillRect(0,0,cv2.width,cv2.height);
      g.fillStyle='#c2493c';g.fillRect(x*CEL+11,y*CEL+8,10,16);g.fillStyle='#e8b98f';g.fillRect(x*CEL+12,y*CEL+4,8,6);
      $('slStato').textContent=`Batteria ${batteria} · Fossili ${presi.size} su 3`;
    };
    const muovi=(dx,dy)=>{
      if(!$('slGrotta'))return;
      const nx=x+dx,ny=y+dy,c=cella(nx,ny);
      if(c==='#'||c==='w'){const m=$('msg');m.className='msg';m.textContent=c==='w'?'Un laghetto: meglio non bagnarsi.':'Roccia.';return}
      x=nx;y=ny;batteria--;illumina();
      const m=$('msg');m.className='msg';m.textContent='';
      if(FOSSILI[c]&&!presi.has(c)){presi.add(c);m.className='msg good';m.textContent=`Hai trovato ${FOSSILI[c]}!`}
      if(c==='E'&&presi.size===3){disegna();modalKey=null;$('card').querySelectorAll('[data-d]').forEach(b=>b.disabled=true);
        return risoltoSala(ID,'Fuori, con tre fossili in tasca: un granchio, una nummulite e un dente di squalo. Animali di mare, dentro una montagna.')}
      if(c==='E'&&presi.size<3){m.textContent=`Sei all'ingresso, ma ti mancano ${3-presi.size} fossili.`}
      if(batteria<=0){x=1;y=1;batteria=BATTERIA;presi.clear();bad(cv2,'La torcia si spegne. Torni all\'ingresso seguendo la corda: riprova, ora conosci un po\' la strada.')}
      disegna();
    };
    $('slFrecce').onclick=e=>{const b=e.target.closest('[data-d]');if(b)muovi(...b.dataset.d.split(',').map(Number))};
    const TASTI={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],s:[0,1],a:[-1,0],d:[1,0]};
    modalKey=e=>{const d=TASTI[e.key];if(d){e.preventDefault&&e.preventDefault();muovi(...d)}};
    illumina();disegna();
  });
}

registraSala({id:ID,nome:'Sala della Grotta',colore:COL,
  benvenuto:['Sala della Grotta.','Questa è la bocca del Buso della Rana, a Monte di Malo. Dentro, al buio, ci sono fossili di animali di mare. Prendi la torcia.'],
  stanza:STANZA,ritorno:{lato:'L',t:6},oggetti:OGGETTI_SALA,cartellini:C,
  aiuti:['Il cartellino dei fossili dice dove cercarli: granchi e nummuliti vicino all\'ingresso, il dente di squalo in fondo.',
    'Dall\'ingresso, scendi: il granchio è a due passi. Per la nummulite prendi la galleria a destra e poi giù.',
    'Il dente di squalo è nell\'angolo in basso a sinistra: ci arrivi scendendo dalla galleria centrale. Poi torna indietro per la stessa strada.'],
  tessera:{titolo:'Un granchio di Priabona',
    testo:'Un granchio fossile (Branchioplax albertii) trovato a Priabona, Monte di Malo, vicino al Buso della Rana. Le rocce del Priaboniano, tra 38 e 34 milioni di anni fa, prendono il nome da questa frazione e sono piene di fossili di animali di mare.',
    foto:{file:'img/sale/grotta.jpg',alt:'Un granchio fossile chiaro dentro una pietra',autore:'Ghedoghedo',licenza:'CC BY-SA 4.0',pagina:'https://commons.wikimedia.org/wiki/File:Branchioplax_albertii_Priabona_Monte_di_Malo.JPG'}},
  fonti:{
    gro_buso:[{fatto:'Ingresso a 340 m a Monte di Malo verso Priabona; oltre 30 km; stazione neolitica; prima esplorazione nel 1887; unione con la Pisatela il 17 marzo 2012, circa 40 km',stato:'verificato',fonte:WG.buso,
      nota:'La lunghezza cambia tra le fonti (30.312 m, oltre 35 km, 40 km con la Pisatela): diciamo «oltre 30 chilometri».'}],
    gro_fossili:[{fatto:'Calcari nummulitici del Priaboniano all\'ingresso; granchi nelle rocce vicino all\'ingresso; denti di squalo nella sabbia sul fondo',stato:'verificato',fonte:WG.buso},
      {fatto:'Priaboniano tra 38 e 34 milioni di anni fa, nome da Priabona',stato:'verificato',fonte:WG.priabona}],
    gro_sicurezza:[{fatto:'Interno a labirinto con cunicoli e laghetti che si allagano col maltempo; servono speleologi esperti',stato:'verificato',fonte:WG.malo,
      nota:'La temperatura cambia tra le fonti: circa 12 °C dentro, 13-15 °C all\'ingresso.'}],
    'tessera-grotta':[{fatto:'Branchioplax albertii da Priabona, Monte di Malo (descrizione della foto su Commons)',stato:'verificato',fonte:{titolo:'Wikimedia Commons: la foto',url:'https://commons.wikimedia.org/wiki/File:Branchioplax_albertii_Priabona_Monte_di_Malo.JPG'}},
      {fatto:'Priaboniano 38-34 milioni di anni fa',stato:'verificato',fonte:WG.priabona}]},
  schede:[
    {id:'busoRana',chiavi:['buso','rana','grotta','monte di malo','pisatela','speleologi'],
      testo:'Il Buso della Rana, a Monte di Malo, è una delle grotte più estese d\'Italia: oltre 30 chilometri, e circa 40 da quando nel 2012 è stata collegata al Buso della Pisatela. Fu esplorata per la prima volta dagli abitanti del posto nel 1887.',fonte:WG.buso},
    {id:'priaboniano',chiavi:['priaboniano','priabona','fossili','fossile','nummuliti','squalo','granchi'],
      testo:'Il Priaboniano è un periodo geologico tra 38 e 34 milioni di anni fa, e prende il nome da Priabona, frazione di Monte di Malo. Vicino al Buso della Rana si trovano granchi fossili e calcari pieni di nummuliti; sul fondo della grotta, denti di squalo.',fonte:WG.priabona}],
  test:()=>{apri();    // percorso: g, poi n, poi d, poi ritorno all'ingresso
    const via=[[0,1],[0,1],[0,-1],[0,-1],[1,0],[1,0],[0,1],[0,1],[0,-1],[0,-1],[-1,0],[-1,0],[0,1],[0,1],[0,1],[0,1],[1,0],[1,0],[0,1],[0,1],[-1,0],[-1,0],[1,0],[1,0],[0,-1],[0,-1],[-1,0],[-1,0],[0,-1],[0,-1],[0,-1],[0,-1]];
    via.forEach(([dx,dy])=>modalKey({key:dx===1?'ArrowRight':dx===-1?'ArrowLeft':dy===1?'ArrowDown':'ArrowUp'}))}
});
}
