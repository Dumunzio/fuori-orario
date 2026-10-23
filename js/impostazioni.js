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
  const v=musicaAccesa()?leggiVolume():0;   // con la musica spenta lo slider sta a 0
  openModal(`<div class="eyebrow">Fuori Orario · menu</div><h2>Impostazioni</h2>
    <div class="im-voce"><span class="im-titolo">Musica</span>
      <div class="row"><button type="button" id="imMusica" aria-pressed="${musicaAccesa()}">${musicaAccesa()?'Musica: accesa':'Musica: spenta'}</button></div>
      <label for="imVolume">Volume della musica</label>
      <div class="im-riga"><input type="range" id="imVolume" min="0" max="100" step="5" value="${v}" style="--v:${v/100}"><output id="imValore" for="imVolume">${v}%</output></div>
      <p class="im-nota" id="imNota"${v===0?'':' hidden'}>A volume 0 la musica è spenta.</p></div>
    <div class="im-voce"><span class="im-titolo">Carattere</span>
      <p class="im-nota">Il carattere di tutti i testi del gioco.</p>
      <div class="row" id="imCarattere">${Object.entries(CARATTERI).reverse().map(([id,c])=>`<button type="button" data-font="${id}" aria-pressed="${document.documentElement.dataset.font===id}">${c.nome}</button>`).join('')}</div></div>
    <div class="im-voce"><span class="im-titolo">Dimensione del testo</span>
      <p class="im-nota">Sugli schermi grandi il testo cresce già da solo: qui lo fai più piccolo o più grande.</p>
      <div class="row" id="imTesto">${Object.entries(DIMENSIONI_TESTO).map(([id,d])=>`<button type="button" data-testo="${id}" aria-pressed="${dimensioneTesto()===id}">${d.nome}</button>`).join('')}</div></div>
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
    ${typeof voceTrucchi==='function'?voceTrucchi():''}
    <div class="row end">${closeBtn}</div>`);
  // Pulsante e slider vanno insieme: spegnendo la musica lo slider va a 0 (il volume salvato resta, per quando la riaccendi);
  // riaccendendola torna al volume salvato, o a 100 se era 0. Alzare lo slider con la musica spenta la riaccende.
  const r=$('imVolume');
  const mostraVolume=n=>{r.value=n;r.style.setProperty('--v',n/100);$('imValore').textContent=n+'%';$('imNota').hidden=n!==0};
  const accendi=on=>{MUSICA.on=on;try{localStorage.setItem('fuoriOrario.musica',on?'1':'0')}catch(e){}
    if(typeof svegliaMusica==='function')svegliaMusica();
    const m=$('imMusica');m.setAttribute('aria-pressed',String(on));m.textContent=on?'Musica: accesa':'Musica: spenta'};
  $('imMusica').onclick=()=>{const on=!MUSICA.on;
    if(on&&leggiVolume()===0){scriviVolume(100);applicaVolume(100)}
    accendi(on);mostraVolume(on?leggiVolume():0)};
  // traiettorie del personaggio (js/motore.js, compito 6)
  $('imTraiettorie').onclick=()=>{traiettorie(!TRAIETTORIE.on);const b=$('imTraiettorie');
    b.setAttribute('aria-pressed',String(TRAIETTORIE.on));b.textContent=TRAIETTORIE.on?'Traiettorie: visibili':'Traiettorie: nascoste'};
  $('imTesto').onclick=e=>{const b=e.target.closest('[data-testo]');if(!b)return;try{localStorage.setItem('fuoriOrario.testo',b.dataset.testo)}catch(x){}fit();
    $('imTesto').querySelectorAll('[data-testo]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))};
  $('imCarattere').onclick=e=>{const b=e.target.closest('[data-font]');if(!b)return;scegliCarattere(b.dataset.font,true);
    $('imCarattere').querySelectorAll('[data-font]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)))};
  r.oninput=()=>{const n=+r.value;mostraVolume(n);scriviVolume(n);applicaVolume(n);if(n>0&&!musicaAccesa())accendi(true)};
  if($('imCancella')){
    $('imCancella').onclick=()=>{$('imCancella').hidden=true;$('imConferma').hidden=false;$('imNo').focus()};
    $('imNo').onclick=()=>{$('imConferma').hidden=true;$('imCancella').hidden=false;$('imCancella').focus()};
    $('imSi').onclick=()=>{if(typeof cancellaSalvataggio==='function')cancellaSalvataggio();location.reload()};
  }
  // trucchi per le prove: prendere i sigilli senza i rompicapi (js/sale/trucchi.js, area sale)
  if(typeof agganciaTrucchi==='function')agganciaTrucchi();
}
window.apriImpostazioni=apriImpostazioni;

const b=document.createElement('button');b.id='btnImpostazioni';b.type='button';b.textContent='⚙';b.title='Impostazioni';b.setAttribute('aria-label','Impostazioni');
// come Mappa e Sigilli: non si apre sopra un'altra finestra, ma sì durante un dialogo, che resta sotto
b.onclick=()=>{if($('modal').hidden)apriImpostazioni()};$('btnHint').before(b);
const st=document.createElement('style');st.textContent=`
.im-voce{border:2px solid var(--line);padding:10px 12px;display:grid;gap:8px;margin:10px 0}
.im-voce label,.im-titolo{font-family:var(--display);font-size:18px;color:var(--brass)}
.im-riga{display:flex;gap:12px;align-items:center}
.im-riga output{flex:none;width:5ch;text-align:right}
/* Slider del volume disegnato da noi, in pixel art: con lo stile del browser il pallino non arrivava in fondo
   e al 100% restava un pezzo di binario vuoto a destra. --v (da 0 a 1) è il valore: la parte in ottone
   arriva fino al centro del pallino (largo 12px), che va da bordo a bordo. */
.im-riga input{flex:1;min-width:0;margin:0;padding:0;border:0;height:20px;background:none;cursor:pointer;-webkit-appearance:none;appearance:none}
.im-riga input::-webkit-slider-runnable-track{height:10px;border:2px solid var(--line);
  background:linear-gradient(90deg,var(--brass) calc(6px + (100% - 12px) * var(--v)),var(--night) 0)}
.im-riga input::-webkit-slider-thumb{-webkit-appearance:none;width:12px;height:18px;margin-top:-6px;background:var(--ink);border:2px solid #000;border-radius:0}
.im-riga input::-moz-range-track{height:6px;border:2px solid var(--line);background:var(--night)}
.im-riga input::-moz-range-progress{height:6px;background:var(--brass)}
.im-riga input::-moz-range-thumb{width:8px;height:14px;background:var(--ink);border:2px solid #000;border-radius:0}
.im-riga input:focus-visible{outline:2px solid var(--brass);outline-offset:4px}
.im-nota{margin:0;font-size:16px;color:var(--muted)}
.im-conferma p{margin:0 0 8px}
#imCarattere button[aria-pressed="true"],#imTesto button[aria-pressed="true"]{border-color:var(--brass);color:var(--brass)}`;
document.head.appendChild(st);
}
