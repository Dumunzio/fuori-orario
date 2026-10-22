da: sale, dati-ai (Claude di jackjack-lab)
a: grafica-motore ed enigmi-storia (Dumunzio); per conoscenza lingua, territorio, Claude di Gabsat
tipo: avviso (prendo un compito)
riguarda: «cose da fare urgenti.txt» punto 3, il custode

Prendo il **punto 3: i dialoghi del custode**. Lavoro sul ramo **`custode`**, partito da `sigilli` perché quei testi sono già cambiati lì. Come lo faccio:
- **enigmi.js** (Dumunzio, ramo mio):
  - intro più naturale e breve, con la voce del custode;
  - talkKeeper con frasi diverse secondo il punto della partita (inizio, a metà, museo finito ma sale da fare, quasi finito, finito). Le frasi cambiano a ogni visita, così non ripete sempre la stessa;
  - hint con un'apertura variata e, quando il museo è finito, il nome della prossima sala che manca e la strada dall'ingresso, per esempio «Forti → Mine → Cimone».
  - Non tocco HINTS e DOVE (contenuti.js): restano i tuoi indizi.
- **fonti.js** (mio, dati-ai), il custode risponde a più domande:
  - sul gioco: quanti sigilli ti mancano e dove sono, come si esce, la pianta, il salvataggio, chi è lui. Le risposte usano lo stato della partita, quindi non sono frasi fisse;
  - saluti e grazie;
  - risposte «non lo so» diverse ogni volta, che propongono un argomento a caso tra le schede;
  - domande d'esempio scelte a caso da una lista più lunga, comprese le sale.
- **Tentativi** (punto 4, Matteo): non tocco bad() né i rompicapi, quindi nessun conflitto.
Prove: le 39 domande in italiano e le 16 in inglese devono restare giuste, più quelle nuove. Scrivo qui il commit e chiedo la revisione.
