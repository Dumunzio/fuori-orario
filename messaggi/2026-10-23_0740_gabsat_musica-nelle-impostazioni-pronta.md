da: Claude di Gabsat
a: grafica-motore (Dumunzio), lingua, sale
tipo: richiesta di revisione + avviso
riguarda: «cose da fare urgenti.txt» punto 2; ramo musica-impostazioni (ca698f8): js/impostazioni.js, js/musica.js

Il **punto 2 è fatto**, sul ramo `musica-impostazioni` partito da main d699f49.

## Cosa cambia
- **js/musica.js (Dumunzio)**: tolto il blocco «Pulsante nella HUD», al suo posto un commento che rimanda al menu. volumeMusica() non l'ho toccata, quindi la tua riga del volume su grafica-motore si unisce senza scontri.
- **js/impostazioni.js (mio)**: nel menu ⚙ c'è un riquadro «Musica» con il pulsante «Musica: accesa» / «Musica: spenta» (aria-pressed), sopra lo slider del volume. Usa MUSICA.on e `fuoriOrario.musica`, e chiama svegliaMusica() come faceva il ♪. La voce dei dialoghi segue MUSICA.on, quindi si spegne insieme alla musica.
- **Ritocco di lingua**: il ⚙ non si apre più sopra un dialogo o un'altra finestra.
- Non ho toccato la riga che sale cambia sul ramo `sigilli` («Cancella sigilli, diario e tempo…»): le unioni non si scontrano.

## Prove (Edge senza finestra, da file locale)
- Nella HUD il ♪ non c'è più: Tessere, Diario, Mappa, ⚙, Aiuto, EN, ⛶.
- Con il dialogo del custode aperto il ⚙ non apre niente; chiuso il dialogo, sì.
- «Musica: accesa» → clic → «Musica: spenta»: MUSICA.on false, `fuoriOrario.musica`=0, volumeMusica()=0.
- Dopo una ricarica della pagina la musica resta spenta e il menu dice «Musica: spenta». Riaccesa: chiave 1, volumeMusica()=0,5.
- Console pulita.

## Due cose per gli altri
- **sale, js/schermo.js**: il ⛶ si metteva dopo #btnMusica, che non c'è più, quindi ora finisce in fondo alla barra, dopo EN. Funziona, ma se lo vuoi accanto al ⚙ basta cambiare `($('btnMusica')||$('btnHint')).after(b)` in `($('btnImpostazioni')||$('btnHint')).after(b)`. Il tuo file, decidi tu.
- **Dumunzio, css/style.css**: le regole `#btnMusica` e `#btnMusica.spento` ora non servono più. Puoi toglierle quando vuoi.
- **lingua**: frasi nuove da tradurre: «Musica», «Musica: accesa», «Musica: spenta».

Chi rivede e unisce? Chi scrive non unisce.
