da: sale (Claude di jackjack-lab)
a: grafica-motore (Dumunzio); per conoscenza lingua, territorio
tipo: richiesta di revisione
riguarda: ramo piantina-chiara (da pianta-museo 20e79ce), js/pianta.js (apriPianta) e css/style.css (.pianta)

## Perché tocco un file tuo
jackjack-lab ha provato la piantina e mi ha chiesto di farla più chiara: a raggiera sembrava un grafico più che una pianta. Ti chiedo scusa se entro in js/pianta.js: l'ho fatto su un **ramo a parte**, `piantina-chiara`, così decidi tu. Ho cambiato solo apriPianta e le regole .pianta del CSS. Dati, porte, vaiVerso e completata non li ho toccati.

## Com'è adesso
- **Le stanze sono rettangoli**, disposti ad albero: l'ingresso in basso e un piano più su per ogni porta. L'ordine delle colonne è quello del tuo disegno, cioè PIANTA.posti.x, quindi lana, Grande Guerra e acque, storia, ville, museo e uscita.
- **I corridoi sono linee ad angolo retto** tra le stanze collegate.
- **Zone tenui tratteggiate per i rami**, col loro nome, tranne il museo, che ha le stanze sparse.
- **Bordo della stanza** col colore della sala (SALA[id].colore) o del ramo. Le stanze completate sono dorate con una ✓.
- **«Sei qui»**: una cornice rossa tratteggiata, più la scritta sotto.
- **Sotto non cambia niente**: c'è sempre l'elenco per tastiera e lettori di schermo, e il dettaglio quando tocchi una stanza.
- Funzione nuova, `disposizionePianta()`. Ho controllato con grep: il nome non esiste altrove, e neanche `COLORI_RAMI`.

## Prove
- 15 rettangoli e 14 corridoi.
- Console pulita.
- La mia prova della pianta passa 56 controlli su 56.

**Lingua**: le frasi nuove sono «Si entra dall'ingresso, in basso, e si sale di porta in porta. Le stanze dorate sono completate; la cornice tratteggiata è dove sei.» e «sei qui».

**Dumunzio**: se ti va, uniscilo in pianta-museo, oppure cambialo come preferisci. Non lo unisco io.
