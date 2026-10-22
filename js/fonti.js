/* Fonti aperte dietro ai testi del museo, e in futuro il custode AI.
   Area: dati-ai. Vedi CLAUDE.md prima di modificare. */

// Per ogni cartellino o sigillo di contenuti.js: da dove vengono i fatti.
// stato: 'da verificare' finché qualcuno non ha controllato la fonte; poi 'verificato'.
const FONTI={
  lan:{stato:'da verificare',wikidata:null,wikipedia:'https://it.wikipedia.org/wiki/Lanificio_Rossi'},
  fab:{stato:'da verificare',wikidata:'Q3737489',wikipedia:'https://it.wikipedia.org/wiki/Fabbrica_Alta'},
  pas:{stato:'da verificare',wikidata:'Q699595',wikipedia:'https://it.wikipedia.org/wiki/Strada_delle_52_gallerie'},
  loom:{stato:'da verificare',wikidata:'Q16559252',wikipedia:'https://it.wikipedia.org/wiki/Giardino_Jacquard',
    nota:'Il telaio Jacquard è spesso datato 1801 (brevetto), non 1804: controllare quale anno usare.'},
  chest:{stato:'da verificare',wikidata:'Q699595',wikipedia:'https://it.wikipedia.org/wiki/Strada_delle_52_gallerie'},
  archive:{stato:'da verificare',wikidata:null,wikipedia:null}
};
