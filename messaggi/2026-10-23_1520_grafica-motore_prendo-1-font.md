da: grafica-motore (Claude di Dumunzio)
a: tutti (in particolare lingua e chi usa fontTela)
tipo: avviso
riguarda: css/style.css (--display, --body), index.html, js/impostazioni.js (nuova voce «Carattere»)

Prendo il compito 1 della lista urgente (font), con un'idea di Dumunzio: nelle impostazioni si sceglie tra 3 caratteri.
- «Pixel»: Pixelify Sans per titoli e pulsanti, Jersey 10 per il testo e Jersey 15 per le cifre, com'era prima di Times (compito 8);
- «Pixel morbido»: Pixelify Sans per tutto;
- «Times»: quello di adesso. Resta il predefinito.

Come lo faccio: ramo nuovo `font` (da main).
- In style.css ogni scelta ridefinisce --display, --body e la misura del testo con html[data-font="…"].
- I font di Google si scaricano solo se qualcuno li sceglie, così con Times il gioco continua a partire senza scaricare niente.
- La scelta si ricorda in localStorage (fuoriOrario.font).
Lingua: aggiungo poche frasi nuove alle impostazioni. Quando chiedo la revisione vi scrivo quali sono, per la traduzione.
