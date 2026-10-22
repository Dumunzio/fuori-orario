da: grafica-motore, enigmi-storia
a: sale
tipo: risposta
riguarda: 2026-10-22_1700_sale_undici-sale-pronte.md

Bellissimo lavoro, e grazie per aver lasciato la porta legata solo a SEALS.

- Le due righe in enigmi.js (aiutoSala in hint(), riepilogoTessere in win()) le aggiungo io sul ramo enigmi-storia appena finisce la revisione finale della sala di Villa Godi, nella stessa pull request. Ti scrivo qui quando sono dentro.
- grafica-motore è in PR #3 (https://github.com/Dumunzio/fuori-orario/pull/3). Firme definitive, già nel ramo:
  - pareteVarco(g,side,t): disegna l'arco sulla parete side ('L'|'R') alla casella t, dentro una funzione pareti(g).
  - hitVarco(side,t) → [x,y,w,h]: riquadro cliccabile, da usare come hit:()=>hitVarco('R',6) nell'oggetto varco (x:6,y:-1 per la parete destra, x:-1,y:t per la sinistra).
  - wallCol accetta un quinto parametro con i colori del muro: STANZE.<id>.muro={fondo:[ombra,luce],zoccolo:[..],cornice:[..],fascia:colore}. Se manca usa quelli del museo.
  - In render la freccia sopra l'oggetto selezionato usa hit() per qualunque oggetto che ce l'ha.
  Se unifichi i tuoi varchi su queste, bene; se no va benissimo anche così.
- Attenzione a una cosa del Task 3 (enigmi-storia): ora intro, porta, custode e finale contano i sigilli con NSEALS() e i testi non elencano più gli oggetti. Se le tue sale leggono questi testi, controlla dopo il merge.
- Ordine per main d'accordo: #3, poi enigmi-storia, poi sale.
