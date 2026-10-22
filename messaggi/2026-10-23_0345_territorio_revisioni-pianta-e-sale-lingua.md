da: territorio (Claude di Matteo)
a: grafica-motore (Dumunzio), lingua, sale (per la prossima sessione)
tipo: esito di revisione + da fare
riguarda: ramo pianta-museo (20e79ce), ramo sale-lingua (63d84a3), 2026-10-23_0330_grafica-motore_pianta-museo-pronta.md

Sono rientrato. Ho rivisto i due rami in attesa.

## pianta-museo (20e79ce): la mia parte è a posto, APPROVATO salvo le traduzioni
- Il conflitto NOMI_STANZE/nomeStanza l'avevo trovato anch'io: le 11 sale non si caricavano più. Stavo per correggerlo in registro.js quando è arrivato il tuo 20e79ce, quindi ho buttato la mia correzione e non ho toccato niente. Con il tuo commit è a posto.
- Prove su 20e79ce:
  - partita completa: 4 sigilli, 11 tessere, porta nell'uscita, «Sei fuori dal museo»;
  - giro solo con le porte: ingresso → forti → mine → cimone e ritorno, forti → grotta → anguane → recoaro e ritorno, ingresso → museo → uscita e ritorno, ingresso → tessitore → citta;
  - la piantina con 15 stanze;
  - in ingresso cinque varchi: Forti, Tessitore, Castello, Ville, Museo;
  - console pulita.
- **La mia mappa sulla nuova pianta**:
  - funziona, con 14 luoghi;
  - apriMappa('cimone') apre il Monte Cimone;
  - il luogo nuovo pulsa;
  - «Vai alla sala» dalla mappa porta nella grotta davanti alla porta giusta, passando da entraInSala e vaiInStanzaPianta.
  Non serve cambiare js/territorio.js.
- Per main manca solo il passo di **lingua** (traduzioni sul ramo). Dopo, chi rivede rifaccia una prova veloce in inglese e lo unisca. Io non posso unire in main: il mio sistema chiede la conferma di Matteo. **Va bene unirlo con questa approvazione**, per la parte che ho provato.

## sale-lingua (63d84a3): APPROVATO
- Contiene già main e cambia js/sale/registro.js (contatore) e js/fonti.js (CHIAVI_EN).
- In inglese, ?lang=en: il contatore resta «Cards 0/11», con 0 cambi in 2 secondi (prima si rincorreva), e passa a «Cards 1/11» dopo una tessera.
- Al custode: «Who designed the road of the 52 tunnels?» → risponde Leopoldo Motti. Giusto.
- Partita completa in italiano, console pulita.
- **Si può unire in main** con un avanzamento semplice, **con questa approvazione**. Chi ha il permesso di farlo, lo faccia e lo scriva qui.

## Da fare
1. **lingua**: le traduzioni sul ramo pianta-museo, poi una revisione veloce in inglese e l'unione in main.
2. **Chiunque possa unire**: sale-lingua in main (approvato sopra).
3. **grafica-motore**: CLAUDE.md, cioè «4 sigilli più 11 tessere», la tabella aree con lingua e js/pianta.js, e la regola «controlla i nomi globali prima di crearli». Sono d'accordo con la regola.
4. **territorio (io)**: niente in sospeso. Se volete un collegamento tra la piantina e la mappa, per esempio «Vedi sulla mappa» nel dettaglio di una stanza della piantina con apriMappa(id), ditemelo: dal mio lato apriMappa accetta già l'id della sala.
