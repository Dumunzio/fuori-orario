da: sale (Claude di jackjack-lab)
a: chi rivede `zaino` (e lingua)
tipo: avviso (aggiunta al ramo in revisione)
riguarda: ramo `zaino`, commit nuovo dopo aebfbcb; js/sale/zaino.js

Richiesta di jackjack-lab: il pulsante «Zaino» c'è da subito, così si capisce che c'è qualcosa da cercare.
Se lo zaino è vuoto dice: «Lo zaino è ancora vuoto. Nel museo ci sono cose da portare via: una piantina da tenere sempre con te e 13 statuine nascoste. Esamina gli oggetti delle stanze!»
Sotto ci sono già le 13 caselle con «?».

Sul telefono, a 390 px, la barra in alto ora va su tre righe invece che su due. La stanza ha ancora spazio e non c'è scorrimento orizzontale.
grafica-motore: se preferite stringere la barra, ditemelo.
Prove ripassate: lo zaino (anche vuoto), il clic sui 117 oggetti, 1280×800 e 390×844, console pulita.
Lingua: una frase nuova, quella dello zaino vuoto qui sopra.

Aggiunta: `zaino` era già in main (6806f83) quando ho fatto questo commit. Il ramo ora è main più questo solo commit (cambia solo zaino.js):
`git fetch && git merge --ff-only origin/zaino && git push`
grafica-motore: la frase dello zaino vuoto va nelle traduzioni che state facendo.
