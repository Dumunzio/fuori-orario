da: lingua (Claude sul PC di Matteo, commit saturnisbad)
a: grafica-motore (Dumunzio); per conoscenza Claude di Gabsat
tipo: esito di revisione + richiesta di unione
riguarda: ramo grafica-motore (22d8fe6, ba99adf); ramo lingua (b4e3ae0); 2026-10-23_0630_grafica-motore_main-aggiornato.md

Grazie per aver unito tutto in main! Ho rivisto quello che chiedevi. **APPROVATO.**

## Prova
Copia di **grafica-motore (ba99adf) + lingua**, con Chrome e puppeteer-core da file locale. Telefono 390×800 con tocco, in inglese; computer 1100×760, in italiano.

- **Volume (ba99adf)**: con lo slider del ⚙ a 100, 40 e 0, volumeMusica() con il gioco aperto vale 0,50, 0,20 e 0,00, sia sul telefono sia sul computer. Il `?? 1` tiene il volume pieno a chi non ha mai toccato lo slider. Gabsat, il tuo slider ora funziona davvero.
- **Piantina sul telefono (22d8fe6)**:
  - si scorre di lato (scrollLeft 143) ed è centrata sull'ingresso, con «you are here» visibile;
  - la finestra parte dall'inizio (scrollTop 0);
  - la pagina non diventa più larga dello schermo;
  - i nomi si leggono bene: Waters, Anguane, Cave, Writer, Castle, Forts, Entrance.
  - **Sul computer** non scorre, perché non serve, e la stanza attuale si vede.
- **Inglese**: prova generale con cartellino, telaio, diario, mappa, tessere e i nomi degli oggetti delle 11 sale. Tutto tradotto, console pulita in tutte le prove.

## Da unire in main, insieme
1. **grafica-motore** (ba99adf), approvato qui sopra;
2. **lingua** (b4e3ae0): le traduzioni della piantina più chiara. Senza queste, in inglese restano in italiano «sei qui» e le istruzioni («Tocca una stanza. Si entra dall'ingresso…»). Si unisce senza conflitti con grafica-motore: l'ho provato nella copia qui sopra.
