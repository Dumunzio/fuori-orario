/* Fonti aperte dietro ai testi del museo, e il custode che risponde alle domande citando le fonti.
   Area: dati-ai. Vedi CLAUDE.md prima di modificare. */

/* ---------- Fonti ---------- */
// Pagine consultate il 22/10/2026 (it.wikipedia.org, licenza CC BY-SA).
const W={
  lanerossi:{titolo:'Wikipedia: Lanerossi',url:'https://it.wikipedia.org/wiki/Lanerossi'},
  rossi:{titolo:'Wikipedia: Alessandro Rossi',url:'https://it.wikipedia.org/wiki/Alessandro_Rossi'},
  quartiere:{titolo:'Wikipedia: Nuovo quartiere operaio',url:'https://it.wikipedia.org/wiki/Nuovo_quartiere_operaio'},
  fabbrica:{titolo:'Wikipedia: Fabbrica Alta',url:'https://it.wikipedia.org/wiki/Fabbrica_Alta'},
  schio:{titolo:'Wikipedia: Schio',url:'https://it.wikipedia.org/wiki/Schio'},
  gallerie:{titolo:'Wikipedia: Strada delle 52 gallerie',url:'https://it.wikipedia.org/wiki/Strada_delle_52_gallerie'},
  pasubio:{titolo:'Wikipedia: Pasubio',url:'https://it.wikipedia.org/wiki/Pasubio'},
  telaio:{titolo:'Wikipedia: Telaio Jacquard',url:'https://it.wikipedia.org/wiki/Telaio_Jacquard'},
  jacquard:{titolo:'Wikipedia: Joseph-Marie Jacquard',url:'https://it.wikipedia.org/wiki/Joseph-Marie_Jacquard'},
  giardino:{titolo:'Wikipedia: Giardino Jacquard',url:'https://it.wikipedia.org/wiki/Giardino_Jacquard'},
  tessitore:{titolo:'Wikipedia: Monumento al Tessitore',url:'https://it.wikipedia.org/wiki/Monumento_al_Tessitore'},
  conte:{titolo:'Wikipedia: Lanificio Conte',url:'https://it.wikipedia.org/wiki/Lanificio_Conte'},
  villaGodi:{titolo:'Wikipedia: Villa Godi',url:'https://it.wikipedia.org/wiki/Villa_Godi'},
  palladio:{titolo:'Wikipedia: Andrea Palladio',url:'https://it.wikipedia.org/wiki/Andrea_Palladio'},
  quattroLibri:{titolo:'Wikipedia: I quattro libri dell\'architettura',url:'https://it.wikipedia.org/wiki/I_quattro_libri_dell%27architettura'},
  villePalladiane:{titolo:'Wikipedia: Ville palladiane',url:'https://it.wikipedia.org/wiki/Ville_palladiane'}
};

// Per ogni cartellino o sigillo di contenuti.js (stesse chiavi): i fatti che contiene e se sono confermati.
// stato: 'verificato' = la fonte lo dice; 'errato' = la fonte dice altro (vedi correzione);
// 'non confermato' = nessuna fonte trovata, meglio riscriverlo (vedi correzione);
// 'da precisare' = vero in parte, la fonte è più prudente (vedi correzione). 'nota' = dettaglio utile, non un errore.
const FONTI={
  lan:[
    {fatto:'Nel 1817 Francesco Rossi avvia a Schio l\'attività laniera',stato:'verificato',fonte:W.lanerossi},
    {fatto:'Alessandro Rossi è vissuto dal 1819 al 1898',stato:'verificato',fonte:W.rossi},
    {fatto:'Rossi fa costruire case per gli operai, scuole e un giardino',stato:'verificato',fonte:W.quartiere}],
  fab:[
    {fatto:'Fabbrica Alta costruita nel 1862 su progetto del belga Auguste Vivroux',stato:'verificato',fonte:W.fabbrica},
    {fatto:'Schio fu chiamata «la Manchester d\'Italia»',stato:'verificato',fonte:W.schio}],
  pas:[
    {fatto:'Strada scavata nel 1917, da febbraio a novembre, dai minatori del Genio',stato:'verificato',fonte:W.gallerie},
    {fatto:'Il versante non era raggiungibile dall\'artiglieria austro-ungarica',stato:'verificato',fonte:W.gallerie},
    {fatto:'«Oggi è uno dei percorsi della Grande Guerra più frequentati del Vicentino»',stato:'non confermato',fonte:W.gallerie,
      correzione:'Oggi è un sentiero che si percorre solo a piedi: in bicicletta è vietato.'}],
  loom:[
    {fatto:'Il telaio Jacquard è del 1804',stato:'errato',fonte:W.telaio,
      correzione:'Joseph-Marie Jacquard presentò il telaio nel 1801.'},
    {fatto:'Il telaio usa schede perforate, antenate delle istruzioni dei computer',stato:'verificato',fonte:W.jacquard},
    {fatto:'Il giardino di Schio porta il nome di Jacquard ed è opera di Antonio Caregaro Negrin',stato:'verificato',fonte:W.giardino}],
  chest:[
    {fatto:'Le gallerie sono 52',stato:'verificato',fonte:W.gallerie},
    {fatto:'Tra la Fabbrica Alta (1862) e i lavori sul Pasubio (1917) passano 55 anni',stato:'verificato',fonte:W.fabbrica}],
  archive:[
    {fatto:'Telaio di Lione nel 1804',stato:'errato',fonte:W.telaio,correzione:'Il telaio è del 1801.'},
    {fatto:'1817, 1862, 1917',stato:'verificato',fonte:W.lanerossi}],
  // Sala delle Ville (richiesta di enigmi-storia del 22/10)
  godi:[
    {fatto:'Al centro della facciata, arretrata tra due ali, c\'è una loggia con tre arcate',stato:'verificato',fonte:W.villaGodi},
    {fatto:'La loggia è raggiunta da una scalinata',stato:'verificato',fonte:W.villaGodi,
      nota:'La scalinata arriva solo all\'arco centrale, e la loggia è al piano nobile (rialzato), non al piano terra.'},
    {fatto:'Costruita a Lugo di Vicenza a partire dal 1537 per i fratelli Godi',stato:'verificato',fonte:W.villaGodi,
      nota:'Progetto dal 1537 al 1542, a Lonedo di Lugo di Vicenza. Wikipedia scrive «Gerolamo», non «Girolamo».'},
    {fatto:'È la prima villa di Palladio',stato:'da precisare',fonte:W.villaGodi,
      correzione:'È una delle prime opere di Palladio, la prima documentata con sicurezza.'},
    {fatto:'Dal 1996 patrimonio UNESCO con le altre ville palladiane del Veneto',stato:'verificato',fonte:W.villaGodi}],
  palladio:[
    {fatto:'Andrea Palladio è vissuto dal 1508 al 1580',stato:'verificato',fonte:W.palladio},
    {fatto:'I Quattro Libri dell\'Architettura sono del 1570',stato:'verificato',fonte:W.quattroLibri},
    {fatto:'Nelle ville di Palladio la simmetria è la regola: quello che sta a sinistra si ripete a destra',stato:'verificato',fonte:W.villePalladiane,
      nota:'Nel trattato Palladio mostra le ville quasi sempre simmetriche; Villa Godi è «chiaramente simmetrica» (Wikipedia: Villa Godi).'}],
  facade:[
    {fatto:'Villa Godi è simmetrica e la loggia ha tre arcate',stato:'verificato',fonte:W.villaGodi},
    {fatto:'Il sito UNESCO è «Città di Vicenza e le ville palladiane del Veneto» (1994-1996)',stato:'verificato',fonte:W.villePalladiane}]
};

// Link alle fonti di un cartellino o sigillo, pronti da inserire nel diario o in una finestra.
function fonteHtml(id){
  const viste=new Set(),link=[];
  (FONTI[id]||[]).forEach(f=>{if(!viste.has(f.fonte.url)){viste.add(f.fonte.url);link.push(`<a href="${f.fonte.url}" target="_blank" rel="noopener">${f.fonte.titolo}</a>`)}});
  return link.length?`<span class="fonti">Fonti: ${link.join(' · ')}</span>`:'';
}

/* ---------- Il custode che risponde ---------- */
// Schede scritte con l'AI (Claude) riassumendo le pagine di Wikipedia qui sopra, poi controllate sul testo originale.
// Ogni risposta cita la sua fonte. Non serve un server né una chiave API: funziona anche su GitHub Pages.
const CONOSCENZA=[
  {id:'lanificio',chiavi:['lanificio','lanerossi','rossi','fabbrica di lana','lana','1817','fondato','francesco'],
    testo:'Il Lanificio Rossi nasce nel 1817 a Schio, fondato da Francesco Rossi. Le prime fabbriche stavano lungo la Roggia Maestra, un canale che dava la forza per far girare le macchine. Dal 1987 il marchio Lanerossi fa parte del Gruppo Marzotto.',fonte:W.lanerossi},
  {id:'alessandro',chiavi:['alessandro','rossi','imprenditore','chi era','figlio','1819','1898'],
    testo:'Alessandro Rossi (1819-1898) è il figlio di Francesco. Trasforma il lanificio di famiglia in una grande industria e cambia la città: costruisce fabbriche, case per gli operai, scuole e giardini.',fonte:W.rossi},
  {id:'quartiere',chiavi:['quartiere','operai','operaio','case','casa','scuole','scuola','asilo','lavoratori','nuova schio'],
    testo:'Il Nuovo quartiere operaio di Schio è stato costruito tra il 1872 e il 1896 per volontà di Alessandro Rossi, per i lavoratori che arrivavano dalle campagne. Aveva case, scuole, un asilo, bagni pubblici, un lavatoio e un giardino. Ancora oggi è un quartiere abitato.',fonte:W.quartiere},
  {id:'fabbricaAlta',chiavi:['fabbrica alta','fabbrica','vivroux','architetto','1862','ciminiera','piani','edificio'],
    testo:'La Fabbrica Alta è stata costruita nel 1862 su progetto dell\'architetto belga Auguste Vivroux, in soli nove mesi. È lunga 80 metri e ha cinque piani più il sottotetto. In cima alla ciminiera c\'è scritto «1862».',fonte:W.fabbrica},
  {id:'manchester',chiavi:['manchester','soprannome','citta industriale','industria','schio'],
    testo:'Per il grande sviluppo dell\'industria della lana, Schio fu chiamata «la Manchester d\'Italia», come la città inglese simbolo della rivoluzione industriale.',fonte:W.schio},
  {id:'tessitore',chiavi:['tessitore','monumento','omo','statua','monteverde','1879'],
    testo:'Il Monumento al Tessitore, detto «l\'Omo», è una statua del 1879 di Giulio Monteverde, voluta da Alessandro Rossi e dedicata «ai suoi tessitori». È considerato il primo monumento in Italia dedicato a dei lavoratori. L\'operaio tiene in mano una navetta del telaio.',fonte:W.tessitore},
  {id:'conte',chiavi:['conte','lanificio conte','1757','antonio conte'],
    testo:'Il Lanificio Conte di Schio nasce nel 1757, quando Antonio Conte rileva una piccola attività artigianale lungo la Roggia Maestra. È ancora in attività, nei nuovi stabilimenti della zona industriale.',fonte:W.conte},
  {id:'giardino',chiavi:['giardino','jacquard','caregaro','negrin','parco','teatro jacquard'],
    testo:'Il Giardino Jacquard è un giardino all\'inglese davanti al Lanificio Rossi, realizzato tra il 1859 e il 1878 dall\'architetto Antonio Caregaro Negrin per Alessandro Rossi. Porta il nome di Joseph-Marie Jacquard, l\'inventore del telaio. Dentro ci sono anche un teatro, una serra, grotte e un belvedere.',fonte:W.giardino},
  {id:'telaio',chiavi:['telaio','jacquard','schede','perforate','computer','1801','invenzione','inventore'],
    testo:'Joseph-Marie Jacquard presentò il suo telaio nel 1801. Il telaio legge schede perforate che comandano il disegno del tessuto: è la prima applicazione pratica delle schede perforate, un\'idea che arriverà fino ai primi computer.',fonte:W.telaio},
  {id:'jacquardUomo',chiavi:['jacquard','lione','chi era','inventore','canuts','rivolta'],
    testo:'Joseph-Marie Jacquard nasce a Lione nel 1752 e muore nel 1834. All\'inizio la sua invenzione spaventò i tessitori, che temevano di perdere il lavoro: a Lione scoppiò la rivolta dei Canuts, i tessitori di seta. Poi il telaio si diffuse in tutta Europa.',fonte:W.telaio},
  {id:'gallerie',chiavi:['52 gallerie','gallerie','galleria','strada','mulattiera','1917','pasubio','costruita','scavata','minatori'],
    testo:'La Strada delle 52 gallerie è una mulattiera militare scavata sul Pasubio dal 6 febbraio al novembre 1917, dalla 33ª Compagnia minatori del Genio. Passa sul versante sud del monte, dove l\'artiglieria austro-ungarica non poteva colpire. Va da Bocchetta Campiglia (1.216 m) alle Porte del Pasubio.',fonte:W.gallerie},
  {id:'motti',chiavi:['motti','ideatore','ideato','progettato','capitano','leopoldo','chi progettato','chi ideato','progettato gallerie','ideato gallerie','progettato strada','ideato strada'],
    testo:'L\'ideatore della Strada delle 52 gallerie fu il capitano del Genio Leopoldo Motti, morto il 29 settembre 1917 nell\'esplosione della prima mina austriaca sul Dente Italiano.',fonte:W.gallerie},
  {id:'pasubio',chiavi:['pasubio','dente','denti','mine','mina','guerra','trincee','combattimenti','cima palon'],
    testo:'Sul Pasubio si è combattuto per tre anni e mezzo. Sui due «Denti» le trincee italiane e austriache erano vicinissime, e nell\'inverno 1917-18 si combatté una «guerra delle mine»: ognuno scavava gallerie per far saltare le postazioni nemiche. La cima più alta è Cima Palon, 2.232 metri.',fonte:W.pasubio},
  {id:'oggi',chiavi:['oggi','visitare','bicicletta','bici','camminare','escursione','sentiero','percorrere'],
    testo:'La Strada delle 52 gallerie oggi si percorre a piedi. In bicicletta è vietato, dopo diversi incidenti mortali, ed è meglio evitarla con temporali e brutto tempo per il rischio di sassi e fango.',fonte:W.gallerie},
  {id:'unesco',chiavi:['unesco','patrimonio','umanita','1996','1994','ville palladiane','tutelata'],
    testo:'Tra il 1994 e il 1996 l\'UNESCO ha inserito Vicenza e le ville di Palladio nel Veneto tra i patrimoni dell\'umanità, nel sito «Città di Vicenza e le ville palladiane del Veneto». Villa Godi ne fa parte dal 1996.',fonte:W.villePalladiane},
  {id:'villaGodi',chiavi:['villa godi','godi','villa','lonedo','lugo','fratelli','1537','1542','prima villa','costruita'],
    testo:'Villa Godi è a Lonedo di Lugo di Vicenza. Il progetto, per i fratelli Gerolamo, Pietro e Marcantonio Godi, va dal 1537 al 1542. È una delle prime opere di Andrea Palladio, la prima documentata con sicurezza: la descrive lui stesso nei Quattro Libri dell\'Architettura.',fonte:W.villaGodi},
  {id:'loggia',chiavi:['loggia','arcate','arcata','archi','arco','scalinata','scala','facciata','simmetria','simmetrica','ali','ala'],
    testo:'Villa Godi è chiaramente simmetrica. La parte centrale della facciata è arretrata e si apre in una loggia con tre arcate, al piano nobile. La scalinata arriva solo all\'arco centrale: ricorda il ponte levatoio dei castelli, per controllare chi entrava.',fonte:W.villaGodi},
  {id:'palladio',chiavi:['palladio','andrea','architetto','1508','1580','gondola','chi era palladio','rinascimento'],
    testo:'Andrea Palladio, vero nome Andrea di Pietro della Gondola, nasce a Padova nel 1508 e muore a Vicenza nel 1580. È uno degli architetti più influenti della storia: nel territorio della Repubblica di Venezia progetta ville, chiese e palazzi, soprattutto a Vicenza.',fonte:W.palladio},
  {id:'quattroLibri',chiavi:['quattro libri','libri','libro','trattato','1570','regole','venezia'],
    testo:'I Quattro Libri dell\'Architettura sono il trattato di Palladio, pubblicato a Venezia nel 1570. Le ville che mostra sono quasi sempre simmetriche: quello che sta a sinistra si ripete a destra.',fonte:W.quattroLibri}
];

// "chi" non è tra le parole ignorate: segnala che la domanda chiede di una persona.
const _stop=new Set('il lo la i gli le un uno una di a da in con su per tra fra e o ma che cosa come quando dove perche quale quali quanto quanti mi ti ci si del dello della dei degli delle al allo alla ai agli alle nel nella nei sul sulla sui è e era sono stato stata fu hai ho ha mi dici dimmi raccontami parlami sai qualcosa questo questa quello quella'.split(' '));
const _norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9 ]+/g,' ');
const _radice=w=>w.length>5?w.slice(0,5):w;
const _parole=s=>_norm(s).split(/\s+/).filter(w=>w&&!_stop.has(w)).map(_radice);

// Peso di ogni parola: più è rara tra le schede, più conta ("progettato" pesa più di "gallerie").
// Si ricalcola quando cambia il numero di schede, perché le sale (js/sale/) ne aggiungono dopo il caricamento.
const _peso={};let _pesoN=-1;
function _aggiornaPesi(){
  if(_pesoN===CONOSCENZA.length)return;
  Object.keys(_peso).forEach(w=>delete _peso[w]);
  CONOSCENZA.forEach(s=>new Set(s.chiavi.flatMap(_parole)).forEach(w=>_peso[w]=(_peso[w]||0)+1));
  Object.keys(_peso).forEach(w=>_peso[w]=1/_peso[w]);
  _pesoN=CONOSCENZA.length;
}

// Trova la scheda che risponde meglio. Restituisce {testo, fonte, id} oppure {testo, fonte:null} se non sa rispondere.
function chiediAlCustode(domanda){
  _aggiornaPesi();
  const q=new Set(_parole(domanda||''));
  if(!q.size)return {testo:'Fammi una domanda sul museo: il lanificio, la Fabbrica Alta, il telaio, le 52 gallerie…',fonte:null};
  let migliore=null,punti=0;
  CONOSCENZA.forEach(s=>{
    let p=0;
    const prese=new Set();
    s.chiavi.forEach(k=>{const t=_parole(k);if(t.length&&t.every(w=>q.has(w)))t.forEach(w=>prese.add(w))});
    prese.delete('chi');
    prese.forEach(w=>p+=_peso[w]);
    if(p&&q.has('chi')&&s.chiavi.some(k=>_parole(k).includes('chi')))p+=_peso.chi;
    if(p>punti){punti=p;migliore=s}
  });
  if(!migliore)return {testo:'Su questo le fonti che ho non dicono niente, e non voglio inventare. Prova a chiedermi del lanificio, della Fabbrica Alta, del telaio Jacquard o delle 52 gallerie.',fonte:null};
  return {testo:migliore.testo,fonte:migliore.fonte,id:migliore.id};
}

// Finestra "Chiedi al custode". Da chiamare dal dialogo del custode (enigmi.js).
function apriDomandeCustode(){
  const esempi=['Chi era Alessandro Rossi?','Perché la Fabbrica Alta è famosa?','Chi ha inventato il telaio a schede?','Chi ha progettato le 52 gallerie?'];
  openModal(`<div class="eyebrow">Custode</div><h2>Chiedi al custode</h2>
    <p>Rispondo solo con quello che dicono le fonti aperte, e ti dico sempre dove l'ho letto.</p>
    <div class="row" id="cEsempi">${esempi.map(e=>`<button type="button">${e}</button>`).join('')}</div>
    <form class="row" id="cForm"><input id="cDomanda" maxlength="160" autocomplete="off" placeholder="Scrivi una domanda…" style="flex:1;min-width:0"><button class="primary" type="submit">Chiedi</button></form>
    <div id="cRisposta" class="clue" hidden></div>
    <div class="row end">${closeBtn}</div>`);
  const rispondi=d=>{
    const r=chiediAlCustode(d),box=$('cRisposta');box.hidden=false;
    box.innerHTML='';const t=document.createElement('p');t.textContent=r.testo;box.appendChild(t);
    if(r.fonte){const f=document.createElement('p');f.className='eyebrow';f.innerHTML=`Fonte: <a href="${r.fonte.url}" target="_blank" rel="noopener">${r.fonte.titolo}</a>`;box.appendChild(f)}
  };
  $('cEsempi').addEventListener('click',e=>{const b=e.target.closest('button');if(b){$('cDomanda').value=b.textContent;rispondi(b.textContent)}});
  $('cForm').addEventListener('submit',e=>{e.preventDefault();rispondi($('cDomanda').value)});
  $('cDomanda').focus();
}
