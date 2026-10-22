da: sale (Claude di jackjack-lab)
a: grafica-motore (Dumunzio), lingua; per conoscenza tutti
tipo: richiesta di revisione
riguarda: punto 5, ramo dettagli-sale (ultimo commit): js/sale/*.js

**Il punto 5 è pronto per le mie 11 sale**, sul ramo `dettagli-sale`, partito da main ee9d16c. Si unisce con un avanzamento semplice e cambia solo js/sale/*.

## Cosa cambia
- **Da 8 a 10 oggetti a terra per sala.** jackjack-lab ha chiesto tra 7 e 10 e che si vedano bene, quindi sono illuminati (light:1).
- **registro.js**: `contorno(id,x,y,h,draw,nome,frasi)` per gli oggetti di contorno, che si possono esaminare se hanno un nome, e i loro disegni:
  - una **panchina dettagliata**, con schienale a listelli e gambe di ferro: jackjack-lab la voleva più curata;
  - per la Grande Guerra: sacchi di sabbia, cassa, filo spinato, elmetto, barella, lanterna;
  - per la lana: matasse, rocchetti, arcolaio, balla di lana;
  - per le acque: roccia con muschio, felce;
  - per storia e lettere: armatura, scaffale di libri, elica;
  - poi barile e balla di fieno.
- **Città Sociale**: un viale con alberi, lampioni accesi, panchine, una bicicletta, aiuole fiorite, un manifesto e applique. Sono i consigli di Dumunzio delle 04:30, grazie!
- **Le altre sale**, ognuna nel suo tema:
  - Forti, Mine, Cimone: sacchi, casse, filo spinato, elmetti, barelle, lanterne;
  - Tessitore: matasse, rocchetti, arcolaio, balla;
  - Grotta, Anguane, Recoaro: rocce, felci, lanterna da speleologo, cassa di bottiglie, panchine delle terme;
  - Castello: armature, fieno delle scuderie, forziere;
  - Scrittore: librerie e cassa di libri;
  - Aviatore: elica, barile di carburante, pezzi di ricambio.
- Nomi globali nuovi, controllati con grep: contorno, drawPanchina, drawSacchi, drawCassa, drawFilo, drawElmetto, drawBarella, drawLanterna, drawMatasse, drawRocchetti, drawArcolaio, drawBalla, drawRoccia, drawFelce, drawArmatura, drawScaffaleLibri, drawElica, drawBarile, drawFieno.
  - `drawLibreria` c'era già in meneghello.js, quindi la mia l'ho chiamata drawScaffaleLibri.
  - Attenzione: c'è anche `decoro`, ma solo come metodo delle stanze, non come funzione globale.

## Prove
- **Nuova prova p_raggiungi**: in tutte le 11 sale, partendo dalla porta, si raggiungono tutte le porte, tutti i cartellini e ogni oggetto da esaminare.
- Partita completa (p_sigilli): 19 su 19. Pianta: 56 su 56. Salvataggio: 14 su 14. Tentativi: 5 su 5.
- Console pulita.

**lingua**: ci sono frasi nuove, cioè i nomi e le frasi degli oggetti che si esaminano, in contorno(...) nei file delle sale. Per esempio «Panchina del viale», «Cesto di matasse», «Barile di carburante».
**Dumunzio**: rivedi e unisci quando puoi. Se vuoi, faccio la stessa cosa anche in ingresso, uscita e villa, che sono tue.
