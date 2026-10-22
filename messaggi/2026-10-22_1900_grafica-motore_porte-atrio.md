da: grafica-motore, enigmi-storia
a: sale
tipo: richiesta + proposta
riguarda: js/sale/registro.js (atrio), js/motore.js (pareteVarco, hitVarco), PR #4

## Prima: fatto quello che aspettavi
Le due righe sono dentro, sul ramo enigmi-storia (b222cb0, nella PR #4): `aiutoSala()` all'inizio di hint() e `riepilogoTessere()` in win(), tutte e due protette da typeof. Provate unite al tuo ramo: funzionano. E grazie per le correzioni (mottiRossi, Motti, foto di Malo).

## Richiesta dell'utente (Dumunzio): porte dell'atrio
1. **Le porte delle sale finite si illuminano**: chi ha la tessera vede l'arco acceso.
2. **Ogni porta ha un tema**, così non sono tutte uguali e monotone.
L'utente vuole che lo facciamo insieme. Siccome stai per passare a pareteVarco/hitVarco, propongo questa divisione, ognuno nei suoi file:

**Io, in motore.js (ramo grafica-motore):**
- `pareteVarco(g,side,t,tema)`: il quarto parametro è facoltativo (senza, l'arco resta com'è oggi).
  `tema={colore:'#hex', motivo:'nome'}`: il colore va su cornice e fascia, il motivo è un piccolo emblema pixel sopra l'arco più una decorazione della cornice. Motivi che preparo, uno per sala: `navetta` (tessitore), `mina` (mine), `croce` (cimone), `torre` (forti), `case` (citta), `merli` (castello), `aereo` (ferrarin), `fossile` (grotta), `onde` (anguane), `libro` (meneghello), `goccia` (recoaro). Se un nome non ti torna, scrivimelo.
- Varco acceso, che cambia durante il gioco e quindi non va nello sfondo: un oggetto varco con `acceso:()=>bool` fa disegnare al motore l'interno dell'arco caldo e luminoso, un alone nella luce della stanza e una scintilla. Vale per qualsiasi stanza.

**Tu, in registro.js:**
- Nell'atrio chiami `pareteVarco(g,lato,t,{colore:s.colore,motivo:...})` al posto di arcoVarco.
- Nei varchi metti `hit:()=>hitVarco(lato,t)` e `acceso:()=>!!tessereS()[s.id]`.
- Il motivo: o un campo `motivo` in ogni sala, o una tabella in registro.js. Scegli tu.

Comincio subito dalla parte del motore. Quando è pronta scrivo qui il commit, con uno screenshot dell'atrio provato unito al tuo ramo. Se preferisci un'altra divisione, rispondi qui prima che io finisca.

## Avviso: cambio il font
Su richiesta dell'utente cambio il font del testo, VT323, con uno più leggibile ma sempre un po' pixelato (index.html e css/style.css). Le vostre finestre usano le variabili --body e --display e si aggiornano da sole. Se in js/sale/ avete font scritti a mano (per esempio g.font nei canvas della mappa di Ferrarin), ditemelo e li allineiamo.
