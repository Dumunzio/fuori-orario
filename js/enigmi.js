/* Rompicapi, sigilli, custode, porta, fine partita e diario.
   Area: enigmi-storia. Vedi CLAUDE.md prima di modificare. */
// Quanti sigilli servono, e come si scrive un numero piccolo in lettere.
const NSEALS=()=>Object.keys(SEALS).length;
const lettere=n=>['zero','uno','due','tre','quattro','cinque','sei'][n]??String(n);
// Dove si trova ogni rompicapo, per gli aiuti del custode.
const DOVE={loom:'Il telaio, nella sala del Lanificio.',chest:'La cassetta del Genio, nella sala della Grande Guerra.',archive:'L\'armadio dell\'archivio.',facade:'Il plastico di Villa Godi, nella Sala delle Ville: ci si arriva dal varco tra il Lanificio e l\'Archivio.'};
function note(id,title,where,text,seal){if(S.journal.some(j=>j.id===id))return false;S.journal.push({id,title,where,text,seal:!!seal});return true}
function readPlaque(k){const p=PLAQUES[k];say('Cartellino · '+p.title,p.lines,()=>{if(note(k,p.title,p.where,p.lines.join(' ')))toast('Annotato nel diario')})}

function solved(id,msg){
  $('msg').textContent=msg;$('msg').className='msg good';
  const row=$('card').querySelector('.row.end');row.innerHTML='<button class="primary" type="button" id="take">Prendi il sigillo</button>';
  $('take').focus();$('take').onclick=()=>{closeModal();grant(id)};
}
function grant(id){
  S.seals[id]=true;const s=SEALS[id];note('seal-'+id,s.title,'Sigillo',s.text,true);hud();
  const n=sealCount();
  say(s.title,[s.text,n<NSEALS()?`Sigilli: ${n} su ${NSEALS()}.`:'Hai tutti i sigilli. La porta d\'uscita è nella sala dopo il museo, oltre il varco con il cartello verde.']);
}

function openLoom(){
  if(S.seals.loom)return say('Telaio Jacquard',['Il telaio è aperto. Sul cartone perforato restano i fori del disegno.']);
  const letters='URJADQAC'.split('');let pick=[];
  openModal(`<div class="eyebrow">Rompicapo · Sala del Lanificio</div><h2>Il telaio a schede</h2>
    <p class="clue">Questo telaio legge schede di cartone perforate, un'invenzione di Joseph-Marie Jacquard, di Lione, presentata nel 1801. Alessandro Rossi dedicò all'inventore il giardino accanto alla sua fabbrica di Schio, disegnato da Antonio Caregaro Negrin.</p>
    <p>Ricomponi il cognome dell'inventore con le lettere incise sulle schede.</p>
    <div class="slots" id="slots">${'<div class="slot"></div>'.repeat(8)}</div>
    <div class="row keys" id="keys">${letters.map((l,i)=>`<button type="button" data-i="${i}">${l}</button>`).join('')}</div>
    <div class="msg" id="msg">&nbsp;</div>
    <div class="row end"><button type="button" id="bk">Cancella</button>${closeBtn}</div>`);
  const draw=()=>{[...$('slots').children].forEach((s,i)=>s.textContent=pick[i]!=null?letters[pick[i]]:'');
    [...$('keys').children].forEach(b=>b.disabled=pick.includes(+b.dataset.i))};
  const check=()=>{if(pick.length<8)return;const w=pick.map(i=>letters[i]).join('');
    if(w==='JACQUARD'){solved('loom','Il telaio scatta. Dietro le schede perforate c\'è un sigillo di ottone.');$('keys').remove()}
    else{bad($('slots'),'Le schede si inceppano. Rileggi il cartellino: di chi porta il nome il giardino?');pick=[];draw()}};
  $('keys').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;pick.push(+b.dataset.i);draw();check()});
  $('bk').onclick=()=>{pick.pop();draw()};
  modalKey=e=>{const L=e.key.toUpperCase();if(e.key==='Backspace'){pick.pop();draw()}
    else{const i=letters.findIndex((l,j)=>l===L&&!pick.includes(j));if(i>=0){pick.push(i);draw();check()}}};
}

function openChest(){
  if(S.seals.chest)return say('Cassetta del Genio',['La cassetta è aperta e vuota.']);
  let code='';
  openModal(`<div class="eyebrow">Rompicapo · Sala della Grande Guerra</div><h2>Cassetta del Genio</h2>
    <p class="clue">Un biglietto dentro il coperchio: «Prime due cifre: le gallerie della strada del Pasubio. Ultime due: gli anni passati tra la costruzione della Fabbrica Alta e l'inizio dei lavori sul Pasubio.»</p>
    <div class="display" id="disp">____</div>
    <div class="keypad" id="kp">${[1,2,3,4,5,6,7,8,9].map(n=>`<button type="button" data-n="${n}">${n}</button>`).join('')}<button type="button" data-n="del" aria-label="Cancella">⌫</button><button type="button" data-n="0">0</button><button type="button" data-n="ok" class="primary">OK</button></div>
    <div class="msg" id="msg">&nbsp;</div>
    <div class="row end">${closeBtn}</div>`);
  const draw=()=>$('disp').textContent=(code+'____').slice(0,4);
  const press=n=>{if(n==='del')code=code.slice(0,-1);else if(n==='ok'){
      if(code==='5255'){solved('chest','Clic. Il lucchetto si apre: sotto una mappa del Pasubio c\'è il secondo sigillo.');$('kp').remove();return}
      bad($('disp'),code.length<4?'Servono quattro cifre.':'Il lucchetto non cede. Ti servono due cartellini, uno per sala.');code=''}
    else if(code.length<4)code+=n;draw()};
  $('kp').addEventListener('click',e=>{const b=e.target.closest('button');if(b)press(b.dataset.n)});
  modalKey=e=>{if(/^\d$/.test(e.key))press(e.key);else if(e.key==='Backspace')press('del');else if(e.key==='Enter'){e.preventDefault();press('ok')}};
}

function openTimeline(){
  if(S.seals.archive)return say('Armadio dell\'archivio',['Le quattro schede sono in ordine. Il cassetto resta aperto.']);
  const cards=[
    {t:'A Schio si costruisce la Fabbrica Alta',y:1862},
    {t:'Jacquard presenta il telaio a schede perforate',y:1801},
    {t:'I minatori scavano la Strada delle 52 Gallerie',y:1917},
    {t:'Francesco Rossi avvia l\'attività laniera a Schio',y:1817}];
  let order=[];
  openModal(`<div class="eyebrow">Rompicapo · Archivio</div><h2>Le schede in disordine</h2>
    <p class="clue">Il cassetto si apre solo se le schede tornano in ordine, dalla più antica alla più recente. Gli anni non sono scritti qui: li trovi sui cartellini delle sale.</p>
    <div class="placed" id="placed">${'<div></div>'.repeat(4)}</div>
    <div class="tl" id="tl">${cards.map((c,i)=>`<button type="button" data-i="${i}">${c.t}</button>`).join('')}</div>
    <div class="msg" id="msg">&nbsp;</div>
    <div class="row end"><button type="button" id="rs">Ricomincia</button>${closeBtn}</div>`);
  const draw=(reveal)=>{[...$('placed').children].forEach((d,k)=>{const c=cards[order[k]];
      d.className=c?'f':'';d.innerHTML=c?`<span class="n">${k+1}</span><span>${c.t}</span>${reveal?`<span class="yr">${c.y}</span>`:''}`:`<span class="n">${k+1}</span>`});
    [...$('tl').children].forEach(b=>b.disabled=order.includes(+b.dataset.i))};
  draw();
  $('tl').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;order.push(+b.dataset.i);draw();
    if(order.length===4){const ok=order.every((i,k)=>k===0||cards[order[k-1]].y<cards[i].y);
      if(ok){draw(true);$('tl').remove();solved('archive','Il cassetto scorre. Tra le schede c\'è il terzo sigillo.')}
      else{bad($('placed'),'L\'ordine non torna. Controlla gli anni nei cartellini e riprova.');order=[];setTimeout(()=>draw(),350)}}});
  $('rs').onclick=()=>{order=[];draw()};
}

// Facciata di Villa Godi: l'ala destra va specchiata dalla sinistra, e la loggia del piano nobile ha tre arcate (cartellino godi).
const FAC_VALORI=['muro','finestra','porta','arco'];
// disegnini 8×10 delle caselle (i simboli Unicode non ci sono nei font pixel)
const facSvg=d=>`<svg viewBox="0 0 8 10" width="18" height="22" shape-rendering="crispEdges" aria-hidden="true">${d}</svg>`;
const FAC_SIMBOLI={muro:'',
  finestra:facSvg('<rect x="1" y="1" width="6" height="8" fill="#2a3550"/><rect x="3.5" y="1" width="1" height="8" fill="#e8dfc6"/><rect x="1" y="4.5" width="6" height="1" fill="#e8dfc6"/>'),
  porta:facSvg('<path d="M2 10V4a2 2 0 0 1 4 0v6z" fill="#5a3e2a"/>'),
  arco:facSvg('<path d="M0.5 10V4.5a3.5 3.5 0 0 1 7 0V10z" fill="#241c2c"/>'),
  scala:facSvg('<rect x="0" y="8" width="8" height="2" fill="#8a7a5c"/><rect x="1" y="6" width="6" height="2" fill="#9a8a6c"/><rect x="2" y="4" width="4" height="2" fill="#aa9a7c"/>')};
function openFacade(){
  if(S.seals.facade)return say('Plastico di Villa Godi',['La facciata è completa. Il telo è piegato accanto al plastico.']);
  const val={l0:0,l1:0,l2:0,d0:0,d1:0,d2:0,d3:0},scoperte=new Set();
  const fissa=(v,cls='')=>`<div class="${cls}" role="img" aria-label="${v}">${FAC_SIMBOLI[v]}</div>`;
  const cella=(c,cls='')=>`<button type="button" data-c="${c}" class="${cls}"></button>`;
  // 7 colonne × 2 piani in ordine di lettura: ala sinistra | loggia e scalinata | ala destra
  const griglia=[fissa('finestra'),fissa('finestra'),cella('l0','ala telo'),cella('l1','telo'),cella('l2','telo'),cella('d0','ala'),cella('d1'),
    fissa('finestra'),fissa('porta'),fissa('muro','ala'),fissa('scala'),fissa('muro'),cella('d2','ala'),cella('d3')].join('');
  openModal(`<div class="eyebrow">Rompicapo · Sala delle Ville</div><h2>La facciata di Villa Godi</h2>
    <p class="clue">Il plastico è rimasto a metà. Completalo come lo avrebbe voluto Palladio.</p>
    <p>Tocca le caselle per cambiarle: muro, finestra, porta, arco. In alto il piano nobile, in basso il piano terra.</p>
    <div class="facade" id="fac">${griglia}</div>
    <div class="msg" id="msg">&nbsp;</div>
    <div class="row end"><button class="primary" type="button" id="facOk">Controlla</button>${closeBtn}</div>`);
  const v=c=>FAC_VALORI[val[c]];
  const draw=()=>$('fac').querySelectorAll('button').forEach(b=>{const c=b.dataset.c,coperta=b.classList.contains('telo')&&!scoperte.has(c);
    b.classList.toggle('telo',coperta);b.innerHTML=coperta?'':FAC_SIMBOLI[v(c)];
    b.setAttribute('aria-label',coperta?'coperta da un telo':v(c))});
  draw();
  $('fac').addEventListener('click',e=>{const b=e.target.closest('button');if(!b||b.disabled)return;const c=b.dataset.c;
    scoperte.add(c);val[c]=(val[c]+1)%FAC_VALORI.length;draw()});
  $('facOk').onclick=()=>{
    if(['d0','d1','d2','d3'].map(v).join()!=='finestra,finestra,porta,finestra')return bad($('fac'),'L\'ala destra non rispecchia la sinistra.');
    if(!['l0','l1','l2'].every(c=>v(c)==='arco'))return bad($('fac'),'La loggia non è quella descritta nel cartellino.');
    $('fac').querySelectorAll('button').forEach(b=>b.disabled=true);
    solved('facade','Il telo scivola via: dietro la scalinata c\'è il sigillo della Villa.');
  };
}

// Se ci sono le sale a tema (js/sale/registro.js), per uscire servono anche tutte le tessere:
// bloccoUscita() restituisce le righe da dire se ne manca qualcuna, altrimenti null.
const tessereMancanti=()=>typeof bloccoUscita==='function'&&bloccoUscita();
const regolaTessere=()=>typeof bloccoUscita==='function'?' Servono anche le tessere delle sale del territorio: i varchi colorati di questo ingresso portano ai loro rami.':'';
function talkKeeper(){
  const n=sealCount();
  if(n===NSEALS()){const b=tessereMancanti();if(b)return say('Custode',['Tutti i sigilli, ottimo! Ma la porta vuole anche le tessere.',...b]);
    return say('Custode',['Tutti i sigilli! La porta d\'uscita è nella sala dopo il museo. Buona serata.'])}
  say('Custode',[n===0?'Non hai ancora trovato nessun sigillo. Comincia dai cartellini: le risposte sono lì.':(n===1?`Hai 1 sigillo su ${NSEALS()}.`:`Hai ${n} sigilli su ${NSEALS()}.`)+' Vuoi chiedermi qualcosa? Per un indizio c\'è il pulsante Aiuto.'],()=>typeof apriDomandeCustode==='function'?apriDomandeCustode():hint());
}
function hint(){
  if(!S.started||S.done)return;
  if(typeof aiutoSala==='function'&&aiutoSala())return; // dentro una sala a tema: il suo aiuto (js/sale/registro.js)
  const id=Object.keys(SEALS).find(k=>!S.seals[k]);
  if(!id){const b=tessereMancanti();return say('Custode',b||['Hai tutto. Vai alla porta d\'uscita.'])}
  const lv=S.hint[id];S.hint[id]=Math.min(lv+1,HINTS[id].length-1);
  say('Custode',[DOVE[id],HINTS[id][lv]]);
}
function tryDoor(){
  const b=tessereMancanti();if(b)return say('Porta d\'uscita',b);
  const n=sealCount();
  if(n<NSEALS())return say('Porta d\'uscita',[`È chiusa. Sulla serratura ci sono ${lettere(NSEALS())} incavi a forma di sigillo: ne hai ${n}.`]);
  if(S.door===0){S.door=.01;say('Porta d\'uscita',[`Metti i ${lettere(NSEALS())} sigilli negli incavi. La serratura gira da sola.`],()=>setTimeout(win,600))}
}

/* ---------- Fine ---------- */
function fmt(s){s=Math.floor(s);return String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
function win(){
  S.done=true;const tm=fmt(S.elapsed);
  openModal(`<div class="eyebrow">Uscita · ${tm}</div><h2>Sei fuori dal museo</h2>
    <p>In ${tm} hai attraversato un secolo di storia dell'Alto Vicentino. Ecco cosa ti porti a casa:</p>
    <div class="journal">${Object.keys(SEALS).map(k=>`<article class="seal"><span class="tag">Sigillo</span><h3>${SEALS[k].title}</h3><p>${SEALS[k].text}</p></article>`).join('')}</div>
    ${typeof riepilogoTessere==='function'?riepilogoTessere():''}
    <p class="eyebrow">Fonti per la versione completa</p>
    <ul class="src"><li>Wikidata: luoghi, persone e beni culturali collegati tra loro</li><li>Europeana: foto e oggetti per le teche</li><li>Catalogo generale dei beni culturali (MiC)</li><li>Rete Museale Alto Vicentino ed Ecomuseo della Grande Guerra</li></ul>
    <div class="msg" id="msg">&nbsp;</div>
    <div class="row end"><button type="button" id="share">Copia risultato</button><button class="primary" type="button" id="again">Gioca ancora</button></div>`);
  const txt=`Ho risolto FUORI ORARIO in ${tm}: ${lettere(NSEALS())} sigilli nascosti nella storia dell'Alto Vicentino. Ci provi?`;
  $('share').onclick=()=>{navigator.clipboard?.writeText(txt).then(()=>{$('msg').textContent='Copiato negli appunti.';$('msg').className='msg good'}).catch(fallback)||fallback()};
  function fallback(){$('msg').textContent=txt;$('msg').className='msg';const r=document.createRange();r.selectNodeContents($('msg'));getSelection().removeAllRanges();getSelection().addRange(r)}
  // si vince nell'uscita: per ricominciare si torna davvero all'ingresso, con la sua stanza e i suoi oggetti
  $('again').onclick=()=>{closeModal();fresh();entraStanza(PIANTA.inizio);hud();S.started=true;intro()};
}

/* ---------- Diario ---------- */
$('btnJournal').onclick=()=>{
  if(!S.started)return;
  openModal(`<div class="eyebrow">Diario · ${S.journal.length} ${S.journal.length===1?'voce':'voci'}</div><h2>Quello che hai scoperto</h2>
    ${S.journal.length?`<div class="journal">${S.journal.map(j=>`<article class="${j.seal?'seal':''}"><span class="tag">${j.where}</span><h3>${j.title}</h3><p>${j.text}</p>${typeof fonteHtml==='function'?fonteHtml(j.id.replace('seal-','')):''}</article>`).join('')}</div>`
    :'<p>Ancora niente. Leggi i cartellini nelle sale: quello che scopri finisce qui.</p>'}
    <div class="row end">${closeBtn}</div>`);
};
$('btnHint').onclick=()=>{if(blocked())return;hint()};

/* ---------- Avvio ---------- */
function intro(){say('Custode',[
  'Ehi! Il museo ha chiuso alle sei. Come sei rimasto qui dentro?',
  `La porta d'uscita si apre solo con i sigilli nascosti nelle sale. Ne servono ${lettere(NSEALS())}.${regolaTessere()}`,
  'Le combinazioni le trova chi legge la storia di queste sale. I cartellini sono lì apposta.',
  'Il museo è a destra, la porta d\'uscita c\'è dopo il museo. Sul leggio qui davanti c\'è la pianta: ti dice quali sale hai già finito.',
  'Se ti blocchi, vieni da me o premi Aiuto.'])}
