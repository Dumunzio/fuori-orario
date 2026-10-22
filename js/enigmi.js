/* Rompicapi, sigilli, custode, porta, fine partita e diario.
   Area: enigmi-storia. Vedi CLAUDE.md prima di modificare. */
// Quanti sigilli servono, e come si scrive un numero piccolo in lettere.
const NSEALS=()=>Object.keys(SEALS).length;
const lettere=n=>['zero','uno','due','tre','quattro','cinque','sei'][n]??String(n);
// Dove si trova ogni rompicapo, per gli aiuti del custode.
const DOVE={loom:'Il telaio, nella sala del Lanificio.',chest:'La cassetta del Genio, nella sala della Grande Guerra.',archive:'L\'armadio dell\'archivio.'};
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
  say(s.title,[s.text,n<NSEALS()?`Sigilli: ${n} su ${NSEALS()}.`:'Hai tutti i sigilli. La porta d\'uscita è nel museo, sulla parete in fondo a destra.']);
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

function talkKeeper(){
  const n=sealCount();
  if(n===NSEALS())return say('Custode',['Tutti i sigilli! La porta d\'uscita è sulla parete in fondo, a destra. Buona serata.']);
  say('Custode',[n===0?'Non hai ancora trovato nessun sigillo. Comincia dai cartellini: le risposte sono lì.':`Hai ${n} sigill${n===1?'o':'i'} su ${NSEALS()}. Vuoi chiedermi qualcosa? Per un indizio c'è il pulsante Aiuto.`],()=>typeof apriDomandeCustode==='function'?apriDomandeCustode():hint());
}
function hint(){
  if(!S.started||S.done)return;
  const id=Object.keys(SEALS).find(k=>!S.seals[k]);
  if(!id)return say('Custode',['Hai tutto. Vai alla porta d\'uscita.']);
  const lv=S.hint[id];S.hint[id]=Math.min(lv+1,HINTS[id].length-1);
  say('Custode',[DOVE[id],HINTS[id][lv]]);
}
function tryDoor(){
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
    <p class="eyebrow">Fonti per la versione completa</p>
    <ul class="src"><li>Wikidata: luoghi, persone e beni culturali collegati tra loro</li><li>Europeana: foto e oggetti per le teche</li><li>Catalogo generale dei beni culturali (MiC)</li><li>Rete Museale Alto Vicentino ed Ecomuseo della Grande Guerra</li></ul>
    <div class="msg" id="msg">&nbsp;</div>
    <div class="row end"><button type="button" id="share">Copia risultato</button><button class="primary" type="button" id="again">Gioca ancora</button></div>`);
  const txt=`Ho risolto FUORI ORARIO in ${tm}: ${lettere(NSEALS())} sigilli nascosti nella storia dell'Alto Vicentino. Ci provi?`;
  $('share').onclick=()=>{navigator.clipboard?.writeText(txt).then(()=>{$('msg').textContent='Copiato negli appunti.';$('msg').className='msg good'}).catch(fallback)||fallback()};
  function fallback(){$('msg').textContent=txt;$('msg').className='msg';const r=document.createRange();r.selectNodeContents($('msg'));getSelection().removeAllRanges();getSelection().addRange(r)}
  $('again').onclick=()=>{closeModal();fresh();hud();S.started=true;intro()};
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
  `La porta d'uscita si apre solo con i sigilli nascosti nelle sale. Ne servono ${lettere(NSEALS())}.`,
  'Le combinazioni le trova chi legge la storia di queste sale. I cartellini sono lì apposta.',
  'Se ti blocchi, vieni da me o premi Aiuto.'])}
