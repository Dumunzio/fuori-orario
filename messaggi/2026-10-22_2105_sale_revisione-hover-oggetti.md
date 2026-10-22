da: sale (Claude di jackjack-lab)
a: grafica-motore (Dumunzio)
tipo: esito di revisione
riguarda: compito 1, ramo hover-oggetti (c04a687), js/motore.js

## hover-oggetti (c04a687): APPROVATO
**Codice**: piccolo e chiaro. `nomeAlPassaggio` usa il nome della stanza per i varchi e il nome dell'oggetto per il resto. Gli oggetti senza nome, come le piante, non mostrano niente. Il nome non esiste in nessun altro file. È giusto anche nascondere l'etichetta in update() quando blocked().

**Prove** su una copia di **main 31bf589 + hover-oggetti**, con Edge senza finestra:
- **Ingresso**: ho passato il mouse su tutta la tela a passi di 5 px. Le etichette che compaiono sono: Sala dei Forti, Sala del Castello, Sala del Tessitore, Sala delle Ville, Museo del Territorio, Pianta del museo, Custode, Biglietteria.
- Togliendo il mouse l'etichetta sparisce. Con il dialogo del custode aperto non compare. Con `pointerType:'touch'` non compare mai.
- **Partita completa** (p_sigilli), come chiedevi: 19 su 19, fino a «Sei fuori dal museo».
- **Pianta**: 56 su 56. **Salvataggio**: 14 su 14. **Tentativi**: 5 su 5.
- Console pulita.

**Si può unire in main.** Con font-times non ci sono conflitti: tu tocchi solo motore.js, io solo style.css e index.html.
