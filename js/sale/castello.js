/* Sala del Castello: il "castello" di Thiene, che in realtà è un fondaco diventato villa.
   Fonte: Wikipedia, Castello di Thiene. Area: sale. */
{
const ID='castello',COL='#b5523f';
const WT={titolo:'Wikipedia: Castello di Thiene',url:'https://it.wikipedia.org/wiki/Castello_di_Thiene'};
const C={
  cas_fondaco:{title:'Un castello che non lo è',where:'Sala del Castello',lines:[
    'Il castello di Thiene fu costruito nel Quattrocento per Francesco Porto, uno dei signori più ricchi di Vicenza. Le due torri laterali e le mura merlate lo fanno sembrare un castello.',
    'In origine però era una casa fondaco: un magazzino per i prodotti agricoli della zona. Lo raccontano i cinque grandi archi del pianterreno e la grande pentafora del primo piano, che davano luce e aria alle merci.',
    'Somiglia al Fondaco dei Turchi di Venezia. Tra castello medievale e villa palladiana, è un caso unico. Lo chiamano castello perché la gente l\'ha sempre chiamato così.']},
  cas_famiglie:{title:'Tre famiglie, cinque secoli',where:'Sala del Castello',lines:[
    'Nel Cinquecento Francesco Porto junior, nipote del primo, alza il palazzo: il nuovo secondo piano diventa magazzino e il primo diventa piano nobile, arredato e abitato.',
    'Sono suoi anche i due scaloni simmetrici ai lati della loggia e la cinta di mura merlate.',
    'I Porto tengono il castello fino al 1816, poi passa ai Colleoni per tre generazioni, e dal 1918 alla famiglia di Thiene, che lo possiede ancora.']},
  cas_scuderia:{title:'La scuderia',where:'Sala del Castello',lines:[
    'La scuderia è del Settecento e, secondo la tradizione, su disegno di Francesco Muttoni. Ha 32 stalli, 16 per lato.',
    'Le colonne che dividono gli stalli sono di marmo rosso, con putti in pietra di Vicenza. Dei ferri sulle colonne permettevano allo stalliere di alzare il divisorio tra i cavalli e passare da uno stallo all\'altro.',
    'Al pianterreno, il «camerone del Camino» è affrescato da Giovanni Battista Zelotti e Giovanni Antonio Fasolo, allievi di Paolo Veronese.']}
};
// Le carte da dividere: [testo, 'c' = lo fa sembrare un castello, 'f' = racconta il fondaco e la villa]
const CARTE=[['Due torri laterali','c'],['Una cinta di mura merlata','c'],['Cinque grandi archi al pianterreno','f'],
  ['Una grande pentafora al primo piano','f'],['Un piano nobile arredato e abitato','f'],['Un secondo piano usato come magazzino','f']];

/* ---------- Disegno ---------- */
// Facciata vista di fronte: due torri merlate, tetto, pentafora al primo piano, cinque archi al pianterreno.
const FACCIATA=['m.m.........m.m','ttt.........ttt','tttrrrrrrrrrttt','tgtbbbbbbbbbtgt','tttpbpbpbpbpttt','tttbbbbbbbbbttt','tgtababababatgt','tttababababattt','tttbbbbbbbbbttt'];
const FACCIATA_PAL={m:'#e6c9a3',t:'#e6c9a3',g:'#5a3e2a',r:'#9c3b30',b:'#d9b98a',p:'#3a2a1a',a:'#2a2030'};
function drawCastello(o,t){const [bx,by]=base(o);
  diamond(ctx,bx,by+1,16,7,'#6f8a5c');
  sprS(FACCIATA,FACCIATA_PAL,bx-15,by-18,2);
  if(tessereS()[ID])sparkle(bx,by-24,t);
}
function drawStallo(o){const [bx,by]=base(o);
  R(ctx,bx-7,by-20,2,20,'#9c3b30');R(ctx,bx+5,by-20,2,20,'#8f3229');R(ctx,bx-7,by-22,14,2,'#7a5236');
  R(ctx,bx-5,by-6,10,6,'#6a4632');R(ctx,bx-2,by-26,4,4,'#d9d4c7');
}
const STANZA={w:8,h:8,ox:160,oy:70,
  zona:(x,y)=>(x+y)%2?'a':'b',
  pav:{a:['#b0896a','#a8826a','#7a5a44'],b:['#d6c2a6','#cdb99d','#9a8670']},
  pareti(g){
    tintaPareti(g,'#a8876a','#8a6c52','#5a4636','#d9b98a');
    // affreschi del camerone del Camino: quattro scene in cornice
    [1,3].forEach(x=>quadro(g,'R',x,1,11,46,22,(u,v,W,H)=>v<6?'#7d9ab8':(u+v+x)%7===0?'#c2493c':v>H-6?'#8a7350':'#e6c9a3'));
    [2,5].forEach(y=>quadro(g,'L',y,1,11,46,22,(u,v,W,H)=>v<5?'#9fb4c8':(u*2+v+y)%9===0?'#2d3a5e':v>H-7?'#6f8a5c':'#efd9b8'));
    // un camino
    onWall(g,'R',6,1,11,26,26,(u,v,W,H)=>v<4?'#9a8670':(u>2&&u<W-2&&v>8)?'#1a1424':'#c7b49a');
  },
  luci:()=>{const [x,y]=iso(6,0);return [[x+6,y-6,22,.5]]}};
const OGGETTI_SALA=[
  {id:'castello',x:4,y:3,h:28,name:'Plastico del castello di Thiene',draw:drawCastello,light:1,
    act:oggettoSala(ID,()=>apri(),'Il plastico ora ha due cartellini: «sembra un castello» sulle torri, «era un fondaco» sugli archi.')},
  cartellino('casPl1','cas_fondaco',2,4,COL,C.cas_fondaco.title),
  cartellino('casPl2','cas_famiglie',5,6,COL,C.cas_famiglie.title),
  cartellino('casPl3','cas_scuderia',6,2,COL,C.cas_scuderia.title),
  {id:'stallo',x:1,y:1,h:26,draw:drawStallo,name:'Uno stallo della scuderia',act:()=>say('Stallo',['Uno dei 32 stalli della scuderia, 16 per lato. Le colonne sono di marmo rosso.'])}
];

/* ---------- Rompicapo: castello o fondaco? ---------- */
function apri(){
  const dove=CARTE.map(()=>null),ordine=mescola(CARTE.map((_,i)=>i),5);
  finestraSala(ID,'Castello o fondaco?',`
    <p class="clue">Il castello di Thiene inganna chi lo guarda. Metti ogni elemento nel cesto giusto: cosa lo fa sembrare un castello, e cosa racconta che era un magazzino diventato villa? Tocca un elemento per spostarlo da un cesto all'altro.</p>
    <div id="slCast" style="display:grid;gap:8px">
    <div class="sl-cesti">
      <div><h3>Sembra un castello</h3><div class="sl-scelte" id="slC"></div></div>
      <div><h3>Era un fondaco, poi villa</h3><div class="sl-scelte" id="slF"></div></div>
    </div>
    <p class="eyebrow">Da sistemare</p><div class="sl-scelte" id="slDa"></div>
    </div>
    <div class="row"><button type="button" class="primary" id="slControlla">Controlla</button></div>`,()=>{
    const disegna=()=>{
      ['slC','slF','slDa'].forEach(id=>$(id).innerHTML='');
      ordine.forEach(i=>{const b=document.createElement('button');b.type='button';b.dataset.i=i;b.textContent=CARTE[i][0];
        $(dove[i]==='c'?'slC':dove[i]==='f'?'slF':'slDa').appendChild(b)});
      $('slDa').previousElementSibling.hidden=!dove.includes(null);
    };
    $('slCast').onclick=e=>{const b=e.target.closest('button');if(!b)return;const i=+b.dataset.i;
      dove[i]=dove[i]===null?'c':dove[i]==='c'?'f':null;disegna()};
    $('slControlla').onclick=()=>{
      if(dove.includes(null))return bad($('slDa'),'Ci sono ancora elementi da sistemare.');
      const errori=CARTE.filter(([,k],i)=>dove[i]!==k).length;
      if(!errori)risoltoSala(ID,'Esatto: torri e merli fanno il castello, archi, pentafora e piani raccontano il magazzino diventato villa.');
      else bad($('slC'),`${errori} ${errori===1?'elemento è':'elementi sono'} nel cesto sbagliato. Il cartellino «Un castello che non lo è» li elenca.`);
    };
    disegna();
  });
  return dove;
}

registraSala({id:ID,nome:'Sala del Castello',colore:COL,
  benvenuto:['Sala del Castello.','Il castello di Thiene ha torri e merli, ma non è mai stato un vero castello. Scopri cosa nasconde.'],
  stanza:STANZA,ritorno:{lato:'L',t:6},oggetti:OGGETTI_SALA,cartellini:C,
  aiuti:['Tocca un elemento una volta per metterlo tra «Sembra un castello», due volte per «Era un fondaco», tre volte per riportarlo giù.',
    'Solo due elementi fanno sembrare l\'edificio un castello, e servivano anche a difenderlo.',
    'Torri e mura merlate: castello. Archi, pentafora, piano nobile e magazzino al secondo piano: fondaco e villa.'],
  tessera:{titolo:'Castello di Thiene',
    testo:'Il castello di Thiene, chiamato anche palazzo Porto Colleoni Thiene. Costruito nel Quattrocento come casa fondaco, è un esempio di residenza di campagna prima di Palladio: sta tra il castello medievale e la villa. Dal 1918 è della famiglia di Thiene.',
    foto:{file:'img/sale/castello.jpg',alt:'La facciata del castello di Thiene con le due torri merlate ai lati',autore:'Superchilum',licenza:'CC BY-SA 4.0',pagina:'https://commons.wikimedia.org/wiki/File:Castello_di_Thiene_01.jpg'}},
  fonti:{
    cas_fondaco:[{fatto:'Quattrocento, Francesco Porto; torri e mura merlate; casa fondaco per prodotti agricoli; cinque archi e pentafora; somiglianza con il Fondaco dei Turchi; chiamato castello per tradizione',stato:'verificato',fonte:WT}],
    cas_famiglie:[{fatto:'Sopraelevazione cinquecentesca di Francesco Porto junior, scaloni simmetrici e mura merlate; Porto fino al 1816, Colleoni, di Thiene dal 1918',stato:'verificato',fonte:WT}],
    cas_scuderia:[{fatto:'Scuderia del XVIII secolo, attribuita per tradizione a Muttoni, 32 stalli; affreschi di Zelotti e Fasolo nel camerone del Camino',stato:'verificato',fonte:WT}],
    'tessera-castello':[{fatto:'Nome palazzo Porto Colleoni Thiene, residenza pre-palladiana, famiglia di Thiene dal 1918',stato:'verificato',fonte:WT}]},
  schede:[
    {id:'castelloThiene',chiavi:['castello','thiene','porto','colleoni','fondaco','pentafora'],
      testo:'Il castello di Thiene non è un vero castello: fu costruito nel Quattrocento per Francesco Porto come casa fondaco, un magazzino per i prodotti agricoli. Le torri e i merli lo fanno sembrare un castello, gli archi e la pentafora raccontano il magazzino. Dal 1918 è della famiglia di Thiene.',fonte:WT},
    {id:'scuderia',chiavi:['scuderia','stalli','cavalli','muttoni'],
      testo:'La scuderia del castello di Thiene è del Settecento, per tradizione su disegno di Francesco Muttoni: 32 stalli, 16 per lato, con colonne di marmo rosso e putti in pietra di Vicenza.',fonte:WT}],
  test:()=>{const d=apri();CARTE.forEach(([,k],i)=>{const n=k==='c'?1:2;for(let j=0;j<n;j++)$('slCast').querySelector(`button[data-i="${i}"]`).click()});$('slControlla').click()}
});
}
