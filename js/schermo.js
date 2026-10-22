/* Schermo intero: pulsante ⛶ nella HUD (dopo ♪) e tasto F. Sul telefono prova anche a girare in orizzontale.
   Dove il browser non permette lo schermo intero di una pagina (per esempio Safari su iPhone) il pulsante non compare:
   lì si usa «Aggiungi alla schermata Home», che con manifest.webmanifest apre il gioco senza barre.
   Il motore ridisegna già la tela con l'evento resize, quindi qui non si tocca il disegno. Area: sale. Vedi CLAUDE.md. */
{
const doc=document,el=doc.documentElement;
const inPieno=()=>!!(doc.fullscreenElement||doc.webkitFullscreenElement);
const supportato=!!(el.requestFullscreen||el.webkitRequestFullscreen);

// Entra o esce dallo schermo intero. Restituisce una promessa che non fallisce mai: se il browser rifiuta, resta tutto com'è.
function schermoIntero(){
  try{
    if(inPieno())return Promise.resolve((doc.exitFullscreen||doc.webkitExitFullscreen).call(doc)).catch(()=>{});
    const p=(el.requestFullscreen||el.webkitRequestFullscreen).call(el,{navigationUI:'hide'});
    return Promise.resolve(p).then(()=>{try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock('landscape').catch(()=>{})}catch(e){}}).catch(()=>{});
  }catch(e){return Promise.resolve()}
}

const b=doc.createElement('button');b.id='btnSchermo';b.type='button';
const mostra=()=>{const p=inPieno();b.textContent=p?'⤢':'⛶';b.title=p?'Esci dallo schermo intero (F)':'Schermo intero (F)';b.setAttribute('aria-pressed',p)};
b.onclick=()=>schermoIntero();
if(supportato){mostra();($('btnMusica')||$('btnHint')).after(b)}
['fullscreenchange','webkitfullscreenchange'].forEach(ev=>doc.addEventListener(ev,()=>{mostra();if(typeof fit==='function')fit()}));
// tasto F: solo quando non stai scrivendo in un campo (per esempio la domanda al custode)
addEventListener('keydown',e=>{
  if(!supportato||(e.key!=='f'&&e.key!=='F')||e.ctrlKey||e.metaKey||e.altKey)return;
  const a=doc.activeElement;if(a&&(a.tagName==='INPUT'||a.tagName==='TEXTAREA'||a.isContentEditable))return;
  schermoIntero();
});
}
