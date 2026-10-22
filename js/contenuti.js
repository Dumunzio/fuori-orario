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
    'Oggi è un sentiero che si percorre solo a piedi: in bicicletta è vietato.']},
  godi:{title:'Villa Godi',where:'Sala delle Ville',lines:[
    'A Lonedo di Lugo di Vicenza, dal 1537, i fratelli Godi fanno costruire una villa da un giovane architetto: Andrea Palladio. È la sua prima villa documentata con sicurezza.',
    'Al centro della facciata, arretrata tra due ali, c\'è una loggia con tre arcate al piano nobile. Una scalinata sale fino all\'arco centrale.',
    'Dal 1996 le ville di Palladio nel Veneto sono patrimonio dell\'umanità UNESCO.']},
  palladio:{title:'Andrea Palladio',where:'Sala delle Ville',lines:[
    'Andrea Palladio (1508–1580) ha cambiato il modo di costruire le case di campagna.',
    'Nei Quattro Libri dell\'Architettura (1570) spiega le sue regole. La prima è la simmetria: quello che sta a sinistra si ripete a destra, come in uno specchio.']}
};
const SEALS={
  loom:{title:'Sigillo della Lana',text:'Il telaio Jacquard (1801) legge schede di cartone perforate, antenate delle istruzioni dei computer. A Schio il suo inventore dà il nome al giardino del Lanificio Rossi, disegnato da Antonio Caregaro Negrin.'},
  chest:{title:'Sigillo del Pasubio',text:'Codice 5255: 52 gallerie, e 55 anni tra la Fabbrica Alta (1862) e i lavori sul Pasubio (1917).'},
  archive:{title:'Sigillo dell\'Archivio',text:'1801, 1817, 1862, 1917: dal telaio di Jacquard alla Grande Guerra, un secolo di storia dell\'Alto Vicentino in quattro schede.'},
  facade:{title:'Sigillo della Villa',text:'Villa Godi, a Lonedo di Lugo di Vicenza, è la prima villa di Andrea Palladio documentata con sicurezza: una loggia a tre arcate al centro e due ali che si rispecchiano. Per Palladio la bellezza nasce dalla simmetria.'}
};
const HINTS={
  loom:['Il cognome che cerchi è anche il nome del giardino accanto al Lanificio Rossi, a Schio.','Inizia con la J. Giardino J _ _ _ _ _ _ _.'],
  chest:['Ti servono due cartellini: quello del plastico del Pasubio e quello del plastico della Fabbrica Alta.','Le gallerie sono 52. Poi fai 1917 − 1862.'],
  archive:['Gli anni sono sparsi nei cartellini: telaio, lanificio, Fabbrica Alta, Pasubio.','L\'ordine è 1801, 1817, 1862, 1917.'],
  facade:['Leggi i due cartellini della Sala delle Ville: uno ti dice la regola, l\'altro quante arcate ha la loggia.','L\'ala destra è lo specchio della sinistra: la porta sta vicino al centro. Sotto il telo vanno tre archi.']
};
