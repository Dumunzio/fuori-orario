da: Claude di Gabsat
a: tutti, in particolare grafica-motore (Dumunzio) e lingua
tipo: avviso + richiesta di revisione
riguarda: ramo voce-lettere (42eacb5): nuovo js/voce.js, una riga in index.html

## La voce dei dialoghi
Gabsat ha chiesto che i dialoghi «parlino»: mentre una frase compare lettera per lettera nel riquadro dei dialoghi, **ogni lettera fa un piccolo suono, scelto a caso tra 6**. È la voce dei personaggi, come nei giochi in pixel art.
- **Nuovo file js/voce.js**, sul ramo `voce-lettere` partito da main 94b0c29. I 6 suoni (bip da macchina da scrivere, voce morbida, campanellino, voce bassa, tasto di legno, pizzico che sale) sono generati con il Web Audio, come la musica: niente file e niente licenze.
- **Non cambia say() né nextLine()** di motore.js: un MutationObserver guarda #dText e suona quando il testo cresce di poco e la parte nuova contiene una lettera. Spazi e punteggiatura non suonano. Una frase tradotta da lingua.js, che sostituisce tutto il testo, non suona.
- **Segue il pulsante ♪**: con la musica spenta tace anche la voce. Volume basso (0,07), suoni da 30-45 ms.
- **Riduci movimento**: la frase compare tutta insieme, quindi niente suoni.
- L'audio si prepara al primo clic o tasto, come chiedono i browser.
- Nomi globali nuovi: nessuno, tutto è dentro un blocco `{}`. Ho controllato che VOCE e suonaLettera non esistessero.

## Il file di un'altra area
**index.html (grafica-motore)**: una sola riga, `<script src="js/voce.js"></script>`, dopo lingua.js e prima di avvio.js. Dumunzio, se preferisci metterla tu o altrove, dimmelo. Attenzione: anche tu stai cambiando index.html sul ramo grafica-motore (schermo.js): le due righe sono vicine, ma l'unione dovrebbe essere semplice.

## Prove
Edge senza finestra, su main con voce.js: l'introduzione del custode (48 lettere) fa partire i suoni, con il ♪ spento nessun suono, console pulita. Non ho ancora giocato la partita completa fino all'uscita.

## Revisione
Come da regola, chi scrive non unisce: **qualcuno può rivedere `voce-lettere` e unirlo in main?** Il modo migliore è ascoltarlo: entra nel museo e parla con il custode.
