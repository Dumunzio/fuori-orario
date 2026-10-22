/* Musica delle stanze: un brano per stanza, generato dal codice con il Web Audio del browser.
   Niente file audio (niente download né licenze) e niente librerie.
   Area: grafica-motore. Vedi CLAUDE.md prima di modificare. */

/* ---------- I brani ---------- */
// bpm; radice = nota MIDI della tonica; scala = semitoni dalla tonica; giro = grado della scala di ogni battuta (4 battute);
// voce = timbro della melodia (VOCI); densita = quante note ha la melodia (0-1); alto = ottave sopra la radice;
// eco = quantità di eco (0-1); vol = volume del brano, per pareggiare le stanze; pad = accordi lunghi; basso = timbro del basso (VOCI) o null; ritmo = percussioni (RITMI) o null.
// Una stanza può avere il suo brano in STANZE.<id>.musica, con lo stesso formato: vince su questa tabella.
const MUSICHE={
  museo:     {bpm:64, radice:57,scala:[0,2,3,5,7,8,11],giro:[0,5,3,4],voce:'carillon',densita:.45,alto:1,eco:.4,pad:0,basso:'morbido',ritmo:null,vol:1},
  villa:     {bpm:84, radice:62,scala:[0,2,3,5,7,9,10],giro:[0,3,6,4],voce:'liuto',densita:.55,alto:0,eco:.25,pad:0,basso:'morbido',ritmo:'arpeggio',vol:0.95},
  atrio:     {bpm:56, radice:60,scala:[0,2,4,6,7,9,11],giro:[0,3,5,4],voce:'flauto',densita:.2,alto:1,eco:.5,pad:1,basso:null,ritmo:null,vol:0.92},
  tessitore: {bpm:104,radice:55,scala:[0,2,3,5,7,8,10],giro:[0,0,5,4],voce:'quadra',densita:.4,alto:1,eco:.15,pad:0,basso:'quadro',ritmo:'telaio',vol:2.5},
  mine:      {bpm:52, radice:40,scala:[0,1,3,5,7,8,10],giro:[0,0,1,0],voce:'flauto',densita:.12,alto:2,eco:.45,pad:1,basso:'cupo',ritmo:'battito',vol:0.6},
  cimone:    {bpm:52, radice:50,scala:[0,2,3,5,7,8,10],giro:[0,5,2,4],voce:'organo',densita:.2,alto:1,eco:.4,pad:1,basso:'cupo',ritmo:null,vol:0.6},
  forti:     {bpm:92, radice:53,scala:[0,2,3,5,7,8,10],giro:[0,3,4,0],voce:'tromba',densita:.35,alto:1,eco:.2,pad:0,basso:'quadro',ritmo:'tamburo',vol:2.8},
  citta:     {bpm:116,radice:60,scala:[0,2,4,5,7,9,11],giro:[0,5,1,4],voce:'quadra',densita:.5,alto:1,eco:.15,pad:0,basso:'morbido',ritmo:'swing',vol:1.3},
  castello:  {bpm:88, radice:57,scala:[0,2,3,5,7,9,10],giro:[0,6,0,4],voce:'liuto',densita:.5,alto:1,eco:.3,pad:0,basso:'bordone',ritmo:'tamburello',vol:1.6},
  ferrarin:  {bpm:126,radice:62,scala:[0,2,4,6,7,9,11],giro:[0,4,5,3],voce:'quadra',densita:.45,alto:1,eco:.25,pad:0,basso:'morbido',ritmo:'arpeggio',vol:1.1},
  grotta:    {bpm:60, radice:57,scala:[0,3,5,7,10],giro:[0,0,3,2],voce:'goccia',densita:.15,alto:2,eco:.7,pad:0,basso:'cupo',ritmo:'gocce',vol:0.65},
  anguane:   {bpm:70, radice:64,scala:[0,2,3,6,7,8,11],giro:[0,5,3,4],voce:'flauto',densita:.35,alto:1,eco:.55,pad:1,basso:null,ritmo:null,vibrato:1,vol:1},
  meneghello:{bpm:76, radice:60,scala:[0,2,4,5,7,9,11],giro:[0,5,3,4],voce:'piano',densita:.35,alto:1,eco:.3,pad:0,basso:'morbido',ritmo:null,vol:0.78},
  recoaro:   {bpm:108,radice:65,scala:[0,2,4,5,7,9,11],giro:[0,3,4,0],voce:'goccia',densita:.45,alto:1,eco:.3,pad:0,basso:'morbido',ritmo:'bolle',vol:1}
};
// Timbri: onda, inviluppo (a = attacco, d = decadimento, s = sostegno 0-1, r = rilascio, in secondi), volume,
// filtro passa-basso facoltativo, ottava = seconda onda un'ottava sopra (volume relativo).
const VOCI={
  carillon:{onda:'triangle',a:.004,d:.5,s:0,r:.3,v:.32,ottava:.35},
  liuto:   {onda:'triangle',a:.004,d:.3,s:0,r:.15,v:.34},
  flauto:  {onda:'sine',a:.08,d:.3,s:.6,r:.35,v:.22},
  quadra:  {onda:'square',a:.004,d:.12,s:.3,r:.08,v:.06,filtro:2600},
  organo:  {onda:'sine',a:.12,d:.4,s:.8,r:.5,v:.16,ottava:.5},
  tromba:  {onda:'sawtooth',a:.03,d:.2,s:.6,r:.12,v:.08,filtro:1700},
  goccia:  {onda:'sine',a:.002,d:.2,s:0,r:.1,v:.3},
  piano:   {onda:'triangle',a:.004,d:1,s:0,r:.4,v:.3,ottava:.15},
  morbido: {onda:'triangle',a:.01,d:.4,s:.4,r:.2,v:.26},
  quadro:  {onda:'square',a:.005,d:.1,s:.5,r:.06,v:.05,filtro:700},
  cupo:    {onda:'sine',a:.05,d:.5,s:.7,r:.4,v:.3},
  bordone: {onda:'sawtooth',a:.2,d:.5,s:.8,r:.4,v:.05,filtro:500},
  pad:     {onda:'sine',a:.6,d:.8,s:.7,r:.8,v:.06}
};
// Percussioni: per ogni passo della battuta (0-15) i colpi da suonare. rnd = numero casuale del passo (fisso).
const RITMI={
  telaio:    (p)=>[...([0,8].includes(p)?['tonfo']:[]),...([6,14].includes(p)?['clack']:[])],
  battito:   (p)=>[0,3].includes(p)?['tonfo']:[],
  tamburo:   (p)=>[4,12].includes(p)?['rullante']:p===14||p===15?['rullante-piano']:[],
  swing:     (p)=>[...(p%4===2?['charleston']:[]),...([0,8].includes(p)?['tonfo-piano']:[])],
  tamburello:(p)=>[0,6,8,12].includes(p)?['clack-piano']:[],
  arpeggio:  ()=>[],
  gocce:     (p,rnd)=>rnd<.12?['goccia']:[],
  bolle:     (p,rnd)=>rnd<.2?['bolla']:[]
};

/* ---------- Generazione delle note ---------- */
// Numeri casuali con seme: lo stesso brano genera sempre la stessa melodia.
function semeCasuale(testo){let h=2166136261;for(const c of testo)h=Math.imul(h^c.charCodeAt(0),16777619);
  return ()=>{h=Math.imul(h^h>>>15,h|1);h^=h+Math.imul(h^h>>>7,h|61);return((h^h>>>14)>>>0)/4294967296}}
const nota=(b,grado,ottave=0)=>{const n=b.scala.length,g=((grado%n)+n)%n;return b.radice+b.scala[g]+12*(ottave+Math.floor(grado/n))};
// 64 passi (4 battute da 16): melodia {midi, durata in passi} o null, e il numero casuale del passo per le percussioni.
const SPARTITI={};
function spartito(id,b){
  if(SPARTITI[id])return SPARTITI[id];
  const rnd=semeCasuale(id),passi=[];let grado=b.giro[0];
  for(let s=0;s<64;s++){
    const base=b.giro[Math.floor(s/16)],peso=s%4===0?1.6:s%2===0?1:.35;
    let mel=null;
    if(rnd()<b.densita*peso){
      grado+=Math.round((rnd()-.5)*4);
      if(s%16===0)grado=base+[0,2,4][Math.floor(rnd()*3)];            // in battere, una nota dell'accordo
      grado=Math.max(base-3,Math.min(base+9,grado));
      mel=nota(b,grado,b.alto);
    }
    passi.push({mel,r:rnd()});
  }
  passi.forEach((p,i)=>{if(p.mel===null)return;let d=1;while(d<4&&i+d<64&&passi[i+d].mel===null)d++;p.dur=d});
  return SPARTITI[id]=passi;
}

/* ---------- Suono ---------- */
let RUMORE=null;
function rumore(ac){if(RUMORE&&RUMORE.sampleRate===ac.sampleRate)return RUMORE;
  const b=ac.createBuffer(1,ac.sampleRate*.5,ac.sampleRate),d=b.getChannelData(0);let s=12345;
  for(let i=0;i<d.length;i++){s=(s*1103515245+12345)&2147483647;d[i]=s/1073741824-1}return RUMORE=b}
function suona(ac,out,t,midi,dur,voce,extra={}){
  const v=VOCI[voce],f=440*2**((midi-69)/12),g=ac.createGain(),picco=v.v*(extra.vol||1);
  g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(picco,t+v.a);
  g.gain.setTargetAtTime(picco*v.s,t+v.a,v.d/3);g.gain.setTargetAtTime(0,t+v.a+Math.max(dur,v.a),v.r/3);
  let dest=g;if(v.filtro){const fl=ac.createBiquadFilter();fl.type='lowpass';fl.frequency.value=v.filtro;fl.connect(g);dest=fl}
  const fine=t+v.a+Math.max(dur,v.a)+v.r+.1;
  [[1,1],...(v.ottava?[[2,v.ottava]]:[])].forEach(([m,vol])=>{const o=ac.createOscillator();o.type=v.onda;o.frequency.value=f*m;
    let n=o;if(vol!==1){const gv=ac.createGain();gv.gain.value=vol;o.connect(gv);n=gv}n.connect(dest);
    if(extra.vibrato){const l=ac.createOscillator(),lg=ac.createGain();l.frequency.value=5;lg.gain.value=f*.012;l.connect(lg);lg.connect(o.frequency);l.start(t);l.stop(fine)}
    o.start(t);o.stop(fine)});
  g.connect(out);
}
function colpo(ac,out,t,tipo){
  const piano=tipo.endsWith('-piano'),k=piano?.5:1,nome=tipo.replace('-piano','');
  if(nome==='tonfo'||nome==='goccia'||nome==='bolla'){
    const o=ac.createOscillator(),g=ac.createGain(),[f0,f1,d,v]={tonfo:[90,40,.18,.35],goccia:[1600,700,.12,.12],bolla:[500,1200,.09,.1]}[nome];
    o.type='sine';o.frequency.setValueAtTime(f0,t);o.frequency.exponentialRampToValueAtTime(f1,t+d);
    g.gain.setValueAtTime(v*k,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(out);o.start(t);o.stop(t+d+.02);return}
  const [tipoF,freq,d,v]={clack:['bandpass',2600,.05,.25],rullante:['highpass',1400,.12,.18],charleston:['highpass',7000,.03,.08]}[nome];
  const s=ac.createBufferSource(),fl=ac.createBiquadFilter(),g=ac.createGain();s.buffer=rumore(ac);fl.type=tipoF;fl.frequency.value=freq;
  g.gain.setValueAtTime(v*k,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);s.connect(fl);fl.connect(g);g.connect(out);s.start(t,Math.random()*.4);s.stop(t+d+.02);
}
const branoDi=id=>(STANZE[id]&&STANZE[id].musica)||MUSICHE[id]||MUSICHE.museo;
// Programma il passo s (0-63) del brano id all'istante t, sull'uscita out.
function programmaPasso(ac,out,id,s,t){
  const b=branoDi(id),passo=60/b.bpm/4,p=spartito(id,b)[s],battuta=Math.floor(s/16),q=s%16,base=b.giro[battuta];
  if(p.mel!==null)suona(ac,out,t,p.mel,p.dur*passo,b.voce,{vibrato:b.vibrato});
  if(b.basso&&(q===0||q===8&&b.basso!=='bordone'))suona(ac,out,t,nota(b,base,-1),(b.basso==='bordone'?16:7)*passo,b.basso);
  if(b.pad&&q===0)[0,2,4].forEach(k=>suona(ac,out,t,nota(b,base+k,0),15*passo,'pad'));
  if(b.ritmo==='arpeggio'&&q%2===0)suona(ac,out,t,nota(b,base+[0,2,4,7][q/2%4],0),passo*1.5,'liuto',{vol:.5});
  if(b.ritmo)RITMI[b.ritmo](q,p.r).forEach(c=>colpo(ac,out,t,c));
}
// Programma n passi del brano a partire da t0: per le prove e per le anteprime.
function programmaBrano(ac,out,id,t0,n){const b=branoDi(id),passo=60/b.bpm/4,g=ac.createGain();g.gain.value=b.vol||1;g.connect(out);
  for(let s=0;s<n;s++)programmaPasso(ac,g,id,s%64,t0+s*passo)}

/* ---------- Riproduzione ---------- */
const MUSICA={on:true,brano:null,ac:null,bus:null,passo:0,prossimo:0};
try{MUSICA.on=localStorage.getItem('fuoriOrario.musica')!=='0'}catch(e){}
function nuovoBus(ac,b){
  const bus=ac.createGain(),eco=ac.createDelay(2),ritorno=ac.createGain(),umido=ac.createGain();
  bus.gain.value=0;eco.delayTime.value=60/b.bpm*.75;ritorno.gain.value=b.eco*.45;umido.gain.value=b.eco*.6;
  bus.connect(MUSICA.uscita);bus.connect(eco);eco.connect(ritorno);ritorno.connect(eco);eco.connect(umido);umido.connect(MUSICA.uscita);
  return bus;
}
function sfuma(bus,a,secondi){if(!bus)return;const t=MUSICA.ac.currentTime;bus.gain.cancelScheduledValues(t);bus.gain.setValueAtTime(bus.gain.value,t);bus.gain.linearRampToValueAtTime(a,t+secondi)}
// La musica della stanza id: sfuma quella di prima e attacca il nuovo brano.
function suonaStanza(id){
  if(MUSICA.brano===id)return;MUSICA.brano=id;
  if(!MUSICA.ac)return;
  const vecchio=MUSICA.bus;if(vecchio){sfuma(vecchio,0,.5);setTimeout(()=>vecchio.disconnect(),700)}
  MUSICA.bus=nuovoBus(MUSICA.ac,branoDi(id));sfuma(MUSICA.bus,branoDi(id).vol||1,.6);
  MUSICA.passo=0;MUSICA.prossimo=MUSICA.ac.currentTime+.08;
}
// Il browser permette l'audio solo dopo un gesto: il contesto nasce al primo clic o tasto.
function svegliaMusica(){
  if(!MUSICA.ac){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    MUSICA.ac=new AC();MUSICA.uscita=MUSICA.ac.createGain();MUSICA.uscita.gain.value=MUSICA.on?.5:0;MUSICA.uscita.connect(MUSICA.ac.destination);
    const id=MUSICA.brano;MUSICA.brano=null;if(id)suonaStanza(id)}
  if(MUSICA.ac.state==='suspended')MUSICA.ac.resume();
}
['pointerdown','keydown'].forEach(e=>addEventListener(e,svegliaMusica));
document.addEventListener('visibilitychange',()=>{if(!MUSICA.ac)return;document.hidden?MUSICA.ac.suspend():MUSICA.ac.resume()});
// Volume generale: pieno mentre si gioca, più basso con un dialogo o una finestra aperta (per leggere in pace),
// zero se la musica è spenta, prima di «Entra nel museo» e a partita finita.
function volumeMusica(){if(!MUSICA.on||!S.started||S.done)return 0;return $('dialog').hidden&&$('modal').hidden?.5:.22}
// Ogni 50 ms programma i passi dei prossimi 0,2 s.
setInterval(()=>{
  const ac=MUSICA.ac;if(!ac||!MUSICA.bus||ac.state!=='running')return;
  const vol=volumeMusica();
  MUSICA.uscita.gain.setTargetAtTime(vol,ac.currentTime,.2);
  if(!vol){MUSICA.prossimo=ac.currentTime+.1;return}
  const passo=60/branoDi(MUSICA.brano).bpm/4;
  if(MUSICA.prossimo<ac.currentTime)MUSICA.prossimo=ac.currentTime+.05;
  while(MUSICA.prossimo<ac.currentTime+.2){programmaPasso(ac,MUSICA.bus,MUSICA.brano,MUSICA.passo,MUSICA.prossimo);MUSICA.passo=(MUSICA.passo+1)%64;MUSICA.prossimo+=passo}
},50);

/* ---------- Pulsante nella HUD ---------- */
(()=>{const b=document.createElement('button');b.id='btnMusica';b.type='button';b.textContent='♪';b.title='Musica';
  const mostra=()=>{b.setAttribute('aria-pressed',String(MUSICA.on));b.setAttribute('aria-label',MUSICA.on?'Musica accesa':'Musica spenta');b.classList.toggle('spento',!MUSICA.on)};
  b.onclick=()=>{MUSICA.on=!MUSICA.on;try{localStorage.setItem('fuoriOrario.musica',MUSICA.on?'1':'0')}catch(e){}mostra();svegliaMusica()};
  mostra();$('btnHint').before(b);
})();
