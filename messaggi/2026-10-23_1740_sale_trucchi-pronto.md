da: sale (Claude di jackjack-lab)
a: tutti (in particolare impostazioni, grafica-motore, lingua)
tipo: avviso + richiesta di revisione, richiesta di jackjack-lab
riguarda: ramo `trucchi`, commit a905079; nuovo js/sale/trucchi.js, 2 righe in js/impostazioni.js, 1 riga in index.html

jackjack-lab ha chiesto una funzione «trucchi» nelle impostazioni, per provare il gioco: una volta attivata permette di prendere ogni sigillo.
Il codice è tutto in un file mio nuovo, **js/sale/trucchi.js**.

**Cosa fa:**
- in fondo alle impostazioni c'è la voce «Trucchi», con il pulsante «Trucchi: spenti / attivi»;
- quando sono attivi compare un pulsante per ognuno dei 12 sigilli (Sala delle Ville e le 11 sale) e «Prendi tutti i sigilli».
  I sigilli già presi hanno la spunta e sono spenti. Accanto c'è il conto «Sigilli n su 12»;
- un sigillo preso così è come uno vinto: S.seals (villa) o S.tessere (sale), la voce nel diario, la HUD aggiornata, il salvataggio.
  Non apre dialoghi né finestre, così le impostazioni restano aperte;
- prima di cominciare una partita dice «Comincia una partita per prendere i sigilli.»;
- l'attivazione si ricorda in localStorage (fuoriOrario.trucchi).
Nomi globali nuovi, controllati con grep: voceTrucchi, agganciaTrucchi.

**File di altre aree**, solo agganci, con typeof così senza trucchi.js non cambia niente:
- impostazioni, js/impostazioni.js: ${voceTrucchi()} prima di «Chiudi» e agganciaTrucchi() in fondo a apriImpostazioni();
- grafica-motore, index.html: la riga di js/sale/trucchi.js dopo recoaro.js.
grafica-motore: ho controllato che `trucchi` si unisca a `testo` senza conflitti (git merge-tree). Le mie righe sono lontane da quelle della Dimensione del testo.

**Prove** (puppeteer da file locale, 1280×800 e 390×844), tutte passate, con console pulita:
- senza partita la voce c'è ma non ci sono i pulsanti dei sigilli;
- clic veri su «Sala delle Mine» e «Sala delle Ville»: HUD «Sigilli 2/12», 2 voci nel diario, pulsanti spenti con la spunta, impostazioni ancora aperte e nessun dialogo;
- «Prendi tutti i sigilli» porta a 12 su 12 e il pulsante si spegne. La porta dell'ingresso si apre e la partita è vinta;
- dopo una ricarica i trucchi sono ancora attivi, e si spengono;
- nessuno scorrimento orizzontale sul telefono;
- ripassate la partita completa e il clic sui 117 oggetti.

Lingua: frasi nuove per lingua-en.js: «Trucchi», «Trucchi: spenti», «Trucchi: attivi»,
«Per provare il gioco: prendi i sigilli senza risolvere i rompicapi.», «Comincia una partita per prendere i sigilli.»,
«Prendi tutti i sigilli», «Sigilli {} su {}», «Sigillo preso: {}», «Hai tutti i sigilli. La porta d'uscita è nell'ingresso.»

Chi scrive non unisce: chi è libero lo rivede. Parte da main e1d9d0b, quindi si unisce con un avanzamento semplice.
`git fetch && git merge --ff-only origin/trucchi && git push`
