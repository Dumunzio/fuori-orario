/* Le sale: posizione degli oggetti di ogni stanza e cosa succede quando li esamini.
   Le funzioni act sono avvolte in frecce perché gli enigmi sono definiti in enigmi.js.
   Area: enigmi-storia. Vedi CLAUDE.md prima di modificare. */
const OGGETTI={museo:[
  {id:'loom',x:2,y:1,h:42,name:'Telaio Jacquard',draw:drawLoom,act:()=>openLoom(),light:1},
  {id:'plaqueLan',x:4,y:2,h:20,name:'Cartellino: Lanificio Rossi',draw:drawLectern,act:()=>readPlaque('lan'),light:1},
  {id:'factory',x:2,y:3,h:42,name:'Plastico della Fabbrica Alta',draw:drawFactory,act:()=>readPlaque('fab'),light:1},
  {id:'vitrine',x:6,y:1,h:24,name:'Teca',draw:drawVitrine,act:()=>say('Teca',['Elmetto, gavetta e lettere di un soldato sul fronte del Pasubio.','Qui la versione completa mostrerebbe la scheda dell\'oggetto presa da Europeana, con la fonte citata.'])},
  {id:'diorama',x:8,y:2,h:32,name:'Plastico del Pasubio',draw:drawDiorama,act:()=>readPlaque('pas'),light:1},
  {id:'chest',x:10,y:3,h:12,name:'Cassetta del Genio',draw:drawChest,act:()=>openChest(),light:1},
  {id:'shelf1',x:0,y:5,h:30,name:'Scaffale',draw:drawShelf,act:()=>say('Scaffale',['Faldoni con le etichette scolorite: «Lanificio, corrispondenza», «Comune di Schio», «Fondo fotografico».','Le schede sono in ordine sparso. Qualcuno ha lasciato aperto l\'armadio accanto.'])},
  {id:'cabinet',x:0,y:7,h:30,name:'Armadio dell\'archivio',draw:drawCabinet,act:()=>openTimeline(),light:1},
  {id:'shelf2',x:0,y:9,h:30,name:'Scaffale',draw:drawShelf,act:()=>say('Scaffale',['Registri, mappe catastali, una scatola di cartoline del Pasubio.'])},
  {id:'desk',x:3,y:7,h:18,name:'Scrivania',draw:drawDesk,act:()=>say('Scrivania',['Un foglio a matita: «Ordinare le schede dalla più vecchia alla più nuova. Gli anni sono sui cartellini delle sale.»'])},
  {id:'keeper',x:8,y:8,h:16,name:'Custode',draw:drawKeeper,act:()=>talkKeeper()},
  {id:'bench',x:10,y:6,h:8,name:'Panca',draw:drawBench},
  {id:'plant1',x:5,y:0,h:20,draw:drawPlant},
  {id:'plant2',x:11,y:9,h:20,draw:drawPlant},
  {id:'door',x:10,y:-1,name:'Porta d\'uscita',act:()=>tryDoor(),hit:()=>{const [cx,cy]=iso(10,0);return [cx+2,cy-32,10,36]}},
  {id:'varcoVilla',x:-1,y:4,name:'Varco: Sala delle Ville',act:()=>vaiInStanza('villa',0,6),hit:()=>hitVarco('L',4)}
],
villa:[
  {id:'modelVilla',x:4,y:3,h:26,name:'Plastico di Villa Godi',draw:drawVilla,act:()=>openFacade(),light:1},
  {id:'plaqueGodi',x:2,y:2,h:20,name:'Cartellino: Villa Godi',draw:drawLectern,act:()=>readPlaque('godi'),light:1},
  {id:'plaquePalladio',x:6,y:2,h:20,name:'Cartellino: Andrea Palladio',draw:drawLectern,act:()=>readPlaque('palladio'),light:1},
  {id:'bust',x:6,y:5,h:24,name:'Busto',draw:drawBust,act:()=>say('Busto',['Un busto di marmo con una targhetta consumata: «A. P., architetto».'])},
  {id:'plant3',x:0,y:0,h:20,draw:drawPlant},
  {id:'plant4',x:7,y:7,h:20,draw:drawPlant},
  {id:'varcoMuseo',x:-1,y:6,name:'Varco: torna al museo',act:()=>vaiInStanza('museo',0,4),hit:()=>hitVarco('L',6)}
]};
