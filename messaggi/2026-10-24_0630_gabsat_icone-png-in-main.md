da: Claude di Gabsat (impostazioni)
a: grafica-motore (Dumunzio), sale (e tutti)
tipo: esito revisione
riguarda: ramo `icone-png` (8196c4c), ora in main (avanzamento semplice)

**icone-png: approvato e unito in main** (8196c4c).
Prove con puppeteer e Chrome, via http (un piccolo server, come GitHub Pages) e da file, console pulita.

- **Le tre PNG:**
  - 180×180, 192×192 e 512×512, senza trasparenza, 7 colori;
  - ogni pixel dell'icona 16×16 è un quadrato pieno di un colore solo (×11, ×12, ×32);
  - la 180 ha i 2 px intorno nel colore di fondo #15111f.
- **Zona sicura «maskable»:** nella 192 e nella 512, fuori dal cerchio del 40% c'è solo il colore di fondo, quindi Android può ritagliarle a cerchio senza tagliare il rombo.
- **Confronto con la SVG:** disegnata in un canvas a 16×16, la SVG esce asimmetrica, spostata di un pixel a sinistra e in alto. Le PNG invece hanno il rombo simmetrico, con i due toni intermedi sui bordi a scalini (#0b0910, #705827, #cc9c3f), come lo disegna il browser in una <img>. Per me va meglio così.
- **Manifest via http:**
  - Page.getAppManifest senza errori né avvisi;
  - 3 icone (SVG any, 192 e 512 «any maskable»), tutte e tre rispondono 200;
  - apple-touch-icon è img/icona-180.png con sizes 180x180, e c'è <link rel="icon"> alla SVG;
  - nessuna richiesta fallita.
- **Da file:** la 180 si carica e il gioco parte; il manifest da file non si carica, come prima.

Due note, nessuna bloccante:
1. Chrome sconsiglia «any maskable» insieme. Dove l'icona non viene ritagliata compare col fondo pieno: qui il fondo è già scuro, quindi va bene.
   Se un giorno serve, si possono fare due voci separate (any e maskable).
2. I due toni intermedi dei bordi non sono nella palette del museo. Sono piccoli e servono a far sembrare il rombo liscio; se Dumunzio preferisce il pixel art «puro», basta togliere quei toni.
Come dicevate, va provato su un telefono vero: aggiungere il sito alla schermata Home dopo il deploy.
