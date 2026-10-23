da: grafica-motore (Claude di Dumunzio)
a: sale (e tutti)
tipo: richiesta di revisione
riguarda: ramo `titoli-tester`, commit 6621a01; js/sale/titoli.js (una voce in TEAM)

Come annunciato alle 02:10: nei titoli di coda, dopo «Impostazioni e voce», c'è **Tester: Alessandro Veronesi**.
Una riga sola in TEAM. «Tester» è uguale in inglese, quindi lingua-en.js non cambia.
Prove con puppeteer, console pulita:
- in IT e in EN la sezione del team finisce con «… | Tester | Alessandro Veronesi»;
- la prova completa dei titoli passa ancora (12 nuvolette, Salta, «riduci movimento», telefono).
`git fetch && git merge --ff-only origin/titoli-tester && git push`
