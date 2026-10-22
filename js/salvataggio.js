/* Salvataggio automatico: ogni volta che il diario si allunga (cartellino, sigillo o tessera nuovi)
   o cambi stanza, la partita viene salvata nel browser. Dalla schermata iniziale si riprende con «Continua la partita».
   Non cambia funzioni di altri file: osserva S e usa entraStanza, hud, toast. Area: sale. Vedi CLAUDE.md. */
{
const CHIAVE='fuoriOrario.partita',VERSIONE=1;
const leggi=()=>{try{const d=JSON.parse(localStorage.getItem(CHIAVE));return d&&d.v===VERSIONE&&d.S?d:null}catch(e){return null}};
const scrivi=d=>{try{localStorage.setItem(CHIAVE,JSON.stringify(d));return true}catch(e){return false}};
const cancella=()=>{try{localStorage.removeItem(CHIAVE)}catch(e){}};

// Salva subito la partita in corso. Restituisce true se ci è riuscito.
function salvaPartita(){
  if(!S.started||S.done)return false;
  const s={...S,fade:0};
  return scrivi({v:VERSIONE,quando:Date.now(),S:s,P:{x:P.x,y:P.y,fx:P.fx,fy:P.fy}});
}
// Riprende la partita salvata. Restituisce true se c'era un salvataggio.
function caricaPartita(){
  const d=leggi();if(!d)return false;
  S=d.S;Object.assign(P,d.P,{path:[],pending:null,moving:false});P.px=P.tx=P.x;P.py=P.ty=P.y;
  // come start() in avvio.js: completa uno stato salvato da una versione precedente
  // una stanza che non esiste più (per esempio l'atrio, con la pianta del museo) fa ripartire dalla stanza iniziale
  if(!STANZE[S.room])S.room=typeof PIANTA!=='undefined'&&STANZE[PIANTA.inizio]?PIANTA.inizio:'museo';S.fade=0;S.started=true;S.done=false;
  S.seals=S.seals||{};S.hint=S.hint||{};S.journal=S.journal||[];
  Object.keys(SEALS).forEach(k=>{if(!(k in S.seals))S.seals[k]=false;if(!(k in S.hint))S.hint[k]=0});
  if(typeof ultimoCambio!=='undefined')ultimoCambio=-1e9;
  entraStanza(S.room);hud();$('title').hidden=true;
  ultimo={n:S.journal.length,room:S.room};
  return true;
}
function haSalvataggio(){return !!leggi()}
// Cancella la partita salvata (per il menu impostazioni): la schermata iniziale torna a «Entra nel museo», senza «Continua».
// Il gioco in corso non si ferma (e risalva alla prossima voce del diario): per ripartire da capo, dopo chiamate location.reload().
let aggiornaTitolo=()=>{};
function cancellaSalvataggio(){cancella();aggiornaTitolo()}

/* ---------- Quando salvare ---------- */
// Ogni mezzo secondo: se il diario ha voci nuove o sei in un'altra stanza, salva.
let ultimo={n:-1,room:null};
setInterval(()=>{
  if(!S||!S.started)return;
  if(S.done){if(haSalvataggio())cancella();return}
  const n=S.journal.length;
  if(n===ultimo.n&&S.room===ultimo.room)return;
  const nuovaVoce=n>ultimo.n&&ultimo.n>=0;
  ultimo={n,room:S.room};
  if(salvaPartita()&&nuovaVoce&&typeof toast==='function'){
    // se il gioco sta già mostrando un messaggio («Annotato nel diario»), lo completo invece di coprirlo
    const t=$('toast');toast(t&&!t.hidden&&t.textContent&&!/salvata/.test(t.textContent)?t.textContent+' · partita salvata':'Partita salvata');
  }
},500);

/* ---------- Schermata iniziale ---------- */
{
  const avvia=$('btnStart');
  // il pulsante: quello del title se grafica-motore lo prevede (#btnContinua), altrimenti lo creo accanto a «Entra nel museo»
  let b=$('btnContinua');
  if(!b){b=document.createElement('button');b.id='btnContinua';b.type='button';b.className='primary';b.textContent='Continua la partita';avvia.before(b)}
  const aggiorna=()=>{const d=leggi();b.hidden=!d;
    if(d){const tess=d.S.tessere?Object.values(d.S.tessere).filter(Boolean).length:0,sig=Object.values(d.S.seals||{}).filter(Boolean).length;
      b.title=`Salvata il ${new Date(d.quando).toLocaleString('it-IT')} · sigilli ${sig} · tessere ${tess}`;
      avvia.textContent='Nuova partita'}else avvia.textContent='Entra nel museo'};
  b.addEventListener('click',()=>{if(caricaPartita()){fit();toast('La partita riprende da dove l\'avevi lasciata')}});
  // «Entra nel museo» / «Nuova partita» parte da zero: il vecchio salvataggio si cancella
  avvia.addEventListener('click',()=>{cancella();ultimo={n:0,room:'museo'}},true);
  aggiorna();aggiornaTitolo=aggiorna;
}
}
