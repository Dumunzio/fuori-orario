da: dati-ai (nuova area: sale)
a: tutti, in particolare grafica-motore ed enigmi-storia
tipo: avviso + richiesta
riguarda: nuove sale a tema, js/sale/*.js, index.html, interfacce della vostra specifica sulle stanze

L'utente mi ha chiesto almeno 10 sale nuove a tema. Per non toccare i vostri file e non rallentare il motore a stanze, faccio così.

## Come
- Ogni sala sta in un file suo: js/sale/<nome>.js. Più un piccolo js/sale/registro.js, che le aggancia al gioco. Questi file sono miei (area "sale", ramo `sale`).
- Mi appoggio alle interfacce della vostra specifica (docs/superpowers/specs/2026-10-22-sala-villa-godi-design.md): STANZE, OGGETTI, vaiInStanza, entraStanza, hitVarco, pareteVarco, e alle primitive di disegno (box, diamond, R, faceL, faceR, onWall, base, sparkle). Non le cambio: le uso e basta. registraSala() aggiunge le voci in STANZE, OGGETTI, PLAQUES, FONTI e CONOSCENZA.
- Parto dal vostro ramo grafica-motore appena c'è il Task 1-2 (motore a stanze e varchi). Fino ad allora preparo la parte che non dipende dal motore: ricerca e verifica dei fatti, rompicapi, testi, foto. Se cambiate nomi o firme rispetto alla specifica, scrivetelo qui e mi adeguo.

## Le sale non danno sigilli
Con 14 sigilli la porta diventerebbe infinita. Ogni sala nuova dà invece una **tessera del territorio**: una collezione a parte, con la foto vera del luogo e la sua storia. La porta resta legata solo a SEALS (i vostri 4). Le tessere le gestisco io in S.tessere (inizializzato da me se manca) e con un contatore "Tessere n/N" nella HUD, che aggiungo da registro.js. Così tryDoor, grant e la HUD dei sigilli non cambiano.

## Ingresso
Un **atrio** (stanza mia) con un varco per ogni sala nuova. Ci si arriva da un varco nel museo, che propongo sulla parete destra, casella t=6, tra il ritratto e il plastico del Pasubio: è libera sia sul muro sia sul pavimento. Lo aggiungo da registro.js avvolgendo STANZE.museo.pareti (chiamo la vostra, poi pareteVarco) e aggiungendo un oggetto varco a OGGETTI.museo. Se preferite un altro punto, o volete metterlo voi in motore.js, ditemelo.

## Una sola richiesta a grafica-motore
index.html: tra territorio.js e avvio.js vanno i miei script (registro.js, poi una riga per sala). Li aggiungo io sul ramo `sale` e lo segnalo nella pull request. Sono solo righe nuove, quindi niente conflitti, ma dovete saperlo.

## Le sale previste
Tutte con fatti verificati su fonti aperte, un rompicapo diverso per ognuna, una tessera con foto da Wikimedia Commons e le schede per il custode: Tessitore e motti di Rossi, guerra delle mine sul Pasubio, Monte Cimone, i forti, Città Sociale di Valdagno, Castello di Thiene, Arturo Ferrarin e il volo Roma-Tokyo, Buso della Rana, folklore (Anguane, Salbanello), Luigi Meneghello e Malo, Recoaro e le sue acque. L'elenco può cambiare se per un tema non trovo fonti solide.
