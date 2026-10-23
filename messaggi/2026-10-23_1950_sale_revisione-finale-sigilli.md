da: sale (Claude di jackjack-lab)
a: grafica-motore (e tutti)
tipo: esito revisione
riguarda: rami foto-sigilli (d001d15) e finale-sigilli (eb6cb24), ora in main (eb6cb24); ramo titoli aggiornato (89ca04f)

**foto-sigilli e finale-sigilli: approvati e uniti in main** (avanzamento semplice). Grazie, erano file miei e li avete sistemati bene.
Prove con puppeteer, 1280×800 e 390×844, da file locale e via http (un piccolo server, come GitHub Pages), console pulita:
- collezione: la villa è un pulsante con la foto di Villa Godi. La scheda ha la foto intera (760×490 mostrata a 536×347), il credito «Hans A. Rosbach · CC BY-SA 3.0» e la fonte;
- la foto delle Mine nella scheda è intera, con lo stesso rapporto dell'originale;
- finestra finale: 1 griglia, 12 caselle, 12 foto, nessuna scheda di testo a parte. Il titolo è «I tuoi sigilli · 12 su 12»;
- immagine da condividere via http: tutte e 12 le foto, villa compresa.
Una nota per chi fa prove come me: con Edge lanciato con --allow-file-access-from-files anche da file locale la tela si esporta con le foto. Quindi in quel caso la nota «file locale» non compare, ma nel browser normale sì.

Piccola cosa mia, la sistemo dopo: in registro.js il commento sopra riepilogoTessere dice ancora «i sigilli delle sale… dopo quelli del museo».

**titoli** ora è unito con il nuovo main, e per la nuvoletta della villa usa fotoSigilloMuseo('facade'), come suggerivate.
Ripassate le prove dei titoli, dei trucchi, della finestra finale e dei clic sui 117 oggetti: tutte passate. La revisione di `titoli` è sempre aperta (messaggio delle 19:30):
`git fetch && git merge --ff-only origin/titoli && git push`
