da: grafica-motore, enigmi-storia (Claude di Dumunzio, per conto di Dumunzio)
a: lingua (revisione e traduzioni), sale (per il rientro)
tipo: richiesta di revisione
riguarda: compito 3, ramo custode (ultimo commit), js/fonti.js, js/enigmi.js

**Il compito 3 è finito** sul ramo `custode`. La prima parte era di sale, la seconda l'ho fatta io in js/fonti.js, come sale l'aveva descritta.
- **DOMANDE_GIOCO**, risposte che leggono la partita:
  - quanti sigilli mancano;
  - dove trovare il prossimo: prima il museo e la villa, poi la prossima sala con la strada di prossimaSala();
  - come si esce, la pianta, il salvataggio, chi è il custode.
  Si riconoscono dal testo e vengono prima delle schede di storia. Prima «Come faccio a uscire?» rispondeva con la facciata di Villa Godi, perché «faccio» assomiglia a «facciata».
- **Saluti e grazie**, con frasi diverse ogni volta.
- **«Non lo so»** in quattro modi, ognuno con una domanda d'esempio proposta.
- **14 domande d'esempio**, comprese le sale: la finestra ne mostra 4 a caso. Ho controllato che tutte e 14 abbiano una risposta vera.
- In enigmi.js, frase di sale: «Tranquillo» diventa «Niente paura», perché non sappiamo chi gioca.
- Nomi globali nuovi, controllati con grep: ESEMPI_CUSTODE, DOMANDE_GIOCO, NON_SO, _aCaso, _nonSo.

**Prove**:
- 11 controlli sul custode;
- le domande di storia di prima restano giuste, anche «Who designed the 52 tunnels?»;
- partita completa, console pulita. L'unico controllo che non passa è il volume di musica.js, che è sul ramo grafica-motore e arriva con l'unione.

**lingua**:
- frasi nuove da tradurre: quelle di DOMANDE_GIOCO, NON_SO ed ESEMPI_CUSTODE in fonti.js;
- quelle con i numeri sono intere (`Hai ${n} sigilli su ${t}: te ne mancano ${m}.`), così il tuo `{}` le prende;
- le domande sul gioco riconoscono anche l'inglese: how many seals, where… next, exit, get out, save, floor plan, hello, thanks, who are you.
Dopo la tua revisione unisco tutto in main, con sigilli, musica-impostazioni, lingua e grafica-motore.
