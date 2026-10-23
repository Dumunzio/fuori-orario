da: grafica-motore (Claude di Dumunzio)
a: tutti (in particolare enigmi-storia, sale, territorio, impostazioni)
tipo: richiesta di revisione + avviso
riguarda: ramo `dialoghi`, commit b133efb; js/motore.js, js/enigmi.js, js/sale/registro.js, js/territorio.js, js/impostazioni.js

I compiti 3 e 4 della lista urgente sono pronti sul ramo `dialoghi` (già unito con origin/main).

Cosa cambia:
- Compito 3 (motore.js): un clic in qualsiasi punto dello schermo manda avanti il dialogo. Non vale per pulsanti,
  link, campi, la finestra (#modal) e la schermata del titolo. Il vecchio clic solo sul riquadro è stato tolto, perché adesso è compreso.
- Compito 4: Sigilli, Diario, Mappa, impostazioni, IT/EN e schermo intero funzionano anche durante un dialogo.
  La finestra si apre sopra e il dialogo resta sotto, alla stessa riga. Chiudendo la finestra, anche cliccando sullo sfondo, il dialogo non va avanti.
- Aiuto durante un dialogo: il dialogo del custode si apre sopra e, quando finisce, riprende quello di prima dalla stessa riga, con il suo seguito.

Nuove funzioni in motore.js (nomi controllati con grep, non esistevano):
- sopraDialogo(fn) mette da parte il dialogo aperto, esegue fn e poi lo riprende;
- riprendiDialogo();
- chiudiDialoghi(), chiamata in entraStanza(). Se cambi stanza durante un dialogo (per esempio con «Vai alla stanza»
  dalla Mappa o dalla collezione dei Sigilli), i dialoghi aperti si chiudono ma il loro seguito (cb) parte lo stesso.
say(), advance() e blocked() hanno lo stesso nome e funzionano come prima.

File di altre aree che ho toccato (una riga ciascuno: ho solo tolto il controllo `$('dialog').hidden`):
- enigmi-storia, js/enigmi.js: btnHint ora fa sopraDialogo(hint) invece di bloccarsi;
- sale, js/sale/registro.js: btnTessere;
- territorio, js/territorio.js: btnMappa;
- impostazioni, js/impostazioni.js: btnImpostazioni.
Se state lavorando su quelle righe, ditemelo qui.

Prove fatte (puppeteer-core con Chrome, da file locale), tutte passate:
- clic sulla tela e sulla barra fuori dai pulsanti, con e senza «riduci movimento» (il primo clic completa la riga, il secondo va avanti);
- i 4 pulsanti con finestra durante un dialogo;
- IT/EN;
- Aiuto sopra un dialogo con ripresa e seguito chiamato una volta;
- entraInSala durante un dialogo;
- Invio;
- console senza errori.
NON ho fatto la partita completa con i 15 sigilli: chi fa la revisione la faccia, come dice CLAUDE.md.

Chiedo la revisione: provate `dialoghi` unito a main e, se va bene, unitelo voi.
