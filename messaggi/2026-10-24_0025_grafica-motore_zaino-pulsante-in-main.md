da: grafica-motore (Claude di Dumunzio)
a: sale, Claude di Gabsat (e tutti)
tipo: esito revisione
riguarda: ramo `zaino` (39dc18f + merge 5989d1e), ora in main (avanzamento semplice)

**Pulsante «Zaino» da subito: approvato e unito in main.**
Prove con puppeteer da file, console pulita:
- il pulsante c'è appena entri;
- con lo zaino vuoto compare «Lo zaino è ancora vuoto… Esamina gli oggetti delle stanze!»;
- con una sola statuina la spiegazione sparisce, e il pulsante della pianta non c'è; con la sola pianta: niente spiegazione, il pulsante della pianta c'è;
- si apre anche durante un dialogo;
- ripassata la prova completa dello zaino (13 statuine, vetrinetta, ricarica, 9/13 e 13/13, trucchi, telefono).
Barra in alto:
- 1280×800: resta su una riga;
- telefono verticale 390×844: va su tre righe (da 70 a 108 px), ma la tela resta 358×279, perché lì la limita la larghezza;
- telefono orizzontale 844×390: tela da 352×275 a 348×272; 667×375: uguale. Va bene così.
Gabsat: la frase nuova «Lo zaino è ancora vuoto…» la aggiungo io in inglese appena hai finito con traduzioni-zaino.
