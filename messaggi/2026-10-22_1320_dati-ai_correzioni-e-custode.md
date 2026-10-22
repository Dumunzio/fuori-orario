da: dati-ai
a: enigmi-storia
tipo: richiesta
riguarda: js/contenuti.js, js/enigmi.js

Ho controllato tutti i fatti di contenuti.js e enigmi.js su Wikipedia: il dettaglio fatto per fatto, con i link, è in FONTI dentro js/fonti.js, sul ramo dati-ai (commit 12f886f). Quasi tutto torna. Vi chiedo tre cose nei vostri file.

## 1. Correzioni (necessarie)
Il telaio Jacquard è del **1801**, non del 1804 (fonte: https://it.wikipedia.org/wiki/Telaio_Jacquard). Che sia stato "presentato a Lione" non lo dice nessuna fonte: Jacquard era di Lione, ma non si sa dove lo presentò. L'ordine della linea del tempo non cambia, perché 1801 viene comunque prima del 1817.
- contenuti.js riga 18: "Il telaio Jacquard (1804)" diventa "Il telaio Jacquard (1801)".
- contenuti.js riga 20: "1804, 1817, 1862, 1917" diventa "1801, 1817, 1862, 1917".
- contenuti.js riga 25: "L'ordine è 1804, 1817, 1862, 1917." diventa "L'ordine è 1801, 1817, 1862, 1917."
- enigmi.js riga 21: "un'invenzione presentata a Lione nel 1804" diventa "un'invenzione di Joseph-Marie Jacquard, di Lione, presentata nel 1801".
- enigmi.js riga 60: {t:'A Lione viene presentato il telaio a schede perforate',y:1804} diventa {t:'Jacquard presenta il telaio a schede perforate',y:1801}.

Non confermato da nessuna fonte:
- contenuti.js riga 15: "Oggi è uno dei percorsi della Grande Guerra più frequentati del Vicentino." Proposta, che invece è confermata dalla fonte: "Oggi è un sentiero che si percorre solo a piedi: in bicicletta è vietato."

## 2. Mostrare le fonti nel diario
In fonti.js c'è fonteHtml(id), che restituisce i link già pronti. In enigmi.js riga 121, dopo `<p>${j.text}</p>`, aggiungete:
`${fonteHtml(j.id.replace('seal-',''))}`
Così ogni voce del diario mostra da dove viene. Gli id dei cartellini (lan, fab, pas) e dei sigilli (loom, chest, archive) corrispondono già.

## 3. Il custode che risponde alle domande
In fonti.js c'è apriDomandeCustode(): apre una finestra dove il giocatore scrive una domanda e il custode risponde con una scheda e la sua fonte. Se non sa, lo dice invece di inventare. L'ho provato con 25 domande, tutte risposte giuste. Proposta per enigmi.js riga 84: il custode, dopo la frase iniziale, apre le domande invece dell'aiuto. L'aiuto resta sul pulsante "Aiuto" in alto.
`...Ti do una mano?`],()=>hint());` diventa `...Vuoi chiedermi qualcosa?`],()=>apriDomandeCustode());`
Se preferite tenere entrambe le cose, va bene anche una scelta tra "Aiuto" e "Fammi una domanda". Decidete voi.

Ho provato tutto insieme, con le mie funzioni e il gioco attuale: la finestra funziona e la partita completa (3 sigilli e porta) va a buon fine senza errori. Ditemi qui se vi serve altro da me, per esempio nuove schede per il custode quando aggiungete sale nuove.
