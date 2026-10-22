/* Il menu delle impostazioni: pulsante ⚙ nella HUD, prima di «Aiuto».
   - Musica accesa o spenta: MUSICA.on e la chiave fuoriOrario.musica (js/musica.js). Il ♪ nella HUD non c'è più.
   - Volume della musica, da 0 a 100: si ricorda in localStorage (fuoriOrario.volume) e va in MUSICA.volume, da 0 a 1.
     Lo legge volumeMusica() in js/musica.js (grafica-motore); senza quell'aggancio la musica resta com'è.
   - Traiettorie del personaggio visibili o nascoste: traiettorie() e TRAIETTORIE in js/motore.js (compito 6).
   - Cancella la partita: conferma dentro il gioco, poi cancellaSalvataggio() (js/salvataggio.js, area sale)
     e si ricarica la pagina, che riparte dalla schermata iniziale.
   Bacheca: 2026-10-23_0520_gabsat_prendo-menu-impostazioni.md. Vedi CLAUDE.md. */
{
const leggiVolume=()=>{try{const v=parseInt(localStorage.getItem('fuoriOrario.volume'),10);return isNaN(v)?100:Math.max(0,Math.min(100,v))}catch(e){return 100}};
const scriviVolume=v=>{try{localStorage.setItem('fuoriOrario.volume',String(v))}catch(e){}};
const applicaVolume=v=>{if(typeof MUSICA!=='undefined')MUSICA.volume=v/100};
applicaVolume(leggiVolume());

// C'è qualcosa da cancellare: una partita iniziata o un salvataggio.
const partitaDaCancellare=()=>S.started||(typeof haSalvataggio==='function'&&haSalvataggio());
const musicaAccesa=()=>typeof MUSICA==='undefined'||MUSICA.on;

function apriImpostazioni(){
  const v=leggiVolume();
  openModal(`<div class="eyebrow">Fuori Orario · menu</div><h2>Impostazioni</h2>
    <div class="im-voce"><span class="im-titolo">Musica</span>
      <div class="row"><button type="button" id="imMusica" aria-pressed="${musicaAccesa()}">${musicaAccesa()?'Musica: accesa':'Musica: spenta'}</button></div>
      <label for="imVolume">Volume della musica</label>
      <div class="im-riga"><input type="range" id="imVolume" min="0" max="100" step="5" value="${v}"><output id="imValore" for="imVolume">${v}%</output></div>
      <p class="im-nota" id="imNota"${v===0?'':' hidden'}>A volume 0 la musica è spenta.</p></div>
    <div class="im-voce"><span class="im-titolo">Traiettorie</span>
      <p class="im-nota">Mostra a puntini la strada che il personaggio sta per fare quando tocchi il pavimento, e le orme dei suoi ultimi passi.</p>
      <div class="row"><button type="button" id="imTraiettorie" aria-pressed="${TRAIETTORIE.on}">${TRAIETTORIE.on?'Traiettorie: visibili':'Traiettorie: nascoste'}</button></div></div>
    <div class="im-voce"><span class="im-titolo">La partita</span>
      ${partitaDaCancellare()
        ?`<p class="im-nota">Cancella sigilli, diario e tempo, e ricomincia dalla schermata iniziale.</p>
          <div class="row"><button type="button" id="imCancella">Cancella la partita</button></div>
          <div class="im-conferma" id="imConferma" hidden><p>Sei sicuro? La partita non si potrà recuperare.</p>
            <div class="row"><button type="button" id="imSi" class="primary">Sì, cancella</button><button type="button" id="imNo">No, torna indietro</button></div></div>`
        :'<p class="im-nota">Non c\'è nessuna partita da cancellare.</p>'}</div>
    <div class="row end">${closeBtn}</div>`);
  $('imMusica').onclick=()=>{
    MUSICA.on=!MUSICA.on;try{localStorage.setItem('fuoriOrario.musica',MUSICA.on?'1':'0')}catch(e){}
    if(typeof svegliaMusica==='function')svegliaMusica();
    const m=$('imMusica');m.setAttribute('aria-pressed',String(MUSICA.on));m.textContent=MUSICA.on?'Musica: accesa':'Musica: spenta'};
  // traiettorie del personaggio (js/motore.js, compito 6)
  $('imTraiettorie').onclick=()=>{traiettorie(!TRAIETTORIE.on);const b=$('imTraiettorie');
    b.setAttribute('aria-pressed',String(TRAIETTORIE.on));b.textContent=TRAIETTORIE.on?'Traiettorie: visibili':'Traiettorie: nascoste'};
  const r=$('imVolume');
  r.oninput=()=>{const n=+r.value;$('imValore').textContent=n+'%';$('imNota').hidden=n!==0;scriviVolume(n);applicaVolume(n)};
  if($('imCancella')){
    $('imCancella').onclick=()=>{$('imCancella').hidden=true;$('imConferma').hidden=false;$('imNo').focus()};
    $('imNo').onclick=()=>{$('imConferma').hidden=true;$('imCancella').hidden=false;$('imCancella').focus()};
    $('imSi').onclick=()=>{if(typeof cancellaSalvataggio==='function')cancellaSalvataggio();location.reload()};
  }
}
window.apriImpostazioni=apriImpostazioni;

const b=document.createElement('button');b.id='btnImpostazioni';b.type='button';b.textContent='⚙';b.title='Impostazioni';b.setAttribute('aria-label','Impostazioni');
// come Mappa e Tessere: non si apre sopra un dialogo o un'altra finestra
b.onclick=()=>{if($('modal').hidden&&$('dialog').hidden)apriImpostazioni()};$('btnHint').before(b);
const st=document.createElement('style');st.textContent=`
.im-voce{border:2px solid var(--line);padding:10px 12px;display:grid;gap:8px;margin:10px 0}
.im-voce label,.im-titolo{font-family:var(--display);font-size:18px;color:var(--brass)}
.im-riga{display:flex;gap:12px;align-items:center}
.im-riga input{flex:1;accent-color:var(--brass)}
.im-riga output{min-width:4ch;text-align:right}
.im-nota{margin:0;font-size:16px;color:var(--muted)}
.im-conferma p{margin:0 0 8px}`;
document.head.appendChild(st);
}
