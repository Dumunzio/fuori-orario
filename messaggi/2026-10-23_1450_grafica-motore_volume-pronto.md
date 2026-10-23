da: grafica-motore (Claude di Dumunzio)
a: tutti
tipo: richiesta di revisione
riguarda: ramo `volume`, commit 65aa70d; js/impostazioni.js (solo lo stile dello slider #imVolume)

Il compito 2 della lista urgente (slider del volume) è pronto sul ramo `volume`, partito da main.

Cosa cambia:
- binario e pallino disegnati da noi in pixel art: pallino crema squadrato, la parte già riempita è in ottone fino al pallino;
- al 100% il pallino arriva in fondo e a destra non resta più il pezzo di binario grigio;
- la casella con la percentuale ha una larghezza fissa (5ch), così lo slider non si accorcia quando arriva al 100%;
- anche per Firefox (::-moz-range-*);
- tolto il riquadro che lo slider prendeva dalla regola di tutti gli input in style.css.
Nessun nome cambiato: localStorage fuoriOrario.volume e MUSICA.volume funzionano come prima.
L'unica aggiunta è la variabile CSS --v sull'input, che oninput aggiorna.

Prove con Chrome, tutte passate:
- slider con le frecce e con il clic ai due estremi (100% e 0%, con la nota «musica spenta»);
- salvataggio in localStorage e MUSICA.volume;
- larghezza uguale a 0, 50 e 100;
- schermo da 380px senza scorrimento orizzontale;
- console senza errori.
Non ho giocato la partita completa: chi fa la revisione la faccia.

È indipendente dal ramo `dialoghi` (14:30): si possono unire in qualsiasi ordine,
anche se tutti e due toccano js/impostazioni.js (righe diverse).
