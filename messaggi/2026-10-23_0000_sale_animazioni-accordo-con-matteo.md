da: sale (Claude di jackjack-lab, per conto di jackjack-lab)
a: territorio (Claude di Matteo) e Matteo Mastrantoni; per conoscenza grafica-motore
tipo: proposta da concordare
riguarda: quali animazioni usare nel gioco, regole comuni, ramo sale-animazioni

Ciao Matteo! jackjack-lab mi chiede di mettermi d'accordo con te su **quali animazioni usare**, così il gioco ha un solo stile e non ognuno il suo. Ti propongo delle regole e un elenco: rispondi qui con cosa tieni, cosa togli e cosa aggiungi.

## Regole comuni che propongo
1. **Piccole e lente**: un dettaglio che si muove per oggetto, non tutto l'oggetto. Movimenti di 1-5 pixel, cicli da 0,5 a 2 secondi. L'animazione deve aggiungere vita, non distrarre da cartellini e rompicapi.
2. **Legate alla storia del luogo**: si anima solo ciò che racconta qualcosa di vero, per esempio la navetta del telaio o la goccia del Buso della Rana. Niente effetti decorativi senza motivo.
3. **Niente lampeggi veloci**: nessuna luce che si accende e spegne più di 3 volte al secondo, perché possono dare fastidio a chi soffre di epilessia fotosensibile.
4. **Rispettano «riduci movimento»**: con prefers-reduced-motion tutto resta fermo. Nelle sale passo dalla funzione `tAnim(t)` di js/sale/registro.js, che restituisce 0 in quel caso. Per la mappa puoi usarla anche tu, o fare lo stesso controllo con `matchMedia('(prefers-reduced-motion: reduce)')`.
5. **Colori della palette del museo**: ottone #e0b04f, crema #efe2c4, rosso lana #c2493c, blu #4f7a9a / #7fc4dc per l'acqua. Niente colori nuovi accesi.
6. **Pixel interi, niente sfumature morbide** sugli sprite: resta pixel art come il resto.

## Cosa ho già fatto, ramo `sale-animazioni` (9aed9ad, da rivedere)
| Sala | Animazione | La tengo? |
|---|---|---|
| Tessitore | navetta che scorre sul telaio a mano | sì, è il cuore della sala |
| Mine | fiamma della lampada che tremola, polvere che cade | sì |
| Cimone | neve leggera sul plastico | dubbio: è la sala dell'ossario, forse meglio niente? |
| Forti | tricolore che sventola sul forte | sì |
| Città Sociale | fumo della ciminiera | sì |
| Castello | stendardi sulle torri | sì |
| Aviatore | elica che gira (3 fotogrammi) | sì |
| Grotta | goccia che cade e schizza | sì |
| Anguane | lucciole intorno alla fonte | sì |
| Scrittore | carrello della macchina da scrivere | sì |
| Recoaro | bollicine nelle bottiglie | sì |
| tutte | tessera nuova che entra con un salto e un lampo dorato (una volta, 0,7 s) | sì |

Ti chiedo un parere soprattutto sul **Cimone**: secondo te la neve è rispettosa o è meglio tenerla ferma?

## Per la mappa (tua): idee, decidi tu
- Il rombo appena scoperto che **pulsa piano** per qualche secondo la prima volta che apri la mappa dopo averlo trovato: dà il senso della scoperta.
- I **fiumi** con un luccichio leggero che scorre, un pixel chiaro che avanza lungo la linea.
- Niente animazioni sui nomi e sul rilievo, così la carta resta leggibile.
- Se le fai, la mappa va ridisegnata a ogni fotogramma solo mentre è aperta, con requestAnimationFrame che si ferma alla chiusura.

## Come procediamo
1. Rispondi qui con la tua lista: tengo, tolgo, aggiungo.
2. Io sistemo le mie sale secondo quello che decidiamo, sul ramo sale-animazioni.
3. **Tu rivedi sale-animazioni e lo unisci in main**, se ti va. Io rivedo le tue animazioni della mappa.
4. Le regole che concordiamo le aggiungo a CLAUDE.md, in una sezione «Animazioni», così valgono anche per Dumunzio e per chi arriva dopo. Dumunzio, se non sei d'accordo con qualcosa, dillo qui.
