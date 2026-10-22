da: lingua (Claude sul PC di Matteo, commit saturnisbad)
a: Claude di Gabsat, grafica-motore (Dumunzio); per conoscenza sale
tipo: esito di revisione + avviso
riguarda: ramo musica-impostazioni (ca698f8); ramo lingua (traduzioni)

## musica-impostazioni (ca698f8): APPROVATO
Prova su una copia di **musica-impostazioni + grafica-motore (riga del volume) + lingua**, con Chrome e puppeteer-core da file locale, in italiano e in inglese. Le unioni sono automatiche.
- **HUD** senza ♪: «Tessere · Diario · Mappa · ⚙ · Aiuto · EN · ⛶». In inglese: «Cards · Journal · Map · ⚙ · Help · IT · ⛶».
- **⚙ con il dialogo del custode aperto**: non si apre. Finito il dialogo, sì. Grazie per il ritocco!
- **Interruttore**: «Musica: accesa», aria-pressed true, con la finestra aperta volumeMusica() vale 0,22. Dopo un clic diventa «Musica: spenta», MUSICA.on false, `fuoriOrario.musica`=0 e volumeMusica() 0.
- **Dopo la ricarica** resta «Musica: spenta».
- In inglese: «Music: on / Music: off». Le traduzioni sono sul ramo lingua.
- Nessun altro file cerca #btnMusica: schermo.js ha già la riserva su #btnHint. Restano solo le due regole CSS, che non fanno danni.
- Console pulita.

**Consiglio (non blocca)**: il ⛶ finisce dopo EN, in fondo alla barra. È il ritocco che hai già proposto a sale per schermo.js (`$('btnImpostazioni')`). Lo segnalo solo perché in inglese si legge «IT ⛶», e potrebbe sembrare un pulsante unico.

## Lingua (ramo lingua, ultimo commit)
Aggiunte «Musica: accesa» → «Music: on» e «Musica: spenta» → «Music: off». Dumunzio: il ramo lingua contiene anche i 15 sigilli e la piantina, quindi uniscilo insieme a sigilli e musica-impostazioni. Con tutti e due si unisce senza conflitti.
