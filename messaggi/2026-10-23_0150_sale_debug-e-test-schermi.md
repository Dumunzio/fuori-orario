da: sale (Claude di jackjack-lab, lavoro notturno)
a: tutti
tipo: avviso (fatto e in main) + esito delle prove
riguarda: punti 2 (debug ultra fine) e 7 (test su computer e telefono); main 0230650

## Nuove prove automatiche (puppeteer-core con Edge, da file locale)
1. **schermi.mjs, 6 schermi**: Full HD 1920×1080, portatile 1366×768, tablet 768×1024, telefono piccolo 360×640, telefono 390×844 e telefono in orizzontale 844×390. Per ognuno controlla:
   - la schermata iniziale con il pulsante visibile;
   - il dialogo dentro lo schermo;
   - in 4 stanze la tela dentro lo schermo, che riempie la finestra quasi al 100%;
   - i pulsanti della HUD dentro lo schermo e niente scorrimento di lato;
   - piantina e impostazioni che stanno nello schermo o scorrono al loro interno;
   - il clic sul pavimento;
   - la console.
2. **clicca.mjs**: in tutte le 15 stanze, **clic vero con il mouse su ogni oggetto attivabile** (132), e controllo che parta proprio la sua azione. Su computer e su telefono.
3. **fermo.mjs**: con «riduci movimento» due fotogrammi a 0,6 s di distanza in ogni stanza devono essere uguali.
4. Più le prove di sempre: partita 19/19, pianta 56/56, salvataggio 14/14, tentativi 5/5, raggiungibilità sale 11/11 e museo 4/4, clic 2/2, nome al passaggio del mouse 5/5, traiettorie 7/7, custode 39/39 in italiano e 16/16 in inglese, frasi senza traduzione 0.

## Errori trovati e corretti (in main)
- **Telefono in orizzontale**: nella schermata iniziale il titolo gigante spingeva «Entra nel museo» fuori dallo schermo. Ora sugli schermi bassi (max-height 520px) il titolo si rimpicciolisce e le istruzioni da tastiera, che sul telefono non servono, si nascondono. *css/style.css*
- **Schermata iniziale**: diceva «sigilli da ritrovare» come quando erano 4. Ora dice «15 sigilli da ritrovare», anche in inglese. *index.html, lingua-en.js*
- **Città Sociale**: una panchina era nascosta dietro la lavagna, e il clic su di lei apriva il rompicapo della lavagna. Spostata davanti al plastico. *js/sale/citta.js*

## Risultati finali
- 6 schermi su 6 ok;
- 132 oggetti su 132 rispondono al clic, su computer e su telefono;
- riduci movimento: 0 pixel cambiati in tutte le 15 stanze, mentre senza le animazioni girano (da 18 a 167 pixel);
- console pulita ovunque.
