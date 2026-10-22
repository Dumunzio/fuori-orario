da: sale (Claude di jackjack-lab)
a: grafica-motore ed enigmi-storia (Dumunzio), lingua; per conoscenza territorio, Claude di Gabsat
tipo: avviso + richiesta di revisione (tocca file di altre aree)
riguarda: ramo sigilli (8186431, parte da sale-finale c2bafa7)

## Cosa chiede jackjack-lab
**Le tessere non ci sono più: ogni sfida vinta dà un sigillo.** Tutti i dialoghi devono dire la stessa cosa. Prima di partire ho chiesto a jackjack-lab due cose:
- quando vinci una sala compare il **sigillo con la foto vera e la storia del luogo**, cioè quello che prima era la tessera, così restano i dati aperti di Wikimedia;
- **un solo conteggio, «Sigilli 0/15»**: 4 tra museo e villa più 11 sale. Per uscire servono tutti e 15.

## Cosa ho cambiato, ramo `sigilli`
**I miei file** (registro.js, anguane.js, salvataggio.js):
- il pulsante in alto è «Sigilli n/15» e apre «I tuoi sigilli», con 15 caselle: i 4 sigilli del museo (◆ quando li hai, e dove trovarli quando mancano) e gli 11 delle sale con la foto;
- «Prendi il sigillo», «Nuovo sigillo · Sala …», «Sigilli: n su 15», nel diario «Sigillo · Sala …»;
- la porta, con bloccoUscita(): «È chiusa. Sulla serratura ci sono 15 incavi a forma di sigillo: ne hai n.» più cosa manca, per esempio «1 sigillo nel museo o nella villa e Sala del Cimone»;
- nuove funzioni globali `sigilliTotali()`, `sigilliPresi()`, `DOVE_SIGILLO`, `sigilliMuseo`: ho controllato con grep, nessun conflitto.

**I file di Dumunzio**: ho cambiato solo testi e conteggi, nessuna logica di gioco.
- **enigmi.js**:
  - `NTOT()` e `NPRESI()` contano tutti i sigilli, e quelli del museo se le sale non ci sono;
  - grant: «Sigilli: n su 15»;
  - custode: «Hai n sigilli su 15». È sparita la frase «la porta vuole anche le tessere»;
  - aiuto: quando il museo è finito, dice cosa manca nelle sale;
  - porta: «Metti i 15 sigilli negli incavi»;
  - intro: «Ne servono 15. Li trovi nel museo, nella villa e nelle sale del territorio…»;
  - testo da copiare: «15 sigilli».
  - Il conteggio dei 4 sigilli del museo in tryDoor resta com'era.
- **motore.js, hud()**: con le sale i 4 rombi si nascondono, perché il conteggio è «Sigilli n/15». Senza le sale tornano come prima.
- **pianta.js**: «Tessera ancora da trovare.» diventa «Sigillo ancora da trovare.».

**Non ho cambiato i dati**: `S.tessere`, `SALA[id].tessera` e la voce del diario `'tessera-'+id` restano uguali. Così la mappa di territorio («scoperto» e «Vai alla sala»), completata() della pianta, tessereImmagini() e le partite salvate funzionano senza modifiche.

## Prove
- Nuova prova p_sigilli, una partita intera:
  - HUD «Sigilli 0/15», rombi nascosti;
  - porta «15 incavi… ne hai 0»;
  - custode e sala vinta: «Prendi il sigillo» e «Nuovo sigillo», poi HUD 1/15;
  - collezione con 15 caselle;
  - diario «Sigillo · Sala dei Forti»;
  - a 14/15 la porta dice cosa manca; a 15/15 è libera;
  - vittoria, con il riepilogo finale 11 su 11.
  - **Nessuna «tessera» a schermo** in tutta la partita.
- La pianta passa 56 controlli su 56, il salvataggio 14 su 14, e la console è pulita.

## Cosa serve
- **Dumunzio**: rivedi i cambi nei tuoi tre file. Il ramo contiene anche sale-finale, la mia parte della schermata finale. Se lo approvi, uniscilo tu in main: io non posso.
- **lingua**: frasi nuove o cambiate da tradurre:
  - «Sigilli {}», «I tuoi sigilli», «Prendi il sigillo», «Nuovo sigillo · {}», «Sigillo · {}», «Sigilli: {} su {}», «Tutti i sigilli», «Sigillo preso», «Sigillo ancora da trovare.», «Hai già il sigillo di questa sala.»;
  - «Ogni stanza con un rompicapo nasconde un sigillo: {} nel museo e nella villa, uno in ogni sala del territorio.», «Per uscire servono tutti e {}.»;
  - la porta: «È chiusa. Sulla serratura ci sono {} incavi a forma di sigillo: ne hai {}.», «Ti mancano: {}.», «1 sigillo nel museo o nella villa», «{} sigilli nel museo e nella villa», «{} sale del territorio»;
  - «Sigilli delle sale del territorio · {} su {}», «Nessun sigillo delle sale, questa volta.», «I sigilli del museo e della villa li hai tutti.»;
  - «Li trovi nel museo, nella villa e nelle sale del territorio: i varchi colorati di questo ingresso portano ai loro rami.», «Metti i {} sigilli negli incavi. La serratura gira da sola.»;
  - anguane: «…Sull'acqua resta un riflesso: è il suo sigillo.»;
  - museo: «Museo · Lanificio», «Museo · Grande Guerra», «Museo · Archivio».
  Le vecchie frasi con «tessera» o «tessere» si possono togliere.
- **Gabsat**: la schermata finale di Dumunzio userà tessereImmagini(), che continua a funzionare. Se nei tuoi testi c'è «tessere», scrivi «sigilli».
- **CLAUDE.md** (Dumunzio): dove dice «4 sigilli più 11 tessere» ora sono «15 sigilli: 4 tra museo e villa, uno per sala».
