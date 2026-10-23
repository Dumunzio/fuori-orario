/* L'immagine da condividere a fine partita: tempo, i 12 sigilli (le foto vere dei luoghi delle sale) e il titolo,
   su una tela 1080×1350 (formato verticale dei social). Si scarica o si condivide con il menu del telefono.
   Le foto vengono da Wikimedia Commons (tessereImmagini/caricaTessereImmagini, js/sale/registro.js), come miniature
   scritte nel codice (MINIATURE, js/sale/miniature.js): così ci sono anche aperto da file locale, dove il browser
   non lascia esportare una tela con foto lette dal disco. Se una miniatura manca e la tela non si esporta,
   l'immagine si rifà senza foto, con il colore e il nome di ogni sala. La chiama win() in enigmi.js. Area: sale. */
{
const LARGO=1080,ALTO=1350,COL=4,CASELLA=184,PASSO=196;
const fontTela=(px,peso='')=>`${peso} ${px}px ${getComputedStyle(document.body).getPropertyValue('--display').trim()||'serif'}`;

// Una casella: la foto della sala (ritagliata per riempire), oppure il colore della sala; sotto il nome.
function casellaSala(g,x,y,t,conFoto){
  g.fillStyle='#120e1c';g.fillRect(x,y,CASELLA,CASELLA);
  if(conFoto&&t.img){const s=Math.max(CASELLA/t.img.naturalWidth,CASELLA/t.img.naturalHeight),w=t.img.naturalWidth*s,h=t.img.naturalHeight*s;
    g.save();g.beginPath();g.rect(x,y,CASELLA,CASELLA);g.clip();g.drawImage(t.img,x+(CASELLA-w)/2,y+(CASELLA-h)/2,w,h);g.restore()}
  else{g.fillStyle=t.colore;g.globalAlpha=.55;g.fillRect(x,y,CASELLA,CASELLA);g.globalAlpha=1}
  const grad=g.createLinearGradient(0,y+CASELLA-70,0,y+CASELLA);grad.addColorStop(0,'rgba(10,8,18,0)');grad.addColorStop(1,'rgba(10,8,18,.92)');
  g.fillStyle=grad;g.fillRect(x,y+CASELLA-70,CASELLA,70);
  g.strokeStyle=t.colore;g.lineWidth=6;g.strokeRect(x+3,y+3,CASELLA-6,CASELLA-6);
  g.fillStyle='#f0e6cf';g.font=fontTela(19);g.textAlign='left';
  // il titolo si traduce intero (tr, js/lingua.js) prima di andare a capo: le righe a metà il dizionario non le conosce
  const parole=(typeof tr==='function'?tr(t.titolo):t.titolo).split(' ');let riga='';const righe=[];
  parole.forEach(p=>{const prova=riga?riga+' '+p:p;if(g.measureText(prova).width>CASELLA-20&&riga){righe.push(riga);riga=p}else riga=prova});righe.push(riga);
  righe.slice(-2).forEach((l,i,a)=>g.fillText(l,x+10,y+CASELLA-12-(a.length-1-i)*22));
}
// Un sigillo del museo: rombo d'ottone su fondo scuro, con il suo nome.
function casellaMuseo(g,x,y,titolo){
  g.fillStyle='#1f1830';g.fillRect(x,y,CASELLA,CASELLA);g.strokeStyle='#b8892f';g.lineWidth=6;g.strokeRect(x+3,y+3,CASELLA-6,CASELLA-6);
  const cx=x+CASELLA/2,cy=y+72;g.fillStyle='#e0b04f';g.beginPath();g.moveTo(cx,cy-46);g.lineTo(cx+46,cy);g.lineTo(cx,cy+46);g.lineTo(cx-46,cy);g.closePath();g.fill();
  g.fillStyle='#8a6a34';g.beginPath();g.moveTo(cx,cy-24);g.lineTo(cx+24,cy);g.lineTo(cx,cy+24);g.lineTo(cx-24,cy);g.closePath();g.fill();
  g.fillStyle='#f0e6cf';g.font=fontTela(19);g.textAlign='center';
  const parole=(typeof tr==='function'?tr(titolo):titolo).split(' ');let riga='';const righe=[];
  parole.forEach(p=>{const prova=riga?riga+' '+p:p;if(g.measureText(prova).width>CASELLA-20&&riga){righe.push(riga);riga=p}else riga=prova});righe.push(riga);
  righe.slice(0,2).forEach((l,i)=>g.fillText(l,cx,y+148+i*22));
}
function disegna(sale,conFoto,museo=Object.keys(SEALS).map(k=>({museo:SEALS[k].title}))){
  const c=document.createElement('canvas');c.width=LARGO;c.height=ALTO;const g=c.getContext('2d');
  g.fillStyle='#15111f';g.fillRect(0,0,LARGO,ALTO);
  // cornice d'ottone e puntini di polvere, come nel gioco
  g.strokeStyle='#b8892f';g.lineWidth=10;g.strokeRect(24,24,LARGO-48,ALTO-48);
  for(let k=0;k<70;k++){g.fillStyle='rgba(240,230,207,.18)';g.fillRect((k*397)%LARGO,(k*733)%ALTO,4,4)}
  g.textAlign='center';g.fillStyle='#a99cc4';g.font=fontTela(30);g.fillText('UN\'ESCAPE ROOM NEL MUSEO DEL TERRITORIO',LARGO/2,118);
  g.font=fontTela(128,'bold');g.fillStyle='#000';g.fillText('FUORI ORARIO',LARGO/2+10,268);g.fillStyle='#c2493c';g.fillText('FUORI ORARIO',LARGO/2+5,263);g.fillStyle='#e0b04f';g.fillText('FUORI ORARIO',LARGO/2,258);
  g.fillStyle='#f0e6cf';g.font=fontTela(44);g.fillText('Fuga dal museo dopo la chiusura',LARGO/2,344);
  g.font=fontTela(92,'bold');g.fillStyle='#e0b04f';g.fillText(fmt(S.elapsed),LARGO/2,452);
  // chi ha trovato tutte le statuine dello zaino (js/sale/zaino.js) lo vede scritto anche qui
  const statuine=typeof statuineTrovate==='function'&&statuineTrovate();
  g.font=fontTela(36);g.fillStyle='#a99cc4';g.fillText(statuine&&statuine.n===statuine.tot
    ?`Tutti i ${NTOT()} sigilli e tutte le ${statuine.tot} statuine`:`Tutti i ${NTOT()} sigilli della storia dell'Alto Vicentino`,LARGO/2,506);
  // i 12 sigilli: prima quello della villa, poi le 11 sale, in 3 righe da 4
  const x0=(LARGO-(COL-1)*PASSO-CASELLA)/2,y0=560;
  // la villa con la sua foto come le sale; senza foto resta il rombo d'ottone
  const tutte=[...museo,...sale];
  tutte.forEach((t,i)=>{const x=x0+(i%COL)*PASSO,y=y0+Math.floor(i/COL)*PASSO;t.museo&&!(conFoto&&t.img)?casellaMuseo(g,x,y,t.museo):casellaSala(g,x,y,t,conFoto)});
  g.textAlign='center';g.fillStyle='#f0e6cf';g.font=fontTela(42);g.fillText('Ci provi anche tu?',LARGO/2,1210);
  g.fillStyle='#a99cc4';g.font=fontTela(24);
  g.fillText(conFoto?'Foto da Wikimedia Commons: autori e licenze nel gioco':'Storia vera, fonti aperte: Wikidata, Wikipedia, Wikimedia Commons',LARGO/2,1262);
  return c;
}
// Crea l'immagine (con le foto se il browser la lascia esportare) e la mostra con «Scarica» e «Condividi».
async function apriImmagineFinale(){
  const box=$('slImmagine');if(!box)return;box.innerHTML='<p class="eyebrow">Preparo l\'immagine…</p>';
  const sale=typeof caricaTessereImmagini==='function'?await caricaTessereImmagini():[];
  // i sigilli del museo con la loro foto (la villa: fotoSigilloMuseo, js/sale/registro.js)
  const museo=await Promise.all(Object.keys(SEALS).map(k=>new Promise(fatto=>{
    const t={museo:SEALS[k].title,titolo:SEALS[k].title,colore:'#b8892f'},f=typeof fotoSigilloMuseo==='function'&&fotoSigilloMuseo(k);
    if(!f)return fatto(t);const img=new Image();img.onload=()=>fatto({...t,img});img.onerror=()=>fatto(t);img.src=typeof MINIATURE!=='undefined'&&MINIATURE[k]||f.file})));
  let url,conFoto=true;
  try{url=disegna(sale,true,museo).toDataURL('image/png')}catch(e){conFoto=false;url=disegna(sale,false,museo).toDataURL('image/png')}
  box.innerHTML=`<img src="${url}" alt="Immagine della partita: tempo e ${NTOT()} sigilli" style="width:100%;max-width:360px;display:block;margin:8px auto;border:2px solid var(--line)">
    <div class="row"><a class="primary" id="slScarica" href="${url}" download="fuori-orario.png" style="text-decoration:none;padding:6px 12px;border:2px solid var(--line);background:var(--brass);color:#1a1424;font-family:var(--display);text-transform:uppercase;letter-spacing:.06em">Scarica l'immagine</a>
    <button type="button" id="slCondividi" hidden>Condividi</button></div>
    ${conFoto?'':'<p class="eyebrow">Aperto da file locale il browser non lascia mettere le foto nell\'immagine: online ci sono.</p>'}`;
  // condividere un file si può solo dove il browser lo permette (soprattutto sul telefono)
  try{const blob=await (await fetch(url)).blob(),file=new File([blob],'fuori-orario.png',{type:'image/png'});
    if(navigator.canShare&&navigator.canShare({files:[file]})){const b=$('slCondividi');b.hidden=false;
      b.onclick=()=>navigator.share({files:[file],title:'Fuori Orario',text:typeof tr==='function'?tr('Ci provi anche tu?'):'Ci provi anche tu?'}).catch(()=>{})}}catch(e){}
}
window.apriImmagineFinale=apriImmagineFinale;

// Dopo la finestra finale si torna alla pagina iniziale, con la partita cancellata: prima la partita finita restava ferma lì.
// Si torna quando la finestra si chiude («Chiudi», Esc o un clic fuori), così prima si può scaricare o condividere l'immagine
// con calma. «Gioca ancora» invece riparte subito dall'ingresso, come prima. La chiama win() in enigmi.js.
function fineVersoTitolo(){
  const ancora=$('again');if(!ancora)return;
  const b=document.createElement('button');b.type='button';b.id='slChiudiFine';b.textContent='Chiudi';b.onclick=closeModal;
  ancora.before(b);
  const guarda=new MutationObserver(()=>{if(!$('modal').hidden)return;guarda.disconnect();
    // con «Gioca ancora» fresh() ha già fatto ripartire la partita: S.done è falso e si resta nel gioco
    if(S.done){if(typeof cancellaSalvataggio==='function')cancellaSalvataggio();location.reload()}});
  guarda.observe($('modal'),{attributes:true,attributeFilter:['hidden']});
}
window.fineVersoTitolo=fineVersoTitolo;
}
