# Fuori Orario: istruzioni per Claude

Escape room in pixel art ambientata in un museo immaginario dell'Alto Vicentino. Progetto per la sfida "Il luogo che racconta": far scoprire il patrimonio culturale locale a chi ha meno di 26 anni, usando dati aperti e AI.

**Il gioco si gioca da casa.** È una scelta del team: niente meccaniche che obbligano ad andare fisicamente nei luoghi (GPS, check-in). I luoghi veri entrano nel gioco attraverso sale, foto, racconti e fonti.

Il team è diviso in **4 aree**. Ogni persona lavora con il suo Claude su **un ramo git**, e ogni ramo ha i suoi file. I Claude si coordinano sulla **bacheca** (in fondo a questo file).

## All'inizio di ogni sessione
1. `git branch --show-current` ti dice in che area sei. Se sei su `main`, chiedi alla persona su quale area vuole lavorare e spostati sul ramo (`git switch <ramo>`).
2. Aggiorna il ramo: `git pull`, poi `git merge origin/main` per prendere il lavoro già unito dagli altri.
3. Leggi la bacheca (vedi sotto) e rispondi ai messaggi indirizzati alla tua area.

## Le aree

| Ramo | Di cosa si occupa | File suoi |
|---|---|---|
| `grafica-motore` | Disegno isometrico, animazioni, luce, movimento, comandi (tastiera, mouse, touch), dialoghi e finestre, stile, versione mobile | `index.html`, `css/style.css`, `js/motore.js`, `js/avvio.js`, `js/musica.js` (musica di ogni stanza), `js/pianta.js` (pianta del museo) |
| `enigmi-storia` | Le sale, gli oggetti, i rompicapi, i testi dei cartellini, il custode, il diario, il finale | `js/contenuti.js`, `js/stanza.js`, `js/enigmi.js` |
| `dati-ai` | Verifica dei fatti sulle fonti aperte (Wikidata, Europeana, Catalogo MiC, Rete Museale), fonti citate in gioco, custode che risponde con l'AI | `js/fonti.js` e i nuovi file `js/ai-*.js`, cartella `dati/` |
| `territorio` | Portare i luoghi veri dell'Alto Vicentino dentro il gioco: quali luoghi, con foto, coordinate e storia; sale ispirate a luoghi reali; una mappa del territorio da consultare in gioco | `js/territorio.js` e i nuovi file `js/luoghi-*.js` |
| `sale` | Le sale a tema del territorio: una sala per file con il suo rompicapo, collegata alla pianta del museo; le tessere da collezionare; il salvataggio automatico della partita | `js/sale/*.js`, `img/sale/`, `js/salvataggio.js` |
| `lingua` | Il gioco in inglese: pulsante IT/EN e traduzione dei testi mentre compaiono | `js/lingua.js`, `js/lingua-en.js` |

**Regola d'oro: modifica solo i file della tua area.** Se ti serve un cambiamento in un file di un'altra area, scrivi un messaggio in bacheca a quell'area e aspetta. Se è una correzione minuscola e urgente (un errore che blocca il gioco), falla, ma scrivilo subito in bacheca.

### Obiettivi di partenza per area
- **grafica-motore**: più sale (oggi c'è una stanza sola), passaggio tra sale, schermata finale più ricca, test su telefono.
- **enigmi-storia**: enigmi meno "leggi e copia" e più di ragionamento; nuove sale (Grande Guerra, Ville, Folklore); il calcolo 1917 − 1862 della cassetta è forzato, da ripensare.
- **dati-ai**: verificare ogni fatto di `contenuti.js` e segnarlo in `FONTI` come `verificato` con il link; mostrare la fonte nel diario; progettare il custode AI. Attenzione: il repo è pubblico, **mai mettere chiavi API nel codice**. Se serve l'AI dal vivo, va trovata una soluzione con un piccolo server, oppure i testi si generano prima con Claude e si salvano con la fonte.
- **territorio**: ampliare `LUOGHI_REALI` (foto con licenza da Wikimedia Commons, coordinate, breve storia con fonte); proporre a enigmi-storia nuove sale ispirate a luoghi reali; una mappa dell'Alto Vicentino nel gioco che mostra da dove viene ogni oggetto del museo. Il gioco resta da casa: niente GPS né obbligo di andare nei luoghi.

## Come è fatto il codice
- Niente librerie e niente build: si apre `index.html` nel browser e funziona, anche da file locale.
- Gli script sono normali `<script>` (non moduli) e condividono le variabili globali. **L'ordine in `index.html` conta**: `contenuti`, `motore`, `musica`, `pianta`, `enigmi`, `stanza`, `fonti`, `territorio`, poi `sale/registro.js` e una riga per ogni sala, `salvataggio`, `lingua-en`, `lingua`, e `avvio` sempre ultimo.
- **Nomi globali: prima di crearne uno nuovo controlla che non esista già** (`grep -rn "nome" js/`). Due `const` o `let` con lo stesso nome in file diversi bloccano tutto il secondo file. È già successo: le 11 sale sparivano.
- **Aggiungere una sala a tema**: copia `js/sale/tessitore.js`, cambia contenuti, rompicapo e tessera, e aggiungi la sua riga in `index.html` dopo le altre sale. `registraSala()` la collega alla pianta e aggiunge cartellini, fonti e schede del custode. Ogni fatto va in `fonti` con la sua fonte, ogni foto con autore e licenza. Dove sta la sala nella pianta (collegamenti, posto nel disegno, ramo) si decide in bacheca con grafica-motore, che lo scrive in `js/pianta.js`.

### La pianta del museo
Si comincia nell'**ingresso** (custode e piantina interattiva). Dall'ingresso si va al museo (e da lì all'**uscita**, dove c'è la porta), alla Sala delle Ville e a tre rami di sale a tema, collegate a catena da varchi, senza corridoi. Disegno di Dumunzio: `docs/piantina-museo.png`. Tutto è in `js/pianta.js`:
- `PIANTA.collegamenti`, `PIANTA.posti`, `PIANTA.rami`, `PIANTA.inizio`, `PIANTA.vicini(id)`;
- `PIANTA.porte[stanza][vicino]={lato,t}`: ogni area scrive le porte delle sue stanze;
- `vaiVerso(da,a)`, `vaiInStanzaPianta(id)` (davanti alla porta verso il genitore), `varchiPianta(id)` e `pareteVarchiPianta(g,id)` per oggetti e disegno dei varchi, `completata(id)`, `apriPianta()`.
- Un file può usare a caricamento solo ciò che è definito nei file prima di lui. Dentro le funzioni invece puoi usare tutto, perché vengono chiamate quando la pagina è già caricata. Per questo in `stanza.js` le azioni sono scritte come `act:()=>openLoom()`, e i disegni di `registro.js` come `draw:o=>drawPanchina(o)`.

### Inquadratura, traiettorie, oggetti di contorno
- **Inquadratura** (motore.js): si disegna sempre nelle coordinate di sempre (`iso`, `OX`, `OY`, fondo `VW`×`VH`), ma la tela mostra solo `VISTA`, il riquadro della stanza corrente, che `inquadra()` calcola in `entraStanza()`. `fit()` ingrandisce la tela fino a riempire la finestra. `render()` sposta il disegno con `setTransform`, `toCanvas()` riporta il mouse. Non disegnare fuori dalla stanza: non si vede.
- **Traiettorie** (motore.js, si accendono nelle impostazioni): `TRAIETTORIE` {on, scia}, `traiettorie(on)`; `disegnaTraiettorie()` (orme, sotto gli oggetti) e `disegnaStrada()` (strada da fare, sopra la luce).
- **Oggetti di contorno** (sale/registro.js): `contorno(id,x,y,h,draw,nome,frasi)` crea un oggetto illuminato, da esaminare se ha un nome. Disegni pronti: drawPanchina, drawSacchi, drawCassa, drawFilo, drawElmetto, drawBarella, drawLanterna, drawMatasse, drawRocchetti, drawArcolaio, drawBalla, drawRoccia, drawFelce, drawArmatura, drawScaffaleLibri, drawElica, drawBarile, drawFieno, drawColonnina, drawPortaombrelli, drawEspositore, drawColonna, drawTavoloDisegni, drawAttaccapanni, drawLibroFirme. Ogni stanza ha tra 7 e 10 oggetti a terra: è la misura che ha chiesto jackjack-lab.
- **Sigilli**: le tessere non ci sono più, ogni sala vinta dà un sigillo. Nei dati restano i nomi `S.tessere`, `SALA[id].tessera` e la voce `'tessera-'+id`; a schermo si dice sempre «sigillo». Conteggio unico: `sigilliPresi()` / `sigilliTotali()` (15).

### Interfacce comuni (cambiarle rompe il lavoro degli altri)
Prima di rinominare o cambiare il comportamento di questi, scrivi in bacheca:
- Stato: `S` (sigilli, diario, tempo), `P` (giocatore), `fresh()`, `sealCount()`
- Finestre e testi: `say(chi, righe, poi)`, `openModal(html)`, `closeModal()`, `toast(msg)`, `bad(el,msg)`, `closeBtn`, `modalKey`
- Gioco: `OBJ` (oggetti della sala), `readPlaque(id)`, `note(...)`, `solved(id,msg)`, `grant(id)`, `hud()`
- Stanze: `STANZE`, `OGGETTI`, `entraStanza(id)`, `vaiInStanza(id,x,y)`, `ultimoCambio`, e la pianta (`PIANTA` e funzioni, vedi sopra)
- Dati: `PLAQUES`, `SEALS`, `HINTS`, `FONTI`, `LUOGHI_REALI`

## Animazioni
Regole concordate in bacheca tra sale, territorio e grafica-motore (2026-10-23_0000 e _0030):
1. **Piccole e lente**: un dettaglio che si muove per oggetto, movimenti di 1-5 pixel, cicli da 0,5 a 2 secondi. Non devono distrarre da cartellini e rompicapi.
2. **Legate alla storia del luogo**: si anima solo ciò che racconta qualcosa di vero, niente effetti decorativi senza motivo.
3. **Niente lampeggi veloci**: mai più di 3 lampi al secondo (epilessia fotosensibile).
4. **Ferme con «riduci movimento»**: con prefers-reduced-motion non si muove niente. Nelle sale c'è `tAnim(t)` (js/sale/registro.js), altrove `matchMedia('(prefers-reduced-motion: reduce)')`.
5. **Palette del museo**: ottone #e0b04f, crema #efe2c4, rosso lana #c2493c, azzurri dell'acqua #4f7a9a e #7fc4dc. Niente colori nuovi accesi.
6. **Pixel interi**, niente sfumature morbide sugli sprite: è pixel art.
7. **Nelle prove automatiche** imposta a mano `prefers-reduced-motion: no-preference` (il browser senza finestra parte spesso con «riduci movimento») e azzera `ultimoCambio` prima di ogni cambio di stanza.
Un'animazione che si ripete in una finestra (per esempio la mappa) usa requestAnimationFrame e si ferma quando la finestra si chiude.

## Prima di fare commit
- Apri `index.html` nel browser e gioca fino alla fine: i 15 sigilli e la porta nell'uscita devono funzionare, e la console deve essere senza errori.
- Messaggi di commit in italiano, brevi, che dicono cosa cambia.
- Lavora sul tuo ramo, poi `git push`. Prima fai `git merge origin/main` sul tuo ramo e risolvi eventuali conflitti.
- **Chi scrive non unisce in `main`.** Chiedi la revisione in bacheca (ramo e commit): un altro Claude prova il tuo ramo unito a `main`, e se va bene lo unisce e scrive l'esito in bacheca. Vale anche per le Pull Request su GitHub.

## La bacheca: lo spazio comune dei Claude
La bacheca è il ramo `bacheca`. Contiene solo messaggi, un file per messaggio, così due Claude che scrivono insieme non vanno mai in conflitto. Si usa da una seconda cartella (un "worktree"), così non devi lasciare il tuo ramo.

**Preparazione (una volta sola):**
```
git fetch origin bacheca
git worktree add ../fuori-orario-bacheca bacheca
```

**Leggere:**
```
git -C ../fuori-orario-bacheca pull
```
Poi leggi i file in `../fuori-orario-bacheca/messaggi/`, partendo dai più recenti (il nome comincia con data e ora).

**Scrivere:** crea un file `../fuori-orario-bacheca/messaggi/AAAA-MM-GG_HHMM_<tua-area>_<argomento>.md` con questo formato:
```
da: <tua area>
a: <area destinataria, oppure tutti>
tipo: richiesta | avviso | domanda | risposta
riguarda: <file o funzione, se c'entra>

<il messaggio: breve, concreto, cosa ti serve e perché>
```
Poi:
```
git -C ../fuori-orario-bacheca add messaggi
git -C ../fuori-orario-bacheca commit -m "bacheca: <argomento>"
git -C ../fuori-orario-bacheca push
```
Se il push viene rifiutato: `git -C ../fuori-orario-bacheca pull --rebase` e poi di nuovo `push`.

**Quando scrivere:** quando ti serve una modifica in un file non tuo, quando cambi un'interfaccia comune, quando finisci qualcosa che altri aspettano, quando hai una domanda per un'altra area. Per rispondere crea un nuovo file con `tipo: risposta` e il nome del messaggio a cui rispondi. Non modificare i messaggi degli altri.
