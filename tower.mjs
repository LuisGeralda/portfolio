// A small Anatomy-style figure: a physical lattice tower, not a system diagram.
// Parts: plinth, anchored lattice, three sector panels on paired brackets,
// equipment cabinet, and a small planted landscape. No engineering scale implied.
// The only motion is three expanding wavefronts, illustrating broadcast emission.
// Dimensions are drawing units, not engineering dimensions or an RF simulation.
const project = ([x,y,z]) => [180+(x-y)*0.86, 306+(x+y)*0.43-z];
const parts=[];
const sub=(a,b)=>a.map((v,i)=>v-b[i]);
const add=(a,b)=>a.map((v,i)=>v+b[i]);
const mul=(a,n)=>a.map(v=>v*n);
const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const unit=a=>mul(a,1/Math.hypot(...a));
function solid(vertices,lit=false){
  const faces=[[0,1,2,3],[0,4,5,1],[1,5,6,2],[2,6,7,3],[3,7,4,0],[4,7,6,5]];
  for(const face of faces){
    const points=face.map(i=>vertices[i]);
    const normal=cross(sub(points[1],points[0]),sub(points[2],points[0]));
    if(normal[0]+normal[1]+normal[2]*0.5<=0) continue;
    const center=mul(points.reduce((a,b)=>add(a,b),[0,0,0]),0.25);
    const tone=normal[2]>0?'top':normal[0]>normal[1]?'side':'shade';
    parts.push({depth:center[0]+center[1]+center[2]*0.5,svg:`<polygon class="tower-${tone}${lit?' tower-accent':''}" points="${points.map(p=>project(p).map(n=>n.toFixed(2)).join(',')).join(' ')}"/>`});
  }
}
function beam(a,b,width=2,lit=false){
  const axis=unit(sub(b,a));
  const u=mul(unit(cross(axis,Math.abs(axis[2])>.9?[1,0,0]:[0,0,1])),width/2);
  const v=mul(unit(cross(axis,u)),width/2);
  const corners=p=>[add(add(p,u),v),add(sub(p,u),v),sub(sub(p,u),v),add(sub(p,v),u)];
  solid([...corners(a),...corners(b)],lit);
}
function box(x,y,z,w,d,h,lit=false){
  solid([[x,y,z],[x+w,y,z],[x+w,y+d,z],[x,y+d,z],[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]],lit);
}
function sectorPanel(angle,radius,z){
  const radial=[Math.cos(angle),Math.sin(angle),0];
  const tangent=[-Math.sin(angle),Math.cos(angle),0];
  const center=mul(radial,radius);
  const point=(u,v,h)=>add(add(add(center,mul(tangent,u)),mul(radial,v)),[0,0,z+h]);
  solid([point(-5,-1.5,0),point(5,-1.5,0),point(5,1.5,0),point(-5,1.5,0),point(-5,-1.5,32),point(5,-1.5,32),point(5,1.5,32),point(-5,1.5,32)],true);
}
function tree(x,y,height){
  box(x-1.5,y-1.5,-8,3,3,20);
  for(const [z,r] of [[9,height*.24],[height*.4,height*.2],[height*.67,height*.14]]){
    const points=[[x-r,y-r,z],[x+r,y-r,z],[x+r,y+r,z],[x-r,y+r,z],[x,y,z+height*.4]];
    for(const [face,tone] of [[[0,1,4],'top'],[[1,2,4],'side'],[[2,3,4],'shade'],[[3,0,4],'side']]){
      const vertices=face.map(i=>points[i]);
      const center=mul(vertices.reduce((a,b)=>add(a,b),[0,0,0]),1/3);
      parts.push({depth:center[0]+center[1]+center[2]*.5,svg:`<polygon class="tower-${tone}" points="${vertices.map(p=>project(p).map(n=>n.toFixed(2)).join(',')).join(' ')}"/>`});
    }
  }
}
tree(-62,4,42);
tree(-36,54,30);
tree(60,-38,35);
box(-53,-48,-8,106,96,8);
const legAt=(i,z)=>{
  const angle=i*Math.PI*2/3-Math.PI/2;
  const radius=32-(z/230)*22;
  return [Math.cos(angle)*radius,Math.sin(angle)*radius,z];
};
for(let i=0;i<3;i++){
  const [x,y]=legAt(i,0);
  box(x-7,y-7,0,14,14,3);
  for(const dx of [-5,4]) for(const dy of [-5,4]) box(x+dx,y+dy,3,2,2,2);
  beam(legAt(i,3),legAt(i,230),4);
  for(let level=0;level<4;level++){
    const lo=8+level*54,hi=lo+54;
    beam(legAt(i,lo),legAt((i+1)%3,lo),2.5);
    beam(legAt(i,lo),legAt((i+1)%3,hi),2);
  }
  const angle=i*Math.PI*2/3-Math.PI/2;
  const mount=legAt(i,230);
  // Equal panel heights, radial stand-offs, and tangential panel faces.
  for(const z of [226,246]) beam([mount[0],mount[1],z],[Math.cos(angle)*25.5,Math.sin(angle)*25.5,z],2);
  beam([mount[0],mount[1],226],[mount[0],mount[1],249],2);
  beam(legAt(i,226),legAt((i+1)%3,226),2);
  sectorPanel(angle,27,220);
}
box(24,8,0,20,20,28);
box(24,28,3,20,1,22);
parts.sort((a,b)=>a.depth-b.depth);
const ground=[[-85,-66,-9],[85,-66,-9],[85,66,-9],[-85,66,-9]].map(p=>project(p).map(n=>n.toFixed(2)).join(',')).join(' ');
export const towerSvg=`<svg class="broadcast-svg" viewBox="0 0 360 385" role="img" aria-label="Lattice radio tower with three sector antennas and a small tree landscape, emitting illustrated radio wavefronts" xmlns="http://www.w3.org/2000/svg"><polygon class="tower-ground" points="${ground}"/><ellipse class="tower-shadow" cx="180" cy="313" rx="74" ry="16"/>${parts.map(p=>p.svg).join('')}<g class="broadcast-wavefronts" fill="none" stroke="currentColor"><ellipse class="broadcast-wave" cx="180" cy="70" rx="26" ry="13"/><ellipse class="broadcast-wave" cx="180" cy="70" rx="26" ry="13"/><ellipse class="broadcast-wave" cx="180" cy="70" rx="26" ry="13"/></g></svg>`;
