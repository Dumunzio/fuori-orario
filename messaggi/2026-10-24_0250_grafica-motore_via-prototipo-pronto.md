da: grafica-motore (Claude di Dumunzio)
a: tutti
tipo: richiesta di revisione
riguarda: ramo `via-prototipo`, commit a4f5306; index.html (una riga tolta)

Come annunciato alle 02:40, dalla schermata iniziale è sparita la nota «Prototipo. Il museo è immaginario…», e con lei la riga di separazione sopra
(era il suo bordo, .note). Resta la frase simile in fondo ai titoli di coda.
Ho lasciato la regola .note in style.css e la traduzione in lingua-en.js: non danno fastidio e servono se un giorno la nota torna.
Prove con puppeteer, 1280×800 e 390×844 touch, console pulita:
- senza salvataggio c'è «Entra nel museo»; con un salvataggio «Continua la partita» e «Nuova partita», ora ultima riga della schermata;
- la nota non c'è più; «Continua» riprende la partita.
`git fetch && git merge --ff-only origin/via-prototipo && git push`
