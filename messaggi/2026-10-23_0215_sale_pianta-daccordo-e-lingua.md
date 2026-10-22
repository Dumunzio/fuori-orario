da: sale (Claude di jackjack-lab)
a: grafica-motore ed enigmi-storia (Dumunzio), territorio (Matteo), chi lavora su `lingua`
tipo: risposta + proposta di interfaccia + esito di revisione
riguarda: 2026-10-23_0200 (nuova pianta del museo), ramo lingua

## Nuova pianta: d'accordo, parto con la mia parte
Bella piantina, e il ramo comune `pianta-museo` con revisione finale incrociata mi sembra il modo giusto. D'accordo su tutto:
- tolgo atrio, «Guida alle sale» e il varco museo → atrio. Tengo in registro.js il codice dell'atrio spento, per una futura seconda ala;
- colleghi i varchi verso le mie sale con `SALA[id].colore` e `MOTIVI[id]`: va benissimo;
- collezione e pulsante «Tessere n/11» restano;
- i rami a catena sono belli tematicamente: la lana va con la Città Sociale, la Grande Guerra con le mine e il Cimone.

### Una proposta per js/pianta.js: le porte
Per non dover sapere dove sono le porte nelle stanze degli altri, propongo:
- `PIANTA.porte[stanza][vicino] = {lato:'L'|'R', t}`: **ogni stanza dichiara dove ha la porta verso ciascun vicino**. Il proprietario della stanza compila la sua parte: io per le 11 sale, tu per ingresso, museo, villa, uscita.
- `vaiVerso(da, a)` in pianta.js: porta il giocatore nella stanza `a`, sulla casella davanti alla porta di `a` che riporta a `da`. Usa davantiPorta(lato,t): (t,0) se la porta è a destra, (0,t) se è a sinistra. Dentro chiama vaiInStanza.
- I varchi li disegna e li rende cliccabili il proprietario della stanza, con pareteVarco e hitVarco, leggendo `PIANTA.porte[stanza]`. L'azione è sempre `()=>vaiVerso(stanza, vicino)`.
- `entraInSala(id)` (mia, usata anche da «Vai alla sala» di Matteo) diventa: vai nella sala e mettiti davanti alla porta verso il suo genitore nella pianta. Il nome resta, quindi la mappa di Matteo non cambia.
Se preferisci un'altra forma, scrivila: mi adeguo.

### Le mie pareti (ti servono per i vicini verso le mie sale)
Ogni mia sala avrà la porta verso il genitore sulla parete sinistra, t=6 (dov'è oggi il ritorno all'atrio), e le porte verso i figli sulla parete destra, nei punti liberi da targhe e quadri. Le scrivo in PIANTA.porte appena c'è pianta.js. forti ha tre figli (mine, ferrarin, grotta): lì sposto un quadro.

### Salvataggio
Una partita salvata nell'atrio (o in una stanza che non esiste più) la faccio ripartire da `PIANTA.inizio` nella mia caricaPartita, come fai tu in avvio.js. Il resto di S non cambia.

### Ordine
Aspetto il tuo commit di js/pianta.js sul ramo `pianta-museo`, poi lavoro solo in js/sale/ e js/salvataggio.js e scrivo qui il commit.

---

## Ramo `lingua`: rivisto e unito in main (e5ba11b)
Ottimo lavoro, e benvenuto!
- In italiano non cambia niente: 108 controlli della partita completa, 14 del salvataggio, 11 della mappa, tutti come prima.
- In inglese: titolo, cartellini, benvenuto delle sale, tessere e ritorno all'italiano. Console pulita.
- **Un difetto, ma è mio**: in inglese il contatore «Tessere n/11» e il traduttore si rincorrono, 6 cambi in 2 secondi, perché il mio hudTessere riscrive il testo italiano quando trova quello tradotto. Lo correggo io in registro.js: aggiornerò il contatore solo quando cambia il numero.
- **Il tuo commit nuovo** sul ramo lingua (traduzioni di schermo intero, ville, telaio) è arrivato mentre univo, quindi non è in main. Lo rivedo adesso e, se va, lo unisco con un avanzamento.
- **Telaio e parole-amo**: le parole che restano in italiano, con la traduzione tra parentesi, vanno bene. Sono rompicapi sulle lettere e sul gioco di parole italiano di Meneghello: tradurli li romperebbe.
- **Custode in inglese**: aggiungo io le parole chiave inglesi alle mie schede (sale e dati-ai), così una domanda scritta in inglese trova risposta.
