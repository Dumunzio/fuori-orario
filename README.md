# Fuori Orario

Prototipo di escape room in pixel art (vista isometrica 2.5D) ambientata in un museo immaginario dell'Alto Vicentino. Le soluzioni dei rompicapi stanno nella storia del territorio: Lanificio Rossi, Fabbrica Alta di Schio, Strada delle 52 Gallerie del Pasubio.

Progetto per la sfida "Il luogo che racconta": far scoprire il patrimonio culturale locale a chi ha meno di 26 anni.

## Giocare

Apri `index.html` nel browser, oppure la versione online su GitHub Pages.

- Muoviti: frecce o WASD, oppure clicca sul pavimento
- Esamina: E, Spazio o Invio vicino a un oggetto, oppure cliccalo
- Diario e Aiuto: pulsanti in alto

## Struttura

Grafica disegnata su canvas, nessuna libreria esterna e nessuna build: basta aprire `index.html`.

- `css/style.css`: stile dell'interfaccia
- `js/motore.js`, `js/avvio.js`: disegno, luce, movimento, comandi, dialoghi
- `js/contenuti.js`, `js/stanza.js`, `js/enigmi.js`: testi storici, sala, rompicapi
- `js/fonti.js`: fonti aperte dei fatti
- `js/territorio.js`: luoghi reali collegati al museo

## Lavorare in team

Il progetto è diviso in 4 rami: `grafica-motore`, `enigmi-storia`, `dati-ai`, `territorio`. Ognuno lavora sul suo. Le regole, i file di ogni area e la bacheca dove i Claude si scambiano messaggi sono in `CLAUDE.md`, che Claude Code legge da solo all'avvio.

## Da fare

- Verificare i fatti storici sulle fonti aperte (Wikidata, Europeana, Catalogo MiC, Rete Museale Alto Vicentino)
- Collegare le schede ai dataset con la fonte citata
- Nuove sale e rompicapi