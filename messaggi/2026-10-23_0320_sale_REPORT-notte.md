da: sale (Claude di jackjack-lab)
a: tutti: jackjack-lab, Dumunzio, Matteo, lingua, Gabsat
tipo: REPORT del lavoro notturno (22/10 sera → 23/10 mattina)
riguarda: «cose da fare urgenti.txt» (tutti gli 8 punti fatti) e lavoro rimasto in sospeso

Buongiorno! jackjack-lab mi ha lasciato lavorare da solo fino alle 7:30. Le sue istruzioni erano:
- provare tutto prima di pubblicare;
- unire in main dopo le prove;
- prendere il posto degli altri Claude dove avevano lasciato lavoro a metà;
- scrivere tutto qui.
Ecco tutto, in ordine. Main ora è **47debe1**. Ogni pezzo ha il suo messaggio qui, con i dettagli.

## Compiti urgenti: 8 su 8 fatti
| # | Compito | Chi | Dove |
|---|---|---|---|
| 1 | Nome al passaggio del mouse sugli oggetti | Dumunzio (revisione sale) | main ee9d16c |
| 2 | Debug ultra fine | sale | 3 errori corretti, vedi 01:50 |
| 3 | Backup su Drive | sale | ogni ora sul PC di jackjack-lab |
| 4 | Stanza più grande | sale | main 2e9972c |
| 5 | Dettagli | sale | 11 sale (30742bb), ingresso, villa e uscita (739e6cc) |
| 6 | Traiettorie | sale | main bbe4574 |
| 7 | Test su computer e telefono | sale | 6 schermi, vedi 01:50 |
| 8 | Font Times New Roman | sale (revisione Dumunzio) | main af660f3 |

## Cosa è cambiato nel gioco, stanotte
1. **Il gioco riempie la finestra.** La tela inquadra solo la stanza (`VISTA`, `inquadra()`) e `fit()` la ingrandisce: su un portatile la stanza passa da circa 590 a 900 px di larghezza, e sul telefono prende tutta la larghezza. Il disegno non è cambiato: setTransform in render() e toCanvas() per il mouse.
2. **Stanze più ricche**: tutte le 15 hanno da 7 a 10 oggetti a terra, illuminati, nel tema della stanza. Alcuni si possono esaminare e hanno una frase. Ci sono 25 disegni nuovi in registro.js, tra cui una panchina con schienale.
3. **Traiettorie** (impostazioni ⚙): la strada a puntini dorati fino alla meta dopo un clic, e le orme degli ultimi passi.
4. **Grafica**: grana leggera sulle mattonelle e un alone dietro la stanza al posto del fondo piatto.
5. **Immagine da condividere a fine partita**: una tela 1080×1350 con tempo, i 15 sigilli e le foto vere delle sale, da scaricare o condividere. Era la proposta di Dumunzio rimasta in sospeso. Esempio in `immagini/immagine-finale-esempio.png`.
6. **Telefono in orizzontale**: la schermata iniziale ora entra nello schermo.
7. **Errori corretti**:
   - la schermata iniziale diceva ancora «sigilli da ritrovare» come quando erano 4;
   - una panchina della Città Sociale era nascosta dietro la lavagna;
   - il testo «Copia risultato» restava in italiano anche nel gioco in inglese.
8. **Inglese**: 84 frasi nuove in lingua-en.js. Le ho fatte al posto di lingua, che era in pausa. La prova p_nontradotte non trova più frasi senza traduzione.
9. **CLAUDE.md**: nuova sezione «Inquadratura, traiettorie, oggetti di contorno», e i sigilli al posto delle tessere.

## Le prove, tutte passate su main
- **Prove di sempre**:
  - partita completa 19/19;
  - pianta 56/56, salvataggio 14/14, tentativi 5/5;
  - custode 39/39 in italiano e 16/16 in inglese;
  - nome al passaggio del mouse 5/5.
- **Prove nuove di stanotte** (in scratchpad/fo e scratchpad/pp sul PC di jackjack-lab):
  - raggiungibilità: tutte le porte, i cartellini e gli oggetti, in tutte le 15 stanze;
  - clic sul pavimento: 2/2;
  - traiettorie: 7/7;
  - immagine finale: 4/4;
  - frasi senza traduzione: 0;
  - **clicca.mjs**: clic veri del mouse su tutti i 132 oggetti attivabili, su computer e su telefono: 132/132;
  - **schermi.mjs**: 6 schermi, da 360×640 a 1920×1080, telefono in orizzontale compreso: 6/6;
  - **fermo.mjs**: con riduci movimento, 0 pixel cambiati in tutte le 15 stanze;
  - **perf.mjs**: meno di 0,5 ms per fotogramma.
- Console pulita in tutto.

## Per chi rientra
- `git fetch && git merge origin/main` prima di lavorare. Tutti i miei rami di stanotte sono già dentro main.
- **Dumunzio**: ho toccato i tuoi file motore.js, stanza.js, enigmi.js, style.css e index.html, sempre con le prove e scritto qui, ora per ora. Se qualcosa non ti piace, cambialo pure.
- **lingua**: le traduzioni nuove sono in fondo a lingua-en.js, con un commento sopra ogni gruppo.
- **Gabsat**: nel tuo menu impostazioni c'è il riquadro «Traiettorie».
- **Matteo**: la mappa non l'ho toccata. Funziona anche con l'inquadratura nuova: l'ho provata nelle prove sugli schermi.

Adesso preparo una presentazione del progetto per jackjack-lab.
