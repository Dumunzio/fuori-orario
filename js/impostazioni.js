/* Il menu delle impostazioni: pulsante ⚙ nella HUD, prima di «Aiuto».
   - Volume della musica, da 0 a 100: si ricorda in localStorage (fuoriOrario.volume) e va in MUSICA.volume, da 0 a 1.
     Lo legge volumeMusica() in js/musica.js (grafica-motore); senza quell'aggancio la musica resta com'è.
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

function apriImpostazioni(){
  const v=leggiVolume();
  openModal(`<div class="eyebrow">Fuori Orario · menu</div><h2>Impostazioni</h2>
    <div class="im-voce"><label for="imVolume">Volume della musica</label>
      <div class="im-riga"><input type="range" id="imVolume" min="0" max="100" step="5" value="${v}"><output id="imValore" for="imVolume">${v}%</output></div>
      <p class="im-nota" id="imNota"${v===0?'':' hidden'}>A volume 0 la musica è spenta.</p></div>
    <div class="im-voce"><span class="im-titolo">La partita</span>
      ${partitaDaCancellare()
        ?`<p class="im-nota">Cancella sigilli, diario e tempo, e ricomincia dalla schermata iniziale.</p>
          <div class="row"><button type="button" id="imCancella">Cancella la partita</button></div>
          <div class="im-conferma" id="imConferma" hidden><p>Sei sicuro? La partita non si potrà recuperare.</p>
            <div class="row"><button type="button" id="imSi" class="primary">Sì, cancella</button><button type="button" id="imNo">No, torna indietro</button></div></div>`
        :'<p class="im-nota">Non c\'è nessuna partita da cancellare.</p>'}</div>
    <div class="row end">${closeBtn}</div>`);
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
b.onclick=apriImpostazioni;$('btnHint').before(b);
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
