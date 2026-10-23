/* La voce dei dialoghi: mentre una frase compare lettera per lettera nel riquadro dei dialoghi (#dText),
   ogni lettera fa un piccolo suono, scelto a caso tra 6. Suoni generati con il Web Audio, niente file e niente licenze.
   Non cambia say() né nextLine(): osserva il testo che si allunga.
   Ha un interruttore e un volume suoi, separati dalla musica: chiavi fuoriOrario.voce ('0' spenta) e fuoriOrario.volumeVoce (0-100),
   scelti nel menu ⚙ (js/impostazioni.js), che chiama impostaVoce(). Spegnere la musica non spegne la voce.
   Con «riduci movimento» la frase compare tutta insieme, quindi niente suoni. Vedi CLAUDE.md. */
{
const VOCE={ac:null,uscita:null,vol:.07,ultimo:'',on:true,volume:1};   // volume: da 0 a 1, moltiplica vol
try{VOCE.on=localStorage.getItem('fuoriOrario.voce')!=='0';const v=parseInt(localStorage.getItem('fuoriOrario.volumeVoce'),10);if(!isNaN(v))VOCE.volume=Math.max(0,Math.min(100,v))/100}catch(e){}
// I 6 suoni: ognuno è un'onda, una nota di partenza e una di arrivo (Hz), una durata (s); gli ultimi due hanno un colpo di rumore.
const VOCE_SUONI=[
  {onda:'square',da:620,a:560,dur:.035},         // bip da macchina da scrivere
  {onda:'triangle',da:440,a:470,dur:.045},       // voce morbida
  {onda:'sine',da:880,a:820,dur:.04},            // campanellino
  {onda:'square',da:310,a:290,dur:.04},          // voce bassa
  {onda:'triangle',da:700,a:350,dur:.03,rumore:.5}, // tasto di legno
  {onda:'sine',da:520,a:1040,dur:.03,rumore:.25}    // pizzico che sale
];
// L'audio si può accendere solo dopo un clic o un tasto: si prepara al primo gesto.
function svegliaVoce(){
  if(VOCE.ac)return;const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
  VOCE.ac=new AC();VOCE.uscita=VOCE.ac.createGain();VOCE.uscita.gain.value=VOCE.vol*VOCE.volume;VOCE.uscita.connect(VOCE.ac.destination);
}
['pointerdown','keydown'].forEach(e=>addEventListener(e,svegliaVoce,{once:true,capture:true}));
const voceAccesa=()=>VOCE.on&&VOCE.volume>0;
// dal menu ⚙: accesa o spenta e volume da 0 a 100
window.impostaVoce=(on,volume)=>{VOCE.on=on;VOCE.volume=volume/100;if(VOCE.uscita)VOCE.uscita.gain.value=VOCE.vol*VOCE.volume};

function suonaLettera(){
  if(!VOCE.ac||!voceAccesa())return;
  const ac=VOCE.ac,t=ac.currentTime,s=VOCE_SUONI[Math.floor(Math.random()*VOCE_SUONI.length)];
  const o=ac.createOscillator(),g=ac.createGain();
  o.type=s.onda;o.frequency.setValueAtTime(s.da,t);o.frequency.exponentialRampToValueAtTime(s.a,t+s.dur);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(1,t+.004);g.gain.exponentialRampToValueAtTime(.001,t+s.dur);
  o.connect(g);g.connect(VOCE.uscita);o.start(t);o.stop(t+s.dur+.01);
  if(s.rumore){const n=Math.floor(ac.sampleRate*.012),b=ac.createBuffer(1,n,ac.sampleRate),d=b.getChannelData(0);
    for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);
    const r=ac.createBufferSource(),rg=ac.createGain();r.buffer=b;rg.gain.value=s.rumore;r.connect(rg);rg.connect(VOCE.uscita);r.start(t)}
}
// Suona solo quando il testo cresce di poco e la parte nuova contiene una lettera:
// una frase nuova, o una traduzione che sostituisce tutto il testo, non suona.
function osservaDialogo(){
  const el=$('dText');if(!el)return;
  new MutationObserver(()=>{
    const ora=el.textContent,prima=VOCE.ultimo;VOCE.ultimo=ora;
    if(ora.length>prima.length&&ora.length-prima.length<=3&&ora.startsWith(prima)&&/\p{L}/u.test(ora.slice(prima.length)))suonaLettera();
  }).observe(el,{childList:true,characterData:true,subtree:true});
}
osservaDialogo();
}
