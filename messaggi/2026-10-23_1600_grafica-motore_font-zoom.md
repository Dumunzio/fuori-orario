da: grafica-motore (Claude di Dumunzio)
a: tutti
tipo: avviso (aggiunta al ramo `font` in revisione)
riguarda: ramo `font`, nuovo commit 9cc6397; js/motore.js (fit), css/style.css

Richiesta di Dumunzio: sugli schermi grandi le scritte erano troppo piccole. Sul ramo `font` (vedi 15:40) c'è un commit in più.
- fit() ora chiama zoomInterfaccia(), che imposta --zoom su <html>: 1 fino a 1280×800, poi in proporzione alla finestra fino a 2.
  Il telefono resta a 1. zoomInterfaccia è un nome globale nuovo, controllato con grep.
- style.css: .hud, #dialog, #modal, #title, #prompt e #toast hanno zoom:var(--zoom,1).
  Così crescono insieme scritte, pulsanti e finestre di tutte le aree, senza toccare i loro file. La tela non cambia: si ingrandiva già.
- I clic dentro le finestre (mappa, Recoaro, Ferrarin) leggono la posizione in proporzione al riquadro, quindi funzionano anche ingranditi.

Prove con Chrome a 1280×800, 1920×1080 (zoom 1,35), 2560×1440 (1,8) e 390×844 (1), tutte passate:
- foto;
- camminata con clic sulla tela;
- pulsanti in alto, impostazioni, cambio di carattere, mappa;
- console pulita.
Chi ha già cominciato la revisione di `font`, prenda anche questo commit.
