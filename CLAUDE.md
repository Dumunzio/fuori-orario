# Fuori Orario: istruzioni per Claude

Escape room in pixel art ambientata in un museo immaginario dell'Alto Vicentino. Progetto per la sfida "Il luogo che racconta": far scoprire il patrimonio culturale locale a chi ha meno di 26 anni, usando dati aperti e AI.

**Il gioco si gioca da casa.** È una scelta del team: niente meccaniche che obbligano ad andare fisicamente nei luoghi (GPS, check-in). I luoghi veri entrano nel gioco attraverso sale, foto, racconti e fonti.

Il team è diviso in **4 aree**. Ogni persona lavora con il suo Claude su **un ramo git**, e ogni ramo ha i suoi file. I Claude si coordinano sulla **bacheca** (in fondo a questo file).

## All'inizio di ogni sessione
1. `git branch --show-current` ti dice in che area sei. Se sei su `main`, chiedi alla persona su quale area vuole lavorare e spostati sul ramo (`git switch <ramo>`).
2. Aggiorna il ramo: `git pull`, poi `git merge origin/main` per prendere il lavoro già unito dagli altri.
3. Leggi la bacheca (vedi sotto) e rispondi ai messaggi indirizzati alla tua area.

## Le 4 aree

| Ramo | Di cosa si occupa | File suoi |
|---|---|---|
| `grafica-motore` | Disegno isometrico, animazioni, luce, movimento, comandi (tastiera, mouse, touch), dialoghi e finestre, stile, versione mobile | `index.html`, `css/style.css`, `js/motore.js`, `js/avvio.js` |
| `enigmi-storia` | Le sale, gli oggetti, i rompicapi, i testi dei cartellini, il custode, il diario, il finale | `js/contenuti.js`, `js/stanza.js`, `js/enigmi.js` |
| `dati-ai` | Verifica dei fatti sulle fonti aperte (Wikidata, Europeana, Catalogo MiC, Rete Museale), fonti citate in gioco, custode che risponde con l'AI | `js/fonti.js` e i nuovi file `js/ai-*.js`, cartella `dati/` |
| `territorio` | Portare i luoghi veri dell'Alto Vicentino dentro il gioco: quali luoghi, con foto, coordinate e storia; sale ispirate a luoghi reali; una mappa del territorio da consultare in gioco | `js/territorio.js` e i nuovi file `js/luoghi-*.js` |
| `sale` | Le sale a tema del territorio: l'atrio, una sala per file con il suo rompicapo, le tessere da collezionare; il salvataggio automatico della partita | `js/sale/*.js`, `img/sale/`, `js/salvataggio.js` |

**Regola d'oro: modifica solo i file della tua area.** Se ti serve un cambiamento in un file di un'altra area, scrivi un messaggio in bacheca a quell'area e aspetta. Se è una correzione minuscola e urgente (un errore che blocca il gioco), falla, ma scrivilo subito in bacheca.

### Obiettivi di partenza per area
- **grafica-motore**: più sale (oggi c'è una stanza sola), passaggio tra sale, schermata finale più ricca, test su telefono.
- **enigmi-storia**: enigmi meno "leggi e copia" e più di ragionamento; nuove sale (Grande Guerra, Ville, Folklore); il calcolo 1917 − 1862 della cassetta è forzato, da ripensare.
- **dati-ai**: verificare ogni fatto di `contenuti.js` e segnarlo in `FONTI` come `verificato` con il link; mostrare la fonte nel diario; progettare il custode AI. Attenzione: il repo è pubblico, **mai mettere chiavi API nel codice**. Se serve l'AI dal vivo, va trovata una soluzione con un piccolo server, oppure i testi si generano prima con Claude e si salvano con la fonte.
- **territorio**: ampliare `LUOGHI_REALI` (foto con licenza da Wikimedia Commons, coordinate, breve storia con fonte); proporre a enigmi-storia nuove sale ispirate a luoghi reali; una mappa dell'Alto Vicentino nel gioco che mostra da dove viene ogni oggetto del museo. Il gioco resta da casa: niente GPS né obbligo di andare nei luoghi.

## Come è fatto il codice
- Niente librerie e niente build: si apre `index.html` nel browser e funziona, anche da file locale.
- Gli script sono normali `<script>` (non moduli) e condividono le variabili globali. **L'ordine in `index.html` conta**: `contenuti`, `motore`, `enigmi`, `stanza`, `fonti`, `territorio`, poi `sale/registro.js` e una riga per ogni sala, e `avvio` sempre ultimo.
- **Aggiungere una sala a tema**: copia `js/sale/tessitore.js`, cambia contenuti, rompicapo e tessera, e aggiungi la sua riga in `index.html` dopo le altre sale. `registraSala()` la mette nell'atrio, aggiunge cartellini, fonti e schede del custode. Ogni fatto va in `fonti` con la sua fonte, ogni foto con autore e licenza. L'atrio ha 11 posti: per altre sale serve un secondo atrio.
- Un file può usare a caricamento solo ciò che è definito nei file prima di lui. Dentro le funzioni invece puoi usare tutto, perché vengono chiamate quando la pagina è già caricata. Per questo in `stanza.js` le azioni sono scritte come `act:()=>openLoom()`.

### Interfacce comuni (cambiarle rompe il lavoro degli altri)
Prima di rinominare o cambiare il comportamento di questi, scrivi in bacheca:
- Stato: `S` (sigilli, diario, tempo), `P` (giocatore), `fresh()`, `sealCount()`
- Finestre e testi: `say(chi, righe, poi)`, `openModal(html)`, `closeModal()`, `toast(msg)`, `bad(el,msg)`, `closeBtn`, `modalKey`
- Gioco: `OBJ` (oggetti della sala), `readPlaque(id)`, `note(...)`, `solved(id,msg)`, `grant(id)`, `hud()`
- Dati: `PLAQUES`, `SEALS`, `HINTS`, `FONTI`, `LUOGHI_REALI`

## Prima di fare commit
- Apri `index.html` nel browser e gioca fino alla fine: i 3 sigilli e la porta devono funzionare, e la console deve essere senza errori.
- Messaggi di commit in italiano, brevi, che dicono cosa cambia.
- Lavora sul tuo ramo, poi `git push`. Per portare il lavoro in `main` si apre una Pull Request su GitHub; prima fai `git merge origin/main` sul tuo ramo e risolvi eventuali conflitti.

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
