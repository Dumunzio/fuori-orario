/* Tentativi: ogni rompicapo ha 5 tentativi. Al quinto sbaglio si blocca, e per riprovare bisogna uscire dalla stanza e rientrare.
   Non cambia i rompicapi degli altri file: conta gli sbagli agganciandosi a bad() (motore.js), mostra il contatore
   agganciandosi a openModal() e azzera tutto a ogni cambio di stanza agganciandosi a entraStanza().
   Va caricato dopo lingua-en.js (aggiunge le sue traduzioni a LINGUA_EN) e prima di lingua.js.
   Tutto sta dentro una funzione: come nome globale esce solo TENTATIVI. Area: territorio. Vedi CLAUDE.md. */
(()=>{
const MAX=5;
// Avvisi che non sono risposte sbagliate (manca ancora qualcosa da inserire): non consumano un tentativo.
const NON_CONTANO=new Set(['Servono quattro cifre.','Ci sono ancora elementi da sistemare.']);
// Rompicapi senza una risposta sbagliata (i tubi di Recoaro si girano finché l'acqua passa): niente contatore.
const SENZA_ERRORI=new Set(['recoaro']);
const BLOCCO='Hai finito i tentativi. Esci dalla stanza e rientra per riprovare.';
const conto=n=>`Tentativi rimasti: ${n} su ${MAX}`;

// Sbagli fatti in questa visita della stanza, per rompicapo. Non sta in S: non va nel salvataggio,
// e ricaricare la pagina è come uscire e rientrare.
let sbagli={};

// Il rompicapo aperto adesso nella finestra, o null. Si riconosce da quello che c'è nella finestra:
// i rompicapi del museo e della villa hanno un elemento loro, quelli delle sale passano da finestraSala (pulsante #slAiuto).
function aperto(){
  const c=$('card');
  if($('modal').hidden||!c.querySelector('#msg'))return null;
  if(S.room==='museo')return c.querySelector('#slots')?'loom':c.querySelector('#disp')?'chest':c.querySelector('#placed')?'archive':null;
  if(S.room==='villa')return c.querySelector('#fac')?'facade':null;
  if(typeof SALA!=='undefined'&&SALA[S.room]&&c.querySelector('#slAiuto'))return S.room;
  return null;
}
const rimasti=id=>Math.max(0,MAX-(sbagli[id]||0));

// Il contatore sopra il messaggio del rompicapo.
function mostraConto(id){
  if(SENZA_ERRORI.has(id))return;
  let el=$('ttConto');
  if(!el){el=document.createElement('div');el.id='ttConto';el.className='tt-conto';$('msg').before(el)}
  const n=rimasti(id);el.textContent=conto(n);el.classList.toggle('tt-ultimo',n<=1);
}
// Spegne il rompicapo: resta leggibile ma non si tocca più, tranne «Chiudi».
function blocca(){
  const c=$('card'),m=$('msg');
  [...c.children].forEach(el=>{
    if(el.id==='msg'||el.id==='ttConto'||el.querySelector('#msg'))return;
    if(el.querySelector('[data-close]')){el.querySelectorAll('button:not([data-close])').forEach(b=>b.disabled=true);return}
    if(el.classList.contains('eyebrow')||el.tagName==='H2')return;
    el.inert=true;el.classList.add('tt-spento');
  });
  m.textContent=BLOCCO;m.className='msg bad';
  c.classList.add('tt-bloccato');
  // i rompicapi assegnano modalKey dopo openModal: lo tolgo anche dopo che hanno finito
  modalKey=null;setTimeout(()=>{if(c.classList.contains('tt-bloccato')&&!$('modal').hidden)modalKey=null},0);
  const chiudi=c.querySelector('[data-close]');chiudi&&chiudi.focus();
}

const badPrima=bad;
bad=function(el,msg){
  badPrima(el,msg);
  const id=aperto();
  if(!id||SENZA_ERRORI.has(id)||NON_CONTANO.has(msg)||$('card').classList.contains('tt-bloccato'))return;
  sbagli[id]=(sbagli[id]||0)+1;
  mostraConto(id);
  if(!rimasti(id))blocca();
};
const openModalPrima=openModal;
openModal=function(html){
  openModalPrima(html);
  // #card è lo stesso per tutte le finestre: il segno di blocco vale solo per quella che l'ha messo
  $('card').classList.remove('tt-bloccato');
  const id=aperto();if(!id)return;
  mostraConto(id);
  if(!SENZA_ERRORI.has(id)&&!rimasti(id))blocca();
};
const entraStanzaPrima=entraStanza;
entraStanza=function(id){sbagli={};return entraStanzaPrima(id)};

// Traduzioni in inglese (js/lingua.js le legge da LINGUA_EN quando si carica, dopo questo file).
if(typeof LINGUA_EN!=='undefined')Object.assign(LINGUA_EN,{
  'Tentativi rimasti: {} su {}':'Attempts left: {} of {}',
  [BLOCCO]:'You have used up your attempts. Leave the room and come back in to try again.'
});

const st=document.createElement('style');st.textContent=`
.tt-conto{font-family:var(--display);font-size:15px;letter-spacing:.08em;color:var(--muted)}
.tt-conto.tt-ultimo{color:var(--wool)}
.tt-spento{opacity:.4;filter:grayscale(.7)}`;
document.head.appendChild(st);

// Per le prove e per gli altri file: quanti tentativi restano a un rompicapo in questa visita della stanza.
window.TENTATIVI={max:MAX,rimasti,aperto};
})();
