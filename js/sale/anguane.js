/* Sala delle Anguane: le creature delle acque della tradizione alpina e vicentina.
   Fonte: Wikipedia, Anguana. Area: sale. */
{
const ID='anguane',COL='#4f8a9a';
const WN={titolo:'Wikipedia: Anguana',url:'https://it.wikipedia.org/wiki/Anguana'};
const C={
  ang_chi:{title:'Chi sono le anguane',where:'Sala delle Anguane',lines:[
    'L\'anguana è una creatura delle acque della mitologia alpina, simile a una ninfa. Le sue storie si raccontano nel Veronese, nel Vicentino, in Friuli e nelle valli ladine.',
    'Su una cosa tutte le leggende sono d\'accordo: le anguane vivono presso fonti e ruscelli e proteggono le acque. Nel Vicentino diverse caverne si chiamano «Buso dell\'anguana».',
    'Possono sembrare ragazze bellissime, ma qualcosa le tradisce sempre: piedi di gallina, di anatra o di capra, gambe con le squame, una schiena «scavata» nascosta con il muschio.']},
  ang_storie:{title:'Le storie',where:'Sala delle Anguane',lines:[
    'In molte storie le anguane insegnano agli uomini un mestiere, come filare la lana o fare il formaggio. Se gli uomini rompono il patto, se ne vanno offese.',
    'Possono fare scherzi ai viandanti di notte, ma molte leggende precisano che, a differenza di orchi e streghe, le anguane non uccidono mai.',
    'Per tenerle lontane fino all\'alba si lascia davanti alla porta un cesto di vimini: l\'anguana passa la notte a cercare di riempirlo d\'acqua, senza riuscirci.']},
  ang_oggi:{title:'Sigàr come n\'anguana',where:'Sala delle Anguane',lines:[
    'In Veneto si diceva «Sigàr come n\'anguana»: gridare come un\'anguana, perché nelle leggende lanciano grida fortissime.',
    'Il nome viene probabilmente dal latino anguis, serpente.',
    'Le anguane non sono sparite: le cantano Patrizia Laquidara nell\'album «Il canto dell\'anguana» (2011, Targa Tenco) e Francesca Michielin in «Il canto delle anguane», nell\'album «Magia bianca» (2026).']}
};
// Le tre domande dell'anguana: [domanda, [risposte], indice giusto]
const DOMANDE=[
  ['Dimmi, viandante: dove abito io?',['In cima alle montagne, dove non c\'è acqua','Presso le fonti e i ruscelli','Nelle soffitte delle case vecchie'],1],
  ['Sembro una ragazza come te. Cosa mi tradisce sempre?',['Le ali di pipistrello sulla schiena','Gli occhi che brillano al buio','I piedi di capra o di gallina, le gambe con le squame'],2],
  ['Se mi incontri di notte, come mi tieni occupata fino all\'alba?',['Mi lasci un cesto di vimini da riempire d\'acqua','Mi canti una canzone','Mi regali una candela accesa'],0],
  ['Ultima. Cosa vuol dire «sigàr come n\'anguana»?',['Piangere tutta la notte','Gridare fortissimo','Ridere sottovoce'],1]
];

/* ---------- Disegno ---------- */
function drawFonte(o,t){const [bx,by]=base(o);
  box(ctx,bx,by+1,11,5,5,'#8a8d95','#6f727a','#5c5f67');
  diamond(ctx,bx,by-4,9,4,'#2f6a8a');
  for(let k=0;k<5;k++){const f=(t/180+k*7)%20;R(ctx,bx-6+k*3,by-6-(f>10?20-f:f)/4,1,1,'#bfe6f0')}
  box(ctx,bx-1,by-4,2,1,14,'#9a9da5','#7d8088','#6a6d75');
  R(ctx,bx-1,by-20+Math.floor(t/150)%3,2,6,'#7fc4dc');
  if(tessereS()[ID])sparkle(bx+8,by-16,t);
}
function drawCesto(o){const [bx,by]=base(o);
  diamond(ctx,bx,by+1,5,2,'rgba(0,0,0,.3)');
  for(let r=0;r<8;r++){const w=4+Math.round(r*.4);R(ctx,bx-w,by-9+r,w*2,1,r%2?'#a8875c':'#c9a873')}
  for(let k=-4;k<=4;k+=2)R(ctx,bx+k,by-9,1,8,'#8a6a44');
}
function drawCanne(o){const [bx,by]=base(o);
  [[-4,22],[-1,28],[2,24],[5,18]].forEach(([x,h])=>{R(ctx,bx+x,by-h,1,h,'#5a8a46');R(ctx,bx+x-1,by-h,3,4,'#7a5236')});
}
const STANZA={w:8,h:8,ox:160,oy:70,
  zona:(x,y)=>Math.hypot(x-4,y-3)<2.2?'acqua':'muschio',
  pav:{muschio:['#3f5a42','#3a553d','#2a3f2c','#5a7a4e'],acqua:['#2f5a6a','#2b5464','#1f3f4c','#7fc4dc']},
  pareti(g){
    tintaPareti(g,'#3a4a5a','#2c3a48','#1f2a34','#4f6a7a');
    // notte: stelle, luna e alberi
    for(let x=0;x<8;x++)onWall(g,'R',x,0,11,WH,30,(u,v)=>(u*7+v*13+x*5)%61===0?'#efe2c4':null);
    for(let y=0;y<8;y++)onWall(g,'L',y,0,11,WH,30,(u,v)=>(u*11+v*7+y*3)%59===0?'#efe2c4':null);
    onWall(g,'R',5,2,9,50,8,(u,v)=>(u-3.5)**2+(v-4)**2<10?'#efe2c4':null);
    for(let x=0;x<8;x+=2)onWall(g,'R',x,0,11,24,10,(u,v)=>v>Math.abs(u-5)*1.6?'#1f3a2a':null);
    for(let y=1;y<8;y+=2)onWall(g,'L',y,0,11,24,10,(u,v)=>v>Math.abs(u-5)*1.6?'#24402e':null);
  },
  luci:()=>{const [x,y]=iso(4,3);return [[x,y-8,30,.5]]}};
const OGGETTI_SALA=[
  {id:'fonte',x:4,y:3,h:22,name:'La fonte',draw:drawFonte,light:1,
    act:oggettoSala(ID,()=>apri(),'L\'anguana è tornata alla sua fonte. Il cesto di vimini è ancora qui, vuoto.')},
  {id:'cesto',x:6,y:2,h:10,name:'Un cesto di vimini',draw:drawCesto,act:()=>say('Cesto di vimini',['Un cesto di vimini, bucato da tutte le parti. A cosa servirà, accanto a una fonte?'])},
  cartellinoMuro('angPl1','ang_chi','R',1,COL,C.ang_chi.title),
  cartellinoMuro('angPl2','ang_storie','R',3,COL,C.ang_storie.title),
  cartellinoMuro('angPl3','ang_oggi','L',2,COL,C.ang_oggi.title),
  {id:'canne',x:7,y:5,h:28,draw:drawCanne}
];

/* ---------- Rompicapo: le domande dell'anguana ---------- */
function apri(){
  let n=0;
  finestraSala(ID,'Le domande dell\'anguana',`
    <p class="clue">Dalla fonte esce un'anguana. Ti lascerà passare solo se conosci le sue storie: sbaglia una risposta e ricomincia da capo, gridando. I cartellini della sala dicono tutto.</p>
    <p id="slDomanda" style="font-size:24px"></p>
    <div class="sl-scelte" id="slRisposte"></div>`,()=>{
    const mostra=()=>{const [d,r]=DOMANDE[n];$('slDomanda').textContent=`(${n+1}/${DOMANDE.length}) ${d}`;
      $('slRisposte').innerHTML=r.map((x,i)=>`<button type="button" data-i="${i}">${x}</button>`).join('')};
    $('slRisposte').onclick=e=>{const b=e.target.closest('button');if(!b)return;
      if(+b.dataset.i===DOMANDE[n][2]){n++;const m=$('msg');m.className='msg good';m.textContent='L\'anguana sorride.';
        if(n===DOMANDE.length){$('slRisposte').innerHTML='';$('slDomanda').textContent='«Conosci le nostre storie. Puoi passare, e portale con te.»';
          return risoltoSala(ID,'L\'anguana torna nella fonte. Sull\'acqua resta un riflesso: è la tua tessera.')}
        mostra();
      }else{n=0;bad($('slRisposte'),'AAAAH! L\'anguana grida e l\'acqua si increspa. Si ricomincia dalla prima domanda.');mostra()}
    };
    mostra();
  });
}

registraSala({id:ID,nome:'Sala delle Anguane',colore:COL,
  benvenuto:['Sala delle Anguane.','È notte, accanto a una fonte. Le leggende del Vicentino dicono che qui abitano le anguane. Leggi i cartellini, poi avvicinati all\'acqua.'],
  stanza:STANZA,ritorno:{lato:'L',t:6},oggetti:OGGETTI_SALA,cartellini:C,
  aiuti:['Le prime due risposte sono nel cartellino «Chi sono le anguane».',
    'Il cesto di vimini qui accanto non è lì per caso: leggi «Le storie».',
    'Fonti e ruscelli; piedi di capra o di gallina; il cesto di vimini; gridare fortissimo.'],
  tessera:{titolo:'Il Leogra, acqua di anguane',
    testo:'Il torrente Leogra, nella valle di Schio. La tradizione dice che le anguane vivono presso fonti e ruscelli e proteggono le acque, e nel Vicentino diverse caverne portano il loro nome: «Buso dell\'anguana».',
    foto:{file:'img/sale/anguane.jpg',alt:'Il torrente Leogra che scorre tra i sassi e il verde',autore:'Syrio',licenza:'CC BY-SA 4.0',pagina:'https://commons.wikimedia.org/wiki/File:Torrente_Leogra.jpg'}},
  fonti:{
    ang_chi:[{fatto:'Creatura delle acque della mitologia alpina; Veronese, Vicentino, Friuli, valli ladine; vive presso fonti e ruscelli; caverne vicentine «Buso dell\'anguana»; piedi di gallina, anatra o capra, gambe squamate, schiena scavata',stato:'verificato',fonte:WN}],
    ang_storie:[{fatto:'Insegnano mestieri (filatura, formaggio) e se ne vanno se offese; non uccidono mai; il cesto di vimini da riempire fino all\'alba',stato:'verificato',fonte:WN,
      nota:'Il cesto davanti alla porta è un\'usanza attestata in Friuli; la storia del cesto ricorre in diverse tradizioni.'}],
    ang_oggi:[{fatto:'Detto veneto «Sigàr come n\'anguana»; nome probabilmente da anguis; canzoni di Patrizia Laquidara (2011) e Francesca Michielin (2026)',stato:'verificato',fonte:WN,
      nota:'Wikipedia data l\'album di Laquidara al 2010; il sito dell\'artista (patrizialaquidara.it) e la discografia su Rockol dicono 2011, anno della Targa Tenco. Usiamo il 2011 (verifica di enigmi-storia, 22/10).'}],
    'tessera-anguane':[{fatto:'Le anguane vivono presso fonti e ruscelli; caverne vicentine con il loro nome',stato:'verificato',fonte:WN},
      {fatto:'La foto mostra il torrente Leogra: nessuna leggenda specifica è legata a questo torrente',stato:'verificato',fonte:{titolo:'Wikimedia Commons: la foto',url:'https://commons.wikimedia.org/wiki/File:Torrente_Leogra.jpg'}}]},
  schede:[
    {id:'anguana',chiavi:['anguana','anguane','ninfa','fonte','leggenda','leggende'],
      testo:'Le anguane sono creature delle acque della tradizione alpina, raccontate anche nel Vicentino. Vivono presso fonti e ruscelli e proteggono le acque. Sembrano ragazze, ma hanno piedi di capra o di gallina, o gambe con le squame. Per tenerle occupate fino all\'alba si lascia loro un cesto di vimini da riempire d\'acqua.',fonte:WN},
    {id:'sigar',chiavi:['sigar','gridare','grida','detto','michielin','canzone','sigar anguana'],
      testo:'In Veneto si diceva «Sigàr come n\'anguana», gridare come un\'anguana. Le anguane compaiono anche nella musica di oggi: Francesca Michielin ha pubblicato «Il canto delle anguane» nell\'album «Magia bianca» (2026).',fonte:WN}],
  test:()=>{apri();DOMANDE.forEach(([,,g])=>$('slRisposte').querySelector(`[data-i="${g}"]`).click())}
});
}
