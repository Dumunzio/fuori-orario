/* Sala della Città Sociale: Valdagno, la Marzotto e la "Città dell'Armonia".
   Fonti: Wikipedia, Marzotto, Gaetano Marzotto, Valdagno. Area: sale. */
{
const ID='citta',COL='#5f8a6b';
const WC={
  marzotto:{titolo:'Wikipedia: Marzotto',url:'https://it.wikipedia.org/wiki/Marzotto'},
  gaetano:{titolo:'Wikipedia: Gaetano Marzotto',url:'https://it.wikipedia.org/wiki/Gaetano_Marzotto'},
  valdagno:{titolo:'Wikipedia: Valdagno',url:'https://it.wikipedia.org/wiki/Valdagno'}
};
const C={
  cs_marzotto:{title:'Da 12 operai a una città',where:'Sala della Città Sociale',lines:[
    'Nel 1836 Luigi Marzotto apre a Valdagno un piccolo lanificio di famiglia con 12 operai, accanto a un mulino per macinare il gesso.',
    'Con il figlio Gaetano la fabbrica cresce: nel 1869 arrivano le turbine e nel 1876 gli operai sono saliti a 400.',
    'Il nipote Gaetano Marzotto (1894-1972) riunisce l\'azienda e la riorganizza: nel 1931 i dipendenti sono 3.500.']},
  cs_citta:{title:'La Città dell\'Armonia',where:'Sala della Città Sociale',lines:[
    'Tra il 1927 e il 1937 Gaetano Marzotto fa costruire a Valdagno, su progetto dell\'architetto Francesco Bonfanti, la «Città Sociale», chiamata anche «Città dell\'Armonia».',
    'Sulla sponda sinistra dell\'Agno, in circa 54 ettari: circa mille alloggi per 4-5.000 abitanti, dalle case a schiera alle ville.',
    'E poi asilo, scuole, maternità, casa di riposo, dopolavoro, scuola di musica, cinema-teatro, palestra e uno stadio da 5.000 posti. Non un quartiere isolato, ma una parte della città.']},
  cs_1968:{title:'Aprile 1968',where:'Sala della Città Sociale',lines:[
    'Negli anni Sessanta le vendite calano. Nel 1967 l\'azienda riduce il personale di oltre mille persone, e gli operai protestano anche per i salari bassi.',
    'Nell\'aprile 1968 a Valdagno ci sono scontri in piazza tra manifestanti e polizia, e la statua di Gaetano Marzotto senior, eretta pochi anni prima, viene abbattuta.',
    'La Città Sociale invece è arrivata fino a oggi quasi intatta.']}
};
// Le barre del grafico: [etichetta, valore]
const BARRE=[['Operai nel 1836',12],['Operai nel 1876',400],['Alloggi della Città Sociale, circa',1000],['Dipendenti nel 1931',3500],['Posti dello stadio',5000]];
const VALORI=[12,400,1000,3500,5000];

/* ---------- Disegno ---------- */
function drawPlastico(o,t){const [bx,by]=base(o);
  box(ctx,bx,by+1,12,6,4,'#5f7a52','#4a6040','#3c4e34');
  // il torrente Agno e gli edifici
  for(let k=0;k<12;k++)R(ctx,bx-12+k*2,by-4+((k/2)|0),2,1,'#4a7aa8');
  [[-7,-8,6],[-2,-10,8],[4,-8,5],[-4,-4,4],[2,-5,6],[7,-5,3]].forEach(([x,y,h],k)=>box(ctx,bx+x,by+y,3,1,h,k%2?'#e6c9a3':'#d9b98a','#b5523f','#93402f'));
  R(ctx,bx+5,by-14,7,4,'#7aa86a');R(ctx,bx+6,by-13,5,2,'#9fd08a');
  // il fumo della ciminiera della fabbrica
  const tt=tAnim(t);R(ctx,bx-3,by-22,2,8,'#8f3229');
  for(let k=0;k<4;k++){const f=(tt/600+k/4)%1,s=1+Math.round(f*2);R(ctx,bx-3+Math.round(Math.sin(f*6+k)*2+f*4),by-24-Math.round(f*14),s,s,'rgba(201,201,196,'+(.6*(1-f))+')')}
  if(tessereS()[ID])sparkle(bx,by-28,t);
}
function drawLavagna(o,t){const [bx,by]=base(o);
  R(ctx,bx-1,by-12,2,12,'#3d3320');R(ctx,bx-6,by-2,12,2,'#3d3320');
  R(ctx,bx-9,by-32,18,20,'#6b5226');R(ctx,bx-8,by-31,16,18,'#1f3a2a');
  [3,6,9,14,16].forEach((h,k)=>R(ctx,bx-7+k*3,by-14-h,2,h,tessereS()[ID]?'#e0b04f':'#c9d8c0'));
}
/* ---------- Dettagli: un viale della Città Sociale ---------- */
// Albero del viale: tronco e chioma tonda a pixel.
function drawAlbero(o){const [bx,by]=base(o);
  diamond(ctx,bx,by+1,6,3,'rgba(0,0,0,.25)');R(ctx,bx-1,by-12,3,12,'#5a3a26');
  [[-7,-26,14,10],[-5,-31,10,6],[-8,-21,16,5]].forEach(([x,y,w,h],k)=>R(ctx,bx+x,by+y,w,h,k===1?'#7aa86a':'#5f8a4e'));
  [[-4,-27],[2,-24],[-1,-22],[4,-29]].forEach(([x,y])=>R(ctx,bx+x,by+y,2,2,'#8fbf78'))}
// Lampione razionalista: palo scuro e lanterna calda (la luce è in STANZA.luci).
function drawLampione(o){const [bx,by]=base(o);
  R(ctx,bx-2,by-1,4,2,'#2b2a2e');R(ctx,bx,by-30,1,30,'#3a3a40');R(ctx,bx-3,by-34,7,5,'#3a3a40');R(ctx,bx-2,by-33,5,3,'#fff1b8')}
// Bicicletta da operaio appoggiata: due ruote e il telaio.
function drawBici(o){const [bx,by]=base(o);
  const ruota=x=>{R(ctx,x-3,by-6,7,1,'#2b2a2e');R(ctx,x-3,by,7,1,'#2b2a2e');R(ctx,x-4,by-5,1,5,'#2b2a2e');R(ctx,x+3,by-5,1,5,'#2b2a2e')};
  ruota(bx-5);ruota(bx+6);R(ctx,bx-5,by-4,11,1,'#8f3229');R(ctx,bx,by-9,1,6,'#8f3229');R(ctx,bx-2,by-10,4,1,'#2b2a2e');R(ctx,bx+6,by-9,1,5,'#8f3229');R(ctx,bx+5,by-10,3,1,'#2b2a2e')}
// Aiuola fiorita sul prato: fiori a puntini su una casella.
const aiuola=(g,x,y)=>casella(g,x,y,(r,c,w)=>Math.abs(c)<w-2&&r>1&&r<10?((r*3+c*5)%7===0?((r+c)%2?'#e0b04f':'#c2493c'):((r+c)%3===0?'#4f6342':null)):null);
const STANZA={w:8,h:8,ox:160,oy:70,
  zona:(x,y)=>x===3||x===4?'viale':'giardino',
  pav:{viale:['#b39b72','#a8916a','#7a6a4e'],giardino:['#6f8a5c','#678254','#4f6342','#8aa874']},
  pareti(g){
    tintaPareti(g,'#c9b391','#a8936f','#6e5f47','#efe2c4');
    // finestre razionaliste in fila
    for(let x=0;x<8;x++)onWall(g,'R',x,3,8,40,12,(u,v)=>v===0||v===11||u===0||u===5?'#efe2c4':'#4a6a8a');
    for(let y=0;y<8;y+=2)onWall(g,'L',y,3,8,40,12,(u,v)=>v===0||v===11||u===0||u===5?'#efe2c4':'#5a7a9a');
    quadro(g,'L',5,1,11,46,18,(u,v,W,H)=>v>H-5?'#4a7aa8':v>H-9?((u%3)?'#d9b98a':'#b5523f'):'#9fb4c8','#6b5226');
    // un manifesto del dopolavoro tra le finestre, e le applique come nel museo
    quadro(g,'R',5,3,9,26,12,(u,v,W,H)=>v<4?'#5f8a6b':(v>H-4?'#efe2c4':((u+v)%4?'#d9b98a':'#c2493c')),'#6b5226');
    [['R',2],['R',6]].forEach(([s_,t])=>applique(g,s_,t));
  },
  // aiuole fiorite ai lati del viale
  decoro(g){[[1,2],[2,2],[6,4],[6,5],[1,5]].forEach(([x,y])=>aiuola(g,x,y))},
  luci:()=>{const [x,y]=iso(4,3),[lx,ly]=iso(2,4),[mx,my]=iso(5,6);
    return [[x,y-6,30,.4],[lx,ly-34,26,.6],[mx,my-34,26,.6],lampada('R',2),lampada('R',6)]}};
const OGGETTI_SALA=[
  {id:'plastico',x:4,y:3,h:16,name:'Plastico della Città Sociale',draw:drawPlastico,light:1,
    act:()=>say('Plastico della Città Sociale',['Case, scuole, asilo, teatro e stadio sulla sponda sinistra dell\'Agno: la Valdagno progettata da Francesco Bonfanti.','Sulla lavagna qui accanto qualcuno ha cancellato i numeri del grafico.'])},
  {id:'lavagna',x:6,y:2,h:32,name:'Lavagna: il grafico dei numeri',draw:drawLavagna,light:1,
    act:oggettoSala(ID,()=>apri(),'Il grafico è completo: da 12 operai a una città.')},
  cartellinoMuro('csPl1','cs_marzotto','L',1,COL,C.cs_marzotto.title),
  cartellinoMuro('csPl2','cs_citta','L',3,COL,C.cs_citta.title),
  cartellinoMuro('csPl3','cs_1968','L',7,COL,C.cs_1968.title),
  {id:'pianta',x:7,y:7,h:20,draw:drawPlant},
  // il viale: alberi, lampioni, panchine e una bicicletta
  {id:'albero1',x:2,y:1,h:32,draw:drawAlbero},
  {id:'albero2',x:6,y:6,h:32,draw:drawAlbero},
  {id:'albero3',x:7,y:5,h:32,draw:drawAlbero},
  {id:'lampione1',x:2,y:4,h:34,draw:drawLampione},
  {id:'lampione2',x:5,y:6,h:34,draw:drawLampione},
  {id:'panchina1',x:2,y:6,h:16,name:'Panchina del viale',draw:drawPanchina,
    act:()=>say('Panchina del viale',['Una panchina all\'ombra degli alberi. Da qui si vedono il viale e le finestre tutte uguali delle case.'])},
  {id:'panchina2',x:5,y:1,h:16,name:'Panchina',draw:drawPanchina,
    act:()=>say('Panchina',['Qualcuno ha dimenticato un giornale piegato. In prima pagina, una partita allo stadio della città.'])},
  {id:'bici',x:6,y:7,h:12,name:'Bicicletta',draw:drawBici,
    act:()=>say('Bicicletta',['Una bicicletta rossa, appoggiata all\'albero. Molti operai andavano in fabbrica così.'])}
];

/* ---------- Rompicapo: il grafico dei numeri ---------- */
function apri(){
  const scelta=BARRE.map(()=>null);
  finestraSala(ID,'Il grafico dei numeri',`
    <p class="clue">Sulla lavagna sono rimaste le etichette, ma i numeri sono cancellati. Tocca ogni barra per scegliere il suo numero: i cartellini della sala li contengono tutti.</p>
    <div class="sl-scelte" id="slBarre">${BARRE.map(([e],i)=>`<button type="button" data-i="${i}"><span style="display:flex;justify-content:space-between;gap:8px"><span>${e}</span><b id="slN${i}">?</b></span><span class="sl-barra" id="slB${i}" style="display:block;height:8px;width:0;background:var(--brass);margin-top:4px;transition:width .3s"></span></button>`).join('')}</div>
    <div class="row"><button type="button" class="primary" id="slControlla">Controlla il grafico</button></div>`,()=>{
    const mostra=i=>{const v=scelta[i];$('slN'+i).textContent=v===null?'?':v.toLocaleString('it-IT');$('slB'+i).style.width=v===null?'0':Math.max(2,v/5000*100)+'%'};
    $('slBarre').onclick=e=>{const b=e.target.closest('button');if(!b)return;const i=+b.dataset.i;
      const k=scelta[i]===null?0:(VALORI.indexOf(scelta[i])+1)%(VALORI.length+1);scelta[i]=k===VALORI.length?null:VALORI[k];mostra(i)};
    $('slControlla').onclick=()=>{
      const errori=BARRE.filter(([,v],i)=>scelta[i]!==v).length;
      if(!errori)risoltoSala(ID,'Il grafico torna: in meno di cento anni la Marzotto passa da 12 operai a 3.500, e attorno alla fabbrica nasce una città.');
      else bad($('slBarre'),`${errori} ${errori===1?'barra non torna':'barre non tornano'}. Ricontrolla i cartellini.`);
    };
    BARRE.forEach((_,i)=>mostra(i));
  });
  return scelta;
}

registraSala({id:ID,nome:'Sala della Città Sociale',colore:COL,
  benvenuto:['Sala della Città Sociale.','Valdagno, la città che una fabbrica di lana ha costruito attorno a sé. Sulla lavagna c\'è un grafico senza numeri: ricostruiscilo.'],
  stanza:STANZA,ritorno:{lato:'L',t:6},oggetti:OGGETTI_SALA,cartellini:C,
  aiuti:['I numeri sono cinque: 12, 400, 1.000, 3.500 e 5.000. Ognuno va su una sola barra.',
    'Le prime due barre sono nel cartellino «Da 12 operai a una città». Alloggi e posti dello stadio sono nella «Città dell\'Armonia».',
    '1836: 12. 1876: 400. Alloggi: circa 1.000. 1931: 3.500. Stadio: 5.000.'],
  tessera:{titolo:'Stadio dei Fiori, Valdagno',
    testo:'Lo Stadio dei Fiori di Valdagno è tra gli interventi voluti da Gaetano Marzotto per la città, insieme alle case per gli operai, all\'asilo, alla casa di riposo e alle scuole. La Città Sociale, progettata da Francesco Bonfanti tra il 1927 e il 1937, è arrivata a oggi quasi intatta.',
    foto:{file:'img/sale/citta.jpg',alt:'Lo Stadio dei Fiori di Valdagno con le tribune e il campo',autore:'Atletico91',licenza:'CC BY-SA 3.0',pagina:'https://commons.wikimedia.org/wiki/File:Stadio_dei_Fiori.JPG'}},
  fonti:{
    cs_marzotto:[{fatto:'1836, 12 operai e mulino per il gesso; turbine nel 1869; 400 operai nel 1876; 3.500 dipendenti nel 1931',stato:'verificato',fonte:WC.marzotto}],
    cs_citta:[{fatto:'1927-1937, Francesco Bonfanti, «Città dell\'Armonia», 54 ettari sulla sponda sinistra dell\'Agno, circa mille alloggi per 4-5.000 abitanti, servizi e stadio da 5.000 posti',stato:'verificato',fonte:WC.gaetano}],
    cs_1968:[{fatto:'Riduzione di oltre mille persone nel 1967; scontri nell\'aprile 1968 e statua di Gaetano Marzotto senior abbattuta',stato:'verificato',fonte:WC.gaetano},
      {fatto:'La Città Sociale appare in gran parte inalterata',stato:'verificato',fonte:WC.valdagno}],
    'tessera-citta':[{fatto:'Lo Stadio dei Fiori tra gli interventi sociali di Gaetano Marzotto',stato:'verificato',fonte:WC.valdagno}]},
  schede:[
    {id:'cittaSociale',chiavi:['citta sociale','armonia','valdagno','bonfanti','marzotto'],
      testo:'La Città Sociale di Valdagno, detta anche Città dell\'Armonia, fu costruita tra il 1927 e il 1937 da Gaetano Marzotto su progetto di Francesco Bonfanti: circa mille alloggi e tutti i servizi, dall\'asilo allo stadio, sulla sponda sinistra dell\'Agno.',fonte:WC.gaetano},
    {id:'marzotto1968',chiavi:['1968','statua','abbattuta','scontri','sciopero','protesta'],
      testo:'Nell\'aprile 1968 a Valdagno, dopo i tagli al personale e le proteste per i salari, ci furono scontri tra manifestanti e polizia, e la statua di Gaetano Marzotto senior fu abbattuta.',fonte:WC.gaetano}],
  test:()=>{const s=apri();BARRE.forEach(([,v],i)=>{const b=$('slBarre').querySelector(`[data-i="${i}"]`);let n=0;while(s[i]!==v&&n++<10)b.click()});$('slControlla').click()}
});
}
