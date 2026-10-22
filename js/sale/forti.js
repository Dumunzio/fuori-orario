/* Sala dei Forti: lo sbarramento Agno-Astico-Posina e la "conquista" di Forte Casa Ratti.
   Fonti: Wikipedia, Forte Casa Ratti, Forte Monte Maso, Forte Campomolon, Tagliata Bariola. Area: sale. */
{
const ID='forti',COL='#9a8a6a';
const WF={
  ratti:{titolo:'Wikipedia: Forte Casa Ratti',url:'https://it.wikipedia.org/wiki/Forte_Casa_Ratti'},
  maso:{titolo:'Wikipedia: Forte Monte Maso',url:'https://it.wikipedia.org/wiki/Forte_Monte_Maso'},
  campomolon:{titolo:'Wikipedia: Forte Campomolon',url:'https://it.wikipedia.org/wiki/Forte_Campomolon'},
  bariola:{titolo:'Wikipedia: Tagliata Bariola',url:'https://it.wikipedia.org/wiki/Tagliata_Bariola'}
};
const C={
  forti_maso:{title:'Maso, Enna e la Bariola',where:'Sala dei Forti',lines:[
    'Forte Monte Maso, in alta val Leogra, fu il primo forte corazzato costruito contro l\'Impero austro-ungarico dopo il 1866: lavori dal 1883 al 1887, sei cannoni da 149 mm in stanze corazzate di ghisa.',
    'Più indietro, sul Monte Enna, un forte più moderno con quattro cannoni in cupola che tiravano fino a 14 chilometri. La Tagliata Bariola, con i suoi ponti levatoi, sbarrava la strada del Pian delle Fugazze.',
    'Il Maso non sparò nemmeno un colpo in tutta la guerra: il fronte si spostò lontano e diventò un deposito di munizioni.']},
  forti_ratti:{title:'Casa Ratti, la verità',where:'Sala dei Forti',lines:[
    'Forte Casa Ratti, vicino ad Arsiero, fu costruito tra il 1906 e il 1908. Nel maggio 1916 l\'obice austro-ungarico «Barbara», da 380 mm, lo bombardò senza fare danni particolari.',
    'Gli italiani lo abbandonarono la mattina del 26 maggio 1916. Le cariche per farlo saltare non furono azionate: dai cannoni portarono via solo gli otturatori.',
    'Poche ore dopo entrò una pattuglia del 50º Reggimento austro-ungarico. Il sottotenente Albin Mlaker la raggiunse quando la pattuglia era già dentro, ma la propaganda raccontò che aveva conquistato il forte. Fu promosso tenente e decorato.']},
  forti_campomolon:{title:'Campomolon, il forte incompiuto',where:'Sala dei Forti',lines:[
    'Il forte Campomolon, a 1.853 metri, non fu mai finito: senza cupole corazzate, fu comunque armato con grossi obici.',
    'Dallo scoppio della guerra tenne sotto tiro i forti austriaci degli altipiani, fino al 20 maggio 1916, quando fu abbandonato e i pezzi resi inservibili.']}
};
// Il giornale di propaganda: [frase, vera?]
const GIORNALE=[
  ['Il sottotenente Albin Mlaker conquista da solo un\'intera fortezza italiana!',false],
  ['Il Forte Casa Ratti, presso Arsiero, è in mano nostra dal 26 maggio 1916.',true],
  ['La guarnigione italiana ha difeso il forte fino all\'ultimo uomo.',false],
  ['Nei cannoni del forte mancavano gli otturatori.',true],
  ['Prima dell\'assalto il forte era stato quasi distrutto dai nostri cannoni.',false],
  ['Per la sua impresa Mlaker è stato promosso tenente.',true]
];

/* ---------- Disegno ---------- */
function drawForte(o,t){const [bx,by]=base(o);
  box(ctx,bx,by+1,12,6,5,'#556b45','#455838','#38482d');
  box(ctx,bx,by-4,9,4,10,'#9a958a','#7d786e','#67635a');
  faceL(bx,by-4,9,4,(x,y,i)=>{if(i%3===1)R(ctx,x,y-7,1,2,'#1a1424')});
  faceR(bx,by-4,9,4,(x,y,i)=>{if(i%3===1)R(ctx,x,y-7,1,2,'#1a1424')});
  for(const dx of [-4,4]){for(let r=0;r<3;r++)R(ctx,bx+dx-3+r,by-17-r,6-2*r,1,'#5c5f67')}
  // la bandiera sull'asta sventola
  const tt=tAnim(t);R(ctx,bx,by-28,1,10,'#3a3a3a');
  // tricolore a bande verticali: verde, bianco, rosso
  for(let i=0;i<9;i++){const dy=Math.round(Math.sin(tt/160+i*.9)*1);R(ctx,bx+1+i,by-28+dy,1,5,i<3?'#3f7a3f':i<6?'#efe2c4':'#c2493c')}
  if(tessereS()[ID])sparkle(bx,by-32,t);
}
function drawEdicola(o,t){const [bx,by]=base(o);
  box(ctx,bx,by+1,7,3,16,'#6a4632','#4a2f22','#3a251b');
  R(ctx,bx-7,by-30,14,10,'#efe2c4');R(ctx,bx-6,by-29,12,2,'#2a2030');
  for(let k=0;k<3;k++)R(ctx,bx-6,by-26+k*2,10-k*2,1,'#8a7350');
  R(ctx,bx+3,by-25,3,4,tessereS()[ID]?'#86c98f':'#c2493c');
}
function drawObice(o){const [bx,by]=base(o);
  diamond(ctx,bx,by+1,7,3,'rgba(0,0,0,.35)');
  R(ctx,bx-6,by-4,12,3,'#45484a');R(ctx,bx-6,by-1,3,3,'#1a1424');R(ctx,bx+3,by-1,3,3,'#1a1424');
  for(let k=0;k<10;k++)R(ctx,bx-2+k,by-6-k,3,3,'#5c5f67');
}
const STANZA={w:8,h:8,ox:160,oy:70,
  zona:(x,y)=>y<3?'cortile':'casamatta',
  pav:{casamatta:['#6b665c','#646056','#4a4740'],cortile:['#5a5d4a','#545744','#3f4133','#6f735c']},
  pareti(g){
    tintaPareti(g,'#77736a','#5c5950','#3f3d37','#8a857a');
    // pietrame a vista e feritoie
    for(let x=0;x<8;x++)onWall(g,'R',x,0,11,40,26,(u,v)=>v%6===0||(u+(v/6|0)*3)%6===0?'#4a4740':null);
    for(let y=0;y<8;y++)onWall(g,'L',y,0,11,40,26,(u,v)=>v%6===0||(u+(v/6|0)*3)%6===0?'#5f5b52':null);
    [1,4,7].forEach(x=>onWall(g,'R',x,4,6,34,8,()=>'#0b0814'));
    quadro(g,'L',3,2,10,46,20,(u,v,W,H)=>v<H/2?'#9fb4c8':(u===4||u===5)&&v<H-3?'#7d786e':'#556b45','#4a3b2c');
  },
  luci:()=>{const [x,y]=iso(4,3);return [[x,y-8,28,.45]]}};
const OGGETTI_SALA=[
  {id:'forte',x:4,y:3,h:24,name:'Plastico di un forte',draw:drawForte,light:1,
    act:()=>say('Plastico di un forte',['Pietra, cemento e cupole di acciaio: così erano i forti dello sbarramento Agno-Astico-Posina.','Sull\'edicola qui accanto c\'è un giornale del 1916 che racconta Casa Ratti a modo suo.'])},
  {id:'edicola',x:6,y:2,h:30,name:'Edicola: un giornale del 1916',draw:drawEdicola,light:1,
    act:oggettoSala(ID,()=>apri(),'Il giornale ora ha le sue bugie cancellate in rosso.')},
  cartellinoMuro('fortiPl1','forti_ratti','L',1,COL,C.forti_ratti.title),
  cartellinoMuro('fortiPl2','forti_maso','L',5,COL,C.forti_maso.title),
  cartellinoMuro('fortiPl3','forti_campomolon','R',5,COL,C.forti_campomolon.title),
  {id:'obice',x:6,y:5,h:16,draw:drawObice}
];

/* ---------- Rompicapo: bugie e verità ---------- */
function apri(){
  const segnate=new Set();
  finestraSala(ID,'Bugie e verità',`
    <p class="clue">Un giornale austro-ungarico del 1916 racconta la presa di Forte Casa Ratti. Tre frasi sono vere, tre sono propaganda. Cancella le bugie toccandole, poi consegna il giornale. Il cartellino «Casa Ratti, la verità» ti aiuta.</p>
    <div class="sl-giornale" id="slGiornale"><h3>Gloria sull'Astico!</h3>${GIORNALE.map(([f],i)=>`<button type="button" data-i="${i}" aria-pressed="false">${f}</button>`).join('')}</div>
    <div class="row"><button type="button" class="primary" id="slConsegna">Consegna il giornale</button></div>`,()=>{
    $('slGiornale').onclick=e=>{const b=e.target.closest('button');if(!b)return;const i=+b.dataset.i;
      segnate.has(i)?segnate.delete(i):segnate.add(i);b.classList.toggle('on',segnate.has(i));b.setAttribute('aria-pressed',segnate.has(i))};
    $('slConsegna').onclick=()=>{
      const errori=GIORNALE.filter(([,v],i)=>v===segnate.has(i)).length;
      if(!errori)risoltoSala(ID,'Giornale corretto. All\'epoca le indagini per ristabilire la verità furono insabbiate: tu l\'hai tirata fuori in un minuto.');
      else bad($('slGiornale'),`${errori} ${errori===1?'frase è':'frasi sono'} ancora al posto sbagliato. Confronta ogni riga con il cartellino.`);
    };
  });
}

registraSala({id:ID,nome:'Sala dei Forti',colore:COL,
  benvenuto:['Sala dei Forti.','Pietra e cannoni a difesa del confine. Ma la storia più strana di questa sala non è una battaglia: è una notizia. Cercala sull\'edicola.'],
  stanza:STANZA,ritorno:{lato:'L',t:6},oggetti:OGGETTI_SALA,cartellini:C,
  aiuti:['Il forte era già vuoto quando arrivarono gli austro-ungarici: chi l\'aveva difeso fino all\'ultimo?',
    'Il bombardamento dell\'obice «Barbara» non fece danni particolari, e il forte fu trovato quasi intatto.',
    'Le bugie sono la prima, la terza e la quinta frase.'],
  tessera:{titolo:'Forte Casa Ratti, Arsiero',
    testo:'Forte Casa Ratti in una foto del 1916 circa. Costruito tra il 1906 e il 1908, fu abbandonato dagli italiani il 26 maggio 1916 e occupato poche ore dopo. Il 24 giugno gli austriaci stessi lo fecero saltare durante la ritirata. Oggi è in rovina.',
    foto:{file:'img/sale/forti.jpg',alt:'Foto d\'epoca in bianco e nero del Forte Casa Ratti, con le cupole sul tetto',autore:'autore sconosciuto, circa 1916',licenza:'pubblico dominio',pagina:'https://commons.wikimedia.org/wiki/File:Kehle_Casa_Ratti.jpg'}},
  fonti:{
    forti_maso:[{fatto:'Forte Monte Maso: primo forte corazzato dopo il 1866, lavori 1883-1887, sei cannoni da 149 mm in stanze Gruson, nessun colpo sparato nel 1915-18',stato:'verificato',fonte:WF.maso},
      {fatto:'Forte Monte Enna: quattro cannoni in cupola, gittata 14 km',stato:'verificato',fonte:WF.maso},
      {fatto:'Tagliata Bariola: sbarramento per il Pian delle Fugazze, ponti levatoi',stato:'verificato',fonte:WF.bariola}],
    forti_ratti:[{fatto:'1906-1908; obice «Barbara» da 380 mm senza danni particolari; abbandonato il 26/5/1916; cariche non azionate, asportati solo gli otturatori; occupato dalla pattuglia del 50º Reggimento; Mlaker arrivato dopo, promosso tenente',stato:'verificato',fonte:WF.ratti}],
    forti_campomolon:[{fatto:'1.853 m, incompiuto, armato con obici, abbandonato il 20 maggio 1916',stato:'verificato',fonte:WF.campomolon}],
    'tessera-forti':[{fatto:'Costruzione 1906-1908, abbandono 26/5/1916, fatto saltare il 24/6/1916, oggi in rovina',stato:'verificato',fonte:WF.ratti}]},
  schede:[
    {id:'casaRatti',chiavi:['casa ratti','ratti','mlaker','arsiero','propaganda','barbara'],
      testo:'Forte Casa Ratti, vicino ad Arsiero, fu abbandonato dagli italiani il 26 maggio 1916 e occupato poche ore dopo da una pattuglia del 50º Reggimento. La propaganda attribuì la conquista al sottotenente Albin Mlaker, arrivato quando la pattuglia era già dentro. Le indagini per ristabilire la verità furono insabbiate.',fonte:WF.ratti},
    {id:'maso',chiavi:['maso','monte maso','gruson','pian delle fugazze','enna','bariola','tagliata'],
      testo:'Forte Monte Maso (1883-1887) fu il primo forte corazzato italiano contro l\'Austria-Ungheria dopo il 1866, con sei cannoni da 149 mm. Non sparò nemmeno un colpo nella Grande Guerra. Più indietro c\'era il forte del Monte Enna, e sulla strada la Tagliata Bariola.',fonte:WF.maso}],
  test:()=>{apri();GIORNALE.forEach(([,v],i)=>{if(!v)$('slGiornale').querySelector(`[data-i="${i}"]`).click()});$('slConsegna').click()}
});
}
