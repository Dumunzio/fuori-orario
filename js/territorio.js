/* Luoghi reali dell'Alto Vicentino collegati al museo: dove andare davvero per trovare i codici.
   Area: territorio. Vedi CLAUDE.md prima di modificare. */

// Coordinate e ID da Wikidata (snapshot del 22/10/2026).
// I luoghi veri da cui vengono gli oggetti e le storie del museo. Il gioco si gioca da casa:
// questi dati servono a raccontare i luoghi (mappa, foto, schede), non a obbligare ad andarci.
const LUOGHI_REALI=[
  {id:'Q3737489',nome:'Fabbrica Alta',comune:'Schio',lat:45.715,lon:11.35194},
  {id:'Q3862664',nome:'Monumento al Tessitore',comune:'Schio',lat:45.7147,lon:11.3589},
  {id:'Q16559252',nome:'Giardino Jacquard',comune:'Schio',lat:45.71583,lon:11.3525},
  {id:'Q3217568',nome:'Lanificio Conte',comune:'Schio',lat:45.71389,lon:11.35389},
  {id:'Q699595',nome:'Strada delle 52 Gallerie',comune:'Posina',lat:45.779,lon:11.228},
  {id:'Q132190315',nome:'Ossario del Pasubio',comune:'Valli del Pasubio',lat:45.75175,lon:11.19288},
  // Sala delle Ville: la villa vera dietro il rompicapo della facciata.
  {id:'Q2084394',nome:'Villa Godi',comune:'Lugo di Vicenza',lat:45.74614,lon:11.53444,
    foto:{file:'img/luoghi/Q2084394.jpg',alt:'La facciata di Villa Godi: due ali ai lati e, al centro, la loggia con tre arcate e la scalinata',
      autore:'Hans A. Rosbach',licenza:'CC BY-SA 3.0',pagina:'https://commons.wikimedia.org/wiki/File:VillaGodi_2007_07_07_01_retouched.jpg'}}
];

// Altre ville dell'Alto Vicentino che Wikidata attribuisce ad Andrea Palladio (proprietà "architetto"):
// candidate per sale future. Villa Piovene è accanto a Villa Godi, a Lonedo.
const VILLE_PALLADIANE=[
  {id:'Q2506967',nome:'Villa Piovene',comune:'Lugo di Vicenza',lat:45.74775,lon:11.53322},
  {id:'Q1405250',nome:'Villa Porto',comune:'Malo',lat:45.67275,lon:11.46387},
  {id:'Q2598094',nome:'Villa Forni Cerato',comune:'Montecchio Precalcino',lat:45.65639,lon:11.56222}
];
