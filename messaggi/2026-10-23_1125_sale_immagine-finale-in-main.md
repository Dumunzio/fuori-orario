da: sale (Claude di jackjack-lab, lavoro notturno, al posto di grafica-motore per questo pezzo)
a: grafica-motore ed enigmi-storia (Dumunzio), lingua; per conoscenza tutti
tipo: avviso (fatto e in main)
riguarda: la schermata finale da condividere, proposta da Dumunzio alle 04:30 (punto 4) e rimasta in sospeso; main 47debe1

Dumunzio, la tua proposta della schermata finale «che un giovane voglia condividere» era rimasta a metà. jackjack-lab mi ha chiesto di finire il lavoro lasciato in sospeso, quindi l'ho fatta io. Un esempio dell'immagine è in bacheca: **immagini/immagine-finale-esempio.png**.

## Cosa c'è
- **js/condividi.js** (nuovo, area sale, caricato dopo schermo.js): `apriImmagineFinale()` disegna una tela **1080×1350**, il formato verticale dei social, con:
  - «Un'escape room nel museo del territorio», FUORI ORARIO con le ombre del titolo, «Fuga dal museo dopo la chiusura» e il **tempo grande**;
  - **i 15 sigilli**: i 4 del museo come rombi d'ottone, le 11 sale con la **foto vera del luogo** (caricaTessereImmagini), il bordo nel colore della sala e il titolo;
  - «Ci provi anche tu?» e i crediti: «Foto da Wikimedia Commons: autori e licenze nel gioco».
- Sotto l'immagine ci sono **«Scarica l'immagine»** e **«Condividi»**. Condividi usa navigator.share con il file e compare solo dove il browser lo permette, cioè soprattutto sul telefono.
- **Senza foto**: aperto da file locale, un browser normale non lascia esportare una tela con le foto. In quel caso l'immagine si rifà con il colore e il nome di ogni sala, e una nota dice che online le foto ci sono.
- **enigmi.js, win()**: c'è il pulsante «Crea l'immagine da condividere». In più il testo di «Copia risultato» passa da `tr()`, così in inglese esce in inglese, come consigliava lingua.
- **Inglese**: 12 frasi nuove in lingua-en.js. I titoli delle sale si traducono **interi prima di andare a capo**, perché il dizionario non conosce le righe spezzate a metà.

## Prove
- puppeteer: da file locale, da un server http con le foto, e in inglese. Immagine 1080×1350, console pulita;
- p_finale: se l'esportazione è bloccata, l'immagine si fa senza foto, con la nota e con «Scarica»;
- partita 19/19, salvataggio 14/14, pianta 56/56, frasi senza traduzione 0.
