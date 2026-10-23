/* Trucchi per provare il gioco: nelle impostazioni (js/impostazioni.js) c'è la voce «Trucchi».
   Una volta attivati, si può prendere ogni sigillo senza risolvere il suo rompicapo: uno alla volta o tutti insieme.
   Il sigillo della villa va in S.seals (come grant() di enigmi.js), quelli delle sale in S.tessere (come concediTessera()),
   ma senza dialoghi né finestre, così la finestra delle impostazioni resta aperta.
   L'attivazione si ricorda in localStorage (fuoriOrario.trucchi). Nomi globali: voceTrucchi, agganciaTrucchi. Area: sale. */
{
const leggiAttivi=()=>{try{return localStorage.getItem('fuoriOrario.trucchi')==='1'}catch(e){return false}};
const scriviAttivi=on=>{try{localStorage.setItem('fuoriOrario.trucchi',on?'1':'0')}catch(e){}};
// Tutti i sigilli del gioco, nell'ordine della collezione: prima quelli del museo (la villa), poi uno per sala.
const elenco=()=>[...Object.keys(SEALS).map(k=>({id:k,nome:DOVE_SIGILLO[k]||SEALS[k].title,preso:()=>!!S.seals[k],
    prendi:()=>{S.seals[k]=true;note('seal-'+k,SEALS[k].title,'Sigillo',SEALS[k].text,true)}})),
  ...SALE.map(s=>({id:s.id,nome:s.nome,preso:()=>!!tessereS()[s.id],
    prendi:()=>{tessereS()[s.id]=true;note('tessera-'+s.id,s.tessera.titolo,'Sigillo · '+s.nome,s.tessera.testo,true)}}))];
const prendi=sigilli=>{sigilli.forEach(x=>{if(!x.preso())x.prendi()});hud();hudTessere()};

// I pulsanti dei sigilli: quelli già presi sono spenti, con la spunta.
const pulsanti=()=>!S.started?'<p class="im-nota">Comincia una partita per prendere i sigilli.</p>'
  :`<div class="row" id="trSigilli">${elenco().map(x=>`<button type="button" data-id="${x.id}"${x.preso()?' disabled':''}>${x.preso()?'✓ ':''}${x.nome}</button>`).join('')}</div>
    <div class="row"><button type="button" class="primary" id="trTutti"${sigilliPresi()>=sigilliTotali()?' disabled':''}>Prendi tutti i sigilli</button>
      <span class="im-nota" id="trConto">Sigilli ${sigilliPresi()} su ${sigilliTotali()}</span></div>
    ${typeof prendiTutteStatuine==='function'?'<div class="row"><button type="button" id="trStatuine">Prendi la pianta e tutte le statuine</button></div>':''}`;

function voceTrucchi(){
  const on=leggiAttivi();
  return `<div class="im-voce"><span class="im-titolo">Trucchi</span>
    <p class="im-nota">Per provare il gioco: prendi i sigilli senza risolvere i rompicapi.</p>
    <div class="row"><button type="button" id="trTrucchi" aria-pressed="${on}">${on?'Trucchi: attivi':'Trucchi: spenti'}</button></div>
    <div id="trPannello"${on?'':' hidden'}>${on?pulsanti():''}</div></div>`;
}
function agganciaTrucchi(){
  const pannello=$('trPannello');if(!pannello)return;
  const aggiorna=()=>{pannello.innerHTML=pulsanti();
    if($('trSigilli'))$('trSigilli').onclick=e=>{const b=e.target.closest('[data-id]');if(!b||b.disabled)return;
      const x=elenco().find(x=>x.id===b.dataset.id);prendi([x]);toast('Sigillo preso: '+x.nome);aggiorna()};
    if($('trTutti'))$('trTutti').onclick=()=>{prendi(elenco());toast('Hai tutti i sigilli. La porta d\'uscita è nell\'ingresso.');aggiorna()};
    // lo zaino (js/sale/zaino.js): la pianta e le 13 statuine
    if($('trStatuine'))$('trStatuine').onclick=()=>{prendiTutteStatuine();toast('Nello zaino: la pianta e tutte le statuine')}};
  $('trTrucchi').onclick=()=>{const on=!leggiAttivi();scriviAttivi(on);const b=$('trTrucchi');
    b.setAttribute('aria-pressed',String(on));b.textContent=on?'Trucchi: attivi':'Trucchi: spenti';pannello.hidden=!on;if(on)aggiorna()};
  if(leggiAttivi())aggiorna();
}
window.voceTrucchi=voceTrucchi;window.agganciaTrucchi=agganciaTrucchi;
}
