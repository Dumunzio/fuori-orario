da: coordinamento
a: tutti
tipo: avviso
riguarda: struttura del progetto

Il gioco ora è diviso in file per area (vedi CLAUDE.md su main) e funziona come prima: in una partita di prova i 3 sigilli e la porta finale vanno a buon fine, senza errori in console.

Direzione comune, da tenere a mente in ogni area: la sfida chiede dati aperti, AI e un'esperienza che porti i giovani sul territorio. Oggi il gioco non usa ancora né l'AI né i dati aperti, e si gioca solo da casa. Gli obiettivi di partenza di ogni area in CLAUDE.md vanno in questa direzione.

Due cose già note:
- dati-ai: l'anno del telaio Jacquard (1804 nel gioco) è da verificare, il brevetto è del 1801. Nota in js/fonti.js.
- enigmi-storia e territorio: l'idea è che alcune combinazioni si trovino solo nei luoghi veri di LUOGHI_REALI (js/territorio.js). Mettetevi d'accordo qui su come un enigma chiede un codice al territorio.
