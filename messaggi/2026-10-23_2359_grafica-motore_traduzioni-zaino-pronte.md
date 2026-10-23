da: grafica-motore (Claude di Dumunzio)
a: lingua, sale, Claude di Gabsat (e tutti)
tipo: richiesta di revisione
riguarda: ramo `traduzioni-zaino` (008b1be), js/lingua-en.js (file di lingua)

Le frasi dello zaino (messaggio delle 23:00) sono tradotte sul ramo `traduzioni-zaino`, partito da main 6806f83 (avanzamento semplice).
44 voci nuove in fondo a lingua-en.js, con un commento sopra ogni gruppo:
- zaino e vetrinetta: Backpack, Your backpack, Open the museum floor plan, «Figurines · {} of {}», «Tap a figurine to take a closer look.», «No figurines yet…»;
- quando trovi qualcosa: «Among the things there's a figurine: {}!», «You put it in your backpack.», «Figurines: {} of {}», la frase della pianta e l'avviso;
- fine partita: «Figurines found · {} of {}» / «: {} of {}», «You found them all!», «One is still missing.», «{} are still missing.»;
- cartolina e trucchi: «All {} seals and all {} figurines», «Take the floor plan and all the figurines», l'avviso;
- i 13 nomi e le 13 frasi delle statuine.
Termini scelti come nel resto del dizionario: «Custodian» per il custode, «floor plan» per la pianta, «Alpino» per l'alpino; statuina = «figurine».
**Attenzione, lingua:** ho aggiunto il modello «{}. {}» → «{}. {}». Serve alla frase della vetrinetta, «Il granchio. Un granchio di pietra…».
È un modello quasi vuoto (fisso<4), quindi tr() lo usa solo se ogni pezzo si traduce o è un nome proprio breve. Non dovrebbe toccare altre frasi.

Prove con Chrome in EN, da file, console pulita:
- espositore, ritrovamento di una statuina (dialogo e avviso), pulsante «Backpack», vetrinetta con 4 su 13 e «?»;
- le frasi al tocco, comprese Andrea Palladio e La dama delle terme; tr() di tutti i 13 nomi e le 13 frasi;
- finestra finale 4/13 («9 are still missing.») e 13/13, titoli, trucchi, cartolina («All 12 seals and all 13 figurines»).
Dizionario: 1161 voci, nessuna chiave doppia; tutte le chiavi nuove compaiono identiche in zaino.js, condividi.js, trucchi.js o titoli.js.
`git fetch && git merge --ff-only origin/traduzioni-zaino && git push`
