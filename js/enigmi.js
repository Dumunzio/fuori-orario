/* Rompicapi, sigilli, custode, porta, fine partita e diario.
   Area: enigmi-storia. Vedi CLAUDE.md prima di modificare. */
// Quanti sigilli servono, e come si scrive un numero piccolo in lettere.
const NSEALS=()=>Object.keys(SEALS).length;
const lettere=n=>['zero','uno','due','tre','quattro','cinque','sei'][n]??String(n);
// Tutti i sigilli del gioco, presi e da prendere: quello della villa più uno per ogni sala a tema (js/sale/registro.js).
const NTOT=()=>typeof sigilliTotali==='function'?sigilliTotali():NSEALS();
const NPRESI=()=>typeof sigilliPresi==='function'?sigilliPresi():sealCount();
// Dove si trova ogni rompicapo, per gli aiuti del custode.
const DOVE={facade:'Il plastico di Villa Godi, nella Sala delle Ville: ci si arriva dall\'ingresso.'};
function note(id,title,where,text,seal){if(S.journal.some(j=>j.id===id))return false;S.journal.push({id,title,where,text,seal:!!seal});return true}
function readPlaque(k){const p=PLAQUES[k];say('Cartellino · '+p.title,p.lines,()=>{if(note(k,p.title,p.where,p.lines.join(' ')))toast('Annotato nel diario')})}

function solved(id,msg){
  $('msg').textContent=msg;$('msg').className='msg good';
  const row=$('card').querySelector('.row.end');row.innerHTML='<button class="primary" type="button" id="take">Prendi il sigillo</button>';
  $('take').focus();$('take').onclick=()=>{closeModal();grant(id)};
}
function grant(id){
  S.seals[id]=true;const s=SEALS[id];note('seal-'+id,s.title,'Sigillo',s.text,true);hud();
  const n=NPRESI();
  say(s.title,[s.text,n<NTOT()?`Sigilli: ${n} su ${NTOT()}.`:'Hai tutti i sigilli. La porta d\'uscita è nell\'ingresso, sotto il cartello verde.']);
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

// Se ci sono le sale a tema (js/sale/registro.js), la porta conta anche i loro sigilli:
// bloccoUscita() restituisce le righe da dire se ne manca qualcuno, altrimenti null.
const tessereMancanti=()=>typeof bloccoUscita==='function'&&bloccoUscita();
const regolaTessere=()=>typeof bloccoUscita==='function'?' Li trovi nella Sala delle Ville e nelle sale del territorio: i varchi colorati di questo ingresso portano ai loro rami.':'';
/* ---------- Il custode ---------- */
// Il custode non ripete sempre la stessa frase: per ogni occasione ha più varianti e le usa a turno.
const _turniCustode={};
const aTurno=(chiave,frasi)=>{const i=_turniCustode[chiave]=((_turniCustode[chiave]??-1)+1)%frasi.length;return frasi[i]};
// La prossima sala a tema senza sigillo, la più vicina all'ingresso, e la strada per arrivarci («Forti → Mine → Cimone»).
function prossimaSala(){
  if(typeof SALE==='undefined'||typeof distanzePianta!=='function')return null;
  const d=distanzePianta(),manca=SALE.filter(s=>!tessereS()[s.id]).sort((a,b)=>(d[a.id]??99)-(d[b.id]??99));
  if(!manca.length)return null;
  const strada=[];for(let id=manca[0].id;id&&id!==PIANTA.inizio;id=genitorePianta(id))strada.unshift(id);
  return {sala:manca[0],strada:strada.map(id=>nomePianta(id).replace(/^Sala (delle |dei |del |della |dello |dell')/,'')).join(' → ')};
}
// Una riga che dice dove andare per la prossima sala, o null.
const rigaProssimaSala=()=>{const p=prossimaSala();return p?`La più vicina che ti manca è la ${p.sala.nome}. Dall'ingresso: ${p.strada}.`:null};
function talkKeeper(){
  const n=NPRESI(),tot=NTOT(),manca=tot-n,villaFatta=Object.keys(SEALS).every(k=>S.seals[k]);
  if(n>=tot)return say('Custode',[aTurno('fine',[
    'Tutti i sigilli! Non ci credevo. La porta d\'uscita è qui, sotto il cartello verde: vai, prima che cambi idea.',
    'Hai tutti i sigilli. La porta ti aspetta, qui all\'ingresso. Io chiudo le luci.'])]);
  let righe;
  if(n===0)righe=[aTurno('zero',[
    'Ancora nessun sigillo? Niente paura, il primo è sempre il più lento. I varchi colorati portano alle sale: comincia dai cartellini.',
    'Niente sigilli, per ora. Un consiglio da vecchio custode: leggi tutto, anche i cartellini che sembrano noiosi.',
    'Sei ancora a zero. Prova la Sala delle Ville, qui a destra: è il rompicapo più gentile.'])];
  else if(manca<=2)righe=[aTurno('quasi',[
    manca===1?'Ti manca un solo sigillo. Uno! Non mollare adesso.':`Ne hai ${n}. Te ne mancano solo ${manca}, ci sei quasi.`,
    manca===1?'Ancora un sigillo e sei fuori. Sento già la porta che cigola.':'Ancora due sigilli e sei fuori. Dai che è tardi anche per me.'])];
  else if(villaFatta)righe=[aTurno('sale',[
    `La Sala delle Ville l'hai finita. Ora tocca alle sale del territorio: ti mancano ${manca} sigilli.`,
    `Hai ${n} sigilli su ${tot}. Gli altri sono nelle sale, dietro i varchi colorati dell'ingresso.`]),
    rigaProssimaSala()].filter(Boolean);
  else righe=[aTurno('meta',[
    n===1?'Il primo sigillo! Lo vedi? Non era impossibile.':`Hai ${n} sigilli su ${tot}. Vai bene.`,
    `${n} su ${tot}. A quest'ora di solito c'è solo il ronzio delle lampade, sai? Mi fa piacere un po' di compagnia.`,
    `Hai ${n} sigilli. Se un rompicapo ti blocca, cambia sala e torna dopo: a volte serve.`])];
  righe.push(aTurno('domanda',['Vuoi chiedermi qualcosa? Di storia ne so parecchia.','Se hai una domanda sul museo o sulle sale, chiedi pure.','Hai qualche curiosità? Chiedimi, rispondo solo con le fonti.']));
  say('Custode',righe,()=>typeof apriDomandeCustode==='function'?apriDomandeCustode():hint());
}
function hint(){
  if(!S.started||S.done)return;
  if(typeof aiutoSala==='function'&&aiutoSala())return; // dentro una sala a tema: il suo aiuto (js/sale/registro.js)
  const id=Object.keys(SEALS).find(k=>!S.seals[k]);
  if(!id){const b=tessereMancanti();return say('Custode',b?['Il sigillo della villa ce l\'hai già.',rigaProssimaSala()||b[b.length-1]]:['Hai tutto. Vai alla porta d\'uscita.'])}
  const lv=S.hint[id];S.hint[id]=Math.min(lv+1,HINTS[id].length-1);
  say('Custode',[aTurno('aiuto',['Ti do una dritta.','Un indizio, ma non dire a nessuno che te l\'ho dato io.','Vediamo un po\'…','Io farei così.']),DOVE[id],HINTS[id][lv]]);
}
function tryDoor(){
  const b=tessereMancanti();if(b)return say('Porta d\'uscita',b);
  const n=sealCount();
  if(n<NSEALS())return say('Porta d\'uscita',[`È chiusa. Sulla serratura ci sono ${lettere(NSEALS())} incavi a forma di sigillo: ne hai ${n}.`]);
  if(S.door===0){S.door=.01;say('Porta d\'uscita',[`Metti i ${lettere(NTOT())} sigilli negli incavi. La serratura gira da sola.`],
    // prima i titoli di coda (js/sale/titoli.js, area sale), poi la finestra finale
    ()=>setTimeout(()=>typeof titoliDiCoda==='function'?titoliDiCoda(win):win(),600))}
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
    <div id="slImmagine"></div>
    <div class="msg" id="msg">&nbsp;</div>
    <div class="row end">${typeof apriImmagineFinale==='function'?'<button type="button" id="immagine">Crea l\'immagine da condividere</button>':''}<button type="button" id="share">Copia risultato</button><button class="primary" type="button" id="again">Gioca ancora</button></div>`);
  // l'immagine con tempo e sigilli (js/condividi.js, area sale)
  if($('immagine'))$('immagine').onclick=()=>{$('immagine').disabled=true;apriImmagineFinale()};
  // il testo da copiare non passa dallo schermo: in inglese lo traduce tr() di lingua.js
  const it=`Ho risolto FUORI ORARIO in ${tm}: ${lettere(NTOT())} sigilli nascosti nella storia dell'Alto Vicentino. Ci provi?`,txt=typeof tr==='function'?tr(it):it;
  $('share').onclick=()=>{navigator.clipboard?.writeText(txt).then(()=>{$('msg').textContent='Copiato negli appunti.';$('msg').className='msg good'}).catch(fallback)||fallback()};
  function fallback(){$('msg').textContent=txt;$('msg').className='msg';const r=document.createRange();r.selectNodeContents($('msg'));getSelection().removeAllRanges();getSelection().addRange(r)}
  // si vince all'ingresso, davanti alla porta: per ricominciare si rientra nell'ingresso da capo, con i suoi oggetti
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
// durante un dialogo l'aiuto si apre sopra e poi il dialogo riprende (sopraDialogo, js/motore.js)
$('btnHint').onclick=()=>{if(!S.started||S.done||!$('modal').hidden)return;sopraDialogo(hint)};

/* ---------- Avvio ---------- */
function intro(){say('Custode',[
  'Ehi! E tu da dove sbuchi? Il museo ha chiuso alle sei, pensavo di essere rimasto solo io.',
  `Brutta notizia: la porta d'uscita è sigillata. Si apre solo con i sigilli nascosti nelle sale, e ne servono ${lettere(NTOT())}.${regolaTessere()}`,
  'Ogni sigillo è chiuso da un rompicapo. Le risposte? Scritte sui cartellini. Chi legge la storia di questa valle, esce.',
  'La porta è qui, sotto il cartello verde. Sul leggio davanti a te c\'è la pianta: ti dice dove sei e quali sale hai già finito.',
  'Io resto qui all\'ingresso. Se ti blocchi, vieni a trovarmi o premi Aiuto.'])}
