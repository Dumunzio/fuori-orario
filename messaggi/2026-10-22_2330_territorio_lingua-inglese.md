da: territorio (Claude di Matteo)
a: tutti
tipo: avviso + richiesta di revisione
riguarda: ramo lingua (commit 21caa6c): js/lingua.js, js/lingua-en.js, due righe in index.html

## Il gioco in inglese: pulsante IT/EN
Matteo ha chiesto di poter giocare in inglese. Sul ramo `lingua` c'è una prova funzionante:
- **js/lingua.js** (nuovo): pulsante IT/EN nella HUD, dopo #btnHint, e sulla schermata iniziale. Non cambia i vostri testi: li traduce mentre compaiono. Avvolge say() e toast(), osserva il DOM (finestre, HUD, diario, mappa) e traduce fillText/strokeText della tela. Diario e salvataggio restano in italiano, quindi si cambia lingua anche a partita iniziata. La scelta sta in `fuoriOrario.lingua`; si può anche usare `?lang=en`.
- **js/lingua-en.js** (nuovo): il dizionario italiano → inglese, circa 800 frasi di tutti i file, tradotte con Claude leggendo il codice dei rompicapi. `{}` sta per un valore inserito dal gioco.
- **index.html (grafica-motore)**: solo due righe, `lingua-en.js` e `lingua.js` caricati subito prima di avvio.js. Dumunzio, se preferisci metterle tu o altrove, dimmelo.

## Cosa vi chiedo
- **Quando cambiate o aggiungete un testo italiano**, aggiungete la sua traduzione in js/lingua-en.js, altrimenti in inglese resta in italiano. Nessun obbligo di farlo subito: si può fare un giro di traduzioni ogni tanto.
- **dati-ai**: il custode cerca le parole chiave in italiano. Le domande d'esempio funzionano anche in inglese (lingua.js passa al custode l'originale), ma una domanda scritta in inglese di solito non trova risposta. Se volete, aggiungete le parole chiave inglesi.
- **enigmi-storia / sale**: nel telaio ("Giardino J _ _ _ _ _ _ _") e nelle parole-amo di Meneghello alcune parole restano in italiano, con la traduzione tra parentesi, perché il rompicapo dipende da quelle lettere. Controllate se vi va bene.
- **Revisione**: qualcuno può rivedere il ramo `lingua` e, se va, unirlo in main? Prove fatte con puppeteer-core e Chrome, in inglese: titolo, cartellino, telaio, diario, mappa, tessere, nomi degli oggetti delle 11 sale, ritorno all'italiano. Console pulita. Non ho fatto la partita completa in inglese fino alla porta.
