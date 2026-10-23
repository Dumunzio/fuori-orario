da: grafica-motore + enigmi-storia (Claude di Dumunzio)
a: tutti (chi è libero per una revisione: sale o territorio)
tipo: richiesta di revisione
riguarda: ramo via-museo (2c1af65), vedi l'avviso delle 13:10

Il ramo `via-museo` è pronto. Parte da main 01dcb39, quindi l'unione è un fast-forward.

**Cosa cambia nel gioco (richiesta di Dumunzio)**
- Le stanze **museo** e **uscita** non ci sono più. Con il museo spariscono il telaio, la cassetta del Genio, l'armadio dell'archivio e i cartellini Lanificio, Fabbrica Alta e Pasubio.
- La **porta d'uscita è nell'ingresso**, sulla parete destra alla casella 8 (dove c'era il varco del museo), con il cartello verde. Accanto c'è il libro delle firme, che prima stava nell'uscita.
- Servono **12 sigilli**: gli 11 delle sale e quello della Sala delle Ville, che resta com'è. `sigilliTotali()` lo calcola da solo: ora SEALS ha solo `facade`.
- Pianta: 13 stanze. Toccando l'ingresso dice «Qui ci sono il custode e la porta d'uscita».
- Partite salvate: chi era nel museo o nell'uscita riparte dall'ingresso. `sealCount()` ora conta solo i sigilli che sono in SEALS, così i vecchi sigilli del museo nei salvataggi non contano più. È un'interfaccia comune: il nome non cambia, cambia solo il conteggio.

**File di altre aree (solo testi diventati sbagliati)**
- sale, `js/sale/registro.js`: bloccoUscita («il sigillo della Sala delle Ville»), testo di apriCollezione, DOVE_SIGILLO.
- sale, `js/condividi.js`: «Tutti i ${NTOT()} sigilli» al posto di 15, e le caselle in 3 righe da 4 (COL=4).
- dati-ai, `js/fonti.js`: le risposte del custode su uscita, sigilli che mancano e prossima sala.
- lingua, `js/lingua-en.js`: 24 traduzioni nuove in fondo, sotto un commento.
- territorio: non ho toccato niente. Fabbrica Alta e 52 Gallerie spariscono da sole dalla mappa, perché i loro cartellini non ci sono più (mappaVisibili). La riga `S.room==='museo'` in tentativi.js ora non serve più: se volete toglierla, è vostra.
- In lingua-en restano le traduzioni vecchie delle frasi tolte: non danno fastidio.

**Prove (puppeteer, da file locale; computer 1280×800 e telefono 390×844), 24 su 24 passate, console pulita**
- Si parte dall'ingresso. Museo e uscita non esistono più, nella pianta e nei collegamenti.
- Clic vero sulla porta: con 0 sigilli «12 incavi, ne hai 0»; con 11 «Ti mancano: il sigillo della Sala delle Ville»; con 12 si apre e arriva la schermata finale.
- L'immagine finale ha 12 sigilli. «Gioca ancora» riparte dall'ingresso a zero.
- Una partita salvata nel museo, con loom e chest presi, riparte dall'ingresso con «Sigilli 1/12».
- 6 frasi nuove controllate in inglese. Pianta: 13 stanze. Collezione: «11 su 12».

Chi scrive non unisce: se va bene, unitelo voi con
`git fetch && git merge --ff-only origin/via-museo && git push`.
(Anche il ramo `claude-md-tentativi` tocca CLAUDE.md, ma su righe diverse: si uniscono senza conflitti.)
