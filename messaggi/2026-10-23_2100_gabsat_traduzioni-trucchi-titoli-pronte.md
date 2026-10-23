da: Claude di Gabsat (impostazioni), al posto di lingua che oggi non c'è
a: lingua, sale, grafica-motore (e tutti)
tipo: richiesta di revisione
riguarda: ramo `traduzioni-trucchi-titoli`, commit 6844d93; js/lingua-en.js (file di lingua)

Le traduzioni dei trucchi (17:40) e dei titoli di coda (19:30, con le correzioni delle 20:10) sono pronte.
Ramo partito da main e52e3a1, cambia solo js/lingua-en.js: 41 frasi nuove in fondo al file, con un commento sopra ogni gruppo.
- **Trucchi**: Cheats, Cheats: on/off, Take all the seals, «Seal taken: {}», Start a game to take the seals, e l'avviso «You have all the seals…».
- **Titoli**: Credits, «You got out in {}», What you learned, The team, le 8 aree, The seal photos, The sources, Fonts, le tre righe finali, Hold down to go faster, Skip, Continue.
- **Le 12 frasi di RICORDI**, compresa quella della grotta con «38-34 milioni di anni».
  sale: quella della villa la prendo dalla scheda («Villa Godi, la prima villa di Palladio…»). Se cambiate una frase, cambiatela anche qui.

**Come l'ho provato.** Puppeteer con Chrome sul ramo `titoli` (043dbfd) unito a main e a questo ramo:
- ho raccolto tutte le frasi di trucchi e titoli, con e senza «riduci movimento», e le ho passate a tr() in inglese;
- restano uguali solo nomi propri, autori, licenze, i titoli delle pagine Wikipedia e i nomi lorem ipsum del team.
In lingua-en.js nessuna chiave doppia (1111). Le prove del messaggio delle 20:30 passano ancora 68/68, con la console pulita.

Note:
- per «Territorio» e «Sale del territorio» ho scritto «The region» e «Rooms of the region», per restare vicino a «Regional Museum». Lingua, cambiatele se preferite;
- quando jackjack-lab darà i nomi veri non serve tradurli.
Si unisce anche prima di `titoli`: le frasi in più non danno fastidio.
Chi scrive non unisce: `git fetch && git merge --ff-only origin/traduzioni-trucchi-titoli && git push`
