/* Telefono: promemoria dei comandi touch al primo ingresso. Prova locale, ramo prova-mobile. */
{
  const touch=matchMedia('(pointer:coarse)');
  // compare quando il custode ha finito di parlare, la prima volta; sparisce al primo passo o dopo 9 secondi
  let fatto=false;
  const mostra=()=>{
    if(fatto||!touch.matches||!S.started||!$('dialog').hidden||!$('modal').hidden)return;fatto=true;
    const c=document.createElement('div');c.id='consiglio';c.setAttribute('role','status');
    c.innerHTML='<b>Tocca il pavimento</b> per camminare, <b>tocca un oggetto</b> per esaminarlo. Le frecce e il tasto E funzionano anche loro.';
    $('stage').appendChild(c);
    const dove=[$('cv'),$('pad')];
    const via=()=>{c.remove();clearTimeout(t);dove.forEach(el=>el.removeEventListener('pointerdown',via))};
    const t=setTimeout(via,9000);dove.forEach(el=>el.addEventListener('pointerdown',via));
  };
  new MutationObserver(mostra).observe($('dialog'),{attributes:true,attributeFilter:['hidden']});

  // Telefono in orizzontale: lo schermo è molto più largo della stanza. Per ingrandirla l'inquadratura
  // taglia fino al 30% in altezza e segue il personaggio in su e in giù (VISTA è il riquadro che si vede, motore.js).
  const orizz=matchMedia('(orientation:landscape) and (max-height:520px) and (pointer:coarse)');
  let intera=null;
  const inquadraMotore=inquadra;
  inquadra=function(){
    inquadraMotore();intera={...VISTA};
    if(!orizz.matches)return;
    const st=$('stage'),A=st.clientWidth/st.clientHeight;
    if(!(A>0)||VISTA.w/VISTA.h>=A)return;
    VISTA.h=Math.round(Math.max(VISTA.w/A,intera.h*.7));segui(true);fit();
  };
  const segui=subito=>{
    if(!intera||VISTA.h>=intera.h)return;
    const y=iso(P.px,P.py)[1]-VISTA.h*($('dialog').hidden?.55:.4),min=intera.y,max=intera.y+intera.h-VISTA.h;
    const meta=Math.max(min,Math.min(max,y));
    VISTA.y=Math.round(subito||matchMedia('(prefers-reduced-motion: reduce)').matches?meta:VISTA.y+(meta-VISTA.y)*.12);
  };
  const renderMotore=render;
  render=function(t){segui(false);renderMotore(t)};
  addEventListener('resize',()=>{if(S.room&&STANZE[S.room])inquadra()});
  // la prima stanza è già inquadrata da motore.js, prima che questo file esistesse
  if(S.room&&STANZE[S.room])inquadra();

  /* ---------- Tasti del telefono in pixel art ---------- */
  // Icone disegnate pixel per pixel: una riga di testo per riga di pixel, una lettera per colore (palette del museo).
  const COL={a:'#efe2c4',b:'#e0b04f',d:'#a8792c',r:'#c2493c',c:'#7fc4dc',k:'#15111f',s:'#c9b88f'};
  const icona=righe=>{let r='';righe.forEach((l,y)=>[...l].forEach((ch,x)=>{if(COL[ch])r+=`<rect x="${x}" y="${y}" width="1" height="1" fill="${COL[ch]}"/>`}));
    return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${righe[0].length} ${righe.length}" shape-rendering="crispEdges">${r}</svg>`)}")`};
  const IC={
    // freccia già in diagonale (verso l'alto a destra): sullo schermo i pixel restano dritti
    freccia:icona(['..aaaaaa','...aaaaa','....aaaa','...aaaaa','..aaa.aa','.aaa...a','aaa.....','aa......']),
    frecciaScura:icona(['..kkkkkk','...kkkkk','....kkkk','...kkkkk','..kkk.kk','.kkk...k','kkk.....','kk......']),
    sigillo:icona(['....bb....','...bbbb...','..bbaabb..','.bbabbabb.','bbabbbbabb','bbabbbbabb','.bbabbabb.','..bbaabb..','...bbbb...','....bb....']),
    diario:icona(['.rrrrrrr..','.rbbbbbra.','.rrrrrrra.','.rrbbbrra.','.rrrrrrra.','.rrrrrrra.','.rrrrrrra.','.rrrrrrra.','.aaaaaaaa.','..........']),
    mappa:icona(['aaassssaaa','aaassssaaa','caassssaaa','ccassrsaaa','aaccrrrraa','aaascrsaaa','aaassccaaa','aaasssacca','aaassssaac','aaassssaaa']),
    ingranaggio:icona(['....aa....','.a.aaaa.a.','..aaaaaa..','.aaa..aaa.','aaa....aaa','aaa....aaa','.aaa..aaa.','..aaaaaa..','.a.aaaa.a.','....aa....']),
    schermo:icona(['aaa....aaa','a........a','a........a','..........','..........','..........','..........','a........a','a........a','aaa....aaa']),
    aiuto:icona(['..bbbbbb..','.bb....bb.','.bb....bb.','......bb..','.....bb...','....bb....','....bb....','..........','....bb....','....bb....'])
  };
  // angoli a scalino di 3 pixel, come un bottone disegnato a mano
  const scalino='polygon(0 3px,3px 3px,3px 0,calc(100% - 3px) 0,calc(100% - 3px) 3px,100% 3px,100% calc(100% - 3px),calc(100% - 3px) calc(100% - 3px),calc(100% - 3px) 100%,3px 100%,3px calc(100% - 3px),0 calc(100% - 3px))';
  const st=document.createElement('style');st.textContent=`
@media (pointer:coarse){
  /* tenendo premuto un tasto il telefono non deve selezionare il testo né aprire il menu: si sceglie solo nei campi da scrivere */
  body{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}
  input,textarea,[contenteditable]{-webkit-user-select:text;user-select:text;-webkit-touch-callout:default}
  #pad,#pad *,#cv{touch-action:none}
  button{touch-action:manipulation}
  /* croce direzionale: un pezzo solo, girata come la stanza; ogni freccia punta dove cammini */
  #pad .dpad{gap:0;filter:drop-shadow(3px 3px 0 #000)}
  #pad .dpad button{opacity:1;padding:0;border:0;box-shadow:inset 0 0 0 2px #15111f,inset -3px -3px 0 #1a1429,inset 3px 3px 0 #4b3f6e;background:#2b2244;clip-path:none}
  #pad .dpad>span:nth-child(5){background:#2b2244;box-shadow:inset 0 0 0 2px #15111f;display:grid;place-items:center}
  #pad .dpad>span:nth-child(5)::after{content:"";width:28%;height:28%;background:#e0b04f;box-shadow:0 0 0 2px #15111f}
  /* la croce è girata di 45°: la freccia si gira indietro di 45° e poi verso la sua direzione, a passi di 90° */
  #pad .dpad button span{display:block;width:46%;height:46%;margin:auto;font-size:0;background:${IC.freccia} center/contain no-repeat;image-rendering:pixelated}
  #pad .dpad button[data-d="0,-1"] span{transform:rotate(-45deg)}
  #pad .dpad button[data-d="1,0"] span{transform:rotate(-45deg) rotate(90deg)}
  #pad .dpad button[data-d="0,1"] span{transform:rotate(-45deg) rotate(180deg)}
  #pad .dpad button[data-d="-1,0"] span{transform:rotate(-45deg) rotate(270deg)}
  #pad .dpad button.premuto,#pad .dpad button:active{background:#e0b04f;box-shadow:inset 0 0 0 2px #15111f,inset 3px 3px 0 #a8792c;transform:none}
  #pad .dpad button.premuto span,#pad .dpad button:active span{background-image:${IC.frecciaScura}}
  /* tasto E: ottone quando c'è qualcosa da esaminare vicino, spento quando non c'è niente */
  #btnAct{border:0;border-radius:0;clip-path:${scalino};padding:0 0 6px;display:grid;place-items:center;font-family:var(--display);font-size:24px;font-weight:700;line-height:1;
    background:#2b2244;color:#a99cc4;box-shadow:inset 0 0 0 2px #15111f,inset 0 -5px 0 #1a1429,inset 0 4px 0 #4b3f6e}
  #btnAct::after{content:"ESAMINA";font-size:8px;letter-spacing:.08em;font-weight:400;margin-top:-10px}
  #btnAct.vicino{background:#e0b04f;color:#15111f;box-shadow:inset 0 0 0 2px #15111f,inset 0 -5px 0 #a8792c,inset 0 4px 0 #f6d98e}
  #btnAct.premuto,#btnAct:active{transform:translateY(2px);box-shadow:inset 0 0 0 2px #15111f,inset 0 4px 0 #a8792c}
}
@media (pointer:coarse) and (orientation:portrait){#btnAct{width:64px;height:64px}}
@media (orientation:landscape) and (max-height:520px) and (pointer:coarse){
  /* colonna dei pulsanti: piastrelle con icona pixel e nome piccolo, due per riga */
  .hud{display:grid;grid-template-columns:1fr 1fr;align-content:start;gap:5px;width:78px}
  .hud .time,#btnTessere{grid-column:1/-1}
  .hud .time{font-size:15px;color:#e0b04f;padding:2px 0}
  .hud button{position:relative;height:38px;padding:21px 1px 2px;font-size:8.5px;letter-spacing:.04em;line-height:1;border:0;clip-path:${scalino};
    background:#2b2244;color:#efe2c4;box-shadow:inset 0 0 0 2px #15111f,inset 0 -3px 0 #1a1429,inset 0 3px 0 #4b3f6e}
  .hud button::before{content:"";position:absolute;left:50%;top:5px;width:16px;height:16px;transform:translateX(-50%);background:center/contain no-repeat;image-rendering:pixelated}
  .hud button:active{transform:translateY(2px);box-shadow:inset 0 0 0 2px #15111f,inset 0 3px 0 #1a1429}
  #btnTessere{height:40px;padding-top:24px;font-size:10px;color:#e0b04f}
  #btnTessere::before{background-image:${IC.sigillo};width:18px;height:18px}
  #btnJournal::before{background-image:${IC.diario}}
  #btnMappa::before{background-image:${IC.mappa}}
  #btnHint::before{background-image:${IC.aiuto}}
  /* solo icona: impostazioni e schermo intero; EN resta scritto, più grande */
  #btnImpostazioni,#btnSchermo{font-size:0;padding:0}
  #btnImpostazioni::before{background-image:${IC.ingranaggio};top:50%;transform:translate(-50%,-50%);width:18px;height:18px}
  #btnSchermo::before{background-image:${IC.schermo};top:50%;transform:translate(-50%,-50%);width:18px;height:18px}
  .hud .btnLingua{padding:0;font-size:14px;color:#e0b04f}
  .hud .btnLingua::before{display:none}
}`;
  document.head.appendChild(st);
  // niente menu «copia / cerca» tenendo premuto sui tasti, sulla stanza e sulla barra (fuori dai campi da scrivere)
  document.addEventListener('contextmenu',e=>{if(touch.matches&&!e.target.closest('input,textarea,[contenteditable]'))e.preventDefault()});
  document.addEventListener('selectstart',e=>{if(touch.matches&&!e.target.closest?.('input,textarea,[contenteditable]'))e.preventDefault()});
  // premuto: su alcuni telefoni :active non scatta sui tasti tenuti giù
  document.querySelectorAll('#pad button').forEach(b=>{
    b.addEventListener('pointerdown',()=>b.classList.add('premuto'));
    ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,()=>b.classList.remove('premuto')));
  });
  // E si accende quando il gioco mostra «E · nome dell'oggetto» (#prompt, motore.js)
  const accendi=()=>$('btnAct').classList.toggle('vicino',!$('prompt').hidden);
  new MutationObserver(accendi).observe($('prompt'),{attributes:true,attributeFilter:['hidden']});accendi();
}
