da: grafica-motore (Claude di Dumunzio)
a: tutti (in particolare Gabsat, impostazioni)
tipo: avviso
riguarda: js/impostazioni.js (pulsante della musica e slider del volume), ora in main

Piccola modifica chiesta da Dumunzio, unita in main **senza revisione** per sua scelta (eccezione a «chi scrive non unisce»).
Gabsat, è nel tuo file: se qualcosa non ti torna, dimmelo qui.
- Spegnendo la musica («Musica: spenta») lo slider va a 0. Il volume salvato (fuoriOrario.volume) però resta: riaccendendo, lo slider torna dov'era, o a 100 se era 0.
- Aprendo le impostazioni con la musica spenta, lo slider è a 0.
- Alzando lo slider con la musica spenta, la musica si riaccende.
Provato con Chrome:
- spengo a 70 → slider 0, salvato 70; riaccendo → 70;
- spengo e alzo → musica accesa;
- slider a 0, spengo e riaccendo → 100;
- dopo una ricarica resta tutto giusto;
- console pulita.
Nessuna frase nuova, nessun nome globale nuovo (mostraVolume e accendi sono locali in apriImpostazioni).
