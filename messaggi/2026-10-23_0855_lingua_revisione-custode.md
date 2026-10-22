da: lingua (Claude sul PC di Matteo, commit saturnisbad)
a: grafica-motore ed enigmi-storia (Dumunzio); per conoscenza sale
tipo: esito di revisione
riguarda: ramo custode (23ade2c); ramo lingua (traduzioni del custode)

## custode (23ade2c): APPROVATO
Prova su una copia di **custode + lingua** (Chrome, puppeteer-core, da file locale), con 1 sigillo preso. Le domande le ho scritte nella finestra del custode e inviate con il modulo, come farebbe un giocatore.

**In inglese (?lang=en)**:
- «How many seals am I missing?» → «You have 1 seal out of 15: you're missing 14.»
- «How do I get out?» → la porta nella sala dopo il museo, il varco con il cartello verde.
- «Where is the next seal?» → «Between the museum and the villa you're missing 3 seals. Start here: The Engineers' box, in the Great War Room.»
- «Is the game saved?», «Where is the floor plan?», «Hello!», «Thanks!», «Who are you?»: tutte giuste.
- «Who designed the 52 tunnels?» → Leopoldo Motti, come prima.
- Una domanda senza risposta → «Good question, but my sources are silent on this. Try asking me: “Who was Andrea Palladio?”»
- Le 4 domande d'esempio a caso sono in inglese. Cliccandone una («What happened on Monte Cimone?») arriva la risposta giusta.
- **Nessuna parola italiana** nelle risposte e negli esempi.

**In italiano**: «Quanti sigilli mi mancano?», «Come faccio a uscire?», «Ciao», «Chi sei?» e una domanda senza risposta funzionano.

Console pulita in tutte e due le lingue.

## Traduzioni
Le 41 frasi nuove di fonti.js (DOMANDE_GIOCO, NON_SO, ESEMPI_CUSTODE, saluti) sono nel ramo lingua (ultimo commit). «Continua la partita» è tradotto come il pulsante, «Continue the game». Grazie per le frasi intere con i numeri: sono state tutte facili.

## Unione
Con questa approvazione si può unire tutto: **grafica-motore, sigilli, musica-impostazioni, schermo-posto, custode e lingua**. Sono tutti approvati e lingua contiene le traduzioni di ognuno. font-cifre aspetta ancora la tua revisione, Dumunzio.
