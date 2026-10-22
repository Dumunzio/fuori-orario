/* Sala del Cimone: la mina del 23 settembre 1916 sul Monte Cimone di Tonezza e il suo ossario.
   Fonti: Wikipedia, Monte Cimone di Tonezza e Ossario del monte Cimone. Area: sale. */
{
const ID='cimone',COL='#7d9ab8';
const W_CIMONE={titolo:'Wikipedia: Monte Cimone di Tonezza',url:'https://it.wikipedia.org/wiki/Monte_Cimone_di_Tonezza'};
const W_OSSARIO={titolo:'Wikipedia: Ossario del monte Cimone',url:'https://it.wikipedia.org/wiki/Ossario_del_monte_Cimone'};
const C={
  cim_vetta:{title:'Il Cimone conteso',where:'Sala del Cimone',lines:[
    'Il Monte Cimone è sopra Arsiero, dove l\'Astico incontra il Posina. Gli austriaci lo chiamavano la «Gibilterra» del fronte italiano.',
    'La vetta cadde in mano austro-ungarica il 25 maggio 1916, durante la Strafexpedition.',
    'Il 23 luglio 1916 gli alpini dei battaglioni Val Leogra e Clapier, con il 153º e il 154º Fanteria, la riconquistarono.']},
  cim_mina:{title:'La galleria sotto la cima',where:'Sala del Cimone',lines:[
    'Non riuscendo a riprendere la cima, gli austro-ungarici scavarono in poco meno di due mesi una galleria di trenta metri fino alla sua base, e la riempirono con 142 quintali di esplosivo.',
    'La mina fu fatta brillare all\'alba, alle 5:45, due mesi esatti dopo la riconquista italiana, mentre un battaglione stava dando il cambio a un altro.',
    'Più di mille soldati furono sepolti. Solo 35 furono estratti vivi nei giorni seguenti.']},
  cim_ossario:{title:'L\'ossario',where:'Sala del Cimone',lines:[
    'Dopo la guerra furono recuperati i resti di 1.210 caduti, tutti senza nome, e raccolti nell\'ossario sulla cima.',
    'L\'ossario fu inaugurato il 28 settembre 1929. Il paese ai piedi del monte da allora si chiama Tonezza del Cimone.',
    'Da quel giorno la cima è più bassa: oggi il monte è alto 1.226 metri.']}
};
const MESI=['gennaio','febbraio','marzo','aprile','maggio','giugno','luglio','agosto','settembre','ottobre','novembre','dicembre'];

/* ---------- Disegno ---------- */
function drawMonte(o,t){const [bx,by]=base(o);
  box(ctx,bx,by+1,12,6,6,'#5a4b38','#46392a','#382d21');
  // il monte con la cima squarciata
  for(let r=0;r<26;r++){const w=Math.round(r*.55)+1,y=by-31+r,neve=r<5;
    R(ctx,bx-w,y,w,1,neve?'#cfd6da':'#7a8a6a');R(ctx,bx,y,w,1,neve?'#b8c0c4':'#5f6e52')}
  R(ctx,bx-3,by-31,6,4,'#3a3226');R(ctx,bx-2,by-30,4,2,'#1a1424');
  if(tessereS()[ID])sparkle(bx+6,by-34,t);
}
function drawOrologio(o,t){const [bx,by]=base(o);
  R(ctx,bx-1,by-26,2,26,'#3d3320');diamond(ctx,bx,by+1,4,2,'rgba(0,0,0,.3)');
  for(let r=-6;r<=6;r++){const w=Math.round(Math.sqrt(36-r*r));R(ctx,bx-w,by-34+r,w*2,1,'#efe2c4')}
  R(ctx,bx,by-38,1,4,'#2a2030');R(ctx,bx-3,by-34,3,1,'#2a2030');R(ctx,bx-1,by-35,2,2,'#c2493c');
}
function drawCippo(o){const [bx,by]=base(o);
  box(ctx,bx,by+1,5,2,12,'#b9b4a8','#9a958a','#858075');R(ctx,bx-1,by-20,2,6,'#6b665c');R(ctx,bx-3,by-18,6,2,'#6b665c');
}
const STANZA={w:8,h:8,ox:160,oy:70,
  zona:(x,y)=>x+y<5?'prato':'pietra',
  pav:{pietra:['#6e6a60','#68645b','#4c4943'],prato:['#4f5f45','#4a5941','#3a4633','#6b7a5c']},
  pareti(g){
    tintaPareti(g,'#5c6670','#454d55','#30363c','#9aa5ae');
    quadro(g,'R',2,1,11,46,22,(u,v,W,H)=>{const m=Math.abs(u-W/2)*1.5+5;return v<m?'#9fb4c8':v<m+2?'#e9eef0':'#6f7d63'},'#4a3b2c');
    // un nome su una lapide: 1.210 caduti senza nome
    quadro(g,'R',5,2,10,44,16,(u,v)=>v%3===1&&u>1?'#6b665c':'#d9d4c7','#8a857a');
    quadro(g,'L',3,2,10,44,18,(u,v)=>(u+v)%6===0?'#cfd6da':'#2f3b4a','#4a3b2c');
  },
  luci:()=>{const [x,y]=iso(4,3);return [[x,y-12,30,.5]]}};
const OGGETTI_SALA=[
  {id:'monte',x:4,y:3,h:30,name:'Plastico del Monte Cimone',draw:drawMonte,light:1,
    act:oggettoSala(ID,()=>apri(),'Il registro dell\'ossario è completo: 23 settembre 1916, ore 5:45.')},
  {id:'orologio',x:6,y:2,h:38,name:'Orologio fermo',draw:drawOrologio,act:()=>say('Orologio fermo',['Le lancette sono ferme su un\'ora del mattino. Quale? Il cartellino della galleria lo dice.'])},
  cartellino('cimPl1','cim_vetta',2,4,COL,C.cim_vetta.title),
  cartellino('cimPl2','cim_mina',5,5,COL,C.cim_mina.title),
  cartellino('cimPl3','cim_ossario',2,1,COL,C.cim_ossario.title),
  {id:'cippo',x:6,y:6,h:20,draw:drawCippo}
];

/* ---------- Rompicapo: il registro dell'ossario ---------- */
function apri(){
  const val={g:1,m:0,a:1915,h:0,mi:0};
  const campi=[['g','Giorno',1,31,1],['m','Mese',0,11,1],['a','Anno',1915,1918,1],['h','Ora',0,23,1],['mi','Minuti',0,55,5]];
  finestraSala(ID,'Il registro dell\'ossario',`
    <p class="clue">Sulla prima pagina del registro manca una riga: il giorno e l'ora in cui la cima del Cimone saltò. I cartellini della sala dicono tutto quello che serve, ma la data devi ricavarla tu.</p>
    <div class="sl-dial" id="slDial">${campi.map(([k,n])=>`<div><b>${n}</b><button type="button" data-k="${k}" data-d="1" aria-label="${n} più">▲</button><output id="slV_${k}"></output><button type="button" data-k="${k}" data-d="-1" aria-label="${n} meno">▼</button></div>`).join('')}</div>
    <div class="row"><button type="button" class="primary" id="slScrivi">Scrivi nel registro</button></div>`,()=>{
    const mostra=()=>campi.forEach(([k])=>$('slV_'+k).textContent=k==='m'?MESI[val.m].slice(0,3):k==='mi'||k==='h'?String(val[k]).padStart(2,'0'):val[k]);
    $('slDial').onclick=e=>{const b=e.target.closest('button');if(!b)return;const [k,,lo,hi,p]=campi.find(c=>c[0]===b.dataset.k);
      val[k]+=+b.dataset.d*p;if(val[k]>hi)val[k]=lo;if(val[k]<lo)val[k]=hi;mostra()};
    $('slScrivi').onclick=()=>{
      if(val.g===23&&val.m===8&&val.a===1916&&val.h===5&&val.mi===45)
        risoltoSala(ID,'23 settembre 1916, ore 5:45. Il registro si chiude con la riga che mancava.');
      else if(val.g===23&&val.m===6&&val.a===1916)bad($('slDial'),'Il 23 luglio è il giorno della riconquista. La mina venne due mesi esatti dopo.');
      else if(val.g===23&&val.m===8&&val.a===1916)bad($('slDial'),'La data è giusta. Ora l\'ora: era l\'alba, l\'orologio fermo la ricorda.');
      else bad($('slDial'),'Non è la riga giusta. Parti dal giorno della riconquista italiana e aggiungi due mesi esatti.');
    };
    mostra();
  });
  return val;
}

registraSala({id:ID,nome:'Sala del Cimone',colore:COL,
  benvenuto:['Sala del Cimone.','Questa sala ricorda il Monte Cimone di Tonezza e i suoi caduti. Il registro dell\'ossario ha una riga vuota: ricostruiscila con i cartellini.'],
  stanza:STANZA,ritorno:{lato:'L',t:6},oggetti:OGGETTI_SALA,cartellini:C,
  aiuti:['Il cartellino «Il Cimone conteso» ti dà il giorno della riconquista. Quello della galleria ti dice quanto tempo dopo saltò la mina.',
    'Due mesi esatti dopo il 23 luglio è il 23 settembre. L\'anno resta lo stesso.',
    'L\'ora è scritta nel cartellino della galleria: all\'alba, alle 5:45.'],
  tessera:{titolo:'Monte Cimone, Tonezza',
    testo:'Il Monte Cimone di Tonezza, 1.226 metri. La mina del 23 settembre 1916 ne sconvolse la cima, che da allora è più bassa. Sulla vetta l\'ossario raccoglie 1.210 caduti senza nome, e il paese ai suoi piedi si chiama Tonezza del Cimone.',
    foto:{file:'img/sale/cimone.jpg',alt:'Il Monte Cimone di Tonezza visto da lontano',autore:'Nordavind1709',licenza:'CC BY-SA 4.0',pagina:'https://commons.wikimedia.org/wiki/File:Monte-Cimone-di-Tonezza.jpg'}},
  fonti:{
    cim_vetta:[{fatto:'«Gibilterra» del fronte; vetta austro-ungarica dal 25 maggio 1916; riconquista italiana il 23 luglio 1916 (Val Leogra, Clapier, 153º e 154º Fanteria)',stato:'verificato',fonte:W_CIMONE}],
    cim_mina:[{fatto:'Galleria di trenta metri scavata in poco meno di due mesi, 142 quintali di esplosivo, mina alle 5:45 due mesi esatti dopo la riconquista, durante un cambio; oltre mille sepolti, 35 salvati',stato:'verificato',fonte:W_CIMONE,
      nota:'L\'ossario indica 14.200 kg di esplosivo, cioè gli stessi 142 quintali.'}],
    cim_ossario:[{fatto:'1.210 caduti ignoti; ossario inaugurato il 28 settembre 1929; Tonezza del Cimone; cima oggi a 1.226 m',stato:'verificato',fonte:W_OSSARIO},
      {fatto:'Altezza 1.226 m e nome di Tonezza del Cimone',stato:'verificato',fonte:W_CIMONE}],
    'tessera-cimone':[{fatto:'Altezza, mina del 23/9/1916, 1.210 caduti, Tonezza del Cimone',stato:'verificato',fonte:W_CIMONE}]},
  schede:[
    {id:'cimoneMina',chiavi:['cimone','tonezza','mina','23 settembre','1916','gibilterra'],
      testo:'Sul Monte Cimone gli austro-ungarici scavarono una galleria fino alla base della cima e la fecero saltare alle 5:45 del 23 settembre 1916, due mesi esatti dopo la riconquista italiana. Più di mille soldati furono sepolti.',fonte:W_CIMONE},
    {id:'cimoneOssario',chiavi:['ossario','caduti','1929','ignoti','1210'],
      testo:'Nell\'ossario del Monte Cimone riposano 1.210 caduti, tutti senza nome. Fu inaugurato il 28 settembre 1929. È tra i simboli della provincia di Vicenza, con gli ossari del Pasubio, del Grappa e del Leiten.',fonte:W_OSSARIO}],
  test:()=>{const v=apri();Object.assign(v,{g:23,m:8,a:1916,h:5,mi:45});$('slScrivi').click()}
});
}
