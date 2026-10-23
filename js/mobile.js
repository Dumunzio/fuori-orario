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
}
