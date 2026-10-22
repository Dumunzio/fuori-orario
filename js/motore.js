/* Motore del gioco: stato, disegno isometrico, luce, movimento, input, dialoghi e finestre.
   Area: grafica-motore. Vedi CLAUDE.md prima di modificare. */
const cv=document.getElementById('cv'),ctx=cv.getContext('2d');
const VW=320,VH=210,HW=12,HH=6,MW=12,MH=10,WH=54,OX=148,OY=64;
const iso=(x,y)=>[OX+(x-y)*HW,OY+(x+y)*HH];
const DIRS=[[1,0],[-1,0],[0,1],[0,-1]];
const $=id=>document.getElementById(id);

/* ---------- Stato ---------- */
let S,P;
function fresh(){
  S={seals:{loom:false,chest:false,archive:false},journal:[],hint:{loom:0,chest:0,archive:0},elapsed:0,started:false,done:false,door:0};
  P={x:9,y:8,px:9,py:8,tx:9,ty:8,fx:0,fy:1,moving:false,walk:0,path:[],pending:null};
}
fresh();
const sealCount=()=>Object.values(S.seals).filter(Boolean).length;

/* ---------- Disegno: primitive ---------- */
const R=(g,x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),w,h)};
function diamond(g,cx,cy,a,b,c){g.fillStyle=c;for(let r=-b;r<=b;r++){const w=Math.round(a*(1-Math.abs(r)/b));if(w>0)g.fillRect(cx-w,cy+r,w*2,1)}}
function box(g,cx,cy,a,b,h,top,left,right){
  g.fillStyle=left;for(let i=0;i<a;i++)g.fillRect(cx-a+i,cy+Math.round(i*b/a)-h,1,h);
  g.fillStyle=right;for(let i=0;i<a;i++)g.fillRect(cx+i,cy+b-Math.round(i*b/a)-h,1,h);
  diamond(g,cx,cy-h,a,b,top);
}
// facce sinistra/destra di un box: callback per ogni colonna (x, y del bordo inferiore)
function faceL(cx,cy,a,b,fn){for(let i=0;i<a;i++)fn(cx-a+i,cy+Math.round(i*b/a),i)}
function faceR(cx,cy,a,b,fn){for(let i=0;i<a;i++)fn(cx+i,cy+b-Math.round(i*b/a),i)}
function spr(rows,pal,x,y){rows.forEach((row,j)=>{for(let i=0;i<row.length;i++){const c=pal[row[i]];if(c)R(ctx,x+i,y+j,1,1,c)}})}

/* ---------- Sfondo statico: pavimento e pareti ---------- */
const bg=document.createElement('canvas');bg.width=VW;bg.height=VH;
const zone=(x,y)=>x<6?(y<5?'lan':'arc'):(y<5?'war':'hall');
const ZP={lan:['#6e4a31','#674529','#4e3220'],war:['#565d59','#4d5350','#3a3f3d'],arc:['#463a5e','#40355a','#2f2744'],hall:['#7a6e5c','#6e6351','#544a3b']};
function wallCol(g,px,fy,lit){
  const top=fy-WH;
  g.fillStyle=lit?'#3b3058':'#2b2343';g.fillRect(px,top,1,WH);
  g.fillStyle=lit?'#2a1f3a':'#1f182e';g.fillRect(px,fy-14,1,14);
  g.fillStyle='#8a6a34';g.fillRect(px,fy-15,1,1);
  g.fillStyle=lit?'#54487e':'#3e3460';g.fillRect(px,top,1,3);
  g.fillStyle='#120e1c';g.fillRect(px,fy-2,1,2);
}
// pittura su parete: side 'R' (fila y=0) o 'L' (colonna x=0); fn(u,v,W,H) -> colore o null
function onWall(g,side,t,i0,i1,top,h,fn){
  const [cx,cy]=side==='R'?iso(t,0):iso(0,t);
  for(let i=i0;i<=i1;i++){
    const px=side==='R'?cx+i:cx-12+i, fy=side==='R'?cy+Math.floor(i/2):cy+6-Math.floor(i/2);
    for(let v=0;v<h;v++){const c=fn(i-i0,v,i1-i0,h);if(c){g.fillStyle=c;g.fillRect(px,fy-top+v,1,1)}}
  }
}
const framed=(inner,fr='#b8892f')=>(u,v,W,H)=>(u===0||u===W||v===0||v===H-1)?fr:inner(u,v,W,H);
function buildBg(){
  const g=bg.getContext('2d');g.clearRect(0,0,VW,VH);
  for(let x=0;x<MW;x++){const [cx,cy]=iso(x,0);for(let i=0;i<12;i++)wallCol(g,cx+i,cy+Math.floor(i/2),false)}
  for(let y=0;y<MH;y++){const [cx,cy]=iso(0,y);for(let i=0;i<12;i++)wallCol(g,cx-12+i,cy+6-Math.floor(i/2),true)}
  g.fillStyle='#0f0b18';g.fillRect(OX,OY-WH,1,WH);
  for(let s=0;s<MW+MH;s++)for(let x=0;x<MW;x++){const y=s-x;if(y<0||y>=MH)continue;
    const [cx,cy]=iso(x,y),p=ZP[zone(x,y)],base=(x+y)%2?p[0]:p[1];
    for(let r=0;r<12;r++){const w=r<6?2*r+2:2*(11-r)+2;g.fillStyle=base;g.fillRect(cx-w,cy+r,w*2,1);
      if(r<6){g.fillStyle=p[2];g.fillRect(cx-w,cy+r,1,1);g.fillRect(cx+w-1,cy+r,1,1)}}
    if(zone(x,y)==='arc'&&(x+y)%2===0){g.fillStyle='#5a4b78';g.fillRect(cx-1,cy+5,2,2)}
  }
  // parete destra: manifesto, ritratto, Pasubio, foto d'epoca, cartello uscita
  onWall(g,'R',2,2,10,42,22,framed((u,v)=>v%5<2?'#c2493c':'#efe2c4'));
  onWall(g,'R',4,3,9,40,18,framed((u,v,W,H)=>{const dx=u-W/2,dy=v-7;return dx*dx+dy*dy*.6<6?'#e6c9a3':(v>11&&Math.abs(dx)<3?'#2d3a5e':'#2a2030')}));
  onWall(g,'R',7,1,11,42,20,framed((u,v,W)=>{const m=Math.abs(u-W/2)*1.6+4;return v<m?'#5b6f8c':v<m+3?'#e9eef0':v<15?'#7d8a7a':'#556b45'}));
  onWall(g,'R',8,4,10,38,14,framed((u,v)=>(u*7+v*3)%5===0?'#8a7350':'#b39b72','#5a4630'));
  onWall(g,'R',10,4,8,44,5,(u,v,W,H)=>(u===0||u===W||v===0||v===H-1)?'#1c4a2c':'#4fd17e');
  // parete sinistra: stendardo, paesaggio, finestra, targa archivio
  onWall(g,'L',1,3,9,48,30,(u,v,W,H)=>v===H-1?(u%2?'#e0b04f':null):(u===3?'#8f3229':'#c2493c'));
  onWall(g,'L',3,2,10,42,18,framed((u,v,W)=>v<6?'#3d4d74':v<9+Math.round(Math.sin(u)*1.5)?'#4f6b3f':'#7a8a4a'));
  onWall(g,'L',6,2,10,44,22,framed((u,v,W,H)=>(u===Math.floor(W/2)||v===Math.floor(H/2))?'#4a3b2c':(u===2&&v===3?'#f4f0d8':'#24345a'),'#4a3b2c'));
  onWall(g,'L',8,3,9,36,7,framed((u,v)=>v===3&&u%2?'#3a2a1a':'#c9a65a','#6b5226'));
}

/* ---------- Oggetti ---------- */
function drawLoom(o,t){const [bx,by]=base(o);
  box(ctx,bx,by+1,10,5,5,'#7a5236','#5a3a26','#46301f');
  R(ctx,bx-9,by-30,2,28,'#5a3a26');R(ctx,bx+7,by-30,2,28,'#46301f');R(ctx,bx-9,by-31,18,3,'#8a603f');
  for(let k=0;k<7;k++)R(ctx,bx-6+k*2,by-27,1,15,k%2?'#efe2c4':'#c2493c');
  R(ctx,bx-7,by-12,14,5,'#c2493c');for(let k=0;k<7;k++)R(ctx,bx-6+k*2,by-11+(k%2)*2,1,1,'#efe2c4');
  if(!S.seals.loom){R(ctx,bx+4,by-40,8,10,'#efe2c4');[[1,2],[4,2],[2,5],[5,4],[3,7],[6,7]].forEach(([a,b])=>R(ctx,bx+4+a,by-40+b,1,1,'#3a2a1a'));R(ctx,bx+7,by-31,1,1,'#3a2a1a')}
  else sparkle(bx,by-36,t);
}
function drawLectern(o){const [bx,by]=base(o);
  diamond(ctx,bx,by+1,4,2,'rgba(0,0,0,.3)');R(ctx,bx-3,by-1,6,2,'#2b2416');R(ctx,bx-1,by-11,2,10,'#3d3320');
  R(ctx,bx-6,by-18,12,7,'#e0b04f');R(ctx,bx-5,by-17,10,5,'#b8892f');R(ctx,bx-4,by-16,8,1,'#f4dc9a');R(ctx,bx-4,by-14,6,1,'#f4dc9a');
}
function drawFactory(o){const [bx,by]=base(o);
  box(ctx,bx,by+1,10,5,6,'#8a8396','#6b6577','#575262');
  R(ctx,bx+3,by-40,3,20,'#7a3328');R(ctx,bx+2,by-41,5,2,'#5a2620');
  box(ctx,bx,by-5,8,4,18,'#8c3b2e','#b5523f','#93402f');
  faceL(bx,by-5,8,4,(x,y,i)=>{if(i%2)for(let k=0;k<4;k++)R(ctx,x,y-16+k*4,1,2,'#f2d27a')});
  faceR(bx,by-5,8,4,(x,y,i)=>{if(i%2)for(let k=0;k<4;k++)R(ctx,x,y-16+k*4,1,2,'#c9a85a')});
}
function drawDiorama(o){const [bx,by]=base(o);
  box(ctx,bx,by+1,11,5,9,'#6b4a33','#4f3625','#3e2a1c');
  diamond(ctx,bx,by-8,10,5,'#556b45');
  for(let r=0;r<20;r++){const w=Math.round(r*.5)+1,y=by-29+r;R(ctx,bx-w,y,w,1,r<4?'#e9eef0':'#8a978a');R(ctx,bx,y,w,1,r<4?'#cfd6da':'#66726a')}
  for(let r=5;r<20;r++){const x=bx+Math.round(Math.sin(r*.9)*r*.3);R(ctx,x,by-29+r,1,1,r%3?'#e3cf94':'#14110c')}
}
function drawChest(o,t){const [bx,by]=base(o);
  if(S.seals.chest){R(ctx,bx-6,by-17,12,7,'#5d6b3a');R(ctx,bx-5,by-16,10,5,'#4a5630')}
  box(ctx,bx,by+1,6,3,7,S.seals.chest?'#2a2a18':'#66753f','#4a5630','#3b4426');
  if(!S.seals.chest){R(ctx,bx-6,by-4,6,1,'#2f3720');R(ctx,bx-4,by-3,2,2,'#e0b04f');R(ctx,bx+2,by-3,1,3,'#efe2c4')}
  else sparkle(bx,by-10,t);
}
function drawCabinet(o,t){const [bx,by]=base(o);
  box(ctx,bx,by+1,8,4,28,'#6a4632','#4a2f22','#3a251b');
  faceR(bx,by+1,8,4,(x,y,i)=>{for(let k=1;k<5;k++){R(ctx,x,y-28+k*6,1,1,'#22150e');if(i===4)R(ctx,x,y-31+k*6,1,1,'#e0b04f')}});
  faceL(bx,by+1,8,4,(x,y)=>{for(let k=1;k<5;k++)R(ctx,x,y-28+k*6,1,1,'#2a1a12')});
  if(S.seals.archive){R(ctx,bx+2,by-14,7,4,'#7a5236');R(ctx,bx+3,by-15,5,1,'#efe2c4');sparkle(bx+5,by-20,t)}
}
const BOOKS=['#8f3229','#2d4a6b','#c9a65a','#3f5a3a','#6b3a5a','#efe2c4'];
function drawShelf(o){const [bx,by]=base(o);
  box(ctx,bx,by+1,10,5,28,'#4a3b2c','#3b2e22','#2e241a');
  faceR(bx,by+1,10,5,(x,y,i)=>{if(i<1||i>8)return;for(let k=0;k<3;k++){const hgt=4+((i*3+k*5)%3);R(ctx,x,y-26+k*8+(6-hgt),1,hgt,BOOKS[(i*7+k*3+o.x)%6])}});
}
function drawDesk(o,t){const [bx,by]=base(o);
  box(ctx,bx,by+1,10,5,8,'#5b3b2a','#4a2f22','#3a251b');
  R(ctx,bx-5,by-10,7,4,'#efe2c4');R(ctx,bx-4,by-9,5,1,'#8a7350');
  R(ctx,bx+4,by-16,1,7,'#3a3a3a');R(ctx,bx+2,by-18,5,3,'#2f6b4a');R(ctx,bx+3,by-15,3,1,'#fff1b8');
}
function drawVitrine(o){const [bx,by]=base(o);
  box(ctx,bx,by+1,8,4,10,'#3a2f4a','#2b2238','#211a2c');
  R(ctx,bx-3,by-17,7,4,'#6b6f4a');R(ctx,bx-4,by-14,9,1,'#55593a');R(ctx,bx-2,by-12,3,2,'#8a8f9a');
  box(ctx,bx,by-9,8,4,13,'rgba(170,210,230,.18)','rgba(170,210,230,.12)','rgba(170,210,230,.08)');
  R(ctx,bx-8,by-22,1,13,'rgba(220,240,255,.35)');
}
function drawBench(o){const [bx,by]=base(o);box(ctx,bx,by+1,10,5,5,'#7a5236','#5a3a26','#46301f')}
function drawPlant(o,t){const [bx,by]=base(o);
  box(ctx,bx,by+1,4,2,6,'#a0522d','#7d3f22','#62311a');
  [[-4,-14,4,5],[1,-16,4,6],[-2,-20,4,6],[-6,-10,4,3],[3,-11,4,3]].forEach(([x,y,w,h],k)=>R(ctx,bx+x,by+y,w,h,k%2?'#3f6b3a':'#5a8a46'));
}
const PERSON={
  front:['..hhhh..','.hhhhhh.','.hssssh.','.sesses.','..ssss..','.rrrrrr.','rrrrrrrr','rdrrrrdr','sdrrrrds','.rrrrrr.','.bbbbbb.','.bb..bb.','.bb..bb.','.kk..kk.'],
  back: ['..hhhh..','.hhhhhh.','.hhhhhh.','.hhhhhh.','..ssss..','.rrrrrr.','rrrrrrrr','rrrrrrrr','srrrrrrs','.rrrrrr.','.bbbbbb.','.bb..bb.','.bb..bb.','.kk..kk.'],
  walk: ['.bbbbbb.','..bb.bb.','..bb..bb','..kk..kk']
};
const PPAL={h:'#3b2618',s:'#e8b98f',e:'#1a1424',r:'#c2493c',d:'#8f3229',b:'#3b4f7a',k:'#1a1424'};
const KEEPER=['..cccc..','cccccccc','.assssa.','.sesses.','..ssss..','.uuuuuu.','uuuguuuu','uuuguuuu','suuguuus','.uuuuuu.','.uuuuuu.','.uu..uu.','.uu..uu.','.kk..kk.'];
const KPAL={c:'#22305a',a:'#bdb6a8',s:'#d9a77c',e:'#1a1424',u:'#2b3a6b',g:'#e0b04f',k:'#140f1c'};
function drawKeeper(o,t){const [bx,by]=base(o);
  diamond(ctx,bx,by+1,5,2,'rgba(0,0,0,.35)');spr(KEEPER,KPAL,bx-4,by-13-(Math.floor(t/700)%2));
  R(ctx,bx+4,by-6,2,3,'#fff1b8');
}
function drawPlayer(t){
  const [cx,cy]=iso(P.px,P.py),bx=cx,by=cy+6,step=P.moving?Math.floor(P.walk*9)%2:0;
  diamond(ctx,bx,by+1,5,2,'rgba(0,0,0,.35)');
  const rows=(P.fx<0||P.fy<0?PERSON.back:PERSON.front).slice();
  if(step)rows.splice(10,4,...PERSON.walk);
  spr(rows,PPAL,bx-4,by-13-step);
}
function sparkle(x,y,t){const b=Math.floor(t/250)%4;R(ctx,x-1,y-1-(b%2),3,3,'#e0b04f');R(ctx,x,y-(b%2),1,1,'#fff3c4');if(b===0){R(ctx,x-3,y,1,1,'#fff3c4');R(ctx,x+3,y-2,1,1,'#fff3c4')}}
const base=o=>{const [cx,cy]=iso(o.x,o.y);return [cx,cy+6]};

const solidAt=(x,y)=>OBJ.some(o=>o.x===x&&o.y===y);
const walkable=(x,y)=>x>=0&&y>=0&&x<MW&&y<MH&&!solidAt(x,y);

function drawDoor(t){
  const [cx,cy]=iso(10,0),open=S.door;
  for(let i=2;i<=11;i++){const px=cx+i,fy=cy+Math.floor(i/2);
    for(let v=0;v<32;v++){const y=fy-32+v,edge=i===2||i===11||v===0;
      let c=edge?'#e0b04f':'#3b2a1e';
      if(!edge){const reveal=(i-3)/8<open;c=reveal?(v>26?'#d9c38a':'#f7e7b0'):((v===10||v===22)?'#5a3e2a':(i===9&&v===16?'#e0b04f':'#3b2a1e'))}
      ctx.fillStyle=c;ctx.fillRect(px,y,1,1)}}
}

/* ---------- Luce ---------- */
const lc=document.createElement('canvas');lc.width=VW;lc.height=VH;const lx=lc.getContext('2d');
function hole(x,y,r,k=1){const g=lx.createRadialGradient(x,y,0,x,y,r);
  g.addColorStop(0,`rgba(0,0,0,${k})`);g.addColorStop(.45,`rgba(0,0,0,${k})`);g.addColorStop(.45,`rgba(0,0,0,${k*.6})`);
  g.addColorStop(.72,`rgba(0,0,0,${k*.6})`);g.addColorStop(.72,`rgba(0,0,0,${k*.28})`);g.addColorStop(1,'rgba(0,0,0,0)');
  lx.fillStyle=g;lx.fillRect(x-r,y-r,r*2,r*2)}
function drawLight(t){
  lx.globalCompositeOperation='source-over';lx.clearRect(0,0,VW,VH);lx.fillStyle='rgba(9,6,22,.64)';lx.fillRect(0,0,VW,VH);
  lx.globalCompositeOperation='destination-out';
  const [pcx,pcy]=iso(P.px,P.py);hole(pcx,pcy,62);
  OBJ.forEach(o=>{if(o.light){const [bx,by]=base(o);hole(bx,by-o.h/2,24,.8)}});
  const [kx,ky]=base(OBJ.find(o=>o.id==='keeper'));hole(kx+5,ky-4,22,.7);
  const [dx,dy]=iso(10,0);hole(dx+7,dy-14,18+S.door*30,.6+S.door*.4);
  const [wx,wy]=iso(0,6);hole(wx-6,wy-30,20,.5);
  ctx.drawImage(lc,0,0);
  ctx.globalCompositeOperation='lighter';
  OBJ.forEach(o=>{if(o.light){const [bx,by]=base(o);const g=ctx.createRadialGradient(bx,by-o.h/2,0,bx,by-o.h/2,22);g.addColorStop(0,'rgba(224,176,79,.16)');g.addColorStop(1,'rgba(224,176,79,0)');ctx.fillStyle=g;ctx.fillRect(bx-22,by-o.h/2-22,44,44)}});
  ctx.globalCompositeOperation='source-over';
}
const motes=Array.from({length:26},(_,i)=>({x:(i*53)%VW,y:(i*97)%VH,s:.004+((i*7)%5)*.0015,p:i}));
function drawMotes(t){motes.forEach(m=>{m.y-=m.s*16;if(m.y<0)m.y=VH;R(ctx,m.x+Math.sin(t/1400+m.p)*3,m.y,1,1,'rgba(240,230,207,.35)')})}

/* ---------- Loop ---------- */
let target=null,last=performance.now();
function frame(now){
  const dt=Math.min(.05,(now-last)/1000);last=now;
  update(dt);render(now);
  requestAnimationFrame(frame);
}
function render(t){
  ctx.fillStyle='#0b0814';ctx.fillRect(0,0,VW,VH);
  ctx.drawImage(bg,0,0);drawDoor(t);
  const list=OBJ.filter(o=>o.draw).map(o=>({d:o.x+o.y,f:()=>o.draw(o,t)}));
  list.push({d:P.px+P.py+.01,f:()=>drawPlayer(t)});
  list.sort((a,b)=>a.d-b.d).forEach(e=>e.f());
  drawMotes(t);drawLight(t);
  if(target&&!blocked()){let x,y;if(target.id==='door'){const [cx,cy]=iso(10,0);x=cx+7;y=cy-40}else{[x,y]=base(target);y-=target.h+5}
    y+=Math.floor(t/300)%2;R(ctx,x-2,y,5,1,'#e0b04f');R(ctx,x-1,y+1,3,1,'#e0b04f');R(ctx,x,y+2,1,1,'#e0b04f')}
}
const blocked=()=>!S.started||!$('dialog').hidden||!$('modal').hidden||S.done;
function update(dt){
  if(S.started&&!S.done){S.elapsed+=dt;const s=Math.floor(S.elapsed);$('time').textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')}
  if(S.door>0&&S.door<1)S.door=Math.min(1,S.door+dt*.8);
  if(P.moving){const dx=P.tx-P.px,dy=P.ty-P.py,d=Math.hypot(dx,dy),sp=5*dt;P.walk+=dt;
    if(d<=sp){P.px=P.tx;P.py=P.ty;P.moving=false}else{P.px+=dx/d*sp;P.py+=dy/d*sp}}
  if(!P.moving&&!blocked()){
    if(P.path.length){const [nx,ny]=P.path.shift();if(walkable(nx,ny))stepTo(nx,ny);else P.path=[]}
    else if(P.pending){const o=P.pending;P.pending=null;if(adj(o)){P.fx=Math.sign(o.x-P.x);P.fy=Math.sign(o.y-P.y);interact(o)}}
    else if(held){P.fx=held[0];P.fy=held[1];const nx=P.x+held[0],ny=P.y+held[1];if(walkable(nx,ny))stepTo(nx,ny)}
  }
  target=P.moving?null:nearest();
  const pr=$('prompt');
  if(target&&!blocked()){pr.innerHTML='<b>E</b> · '+target.name;pr.hidden=false}else pr.hidden=true;
}
function stepTo(nx,ny){P.fx=nx-P.x;P.fy=ny-P.y;P.x=P.tx=nx;P.y=P.ty=ny;P.moving=true}
const adj=o=>Math.abs(o.x-P.x)+Math.abs(o.y-P.y)===1;
function nearest(){const c=OBJ.filter(o=>o.act&&adj(o));if(!c.length)return null;return c.find(o=>o.x-P.x===P.fx&&o.y-P.y===P.fy)||c[0]}
function interact(o){if(o&&o.act)o.act()}

function bfs(goals){
  const k=(x,y)=>x+','+y,start=k(P.x,P.y),prev=new Map([[start,null]]),q=[[P.x,P.y]];
  while(q.length){const [x,y]=q.shift(),kk=k(x,y);
    if(goals.has(kk)){const path=[];let c=kk;while(c!==start){path.unshift(c.split(',').map(Number));c=prev.get(c)}return path}
    for(const [dx,dy] of DIRS){const nx=x+dx,ny=y+dy,nk=k(nx,ny);if(!prev.has(nk)&&walkable(nx,ny)){prev.set(nk,kk);q.push([nx,ny])}}}
  return null;
}

/* ---------- Input ---------- */
let held=null;
const KEYS={ArrowUp:[0,-1],w:[0,-1],W:[0,-1],ArrowDown:[0,1],s:[0,1],S:[0,1],ArrowLeft:[-1,0],a:[-1,0],A:[-1,0],ArrowRight:[1,0],d:[1,0],D:[1,0]};
addEventListener('keydown',e=>{
  if(!$('modal').hidden){if(e.key==='Escape')closeModal();else if(modalKey)modalKey(e);return}
  if(!$('dialog').hidden&&['e','E',' ','Enter'].includes(e.key)){e.preventDefault();advance();return}
  if(KEYS[e.key]){e.preventDefault();held=KEYS[e.key];P.path=[];P.pending=null;return}
  if(['e','E',' ','Enter'].includes(e.key)&&!blocked()){e.preventDefault();interact(nearest())}
});
addEventListener('keyup',e=>{if(KEYS[e.key]&&held===KEYS[e.key])held=null});
function toCanvas(e){const r=cv.getBoundingClientRect();return [(e.clientX-r.left)/r.width*VW,(e.clientY-r.top)/r.height*VH]}
function hitObj(mx,my){
  return OBJ.filter(o=>o.act).sort((a,b)=>(b.x+b.y)-(a.x+a.y)).find(o=>{
    const [x,y,w,h]=o.hit?o.hit():(()=>{const [bx,by]=base(o);return [bx-11,by-o.h,22,o.h+5]})();
    return mx>=x&&mx<x+w&&my>=y&&my<y+h});
}
cv.addEventListener('click',e=>{
  if(blocked())return;const [mx,my]=toCanvas(e),o=hitObj(mx,my);
  if(o){const goals=new Set(DIRS.map(([dx,dy])=>[o.x+dx,o.y+dy]).filter(([x,y])=>walkable(x,y)||(x===P.x&&y===P.y)).map(([x,y])=>x+','+y));
    const path=bfs(goals);if(path){P.path=path;P.pending=o}return}
  const dx=(mx-OX)/HW,dy=(my-OY)/HH,gx=Math.floor((dy+dx)/2),gy=Math.floor((dy-dx)/2);
  if(walkable(gx,gy)){const path=bfs(new Set([gx+','+gy]));if(path){P.path=path;P.pending=null}}
});
cv.addEventListener('mousemove',e=>{const [mx,my]=toCanvas(e);cv.style.cursor=hitObj(mx,my)?'pointer':'default'});
document.querySelectorAll('.dpad button').forEach(b=>{
  const d=b.dataset.d.split(',').map(Number);
  b.addEventListener('pointerdown',e=>{e.preventDefault();held=d;P.path=[];P.pending=null});
  ['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,()=>{if(held===d)held=null}));
});
$('btnAct').addEventListener('click',()=>{if(!$('dialog').hidden)advance();else if(!blocked())interact(nearest())});

/* ---------- Dialoghi ---------- */
let dq=[],dcb=null,typing=null,full='';
function say(who,lines,cb){$('dWho').textContent=who;dq=lines.slice();dcb=cb||null;$('dialog').hidden=false;held=null;nextLine()}
function nextLine(){
  full=dq.shift();const el=$('dText');let i=0;clearInterval(typing);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.textContent=full;typing=null;return}
  el.textContent='';typing=setInterval(()=>{el.textContent=full.slice(0,++i);if(i>=full.length){clearInterval(typing);typing=null}},16);
}
function advance(){
  if(typing){clearInterval(typing);typing=null;$('dText').textContent=full;return}
  if(dq.length)nextLine();else{$('dialog').hidden=true;const cb=dcb;dcb=null;cb&&cb()}
}
$('dialog').addEventListener('click',advance);

function toast(msg){const t=$('toast');t.textContent=msg;t.hidden=false;clearTimeout(toast.h);toast.h=setTimeout(()=>t.hidden=true,2400)}

let modalKey=null;
function openModal(html){$('card').innerHTML=html;$('modal').hidden=false;held=null;modalKey=null;const f=$('card').querySelector('button');f&&f.focus()}
function closeModal(){$('modal').hidden=true;modalKey=null;cv.focus?.()}
$('modal').addEventListener('click',e=>{if(e.target.id==='modal')closeModal()});
const closeBtn='<button type="button" data-close>Chiudi</button>';
$('card').addEventListener('click',e=>{if(e.target.closest('[data-close]'))closeModal()});
function bad(el,msg){const m=$('msg');m.textContent=msg;m.className='msg bad';el.classList.remove('shake');void el.offsetWidth;el.classList.add('shake')}
function hud(){document.querySelectorAll('#seals i').forEach((el,i)=>el.classList.toggle('on',i<sealCount()))}

function fit(){
  const st=$('stage'),w=st.clientWidth,h=st.clientHeight;let s=Math.min(w/VW,h/VH);
  if(s>=2)s=Math.floor(s);cv.style.width=VW*s+'px';cv.style.height=VH*s+'px';
}
addEventListener('resize',fit);
