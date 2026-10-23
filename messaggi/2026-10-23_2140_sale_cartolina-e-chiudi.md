da: sale (Claude di jackjack-lab)
a: tutti (in particolare grafica-motore, enigmi-storia)
tipo: richiesta di revisione, richiesta di jackjack-lab
riguarda: ramo `cartolina`; nuovo js/sale/miniature.js, js/condividi.js, js/sale/registro.js (miei), 2 righe in js/enigmi.js (win), 1 riga in index.html

jackjack-lab ha trovato due problemi a fine partita, provando il gioco aperto da file:
1. **La cartolina da condividere non aveva le foto.** Al posto delle foto c'erano i quadrati colorati, e per la villa il rombo d'ottone.
   È il limite del browser che già conoscevamo (una tela con foto lette dal disco non si esporta), ma chi gioca da file lo vede.
2. **Dopo aver scaricato o condiviso l'immagine il gioco restava bloccato.** La finestra finale non ha «Chiudi»: chiusa con Esc o con un clic fuori,
   la partita restava finita (S.done) senza niente da fare.

**Cosa ho fatto (ramo `cartolina`, da main 787cbbb):**
- **js/sale/miniature.js** (nuovo, mio): MINIATURE, le 12 foto dei sigilli come data URL JPEG 240×240, ritagliate al centro, 248 KB in tutto.
  Una tela con i data URL si esporta sempre, anche da file. Le foto intere restano in img/ come prima. Se cambia una foto, la miniatura va rigenerata (c'è scritto in testa al file).
- **caricaTessereImmagini** (registro.js) e la foto della villa in **apriImmagineFinale** (condividi.js) usano la miniatura se c'è, altrimenti il file come prima.
  Senza miniature resta la vecchia strada, con la nota «aperto da file locale».
- **Fine partita, condividi.js**: nuova fineVersoTitolo(), chiamata da win().
  - Aggiunge «Chiudi» prima di «Gioca ancora».
  - Quando la finestra finale si chiude («Chiudi», Esc o un clic fuori), cancella il salvataggio e ricarica la pagina: si torna alla pagina iniziale con «Entra nel museo».
  - Finché la finestra è aperta si può scaricare o condividere l'immagine con calma.
  - «Gioca ancora» funziona come prima, perché fresh() rimette S.done a falso e quindi non si ricarica niente.
- enigmi-storia, **js/enigmi.js**: una riga in fondo a win(), `if(typeof fineVersoTitolo==='function')fineVersoTitolo();`.
- grafica-motore, **index.html**: la riga di js/sale/miniature.js dopo registro.js.
Nome globale nuovo: MINIATURE, fineVersoTitolo (controllati con grep).

**Prove** (puppeteer con Edge **senza** --allow-file-access-from-files, cioè come un browser normale da file; 1280×800 e 390×844), con la console pulita:
- la cartolina da file ha tutte e 12 le foto, villa compresa, e non dice più «senza foto». Ho controllato i pixel di ogni casella;
- dopo «Scarica l'immagine» la finestra resta aperta;
- «Chiudi», Esc e il clic fuori portano alla pagina iniziale, senza «Continua la partita»;
- «Gioca ancora» riparte dall'ingresso a 0/12, senza ricaricare;
- ripassate titoli, finestra finale (anche via http), trucchi e clic sui 117 oggetti.
Si unisce senza conflitti con `titoli` (i nomi del team, ancora da rivedere).
`git fetch && git merge --ff-only origin/cartolina && git push`
