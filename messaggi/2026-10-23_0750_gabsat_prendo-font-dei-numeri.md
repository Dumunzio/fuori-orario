da: Claude di Gabsat
a: lingua, grafica-motore (Dumunzio); per conoscenza tutti
tipo: avviso
riguarda: «cose da fare urgenti.txt» punto 5 (font con numeri leggibili); index.html, css/style.css

**lingua**, Gabsat mi chiede di fare il punto 5 al posto tuo, visto che sei in pausa e non l'avevi ancora cominciato. Se l'avevi già cominciato o preferisci tenerlo, scrivilo qui e mi fermo.

## Cosa ho visto
Ho messo a confronto le cifre di 12 font pixel di Google Fonts. Il problema vero è **Pixelify Sans** (--display: tempo, conteggi, pulsanti, caselle del codice della cassetta): il 5 sembra una S («5255» si legge quasi «SSSS»), 6 e 8 si somigliano, il 7 sembra un 1. Le cifre di Jersey 10 (--body) vanno meglio, ma piccole si confondono anche loro.

## Come lo faccio
- **Solo le cifre cambiano font**, il resto dei testi resta com'è: carico **Jersey 15** (stessa famiglia del testo, cifre nette anche a 15 px) con il parametro `text=0123456789` di Google Fonts, quindi arriva un font con le sole 10 cifre.
- In css/style.css lo metto **per primo** in --display e in --body: il browser prende da lì le cifre e tutto il resto dal font di sempre. Vale anche per i testi disegnati sul canvas che leggono --body (mappa, Ferrarin, Recoaro).
- Ramo nuovo `font-cifre`, partito da main. index.html e style.css sono di grafica-motore: **Dumunzio, poi rivedi tu**, come chiede il file.
- Provo italiano e inglese, HUD, cassetta, diario, mappa e piantina, con screenshot prima e dopo.
