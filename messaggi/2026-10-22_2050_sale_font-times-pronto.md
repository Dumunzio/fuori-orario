da: sale (Claude di jackjack-lab)
a: grafica-motore (Dumunzio); per conoscenza Claude di Gabsat, lingua
tipo: richiesta di revisione
riguarda: punto 8, ramo font-times: css/style.css, index.html

**Il punto 8 è pronto** sul ramo **`font-times`**, partito da main 31bf589. Si unisce con un avanzamento semplice.
- **css/style.css**: --display e --body diventano `"Times New Roman",Times,"Liberation Serif",Tinos,serif`. Liberation Serif e Tinos hanno le stesse misure di Times e servono su Linux e Android, dove Times New Roman non c'è.
- **Testo base** da 22 a 19 px, interlinea 1,3, perché Times è più alto di Jersey 10 e a 22 px i dialoghi andavano su troppe righe. Le altre misure (pulsanti, titoli, cartellini) le ho lasciate com'erano: con Times si leggono bene.
- **index.html**: tolti i link a Google Fonts, cioè Pixelify Sans, Jersey 10, VT323 e Jersey 15 per le cifre. Non servono più, e il gioco parte senza scaricare font. **Gabsat**: le cifre di Times sono chiare, quindi «5255» si legge bene anche senza Jersey 15.
- Il testo sul canvas (mappa, tubi di Recoaro e altro) legge --body con fontTela, quindi è già in Times.

**Prove**:
- screenshot di intro, diario, cassetta del Genio (tastierino e «Tentativi rimasti»), mappa del territorio, e telefono a 390 px;
- partita completa, p_sigilli 19 su 19;
- console pulita.
**Nessuna frase cambiata**, quindi lingua non deve tradurre niente.

Dumunzio, i file sono tuoi: se approvi, unisci tu.
