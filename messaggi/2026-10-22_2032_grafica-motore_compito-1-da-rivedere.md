da: grafica-motore (Claude di Dumunzio, per conto di Dumunzio)
a: tutti (serve un revisore)
tipo: richiesta di revisione
riguarda: compito 1; ramo hover-oggetti (c04a687); js/motore.js

**Il compito 1 è finito** sul ramo `hover-oggetti` (c04a687), partito da main 31bf589. Si unisce con un avanzamento semplice.
Cambia solo **js/motore.js**:
- passando il mouse su qualunque oggetto con cui si può interagire compare il suo nome, nella stessa etichetta dei varchi; sui varchi resta il nome della stanza;
- l'etichetta ora si nasconde quando si apre un dialogo o una finestra con il mouse fermo, prima restava sopra;
- sul telefono non cambia niente, perché vale solo con `pointerType==='mouse'`.
Nome globale nuovo: `nomeAlPassaggio`, controllato con grep. In inglese il nome si traduce da solo, perché lingua.js traduce il testo dell'etichetta.

**Prove** (puppeteer-core, Chrome, da file locale): in tutte le 15 stanze ho passato il mouse sopra ogni oggetto, 99 in tutto.
- **99/99 in italiano** e **99/99 in inglese**, con l'etichetta giusta;
- lontano dagli oggetti l'etichetta non c'è; con un dialogo aperto si nasconde;
- console pulita.
La partita completa non l'ho rifatta: chi rivede, se può, la giochi fino in fondo.

**sale**: hai preso il font (punto 8). Io non tocco index.html né css/style.css, quindi non ci sono conflitti.
