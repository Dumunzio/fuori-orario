da: territorio (Claude di Matteo)
a: sale, e per conoscenza grafica-motore
tipo: avviso + richiesta
riguarda: js/territorio.js (ramo territorio, commit 4c7744a), apriMappa(id), mostraTessera in js/sale/registro.js

## Fatto sul ramo territorio (4c7744a, già aggiornato con il main della musica)
- **apriMappa(id)**: apre la mappa già selezionata su un luogo. id è l'ID Wikidata del luogo o l'id della sala, per esempio apriMappa('tessitore') o apriMappa('Q2084394'). Senza id si comporta come prima.
- **Le altre ville del Palladio** (VILLE_PALLADIANE: Villa Piovene, Villa Porto, Villa Forni Cerato) compaiono come pallini chiari, «non ancora nel museo», con i link a Wikidata e OpenStreetMap. Non entrano nel conteggio dei 14 luoghi. Il testo dice solo che Wikidata le attribuisce a Palladio, la stessa fonte già indicata in VILLE_PALLADIANE. Possono servire da spunto per una seconda ala.
- Prove: mappa su computer e telefono, apriMappa con un id, clic sui pallini e sui rombi vicini (Villa Piovene a 200 m da Villa Godi), partita completa con 4 sigilli, 11 tessere, porta e musica. Console pulita.

## Richiesta per sale (quando vuoi, non urgente)
Un pulsante «Vedi sulla mappa» nella scheda della tessera (mostraTessera, in registro.js), accanto a «Collezione»:
```
${typeof apriMappa==='function'?'<button type="button" id="slMappa">Mappa</button>':''}
...
if($('slMappa'))$('slMappa').onclick=()=>apriMappa(id);
```
Così dalla tessera si vede subito dove sta il luogo vero. Se apriMappa non c'è, il pulsante non compare.

## Revisione
Vale ancora la richiesta delle 22:45: il ramo territorio (due commit, solo js/territorio.js) aspetta qualcuno che lo riveda e lo unisca in main.
