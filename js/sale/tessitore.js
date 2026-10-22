/* Sala del Tessitore: l'Omo di Schio e gli otto motti del suo basamento.
   Fonte: Wikipedia, Monumento al Tessitore. Area: sale. */
{
const ID='tessitore',COL='#c2493c';
const C={
  tes_omo:{title:'L\'Omo di Schio',where:'Sala del Tessitore',lines:[
    'Il Monumento al Tessitore è del 1879, opera dello scultore Giulio Monteverde. Gli scledensi lo chiamano «l\'Omo», l\'uomo in veneto.',
    'Lo volle Alessandro Rossi e lo dedicò «ai suoi tessitori». È considerato il primo monumento in Italia dedicato a dei lavoratori.',
    'L\'operaio di pietra bianca tiene in mano una navetta del telaio e la guarda. Ai suoi piedi, i panni: il frutto del suo lavoro.']},
  tes_storia:{title:'Una statua che ha viaggiato',where:'Sala del Tessitore',lines:[
    'Inaugurato il 21 settembre 1879 tra l\'ingresso del lanificio e il quartiere operaio, negli anni Trenta fu spostato nei giardini di via Maraschin.',
    'Dal 1945 sta nella piazza principale di Schio, davanti al duomo. Nel maggio 2003 una gru lo abbatté per sbaglio: restaurato, tornò al suo posto nel 2004.',
    'Il basamento in granito è di Antonio Caregaro Negrin. In otto formelle sono incisi i motti di Rossi. Molti sono a specchio: la seconda metà riprende una parola della prima.']}
};
const MOTTI=[
  ['Rivendichiamo rinnovando','l\'arte dei padri'],
  ['Eguali dinnanzi al telaio','come dinnanzi a Dio'],
  ['L\'avvenire è','dei popoli lavoratori'],
  ['Capitale lavoro di ieri,','lavoro capitale del domani'],
  ['Pronti alla navetta per la famiglia,','alla carabina per l\'Italia ed il Re'],
  ['Il lavoro ci affranca','ed eleva'],
  ['Conquiste di lavoro,','conquiste d\'oro'],
  ['Dal telaio il risparmio,','dal risparmio la proprietà']
];

/* ---------- Disegno ---------- */
const OMO=['..hh..','.hssh.','..ss..','.wwww.','wwwwww','ww.wnn','ww.w..','.wwww.','.w..w.','.w..w.','.ww.ww'];
const OMO_PAL={h:'#d9d4c7',s:'#ece8dc',w:'#c9c3b4',n:'#7a5236'};
function drawOmo(o,t){const [bx,by]=base(o);
  diamond(ctx,bx,by+1,9,4,'rgba(0,0,0,.35)');
  const top=piedistallo(bx,by,9,['#7b7e86','#5c5f67','#4a4c53']);
  // le otto formelle sul basamento: si accendono quando i motti sono ricomposti
  faceL(bx,by+1,7,3,(x,y,i)=>{if(i%2===1)R(ctx,x,y-7,1,4,tessereS()[ID]?'#e0b04f':'#8a8d95')});
  faceR(bx,by+1,7,3,(x,y,i)=>{if(i%2===1)R(ctx,x,y-7,1,4,tessereS()[ID]?'#e0b04f':'#3f4147')});
  R(ctx,bx-6,top-2,5,2,'#9c3b30');R(ctx,bx+1,top-2,5,2,'#b5523f');
  sprS(OMO,OMO_PAL,bx-6,top-22,2);
  if(tessereS()[ID])sparkle(bx+7,top-24,t);
}
function drawRotolo(o){const [bx,by]=base(o);
  diamond(ctx,bx,by+1,6,3,'rgba(0,0,0,.3)');
  for(let k=0;k<3;k++){box(ctx,bx,by+1-k*4,6,3,4,k%2?'#c2493c':'#efe2c4',k%2?'#8f3229':'#c9bc9c',k%2?'#7a2a22':'#a89b7c')}
}
const STANZA={w:8,h:8,ox:160,oy:70,
  zona:(x,y)=>Math.abs(x-3.5)<2&&Math.abs(y-3.5)<2?'tappeto':'piazza',
  pav:{piazza:['#7d7a72','#75726a','#5b5952'],tappeto:['#8f3229','#9c3b30','#6e241d','#e0b04f']},
  pareti(g){
    tintaPareti(g,'#7a6a58','#5f5244','#3d3229','#b8892f');
    // fasce di lana rossa e bianca
    for(let x=0;x<8;x++)onWall(g,'R',x,0,11,30,3,()=>x%2?'#c2493c':'#efe2c4');
    for(let y=0;y<8;y++)onWall(g,'L',y,0,11,30,3,()=>y%2?'#efe2c4':'#c2493c');
    // la Fabbrica Alta e una navetta
    quadro(g,'R',2,1,11,44,20,(u,v,W,H)=>v<8?'#7d9ab8':(u>2&&u<W-2&&v>6)?((u+v)%3?'#b5523f':'#f2d27a'):'#556b45');
    quadro(g,'R',5,2,10,42,14,(u,v,W,H)=>Math.abs(v-H/2)<2&&u>1&&u<W-1?'#7a5236':'#efe2c4');
    quadro(g,'L',2,2,10,44,18,(u,v)=>v%4===1?'#2a2030':'#efe2c4','#6b5226');
  },
  luci:()=>{const [x,y]=iso(4,3);return [[x,y-10,34,.6]]}};
const OGGETTI_SALA=[
  {id:'omo',x:4,y:3,h:34,name:'Il Tessitore e le otto formelle',draw:drawOmo,light:1,
    act:oggettoSala(ID,()=>apri(),'Le otto formelle sono di nuovo intere. L\'Omo guarda la sua navetta, come dal 1879.')},
  cartellinoMuro('tesPl1','tes_omo','L',4,COL,C.tes_omo.title),
  cartellinoMuro('tesPl2','tes_storia','R',3,COL,C.tes_storia.title),
  {id:'rotolo1',x:7,y:1,h:14,draw:drawRotolo},
  {id:'rotolo2',x:1,y:1,h:14,draw:drawRotolo},
  {id:'panca',x:6,y:7,h:8,draw:drawBench}
];

/* ---------- Rompicapo: le otto formelle ---------- */
function apri(){
  const destra=mescola(MOTTI.map((m,i)=>i),11);let sx=null;const fatti=new Set();
  finestraSala(ID,'Le otto formelle',`
    <p class="clue">Le formelle si sono spezzate: a sinistra l'inizio dei motti di Alessandro Rossi, a destra le fini in disordine. Tocca un inizio, poi la sua fine.</p>
    <div class="sl-cesti">
      <div><h3>Inizio</h3><div class="sl-scelte" id="slSx">${MOTTI.map((m,i)=>`<button type="button" data-i="${i}">${m[0]}</button>`).join('')}</div></div>
      <div><h3>Fine</h3><div class="sl-scelte" id="slDx">${destra.map(i=>`<button type="button" data-i="${i}">${MOTTI[i][1]}</button>`).join('')}</div></div>
    </div>`,()=>{
    $('slSx').onclick=e=>{const b=e.target.closest('button');if(!b||fatti.has(+b.dataset.i))return;
      $('slSx').querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));sx=+b.dataset.i};
    $('slDx').onclick=e=>{const b=e.target.closest('button');if(!b||sx===null||fatti.has(+b.dataset.i))return;
      if(+b.dataset.i===sx){fatti.add(sx);
        [$('slSx').querySelector(`[data-i="${sx}"]`),b].forEach(x=>{x.classList.remove('on');x.classList.add('ok');x.disabled=true});
        const m=$('msg');m.className='msg good';m.textContent=`«${MOTTI[sx][0]} ${MOTTI[sx][1]}»`;sx=null;
        if(fatti.size===MOTTI.length)risoltoSala(ID,'Le otto formelle sono intere. Sul basamento i motti si illuminano uno dopo l\'altro.');
      }else bad($('slDx'),'Questa fine non si incastra. Rileggi l\'inizio ad alta voce.');
    };
  });
}

registraSala({id:ID,nome:'Sala del Tessitore',colore:COL,
  benvenuto:['Sala del Tessitore.','Al centro c\'è l\'Omo, il tessitore di pietra di Schio. Sul suo basamento otto formelle si sono spezzate: rimettile insieme.'],
  stanza:STANZA,ritorno:{lato:'L',t:6},oggetti:OGGETTI_SALA,cartellini:C,
  aiuti:['Molti motti sono a specchio: la seconda metà riprende una parola della prima. Cerca le parole ripetute: lavoro, risparmio, conquiste.',
    'Comincia da «Dal telaio il risparmio,» e da «Capitale lavoro di ieri,»: a destra c\'è la stessa idea girata al contrario.',
    'Le più corte: «Il lavoro ci affranca» va con «ed eleva», «L\'avvenire è» con «dei popoli lavoratori».'],
  tessera:{titolo:'L\'Omo, Schio',
    testo:'Il Monumento al Tessitore sta in piazza a Schio, davanti al duomo, dal 1945. Gli scledensi lo chiamano l\'Omo. Nel 2003 una gru lo abbatté per sbaglio: restaurato, è tornato al suo posto nel 2004.',
    foto:{file:'img/sale/tessitore.jpg',alt:'La statua del Tessitore a Schio: un operaio di pietra bianca con la navetta in mano',autore:'wanblee',licenza:'CC BY-SA 2.5',pagina:'https://commons.wikimedia.org/wiki/File:Schio_l%27Omo.jpg'}},
  fonti:{
    tes_omo:[{fatto:'1879, Giulio Monteverde, «l\'Omo», voluto da Rossi per i suoi tessitori, primo monumento in Italia ai lavoratori',stato:'verificato',fonte:W.tessitore}],
    tes_storia:[{fatto:'Inaugurato il 21/9/1879, spostato negli anni Trenta, in piazza dal 1945, abbattuto da una gru nel 2003, restaurato nel 2004; basamento di Caregaro Negrin con otto motti',stato:'verificato',fonte:W.tessitore}],
    'tessera-tessitore':[{fatto:'In piazza dal 1945; abbattuto nel 2003, restaurato nel 2004',stato:'verificato',fonte:W.tessitore}]},
  schede:[
    {id:'mottiRossi',chiavi:['motti','motto','formelle','formella','basamento','scritte','tessitore'],
      testo:'Sul basamento del Tessitore, in otto formelle, ci sono i motti di Alessandro Rossi. Per esempio: «Dal telaio il risparmio, dal risparmio la proprietà» e «L\'avvenire è dei popoli lavoratori». Il basamento è di Antonio Caregaro Negrin.',fonte:W.tessitore},
    {id:'omoStoria',chiavi:['gru','2003','2004','abbattuto','caduto','spostato','piazza','duomo','1945'],
      testo:'L\'Omo ha viaggiato: inaugurato nel 1879 tra il lanificio e il quartiere operaio, spostato negli anni Trenta, è in piazza davanti al duomo dal 1945. Nel maggio 2003 una gru lo abbatté per sbaglio; restaurato, è tornato al suo posto nel 2004.',fonte:W.tessitore}],
  // per i test automatici: risolve il rompicapo come farebbe un giocatore
  test:()=>{apri();MOTTI.forEach((m,i)=>{$('slSx').querySelector(`[data-i="${i}"]`).click();$('slDx').querySelector(`[data-i="${i}"]`).click()})}
});
}
