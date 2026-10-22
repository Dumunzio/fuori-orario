/* Le sale: posizione degli oggetti di ogni stanza e cosa succede quando li esamini.
   Le funzioni act sono avvolte in frecce perché gli enigmi sono definiti in enigmi.js.
   Area: enigmi-storia. Vedi CLAUDE.md prima di modificare. */
const OGGETTI={museo:[
  {id:'loom',x:2,y:1,h:42,name:'Telaio Jacquard',draw:drawLoom,act:()=>openLoom(),light:1},
  {id:'plaqueLan',x:3,y:-1,name:'Cartellino: Lanificio Rossi',act:()=>readPlaque('lan'),hit:()=>hitCartellino('R',3),light:1},
  {id:'factory',x:2,y:3,h:42,name:'Plastico della Fabbrica Alta',draw:drawFactory,act:()=>readPlaque('fab'),light:1},
  {id:'vitrine',x:6,y:1,h:24,name:'Teca',draw:drawVitrine,act:()=>say('Teca',['Elmetto, gavetta e lettere di un soldato sul fronte del Pasubio.','Qui la versione completa mostrerebbe la scheda dell\'oggetto presa da Europeana, con la fonte citata.'])},
  {id:'diorama',x:8,y:2,h:32,name:'Plastico del Pasubio',draw:drawDiorama,act:()=>readPlaque('pas'),light:1},
  {id:'chest',x:10,y:3,h:12,name:'Cassetta del Genio',draw:drawChest,act:()=>openChest(),light:1},
  {id:'shelf1',x:0,y:5,h:30,name:'Scaffale',draw:drawShelf,act:()=>say('Scaffale',['Faldoni con le etichette scolorite: «Lanificio, corrispondenza», «Comune di Schio», «Fondo fotografico».','Le schede sono in ordine sparso. Qualcuno ha lasciato aperto l\'armadio accanto.'])},
  {id:'cabinet',x:0,y:7,h:30,name:'Armadio dell\'archivio',draw:drawCabinet,act:()=>openTimeline(),light:1},
  {id:'shelf2',x:0,y:9,h:30,name:'Scaffale',draw:drawShelf,act:()=>say('Scaffale',['Registri, mappe catastali, una scatola di cartoline del Pasubio.'])},
  {id:'desk',x:3,y:7,h:18,name:'Scrivania',draw:drawDesk,act:()=>say('Scrivania',['Un foglio a matita: «Ordinare le schede dalla più vecchia alla più nuova. Gli anni sono sui cartellini delle sale.»'])},
  {id:'bench',x:10,y:6,h:8,name:'Panca',draw:drawBench},
  {id:'plant1',x:5,y:0,h:20,draw:drawPlant},
  {id:'plant2',x:11,y:9,h:20,draw:drawPlant},
  ...varchiPianta('museo')  // verso l'ingresso e l'uscita (js/pianta.js)
],
// Ingresso: dove si comincia. Il custode e la piantina interattiva del museo.
ingresso:[
  {id:'keeper',x:6,y:5,h:16,name:'Custode',draw:drawKeeper,act:()=>talkKeeper()},
  {id:'piantina',x:5,y:3,h:24,name:'Pianta del museo',draw:drawPiantina,act:()=>apriPianta(),light:1},
  {id:'biglietteria',x:8,y:6,h:18,name:'Biglietteria',draw:drawDesk,act:()=>say('Biglietteria',['Il registro dei visitatori è aperto sull\'ultima pagina. L\'ultimo nome è il tuo, scritto stamattina.','Accanto, una pila di biglietti: «Museo del Territorio · Alto Vicentino».'])},
  {id:'bench2',x:1,y:7,h:16,name:'Panca',draw:o=>drawPanchina(o)},
  {id:'plant5',x:9,y:0,h:20,draw:drawPlant},
  {id:'plant6',x:0,y:0,h:20,draw:drawPlant},
  // arredi di contorno (compito 5): i disegni sono in js/sale/registro.js, che si carica dopo, quindi passano da una freccia
  {id:'panchinaIn',x:9,y:4,h:16,draw:o=>drawPanchina(o),light:1},
  {id:'cordoneIn',x:3,y:3,h:16,draw:o=>drawColonnina(o),light:1},
  {id:'ombrelliIn',x:9,y:7,h:20,name:'Portaombrelli',draw:o=>drawPortaombrelli(o),light:1,
    act:()=>say('Portaombrelli',['Un ombrello nero, dimenticato da un visitatore. Fuori, a quest\'ora, piove sempre.'])},
  {id:'depliantIn',x:1,y:3,h:22,name:'Espositore di dépliant',draw:o=>drawEspositore(o),light:1,
    act:()=>say('Espositore di dépliant',['Dépliant su sentieri, ville e musei della valle. Uno ha la piantina del museo disegnata a mano.'])},
  ...varchiPianta('ingresso')
],
// Uscita: la porta che si apre con tutti i sigilli (e le tessere delle sale a tema).
uscita:[
  {id:'door',x:5,y:-1,name:'Porta d\'uscita',act:()=>tryDoor(),hit:()=>{const [cx,cy]=iso(5,0);return [cx+2,cy-32,10,36]}},
  {id:'bench3',x:2,y:4,h:16,name:'Panca',draw:o=>drawPanchina(o)},
  {id:'plant7',x:7,y:5,h:20,draw:drawPlant},
  {id:'attaccapanni',x:1,y:1,h:30,name:'Attaccapanni',draw:o=>drawAttaccapanni(o),light:1,
    act:()=>say('Attaccapanni',['Il cappotto blu del custode, con le chiavi in tasca. No, non sono quelle della porta.'])},
  {id:'ombrelliUs',x:7,y:2,h:20,draw:o=>drawPortaombrelli(o),light:1},
  {id:'firme',x:3,y:1,h:20,name:'Libro delle firme',draw:o=>drawLibroFirme(o),light:1,
    act:()=>say('Libro delle firme',['Pagine di firme e disegni: «Bellissimo!», «Torneremo», un omino con il casco da speleologo.','In fondo c\'è spazio anche per te, quando uscirai.'])},
  {id:'cordoneUs',x:7,y:1,h:16,draw:o=>drawColonnina(o),light:1},
  {id:'plant8',x:1,y:5,h:20,draw:drawPlant},
  ...varchiPianta('uscita')
],
villa:[
  {id:'modelVilla',x:4,y:3,h:26,name:'Plastico di Villa Godi',draw:drawVilla,act:()=>openFacade(),light:1},
  {id:'plaqueGodi',x:1,y:-1,name:'Cartellino: Villa Godi',act:()=>readPlaque('godi'),hit:()=>hitCartellino('R',1),light:1},
  {id:'plaquePalladio',x:6,y:-1,name:'Cartellino: Andrea Palladio',act:()=>readPlaque('palladio'),hit:()=>hitCartellino('R',6),light:1},
  {id:'bust',x:6,y:5,h:24,name:'Busto',draw:drawBust,act:()=>say('Busto',['Un busto di marmo con una targhetta consumata: «A. P., architetto».'])},
  {id:'plant3',x:0,y:0,h:20,draw:drawPlant},
  {id:'plant4',x:7,y:7,h:20,draw:drawPlant},
  {id:'colonna1',x:2,y:2,h:32,draw:o=>drawColonna(o),light:1},
  {id:'colonna2',x:6,y:2,h:32,draw:o=>drawColonna(o),light:1},
  {id:'disegni',x:2,y:6,h:12,name:'Tavolo dei disegni',draw:o=>drawTavoloDisegni(o),light:1,
    act:()=>say('Tavolo dei disegni',['Piante di ville disegnate a inchiostro. Piega un foglio a metà: le due parti combaciano.'])},
  {id:'panchinaVi',x:5,y:7,h:16,draw:o=>drawPanchina(o),light:1},
  ...varchiPianta('villa')
]};
