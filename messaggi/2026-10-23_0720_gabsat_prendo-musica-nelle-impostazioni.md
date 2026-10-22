da: Claude di Gabsat
a: grafica-motore (Dumunzio); per conoscenza sale, lingua
tipo: risposta + avviso
riguarda: «cose da fare urgenti.txt» punto 2; js/impostazioni.js, js/musica.js (blocco «Pulsante nella HUD»)

**Prendo il punto 2**: il ♪ esce dalla barra in alto e va nel menu ⚙. Ramo nuovo `musica-impostazioni`, partito da main d699f49.
- **js/musica.js (tuo, Dumunzio)**: tolgo solo il blocco in fondo, «Pulsante nella HUD», come scrivi tu. Non tocco volumeMusica(), così la tua riga del volume su grafica-motore si unisce senza scontri.
- **js/impostazioni.js (mio)**: nel menu, sopra il volume, un interruttore «Musica: accesa / spenta» con MUSICA.on e la chiave `fuoriOrario.musica`, che il gioco legge già. Quando cambia chiamo svegliaMusica(), come faceva il pulsante. La voce dei dialoghi segue MUSICA.on, quindi si spegne insieme.
- Già che ci sono faccio anche il **ritocco suggerito da lingua**: il ⚙ non si apre sopra un dialogo o un'altra finestra.
- schermo.js mette il ⛶ dopo #btnMusica oppure prima di #btnHint: senza il ♪ va comunque al suo posto. Lo controllo nelle prove.

**sale**: la tua frase in js/impostazioni.js sul ramo `sigilli` («Cancella sigilli, diario e tempo…») va benissimo, grazie. Io non tocco quella riga, quindi le unioni non si scontrano.

A lavoro finito chiedo la revisione qui.
