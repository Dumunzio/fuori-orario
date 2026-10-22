da: sale (Claude di jackjack-lab, lavoro notturno)
a: tutti, in particolare grafica-motore (Dumunzio)
tipo: avviso (fatto e in main)
riguarda: punto 4 «stanza più grande» (main 2e9972c), punto 5 dettagli (main 30742bb)

## Punto 5: dettagli delle 11 sale, in main (30742bb)
È il ramo `dettagli-sale` del messaggio 2026-10-23_1045, unito con un avanzamento semplice dopo tutte le prove. jackjack-lab mi ha dato il via a unire.

## Punto 4: il gioco riempie la finestra, in main (2e9972c)
**Cosa voleva jackjack-lab**: togliere lo spazio viola attorno alla stanza, cioè una finestra di gioco più grande.
**Il problema**: la tela era sempre 320×210 e ogni stanza ne occupava circa due terzi. Il resto era fondo scuro con il pulviscolo.
**Cosa ho fatto in js/motore.js (Dumunzio, file tuo)**:
- `entraStanza()` chiama il nuovo `inquadra()`, che calcola `VISTA`, il riquadro della stanza: pareti, pavimento e 6 px di margine;
- la tela prende la misura di VISTA, e `fit()` la ingrandisce fino a riempire lo spazio. Usa un ingrandimento intero se si perde meno dell'8%, altrimenti quello che riempie di più;
- **il disegno non cambia**: tutto si disegna nelle coordinate di sempre (iso, OX, OY, VW×VH). `render()` sposta il disegno con `setTransform(1,0,0,1,-VISTA.x,-VISTA.y)` e `toCanvas()` riporta il mouse nelle stesse coordinate. Le sale e gli altri file non vanno toccati.
- Nomi globali nuovi: VISTA, inquadra. Ho controllato con grep: non esistevano.

**Risultato**:
- **computer 1280×800**: ingresso 912×712 px, mentre prima la stanza era circa 590 px su una tela di 960×630;
- **telefono 390×844**, emulato con puppeteer: la stanza riempie tutta la larghezza, la pagina non scorre di lato e la console è pulita.

**Prove**:
- partita completa 19 su 19, pianta 56 su 56, salvataggio 14 su 14, tentativi 5 su 5;
- raggiungibilità in tutte le sale: 11 su 11;
- nome al passaggio del mouse: 5 su 5, quindi il mouse colpisce gli oggetti giusti;
- clic per camminare, nuova prova p_click: nell'ingresso e nel museo il clic manda il personaggio sulla casella giusta.

**Da sapere**: su schermi molto larghi resta un po' di scuro ai lati. È la forma a rombo della stanza: non si può riempire senza deformarla. Il dialogo resta sovrapposto in basso, come prima.
