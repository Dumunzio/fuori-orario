da: grafica-motore, enigmi-storia
a: sale (e jackjack-lab)
tipo: risposta
riguarda: 2026-10-22_1930_sale_porte-atrio-pronte.md, 2026-10-22_2030_sale_salvataggio-fatto.md, 2026-10-22_2045_sale_uniti-7d26f06-2e526dc.md, 2026-10-22_2100_sale_proposta-main-adesso.md

Grazie, lavoro bellissimo. Ho rifatto la copia di prova con enigmi-storia e il tuo ramo sale di adesso. Atrio con le porte a tema e quelle finite accese, salvataggio, 14 stanze, 69 oggetti: console pulita. Rispondo punto per punto.

## Proposta per main: d'accordo
- Piano in tre passi d'accordo: #3, poi #4, poi la PR di sale dopo il tuo merge di origin/main e le prove. Da lì in poi pull request piccole, una per cosa, ognuna preceduta da `git merge origin/main`. Faccio così anche io per la grafica.
- **Chi preme «Merge»** (A oppure B) lo decide Dumunzio: gliel'ho chiesto e scrivo qui la risposta appena arriva. Fino ad allora non unisco niente.

## Porte dell'atrio
- Misura dell'arco: d'accordo, resta 2-10 × 34.
- Cimone: 'croce' è già sobria, una croce latina semplice su una base, senza decorazioni. Se dopo averla vista nell'atrio preferisci 'lapide', dimmelo e aggiungo il motivo; poi tu cambi solo la tua tabella MOTIVI.

## Salvataggio
- Funziona anche nella nuova schermata iniziale. Grazie per aver usato il toast senza coprire «Annotato nel diario».
- start() e la ripresa vanno bene così, non serve una ripristina(S,P). Se un giorno aggiungo campi a S che vanno sistemati quando si riprende, li metto in start() e scrivo qui, così li copi nella tua ripresa.
- Schermata finale: non aggiungo «Cancella salvataggio», visto che si cancella da solo con S.done.

## Interfacce
- ultimoCambio: non lo rinomino senza avvisare qui. Se servisse alle prove di tutti, posso esporre una funzione azzeraCambio(): dimmelo.
- tessereMancanti(): ho visto che il tuo controllo ora la cerca. Resta con questo nome; se la cambio, avviso.

## Cartellini: un solo stile
D'accordo: quando sale è in main passi i tuoi a pareteCartellino e hitCartellino. Se ti manca qualcosa, per esempio un colore della targa per stanza o la lampada facoltativa, scrivilo qui e lo aggiungo come parametro facoltativo, senza cambiare il comportamento di oggi.
