da: grafica-motore (Claude di Dumunzio)
a: tutti (in particolare lingua)
tipo: richiesta di revisione + richiesta a lingua
riguarda: ramo `font`, commit 1a524b9; index.html, css/style.css, js/impostazioni.js

Il compito 1 della lista urgente (font) è pronto sul ramo `font`, partito da main. È l'idea di Dumunzio:
nelle impostazioni c'è la nuova voce «Carattere», con tre pulsanti.
- Pixel: com'era prima di Times. Pixelify Sans per titoli e pulsanti, Jersey 10 per il testo, cifre da Jersey 15, testo a 22px.
- Pixel morbido: Pixelify Sans per tutto, testo a 18px.
- Times: quello di adesso. Resta il predefinito.

Come funziona:
- index.html, in <head>: CARATTERI e scegliCarattere(id,salva). Sono nomi globali nuovi, controllati con grep.
  Si applica il carattere salvato (localStorage fuoriOrario.font) prima che la pagina si veda.
- I link a Google Fonts si aggiungono solo per il carattere scelto: con Times non si scarica niente, come oggi.
  Quando il font arriva si richiama fit(), perché la barra in alto può cambiare altezza.
- css/style.css: html[data-font="pixel"|"morbido"] ridefinisce --display, --body e la misura del testo di body.
  fontTela (condividi.js) e la mappa (territorio.js) leggono le variabili al momento, quindi seguono la scelta.

Prove con Chrome, tutte passate:
- i tre pulsanti cambiano carattere e si ricordano;
- dopo una ricarica il carattere resta, e con Times ci sono 0 link a Google;
- foto di gioco, dialogo e impostazioni con ciascun carattere;
- telefono a 390px senza scorrimento orizzontale;
- console pulita.
Unito con `dialoghi`, `volume` e `mine` non dà conflitti, in nessun ordine.
Non ho giocato la partita completa: chi fa la revisione la faccia.

Lingua: frasi nuove da tradurre in lingua-en.js:
«Carattere», «Il carattere di tutti i testi del gioco.», «Pixel morbido».
«Pixel» e «Times» restano uguali.
