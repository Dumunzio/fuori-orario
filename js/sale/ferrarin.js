/* Sala dell'Aviatore: Arturo Ferrarin di Thiene e il raid Roma-Tokyo del 1920.
   Fonti: Wikipedia, Arturo Ferrarin e Raid Roma-Tokyo. Area: sale. */
{
const ID='ferrarin',COL='#4a7aa8';
const WA={ferrarin:{titolo:'Wikipedia: Arturo Ferrarin',url:'https://it.wikipedia.org/wiki/Arturo_Ferrarin'},
  raid:{titolo:'Wikipedia: Raid Roma-Tokyo',url:'https://it.wikipedia.org/wiki/Raid_Roma-Tokyo'}};
const C={
  fer_raid:{title:'Roma-Tokyo, 1920',where:'Sala dell\'Aviatore',lines:[
    'L\'idea del volo fu di Gabriele D\'Annunzio, nata dall\'amicizia con il poeta giapponese Harukichi Shimoi.',
    'Partirono undici aerei. Solo due arrivarono in Giappone: quelli di Arturo Ferrarin e Guido Masiero, con i motoristi Gino Cappannini e Roberto Maretto.',
    'Volavano su biplani S.V.A.9 di legno e tela, senza cabina chiusa. Partenza da Roma Centocelle il 14 febbraio 1920, arrivo a Tokyo il 31 maggio.']},
  fer_rotta:{title:'Il diario di bordo',where:'Sala dell\'Aviatore',lines:[
    'Il 14 febbraio, alle 11, si parte da Roma. Una delle prime tappe è Valona, in Albania.',
    'A Baghdad Ferrarin atterra su un campo dove si sta giocando una partita di calcio. Dall\'India, dopo Karachi, arriva a Calcutta, poi al Siam: Bangkok.',
    'In Cina atterra all\'ippodromo di Shanghai il 2 maggio e ci resta una settimana di feste. Poi riparte verso nord, per Pechino, dove riceve l\'Ordine della Tigre. Dalla Corea, dopo Seul, raggiunge il Giappone: a Tokyo atterra nel parco Yoyogi.']},
  fer_vita:{title:'Ferrarin di Thiene',where:'Sala dell\'Aviatore',lines:[
    'Arturo Ferrarin nasce a Thiene il 13 febbraio 1895, in una famiglia di industriali tessili. Nella Grande Guerra è prima mitragliere, poi pilota.',
    'Nel 1928, con Carlo Del Prete, conquista il record mondiale di distanza senza scalo: da Montecelio, vicino a Roma, a Touros in Brasile. Muore nel 1941 collaudando un aereo a Guidonia.',
    'L\'aeroporto di Thiene porta il suo nome. Nel film Porco Rosso di Hayao Miyazaki, del 1992, c\'è un personaggio dedicato a lui.']}
};
// Le tappe, in ordine: [nome, longitudine, latitudine]
const TAPPE=[['Roma',12.5,41.9],['Valona',19.5,40.5],['Baghdad',44.4,33.3],['Karachi',67,24.9],['Calcutta',88.4,22.6],
  ['Bangkok',100.5,13.8],['Shanghai',121.5,31.2],['Pechino',116.4,39.9],['Seul',127,37.6],['Tokyo',139.7,35.7]];
const MW_=480,MH_=230,px=lon=>14+(lon-5)/140*(MW_-40),py=lat=>14+(48-lat)/38*(MH_-40);

/* ---------- Disegno ---------- */
function drawAereo(o,t){const [bx,by]=base(o);
  R(ctx,bx-1,by-14,2,14,'#3d3320');diamond(ctx,bx,by+1,5,2,'rgba(0,0,0,.3)');
  const y=by-22+Math.round(Math.sin(t/600));
  R(ctx,bx-10,y-5,20,2,'#d9c38a');R(ctx,bx-10,y+2,20,2,'#c9b37a');R(ctx,bx-8,y-3,1,5,'#5a3e2a');R(ctx,bx+7,y-3,1,5,'#5a3e2a');
  R(ctx,bx-4,y-1,14,3,'#a8916a');R(ctx,bx+10,y-2,2,5,'#3a3a3a');R(ctx,bx-7,y-3,3,2,'#c2493c');R(ctx,bx-7,y+1,3,1,'#2d4a6b');
  if(tessereS()[ID])sparkle(bx,y-10,t);
}
function drawMappamondo(o){const [bx,by]=base(o);
  box(ctx,bx,by+1,9,4,12,'#6a4632','#4a2f22','#3a251b');
  R(ctx,bx-9,by-24,18,10,'#1f3a5a');for(let k=0;k<6;k++)R(ctx,bx-8+k*3,by-22+(k%3),2,2,'#7aa86a');
  for(let k=0;k<6;k++)R(ctx,bx-8+k*3,by-17-(k%2),2,1,'#e0b04f');
}
const STANZA={w:8,h:8,ox:160,oy:70,
  zona:(x,y)=>x===y||x===y+1?'pista':'prato',
  pav:{pista:['#6e6a60','#68645b','#4c4943','#efe2c4'],prato:['#5f7a52','#5a7449','#465a3a']},
  pareti(g){
    tintaPareti(g,'#7d9ab8','#647f9c','#3e4f63','#efe2c4');
    // nuvole e un hangar
    for(let x=0;x<8;x++)onWall(g,'R',x,0,11,50,30,(u,v)=>((u+x*11)%23<6&&v>4&&v<9)?'#e9eef0':null);
    for(let y=0;y<8;y++)onWall(g,'L',y,0,11,50,30,(u,v)=>((u+y*7)%19<5&&v>8&&v<12)?'#e9eef0':null);
    quadro(g,'R',5,1,11,30,16,(u,v,W,H)=>v<4?'#8a8d8f':(u>2&&u<W-2&&v>6)?'#1a1424':'#a8abad','#45484a');
    quadro(g,'L',3,2,10,46,20,(u,v,W,H)=>{const dx=u-W/2,dy=v-8;return dx*dx+dy*dy*.7<7?'#e6c9a3':v>13&&Math.abs(dx)<4?'#5a3e2a':'#c9b37a'});
  },
  luci:()=>{const [x,y]=iso(4,3);return [[x,y-14,30,.5]]}};
const OGGETTI_SALA=[
  {id:'aereo',x:4,y:3,h:30,name:'Modello di S.V.A.9',draw:drawAereo,light:1,
    act:()=>say('Modello di S.V.A.9',['Legno e tela, nessuna cabina: con un biplano così Ferrarin volò da Roma a Tokyo.','Il diario di bordo è aperto sul mappamondo: la rotta però è da ricostruire.'])},
  {id:'mappamondo',x:6,y:2,h:26,name:'Mappamondo: la rotta del raid',draw:drawMappamondo,light:1,
    act:oggettoSala(ID,()=>apri(),'La rotta è tracciata: 14 febbraio, Roma. 31 maggio, Tokyo.')},
  cartellinoMuro('ferPl1','fer_raid','L',1,COL,C.fer_raid.title),
  cartellinoMuro('ferPl2','fer_rotta','L',5,COL,C.fer_rotta.title),
  cartellinoMuro('ferPl3','fer_vita','R',2,COL,C.fer_vita.title)
];

/* ---------- Rompicapo: traccia la rotta ---------- */
function apri(){
  let fatte=1;
  const etichette=mescola(TAPPE.map((_,i)=>i).slice(1),3);
  finestraSala(ID,'Traccia la rotta',`
    <p class="clue">Il diario di bordo è bagnato e la rotta si è cancellata. Partendo da Roma, tocca le città nell'ordine in cui Ferrarin le raggiunse, sulla mappa o nei pulsanti qui sotto. Il cartellino «Il diario di bordo» ti aiuta.</p>
    <canvas class="sl-tela" id="slMappa" width="${MW_}" height="${MH_}" aria-label="Mappa dall'Italia al Giappone con le città del raid"></canvas>
    <div class="row" id="slCitta">${etichette.map(i=>`<button type="button" data-i="${i}">${TAPPE[i][0]}</button>`).join('')}</div>`,()=>{
    const cv2=$('slMappa'),g=cv2.getContext('2d');
    const disegna=()=>{
      g.fillStyle='#10233a';g.fillRect(0,0,MW_,MH_);
      g.strokeStyle='rgba(159,180,200,.15)';for(let lon=10;lon<=150;lon+=20){g.beginPath();g.moveTo(px(lon),0);g.lineTo(px(lon),MH_);g.stroke()}
      for(let lat=10;lat<=50;lat+=10){g.beginPath();g.moveTo(0,py(lat));g.lineTo(MW_,py(lat));g.stroke()}
      g.strokeStyle='#e0b04f';g.lineWidth=2;g.beginPath();TAPPE.slice(0,fatte).forEach(([,lo,la],k)=>k?g.lineTo(px(lo),py(la)):g.moveTo(px(lo),py(la)));g.stroke();
      g.font=fontTela(15);
      TAPPE.forEach(([n,lo,la],k)=>{g.fillStyle=k<fatte?'#e0b04f':'#efe2c4';g.beginPath();g.arc(px(lo),py(la),k<fatte?5:4,0,7);g.fill();
        g.fillText(n,px(lo)+6,py(la)+(n==='Pechino'?-6:n==='Shanghai'||n==='Valona'?14:-4))});
    };
    const tocca=i=>{
      if(i<fatte)return;
      if(i===fatte){fatte++;const b=$('slCitta').querySelector(`[data-i="${i}"]`);if(b){b.disabled=true;b.classList.add('primary')}
        const m=$('msg');m.className='msg good';m.textContent=`${TAPPE[i][0]}: tappa ${i+1} di ${TAPPE.length}.`;disegna();
        if(fatte===TAPPE.length)risoltoSala(ID,'Tokyo, 31 maggio 1920. Di undici aerei partiti, ne arrivarono due: uno era quello di Ferrarin.');
      }else{bad($('slCitta'),`${TAPPE[i][0]} non è la tappa successiva. Rileggi il diario di bordo: dove andò dopo ${TAPPE[fatte-1][0]}?`)}
    };
    $('slCitta').onclick=e=>{const b=e.target.closest('button');if(b)tocca(+b.dataset.i)};
    cv2.onclick=e=>{const r=cv2.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*MW_,y=(e.clientY-r.top)/r.height*MH_;
      let best=-1,d=18;TAPPE.forEach(([,lo,la],k)=>{const dd=Math.hypot(px(lo)-x,py(la)-y);if(dd<d){d=dd;best=k}});if(best>0)tocca(best)};
    disegna();
  });
}

registraSala({id:ID,nome:'Sala dell\'Aviatore',colore:COL,
  benvenuto:['Sala dell\'Aviatore.','Nel 1920 un ragazzo di Thiene volò da Roma a Tokyo su un aereo di legno e tela. Ricostruisci la sua rotta.'],
  stanza:STANZA,ritorno:{lato:'L',t:6},oggetti:OGGETTI_SALA,cartellini:C,
  aiuti:['Il volo va da ovest a est, con una sola eccezione: in Cina Ferrarin torna un po\' indietro.',
    'Dopo Bangkok viene Shanghai. Da Shanghai sale a nord verso Pechino, poi la Corea.',
    'Roma, Valona, Baghdad, Karachi, Calcutta, Bangkok, Shanghai, Pechino, Seul, Tokyo.'],
  tessera:{titolo:'Arturo Ferrarin',
    testo:'Arturo Ferrarin in una foto del 1932. Nato a Thiene nel 1895, nel 1920 volò da Roma a Tokyo e nel 1928 conquistò il record mondiale di distanza senza scalo fino al Brasile. L\'aeroporto di Thiene porta il suo nome, e in Porco Rosso di Miyazaki c\'è un personaggio dedicato a lui.',
    foto:{file:'img/sale/ferrarin.jpg',alt:'Ritratto in bianco e nero di Arturo Ferrarin',autore:'fotografo sconosciuto, 1932',licenza:'pubblico dominio',pagina:'https://commons.wikimedia.org/wiki/File:WP_Arturo_Ferrarin.jpg'}},
  fonti:{
    fer_raid:[{fatto:'Idea di D\'Annunzio e Shimoi; undici aerei, due arrivati; equipaggi; S.V.A.9 in legno e tela; 14 febbraio - 31 maggio 1920',stato:'verificato',fonte:WA.raid},
      {fatto:'Durata del volo',stato:'da precisare',fonte:WA.raid,nota:'Le fonti non sono d\'accordo: 109 ore di volo secondo la voce su Ferrarin, 112 secondo quella sul raid. Per questo non le citiamo.'}],
    fer_rotta:[{fatto:'Tappe Roma, Valona, Baghdad (partita di calcio), Karachi, Calcutta, Bangkok, Shanghai (ippodromo, 2 maggio, una settimana), Pechino (Ordine della Tigre), Seul, Tokyo (parco Yoyogi)',stato:'verificato',fonte:WA.raid},
      {fatto:'Shanghai il 2 maggio all\'ippodromo; Ordine della Tigre a Pechino',stato:'verificato',fonte:WA.ferrarin}],
    fer_vita:[{fatto:'Thiene 13/2/1895; mitragliere e poi pilota; record 1928 con Del Prete Montecelio-Touros; morte nel 1941 a Guidonia; aeroporto di Thiene; Porco Rosso (1992)',stato:'verificato',fonte:WA.ferrarin}],
    'tessera-ferrarin':[{fatto:'Nascita, raid, record 1928, aeroporto, Porco Rosso',stato:'verificato',fonte:WA.ferrarin}]},
  schede:[
    {id:'ferrarin',chiavi:['ferrarin','arturo','aviatore','pilota','porco rosso','miyazaki'],
      testo:'Arturo Ferrarin, nato a Thiene nel 1895, è l\'aviatore del raid Roma-Tokyo del 1920. Nel 1928 con Carlo Del Prete conquistò il record di distanza senza scalo fino al Brasile. In Porco Rosso di Miyazaki c\'è un personaggio dedicato a lui, e l\'aeroporto di Thiene porta il suo nome.',fonte:WA.ferrarin},
    {id:'raid',chiavi:['raid','tokyo','giappone','volo','1920','biplano','annunzio','masiero'],
      testo:'Il raid Roma-Tokyo partì il 14 febbraio 1920 e arrivò il 31 maggio. Degli undici aerei partiti, solo quelli di Ferrarin e Guido Masiero arrivarono in Giappone. A Tokyo Ferrarin fu ricevuto dal principe Hirohito.',fonte:WA.raid}],
  test:()=>{apri();for(let i=1;i<TAPPE.length;i++)$('slCitta').querySelector(`[data-i="${i}"]`).click()}
});
}
