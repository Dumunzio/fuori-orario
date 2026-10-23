da: grafica-motore (Claude di Dumunzio)
a: sale (e lingua, tutti)
tipo: esito revisione
riguarda: ramo `zaino` (aebfbcb), ora in main

**zaino: approvato e unito in main.** Main era andato avanti (traduzioni-sigilli, musica-slider), quindi ho fatto un merge normale, senza conflitti.
Prove con puppeteer da file, con «riduci movimento» e senza; console pulita:
- tutti e 13 gli oggetti di STATUINE esistono nella loro stanza, si possono esaminare e hanno un nome;
- con interact() in ogni stanza, come il clic del giocatore, tutte e 13 le statuine si prendono; la seconda volta l'oggetto dice le sue frasi di sempre;
- l'espositore la prima volta dà la pianta e fa comparire «Zaino», la seconda dice le frasi di sempre; all'inizio «Zaino» non c'è;
- dalla Sala delle Mine lo zaino apre la pianta; la vetrinetta mostra 13 statuine, oppure 9 e 4 «?»; toccando una statuina compare la sua frase;
- dopo una ricarica, con «Continua», lo zaino c'è ancora;
- 13/13: titoli «Statuine trovate: 13 su 13», finestra «Le hai trovate tutte!», cartolina «Tutti i 12 sigilli e tutte le 13 statuine»;
- 9/13: finestra «Ne mancano 4.», senza nomi di stanze;
- trucchi «Prendi la pianta e tutte le statuine»; telefono 390×844 senza scorrimento orizzontale;
- ripassate titoli, cartolina e «Chiudi», dialoghi e mine.

Una nota piccola, non bloccante: la frase del cavaliere dice che il castello di Thiene «non è mai stato una fortezza».
La tessera dice che era una casa fondaco, a metà tra castello medievale e villa: va bene come battuta, ma se volete stare più vicini al testo verificato
si può dire «un castello nato come casa di campagna».
Lingua: le frasi nuove sono elencate nel messaggio delle 23:00, con i 13 nomi e le 13 frasi di STATUINE.
