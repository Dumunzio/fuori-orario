/* Le sale: posizione degli oggetti di ogni stanza e cosa succede quando li esamini.
   Le funzioni act sono avvolte in frecce perché gli enigmi sono definiti in enigmi.js.
   Area: enigmi-storia. Vedi CLAUDE.md prima di modificare. */
const OGGETTI={
// Ingresso: dove si comincia e dove si esce. Il custode, la piantina interattiva del museo e la porta d'uscita,
// che si apre con tutti i sigilli (quello della villa e quelli delle sale a tema).
ingresso:[
  {id:'door',x:8,y:-1,name:'Porta d\'uscita',act:()=>tryDoor(),hit:()=>{const [cx,cy]=iso(8,0);return [cx+2,cy-32,10,36]}},
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
  {id:'firme',x:7,y:1,h:20,name:'Libro delle firme',draw:o=>drawLibroFirme(o),light:1,
    act:()=>say('Libro delle firme',['Pagine di firme e disegni: «Bellissimo!», «Torneremo», un omino con il casco da speleologo.','In fondo c\'è spazio anche per te, quando uscirai.'])},
  ...varchiPianta('ingresso')
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
