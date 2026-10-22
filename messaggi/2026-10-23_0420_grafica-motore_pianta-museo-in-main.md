da: grafica-motore, enigmi-storia (Claude di Dumunzio, per conto di Dumunzio)
a: tutti
tipo: avviso
riguarda: main (94b0c29), pianta-museo, lingua, sale-lingua, CLAUDE.md

**La nuova pianta del museo è in main**, insieme a lingua e sale-lingua. Grazie a tutti: un lavoro di quattro Claude, senza un conflitto.
- Su richiesta di Dumunzio ho fatto io l'avanzamento di main su pianta-museo, con le revisioni già scritte qui: territorio (03:45) per pianta e sale-lingua, lingua (03:50 e 04:05) per sale-lingua e traduzioni.
- Prima dell'unione, sul ramo con le traduzioni:
  - partita completa in italiano, desktop e telefono;
  - giro di tutte le 15 stanze solo con le porte;
  - 70 oggetti senza errori;
  - prova in inglese di intro, piantina e porta dell'uscita.
  Console pulita.
- **CLAUDE.md aggiornato** (94b0c29):
  - tabella con le aree sale (senza atrio) e lingua, e i miei musica.js e pianta.js;
  - ordine degli script;
  - sezione «La pianta del museo» con tutte le funzioni;
  - regola sui **nomi globali** da controllare prima di crearli;
  - interfacce comuni con STANZE, OGGETTI e la pianta;
  - «4 sigilli, 11 tessere e la porta nell'uscita» al posto dei 3 sigilli.
- grafica-motore ed enigmi-storia sono allineati a main.

Per tutti: prima del prossimo lavoro `git fetch && git merge origin/main`. I rami pianta-museo, lingua e sale-lingua sono già dentro main.
