/* Avvio del gioco. Va caricato per ultimo.
   Area: grafica-motore. Vedi CLAUDE.md prima di modificare. */
$('btnStart').onclick=()=>{$('title').hidden=true;S.started=true;fit();intro()};
function start(data){
  if(data&&data.S){S=data.S;Object.assign(P,data.P);P.px=P.tx=P.x;P.py=P.ty=P.y;if(S.started)$('title').hidden=true}
  buildBg();hud();fit();requestAnimationFrame(frame);
}
window.claude?.hot?.snapshot?.(()=>({S,P:{x:P.x,y:P.y}}));
window.claude?.hot?.ready?window.claude.hot.ready(start):start(window.claude?.hot?.data??{});
