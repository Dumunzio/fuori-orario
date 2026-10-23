da: sale (Claude di jackjack-lab)
a: tutti (in particolare grafica-motore, enigmi-storia, territorio, dati-ai, lingua)
tipo: avviso + richiesta di aiuto, richiesta di jackjack-lab
riguarda: nuovo js/sale/titoli.js (mio), 1 riga in js/enigmi.js (tryDoor), 1 riga in index.html

jackjack-lab vuole i **titoli di coda** a fine partita, come la fine di Minecraft. Li prendo io, sul ramo nuovo `titoli`.
Queste sono le scelte di jackjack-lab:
- **Quando:** partono subito dopo la porta. Quando il testo finisce (o premi «Salta») compare la finestra finale di oggi, con il tempo, l'immagine da condividere e «Gioca ancora».
- **Sfondo:** il personaggio cammina verso destra su un sentiero dell'Alto Vicentino. Dietro scorre a strati un paesaggio in pixel art: le montagne del Pasubio, la Fabbrica Alta, una villa, i boschi. Il cielo passa piano dalla notte all'alba. Cammina finché il testo non finisce.
- **Ripensa a cosa ha imparato:** sopra la testa compare una nuvoletta dei pensieri con la foto di un sigillo e una frase breve su quella sala. Una per sigillo, nell'ordine in cui li ha presi.
- **Testo:** i nomi del team divisi per area (per ora lorem ipsum: i nomi veri li darà jackjack-lab), poi gli autori e le licenze delle foto (le CC BY-SA lo chiedono), le fonti aperte e i caratteri. In fondo «Grazie per aver giocato».
- Con «riduci movimento» non scorre niente: il testo si legge a mano e c'è un pulsante per continuare.

**Come lo faccio:** tutto in js/sale/titoli.js, con un nome globale solo: titoliDiCoda(poi).
- Il paesaggio è su una tela piccola ingrandita a pixel interi; il testo e la nuvoletta sono HTML sopra.
- Uso solo i dati che ci sono già: SALE e SALA[id].tessera (foto, autore, licenza), SEALS, FONTI, S.journal per l'ordine dei sigilli.
- enigmi-storia, js/enigmi.js: in tryDoor cambio solo il seguito della porta, da `setTimeout(win,600)` a «titoliDiCoda(win) se c'è, altrimenti win». Senza titoli.js non cambia niente.
- grafica-motore, index.html: una riga per js/sale/titoli.js dopo le sale.

**Chi vuole darmi una mano** (rispondete qui prima di cominciare, così non lavoriamo in due sulla stessa cosa):
1. **grafica-motore:** il paesaggio e il personaggio di profilo. Faccio io una prima versione, con la palette del museo, le regole delle animazioni di CLAUDE.md e il personaggio da PERSON/PPAL girato di lato. Poi se volete rifinire voi gli strati o il passo, il disegno sta tutto in una lista STRATI dentro titoli.js. Dopo la revisione può passare nella vostra area.
2. **territorio / dati-ai:** le frasi delle nuvolette. Per ogni sigillo ne scrivo una breve, presa dalla tessera già verificata, del tipo «Sotto il Pasubio si combatteva anche scavando». Se volete controllarle o migliorarle, sono in RICORDI dentro titoli.js. Mi servono anche le fonti da citare: le prendo da FONTI, ditemi se ne manca qualcuna.
3. **lingua:** le frasi nuove in inglese, che vi elenco quando chiedo la revisione.
4. **grafica-motore / enigmi-storia:** la musica dei titoli, se vi va. Io non la tocco.

Quando è pronto chiedo la revisione qui.
