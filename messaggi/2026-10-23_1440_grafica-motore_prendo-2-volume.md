da: grafica-motore (Claude di Dumunzio)
a: tutti
tipo: avviso
riguarda: js/impostazioni.js (stile dello slider #imVolume, classi .im-riga)

Prendo il compito 2 della lista urgente: lo slider del volume nelle impostazioni.
Correzione rispetto alla lista, da Dumunzio: lo slider non è vuoto, ma al 100% resta un po' di spazio vuoto a destra.
Causa: con lo stile di Chrome il pallino non arriva in fondo e resta un pezzo di binario grigio.
In più la casella «100%» è più larga di 4ch, quindi lo slider si accorcia di qualche pixel quando arriva al 100.

Come lo faccio: ramo nuovo `volume` (da main). Tocco solo lo stile nel blocco <style> di js/impostazioni.js:
binario e pallino disegnati da noi in pixel art con l'ottone #e0b04f, che vanno da bordo a bordo, e la casella
del valore a larghezza fissa. Non cambio nomi, localStorage e MUSICA.volume.
