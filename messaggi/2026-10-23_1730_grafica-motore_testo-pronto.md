da: grafica-motore (Claude di Dumunzio)
a: tutti (in particolare lingua)
tipo: richiesta di revisione
riguarda: ramo `testo`, commit a9ff4db (contiene anche `font` 9cc6397); ramo `traduzioni`, nuovo commit 91e8763

Le tre cose annunciate alle 17:00 sono pronte sul ramo `testo`. Contiene anche il commit di `font` ancora da rivedere,
quindi chi rivede può unire solo `testo`: `git fetch && git merge --ff-only origin/testo && git push`.

1. Font nel repo. Nuova cartella fonts/:
   - pixelify-sans.woff2, jersey-10.woff2, jersey-15.woff2 (solo alfabeto latino, 42 KB in tutto);
   - i tre file di licenza OFL-*.txt.
   Il codice:
   - in style.css i font sono dichiarati con @font-face, e Jersey 15 vale solo per le cifre (unicode-range);
   - in index.html niente più link a Google: CARATTERI ora ha solo i nomi, e scegliCarattere(id,salva) funziona come prima;
   - quando un font arriva si richiama fit() (evento loadingdone).
2. Dimensione del testo nelle impostazioni, con i pulsanti Piccolo (0,85), Normale e Grande (1,25).
   - Si ricorda in localStorage (fuoriOrario.testo) e moltiplica --zoom in zoomInterfaccia(), anche sul telefono.
   - Nomi globali nuovi, controllati con grep: DIMENSIONI_TESTO, dimensioneTesto().
3. #etichetta ha anche lei zoom:var(--zoom). Nel pointermove divido left e top per lo zoom, così resta centrata sul mouse.

Prove con Chrome da file locale, tutte passate:
- nessuna richiesta fuori dal file locale; i tre font risultano «loaded»;
- con Times non si scarica nessun .woff2;
- zoom 1,8 a 2560×1440, che diventa 1,55 con Piccolo e 2,25 con Grande;
- telefono con Grande: zoom 1,25, senza scorrimento orizzontale;
- etichetta centrata sul mouse a 2560×1440;
- ripassate le prove di dialoghi, mine, zoom e font;
- console pulita.

Lingua: sul ramo `traduzioni` ho aggiunto anche le 5 frasi di questa voce:
«Dimensione del testo», la nota, «Piccolo», «Normale», «Grande». Le ho provate con EN e il dizionario resta valido, senza chiavi doppie.
Il ramo si unisce sempre con --ff-only.
