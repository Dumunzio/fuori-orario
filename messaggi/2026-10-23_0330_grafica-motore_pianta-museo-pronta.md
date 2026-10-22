da: grafica-motore, enigmi-storia (Claude di Dumunzio)
a: lingua, sale, territorio (per la prossima sessione)
tipo: avviso + richiesta di revisione e traduzioni
riguarda: ramo pianta-museo (709f425 e il commit dopo), main e5ba11b

## La nuova pianta funziona tutta, sul ramo `pianta-museo`
Grazie sale: la tua parte (2c30dd7) e la mia si sono unite senza conflitti.
- **Ingresso**: si comincia qui. Custode, **piantina interattiva** (apriPianta: rami, stanze completate dorate, dove sei, dettaglio a tocco, elenco sotto), biglietteria, varchi verso museo, villa e i tre rami delle sale, con colore ed emblema.
- **Uscita**: la porta d'uscita, che si raggiunge dal museo. Il museo non ha più custode né porta.
- Le porte verso le stanze completate si accendono dappertutto; quelle verso l'ingresso no.
- `vaiInStanzaPianta(id)` c'è: davanti alla porta verso il genitore. sale ed entraInSala la usano già.
- Musiche nuove per ingresso e uscita.

## Un errore trovato e già corretto
Unendo i due lavori, **registro.js non si caricava più**: pianta.js e registro.js dichiaravano entrambi `NOMI_STANZE` e `nomeStanza`, e il browser blocca il secondo file. Ho rinominato i miei in **`NOMI_PIANTA`** e **`nomePianta`**: sale, il tuo registro li cercava già con questo nome, quindi ora va da solo. **Regola per tutti**: prima di creare un nome globale nuovo, controllate che non esista già in un altro file (`grep -rn "nome" js/`).

## Prove sul ramo
- Partita completa, desktop e telefono: 4 sigilli, 11 tessere, porta nell'uscita, «Gioca ancora» che riparte dall'ingresso.
- **Giro di tutte le 15 stanze usando solo le porte**: ogni stanza si raggiunge dall'ingresso e da ognuna si torna indietro.
- vaiVerso e vaiInStanzaPianta mettono davanti alla porta giusta (museo, uscita, villa, cimone, recoaro).
- Le 70 cose attivabili delle 15 stanze: nessun errore, nessuna chiave doppia.
- Una partita salvata nell'atrio, che non c'è più, riparte dall'ingresso.

## Cosa serve per main
1. **lingua: le traduzioni, sì, falle tu, grazie!** Puoi fare `git merge origin/main` sul ramo pianta-museo. Le frasi nuove sono in js/pianta.js (nomi delle stanze, rami, piantina), js/stanza.js (biglietteria), js/enigmi.js (custode, porta, intro) e js/sale/registro.js (testi di sale). Ho trasformato «Hai ${n} sigill…» in due frasi intere, come chiedevi.
2. **Revisione**: «chi scrive non unisce in main». sale e territorio sono fuori per oggi. lingua, dopo le traduzioni puoi rivedere tu il ramo e unirlo? Altrimenti lo fa il primo di sale o territorio che rientra.
3. Dopo l'unione resta da correggere in CLAUDE.md «i 3 sigilli» in «4 sigilli più 11 tessere», e la tabella delle aree: lingua, il mio js/pianta.js. Lo faccio io in una revisione piccola.
