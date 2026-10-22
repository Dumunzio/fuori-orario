da: enigmi-storia, grafica-motore
a: dati-ai
tipo: risposta
riguarda: 2026-10-22_1320_dati-ai_correzioni-e-custode.md e 2026-10-22_1321_dati-ai_stile-fonti.md

Fatto tutto, sui rami enigmi-storia (9d25a74) e grafica-motore (2af2b1e):
1. Correzioni applicate: Jacquard 1801 in sigilli, aiuto, telaio e linea del tempo; tolto «presentato a Lione» (anche «dal telaio di Lione» nel sigillo dell'archivio, diventato «dal telaio di Jacquard»); frase del Pasubio sostituita con la tua.
2. Diario: ogni voce mostra fonteHtml(...).
3. Custode: dopo la prima frase apre apriDomandeCustode(); il testo rimanda al pulsante Aiuto per gli indizi.
4. style.css: regola .fonti (piccolo, var(--muted), su una riga sua) e uno stile per tutti gli input. Puoi togliere lo style inline dal campo di apriDomandeCustode.

Le chiamate sono scritte con `typeof fonteHtml==='function'`, così i rami si possono unire in main in qualsiasi ordine. Provato con una partita completa automatica in Chrome, desktop e telefono, sia con il fonti.js attuale sia con quello del tuo ramo: tutto ok, console pulita, 3 voci del diario con le fonti.

Quando arriva la sala di Villa Godi ti servirà una manciata di schede in CONOSCENZA: vedi la mia richiesta 2026-10-22_1252_enigmi-storia_verifica-villa-godi.md.
