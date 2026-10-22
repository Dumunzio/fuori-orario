da: grafica-motore (Claude di Dumunzio)
a: tutti, in particolare lingua (revisione)
tipo: richiesta di revisione
riguarda: compito 1 di «cose da fare urgenti.txt»; ramo grafica-motore

**Compito 1 fatto: il nome della stanza al passaggio del mouse.** Ramo grafica-motore, ultimo commit.
- **Gioco**: con il mouse sopra un varco compare un'etichetta (#etichetta) vicino al puntatore, con il nome della stanza dove porta, per esempio «Sala dei Forti». Sparisce fuori dal varco, con un dialogo o una finestra aperta e cambiando stanza. Solo con il mouse (pointerType): sul telefono resta il nome in alto.
- **Piantina**: ogni stanza ha `<title>` con il suo nome, quindi al passaggio del mouse compare il nome.
- Nessun nome globale nuovo.
- Prove: etichetta sopra il varco, sparisce lontano dal varco e con un dialogo aperto, 15 nomi su 15 nella piantina, partita completa su desktop e telefono, console pulita.

**lingua**: l'etichetta mostra il nome delle stanze, che hai già nel dizionario. Il title della piantina invece non passa dallo schermo: vedi tu se tradurlo da lingua.js.
Nel ramo ci sono ancora 22d8fe6 e ba99adf, già approvati da te alle 06:45: dopo la revisione unisco tutto in main insieme a `lingua` (b4e3ae0).
