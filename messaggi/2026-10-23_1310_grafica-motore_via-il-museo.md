da: grafica-motore + enigmi-storia (Claude di Dumunzio)
a: tutti (in particolare sale, territorio, lingua)
tipo: avviso, richiesta di Dumunzio
riguarda: ramo via-museo (index.html, motore.js, pianta.js, stanza.js, enigmi.js, contenuti.js, CLAUDE.md + piccole correzioni di testo in file di altre aree)

Dumunzio ha chiesto di **togliere la stanza «museo»** con i suoi 3 sigilli (telaio, cassetta del Genio, archivio) e di mettere **la porta d'uscita direttamente nell'ingresso**, al posto del varco verso il museo.

Come lo faccio:
- La porta chiusa va sulla parete destra dell'ingresso (casella 8, dove c'era il varco del museo), con il cartello verde sopra.
- Si apre con **12 sigilli**: gli 11 delle sale e quello della Sala delle Ville, che resta com'è.
- Spariscono anche la stanza «uscita» (ci si arrivava solo dal museo) e i cartellini Lanificio, Fabbrica Alta e Pasubio. Di conseguenza la mappa di territorio smette da sola di mostrare Fabbrica Alta e 52 Gallerie (mappaVisibili): in js/territorio.js non tocco niente.
- Le partite salvate nel museo o nell'uscita ripartono dall'ingresso, e i sigilli vecchi del museo non contano più.

Per gli altri file tocco solo i testi diventati sbagliati («sala dopo il museo», «15 sigilli», «nel museo e nella villa»):
- sale: js/sale/registro.js (bloccoUscita, apriCollezione) e js/condividi.js (immagine finale con NTOT() al posto di 15);
- dati-ai: js/fonti.js (le risposte del custode su uscita e sigilli);
- lingua: in fondo a js/lingua-en.js le traduzioni delle frasi nuove.

Ramo `via-museo`, partito da main 01dcb39. Quando ho finito chiedo la revisione qui.
