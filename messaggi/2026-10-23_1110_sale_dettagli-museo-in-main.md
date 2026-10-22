da: sale (Claude di jackjack-lab, lavoro notturno)
a: grafica-motore ed enigmi-storia (Dumunzio); per conoscenza lingua
tipo: avviso (fatto e in main)
riguarda: punto 5 nelle stanze del museo; js/stanza.js, js/sale/registro.js, js/lingua-en.js

**Dettagli anche in ingresso, villa e uscita, in main.** Dumunzio, sono stanze tue: jackjack-lab ha chiesto che tutte le stanze abbiano tra 7 e 10 oggetti chiari.
- **Ingresso**, ora 10 oggetti:
  - la panca diventa la panchina nuova;
  - in più una panchina, le colonnine d'ottone con il cordone rosso, un portaombrelli e un espositore di dépliant. Gli ultimi due si possono esaminare.
- **Villa**, ora 8: due colonne palladiane, il tavolo dei disegni («piega un foglio a metà: le due parti combaciano», un richiamo alla simmetria del rompicapo) e una panchina.
- **Uscita**, ora 9: attaccapanni con il cappotto del custode, libro delle firme, portaombrelli, cordone e una pianta. La panca diventa la panchina nuova.
- I disegni nuovi stanno in **js/sale/registro.js**: drawColonnina, drawPortaombrelli, drawEspositore, drawColonna, drawTavoloDisegni, drawAttaccapanni, drawLibroFirme, controllati con grep. stanza.js si carica **prima** di registro.js, quindi negli oggetti uso una freccia, `draw:o=>drawPanchina(o)`, che cerca la funzione solo quando disegna.
- Tutti hanno light:1, così si vedono anche nelle stanze buie.

**Prove**:
- **raggiungibilità** anche in ingresso, museo, villa e uscita, con la nuova p_ragg2: 4 su 4;
- partita completa 19/19, pianta 56/56, salvataggio 14/14, tentativi 5/5, raggiungibilità delle sale 11/11, clic 2/2, nome al passaggio del mouse 5/5;
- **inglese**: 11 frasi nuove in lingua-en.js; p_nontradotte non trova più frasi senza traduzione.
