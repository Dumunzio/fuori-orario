# Sala di Villa Godi: piano di lavoro

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Il museo diventa a più stanze; si aggiunge la Sala delle Ville (Villa Godi) con il rompicapo della facciata e un 4° sigillo.

**Architecture:** `motore.js` legge dimensioni, origine, pavimento, pareti e luci della stanza corrente da `STANZE[S.room]`, e gli oggetti da `OGGETTI[S.room]` (definito in `stanza.js`). `vaiInStanza(id,x,y)` cambia stanza con una dissolvenza. Il numero di sigilli si ricava sempre da `SEALS`.

**Tech Stack:** JavaScript puro in `<script>` classici, canvas 2D, nessuna libreria né build. Test: partita automatica con `puppeteer-core` e il Chrome locale (script fuori dal repo).

**Spec:** `docs/superpowers/specs/2026-10-22-sala-villa-godi-design.md`

## Global Constraints

- Niente librerie e niente build: `index.html` si apre da file locale e funziona.
- Script classici, ordine in `index.html` invariato: `contenuti`, `motore`, `enigmi`, `stanza`, `fonti`, `territorio`, `avvio`. Al caricamento si usa solo ciò che sta nei file precedenti.
- Ogni ramo tocca solo i file della sua area (CLAUDE.md). Unica eccezione concordata: il Task 1 rinomina `OBJ` in `OGGETTI.museo` dentro `stanza.js` sul ramo `grafica-motore`, perché le due cose devono arrivare in `main` insieme. Va annunciato in bacheca.
- Interfacce comuni che restano compatibili: `OBJ` = oggetti della sala corrente; `S`, `P`, `fresh()`, `sealCount()`, `say`, `openModal`, `solved`, `grant`, `hud`.
- Testi in italiano, commit in italiano, brevi. Fatti di Villa Godi segnati "da verificare" finché dati-ai non li conferma in `FONTI`.
- `prefers-reduced-motion`: niente dissolvenza, cambio istantaneo.
- Prima di ogni commit: partita completa senza errori in console, desktop e `--mobile`.

## Review Focus

1. Cambio stanza mentre si cammina, con un percorso da clic o un tasto tenuto premuto: il giocatore deve apparire fermo nel punto d'arrivo, non continuare il percorso della stanza vecchia.
2. Clic sul pavimento della villa: deve portare alla casella cliccata, calcolata con l'origine della villa, non con quella del museo.
3. Stato salvato senza `S.room` o con sigilli diversi da `SEALS` (ricarica a caldo): il gioco riparte nel museo, senza errori.
4. Nella villa la porta d'uscita non esiste: niente disegno, niente luce, non è selezionabile né cliccabile.
5. Doppio tocco sul varco durante la dissolvenza: un solo cambio di stanza.

Ognuno ha il suo controllo nel task che possiede il codice (Task 1 e 2).

## Test

Lo script `partita.js` sta nello scratchpad della sessione:
`C:\Users\Francesco\AppData\Local\Temp\claude\C--Users-Francesco-Desktop-Claude-fuori-orario\8e4f22d6-8d51-42b0-975a-fc0e175be144\scratchpad\partita.js` (in breve `$SP/partita.js`).
Si lancia con `node $SP/partita.js <cartella del repo> [--mobile]`. Gioca tutti i sigilli di `SEALS`, il custode, il diario e la porta. Stampa `OK`/`FAIL` e finisce con `console senza errori`. I task aggiungono controlli con l'helper esistente `ok(cond,msg)`.

---

### Task 1: Motore a stanze, con il solo museo (ramo `grafica-motore`)

**Files:**
- Modify: `js/motore.js` (costanti righe 3-4, `fresh` 11-16, sfondo 31-75, `drawLight` 175-187, `render` 198-207, `hud` 290)
- Modify: `js/avvio.js` (`start`)
- Modify: `index.html:16` (icone dei sigilli)
- Modify: `js/stanza.js` (`const OBJ=[…]` → `const OGGETTI={museo:[…]}`)
- Test: `$SP/partita.js`

**Interfaces:**
- Produces: `STANZE` (oggetto), `let MW,MH,OX,OY,OBJ`, `S.room`, `vaiInStanza(id:string,x:number,y:number):void`, `entraStanza(id:string):void` (assegna variabili e sfondo, senza dissolvenza), `S.fade` (0 = nessuna dissolvenza).
- Consumes: `SEALS` (contenuti.js), `OGGETTI` (stanza.js, letto solo dentro funzioni).

- [ ] **Step 1: Aggiungi i controlli a `partita.js`**, subito dopo `partita iniziata`:

```js
ok(await ev(()=>S.room)==='museo','si parte nel museo');
ok(await ev(()=>document.querySelectorAll('#seals i').length===Object.keys(SEALS).length),'HUD: un\'icona per sigillo');
ok(await ev(()=>Object.keys(S.seals).join()===Object.keys(SEALS).join()&&Object.keys(S.hint).join()===Object.keys(SEALS).join()),'fresh() prende i sigilli da SEALS');
ok(await ev(()=>{held=[1,0];P.path=[[1,1]];vaiInStanza('museo',9,8);return held===null&&P.path.length===0&&P.pending===null&&P.x===9&&P.y===8}),'cambio stanza: percorso e tasto azzerati'); // Review Focus 1
await sleep(700);
ok(await ev(()=>{vaiInStanza('museo',9,8);vaiInStanza('museo',3,3);return S.room==='museo'&&P.x===9}),'doppio cambio durante la dissolvenza: ignorato'); // Review Focus 5
await sleep(700);
```

E prima di `await browser.close()`, un controllo di ricarica (Review Focus 3):

```js
await ev(()=>{const vecchio={...S};delete vecchio.room;start({S:vecchio,P:{x:9,y:8}})});
ok(await ev(()=>S.room==='museo'&&OBJ===OGGETTI.museo),'stato senza S.room: si riparte nel museo');
```

- [ ] **Step 2: Lancia `node $SP/partita.js .`**. Atteso: `FAIL si parte nel museo`, poi un errore su `vaiInStanza`.

- [ ] **Step 3: Implementa**
  - `const VW=320,VH=210,HW=12,HH=6,WH=54;` più `let MW,MH,OX,OY,OBJ=[];`. `iso` resta com'è e legge `OX,OY`.
  - `fresh()`: `seals` e `hint` costruiti da `Object.keys(SEALS)`; `room:'museo'`, `fade:0`.
  - `STANZE.museo={w:12,h:10,ox:148,oy:64,zona,pav,pareti,luci,porta:true}`:
    - `zona` e `pav` sono le `zone` e `ZP` di oggi;
    - `pareti(g)` contiene le chiamate `onWall` di oggi;
    - `luci()` restituisce `[[x,y,r,k],…]` con la lanterna del custode e la finestra (oggi in `drawLight`).
  - `buildBg()` usa la stanza corrente e salva un canvas per stanza in `const sfondi={}`. Lo disegna solo se manca.
  - `entraStanza(id)`: assegna `MW,MH,OX,OY` da `STANZE[id]` e `OBJ=OGGETTI[id]||[]`, poi `buildBg()`.
  - `vaiInStanza(id,x,y)`:
    - se `S.fade` è attivo non fa niente;
    - altrimenti azzera `held`, `P.path` e `P.pending`;
    - con reduced-motion cambia subito (`entraStanza`, poi posiziona `P`);
    - se no, `S.fade` sale da 0 a 1 in 0,25 s, a metà esegue il cambio, poi scende.
    - Il disegno della dissolvenza è un rettangolo nero con alpha `S.fade` dopo `drawLight` in `render`, e `blocked()` restituisce vero se `S.fade>0`.
    - Il cambio sincrono (stanza e posizione) deve avvenire subito, alla chiamata, anche con la dissolvenza; l'animazione è solo visiva. Così i controlli dello Step 1 valgono senza attese.
  - `drawDoor` e il foro di luce della porta solo se `STANZE[S.room].porta`. In `render`, la freccia sull'oggetto selezionato usa `target.hit()` (centro in alto del riquadro) per qualsiasi oggetto con `hit`, non solo `door` (Review Focus 4).
  - `hud()` rigenera le `<i>` in `#seals` se il loro numero è diverso da `Object.keys(SEALS).length`. In `index.html:16` resta solo `<span>Sigilli</span>`.
  - `avvio.js` `start(data)`:
    - completa lo stato salvato: `S.room||='museo'`, `S.fade=0`, e per ogni chiave di `SEALS` assente aggiunge `seals[k]=false` e `hint[k]=0`;
    - poi `entraStanza(S.room)` al posto di `buildBg()`.
  - `stanza.js`: `const OGGETTI={museo:[ …gli oggetti di oggi, invariati… ]};`.

- [ ] **Step 4: `node $SP/partita.js .` e `node $SP/partita.js . --mobile`**. Atteso: solo righe `OK`, compresi `schermata finale con 3 sigilli su 3` e `console senza errori`.

- [ ] **Step 5: Commit e bacheca**

```bash
git add js/motore.js js/avvio.js js/stanza.js index.html
git commit -m "Il motore gestisce più stanze; il museo è la prima"
```

Messaggio in bacheca (`tipo: avviso`, a tutti): `OBJ` ora è `let` e viene da `OGGETTI[S.room]`; c'è `vaiInStanza`; `stanza.js` è stato toccato dal ramo grafica-motore, e perché.

### Task 2: Aspetto della Sala delle Ville e varchi (ramo `grafica-motore`)

**Files:**
- Modify: `js/motore.js` (nuove `STANZE.villa`, `pareteVarco`, `hitVarco`, `drawVilla`, `drawBust`; varco nelle `pareti` del museo)
- Modify: `index.html` (testo della schermata iniziale)
- Modify: `css/style.css` (griglia `.facade` per il rompicapo del Task 5)
- Test: `$SP/partita.js`

**Interfaces:**
- Consumes: Task 1.
- Produces: `STANZE.villa` (8×8, `porta:false`); `hitVarco(side:'L'|'R',t:number):[x,y,w,h]` per gli oggetti varco; funzioni di disegno `drawVilla(o,t)` (plastico della villa, circa 22×26 px, facciata bianca con loggia a tre arcate, ali e scalinata, colonna `h:26`) e `drawBust(o,t)` (busto su colonna, `h:24`). Varchi disegnati nello sfondo: museo, parete `'L'`, `t=4`; villa, parete `'L'`, `t=6`.

- [ ] **Step 1: Aggiungi i controlli a `partita.js`**, dopo quelli del Task 1:

```js
await ev(()=>vaiInStanza('villa',0,6));await sleep(400);
ok(await ev(()=>S.room==='villa'&&MW===8&&MH===8&&P.x===0&&P.y===6),'si entra nella villa');
ok(await ev(()=>!OBJ.some(o=>o.id==='door')&&nearest()?.id!=='door'),'nella villa la porta d\'uscita non c\'è'); // Review Focus 4
const casella=await ev(()=>{const [x,y]=iso(3,5);const r=cv.getBoundingClientRect();return [r.left+x/VW*r.width,r.top+(y+6)/VH*r.height]});
await page.mouse.click(...casella);await sleep(1500);
ok(await ev(()=>P.x===3&&P.y===5),'clic sul pavimento della villa'); // Review Focus 2
await ev(()=>vaiInStanza('museo',0,4));await sleep(400);
ok(await ev(()=>S.room==='museo'&&MW===12),'si torna nel museo');
```

- [ ] **Step 2: Lancia `node $SP/partita.js .`**. Atteso: `FAIL si entra nella villa`, perché `STANZE.villa` non esiste.

- [ ] **Step 3: Implementa**
  - `STANZE.villa`: `w:8,h:8,ox:160,oy:82`, `porta:false`.
    - Una zona `'villa'`, pavimento alla veneziana chiaro (es. `['#d8cbb0','#cfc1a4','#a99a7c']` più puntini casuali fissi).
    - Pareti color intonaco: aggiungi a `wallCol` un parametro con i colori della stanza; il museo usa quelli di oggi.
    - Sulle `pareti`: una veduta di Villa Godi incorniciata sulla parete `'R'` (`t=3`), due finestre alte e il varco di ritorno su `'L'` (`t=6`).
    - `luci`: la finestra e il plastico.
  - `pareteVarco(g,side,t)`: apertura ad arco scura con bordo ottone, disegnata con `onWall`. Si chiama dentro le `pareti` del museo (`'L'`, 4) e della villa (`'L'`, 6).
  - `hitVarco(side,t)`: riquadro cliccabile del varco, come `hit` della porta.
  - `drawVilla`, `drawBust` come in Interfaces, nello stile di `drawFactory` e `drawVitrine`.
  - `css/style.css`: `.facade` griglia di 7 colonne × 2 piani, celle quadrate di almeno 40 px, larghezza massima 100% (a 375 px niente scorrimento orizzontale); `.facade .telo` con un tessuto color crema; i separatori tra ali e loggia con un bordo `var(--line)`.
  - `index.html`, schermata iniziale: "Le porte si sbloccano solo con i sigilli nascosti nelle sale del museo." al posto della frase che elenca i tre oggetti (così non va cambiata a ogni sala).

- [ ] **Step 4: Controlla a vista.** Salva gli screenshot di museo e villa (`page.screenshot`) dopo i passi dello Step 1, desktop e `--mobile`, e guardali. La villa deve stare centrata e leggibile, il varco visibile in tutte e due le stanze. Poi `partita.js` desktop e `--mobile`: solo `OK`.

- [ ] **Step 5: Commit, push, pull request**

```bash
git add js/motore.js index.html
git commit -m "Sala delle Ville: pavimento, pareti, varchi e plastico"
git merge origin/main && git push
gh pr create --base main --head grafica-motore --title "Motore a più stanze e Sala delle Ville (aspetto)"
```

Nella descrizione: il gioco resta identico con una stanza; la villa si raggiunge quando enigmi-storia aggiunge i varchi agli oggetti. Avviso in bacheca con il link.

### Task 3: Sigilli contati da `SEALS` nei testi (ramo `enigmi-storia`)

**Files:**
- Modify: `js/enigmi.js` (`grant`, `talkKeeper`, `hint`, `tryDoor`, `win`, `intro`)
- Test: `$SP/partita.js`

**Interfaces:**
- Consumes: Task 1 (unito con `git merge origin/grafica-motore` finché la PR non è in main).
- Produces: `const NSEALS=()=>Object.keys(SEALS).length` in cima a `enigmi.js`; `DOVE` (oggetto chiave sigillo → frase "dove", oggi dentro `hint`) portato a livello di file, così il Task 5 aggiunge `DOVE.facade`.

- [ ] **Step 1: Aggiungi un controllo a `partita.js`.** Dopo il primo sigillo, il testo del custode contiene `su ${Object.keys(SEALS).length}`:

```js
ok(await ev(()=>{talkKeeper();return $('dText').textContent||full}).then(t=>t.includes('su '+chiavi.length)),'custode: conta i sigilli da SEALS');
```

Poi, come prova a mano, aggiungi in console un sigillo finto (`SEALS.prova={title:'x',text:'y'};fresh()`) e verifica che la porta chieda 4 sigilli. Non va nel commit.

- [ ] **Step 2: Lancia il test.** Atteso: oggi passa con 3 sigilli. Il controllo vero è la prova a mano dello Step 1, che con il codice di oggi fallisce (la porta si apre con 3).

- [ ] **Step 3: Implementa.** Sostituisci ogni `3` e "tre" riferito ai sigilli con `NSEALS()`:
  - `grant`: `Sigilli: n su N`; con tutti i sigilli, "Hai tutti i sigilli." e la porta.
  - `talkKeeper`: `n===NSEALS()`.
  - `hint`: l'ordine viene da `Object.keys(SEALS)`.
  - `tryDoor`: "Sulla serratura ci sono N incavi a forma di sigillo".
  - `win`: l'elenco viene da `Object.keys(SEALS)`.
  - `intro`: "La porta d'uscita si apre solo con i sigilli nascosti nelle sale. Ne servono N." Niente elenco degli oggetti, che invecchia a ogni sala nuova.
  - Scrivi il numero in lettere fino a 6 (`['zero','uno','due','tre','quattro','cinque','sei'][n]??n`) dove la frase lo vuole in lettere.

- [ ] **Step 4: `partita.js` desktop e `--mobile` più la prova a mano.** Atteso: solo `OK`; con il sigillo finto la porta resta chiusa a 3.

- [ ] **Step 5: Commit**: `git commit -am "Il numero dei sigilli viene da SEALS in tutti i testi"`.

### Task 4: Oggetti e cartellini della Sala delle Ville (ramo `enigmi-storia`)

**Files:**
- Modify: `js/stanza.js` (`OGGETTI.villa`, varco nel museo)
- Modify: `js/contenuti.js` (`PLAQUES.godi`, `PLAQUES.palladio`)
- Test: `$SP/partita.js`

**Interfaces:**
- Consumes: `vaiInStanza`, `hitVarco`, `drawVilla`, `drawBust`, `drawLectern`, `drawPlant` (Task 1-2); `openFacade` (Task 5, chiamata dentro una freccia).
- Produces: oggetti `varcoVilla` (museo), `varcoMuseo`, `modelVilla`, `plaqueGodi`, `plaquePalladio` (villa).

- [ ] **Step 1: Aggiungi i controlli a `partita.js`**, prima dei sigilli. Vai alla villa usando il varco come farebbe il giocatore:

```js
await ev(()=>{P.x=P.tx=P.px=0;P.y=P.ty=P.py=4;P.fx=-1;P.fy=0});
await ev(()=>interact(OBJ.find(o=>o.id==='varcoVilla')));await sleep(400);
ok(await ev(()=>S.room==='villa'),'il varco porta alla villa');
for(const id of ['plaqueGodi','plaquePalladio']){await ev(id=>OBJ.find(o=>o.id===id).act(),id);await svuota()}
ok(await ev(()=>S.journal.some(j=>j.id==='godi')&&S.journal.some(j=>j.id==='palladio')),'cartellini della villa nel diario');
await ev(()=>interact(OBJ.find(o=>o.id==='varcoMuseo')));await sleep(400);
ok(await ev(()=>S.room==='museo'&&P.x===0&&P.y===4),'il varco riporta al museo');
```

- [ ] **Step 2: Lancia.** Atteso: `FAIL il varco porta alla villa`.

- [ ] **Step 3: Implementa**
  - **Museo:** `{id:'varcoVilla',x:-1,y:4,name:'Varco: Sala delle Ville',act:()=>vaiInStanza('villa',0,6),hit:()=>hitVarco('L',4)}`.
  - **Villa:**
    - `{id:'varcoMuseo',x:-1,y:6,name:'Varco: torna al museo',act:()=>vaiInStanza('museo',0,4),hit:()=>hitVarco('L',6)}`
    - `modelVilla` in (4,3), `h:26`, `draw:drawVilla`, `act:()=>openFacade()`, `light:1`
    - `plaqueGodi` in (2,2) e `plaquePalladio` in (6,2), con `drawLectern`, `readPlaque('godi'|'palladio')`, `light:1`
    - busto in (6,5) con `drawBust`; piante in (0,0) e (7,7)
  - **`PLAQUES.godi`** (`where:'Sala delle Ville'`, titolo "Villa Godi"):
    1. «A Lugo di Vicenza, dal 1537, i fratelli Godi fanno costruire una villa da un giovane architetto: Andrea Palladio. È la sua prima villa.»
    2. «Al centro della facciata, tra due ali, c'è una loggia con tre arcate, raggiunta da una scalinata.»
    3. «Dal 1996 le ville di Palladio nel Veneto sono patrimonio dell'umanità UNESCO.»
  - **`PLAQUES.palladio`** (titolo "Andrea Palladio"):
    1. «Andrea Palladio (1508–1580) ha cambiato il modo di costruire le case di campagna.»
    2. «Nei Quattro Libri dell'Architettura (1570) spiega le sue regole. La prima è la simmetria: quello che sta a sinistra si ripete a destra, come in uno specchio.»
  - Se nel frattempo dati-ai ha corretto uno di questi fatti in bacheca, usa la sua versione.

- [ ] **Step 4: `partita.js` desktop e `--mobile`.** Atteso: tutti i controlli `OK` tranne il sigillo `facade`, che non esiste ancora (non c'è in `SEALS`, quindi il ciclo non lo prova).

- [ ] **Step 5: Commit**: `git commit -am "Sala delle Ville: varchi, plastico e cartellini di Villa Godi e Palladio"`.

### Task 5: Rompicapo della facciata e quarto sigillo (ramo `enigmi-storia`)

**Files:**
- Modify: `js/enigmi.js` (`openFacade`, `DOVE.facade`)
- Modify: `js/contenuti.js` (`SEALS.facade`, `HINTS.facade`)
- Usa: la griglia `.facade` di `css/style.css`, aggiunta nel Task 2.
- Test: `$SP/partita.js`

**Interfaces:**
- Consumes: `openModal`, `bad`, `solved`, `closeBtn`, `modalKey` (motore/enigmi).
- Produces: `openFacade():void`. DOM: `#fac` con 14 celle in ordine di lettura (7 colonne × 2 piani). Le celle modificabili sono `button[data-c]`, con `data-c` in `d0,d1` (ala destra, piano nobile, da sinistra), `d2,d3` (ala destra, piano terra), `l0,l1,l2` (loggia, piano terra). Le altre sono `div`. Pulsante `#facOk`. Ciclo dei valori: `muro → finestra → porta → arco → muro`, partenza `muro`.

- [ ] **Step 1: Test.** Sostituisci `soluzioni.facade` in `partita.js`, provando prima una risposta sbagliata:

```js
async facade(){await ev(()=>openFacade());
  await page.click('#facOk');
  ok(await ev(()=>$('msg').classList.contains('bad')&&!S.seals.facade),'facciata sbagliata: rifiutata');
  const clic={d0:1,d1:1,d2:2,d3:1,l0:3,l1:3,l2:3};
  for(const [c,n] of Object.entries(clic))for(let i=0;i<n;i++)await page.click(`#fac [data-c="${c}"]`);
  await page.click('#facOk');await prendi()}
```

Più un controllo del messaggio: con l'ala giusta e la loggia sbagliata, `$('msg').textContent` contiene "loggia".

- [ ] **Step 2: Aggiungi `SEALS.facade` e `HINTS.facade`, poi lancia.** Atteso: `FAIL`/errore `openFacade is not defined`.
  - `SEALS.facade`: `{title:'Sigillo della Villa',text:'Villa Godi, a Lugo di Vicenza, è la prima villa di Andrea Palladio: tre arcate al centro e due ali che si rispecchiano. Per Palladio la bellezza nasce dalla simmetria.'}`
  - `HINTS.facade`: le due frasi della specifica, sezione 3.

- [ ] **Step 3: Implementa `openFacade()`**
  - Se `S.seals.facade` è già preso: `say('Plastico di Villa Godi',['La facciata è completa. Il telo è piegato accanto al plastico.'])`.
  - Finestra: eyebrow "Rompicapo · Sala delle Ville", titolo "La facciata di Villa Godi", un `<p class="clue">` con "Il plastico è rimasto a metà. Completalo come lo avrebbe voluto Palladio." e la griglia 7×2:
    - piano nobile: `F F | F F F | ? ?`
    - piano terra: `F P | telo telo telo | ? ?`
    - le celle fisse sono `div` con il simbolo; quelle del telo sono pulsanti che, al primo tocco, mostrano `muro` e da lì scorrono.
  - Simboli delle celle: testo e colore, niente immagini: `muro` "", `finestra` "▯", `porta` "∩", `arco` "◠". Ogni pulsante ha `aria-label` con il nome del valore. Celle di almeno 40 px.
  - `#facOk` "Controlla":
    - ala destra ≠ `[finestra,finestra,porta,finestra]` → `bad($('fac'),'L\'ala destra non rispecchia la sinistra.')`;
    - altrimenti loggia ≠ tre `arco` → `bad($('fac'),'La loggia non è quella descritta nel cartellino.')`;
    - altrimenti `solved('facade','Il telo scivola via: dietro la scalinata c\'è il quarto sigillo.')` e togli `#facOk`.
  - `modalKey`: nessuna scorciatoia oltre a Tab e Invio sui pulsanti.
  - `DOVE.facade='Il plastico di Villa Godi, nella Sala delle Ville.'`

- [ ] **Step 4: Partita completa, desktop e `--mobile`.** Atteso: solo `OK`, con `sigillo facade` e `schermata finale con 4 sigilli su 4`. Controlla a vista uno screenshot della finestra della facciata su telefono (375 px): la griglia sta in larghezza, nessuno scorrimento orizzontale.

- [ ] **Step 5: Commit, pull request, bacheca**

```bash
git commit -am "Rompicapo della facciata di Villa Godi e quarto sigillo"
git merge origin/main && git push
gh pr create --base main --head enigmi-storia --title "Sala delle Ville: Villa Godi, rompicapo della facciata, 4 sigilli"
```

In bacheca a dati-ai: aggiungere `FONTI.godi`, `FONTI.palladio`, `FONTI.facade` (le chiavi ora esistono); nel diario compaiono da sole tramite `fonteHtml`.
