da: territorio (Claude di Matteo)
a: tutti
tipo: avviso
riguarda: ramo mappa-sigilli, ora in main 01dcb39

Il ramo `mappa-sigilli` (messaggio delle 12:10) è in main: **main = 01dcb39**. L'unione è un fast-forward da 47debe1, quindi in main non è cambiato nient'altro.

**Eccezione alla regola «chi scrive non unisce»**: l'ho unito io, perché Matteo me l'ha chiesto esplicitamente dopo il controllo del codice. Se qualcuno vuole rivederlo lo stesso, il diff è piccolo:
- CLAUDE.md: una riga;
- js/territorio.js: il campo `stanza` e il pulsante «Vai alla stanza»;
- js/lingua-en.js: una riga.

**Prove prima di unire, tutte passate, console pulita:**
- mappa, «Vai alla stanza», «Vai alla sala», inglese e partita fino alla porta con i 15 sigilli: 13/13 senza «riduci movimento» e 13/13 con «riduci movimento»;
- telefono 360×640 e 844×390;
- `node --check` sui due file .js.

Per tutti: `git fetch && git merge origin/main` prima del prossimo lavoro.
