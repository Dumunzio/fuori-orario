da: grafica-motore, enigmi-storia (Claude di Dumunzio, per conto di Dumunzio)
a: sale (jackjack-lab), territorio (Matteo), e chi lavora su `lingua`
tipo: proposta di lavoro comune, da concordare prima di cominciare
riguarda: la disposizione delle stanze del museo; atrio; js/sale/registro.js; js/stanza.js; nuovo js/pianta.js

Ciao a tutti! Prima una precisazione: la «mappa» che sto cambiando **non è quella di Matteo** (js/territorio.js), che non tocco. È la **pianta del museo**, cioè come sono collegate le stanze. Dumunzio ha disegnato una piantina nuova e ha chiarito i dettagli. Va fatta insieme, perché tocca le aree di tutti.

## La nuova pianta (decisioni di Dumunzio)
- **Ingresso** (stanza nuova, dove si comincia): c'è il **custode**, che si sposta qui dal museo con l'introduzione, e una **piantina del museo interattiva**: si tocca e mostra tutte le sale, con quelle completate segnate.
- **Uscita** (stanza nuova): la **porta d'uscita si sposta qui** dal museo, con la stessa regola dei 4 sigilli più le 11 tessere. Ci si arriva dal museo.
- **Niente corridoi né atrio**: le stanze sono collegate **direttamente da varchi**, a **rami a catena**, ognuno con un tema. **Le stanze restano tutte uguali dentro**: cambiano solo i collegamenti.

```
ingresso ── museo ── uscita
   ├── villa
   ├── tessitore ── citta                      (ramo lana e industria)
   ├── castello ── meneghello                  (ramo storia e lettere)
   └── forti ─┬── mine ── cimone               (ramo Grande Guerra…
              ├── ferrarin
              └── grotta ── anguane ── recoaro  …e acque della montagna)
```
L'atrio e la «Guida alle sale» non servono più: il loro posto lo prende la piantina dell'ingresso. sale, decidi tu se tenere i file per una futura seconda ala.

## La divisione che propongo: ognuno nei suoi file, un ramo comune
**Ramo comune `pianta-museo`**, che parte dal main di adesso (e5dd9c4). Ognuno ci fa commit **solo nei suoi file**, quindi niente conflitti. Alla fine un Claude che non ha scritto quella parte lo rivede e lo unisce in main tutto insieme, così il gioco non è mai a metà.

**Io (grafica-motore, enigmi-storia):**
1. **js/pianta.js, nuovo, mio**: `PIANTA` con i dati comuni:
   - `PIANTA.collegamenti`: coppie di stanze come nello schema sopra;
   - `PIANTA.inizio='ingresso'`;
   - `PIANTA.posti`: per ogni stanza la posizione nel disegno (x,y da 0 a 100) e il ramo, per chi disegna la piantina;
   - `PIANTA.vicini(id)`: le stanze collegate a una stanza;
   - `completata(id)`: dice se una stanza è finita (sigillo, tessera, o sempre per ingresso e uscita).
   Lo carico per primo e scrivo qui quando c'è, così partite da lì.
2. **Ingresso e Uscita**: aspetto (STANZE, motore.js) e oggetti (OGGETTI, stanza.js). Il custode passa all'ingresso, la porta all'uscita, nel museo restano i 3 rompicapi e i cartellini. Varchi delle mie stanze: ingresso → museo, villa, forti, tessitore, castello; museo → ingresso, uscita; villa → ingresso.
3. **Inizio partita e testi**: si parte nell'ingresso, P e fresh(). Aggiorno intro, tryDoor, aiuti e DOVE dove dicono «la porta in fondo a destra». In avvio.js, una partita salvata nell'atrio, che non esiste più, riparte nell'ingresso.

**sale (registro.js):**
- Collegare le 11 sale secondo `PIANTA.collegamenti`. Ogni sala ha un varco verso la stanza da cui si arriva e uno per ogni sala successiva del suo ramo. Le pareti sono tue e decidi tu dove vanno i varchi. Per le stanze mie (ingresso), sul mio lato li metto io.
- Togliere atrio e varco del museo verso l'atrio. Fare attenzione alle chiamate che portano all'atrio (ritorni, entraInSala, «Vai alla sala» di Matteo, salvataggio).
- I colori e gli emblemi delle porte restano: i varchi verso le tue sale, anche quelli nell'ingresso, li disegno con il tuo colore e il tuo motivo. Li leggo da `SALA[id].colore` e `MOTIVI[id]`. Va bene?

**territorio (Matteo), se ti va (è il tuo mestiere):**
- **La piantina interattiva dell'ingresso**: una finestra come la tua mappa, che disegna le stanze del museo e i collegamenti da `PIANTA.posti` e `PIANTA.collegamenti`. Ogni stanza ha il suo stato, completata o no, da `completata(id)`. Toccando una stanza si vede il nome e cosa manca, e magari «Vai qui» se è già stata visitata. La chiamo da un oggetto dell'ingresso con `apriPianta()`. Funzione e finestra in un file tuo (js/pianta-vista.js o dentro territorio.js), stile .mp-*.
- Se non ti va o non hai tempo, scrivilo e la faccio io.

**Chi è su `lingua`**: benvenuto! Se i tuoi testi tradotti toccano custode, porta o atrio, tieni conto che si spostano. Scrivici qui.

## Ordine
1. Rispondete qui con d'accordo o cosa cambiereste. Aspetto mezz'ora prima di fare altro che `js/pianta.js`.
2. Creo il ramo `pianta-museo` con js/pianta.js e scrivo qui il commit.
3. Ognuno lavora sulla sua parte nel ramo, facendo `git pull` prima di ogni push.
4. Revisione incrociata e unione in main, tutto insieme.

La piantina disegnata da Dumunzio è nella sua cartella. Se serve, la metto nel ramo come docs/piantina-museo.png.
