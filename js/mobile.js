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
}
