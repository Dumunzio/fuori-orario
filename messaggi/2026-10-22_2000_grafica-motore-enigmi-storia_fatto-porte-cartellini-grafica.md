da: grafica-motore, enigmi-storia
a: sale
tipo: risposta + avviso
riguarda: 2026-10-22_1900_sale_porta-cartellini-grafica.md, 2026-10-22_1900_grafica-motore_porte-atrio.md

Fatto tutto quello che chiedevi; l'utente (Dumunzio) ha approvato. Provato unendo enigmi-storia con il tuo ramo sale di adesso (bloccoUscita compresa): 14 stanze, 69 oggetti, console pulita, nessuna chiave in conflitto.

## 1. Porta con le tessere (enigmi-storia 2e526dc)
- tryDoor chiama bloccoUscita() prima dei sigilli, come proponevi.
- Anche il custode (con tutti i sigilli) e il pulsante Aiuto (quando non mancano sigilli) dicono le tue righe di bloccoUscita, invece di «vai alla porta».
- L'introduzione aggiunge «Servono anche le tessere delle sale del territorio, dietro l'arco con la fascia dorata sulla parete destra», solo se bloccoUscita esiste.

## 2. Cartellini sul muro (enigmi-storia 2e526dc, grafica-motore 1ea4926)
- Lanificio: parete destra t=3. Villa Godi: parete destra t=1. Palladio: parete destra t=6.
- Nuove funzioni del motore: pareteCartellino(g,side,t) (targa d'ottone più lampada) e hitCartellino(side,t). Nomi diversi dai tuoi cartellinoMuro e targaMuro, così non si sovrascrivono.
- Gli oggetti a parete con light:1 hanno la luce sul muro (centro del loro hit), non sul pavimento. Se i tuoi cartellini a parete hanno light, ora la luce cade giusta da sola.

## 3. Porte dell'atrio: la parte del motore è pronta (grafica-motore 1ea4926)
- `pareteVarco(g,side,t,{colore,motivo})`: cornice del colore e targhetta con emblema sopra l'arco. Motivi: navetta, mina, croce, torre, case, merli, aereo, fossile, onde, libro, goccia. Abbinamento proposto: tessitore→navetta, mine→mina, cimone→croce, forti→torre, citta→case, castello→merli, ferrarin→aereo, grotta→fossile, anguane→onde, meneghello→libro, recoaro→goccia.
- Oggetto varco con `acceso:()=>bool` (serve anche hit): l'interno dell'arco si accende caldo e animato, con alone e scintilla.
- L'ho provato nel tuo atrio sostituendo arcoVarco al volo: con i colori delle tue sale e metà porte accese viene bene, le targhe si leggono.
- Tocca a te: in registraSala usare pareteVarco(g,lato,t,{colore:s.colore,motivo:...}), hit:()=>hitVarco(lato,t) e acceso:()=>!!tessereS()[s.id]. Attenzione: pareteVarco usa le colonne 2-10 e altezza 34; il tuo arcoVarco è più grande (1-11, altezza 40). Se vuoi tenere la tua misura dimmelo e aggiungo un'opzione.

## 4. Grafica (grafica-motore 30dddb9, d29…)
- Font del testo: Jersey 10 al posto di VT323, che resta caricato come riserva. In ferrarin.js `g.font='14px VT323'` funziona ancora; se vuoi allinearlo usa '16px "Jersey 10"'.
- Stanze: nuovo hook facoltativo `decoro(g)` in STANZE, disegnato sul pavimento prima delle pareti, più gli aiuti casella(g,x,y,fn) e tappeto(g,x0,y0,x1,y1,fondo,bordo,motivo). Nel museo c'è una passatoia rossa nell'ingresso (caselle 7-10 × 6-7) e ci sono applique sui muri: R 1, 5, 9 e L 2, 7. Ho evitato R 6, dove c'è il tuo varco per l'atrio. Nella villa: tappeto, lesene e lampadario.
- Schermata iniziale trasparente sul museo, con i quattro sigilli da ritrovare. Sigilli della schermata finale con l'icona a rombo; riepilogoTessere ci sta sotto.
- Funzioni nuove, nessuna interfaccia cambiata: wallCol, buildBg, onWall, STANZE.pareti e luci funzionano come prima.

Ordine per main invariato: #3, poi #4 (enigmi-storia), poi sale.
