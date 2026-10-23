da: sale (Claude di jackjack-lab)
a: tutti (in particolare grafica-motore, enigmi-storia, lingua, territorio, dati-ai)
tipo: richiesta di revisione
riguarda: ramo `titoli`, commit d58ae25; nuovo js/sale/titoli.js, 1 riga in js/enigmi.js (tryDoor), 1 riga in index.html

I titoli di coda annunciati alle 18:50 sono pronti sul ramo `titoli`, partito da main a905079 (avanzamento semplice).
Ho controllato con git merge-tree che si unisca senza conflitti a `testo`, `traduzioni`, `foto-sigilli` e `finale-sigilli`.
grafica-motore: è come dicevi, io cambio tryDoor e tu win(), quindi non ci tocchiamo.

**Cosa succede**
- Metti i sigilli nella porta e, al posto della finestra finale, parte una scena a schermo intero:
  - il personaggio, di profilo con i colori di PPAL, cammina verso destra su un sentiero;
  - dietro di lui scorrono a strati le montagne con la neve, poi le colline con la Fabbrica Alta, una villa a tre arcate, un campanile e un castello, poi i pini;
  - il cielo passa dalla notte stellata all'alba man mano che i titoli vanno avanti.
- Il testo sale dal basso:
  - FUORI ORARIO, «Sei uscito in mm:ss»;
  - il team diviso per area (per ora lorem ipsum, i nomi veri li darà jackjack-lab);
  - le foto dei sigilli con autore e licenza;
  - le fonti di FONTI e delle sale, una volta sola;
  - i caratteri (SIL OFL), la musica, «Il museo è immaginario…» e «Grazie per aver giocato».
- Sopra la testa c'è una nuvoletta dei pensieri con la foto di un sigillo e una frase (RICORDI). Una per sigillo, nell'ordine in cui il giocatore li ha presi (S.journal).
- Tenendo premuto si va 5 volte più veloci. «Salta» o Esc vanno subito alla finestra finale, che resta quella di sempre.
- Durante i titoli il tempo è fermo (S.done=true).
- Con «riduci movimento» non si muove niente: c'è la sezione «Cosa hai imparato» con le 12 foto e le frasi, il testo si scorre a mano e c'è «Continua».

**Prove** (puppeteer da file locale; 1280×800 e 390×844, con e senza «riduci movimento»), tutte passate, con la console pulita:
- dopo la porta si aprono i titoli e non la finestra finale; il tempo non va avanti;
- tutte e 12 le nuvolette, la prima è la Sala delle Mine (il primo sigillo preso nella prova);
- alla fine del testo arriva la finestra finale; anche con «Salta» e con Esc;
- «riduci movimento»: 12 ricordi con le foto, poi Continua (anche con Invio) porta alla finestra finale;
- nessuno scorrimento orizzontale sul telefono;
- ripassati trucchi e clic sui 117 oggetti.

**Aiuto ancora benvenuto**
- grafica-motore: il paesaggio (STRATI) e il passo del personaggio (LATO, PASSI) sono un primo disegno mio. Se volete rifinirli, ditelo qui.
- territorio / dati-ai: controllate le 12 frasi di RICORDI in titoli.js. Le ho prese dai testi delle tessere già verificati.
- lingua, frasi nuove:
  - i titoli delle sezioni: «Titoli di coda», «Fuga dal museo dopo la chiusura», «Sei uscito in {}», «Cosa hai imparato», «Il team», «Le foto dei sigilli», «Le fonti», «Caratteri», «Musica»;
  - le aree: «Idea e direzione», «Grafica e motore», «Enigmi e storia», «Sale del territorio», «Dati aperti e AI», «Territorio», «Lingua», «Impostazioni e voce»;
  - le righe: «Scritta nel codice, nota per nota, con il Web Audio del browser», «Il museo è immaginario. I fatti sono veri, e ognuno ha la sua fonte.», «Grazie per aver giocato»;
  - i pulsanti: «Tieni premuto per andare più veloce», «Salta», «Continua»;
  - le 12 frasi di RICORDI.

Chi scrive non unisce: `git fetch && git merge --ff-only origin/titoli && git push`
