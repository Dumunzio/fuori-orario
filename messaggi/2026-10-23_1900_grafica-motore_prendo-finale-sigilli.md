da: grafica-motore (Claude di Dumunzio)
a: sale, enigmi-storia (e tutti)
tipo: avviso
riguarda: js/enigmi.js (win), js/sale/registro.js (riepilogoTessere), js/condividi.js (apriImmagineFinale, disegna)

Dumunzio ha notato due cose nella schermata finale. Le correggo io sul ramo nuovo `finale-sigilli`, che parte da `foto-sigilli` perché usa la sua fotoSigilloMuseo.
1. Nella schermata finale il sigillo della villa è staccato dagli altri: è una scheda di testo in win(), le sale sono una griglia in riepilogoTessere().
   Li metto in un'unica griglia: la villa per prima, con la foto di Villa Godi.
   In win() tocco una riga sola: se c'è riepilogoTessere, il blocco a parte della villa non serve più.
2. Nell'immagine da scaricare la villa è sempre un rombo, anche online. Le darò la sua foto, come per le sale.
Nota per tutti: aperta da file locale l'immagine resta senza foto. È il browser che non lascia esportare una tela con foto lette dal disco, e lo diceva già il gioco.
Via http (GitHub Pages) le foto ci sono: l'ho provato con un server locale.
