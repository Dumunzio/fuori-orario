/* Lo zaino e le statuine: collezionabili per curiosi, non servono per uscire.
   - Esaminando l'espositore di dépliant dell'ingresso (depliantIn, stanza.js) prendi la piantina del museo:
     dallo zaino si apre da qualsiasi stanza (apriPianta, pianta.js).
   - 13 statuine, una per stanza, nascoste dentro un oggetto che si può esaminare (STATUINE.oggetto). Non sono segnalate.
   - Il pulsante «Zaino» è nella barra da subito; vuoto, dice che c'è qualcosa da cercare. Dentro: la pianta e la vetrinetta delle statuine,
     con «?» al posto di quelle che mancano (senza dire dove sono).
   - A fine partita: riepilogoStatuine() nella finestra finale (da riepilogoTessere, registro.js), statuineTrovate() nei titoli
     e nella cartolina (solo se le hai trovate tutte).
   Gli oggetti non cambiano nei loro file: qui si aggancia la loro azione (o.act). La prima volta danno la statuina,
   poi dicono le frasi di sempre. Stato in S.zaino {pianta, statuine:{id:true}}, salvato con la partita.
   Nomi globali: STATUINE, apriZaino, riepilogoStatuine, statuineTrovate, prendiTutteStatuine. Area: sale. */

// Le statuine: stanza, oggetto dove sono nascoste, nome, frase, disegno (8×12, una lettera per colore) e colori.
const STATUINE=[
  {id:'custode',stanza:'ingresso',oggetto:'ombrelliIn',nome:'Il custode',
    frase:'Il custode in miniatura, con il berretto e le chiavi. Quello vero giura di non averla mai vista.',
    righe:['..cccc..','.cccccc.','..ssss..','..sees..','..ssss..','.uuuuuu.','uuuguuuu','suuguuus','.uuuuuu.','.uu..uu.','.uu..uu.','.kk..kk.'],
    colori:{c:'#22305a',u:'#2b3a6b',g:'#e0b04f'}},
  {id:'palladio',stanza:'villa',oggetto:'disegni',nome:'Andrea Palladio',
    frase:'Palladio con il compasso in mano. Anche la statuina, naturalmente, è perfettamente simmetrica.',
    righe:['..hhhh..','.hhhhhh.','..ssss..','..sees..','..ssss..','.rrrrrr.','rrrrrrry','srrrrrys','.rrrrry.','.rrrrrr.','.rrrrrr.','.kk..kk.'],
    colori:{h:'#3b2618',r:'#7a2a3a',y:'#cfd6da'}},
  {id:'tessitore',stanza:'tessitore',oggetto:'balla',nome:'Il tessitore',
    frase:'Un tessitore con la navetta in mano: come l\'Omo di Schio, ma tascabile.',
    righe:['..bbbb..','.bbbbbb.','..ssss..','..sees..','..ssss..','.wwwwww.','wwwwwwww','swwwwwsn','.aaaaaa.','.aa..aa.','.aa..aa.','.kk..kk.'],
    colori:{b:'#3b4f7a',w:'#efe2c4',a:'#8a7350',n:'#5a3e2a'}},
  {id:'minatore',stanza:'mine',oggetto:'cassaMi',nome:'Il minatore',
    frase:'Un minatore del Genio con il casco e la lanterna. Ha l\'aria di chi sta ascoltando la roccia.',
    righe:['..yyyy..','.yyylyy.','yyyyyyyy','..sees..','..ssss..','.gggggg.','gggggggg','sggggggs','.gggggg.','.dd..dd.','.dd..dd.','.kk..kk.'],
    colori:{y:'#c9a65a',l:'#fff1b8',g:'#556b45',d:'#3a3f3d'}},
  {id:'alpino',stanza:'cimone',oggetto:'roccia2',nome:'L\'alpino',
    frase:'Un alpino con la penna nera sul cappello, pronto a salire sul Cimone.',
    righe:['......f.','.....f..','.aaaaf..','aaaaaaa.','..sees..','..ssss..','.vvvvvv.','vvvvvvvv','svvvvvvs','.vv..vv.','.vv..vv.','.kk..kk.'],
    colori:{a:'#5d6b5a',f:'#1a1424',v:'#6b7355'}},
  {id:'vedetta',stanza:'forti',oggetto:'sacchiFo',nome:'La vedetta',
    frase:'Una vedetta con il binocolo sempre davanti agli occhi. Non si è accorta di essere finita in un museo.',
    righe:['..mmmm..','.mmmmmm.','..ssss..','.BBssBB.','..ssss..','.vvvvvv.','svvvvvvs','.vvvvvv.','.vvvvvv.','.vv..vv.','.vv..vv.','.kk..kk.'],
    colori:{m:'#4d5350',B:'#1a1424',v:'#7a6e4a'}},
  {id:'calciatore',stanza:'citta',oggetto:'bici',nome:'Il calciatore',
    frase:'Un calciatore con il pallone sotto il braccio, diretto allo Stadio dei Fiori.',
    righe:['..hhhh..','.hhhhhh.','..ssss..','..sees..','..ssss..','.jJjJjJ.','jJjJjJjJ','sJjJjJoo','.wwwwwoo','.ss..ss.','.ss..ss.','.kk..kk.'],
    colori:{h:'#3b2618',j:'#2f6b4a',J:'#efe2c4',w:'#efe2c4',o:'#f4f0d8'}},
  {id:'cavaliere',stanza:'castello',oggetto:'baule',nome:'Il cavaliere',
    frase:'Un cavaliere in armatura, un po\' fuori posto in un castello che non è mai stato una fortezza.',
    righe:['...rr...','..AAAA..','.AAAAAA.','.AeAAeA.','.AAAAAA.','.AAAAAA.','AAAAAAAA','AAAAAAAA','.AAAAAA.','.AA..AA.','.AA..AA.','.kk..kk.'],
    colori:{A:'#a8b0b8',r:'#c2493c'}},
  {id:'aviatore',stanza:'ferrarin',oggetto:'cassaFe',nome:'L\'aviatore',
    frase:'Un aviatore con gli occhialoni e la sciarpa al vento. Destinazione: Tokyo.',
    righe:['..LLLL..','.LLLLLL.','.GGssGG.','..ssss..','..ssss..','.LLLLLww','LLLLLLLw','sLLLLLLs','.LLLLLL.','.dd..dd.','.dd..dd.','.kk..kk.'],
    colori:{L:'#7a5236',G:'#7fc4dc',w:'#efe2c4',d:'#3b2a1e'}},
  {id:'granchio',stanza:'grotta',oggetto:'lanternaGr',nome:'Il granchio',
    frase:'Un granchio di pietra, come quelli fossili di Priabona. Questo però è solo dipinto.',
    righe:['........','........','.c....c.','cc....cc','.c.ee.c.','..cccc..','.cccccc.','cccccccc','.cccccc.','c.c..c.c','........','........'],
    colori:{c:'#b5523f'}},
  {id:'anguana',stanza:'anguane',oggetto:'cesto',nome:'L\'anguana',
    frase:'Un\'anguana con i capelli color acqua. Si dice che porti fortuna a chi rispetta i ruscelli.',
    righe:['..aaaa..','.aaaaaa.','aassssaa','aaseesaa','aassssaa','aaddddaa','.dddddd.','sdddddds','.dddddd.','dddddddd','dddddddd','.dddddd.'],
    colori:{a:'#4f7a9a',d:'#7fc4dc'}},
  {id:'scrittore',stanza:'meneghello',oggetto:'valigia',nome:'Lo scrittore',
    frase:'Uno scrittore con un libro sotto il braccio e la valigia pronta per partire.',
    righe:['..hhhh..','.hhhhhh.','..ssss..','..sees..','..ssss..','.jjjjjj.','jjjjjjbb','sjjjjjbb','.jjjjjj.','.dd..dd.','.dd..dd.','.kk..kk.'],
    colori:{h:'#8a8a8a',j:'#5a4630',b:'#c2493c',d:'#2e2b3c'}},
  {id:'dama',stanza:'recoaro',oggetto:'cassaBott',nome:'La dama delle terme',
    frase:'Una signora dell\'Ottocento con il cappello a tesa larga, in vacanza alle terme di Recoaro.',
    righe:['.tttttt.','tttttttt','..ssss..','..sees..','..ssss..','.rrrrrr.','rrrrrrrr','srrrrrrs','rrrrrrrr','rrrrrrrr','rrrrrrrr','.kk..kk.'],
    colori:{t:'#e8d9a8',r:'#c97a8a'}}
];
{
const Z=()=>S.zaino||(S.zaino={pianta:false,statuine:{}});
const salva=()=>{if(typeof salvaPartita==='function')salvaPartita()};
const trovate=()=>STATUINE.filter(s=>Z().statuine[s.id]).length;
// colori comuni a tutte: pelle, occhi, scarpe, piedistallo d'ottone
const BASE={s:'#e8b98f',e:'#1a1424',k:'#1a1424',p:'#b8892f',P:'#e0b04f'};
const disegni={};
// Il disegno di una statuina come immagine (data URL), con il piedistallo; fatto una volta sola.
function figura(st){
  if(disegni[st.id])return disegni[st.id];
  const righe=[...st.righe,'.PPPPPP.','pppppppp'],c=document.createElement('canvas'),g=c.getContext('2d');
  c.width=8;c.height=righe.length;const pal={...BASE,...st.colori};
  righe.forEach((r,y)=>[...r].forEach((ch,x)=>{if(pal[ch]){g.fillStyle=pal[ch];g.fillRect(x,y,1,1)}}));
  return disegni[st.id]=c.toDataURL();
}

/* ---------- Prendere le cose ---------- */
function prendiStatuina(st,o){
  Z().statuine[st.id]=true;salva();
  say(o.name,[`Tra le cose c'è una statuina: ${st.nome}!`,st.frase,'La metti nello zaino.'],()=>toast('Statuine: '+trovate()+' su '+STATUINE.length));
}
// Aggancia l'azione degli oggetti: la prima volta la statuina, poi l'azione di sempre.
STATUINE.forEach(st=>{
  const o=(OGGETTI[st.stanza]||[]).find(o=>o.id===st.oggetto);if(!o||!o.act)return;
  const prima=o.act;o.act=function(...a){return Z().statuine[st.id]?prima.apply(this,a):prendiStatuina(st,o)};
});
// L'espositore dell'ingresso dà la piantina del museo da portare nello zaino.
{
  const o=(OGGETTI.ingresso||[]).find(o=>o.id==='depliantIn');
  if(o&&o.act){const prima=o.act;o.act=function(...a){if(Z().pianta)return prima.apply(this,a);Z().pianta=true;salva();
    say(o.name,['Dépliant su sentieri, ville e musei della valle. Uno ha la piantina del museo disegnata a mano.',
      'La prendi e la metti nello zaino: ora puoi guardarla da qualsiasi stanza.'],()=>toast('Nello zaino: la pianta del museo'))}}
}

/* ---------- Lo zaino ---------- */
function apriZaino(){
  const z=Z(),n=trovate();
  openModal(`<div class="eyebrow">Zaino</div><h2>Il tuo zaino</h2>
    ${z.pianta?'<div class="row"><button type="button" id="zaPianta">Apri la pianta del museo</button></div>'
      :n?'':'<p>Lo zaino è ancora vuoto. Nel museo ci sono cose da portare via: una piantina da tenere sempre con te e 13 statuine nascoste. Esamina gli oggetti delle stanze!</p>'}
    <p class="eyebrow">Statuine · ${n} su ${STATUINE.length}</p>
    <div class="za-vetrina">${STATUINE.map(st=>z.statuine[st.id]
      ?`<button type="button" class="za-s" data-id="${st.id}"><img src="${figura(st)}" alt=""><span>${st.nome}</span></button>`
      :'<div class="za-s za-manca"><b>?</b></div>').join('')}</div>
    <p id="zaFrase">${n?'Tocca una statuina per guardarla da vicino.':'Ancora nessuna statuina. Chissà dove sono finite…'}</p>
    <div class="row end">${closeBtn}</div>`);
  if($('zaPianta'))$('zaPianta').onclick=()=>apriPianta();
  $('card').querySelectorAll('.za-s[data-id]').forEach(b=>b.onclick=()=>{const st=STATUINE.find(s=>s.id===b.dataset.id);$('zaFrase').textContent=st.nome+'. '+st.frase});
}
window.apriZaino=apriZaino;

/* ---------- Fine partita e trucchi ---------- */
window.statuineTrovate=()=>({n:trovate(),tot:STATUINE.length});
window.riepilogoStatuine=()=>{const n=trovate(),m=STATUINE.length-n;
  return `<p class="eyebrow">Statuine trovate · ${n} su ${STATUINE.length}</p><p>${m===0?'Le hai trovate tutte!':m===1?'Ne manca una.':`Ne mancano ${m}.`}</p>`};
window.prendiTutteStatuine=()=>{Z().pianta=true;STATUINE.forEach(s=>Z().statuine[s.id]=true);salva()};

// Il pulsante nella barra, dopo «Sigilli»: c'è da subito, così si capisce che c'è qualcosa da cercare.
const b=document.createElement('button');b.id='btnZaino';b.type='button';b.textContent='Zaino';
b.onclick=()=>{if(S.started&&$('modal').hidden)apriZaino()};  // anche durante un dialogo, che resta sotto
($('btnTessere')||$('btnJournal')).after(b);

const st=document.createElement('style');st.textContent=`
.za-vetrina{display:grid;grid-template-columns:repeat(auto-fill,minmax(78px,1fr));gap:8px;margin:8px 0}
.za-s{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;gap:4px;min-height:112px;padding:6px 4px;border:2px solid var(--line);background:#120e1c;text-transform:none;letter-spacing:0;font-size:13px;line-height:1.15;text-align:center}
.za-s img{width:40px;height:70px;image-rendering:pixelated}
.za-manca{justify-content:center;color:var(--muted);border-style:dashed}
.za-manca b{font-size:28px}
#zaFrase{min-height:2.6em}`;
document.head.appendChild(st);
}
