/* Sala delle Mine: la guerra sotterranea dei due Denti del Pasubio, inverno 1917-18.
   Fonte: Wikipedia, Pasubio. Area: sale. */
{
const ID='mine',COL='#8a978a';
const C={
  mine_denti:{title:'I due Denti',where:'Sala delle Mine',lines:[
    'Sul crinale del Pasubio, poco sopra i 2.200 metri, due speroni di roccia stanno uno di fronte all\'altro, divisi da una selletta.',
    'Quello a sud fu fortificato dagli italiani, quello a nord dagli austro-ungarici: per questo si chiamano Dente Italiano e Dente austriaco.',
    'Dentro la roccia furono scavati ricoveri, postazioni e feritoie. Sul Pasubio si combatté per tre anni e mezzo.']},
  mine_guerra:{title:'La guerra delle mine',where:'Sala delle Mine',lines:[
    'Nell\'inverno 1917-18 si combatté anche sotto terra: ognuno scavava gallerie per arrivare sotto il nemico e farlo saltare con l\'esplosivo.',
    'Le gallerie austro-ungariche seguivano un progetto, con la Ellison come tratto principale verso il Dente Italiano. Quelle italiane sono contorte: erano contromine, scavate per fermare le gallerie nemiche.',
    'Il 13 marzo 1918 una grande mina austriaca, 50.000 chili di esplosivo, squarciò l\'avamposto del Dente Italiano.']}
};

/* ---------- Disegno ---------- */
function drawAscolto(o,t){const [bx,by]=base(o);
  box(ctx,bx,by+1,9,4,7,'#6b5a44','#4f4232','#3e3427');
  R(ctx,bx-7,by-14,14,6,'#2f2a22');R(ctx,bx-6,by-13,12,4,'#4b4436');
  // cuffia e mappa della roccia sul tavolo
  R(ctx,bx-2,by-20,5,1,'#1a1424');R(ctx,bx-3,by-19,2,3,'#3a3a3a');R(ctx,bx+2,by-19,2,3,'#3a3a3a');
  for(let k=0;k<4;k++)R(ctx,bx-5+k*3,by-12,2,2,tessereS()[ID]?'#e0b04f':(Math.floor(t/400+k)%4?'#5a5040':'#c9a65a'));
}
function drawPuntelli(o){const [bx,by]=base(o);
  R(ctx,bx-8,by-34,3,34,'#7a5236');R(ctx,bx+5,by-34,3,34,'#5a3a26');R(ctx,bx-8,by-36,16,4,'#8a603f');
  R(ctx,bx-1,by-30,2,3,'#fff1b8');R(ctx,bx-2,by-27,4,2,'#3a3a3a');
}
function drawCarrello(o){const [bx,by]=base(o);
  diamond(ctx,bx,by+1,7,3,'rgba(0,0,0,.35)');
  box(ctx,bx,by-2,7,3,7,'#5a5d5f','#45484a','#36383a');
  for(let k=-1;k<=1;k+=2){R(ctx,bx+k*5-1,by-2,3,3,'#1a1424')}
  R(ctx,bx-4,by-12,8,3,'#8a8d8f');
}
function drawSassi(o){const [bx,by]=base(o);
  [[-6,-3,6,4],[0,-5,7,6],[3,-2,5,3],[-3,-8,5,4]].forEach(([x,y,w,h],k)=>R(ctx,bx+x,by+y,w,h,k%2?'#9a9a92':'#7d7d76'));
}
const STANZA={w:8,h:8,ox:160,oy:70,
  zona:(x,y)=>(x===3||x===4)&&y>1?'galleria':'roccia',
  pav:{roccia:['#5d5e5a','#565753','#3f403c','#6f706b'],galleria:['#4a3d2e','#45392b','#33291f']},
  pareti(g){
    tintaPareti(g,'#6a6b66','#4e4f4b','#3a3a37','#6f706b');
    // venature della roccia
    for(let x=0;x<8;x++)onWall(g,'R',x,0,11,46,30,(u,v)=>(u*5+v*3+x*7)%17===0?'#3a3a37':null);
    for(let y=0;y<8;y++)onWall(g,'L',y,0,11,46,30,(u,v)=>(u*3+v*5+y*7)%19===0?'#8a8b85':null);
    // i due Denti visti da lontano
    quadro(g,'R',3,1,11,46,22,(u,v,W,H)=>{const a=Math.abs(u-2.5)*2.4,b=Math.abs(u-8)*2.4;return v>H-4?'#556b45':(v>a+3&&u<5)||(v>b+3&&u>5)?'#8a8b85':'#7d9ab8'},'#4a3b2c');
    quadro(g,'R',6,3,9,40,14,(u,v)=>v%3===0?'#2a2030':'#c9b98f','#4a3b2c');
  },
  luci:()=>{const [x,y]=iso(4,4);return [[x,y-6,26,.45]]}};
const OGGETTI_SALA=[
  {id:'ascolto',x:4,y:4,h:22,name:'Posto d\'ascolto',draw:drawAscolto,light:1,
    act:oggettoSala(ID,()=>apri(),'La contromina ha fermato la galleria. Ora nella roccia c\'è silenzio.')},
  cartellinoMuro('minePl1','mine_denti','L',2,COL,C.mine_denti.title),
  cartellinoMuro('minePl2','mine_guerra','L',4,COL,C.mine_guerra.title),
  {id:'puntelli',x:3,y:0,h:36,draw:drawPuntelli},
  {id:'carrello',x:6,y:6,h:12,draw:drawCarrello},
  {id:'sassi',x:1,y:1,h:8,draw:drawSassi}
];

/* ---------- Rompicapo: ascolta la roccia ---------- */
const N=6,ASCOLTI=4;
let tentativo=0;
function apri(){
  const r=mescola([...Array(N*N).keys()],31+tentativo*7);
  const meta=r[0];let ascolti=0,modo='ascolta';
  const mx=meta%N,my=Math.floor(meta/N);
  finestraSala(ID,'Ascolta la roccia',`
    <p class="clue">Sotto il Dente Italiano una galleria nemica avanza nella roccia. Tocca una casella per ascoltare: il numero dice quanti passi mancano alla testa della galleria, contando solo in orizzontale e in verticale. Hai ${ASCOLTI} ascolti, poi scava la contromina nel punto giusto.</p>
    <div class="sl-griglia" id="slRoccia" style="grid-template-columns:repeat(${N},40px)">${[...Array(N*N).keys()].map(i=>`<button type="button" data-i="${i}" aria-label="Riga ${Math.floor(i/N)+1}, colonna ${i%N+1}">·</button>`).join('')}</div>
    <div class="row"><button type="button" id="slModo" class="primary">Ascolti rimasti: ${ASCOLTI}</button></div>`,()=>{
    const aggiorna=()=>{$('slModo').textContent=modo==='ascolta'?`Ascolti rimasti: ${ASCOLTI-ascolti}`:'Scava qui: tocca la casella'};
    $('slRoccia').onclick=e=>{const b=e.target.closest('button');if(!b||b.disabled)return;const i=+b.dataset.i,x=i%N,y=Math.floor(i/N);
      if(modo==='ascolta'){
        const d=Math.abs(x-mx)+Math.abs(y-my);b.textContent=d;b.disabled=true;ascolti++;
        const m=$('msg');m.className='msg';m.textContent=d===0?'Il picchiettio è proprio qui sotto.':d<=2?'Colpi vicini, la roccia trema.':'Colpi lontani, appena udibili.';
        if(ascolti>=ASCOLTI){modo='scava';m.textContent+=' Basta ascoltare: ora scegli dove scavare.'}
        aggiorna();
      }else if(i===meta){b.textContent='✕';$('slRoccia').querySelectorAll('button').forEach(x=>x.disabled=true);
        risoltoSala(ID,'Contromina! La galleria nemica è fermata prima di arrivare sotto il Dente.');
      }else{tentativo++;b.textContent='○';
        bad($('slRoccia'),`Qui c'è solo roccia: la testa della galleria era alla riga ${my+1}, colonna ${mx+1}. Richiudi e riprova: la galleria cambierà strada.`);
        $('slRoccia').querySelectorAll('button').forEach(x=>x.disabled=true);
      }
    };
    $('slModo').onclick=()=>{if(ascolti>0&&modo==='ascolta'){modo='scava';aggiorna()}};
    aggiorna();
  });
  return meta;
}

registraSala({id:ID,nome:'Sala delle Mine',colore:COL,
  benvenuto:['Sala delle Mine.','Sei sotto il Dente Italiano, nell\'inverno 1917-18. Da qualche parte nella roccia una galleria nemica si avvicina: ascolta e trovala prima che arrivi.'],
  stanza:STANZA,ritorno:{lato:'L',t:6},oggetti:OGGETTI_SALA,cartellini:C,
  aiuti:['Il numero è la distanza «a scacchiera»: passi in orizzontale più passi in verticale. Con due ascolti in angoli diversi restano poche caselle possibili.',
    'Ascolta prima un angolo, poi l\'angolo opposto: le caselle che rispettano entrambi i numeri sono su una linea. Il terzo ascolto le separa.',
    'Se un ascolto dice 0, hai già trovato il punto: premi il pulsante e scava lì.'],
  tessera:{titolo:'Il Dente Italiano, Pasubio',
    testo:'Sul Pasubio i due Denti, italiano e austriaco, sono uno di fronte all\'altro. Nell\'inverno 1917-18 si combatté sotto terra, con gallerie e mine. Il 13 marzo 1918 una mina austriaca di 50.000 chili squarciò l\'avamposto del Dente Italiano: le rocce sconvolte si vedono ancora.',
    foto:{file:'img/sale/mine.jpg',alt:'Il lato italiano della sella tra i due Denti del Pasubio: un ammasso di rocce spezzate dalle esplosioni',autore:'Rose28357',licenza:'CC BY-SA 3.0',pagina:'https://commons.wikimedia.org/wiki/File:Monte-Pasubio_Italienische_Seite_des_Eselsr%C3%BCcken_nach_der_Sprengung.JPG'}},
  fonti:{
    mine_denti:[{fatto:'Due speroni sopra i 2.200 m, Dente Italiano a sud e austriaco a nord; tre anni e mezzo di combattimenti',stato:'verificato',fonte:W.pasubio}],
    mine_guerra:[{fatto:'Guerra delle mine nell\'inverno 1917-18; galleria Ellison; contromine italiane; mina del 13 marzo 1918 con 50.000 kg',stato:'verificato',fonte:W.pasubio}],
    'tessera-mine':[{fatto:'Mina austriaca del 13 marzo 1918 sul Dente Italiano',stato:'verificato',fonte:W.pasubio},
      {fatto:'La foto mostra il lato italiano della sella tra i Denti dopo le esplosioni (descrizione su Commons)',stato:'verificato',fonte:{titolo:'Wikimedia Commons: la foto',url:'https://commons.wikimedia.org/wiki/File:Monte-Pasubio_Italienische_Seite_des_Eselsr%C3%BCcken_nach_der_Sprengung.JPG'}}]},
  schede:[
    {id:'ellison',chiavi:['ellison','gallerie austriache','contromina','contromine','sotterranea'],
      testo:'Nella guerra delle mine del Pasubio le gallerie austro-ungariche seguivano un progetto, con la galleria Ellison come tratto principale verso il Dente Italiano. Quelle italiane sono contorte e intricate perché erano contromine, scavate per fermare il nemico.',fonte:W.pasubio},
    {id:'mina1918',chiavi:['13 marzo','1918','50000','grande mina','squarcio','esplosivo'],
      testo:'Il 13 marzo 1918 una grande mina austriaca, con cinquantamila chili di esplosivo, squarciò l\'avamposto del Dente Italiano sul Pasubio.',fonte:W.pasubio}],
  test:()=>{const meta=apri();$('slRoccia').querySelector(`[data-i="${meta?0:1}"]`).click();$('slModo').click();$('slRoccia').querySelector(`[data-i="${meta}"]`).click()}
});
}
