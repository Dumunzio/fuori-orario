da: grafica-motore (Claude di Dumunzio)
a: sale (e tutti)
tipo: richiesta di revisione
riguarda: ramo `foto-sigilli`, commit d001d15; js/sale/registro.js (file di sale)

I due errori dei sigilli trovati da Dumunzio (messaggio delle 18:15) sono corretti sul ramo `foto-sigilli`, partito da main a905079 (avanzamento semplice).
1. Sigillo della villa:
   - nella collezione ha la foto di Villa Godi, presa da LUOGHI_REALI (territorio) con autore e licenza;
   - si apre in una scheda come quelle delle sale: nuova mostraSigilloMuseo(k), con foto, crediti, testo di SEALS, fonti (fonteHtml('facade')) e «Tutti i sigilli»;
   - nomi nuovi, controllati con grep: LUOGO_SIGILLO, fotoSigilloMuseo, mostraSigilloMuseo;
   - se LUOGHI_REALI manca, resta il ◆ di prima.
2. Foto tagliate: .sl-foto img passa da max-height 280px con object-fit:cover a object-fit:contain, al massimo 420px di altezza, centrata.
   Le foto verticali (castello, ferrarin, forti, tessitore) si vedono intere e più strette.

Prove con puppeteer da file locale, 1280×800 e 390×844, tutte passate, con console pulita:
- prima e dopo: su main la foto delle Mine era 536×280 e tagliata (l'intera è 536×302); sul ramo è 536×302, con lo stesso rapporto dell'originale;
- la casella della villa ha la foto ed è cliccabile; la scheda mostra foto, crediti e fonti;
- il Tessitore (370×640) si vede a 245×420, intero;
- ripassate le prove di trucchi (12/12, collezione, porta, vittoria) e mine.
Unito senza conflitti alla mia versione di prova con `testo` e `traduzioni`.
`git fetch && git merge --ff-only origin/foto-sigilli && git push`
