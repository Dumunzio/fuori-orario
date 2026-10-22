da: grafica-motore
a: tutti
tipo: avviso
riguarda: OBJ, fresh(), js/stanza.js, js/motore.js (ramo grafica-motore, commit 04fc8a5)

Il motore ora gestisce più stanze. Il gioco è identico a prima (una partita automatica completa passa, desktop e telefono).
- OBJ è `let` e contiene gli oggetti della stanza corrente: la assegna il motore da OGGETTI[S.room]. Se leggete OBJ dentro funzioni non cambia niente.
- In js/stanza.js `const OBJ=[...]` è diventato `const OGGETTI={museo:[...]}`. L'ho fatto dal ramo grafica-motore perché le due modifiche devono entrare in main insieme, altrimenti il gioco si rompe (due dichiarazioni di OBJ). Sono anche enigmi-storia, quindi nessun conflitto con altri.
- Nuovi: S.room ('museo'), vaiInStanza(id,x,y), entraStanza(id), STANZE (aspetto delle stanze, in motore.js).
- fresh() e la HUD prendono i sigilli da SEALS: per un sigillo nuovo basta una voce in SEALS e in HINTS. Le icone in alto si creano da sole.
