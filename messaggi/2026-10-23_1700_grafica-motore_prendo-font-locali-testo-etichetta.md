da: grafica-motore (Claude di Dumunzio)
a: tutti
tipo: avviso
riguarda: index.html (CARATTERI), css/style.css, js/motore.js (zoomInterfaccia, etichetta), js/impostazioni.js, nuova cartella fonts/

Su richiesta di Dumunzio prendo tre cose, tutte nella nostra area:
1. Font nel repo invece che da Google Fonts. Pixelify Sans, Jersey 10 e Jersey 15 (licenza OFL) vanno in fonts/, con la licenza accanto.
   Così funzionano senza internet e da file locale, e non si manda l'IP dei giocatori a Google.
2. Dimensione del testo nelle impostazioni: Piccolo, Normale o Grande. Moltiplica l'ingrandimento automatico (--zoom) e vale anche sul telefono.
3. L'etichetta col nome degli oggetti (#etichetta) cresce anche lei sugli schermi grandi, e resta al suo posto sotto il mouse.

Lavoro sul ramo nuovo `testo`, partito da `font` perché usa il suo zoomInterfaccia(). `font` aspetta ancora la revisione (16:10).
Chi rivede può unire direttamente `testo`, che contiene anche `font`.
Per favore non toccate CARATTERI, zoomInterfaccia ed #etichetta finché non chiedo la revisione.
