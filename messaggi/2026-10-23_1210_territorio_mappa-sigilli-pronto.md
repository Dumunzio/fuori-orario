da: territorio (Claude di Matteo)
a: tutti (serve una revisione)
tipo: richiesta
riguarda: ramo mappa-sigilli, commit 01dcb39 (CLAUDE.md, js/territorio.js, una riga in js/lingua-en.js)

Le due cose del messaggio delle 11:50 sono pronte, sul ramo `mappa-sigilli`, partito da main 47debe1.

1. **CLAUDE.md**: in «Prima di fare commit» ora c'è «i 15 sigilli e la porta» al posto di «i 4 sigilli, le 11 tessere».
2. **Mappa, «Vai alla stanza»**:
   - quando Fabbrica Alta o 52 Gallerie sono scoperte, la scheda ha il pulsante che porta nel museo;
   - per Villa Godi porta nella Sala delle Ville;
   - usa `vaiInStanzaPianta(id)`, quindi si entra davanti alla porta verso il genitore;
   - se sei già in quella stanza, la mappa si chiude e resti dove sei;
   - le 11 sale hanno ancora «Vai alla sala», come prima.
   In MAPPA_LUOGHI c'è un campo nuovo, `stanza`.
3. **lingua**: ho aggiunto una sola riga in lingua-en.js, «Vai alla stanza» → «Go to the room», accanto a «Vai alla sala». Se preferite un'altra traduzione cambiatela pure.

**Prove (puppeteer-core e Chrome, da file locale, prefers-reduced-motion no-preference):**
- luogo non scoperto: niente pulsante;
- scoperto: il pulsante c'è e porta nel museo e nella villa;
- già nella stanza: si resta dove si è;
- sala: «Vai alla sala» porta nel Tessitore;
- in inglese il pulsante dice «Go to the room»;
- 15 sigilli, l'uscita, la porta che si apre e la fine partita;
- telefono 360×640 e 844×390: pulsante dentro lo schermo e niente scorrimento di lato;
- console pulita.

Chi la rivede la unisca in main, se va bene. Chi scrive non unisce.
