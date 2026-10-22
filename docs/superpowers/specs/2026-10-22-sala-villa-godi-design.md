# Sala di Villa Godi e sistema a più stanze

Data: 22/10/2026 · Aree: grafica-motore + enigmi-storia · Stato: approvato in chat, da rivedere per iscritto

## Obiettivo

Il museo oggi è una stanza sola con 3 sigilli. Aggiungiamo una **seconda stanza dedicata a Villa Godi** (Lugo di Vicenza, la prima villa di Andrea Palladio), raggiunta da un varco nella sala principale. Dentro c'è un rompicapo sulla **facciata simmetrica** che dà un **quarto sigillo**. Per uscire servono 4 sigilli.

Il lavoro risponde a due obiettivi di partenza in CLAUDE.md: "più sale, passaggio tra sale" (grafica-motore) e "nuove sale: … Ville …" (enigmi-storia). Il gioco resta da casa.

**Riuscito quando:** si gioca dall'inizio alla fine con 4 sigilli; si passa tra le stanze con tastiera, clic e touch; tutto ciò che funziona oggi continua a funzionare; console senza errori; si gioca a larghezza telefono.

**Fuori da questo lavoro:** un custode nella villa (il pulsante Aiuto funziona ovunque), una mappa del territorio, altre sale. Il sistema a stanze però le rende facili da aggiungere.

## Divisione tra le aree

| Pezzo | Area | File |
|---|---|---|
| Sistema a più stanze, aspetto delle stanze, varco, passaggio con dissolvenza, HUD con N sigilli, `fresh()` con i sigilli presi da `SEALS` | grafica-motore | `js/motore.js`, `js/avvio.js`, `index.html`, `css/style.css` |
| Oggetti delle due stanze, rompicapo della facciata, cartellini, sigillo e aiuti nuovi, testi "tre sigilli" → numero giusto | enigmi-storia | `js/contenuti.js`, `js/stanza.js`, `js/enigmi.js` |
| Verifica dei fatti su Villa Godi e Palladio, voci in `FONTI` e `CONOSCENZA` | dati-ai (richiesta in bacheca) | `js/fonti.js` |
| Villa Godi in `LUOGHI_REALI` (Wikidata, coordinate, foto con licenza) | territorio (richiesta in bacheca) | `js/territorio.js` |

Ordine: prima grafica-motore (pull request su `main`), poi enigmi-storia unisce `main` e aggiunge la sala. Finché la sala non esiste, il motore funziona con la sola stanza del museo, identica a oggi.

## 1. Sistema a più stanze (grafica-motore, `js/motore.js`)

**Aspetto delle stanze.** Un oggetto `STANZE` descrive come è fatta ogni stanza:

```js
const STANZE={
  museo:{w:12,h:10,ox:148,oy:64,zona:(x,y)=>…,pav:{…},pareti:g=>{…},luci:[…]},
  villa:{w:8,h:8,ox:…,oy:…,zona:()=>'villa',pav:{villa:[…]},pareti:g=>{…},luci:[…]}
};
```

- `w,h`: dimensioni della griglia (oggi le costanti `MW,MH`).
- `ox,oy`: origine del disegno isometrico, per centrare stanze di misure diverse (oggi `OX,OY`).
- `zona`, `pav`: zone e colori del pavimento (oggi `zone` e `ZP`).
- `pareti(g)`: quadri, finestre e cartelli sulle pareti (oggi in fondo a `buildBg`).
- `luci`: luci fisse oltre a quelle degli oggetti (oggi la finestra e la lanterna del custode).

`MW,MH,OX,OY` diventano `let` e cambiano quando si cambia stanza: `iso`, `walkable`, il clic sul pavimento e tutto il resto le leggono come oggi, senza modifiche.

**Sfondi in cache.** `buildBg()` disegna la stanza corrente; lo sfondo di ogni stanza si disegna una volta sola e si tiene in memoria.

**Stato.** `S.room` ('museo' all'inizio) dice dove sei. `fresh()` costruisce `S.seals` e `S.hint` dalle chiavi di `SEALS`, invece di elencarle a mano.

**Oggetti.** `OBJ` resta l'interfaccia comune "oggetti della sala corrente", ma diventa `let` e la assegna il motore: `OBJ=OGGETTI[S.room]`. `OGGETTI` la definisce enigmi-storia in `stanza.js` (vedi sotto). Il codice degli altri che legge `OBJ` continua a funzionare.

**Passaggio tra stanze.** Nuova funzione `vaiInStanza(id,x,y)`:
1. dissolvenza al nero (circa 0,25 s; istantanea con `prefers-reduced-motion`);
2. `S.room=id`, aggiorna `MW,MH,OX,OY,OBJ`, mette il giocatore in `(x,y)` e cancella percorso, azione in attesa e tasto tenuto;
3. dissolvenza di ritorno.

Durante la dissolvenza `blocked()` è vero, quindi niente movimento né interazioni.

**Varco.** Il motore disegna i varchi (un'apertura ad arco nella parete) e le stanze li dichiarano tra le loro pareti. Nella sala principale il varco è sulla **parete sinistra all'altezza della casella (0,4)**, tra Lanificio e Archivio. Nella villa è sulla parete sinistra, in basso, per tornare indietro.

**Porta d'uscita.** `drawDoor` e la luce della porta valgono solo nella stanza `museo`.

**HUD.** Le icone dei sigilli in `#seals` si generano da `SEALS`, non sono più 3 `<i>` fissi in `index.html`.

**Ricarica a caldo.** `start(data)` accetta uno stato senza `S.room` (lo tratta come 'museo') e ricostruisce `OBJ` e lo sfondo dalla stanza salvata.

## 2. La sala di Villa Godi (enigmi-storia)

**Oggetti (`js/stanza.js`).** `const OBJ=[…]` diventa:

```js
const OGGETTI={
  museo:[ …gli oggetti di oggi…, {id:'varcoVilla',x:0,y:4,…,act:()=>vaiInStanza('villa',…)} ],
  villa:[ {id:'villa',…,act:()=>openFacade()}, {id:'plaqueGodi',…}, {id:'plaquePalladio',…}, busto, piante, varco di ritorno ]
};
```

Nella villa: il **plastico di Villa Godi** al centro (apre il rompicapo), **due leggii con cartellino** (`godi`, `palladio`), un **busto** decorativo, due **piante**. Pavimento alla veneziana chiaro, pareti color intonaco con una veduta della villa. Disegno a cura di grafica-motore, che aggiunge le funzioni `drawVilla` e `drawBust` in `motore.js` come per gli altri oggetti.

**Cartellini (`js/contenuti.js`).** Due voci nuove in `PLAQUES`, `where:'Sala delle Ville'`. Bozza, tutto **da verificare** (dati-ai):

- `godi` (Villa Godi): costruita a partire dal 1537 a Lugo di Vicenza per i fratelli Godi; è la prima villa progettata da Andrea Palladio; al centro della facciata, tra due ali, c'è una **loggia con tre arcate** raggiunta da una scalinata; dal 1996 le ville di Palladio nel Veneto sono patrimonio UNESCO.
- `palladio` (Andrea Palladio): 1508–1580; nei *Quattro Libri dell'Architettura* (1570) spiega le sue regole; la più importante qui è la **simmetria**: quello che sta a sinistra si ripete a destra, come in uno specchio.

Il rompicapo si appoggia su due fatti, **tre arcate** e **simmetria**, che quindi vanno verificati per primi.

## 3. Il rompicapo della facciata (enigmi-storia, `js/enigmi.js`)

`openFacade()` apre una finestra (`openModal`) con la facciata stilizzata, una griglia di **7 colonne × 2 piani**:

```
            ala sinistra | loggia centrale | ala destra
piano nobile   F    F    |   F   F   F     |   ?    ?
piano terra    F    P    |  [ telo ]       |   ?    ?
```

- **Ala sinistra**: già completa, non si tocca. Volutamente non simmetrica al suo interno (la porta è verso il centro), così copiare non basta: bisogna specchiare.
- **Ala destra**: 4 caselle vuote. Ogni tocco fa scorrere muro → finestra → porta → arco.
- **Loggia centrale, piano terra**: 3 caselle coperte da un telo. Ogni tocco le fa scorrere come sopra. Che siano 3 archi lo dice solo il cartellino `godi`.
- Pulsante **Controlla**. Giusto: ala destra = specchio della sinistra (`F F` sopra, `P F` sotto) e loggia = 3 archi. Sbagliato: la facciata trema (`bad`) e il messaggio dice cosa non va in modo generico ("l'ala destra non rispecchia la sinistra" oppure "la loggia non è quella del cartellino"), senza la soluzione.
- Funziona con tastiera (Tab e Invio sulle caselle) e touch. Le caselle sono pulsanti di almeno 40 px.
- Risolto: `solved('facade',…)`, poi "Prendi il sigillo" come gli altri.

**Sigillo e aiuti (`js/contenuti.js`).**
- `SEALS.facade`: "Sigillo della Villa". Testo: Palladio e la simmetria, Villa Godi prima villa, tre arcate.
- `HINTS.facade`: 1) "Leggi i due cartellini della sala delle Ville: uno ti dice la regola, l'altro quante arcate ha la loggia." 2) "L'ala destra è lo specchio della sinistra: la porta sta vicino al centro. Sotto il telo vanno tre archi."

## 4. Da 3 a 4 sigilli (enigmi-storia)

Il numero si ricava da `Object.keys(SEALS).length` in:
- `grant`: "Sigilli: n su N";
- `talkKeeper`: messaggio con tutti i sigilli;
- `hint`: l'ordine è quello delle chiavi di `SEALS` e il "dove" della villa è "Il plastico di Villa Godi, nella sala delle Ville.";
- `tryDoor`: incavi e conteggio;
- `win`: elenco dei sigilli preso da `SEALS`;
- `intro` e la schermata iniziale in `index.html` (quest'ultima di grafica-motore): "quattro sigilli", con la villa citata.

## 5. Gestione degli errori

- Varco attivato durante un dialogo o una finestra: ignorato (`blocked()`).
- Rompicapo chiuso a metà: le scelte si perdono, come negli altri rompicapi.
- Stato salvato senza `S.room` o con una chiave di sigillo in più o in meno: `start()` lo completa senza errori.

## 6. Verifica

Niente test automatici nel progetto. Prova manuale nel browser, da `index.html` aperto come file locale:
1. partita completa: 3 sigilli nel museo, varco, rompicapo della villa (prima sbagliato, poi giusto), ritorno, porta con 4 sigilli, schermata finale;
2. passaggio tra stanze con tastiera, clic sul varco e comandi touch (emulazione mobile);
3. Aiuto e custode con 0, 1, 3 e 4 sigilli;
4. larghezza 375 px;
5. console senza errori in ogni momento.

Dopo il passo grafica-motore, prima della pull request: partita completa con 3 sigilli identica a oggi.
