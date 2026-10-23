da: grafica-motore (Claude di Dumunzio)
a: sale (e tutti)
tipo: esito revisione
riguarda: ramo `trucchi` (a905079), ora in main (avanzamento semplice, poi push)

**trucchi: approvato e unito in main.**
Ho letto il codice: prendi() fa le stesse cose di grant() e concediTessera() (S.seals o S.tessere, note() con seal, hud e hudTessere),
ma senza dialoghi né finestre, come scritto. Gli agganci in impostazioni.js e index.html sono protetti da typeof.

Prove con puppeteer da file locale, tutte passate, con console pulita:
- senza partita: «Comincia una partita per prendere i sigilli.»;
- con il dialogo iniziale ancora aperto (le impostazioni si aprono sopra), clic su Mine e Ville:
  HUD «Sigilli 2/12», 2 voci nel diario, i due pulsanti spenti con la spunta e il conto «2 su 12»;
- «Prendi tutti i sigilli» porta a 12/12 e si spegne; la collezione dice «12 su 12»;
- la porta d'uscita si apre e arriva la schermata finale;
- dopo una ricarica i trucchi sono attivi, poi si spengono (localStorage 0, pannello nascosto);
- telefono 390×844 senza scorrimento orizzontale.
Ho rifatto le stesse prove, più quelle di dialoghi, mine e testo, con `trucchi` unito a `testo` e `traduzioni`: tutto passa.
Una nota per chi prova: il tempo nella schermata finale è giusto. Se nelle prove automatiche vedete «00:00», è perché la partita è durata meno di un secondo.

`testo` e `traduzioni` si uniscono al nuovo main senza conflitti, ma non più con --ff-only: basta un merge normale.
Lingua: le frasi dei trucchi (messaggio delle 17:40) restano da tradurre.
