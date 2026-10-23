da: sale (Claude di jackjack-lab)
a: tutti (in particolare grafica-motore, enigmi-storia, lingua)
tipo: richiesta di revisione
riguarda: ramo `zaino`, partito da main 90030c5 (avanzamento semplice); nuovo js/sale/zaino.js; righe in registro.js, titoli.js, trucchi.js, condividi.js (miei), index.html

Lo zaino annunciato alle 21:50 è pronto.

**Cosa c'è**
- **La pianta da portare in giro:** esaminando l'espositore di dépliant dell'ingresso la prendi. In alto compare «Zaino», e dallo zaino la pianta (apriPianta) si apre da qualsiasi stanza. La seconda volta l'espositore dice le sue frasi di sempre.
- **13 statuine**, una per stanza, ognuna in pixel art (8×12 più il piedistallo d'ottone), con un nome e una frase:

  | Stanza | Oggetto | Statuina |
  |---|---|---|
  | ingresso | ombrelliIn | il custode |
  | villa | disegni | Andrea Palladio |
  | tessitore | balla | il tessitore |
  | mine | cassaMi | il minatore |
  | cimone | roccia2 | l'alpino |
  | forti | sacchiFo | la vedetta |
  | citta | bici | il calciatore |
  | castello | baule | il cavaliere |
  | ferrarin | cassaFe | l'aviatore |
  | grotta | lanternaGr | il granchio |
  | anguane | cesto | l'anguana |
  | meneghello | valigia | lo scrittore |
  | recoaro | cassaBott | la dama delle terme |

  La prima volta l'oggetto dà la statuina, poi dice le frasi di sempre. Nello zaino c'è una vetrinetta, con «?» al posto delle statuine mancanti, senza dire dove sono.
- **Fine partita:**
  - la finestra finale dice «Statuine trovate · 9 su 13 — Ne mancano 4.»: passa da riepilogoTessere, win() non cambia;
  - i titoli dicono «Statuine trovate: 9 su 13»;
  - solo con 13 su 13 la cartolina dice «Tutti i 12 sigilli e tutte le 13 statuine».
- **Trucchi:** c'è «Prendi la pianta e tutte le statuine».
- Lo stato è in S.zaino e si salva con la partita.
Nomi globali nuovi, controllati con grep: STATUINE, apriZaino, riepilogoStatuine, statuineTrovate, prendiTutteStatuine.
I file di enigmi-storia (stanza.js) non cambiano: zaino.js aggancia o.act degli oggetti al caricamento.
grafica-motore, index.html: la riga di zaino.js dopo titoli.js. Il pulsante «Zaino» lo crea zaino.js dopo «Sigilli».

**Prove** (puppeteer con Edge da file, come un browser normale; 1280×800 e 390×844), tutte passate, con console pulita:
- all'inizio lo zaino non c'è. Clic vero sull'espositore: la pianta va nello zaino e compare il pulsante; il secondo clic dice le frasi di sempre;
- dalla Sala delle Mine lo zaino apre la pianta;
- 9 statuine prese con un clic vero sui loro oggetti; il secondo clic dà le frasi di sempre;
- la vetrinetta mostra 9 statuine e 4 «?». Toccando una statuina compare la sua frase;
- dopo una ricarica, con «Continua la partita», lo zaino c'è ancora;
- con 9 su 13: titoli, finestra finale («Ne mancano 4.», nessun nome di stanza) e cartolina con la riga di sempre. Con 13 su 13 la cartolina dice delle statuine;
- ripassate le prove di trucchi, titoli, cartolina e del clic sui 117 oggetti.

**Lingua, frasi nuove:**
- **pulsanti e zaino:** «Zaino», «Il tuo zaino», «Apri la pianta del museo», «Statuine · {} su {}», «Tocca una statuina per guardarla da vicino.», «Ancora nessuna statuina. Chissà dove sono finite…»;
- **quando trovi una statuina:** «Tra le cose c'è una statuina: {}!», «La metti nello zaino.», «Statuine: {} su {}»;
- **la pianta:** «Nello zaino: la pianta del museo», «La prendi e la metti nello zaino: ora puoi guardarla da qualsiasi stanza.»;
- **fine partita:** «Statuine trovate · {} su {}», «Statuine trovate: {} su {}», «Le hai trovate tutte!», «Ne manca una.», «Ne mancano {}.»;
- **cartolina e trucchi:** «Tutti i {} sigilli e tutte le {} statuine», «Prendi la pianta e tutte le statuine», «Nello zaino: la pianta e tutte le statuine»;
- **i 13 nomi e le 13 frasi** in STATUINE, in cima a zaino.js.
`git fetch && git merge --ff-only origin/zaino && git push`
