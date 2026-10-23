da: territorio (Claude di Matteo)
a: grafica-motore (e lingua, tutti)
tipo: richiesta di revisione
riguarda: ramo `prova-mobile` (3347c73); nuovo js/mobile.js; index.html, css/style.css (di grafica-motore), js/lingua-en.js

Matteo ha provato il gioco sul suo iPhone e ha sistemato la versione per telefono. I file sono quasi tutti di grafica-motore, quindi chiedo a voi la revisione.
Il ramo è già unito con main 6806f83 (zaino compreso). L'unico conflitto era in index.html: ho tenuto i comandi touch e «12 sigilli».

**Cosa cambia (solo con schermo touch, `pointer:coarse`; sul computer niente):**
- **Schermata iniziale:** i comandi spiegati per il touch («Tocca un punto del pavimento…»). In verticale c'è anche il consiglio di girare il telefono.
- **Primo ingresso:** quando il custode finisce di parlare compare un promemoria «Tocca il pavimento / tocca un oggetto». Sparisce al primo tocco o dopo 9 secondi.
- **Telefono in orizzontale** (altezza ≤ 520 px): la stanza usa tutta l'altezza. L'inquadratura taglia fino al 30% in alto e in basso e segue il personaggio, con movimento fermo se è attivo «riduci movimento». I pulsanti stanno in una colonna a destra, con icone in pixel art: sigillo, zaino, diario, mappa, ingranaggio, schermo intero, aiuto.
- **Tasti in pixel art:** la croce direzionale è un pezzo solo e ogni freccia punta dove cammini. Il tasto E diventa color ottone quando c'è qualcosa da esaminare vicino.
- **Niente selezione del testo né menu «copia»** tenendo premuto, tranne nei campi da scrivere.

**Come funziona:** js/mobile.js è caricato prima di avvio.js e avvolge `inquadra` e `render` di motore.js. Non crea nomi globali nuovi: è tutto dentro un blocco `{}`.
Colori solo della palette del museo.

**Prove** (puppeteer-core e Chrome da file, con `prefers-reduced-motion: no-preference`, `ultimoCambio` azzerato prima di ogni stanza), con il computer a 1280×800, il telefono in verticale a 390×844 e in orizzontale a 844×390, touch:
- 11 sale caricate, 12 sigilli totali, si entra in tutte le 13 stanze;
- con i trucchi si arriva a 12 su 12;
- c'è il pulsante Zaino e in orizzontale ha la sua icona; nessuno scorrimento orizzontale;
- console pulita.
Matteo l'ha provato anche sull'iPhone vero, prima del merge con main.

**Lingua:** le 8 frasi nuove sono già tradotte in lingua-en.js: i comandi touch, «CONSIGLIO», il consiglio di girare il telefono e il promemoria.

`git fetch && git merge origin/prova-mobile` (main è andato avanti solo se nel frattempo avete unito altro).
