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
  // Posizione di ogni stanza nel disegno (x e y da 0 a 100, y verso il basso) e il suo ramo; sinistra = nome a sinistra del punto.
  posti:{
    ingresso:{x:49,y:84,ramo:'museo'},museo:{x:61,y:71,ramo:'museo'},uscita:{x:71,y:55,ramo:'museo'},villa:{x:53,y:57,ramo:'museo'},
    tessitore:{x:34,y:51,ramo:'lana'},citta:{x:26,y:55,ramo:'lana',sinistra:1},
    castello:{x:46,y:46,ramo:'storia'},meneghello:{x:43,y:41,ramo:'storia'},
    forti:{x:36,y:36,ramo:'guerra'},mine:{x:28,y:27,ramo:'guerra'},cimone:{x:24,y:22,ramo:'guerra',sinistra:1},ferrarin:{x:31,y:21,ramo:'guerra'},
    grotta:{x:35,y:17,ramo:'acque'},anguane:{x:39,y:27,ramo:'acque'},recoaro:{x:40,y:33,ramo:'acque'}
  },
  rami:{museo:'Il museo',lana:'Lana e industria',storia:'Storia e lettere',guerra:'La Grande Guerra',acque:'Le acque della montagna'},
  // Dove ogni stanza ha la porta verso ciascun vicino: {lato:'L' (parete sinistra) | 'R' (parete destra), t: casella}.
  // Ogni area compila le sue stanze: qui ingresso, museo, villa e uscita; le 11 sale le aggiunge js/sale/registro.js.
  porte:{
    ingresso:{forti:{lato:'L',t:2},tessitore:{lato:'L',t:5},castello:{lato:'R',t:2},villa:{lato:'R',t:5},museo:{lato:'R',t:8}},
    museo:{ingresso:{lato:'L',t:4},uscita:{lato:'R',t:10}},
    villa:{ingresso:{lato:'L',t:6}},
    uscita:{museo:{lato:'L',t:3}}
  },
  // Le stanze collegate a id, nell'ordine dei collegamenti.
  vicini(id){return this.collegamenti.filter(c=>c.includes(id)).map(c=>c[0]===id?c[1]:c[0])}
};
// Nomi delle stanze del museo; le sale a tema hanno il loro in SALA[id].nome.
const NOMI_PIANTA={ingresso:'Ingresso',museo:'Museo del Territorio',villa:'Sala delle Ville',uscita:'Uscita'};
const nomePianta=id=>NOMI_PIANTA[id]||(typeof SALA!=='undefined'&&SALA[id]&&SALA[id].nome)||id;
// Casella del pavimento davanti a una porta.
const davantiPorta=(lato,t)=>lato==='R'?[t,0]:[0,t];
// Porta il giocatore dalla stanza da alla stanza a, davanti alla porta di a che riporta a da.
function vaiVerso(da,a){const p=PIANTA.porte[a]&&PIANTA.porte[a][da];vaiInStanza(a,...(p?davantiPorta(p.lato,p.t):[1,1]))}
// Quante porte separano ogni stanza dall'ingresso.
function distanzePianta(){const d={[PIANTA.inizio]:0},coda=[PIANTA.inizio];
  while(coda.length){const id=coda.shift();PIANTA.vicini(id).forEach(v=>{if(!(v in d)){d[v]=d[id]+1;coda.push(v)}})}return d}
// Il genitore di una stanza: la vicina più vicina all'ingresso (nessuno per l'ingresso stesso).
const genitorePianta=id=>{const d=distanzePianta();return PIANTA.vicini(id).filter(v=>d[v]<d[id]).sort((a,b)=>d[a]-d[b])[0]||null};
// Porta il giocatore nella stanza id, davanti alla porta da cui si arriva (per «Vai qui» e «Vai alla sala»).
function vaiInStanzaPianta(id){const g=genitorePianta(id);if(g)return vaiVerso(g,id);vaiInStanza(id,5,6)}
// Gli oggetti varco di una stanza, uno per ogni porta in PIANTA.porte: si accendono quando la stanza di là è completata
// (non quelli verso l'ingresso, che lo è sempre).
function varchiPianta(id){
  return Object.entries(PIANTA.porte[id]||{}).map(([v,{lato,t}])=>({id:`varco-${id}-${v}`,x:lato==='R'?t:-1,y:lato==='R'?-1:t,
    get name(){return 'Varco: '+nomePianta(v)},act:()=>vaiVerso(id,v),hit:()=>hitVarco(lato,t),acceso:()=>v!=='ingresso'&&completata(v)}));
}
// Disegna sulle pareti i varchi della stanza id: verso una sala a tema con il suo colore e il suo emblema.
function pareteVarchiPianta(g,id){
  Object.entries(PIANTA.porte[id]||{}).forEach(([v,{lato,t}])=>{
    const sala=typeof SALA!=='undefined'&&SALA[v];
    pareteVarco(g,lato,t,sala?{colore:sala.colore,motivo:typeof MOTIVI!=='undefined'?MOTIVI[v]:null}:undefined)});
}

/* ---------- La piantina interattiva dell'ingresso ---------- */
// Disegna la pianta con i collegamenti; le stanze completate sono dorate. Toccando una stanza si legge cosa contiene.
// Se un'altra area definisce una sua apriPianta in un file caricato dopo, quella sostituisce questa.
// Colore di ogni ramo nella piantina: le zone di sfondo e il bordo delle stanze del museo.
const COLORI_RAMI={museo:'#6b5a7a',lana:'#a8483a',storia:'#8a6a34',guerra:'#5f6b4a',acque:'#3f6f8a'};
// Disposizione ad albero: l'ingresso in basso, ogni porta un piano più su; le stanze senza figli in colonne,
// ordinate come nel disegno di Dumunzio (PIANTA.posti.x); un genitore sta al centro dei suoi figli.
function disposizionePianta(){
  const P_=PIANTA.posti,d=distanzePianta();
  const figli=id=>PIANTA.vicini(id).filter(v=>d[v]===d[id]+1&&genitorePianta(v)===id).sort((a,b)=>P_[a].x-P_[b].x);
  const col={};let n=0;
  const visita=id=>{const f=figli(id);if(!f.length)return col[id]=n++;f.forEach(visita);col[id]=(col[f[0]]+col[f[f.length-1]])/2};
  visita(PIANTA.inizio);
  return {col,riga:d,colonne:n,righe:Math.max(...Object.values(d))+1};
}
function apriPianta(){
  const P_=PIANTA.posti,ids=Object.keys(P_),fatte=ids.filter(completata).length;
  // stanze come rettangoli su una griglia, corridoi ad angolo retto tra una stanza e l'altra
  const {col,riga,colonne,righe}=disposizionePianta(),CW=58,RH=58,W=52,H=30,M=8;
  const vw=colonne*CW+M*2,vh=righe*RH+M*2+6; // in basso lo spazio per «sei qui» sotto l'ingresso
  const cx=id=>M+col[id]*CW+CW/2,cy=id=>vh-M-6-riga[id]*RH-RH/2+4;
  const breve=id=>nomePianta(id).replace(/^Sala (delle |dei |del |della |dello |dell')/,'').replace(' del Territorio','');
  // nomi lunghi su due righe
  const righeNome=id=>{const s=breve(id),i=s.indexOf(' ');return s.length<=9||i<0?[s]:[s.slice(0,i),s.slice(i+1)]};
  const bordo=id=>typeof SALA!=='undefined'&&SALA[id]?SALA[id].colore:COLORI_RAMI[P_[id].ramo];
  // zone dei rami (non il museo, che ha stanze sparse): un rettangolo tenue dietro le stanze dello stesso ramo, col nome
  const zone=Object.keys(PIANTA.rami).filter(r=>r!=='museo').map(r=>{const st=ids.filter(id=>P_[id].ramo===r);if(!st.length)return '';
    const x0=Math.min(...st.map(cx))-W/2-4,x1=Math.max(...st.map(cx))+W/2+4,y0=Math.min(...st.map(cy))-H/2-12,y1=Math.max(...st.map(cy))+H/2+4;
    // un nome più largo della zona si stringe per starci
    const largo=PIANTA.rami[r].length*4.3>x1-x0-6?` textLength="${x1-x0-6}" lengthAdjust="spacingAndGlyphs"`:'';
    return `<rect class="zona" x="${x0}" y="${y0}" width="${x1-x0}" height="${y1-y0}" style="--c:${COLORI_RAMI[r]}"/><text class="zona-nome" x="${x0+3}" y="${y0+8}"${largo} style="--c:${COLORI_RAMI[r]}">${PIANTA.rami[r]}</text>`}).join('');
  // corridoio: dal lato alto della stanza più bassa sale a metà piano, va di lato e sale fino all'altra
  const corridoi=PIANTA.collegamenti.map(([a,b])=>{if(riga[a]>riga[b])[a,b]=[b,a];const ym=(cy(a)-H/2+cy(b)+H/2)/2;
    return `<path d="M${cx(a)} ${cy(a)-H/2}V${ym}H${cx(b)}V${cy(b)+H/2}"/>`}).join('');
  const stanze=ids.map(id=>{const c=completata(id),qui=S.room===id,nr=righeNome(id);
    return `<g data-stanza="${id}" tabindex="0" role="button" aria-label="${nomePianta(id)}${c?', completata':''}${qui?', sei qui':''}">`+
      (qui?`<rect class="qui" x="${cx(id)-W/2-4}" y="${cy(id)-H/2-4}" width="${W+8}" height="${H+8}"/>`:'')+
      `<rect class="stanza${c?' fatta':''}" x="${cx(id)-W/2}" y="${cy(id)-H/2}" width="${W}" height="${H}" style="--c:${bordo(id)}"/>`+
      nr.map((t,i)=>`<text x="${cx(id)}" y="${cy(id)+3+(i-(nr.length-1)/2)*9}" text-anchor="middle">${t}</text>`).join('')+
      (c&&id!=='ingresso'?`<text class="spunta" x="${cx(id)+W/2-5}" y="${cy(id)-H/2+8}" text-anchor="middle">✓</text>`:'')+
      (qui?`<text class="sei-qui" x="${cx(id)}" y="${cy(id)+H/2+9}" text-anchor="middle">sei qui</text>`:'')+'</g>'}).join('');
  openModal(`<div class="eyebrow">Ingresso · ${fatte} ${fatte===1?'stanza':'stanze'} su ${ids.length} completat${fatte===1?'a':'e'}</div><h2>Pianta del museo</h2>
    <div class="pianta-scorri"><svg class="pianta" viewBox="0 0 ${vw} ${vh}" role="group" aria-label="Pianta del museo">${zone}<g class="corridoi">${corridoi}</g>${stanze}</svg></div>
    <p class="clue" id="pDettaglio">Tocca una stanza. Si entra dall'ingresso, in basso, e si sale di porta in porta. Le stanze dorate sono completate; la cornice tratteggiata è dove sei.</p>
    <div class="pianta-rami">${Object.entries(PIANTA.rami).map(([r,nome])=>`<div><b>${nome}</b> ${ids.filter(id=>P_[id].ramo===r).map(id=>`<span class="${completata(id)?'fatta':''}">${completata(id)?'✓ ':''}${nomePianta(id)}</span>`).join(' · ')}</div>`).join('')}</div>
    <div class="row end">${closeBtn}</div>`);
  const mostra=id=>{const c=completata(id),s=SIGILLI_STANZA[id];
    $('pDettaglio').textContent=`${nomePianta(id)} · ${PIANTA.rami[P_[id].ramo]}. `+(c?'Completata.':s?`Sigilli: ${s.filter(k=>S.seals[k]).length} su ${s.length}.`:id==='uscita'?'Qui c\'è la porta d\'uscita.':'Tessera ancora da trovare.')};
  $('card').querySelectorAll('[data-stanza]').forEach(el=>{el.onclick=()=>mostra(el.dataset.stanza);el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();mostra(el.dataset.stanza)}}});
  // sul telefono la pianta è più larga dello schermo: si apre centrata sulla stanza dove sei
  const sc=$('card').querySelector('.pianta-scorri'),q=sc&&sc.querySelector('rect.qui');
  if(q&&sc.scrollWidth>sc.clientWidth){const a=sc.getBoundingClientRect(),r=q.getBoundingClientRect();sc.scrollLeft+=r.left+r.width/2-(a.left+a.width/2)}
  $('card').scrollTop=0;  // il fuoco va su «Chiudi», in fondo: la finestra si apre comunque dall'inizio
}

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
