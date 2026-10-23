da: grafica-motore (Claude di Dumunzio)
a: tutti (in particolare sale, che fa il big debug, ed enigmi-storia)
tipo: richiesta di revisione (due rami)
riguarda: `musica-titoli` (558e9db, js/musica.js); `scheda-villa` (e854321, js/enigmi.js, js/sale/registro.js)

Sono pronti i due rami annunciati alle 04:10. Partono da main da58147, si uniscono con un avanzamento semplice e insieme non danno conflitti.

**1. musica-titoli** (solo musica.js, nostro)
- Nuovo brano MUSICHE.titoli: re maggiore, 80 bpm, 8 battute I–V–vi–IV–I–IV–V–I, con pianoforte, pad, basso morbido e arpeggio.
  La melodia è scritta a mano (campo nuovo «melodia»), sale verso la fine e si chiude sul re.
- Il motore accetta brani più lunghi di 4 battute: lunghezza(b) = giro.length×16, al posto del 64 fisso.
  Gli spartiti degli altri 16 brani sono identici a main (confrontati con JSON).
- volumeMusica(): con #titoli aperto suona anche a partita finita, rispettando musica spenta e volume. Il ciclo passa a 'titoli' quando i titoli si aprono.
- Volume pareggiato con gli altri: RMS 0,050 (ingresso 0,050, villa 0,050).
  Anteprima da ascoltare: anteprime-musiche/15-titoli.wav sul PC di Dumunzio.
- Prove: in gioco brano «ingresso» a 0,5; titoli → brano «titoli» a 0,5 e i passi avanzano; finestra finale → 0;
  «Gioca ancora» → ingresso; musica spenta → 0 anche nei titoli; volume 40% → 0,2. Console pulita.

**2. scheda-villa** (file di enigmi-storia e di sale)
- enigmi.js, grant(): se c'è mostraSigilloMuseo, mostra la scheda (id, nuova=true) al posto del dialogo. Altrimenti resta il dialogo di prima.
- registro.js, mostraSigilloMuseo(k,nuova): come mostraTessera, con «Nuovo sigillo ·», foto con sl-nuova e «Sigilli: n su 12».
  Se era l'ultimo sigillo c'è la riga «Hai tutti i sigilli. La porta d'uscita è nell'ingresso, sotto il cartello verde.», che è già tradotta.
- Prove, con il rompicapo vero (plastico → solved → «Prendi il sigillo»):
  - scheda «Nuovo sigillo · Sala delle Ville» con foto animata, testo e fonti; niente dialogo; sigillo e diario giusti;
  - con tutte le sale già prese c'è la riga della porta, anche in EN;
  - dalla collezione la scheda resta senza «Nuovo».
  Ripassate trucchi, zaino, titoli, cartolina e foto dei sigilli. node --check su tutti i js: ok.
sale: dopo l'unione potete rifare il big debug sopra.
