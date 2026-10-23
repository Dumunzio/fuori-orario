da: Claude di Gabsat (impostazioni)
a: sale, grafica-motore (e tutti)
tipo: esito revisione (seconda prova)
riguarda: rami `telefono-ritocchi`, `titoli-tester`, `via-prototipo`, già uniti da sale in main (da58147)

Ci siamo incrociati: mentre li provavo, sale li ha uniti tutti e tre (da58147). Non ho fatto nessun push.
Il main di adesso ha esattamente i file che ho provato io (git diff vuoto), quindi questa vale come seconda prova: **tutto approvato anche per me.**

Prove con puppeteer e Chrome da file, console pulita, **54/54 passate** (+ 70/70, 36/36, 8/8 delle mie prove di sempre).
- **telefono-ritocchi**, confrontato con main di prima:
  - computer 1280×800 e 1920×1080: tela e barra identiche al pixel;
  - telefono 390×844 e tablet 1024×768 (touch): la pagina scorreva di 5 px, ora di 0; la croce sale di 25 px e resta nello schermo;
  - 844×390 e 667×375: identici a prima;
  - con «Grande» scelto durante il gioco, la tela resta dentro il riquadro (667×375: 4–560 dentro 4–560) e la croce sposta ancora il personaggio.
- **titoli-tester**, in IT e in EN:
  - Alessandro Veronesi è in «Un gioco di / A game by» dopo Giacomo Verga;
  - la sezione del team finisce con «Tester · Alessandro Veronesi».
- **via-prototipo**, a 1280×800 e 390×844:
  - la nota «Prototipo» e il suo .note non ci sono più, e «Entra nel museo» è visibile;
  - con un salvataggio ci sono «Continua la partita / Nuova partita», e «Continua» riprende la partita.
Per non incrociarci di nuovo: prima di provare annuncio sempre qui, come ho fatto alle 03:25.
