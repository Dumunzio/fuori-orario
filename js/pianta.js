/* La pianta del museo: come sono collegate le stanze, dove stanno nel disegno e quando sono completate.
   Dati comuni a tutte le aree: il motore e le sale la usano per i varchi, la piantina dell'ingresso per disegnare.
   Disegno di Dumunzio (docs/piantina-museo.png). Area: grafica-motore. Vedi CLAUDE.md prima di modificare. */
const PIANTA={
  inizio:'ingresso',
  // Coppie di stanze collegate da un varco, senza corridoi: rami a catena, ognuno con un tema.
  collegamenti:[
    ['ingresso','museo'],['museo','uscita'],['ingresso','villa'],
    ['ingresso','tessitore'],['tessitore','citta'],                                   // lana e industria
    ['ingresso','castello'],['castello','meneghello'],                                // storia e lettere
    ['ingresso','forti'],['forti','mine'],['mine','cimone'],['forti','ferrarin'],      // Grande Guerra
    ['forti','grotta'],['grotta','anguane'],['anguane','recoaro']                      // acque della montagna
  ],
  // Posizione di ogni stanza nel disegno (x e y da 0 a 100, y verso il basso) e il suo ramo.
  posti:{
    ingresso:{x:49,y:84,ramo:'museo'},museo:{x:61,y:71,ramo:'museo'},uscita:{x:71,y:55,ramo:'museo'},villa:{x:53,y:57,ramo:'museo'},
    tessitore:{x:34,y:51,ramo:'lana'},citta:{x:28,y:52,ramo:'lana'},
    castello:{x:46,y:46,ramo:'storia'},meneghello:{x:43,y:41,ramo:'storia'},
    forti:{x:36,y:36,ramo:'guerra'},mine:{x:28,y:27,ramo:'guerra'},cimone:{x:25,y:22,ramo:'guerra'},ferrarin:{x:31,y:21,ramo:'guerra'},
    grotta:{x:35,y:17,ramo:'acque'},anguane:{x:39,y:27,ramo:'acque'},recoaro:{x:40,y:33,ramo:'acque'}
  },
  rami:{museo:'Il museo',lana:'Lana e industria',storia:'Storia e lettere',guerra:'La Grande Guerra',acque:'Le acque della montagna'},
  // Le stanze collegate a id, nell'ordine dei collegamenti.
  vicini(id){return this.collegamenti.filter(c=>c.includes(id)).map(c=>c[0]===id?c[1]:c[0])}
};
// Sigilli che si trovano in ogni stanza del museo.
const SIGILLI_STANZA={museo:['loom','chest','archive'],villa:['facade']};
// Una stanza è completata quando ha dato tutti i suoi sigilli, o la sua tessera (sale a tema).
// L'ingresso lo è sempre, l'uscita quando la partita è finita.
function completata(id){
  if(id==='ingresso')return true;
  if(id==='uscita')return !!S.done;
  if(SIGILLI_STANZA[id])return SIGILLI_STANZA[id].every(k=>S.seals[k]);
  return typeof tessereS==='function'&&!!tessereS()[id];
}
