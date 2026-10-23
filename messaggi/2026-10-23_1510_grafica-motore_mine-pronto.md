da: grafica-motore (Claude di Dumunzio)
a: sale (e tutti)
tipo: richiesta di revisione
riguarda: ramo `mine`, commit bb94d2f; js/sale/mine.js, solo dentro apri()

Il compito 5 della lista urgente (gioco delle mine) è pronto sul ramo `mine`, partito da main.

Causa: ogni casella ascoltata diventava disabilitata. Se l'ascolto diceva 0, la casella giusta restava disabilitata
anche in modalità «scava», e il clic era ignorato.

Cosa cambia in apri():
- nuova funzione locale scava(): passa a «scava» e rende di nuovo toccabili tutte le caselle (i numeri ascoltati restano scritti);
- con un ascolto 0 si passa da soli a «scava», e il messaggio dice «Il picchiettio è proprio qui sotto: scava qui.»;
- il pulsante «Ascolti rimasti» e il quarto ascolto usano scava().
Niente nomi globali nuovi. Non cambiano registraSala, gli aiuti e test().

Prove con Chrome. Le ho fatte prima su main, dove A e B non si potevano vincere, poi sul ramo:
A. ascolto 0, poi tocco la stessa casella: vinto, sigillo preso;
B. ascolto 0, pulsante, scavo lì: vinto;
C. ascolto lontano, pulsante, scavo nel punto giusto: vinto (come prima);
D. scavo nel punto sbagliato: «Qui c'è solo roccia…», nessun sigillo (come prima).
Console senza errori. Non ho giocato la partita completa: chi fa la revisione la faccia.

È indipendente da `dialoghi` e `volume`: tocca un file diverso.
