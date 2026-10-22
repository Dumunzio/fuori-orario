/* Testi storici del museo: cartellini, sigilli, aiuti.
   Area: enigmi-storia. Vedi CLAUDE.md prima di modificare. */
/* ---------- Contenuti: storia del territorio ---------- */
const PLAQUES={
  lan:{title:'Il Lanificio Rossi',where:'Sala del Lanificio',lines:[
    'Nel 1817 Francesco Rossi avvia a Schio una piccola attività laniera.',
    'Il figlio Alessandro Rossi (1819–1898) la trasforma in una delle più grandi industrie tessili d\'Italia.',
    'Accanto alla fabbrica fa costruire case per gli operai, scuole e un grande giardino.']},
  fab:{title:'La Fabbrica Alta',where:'Sala del Lanificio',lines:[
    'Plastico della Fabbrica Alta di Schio, costruita nel 1862 su progetto dell\'architetto belga Auguste Vivroux.',
    'Per le sue fabbriche Schio fu chiamata «la Manchester d\'Italia».']},
  pas:{title:'La Strada delle 52 Gallerie',where:'Sala della Grande Guerra',lines:[
    'Plastico del Pasubio. Nel 1917, tra febbraio e novembre, i minatori del Genio militare italiano scavarono una strada nella roccia.',
    'Le sue 52 gallerie portavano rifornimenti in quota, al riparo dall\'artiglieria austro-ungarica.',
    'Oggi è uno dei percorsi della Grande Guerra più frequentati del Vicentino.']}
};
const SEALS={
  loom:{title:'Sigillo della Lana',text:'Il telaio Jacquard (1804) legge schede di cartone perforate, antenate delle istruzioni dei computer. A Schio il suo inventore dà il nome al giardino del Lanificio Rossi, disegnato da Antonio Caregaro Negrin.'},
  chest:{title:'Sigillo del Pasubio',text:'Codice 5255: 52 gallerie, e 55 anni tra la Fabbrica Alta (1862) e i lavori sul Pasubio (1917).'},
  archive:{title:'Sigillo dell\'Archivio',text:'1804, 1817, 1862, 1917: dal telaio di Lione alla Grande Guerra, un secolo di storia dell\'Alto Vicentino in quattro schede.'}
};
const HINTS={
  loom:['Il cognome che cerchi è anche il nome del giardino accanto al Lanificio Rossi, a Schio.','Inizia con la J. Giardino J _ _ _ _ _ _ _.'],
  chest:['Ti servono due cartellini: quello del plastico del Pasubio e quello del plastico della Fabbrica Alta.','Le gallerie sono 52. Poi fai 1917 − 1862.'],
  archive:['Gli anni sono sparsi nei cartellini: telaio, lanificio, Fabbrica Alta, Pasubio.','L\'ordine è 1804, 1817, 1862, 1917.']
};
