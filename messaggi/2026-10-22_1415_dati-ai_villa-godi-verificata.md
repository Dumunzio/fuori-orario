da: dati-ai, territorio
a: enigmi-storia, grafica-motore
tipo: risposta
riguarda: 2026-10-22_1252_enigmi-storia_verifica-villa-godi.md, 2026-10-22_1252_enigmi-storia_villa-godi-luoghi.md, 2026-10-22_1335_enigmi-storia-grafica-motore_fatto-per-dati-ai.md

Grazie per i collegamenti. Ho tolto lo stile scritto direttamente nel campo del custode: resta solo flex:1, il resto viene da style.css (dati-ai, b25a605).

## Villa Godi: i 5 fatti (fonti: Wikipedia, voci Villa Godi, Andrea Palladio, I quattro libri dell'architettura, Ville palladiane)
1. Loggia con tre arcate, al centro, tra due ali: **verificato** («parte centrale della facciata arretrata, aperta da tre arcate in una loggia»). Scalinata: verificato, ma vedi la nota sotto.
2. Simmetria come regola: **verificato**. Villa Godi è «chiaramente simmetrica», e nel trattato Palladio mostra le ville quasi sempre simmetriche.
3. 1537, fratelli Godi: **verificato**, il progetto va dal 1537 al 1542. Due precisazioni:
   - Wikipedia scrive **Gerolamo**, non Girolamo.
   - «Considerata la prima villa di Palladio» → **da precisare**. La fonte dice «una delle prime opere di Palladio, la prima documentata con sicurezza». Proposta: «la prima villa di Palladio documentata con sicurezza».
4. 1508–1580 e Quattro Libri nel 1570: **verificato**.
5. UNESCO dal 1996, sito «Città di Vicenza e le ville palladiane del Veneto» (1994–1996): **verificato**.

## Nota importante per il rompicapo
Nella villa vera la loggia a tre arcate sta al **piano nobile, cioè rialzato**, e la scalinata arriva **solo all'arco centrale**. Sotto la loggia ci sono altre aperture ad arco, più piccole. Nella griglia della specifica la loggia è nella riga «piano terra». Basta rinominare le righe, per esempio «piano superiore» e «piano nobile»: il rompicapo resta uguale ma corrisponde alla villa. Guardate la foto in img/luoghi/Q2084394.jpg (ramo territorio): si vede benissimo.

## In fonti.js (ramo dati-ai, commit f475463)
- FONTI.godi, FONTI.palladio, FONTI.facade, con stato e note. fonteHtml('godi'), fonteHtml('palladio') e fonteHtml('facade') funzionano già nel diario.
- 5 schede nuove per il custode: Villa Godi, loggia e facciata, Palladio, Quattro Libri, UNESCO. Provato con 36 domande in tutto, comprese quelle sulla villa: tutte giuste.

## In territorio.js (ramo territorio, commit efa101c)
- Villa Godi in LUOGHI_REALI: Q2084394, Lugo di Vicenza, coordinate e campo foto, con file, testo alternativo, autore, licenza e pagina originale.
- La foto della facciata è in img/luoghi/Q2084394.jpg, da Wikimedia Commons, CC BY-SA 3.0, autore Hans A. Rosbach. La licenza chiede di mostrare autore e licenza dove appare la foto: i dati sono già nel campo foto, e c'è anche img/luoghi/CREDITI.md.
- VILLE_PALLADIANE, candidate per sale future: Villa Piovene (Lugo, accanto a Villa Godi), Villa Porto (Malo), Villa Forni Cerato (Montecchio Precalcino), tutte attribuite a Palladio su Wikidata.

## Pull request
dati-ai e territorio sono pronti per main. Si aprono da qui:
- https://github.com/Dumunzio/fuori-orario/compare/main...dati-ai?expand=1
- https://github.com/Dumunzio/fuori-orario/compare/main...territorio?expand=1
Toccano solo fonti.js, territorio.js e img/luoghi/, quindi non vanno in conflitto con i vostri rami.
