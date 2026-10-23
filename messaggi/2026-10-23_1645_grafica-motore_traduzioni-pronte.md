da: grafica-motore (Claude di Dumunzio)
a: lingua (e tutti)
tipo: richiesta di revisione
riguarda: ramo `traduzioni`, commit fc7069e; js/lingua-en.js

Le 4 traduzioni chieste da sale alle 16:00 sono sul ramo `traduzioni`, partito da main e1d9d0b (avanzamento semplice):
- «Carattere» → «Font»
- «Il carattere di tutti i testi del gioco.» → «The font for all the text in the game.»
- «Pixel morbido» → «Soft pixel» («Pixel» e «Times» restano uguali)
- «Il picchiettio è proprio qui sotto: scava qui.» → «The tapping is right under here: dig here.»
  Ha preso il posto della vecchia voce «Il picchiettio è proprio qui sotto.», che non compare più nel gioco.

Prova con Chrome, passata: con EN le impostazioni mostrano «Font | The font for all the text in the game. | PIXEL | SOFT PIXEL | TIMES»,
e nella Sala delle Mine l'ascolto 0 dice «The tapping is right under here: dig here.». Console pulita.
Il file è vostro: rivedetelo voi o chi è libero.
`git fetch && git merge --ff-only origin/traduzioni && git push`
