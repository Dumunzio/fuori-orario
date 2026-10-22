/* Sala dello Scrittore: Luigi Meneghello, Malo e le "parole-amo" di Libera nos a Malo.
   Fonti: Wikipedia, Luigi Meneghello e Libera nos a Malo (romanzo). Area: sale. */
{
const ID='meneghello',COL='#c9a65a';
const WM={vita:{titolo:'Wikipedia: Luigi Meneghello',url:'https://it.wikipedia.org/wiki/Luigi_Meneghello'},
  libro:{titolo:'Wikipedia: Libera nos a Malo',url:'https://it.wikipedia.org/wiki/Libera_nos_a_Malo_(romanzo)'}};
const C={
  men_vita:{title:'Da Malo a Reading',where:'Sala dello Scrittore',lines:[
    'Luigi Meneghello nasce a Malo il 16 febbraio 1922. Da ragazzo fa avanti e indietro ogni giorno fino al ginnasio Pigafetta di Vicenza; nel 1939 si iscrive a Lettere a Padova.',
    'Con Antonio Giuriolo e un gruppo di amici universitari, i «piccoli maestri», entra nella Resistenza e guida un reparto partigiano di studenti.',
    'Nel 1947 vince una borsa per l\'Università di Reading, in Inghilterra. Ci resta: dal 1961 al 1980 dirige il nuovo Dipartimento di Studi Italiani. Muore a Thiene nel 2007.']},
  men_libro:{title:'Libera nos a Malo',where:'Sala dello Scrittore',lines:[
    'Il suo libro più importante esce nel 1963. Il titolo è un gioco di parole: «libera nos a malo», nel Padre nostro latino, vuol dire «liberaci dal male». Ma Malo è anche il suo paese.',
    'Racconta l\'infanzia e la vita di Malo dagli anni Trenta agli anni Sessanta, con ironia e con parole del veneto.',
    'Non ha una trama: i pensieri si agganciano uno all\'altro grazie a una parola. Meneghello le chiamava «parole-amo», parole che tirano a sé altre idee.']},
  men_maestri:{title:'I piccoli maestri',where:'Sala dello Scrittore',lines:[
    'Nel 1964 esce «I piccoli maestri», il libro sui suoi anni da partigiano con gli amici di Giuriolo.',
    'Nel 1967 viene tradotto in inglese con il titolo «The Outlaws». Nel 1998 il regista Daniele Luchetti ne ha fatto un film.']}
};
// Le carte del domino: [parola d'inizio, frase, parola-amo]
const CARTE=[
  ['Malo','A Malo nasce Luigi, il 16 febbraio 1922. Presto però deve partire ogni mattina per andare a…','scuola'],
  ['scuola','…scuola al ginnasio Pigafetta di Vicenza, avanti e indietro ogni giorno da Malo. Poi arriva l\'…','università'],
  ['università','…università di Padova, Lettere, nel 1939. Con gli amici di Antonio Giuriolo diventa uno dei…','partigiani'],
  ['partigiani','…partigiani «piccoli maestri», a capo di un reparto di studenti. Finita la guerra, parte per l\'…','Inghilterra'],
  ['Inghilterra','…Inghilterra, all\'Università di Reading, dove insegnerà per più di trent\'anni. Intanto pubblica il suo…','libro'],
  ['libro','…libro più famoso, del 1963, che ha nel titolo il nome del suo paese:','Malo']
];

/* ---------- Disegno ---------- */
function drawScrivania(o,t){const [bx,by]=base(o);
  box(ctx,bx,by+1,10,5,9,'#6a4632','#4a2f22','#3a251b');
  // macchina da scrivere, fogli e libri
  R(ctx,bx-3,by-15,8,5,'#2f2f33');R(ctx,bx-2,by-12,6,1,'#8a8d95');
  // il foglio nella macchina da scrivere: il carrello avanza e le righe crescono
  const tt=tAnim(t),c=Math.floor(tt/260)%6;R(ctx,bx-3+c,by-19,6,4,'#efe2c4');
  for(let k=0;k<Math.min(c,4);k++)R(ctx,bx-2+c,by-18+((k%2)*2),k+1,1,'#5a5040');
  R(ctx,bx-9,by-13,5,3,'#efe2c4');R(ctx,bx+6,by-14,4,4,'#8f3229');R(ctx,bx+6,by-16,4,2,'#2d4a6b');
  if(tessereS()[ID])sparkle(bx,by-22,t);
}
function drawLibreria(o){const [bx,by]=base(o);
  box(ctx,bx,by+1,10,5,30,'#4a3b2c','#3b2e22','#2e241a');
  faceR(bx,by+1,10,5,(x,y,i)=>{if(i<1||i>8)return;for(let k=0;k<3;k++){const h=4+((i*5+k*3)%3);R(ctx,x,y-28+k*9+(6-h),1,h,['#c9a65a','#8f3229','#2d4a6b','#3f5a3a','#efe2c4'][(i+k*2)%5])}});
}
function drawValigia(o){const [bx,by]=base(o);
  box(ctx,bx,by+1,7,3,8,'#7a5236','#5a3a26','#46301f');R(ctx,bx-2,by-12,4,2,'#3a251b');R(ctx,bx-5,by-6,3,2,'#c2493c');R(ctx,bx+2,by-6,3,2,'#efe2c4');
}
const STANZA={w:8,h:8,ox:160,oy:70,
  zona:(x,y)=>x>2&&x<6&&y>1&&y<6?'tappeto':'legno',
  pav:{legno:['#7a5a3e','#735538','#55402a'],tappeto:['#2d4a6b','#29446a','#1f344f','#c9a65a']},
  pareti(g){
    tintaPareti(g,'#a8916a','#8a7656','#5a4a36','#5a3e2a');
    // carta da parati a righe e il campanile di Malo
    for(let x=0;x<8;x++)onWall(g,'R',x,0,11,40,26,(u)=>u%4===0?'#9a8360':null);
    for(let y=0;y<8;y++)onWall(g,'L',y,0,11,40,26,(u)=>u%4===0?'#b89f78':null);
    quadro(g,'R',3,2,10,46,22,(u,v,W,H)=>(u===4||u===5)&&v>3?'#c29e6e':v<H-5?'#9fb4c8':'#6f8a5c');
    quadro(g,'L',4,2,10,44,16,(u,v)=>v%3===1&&u>1&&u<8?'#2a2030':'#efe2c4','#6b5226');
  },
  luci:()=>{const [x,y]=iso(4,3);return [[x,y-10,28,.55]]}};
const OGGETTI_SALA=[
  {id:'scrivania',x:4,y:3,h:22,name:'La scrivania dello scrittore',draw:drawScrivania,light:1,
    act:oggettoSala(ID,()=>apri(),'Le carte sono in fila: da Malo a Malo, una parola-amo dopo l\'altra.')},
  {id:'libreria',x:6,y:1,h:32,draw:drawLibreria},
  {id:'valigia',x:6,y:4,h:12,name:'Una valigia',draw:drawValigia,act:()=>say('Valigia',['Un\'etichetta sbiadita: «Reading, 1947».'])},
  cartellinoMuro('menPl1','men_vita','L',2,COL,C.men_vita.title),
  cartellinoMuro('menPl2','men_libro','R',1,COL,C.men_libro.title),
  cartellinoMuro('menPl3','men_maestri','R',5,COL,C.men_maestri.title),
  // dettagli di contorno (compito 5)
  contorno('scaffale',1,1,30,drawScaffaleLibri,'Libreria',['Libri di ogni colore, in italiano e in inglese. Qualcuno è sottolineato a matita.']),
  contorno('cassaLibri',7,6,12,drawCassa,'Cassa di libri',['Una cassa con l\'etichetta «Reading». Dentro, libri e quaderni pronti per un viaggio.']),
  contorno('lanternaMe',2,6,12,drawLanterna),
  contorno('piantaMe',7,7,20,drawPlant),
  contorno('scaffale2',7,3,30,drawScaffaleLibri)
];

/* ---------- Rompicapo: le parole-amo ---------- */
function apri(){
  const fila=[],ordine=mescola(CARTE.map((_,i)=>i),9);
  finestraSala(ID,'Le parole-amo',`
    <p class="clue">Sulla scrivania i fogli della vita di Meneghello si sono mescolati. Ogni foglio finisce con una parola-amo, e il foglio successivo comincia proprio da quella. Il primo comincia da «Malo». Mettili in fila.</p>
    <div class="sl-carte" id="slFila"></div>
    <p class="eyebrow">Fogli sul tavolo</p>
    <div class="sl-carte" id="slMazzo"></div>`,()=>{
    const disegna=()=>{
      $('slFila').innerHTML=fila.map(i=>`<button type="button" disabled><span class="amo">${CARTE[i][0]}</span><span>${CARTE[i][1]}</span><span class="amo">${CARTE[i][2]} →</span></button>`).join('')||'<p class="eyebrow">Ancora vuota</p>';
      $('slMazzo').innerHTML=ordine.filter(i=>!fila.includes(i)).map(i=>`<button type="button" data-i="${i}"><span class="amo">${CARTE[i][0]}</span><span>${CARTE[i][1]}</span><span class="amo">${CARTE[i][2]}</span></button>`).join('');
    };
    $('slMazzo').onclick=e=>{const b=e.target.closest('button');if(!b)return;const i=+b.dataset.i;
      const serve=fila.length?CARTE[fila[fila.length-1]][2]:'Malo';
      if(CARTE[i][0]===serve){fila.push(i);disegna();
        if(fila.length===CARTE.length)risoltoSala(ID,'«…il nome del suo paese: Malo.» Libera nos a Malo: liberaci dal male, e liberaci da Malo. Meneghello ci giocava apposta.');
      }else bad($('slMazzo'),`Questo foglio comincia da «${CARTE[i][0]}», ma la parola-amo da agganciare è «${serve}».`);
    };
    disegna();
  });
}

registraSala({id:ID,nome:'Sala dello Scrittore',colore:COL,
  benvenuto:['Sala dello Scrittore.','Qui lavorava Luigi Meneghello, nato a Malo nel 1922. Sulla scrivania i fogli della sua vita sono in disordine.'],
  stanza:STANZA,ritorno:{lato:'L',t:6},oggetti:OGGETTI_SALA,cartellini:C,
  aiuti:['Guarda le parole piccole ai lati di ogni foglio: a sinistra come comincia, a destra la parola-amo a cui si aggancia il foglio dopo.',
    'Il primo foglio comincia da «Malo». Il suo amo è «scuola»: cerca il foglio che comincia da «scuola».',
    'Malo, scuola, università, partigiani, Inghilterra, libro.'],
  tessera:{titolo:'Malo, il paese del libro',
    testo:'Malo oggi: la chiesa di San Bernardino e la palazzina municipale. Qui è nato Luigi Meneghello nel 1922, e questo è il paese che ha raccontato in «Libera nos a Malo» (1963), il libro che nel titolo gioca con il suo nome.',
    foto:{file:'img/sale/malo.jpg',alt:'Una via di Malo con la chiesa di San Bernardino e il suo campanile a sinistra e la palazzina municipale a destra',autore:'Threecharlie',licenza:'CC BY-SA 4.0',pagina:'https://commons.wikimedia.org/wiki/File:Chiesa_di_San_Bernardino_e_palazzina_municipale_(Malo).jpg'}},
  fonti:{
    men_vita:[{fatto:'Malo 16/2/1922; ginnasio Pigafetta da pendolare; Lettere a Padova nel 1939; piccoli maestri con Giuriolo e reparto di universitari; Reading dal 1947; direttore del Dipartimento di Studi Italiani 1961-1980; morto a Thiene nel 2007',stato:'verificato',fonte:WM.vita}],
    men_libro:[{fatto:'1963; gioco di parole tra «liberaci dal male» e Malo; infanzia e vita di Malo dagli anni Trenta ai Sessanta; ironia e veneto; «parole-amo»',stato:'verificato',fonte:WM.libro}],
    men_maestri:[{fatto:'I piccoli maestri (1964); The Outlaws (1967); film di Daniele Luchetti (1998)',stato:'verificato',fonte:WM.vita}],
    'tessera-meneghello':[{fatto:'Meneghello nato a Malo nel 1922; Libera nos a Malo (1963) e il gioco di parole del titolo',stato:'verificato',fonte:WM.libro},
      {fatto:'La foto mostra la chiesa di San Bernardino e la palazzina municipale di Malo (titolo della foto su Commons)',stato:'verificato',fonte:{titolo:'Wikimedia Commons: la foto',url:'https://commons.wikimedia.org/wiki/File:Chiesa_di_San_Bernardino_e_palazzina_municipale_(Malo).jpg'}}]},
  schede:[
    {id:'meneghello',chiavi:['meneghello','luigi','scrittore','malo','reading'],
      testo:'Luigi Meneghello, nato a Malo nel 1922, fu partigiano con i «piccoli maestri» e poi professore all\'Università di Reading, in Inghilterra, dove diresse il Dipartimento di Studi Italiani. Ha raccontato Malo in «Libera nos a Malo» (1963). È morto a Thiene nel 2007.',fonte:WM.vita},
    {id:'liberaNos',chiavi:['libera nos','libro','titolo','parole amo','gioco di parole','padre nostro'],
      testo:'«Libera nos a Malo» (1963) è il libro più importante di Meneghello. Il titolo gioca sul Padre nostro latino, «liberaci dal male», e sul nome del suo paese, Malo. I pensieri si agganciano uno all\'altro con le «parole-amo».',fonte:WM.libro}],
  test:()=>{apri();CARTE.forEach((_,i)=>$('slMazzo').querySelector(`[data-i="${i}"]`).click())}
});
}
