const $=id=>document.getElementById(id),cv=$('cv'),GW=1280,GH=720,G=620;let c=cv.getContext('2d');
const DIF=[{n:'MUDAH',t:'EASY!',atk:.28,blk:.15,react:.15,dm:.7,spd:.8,dl:.4},{n:'SEDANG',t:'NORMAL!',atk:.42,blk:.22,react:.4,dm:1,spd:.95,dl:.28},{n:'SUSAH',t:'HARD!',atk:.58,blk:.28,react:.7,dm:1.25,spd:1.05,dl:.18}];
const A={jab:{su:.08,ac:.1,rc:.16,dmg:7,reach:100,kb:90,sh:5},hv:{su:.24,ac:.12,rc:.32,dmg:16,reach:128,kb:260,sh:14}};
let k=1,sel={ch:0,map:0},me=null,eid=1,bg,ac,mas,nbuf,li=1,ph='menu',pt=0,T=0,paused=0,stop=0,shake=0,round=1,tl=60,pw=0,ew=0,msg='',W='',pb=0,P,E,fx=[],pop=[],parts=[],lt=performance.now();
const emb=Array.from({length:30},()=>({x:Math.random()*GW,y:Math.random()*GH,v:15+Math.random()*30,p:Math.random()*6,r:1+Math.random()*2}));
const CH=[
{n:'SHADOW',r:'Seimbang dan serba bisa, cocok untuk pemula',col:'#22d3ee',c1:'#e6f06a',c2:'#6e8f1c',sp:1,pw:1,df:1,st:0},
{n:'BLAZE',r:'Pukulan paling mematikan, tapi agak lambat',col:'#ff6b35',c1:'#fca5a5',c2:'#7f1d1d',sp:.9,pw:1.25,df:1,st:1},
{n:'VIPER',r:'Sangat lincah dan cepat, tapi mudah terluka',col:'#4ade80',c1:'#86efac',c2:'#14532d',sp:1.15,pw:.9,df:1.1,st:2},
{n:'FROST',r:'Tahan banting, sulit dijatuhkan',col:'#93c5fd',c1:'#bfdbfe',c2:'#1e3a8a',sp:.95,pw:.95,df:.8,st:3}];
const MAPS=[
{n:'Senja Neon',d:'Pilar kuno di bawah langit senja',sky:[[0,'#7fa6dc'],[.28,'#f4cfa6'],[.52,'#ff9d5c'],[.78,'#e2644c'],[1,'#8a3350']],gl:'255,230,160',gy:470,me:['rgba(214,120,110,.75)','rgba(168,84,92,.9)','#5a2c44'],pf:'#262034',pg:'#38bdf8',em:['#7dd3fc','#ffb86b'],x:0},
{n:'Malam Bulan',d:'Arena sunyi di bawah bulan purnama',sky:[[0,'#050818'],[.4,'#161a4a'],[.75,'#3b2a7a'],[1,'#6b3f9a']],gl:'200,210,255',gy:200,me:['rgba(60,60,130,.8)','rgba(40,36,100,.95)','#1a1440'],pf:'#14122e',pg:'#a78bfa',em:['#c4b5fd','#93c5fd'],x:1},
{n:'Kota Cyber',d:'Atap gedung di tengah kota neon',sky:[[0,'#0b0430'],[.45,'#3a0f6b'],[.8,'#c0267a'],[1,'#ff6b9d']],gl:'255,100,200',gy:480,me:['rgba(30,10,70,.9)','rgba(20,8,50,.95)','#120830'],pf:'#150a30',pg:'#f472b6',em:['#f472b6','#22d3ee'],x:2},
{n:'Gunung Api',d:'Kawah lava yang terus membara',sky:[[0,'#1a0505'],[.4,'#6b1409'],[.75,'#d9480f'],[1,'#ff922b']],gl:'255,140,40',gy:430,me:['rgba(90,20,10,.85)','rgba(60,12,8,.95)','#2a0a06'],pf:'#2a1210',pg:'#fb923c',em:['#ff922b','#fcc419'],x:3}];
const mk=(x,face,ch)=>({x,face,ch,col:ch.col,vx:0,y:0,vy:0,hp:100,en:100,t:0,atk:null,hit:0,blk:0,ko:0,ph:Math.random()*6,tr:[]});
P=mk(430,1,CH[0]);E=mk(850,-1,CH[1]);
/* ---------- background ---------- */
function rs(){const d=devicePixelRatio||1,s=Math.min(innerWidth/GW,innerHeight/GH);k=s*d;cv.style.width=GW*s+'px';cv.style.height=GH*s+'px';cv.width=GW*k;cv.height=GH*k;$('box').style.setProperty('--u',s+'px');bg=mapBg(MAPS[sel.map],k)}
function mapBg(m,kk){const bc=document.createElement('canvas');bc.width=GW*kk;bc.height=GH*kk;const x=bc.getContext('2d');x.scale(kk,kk);
let g=x.createLinearGradient(0,0,0,G);m.sky.forEach(q=>g.addColorStop(q[0],q[1]));x.fillStyle=g;x.fillRect(0,0,GW,GH);
g=x.createRadialGradient(640,m.gy,10,640,m.gy,520);g.addColorStop(0,'rgba('+m.gl+',.85)');g.addColorStop(1,'rgba('+m.gl+',0)');x.fillStyle=g;x.fillRect(0,0,GW,GH);
if(m.x===1){x.fillStyle='#fff';for(let i=0;i<90;i++){x.globalAlpha=.3+(i*37%7)/10;x.fillRect((i*397)%GW,(i*173)%380,i%5?1.5:2.5,i%5?1.5:2.5)}x.globalAlpha=1;g=x.createRadialGradient(900,150,10,900,150,80);g.addColorStop(0,'#fff');g.addColorStop(1,'#dbe4ff');x.save();x.shadowColor='#c7d2fe';x.shadowBlur=60;x.fillStyle=g;x.beginPath();x.arc(900,150,70,0,6.3);x.fill();x.restore()}
if(m.x===3){x.fillStyle='#1a0808';x.beginPath();x.moveTo(250,G);x.lineTo(560,300);x.lineTo(610,284);x.lineTo(670,284);x.lineTo(720,300);x.lineTo(1030,G);x.fill();x.save();x.shadowColor='#ff6a00';x.shadowBlur=40;x.fillStyle='#ff7b1a';x.beginPath();x.ellipse(640,288,36,8,0,0,6.3);x.fill();x.strokeStyle='#ff6a00';x.lineWidth=3;x.beginPath();x.moveTo(630,292);x.lineTo(600,380);x.lineTo(560,470);x.moveTo(650,292);x.lineTo(690,400);x.lineTo(740,500);x.stroke();x.restore()}
const mesa=(col,pts)=>{x.fillStyle=col;x.beginPath();x.moveTo(0,G);pts.forEach(p=>x.lineTo(p[0],p[1]));x.lineTo(GW,G);x.fill()};
mesa(m.me[0],[[0,470],[120,430],[220,455],[330,400],[420,440],[560,470],[700,430],[820,455],[960,410],[1100,450],[1280,420]]);
mesa(m.me[1],[[0,540],[150,505],[300,530],[470,500],[640,540],[800,505],[980,535],[1150,510],[1280,540]]);
mesa(m.me[2],[[0,590],[200,570],[420,590],[700,575],[960,592],[1280,575]]);
if(m.x===2){for(let i=0,bx=0;bx<GW;i++){const bw=60+(i*53%50),bh=150+(i*97%230);x.fillStyle='#0d0626';x.fillRect(bx,G-bh,bw,bh);for(let wy=G-bh+14;wy<G-20;wy+=22)for(let wx=bx+8;wx<bx+bw-10;wx+=16){if((wx*7+wy*3+i)%5<2){x.fillStyle=(wx+wy)%3?'#fde68a':'#22d3ee';x.globalAlpha=.8;x.fillRect(wx,wy,6,10);x.globalAlpha=1}}x.fillStyle=i%2?'#f472b6':'#22d3ee';x.fillRect(bx,G-bh,bw,3);bx+=bw+6}}
if(m.x===0){x.fillStyle='#1b1626';[[560,300,60],[570,280,40],[578,262,24]].forEach(r=>{x.fillRect(r[0]+r[2]*.15,r[1],r[2]*.7,14);x.beginPath();x.moveTo(r[0]-6,r[1]);x.lineTo(r[0]+r[2]/2,r[1]-16);x.lineTo(r[0]+r[2]+6,r[1]);x.fill()});
x.strokeStyle='#2a2036';x.lineWidth=2;[[90,90],[130,70],[170,110],[1000,60]].forEach(b=>{x.beginPath();x.moveTo(b[0]-8,b[1]);x.lineTo(b[0],b[1]+4);x.lineTo(b[0]+8,b[1]);x.stroke()})}
function pil(x0,x1,top){x.fillStyle=m.pf;x.beginPath();x.moveTo(x0,G);x.lineTo(x0+10,top+120);x.lineTo(x0+60,top+30);x.lineTo((x0+x1)/2,top);x.lineTo(x1-50,top+50);x.lineTo(x1,top+150);x.lineTo(x1,G);x.fill();
x.save();x.shadowColor=m.pg;x.shadowBlur=26;x.strokeStyle=m.pg;x.lineWidth=3;x.stroke();const cx=(x0+x1)/2;x.shadowBlur=16;
x.beginPath();x.moveTo(cx-55,500);x.lineTo(cx-55,380);x.lineTo(cx,300);x.lineTo(cx+55,380);x.lineTo(cx+55,500);x.closePath();x.stroke();x.lineWidth=1.5;
x.beginPath();x.moveTo(cx-30,490);x.lineTo(cx-30,390);x.lineTo(cx,340);x.lineTo(cx+30,390);x.lineTo(cx+30,490);x.moveTo(cx-55,420);x.lineTo(cx+55,420);x.moveTo(cx,300);x.lineTo(cx,500);x.stroke();x.restore()}
pil(240,590,40);pil(850,1290,20);
g=x.createLinearGradient(0,G-60,0,G);g.addColorStop(0,'rgba(20,10,30,0)');g.addColorStop(1,'rgba(20,10,30,.65)');x.fillStyle=g;x.fillRect(0,G-60,GW,60);
x.fillStyle='#05050a';x.fillRect(0,G,GW,GH-G);x.beginPath();x.moveTo(0,G);x.lineTo(0,545);x.lineTo(110,565);x.lineTo(240,598);x.lineTo(300,G);x.fill();
x.save();x.shadowColor=m.pg;x.shadowBlur=18;x.fillStyle=m.pg;x.globalAlpha=.6;x.fillRect(0,G,GW,2);[[30,552,40],[100,566,30]].forEach(q=>{x.beginPath();x.ellipse(q[0],q[1],q[2],5,-.2,0,6.3);x.fill()});x.restore();
g=x.createRadialGradient(640,360,300,640,360,800);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.55)');x.fillStyle=g;x.fillRect(0,0,GW,GH);return bc}
addEventListener('resize',rs);rs();
/* ---------- audio ---------- */
function osc(ty,f,t,d,v,f2){const o=ac.createOscillator(),g=ac.createGain();o.type=ty;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(mas);o.start(t);o.stop(t+d+.02)}
function nz(t,d,v,hp){const s=ac.createBufferSource(),f=ac.createBiquadFilter(),g=ac.createGain();s.buffer=nbuf;f.type='highpass';f.frequency.value=hp;g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);s.connect(f);f.connect(g);g.connect(mas);s.start(t);s.stop(t+d)}
function sfx(n){if(!ac)return;const t=ac.currentTime;
if(n==='jab'){nz(t,.08,.35,600);osc('sine',150,t,.1,.5,50)}else if(n==='hv'){nz(t,.2,.5,300);osc('sine',110,t,.25,.8,30)}
else if(n==='block'){osc('square',900,t,.08,.1,450);nz(t,.05,.2,3000)}else if(n==='wh')nz(t,.12,.07,1800);else if(n==='jump')osc('triangle',250,t,.15,.1,500);
else if(n==='ko'){osc('sawtooth',320,t,.7,.3,40);nz(t,.4,.4,200)}else if(n==='bell'){osc('triangle',523,t,.4,.2);osc('triangle',784,t+.12,.5,.2)}}
/* ---------- input ---------- */
const K={};let wT=0,jq=-9,pj=-9,pk=-9;const now=()=>performance.now()/1000;
addEventListener('keydown',e=>{if(e.repeat)return;K[e.code]=1;const n=now();if(e.code==='KeyJ')pj=n;if(e.code==='KeyK')pk=n;if(e.code==='KeyW')wT=n;if(e.code==='KeyP'||e.code==='Escape')tp()});
addEventListener('keyup',e=>{K[e.code]=0;if(e.code==='KeyW'&&now()-wT<.18)jq=now()});
addEventListener('blur',()=>{for(const x in K)K[x]=0});
const J={l:0,r:0,d:0,u:0,b:0};
const pInp=()=>{const n=now();return{l:K.KeyA||J.l,r:K.KeyD||J.r,jab:n-pj<.15,hv:n-pk<.15,blk:(K.KeyW&&n-wT>.18)||J.d||J.b,jump:n-jq<.12}};
cv.addEventListener('pointerdown',e=>{const r=cv.getBoundingClientRect();if(Math.hypot((e.clientX-r.left)/r.width*GW-640,(e.clientY-r.top)/r.height*GH-118)<40)tp()});
/* ---------- kontrol sentuh (HP) ---------- */
const js=$('js'),kn=$('kn');let jid=null;
function jm(e){const r=js.getBoundingClientRect(),R=r.width/2;let dx=(e.clientX-r.left-R)/R,dy=(e.clientY-r.top-R)/R;const m=Math.hypot(dx,dy);if(m>1){dx/=m;dy/=m}
kn.style.transform='translate('+dx*R*.55+'px,'+dy*R*.55+'px)';J.l=dx<-.3?1:0;J.r=dx>.3?1:0;J.d=dy>.6?1:0;if(dy<-.6&&!J.u){J.u=1;jq=now()}if(dy>=-.6)J.u=0}
js.addEventListener('pointerdown',e=>{e.preventDefault();jid=e.pointerId;js.setPointerCapture(e.pointerId);jm(e)});
js.addEventListener('pointermove',e=>{if(e.pointerId===jid)jm(e)});
const je=e=>{if(e.pointerId===jid){jid=null;J.l=J.r=J.d=J.u=0;kn.style.transform=''}};js.addEventListener('pointerup',je);js.addEventListener('pointercancel',je);
document.querySelectorAll('.ab').forEach(b=>{const t=b.dataset.a;
b.addEventListener('pointerdown',e=>{e.preventDefault();b.classList.add('on');const n=now();if(t==='j')pj=n;else if(t==='k')pk=n;else if(t==='u')jq=n;else J.b=1});
const up=()=>{b.classList.remove('on');if(t==='b')J.b=0};['pointerup','pointercancel','pointerleave'].forEach(v=>b.addEventListener(v,up))});
document.addEventListener('contextmenu',e=>e.preventDefault());
/* ---------- AI ---------- */
const a={t:0,mv:0,bt:0,rt:0,jab:0,hv:0};
function aiInp(f,o,dt){const L=DIF[li],d=Math.abs(o.x-f.x),tw=o.x>f.x?1:-1;a.t-=dt;a.bt-=dt;a.rt-=dt;
if(o.atk&&o.atk.t<A[o.atk.n].su&&d<A[o.atk.n].reach+60&&a.rt<=0){a.rt=.6;if(Math.random()<L.react){a.bt=.45;a.mv=0}}
if(a.t<=0&&a.bt<=0){a.t=L.dl+Math.random()*.25;a.mv=0;if(d>140)a.mv=Math.random()<.9?tw:0;else{const r=Math.random();if(r<L.atk){if(f.en>=25&&Math.random()<.3)a.hv=1;else a.jab=1}else if(r<L.atk+L.blk)a.bt=.4+Math.random()*.4;else a.mv=Math.random()<.6?-tw:0}}
const i={l:a.mv<0,r:a.mv>0,jab:a.jab,hv:a.hv,blk:a.bt>0};a.jab=a.hv=0;return i}
/* ---------- fighters ---------- */
function spark(x,y,col,n){for(let i=0;i<n;i++){const an=Math.random()*6.3,s=120+Math.random()*320;parts.push({x,y,vx:Math.cos(an)*s,vy:Math.sin(an)*s-100,life:.35+Math.random()*.3,col})}}
function strike(f,o,D,n){const dx=Math.abs(o.x-f.x);if(o.ko||dx>D.reach+24||Math.abs(f.y-o.y)>90)return 0;
const hx=o.x-f.face*14,hy=G-o.y-(n==='hv'?120:135),dm=D.dmg*f.ch.pw*o.ch.df*(f===E?DIF[li].dm:1);
if(o.blk&&o.y<=0){o.hp=Math.max(1,o.hp-dm*.12);o.en-=14;o.vx=f.face*D.kb*.55;spark(hx,hy,'#cfe8ff',6);sfx('block');shake=Math.max(shake,3);stop=.04;pop.push({x:hx,y:hy-30,txt:'BLOCK',col:'#cfe8ff',life:.6});if(o.en<=0){o.en=0;o.blk=0;o.hit=.5;o.atk=null}return 1}
o.hp=Math.max(0,o.hp-dm);o.hit=n==='hv'?.5:.3;o.atk=null;o.vx=f.face*D.kb;if(n==='hv'&&o.y<=0)o.vy=260;
spark(hx,hy,f.col,n==='hv'?18:10);fx.push({x:hx,y:hy,t:0,col:f.col,big:n==='hv'});pop.push({x:hx,y:hy-40,txt:Math.round(dm),col:'#ffd166',life:.8});shake=Math.max(shake,D.sh);stop=n==='hv'?.1:.055;sfx(n);return 1}
function upd(f,o,inp,dt,spd){
if(f.ko){f.ko+=dt;f.vx*=.92}else{
if(f.hit<=0&&!f.atk)f.face=o.x>f.x?1:-1;
f.en=Math.min(100,f.en+dt*(f.blk?5:16));if(f.hit>0)f.hit-=dt;
const free=!f.atk&&f.hit<=0,gr=f.y<=0&&f.vy<=0;f.blk=free&&gr&&inp.blk?1:0;
if(free&&!f.blk){const dir=(inp.r?1:0)-(inp.l?1:0);
if(gr)f.vx=dir*250*spd*f.ch.sp;
if(gr&&inp.jump){f.vy=800;f.vx=dir*250*spd*f.ch.sp;sfx('jump');if(f===P)jq=-9}
if(inp.jab){f.atk={n:'jab',t:0,h:0};sfx('wh');if(f===P)pj=-9}
else if(inp.hv&&f.en>=25){f.en-=25;f.atk={n:'hv',t:0,h:0};sfx('wh');if(f===P)pk=-9}
}else if(gr)f.vx*=f.hit>0?.9:.8;
if(f.atk){const at=f.atk,D=A[at.n];at.t+=dt;if(!at.h&&at.t>=D.su&&at.t<D.su+D.ac&&strike(f,o,D,at.n))at.h=1;if(at.t>=D.su+D.ac+D.rc)f.atk=null}}
f.x+=f.vx*dt;f.y+=f.vy*dt;f.vy-=2400*dt;if(f.y<=0){f.y=0;f.vy=0}}
function sep(){const d=E.x-P.x,m=52;if(Math.abs(d)<m&&P.y<30&&E.y<30){const s=(m-Math.abs(d))/2*Math.sign(d||1);P.x-=s;E.x+=s}[P,E].forEach(f=>f.x=Math.max(70,Math.min(GW-70,f.x)))}
/* ---------- drawing fighters ---------- */
function ik(ax,ay,cx,cy,L1,L2,s){const dx=cx-ax,dy=cy-ay,l=Math.hypot(dx,dy)||1,m=Math.min(l,L1+L2-1),q=(L1*L1-L2*L2+m*m)/(2*m),h=Math.sqrt(Math.max(0,L1*L1-q*q)),ux=dx/l,uy=dy/l;return[ax,ay,ax+ux*q-uy*h*s,ay+uy*q+ux*h*s,ax+ux*m,ay+uy*m]}
function limb(p,w){c.lineWidth=w;c.beginPath();c.moveTo(p[0],p[1]);c.lineTo(p[2],p[3]);c.lineTo(p[4],p[5]);c.stroke()}
function drawF(f){const fc=f.face,G0=G-f.y;let e=0;const D=f.atk&&A[f.atk.n];
if(D){const t=f.atk.t,w=f.atk.n==='hv'?.45:.12;if(t<D.su)e=-w*t/D.su;else if(t<D.su+D.ac){const p=(t-D.su)/D.ac;e=-w+(1+w)*(1-(1-p)*(1-p))}else e=1-(t-D.su-D.ac)/D.rc}
const mv=Math.abs(f.vx)>30&&f.y<=0&&!f.atk,st=mv?Math.sin(T*13)*20:0,bob=Math.sin(T*5+f.ph)*2.5;
let lean=.16,cr=0;if(f.blk){lean=.25;cr=14}if(f.atk)lean=f.atk.n==='hv'?-.1+.75*e:.12+.3*e;if(f.hit>0)lean=-.45*Math.min(1,f.hit/.25);if(f.y>0)cr=-6;
const hx=f.x,hy=G0-92+cr+bob,sx=hx+fc*Math.sin(lean)*68,sy=hy-Math.cos(lean)*68,hdx=sx+fc*Math.sin(lean)*20,hdy=sy-24;
const lg=f.atk?(f.atk.n==='hv'?26:14)*Math.max(e,0):0;let ff=[hx+fc*(34+st+lg),G0],bf=[hx-fc*(28+st),G0];if(f.y>0){ff=[hx+fc*26,G0-30];bf=[hx-fc*14,G0-18]}
let fF=[sx+fc*52,sy+2],bF=[sx+fc*34,sy+16];if(f.blk){fF=[sx+fc*36,sy-22];bF=[sx+fc*30,sy-4]}if(f.hit>0){fF=[sx+fc*10,sy+48];bF=[sx-fc*6,sy+50]}
if(D){if(f.atk.n==='jab')fF=[sx+fc*(40+(D.reach-70)*e),sy+2-4*e];else bF=[sx+fc*(30+(D.reach-70)*e),sy+8-12*e]}
c.save();if(f.ko){c.translate(f.x,G);c.rotate(-fc*Math.min(1.45,f.ko*3.5));c.translate(-f.x,-G)}
c.strokeStyle=c.fillStyle='#05050a';c.lineCap=c.lineJoin='round';
limb(ik(hx,hy,bf[0],bf[1],48,48,-fc),17);limb(ik(sx,sy,bF[0],bF[1],40,40,fc),13);
c.lineWidth=28;c.beginPath();c.moveTo(hx,hy);c.lineTo(sx,sy);c.stroke();
c.beginPath();c.arc(hdx,hdy,17,0,6.3);c.fill();
const hs=f.ch.st;if(hs===1){c.beginPath();for(let i=-2;i<=2;i++){c.moveTo(hdx+i*7-5,hdy-12);c.lineTo(hdx+i*8,hdy-34-(2-Math.abs(i))*4);c.lineTo(hdx+i*7+5,hdy-12)}c.fill()}else if(hs===3){c.beginPath();c.moveTo(hdx-12,hdy-8);c.lineTo(hdx-20,hdy-38);c.lineTo(hdx-3,hdy-14);c.moveTo(hdx+12,hdy-8);c.lineTo(hdx+20,hdy-38);c.lineTo(hdx+3,hdy-14);c.fill()}else{c.lineWidth=hs===2?10:6;c.beginPath();c.moveTo(hdx-fc*14,hdy-4);for(let i=1;i<=(hs===2?6:4);i++)c.lineTo(hdx-fc*(14+i*11),hdy-4+Math.sin(T*8+i)*5+i*3);c.stroke()}
limb(ik(hx,hy,ff[0],ff[1],48,48,-fc),17);const fa=ik(sx,sy,fF[0],fF[1],40,40,fc),ba=ik(sx,sy,bF[0],bF[1],40,40,fc);limb(fa,13);limb(ba,13);
c.beginPath();c.arc(fa[4],fa[5],9,0,6.3);c.arc(ba[4],ba[5],9,0,6.3);c.fill();
c.save();c.fillStyle=f.col;c.shadowColor=f.col;c.shadowBlur=12;c.fillRect(hdx+fc*5-2,hdy-4,5,3);c.restore();
const fist=D?(f.atk.n==='jab'?fa:ba):null;
if(fist&&e>.1){f.tr.push([fist[4],fist[5]]);if(f.tr.length>7)f.tr.shift();c.save();c.strokeStyle=f.col;c.shadowColor=f.col;c.shadowBlur=18;c.globalAlpha=.7;c.lineWidth=9;c.beginPath();f.tr.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();c.restore()}else f.tr=[];
if(f===E||fist&&e>.1){const q=fist&&e>.1?fist:fa;c.save();const g=c.createRadialGradient(q[4],q[5],2,q[4],q[5],fist&&e>.1?34:20);g.addColorStop(0,f.col);g.addColorStop(1,'rgba(0,0,0,0)');c.globalAlpha=fist&&e>.1?.9:.55;c.fillStyle=g;c.beginPath();c.arc(q[4],q[5],fist&&e>.1?34:20,0,6.3);c.fill();c.restore()}
c.restore()}
/* ---------- HUD ---------- */
function side(v,en,wn,m){c.save();if(m){c.translate(GW,0);c.scale(-1,1)}const x=345,w=245;c.beginPath();c.moveTo(x,76);c.lineTo(x+w+10,76);c.lineTo(x+w,90);c.lineTo(x,90);c.closePath();c.fillStyle='rgba(0,0,0,.55)';c.fill();c.save();c.clip();const g=c.createLinearGradient(x,0,x+w,0);g.addColorStop(0,'#ff5a00');g.addColorStop(1,'#ffb040');c.fillStyle=g;c.fillRect(x,76,w*v,14);c.restore();
c.fillStyle='rgba(0,0,0,.55)';c.fillRect(x,96,170,8);c.fillStyle='#38bdf8';c.fillRect(x,96,170*en/100,8);
for(let i=0;i<2;i++){const px=x+190+i*30;c.beginPath();c.moveTo(px+6,96);c.lineTo(px+26,96);c.lineTo(px+20,104);c.lineTo(px,104);c.closePath();c.fillStyle=i<wn?'#fbbf24':'rgba(255,255,255,.2)';c.fill()}c.restore()}
function por(cx,cy,r,c1,c2,eye,horn){c.save();c.beginPath();c.arc(cx,cy,r,0,6.3);c.clip();const g=c.createRadialGradient(cx,cy-20,5,cx,cy,r);g.addColorStop(0,c1);g.addColorStop(1,c2);c.fillStyle=g;c.fillRect(cx-r,cy-r,2*r,2*r);c.fillStyle='#07070c';
c.beginPath();c.ellipse(cx,cy+r*.95,r*.8,r*.55,0,0,6.3);c.fill();c.beginPath();c.ellipse(cx,cy-6,r*.34,r*.42,0,0,6.3);c.fill();
if(horn){c.beginPath();c.moveTo(cx-r*.3,cy-r*.3);c.lineTo(cx-r*.5,cy-r*.85);c.lineTo(cx-r*.08,cy-r*.45);c.moveTo(cx+r*.3,cy-r*.3);c.lineTo(cx+r*.5,cy-r*.85);c.lineTo(cx+r*.08,cy-r*.45);c.fill()}
c.fillStyle=eye;c.shadowColor=eye;c.shadowBlur=12;c.fillRect(cx-r*.2,cy-14,r*.14,5);c.fillRect(cx+r*.06,cy-14,r*.14,5);c.restore();
c.lineWidth=8;c.strokeStyle='#1d140f';c.beginPath();c.arc(cx,cy,r,0,6.3);c.stroke();c.lineWidth=2;c.strokeStyle='rgba(255,255,255,.25)';c.beginPath();c.arc(cx,cy,r-5,0,6.3);c.stroke()}
function ann(t,col,s){c.save();c.textAlign='center';c.font='800 '+110*s+'px Cinzel,serif';c.shadowColor=col;c.shadowBlur=30;c.fillStyle='#fff';c.fillText(t,640,350);c.restore()}
function hud(){side(P.hp/100,P.en,pw,0);side(E.hp/100,E.en,ew,1);por(250,100,80,P.ch.c1,P.ch.c2,P.col,P.ch.st===3);por(1030,100,80,E.ch.c1,E.ch.c2,E.col,E.ch.st===3);
c.font='600 30px Cinzel,serif';c.fillStyle='#f5d9a8';c.textAlign='left';c.fillText(P.ch.n,345,68);c.textAlign='right';c.fillText(E.ch.n,935,68);
c.font='italic 800 24px Poppins,sans-serif';c.fillStyle='#ffe34d';c.strokeStyle='#3a2a00';c.lineWidth=4;c.strokeText(DIF[li].t,935,134);c.fillText(DIF[li].t,935,134);
c.textAlign='center';c.font='700 66px Cinzel,serif';c.fillStyle='#f0c27b';c.strokeStyle='#4a2a10';c.lineWidth=5;const tt=String(Math.max(0,Math.ceil(tl)));c.strokeText(tt,640,76);c.fillText(tt,640,76);
const g=c.createRadialGradient(640,112,4,640,118,38);g.addColorStop(0,'#c9c9c9');g.addColorStop(1,'#6e6e72');c.fillStyle=g;c.beginPath();c.arc(640,118,36,0,6.3);c.fill();c.fillStyle='#e8e8ea';c.fillRect(628,104,9,28);c.fillRect(644,104,9,28);
if(ph==='intro'){if(pt<1.2)ann('ROUND '+round,'#38bdf8',1+Math.max(0,.4-pt));else ann('FIGHT!','#f472b6',1+Math.max(0,.4-(pt-1.2)))}
if(ph==='rend'&&pt>.25)ann(msg,msg==='K.O.'?'#ef4444':'#fbbf24',1)}
/* ---------- game flow ---------- */
function newRound(){P=mk(430,1,CH[sel.ch]);E=mk(850,-1,CH[eid]);tl=60;ph='intro';pt=0;pb=0;fx=[];pop=[];parts=[]}
function startMatch(i){li=i;if(me){me.df=i;sv()}eid=pickE();if(!ac){ac=new(window.AudioContext||window.webkitAudioContext)();mas=ac.createGain();mas.gain.value=.55;mas.connect(ac.destination);nbuf=ac.createBuffer(1,ac.sampleRate,ac.sampleRate);const d=nbuf.getChannelData(0);for(let j=0;j<d.length;j++)d[j]=Math.random()*2-1}ac.resume();pw=ew=0;round=1;paused=0;hideAll();newRound()}
function endR(){ph='rend';pt=0;const ko=P.hp<=0||E.hp<=0;msg=ko?'K.O.':'TIME UP';W=P.hp>E.hp?'P':E.hp>P.hp?'E':'T';
if(W==='P'){pw++;if(ko)E.ko=.001}else if(W==='E'){ew++;if(ko)P.ko=.001}else msg='SERI';if(ko)sfx('ko')}
function next(){if(pw>=2||ew>=2){ph='over';rec(pw>=2);$('et').textContent=pw>=2?'VICTORY':'GAME OVER';$('es').textContent='Skor ronde '+pw+' - '+ew+(me?' · Total menang '+me.w+', kalah '+me.l:'');$('end').classList.remove('hide')}else{if(W!=='T')round++;newRound()}}
function tp(){if(ph==='menu'||ph==='over')return;paused=!paused;$('pause').classList.toggle('hide',!paused)}
function menu(){ph='menu';paused=0;preview();show(me?'home':'auth');if(me)renderHome()}
DIF.forEach((d,i)=>{const b=document.createElement('button');b.className='btn';b.innerHTML='<span>'+d.n+'</span><small>'+['Pemula','Seimbang','Menantang'][i]+'</small>';b.onclick=()=>startMatch(i);$('lv').appendChild(b)});
$('rs').onclick=tp;$('pm').onclick=menu;$('em').onclick=menu;$('ag').onclick=()=>startMatch(li);
function step(dt){emb.forEach(e=>{e.y-=e.v*dt;e.x+=Math.sin(T+e.p)*10*dt;if(e.y<-10){e.y=GH;e.x=Math.random()*GW}});
if(stop>0){stop-=dt;return}shake*=Math.exp(-dt*9);
parts=parts.filter(p=>{p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=500*dt;return p.life>0});fx.forEach(f=>f.t+=dt);fx=fx.filter(f=>f.t<.3);pop.forEach(p=>{p.life-=dt;p.y-=40*dt});pop=pop.filter(p=>p.life>0);
pt+=dt;const no={};
if(ph==='fight'){const L=DIF[li];upd(P,E,pInp(),dt,1);upd(E,P,aiInp(E,P,dt),dt,L.spd);sep();tl-=dt;if(P.hp<=0||E.hp<=0||tl<=0)endR()}
else{const s=ph==='rend'&&pt<1?.4:1;upd(P,E,no,dt*s,1);upd(E,P,no,dt*s,1);sep();
if(ph==='intro'){if(pt>1.2&&!pb){pb=1;sfx('bell')}if(pt>2.2){ph='fight';pt=0}}else if(ph==='rend'&&pt>3)next()}}
function render(){const sx=(Math.random()-.5)*shake*2,sy=(Math.random()-.5)*shake*2;c.setTransform(k,0,0,k,sx*k,sy*k);c.drawImage(bg,-20,-20,GW+40,GH+40);
emb.forEach(e=>{c.globalAlpha=.5;c.fillStyle=e.r>2?MAPS[sel.map].em[0]:MAPS[sel.map].em[1];c.beginPath();c.arc(e.x,e.y,e.r,0,6.3);c.fill()});c.globalAlpha=1;
drawF(E);drawF(P);
fx.forEach(f=>{const p=f.t/.3,r=20+p*(f.big?110:70);c.save();c.globalAlpha=1-p;c.strokeStyle='#fff';c.shadowColor=f.col;c.shadowBlur=20;c.lineWidth=5*(1-p)+1;c.beginPath();c.arc(f.x,f.y,r,0,6.3);c.stroke();for(let i=0;i<8;i++){const an=i*.785+.2;c.beginPath();c.moveTo(f.x+Math.cos(an)*r*.5,f.y+Math.sin(an)*r*.5);c.lineTo(f.x+Math.cos(an)*r*1.3,f.y+Math.sin(an)*r*1.3);c.stroke()}c.restore()});
parts.forEach(p=>{c.globalAlpha=Math.min(1,p.life*3);c.fillStyle=p.col;c.fillRect(p.x-2,p.y-2,4,4)});c.globalAlpha=1;
pop.forEach(p=>{c.globalAlpha=Math.min(1,p.life*2);c.font='800 26px Poppins,sans-serif';c.textAlign='center';c.fillStyle=p.col;c.strokeStyle='#000';c.lineWidth=4;c.strokeText(p.txt,p.x,p.y);c.fillText(p.txt,p.x,p.y)});c.globalAlpha=1;
c.setTransform(k,0,0,k,0,0);if(ph!=='menu')hud()}
function loop(n){requestAnimationFrame(loop);const dt=Math.min(.033,(n-lt)/1000);lt=n;T+=dt;if(!paused)step(dt);render();drawPrev()}
/* ---------- akun, menu, pilih karakter dan arena ---------- */
const LS={get(q){try{return JSON.parse(localStorage.getItem(q))}catch(e){return null}},set(q,v){try{localStorage.setItem(q,JSON.stringify(v));return 1}catch(e){return 0}},del(q){try{localStorage.removeItem(q)}catch(e){}}};
const mem={},gU=()=>LS.get('sb_users')||mem.u||{},sU=u=>{mem.u=u;LS.set('sb_users',u)};
function sv(){const u=gU();u[me.key]=me;sU(u)}
async function hsh(pw,salt){const t=salt+':'+pw;if(window.crypto&&crypto.subtle){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return[...new Uint8Array(b)].map(v=>v.toString(16).padStart(2,'0')).join('')}let h=5381;for(const ch of t)h=(h*33^ch.charCodeAt(0))>>>0;return'x'+h}
const esc=t=>t.replace(/[&<>"']/g,m=>'&#'+m.charCodeAt(0)+';');
function show(id){document.querySelectorAll('.scr').forEach(e=>e.classList.add('hide'));$('end').classList.add('hide');$('pause').classList.add('hide');if(id)$(id).classList.remove('hide')}
const hideAll=()=>show(null);
const pickE=()=>{let i;do i=Math.floor(Math.random()*CH.length);while(i===sel.ch);return i};
function preview(){P=mk(430,1,CH[sel.ch]);E=mk(850,-1,CH[(sel.ch+1)%CH.length])}
let mode='in';
function tab(m){mode=m;$('tl').classList.toggle('on',m==='in');$('tr').classList.toggle('on',m==='up');$('cfl').classList.toggle('hide',m==='in');$('ago').textContent=m==='in'?'MASUK':'BUAT AKUN';$('ae').textContent='';$('pw').autocomplete=m==='in'?'current-password':'new-password'}
$('tl').onclick=()=>tab('in');$('tr').onclick=()=>tab('up');
async function authGo(){const name=$('un').value.trim(),pw=$('pw').value,key=name.toLowerCase(),er=t=>{$('ae').textContent=t};
if(!/^[A-Za-z0-9_]{3,12}$/.test(name))return er('Username 3-12 karakter: huruf, angka, atau _');
if(pw.length<6)return er('Password minimal 6 karakter');
const u=gU();
if(mode==='up'){if($('pc').value!==pw)return er('Ulangi password tidak sama');if(u[key])return er('Username sudah dipakai');const salt=Math.random().toString(36).slice(2);u[key]={key,name,salt,h:await hsh(pw,salt),w:0,l:0,m:0,ch:0,map:0,df:1};sU(u);login(u[key])}
else{const a=u[key];if(!a||a.h!==await hsh(pw,a.salt))return er('Username atau password salah');login(a)}}
$('ago').onclick=authGo;['un','pw','pc'].forEach(i=>$(i).addEventListener('keydown',e=>{if(e.key==='Enter')authGo()}));
function login(a){me=a;LS.set('sb_s',a.key);sel.ch=a.ch||0;sel.map=a.map||0;li=a.df==null?1:a.df;['un','pw','pc'].forEach(i=>{$(i).value=''});rs();markSel();menu()}
$('lo').onclick=()=>{me=null;LS.del('sb_s');tab('in');menu()};
function rec(win){if(!me)return;me.m++;if(win)me.w++;else me.l++;sv()}
function renderHome(){$('hn').textContent=me.name;$('av').textContent=me.name[0].toUpperCase();$('s1').textContent=me.m;$('s2').textContent=me.w;$('s3').textContent=me.l;$('s4').textContent=(me.m?Math.round(me.w/me.m*100):0)+'%';
$('lbl').innerHTML=Object.values(gU()).sort((a,b)=>b.w-a.w||a.l-b.l).slice(0,3).map((x,i)=>'<li><span>'+['🥇','🥈','🥉'][i]+' '+esc(x.name)+'</span><b>'+x.w+' menang</b></li>').join('')}
const BR=[['Kecepatan',q=>(q.sp-.7)/.6],['Kekuatan',q=>(q.pw-.7)/.7],['Pertahanan',q=>(1.3-q.df)/.6]];
function buildCards(){$('cc').innerHTML='';CH.forEach((ch,i)=>{const d=document.createElement('div');d.className='card';d.style.setProperty('--cc',ch.col);
d.innerHTML='<canvas width="240" height="250"></canvas><b>'+ch.n+'</b><small>'+ch.r+'</small>'+BR.map(b=>'<div class="st">'+b[0]+'<div class="bar"><i style="width:'+Math.round(Math.max(.1,Math.min(1,b[1](ch)))*100)+'%"></i></div></div>').join('');
d.onclick=()=>{sel.ch=i;preview();markSel()};$('cc').appendChild(d)})}
function buildMaps(){$('mc').innerHTML='';MAPS.forEach((m,i)=>{const d=document.createElement('div');d.className='card';d.style.setProperty('--cc',m.pg);d.appendChild(mapBg(m,.25));d.insertAdjacentHTML('beforeend','<b>'+m.n+'</b><small>'+m.d+'</small>');d.onclick=()=>{sel.map=i;rs();markSel()};$('mc').appendChild(d)})}
function markSel(){[...$('cc').children].forEach((d,i)=>d.classList.toggle('sel',i===sel.ch));[...$('mc').children].forEach((d,i)=>d.classList.toggle('sel',i===sel.map))}
function drawPrev(){if($('chs').classList.contains('hide'))return;const cs=$('cc').querySelectorAll('canvas'),o=c;
CH.forEach((ch,i)=>{const x=cs[i].getContext('2d');c=x;x.setTransform(1,0,0,1,0,0);x.clearRect(0,0,240,250);const g=x.createRadialGradient(120,150,10,120,150,140);g.addColorStop(0,ch.col+'88');g.addColorStop(1,'rgba(0,0,0,0)');x.fillStyle=g;x.fillRect(0,0,240,250);x.fillStyle='rgba(0,0,0,.5)';x.fillRect(0,236,240,14);x.setTransform(1,0,0,1,-520,-384);const f=mk(640,1,ch);f.ph=i;drawF(f)});c=o}
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{show(b.dataset.go);if(b.dataset.go==='home')renderHome()});
$('go').onclick=()=>show('chs');$('chn').onclick=()=>show('mps');
$('mpn').onclick=()=>{me.ch=sel.ch;me.map=sel.map;sv();$('dsum').textContent=CH[sel.ch].n+' · '+MAPS[sel.map].n;show('dif')};
function boot(){buildCards();buildMaps();markSel();tab('in');const q=LS.get('sb_s'),u=gU();if(q&&u[q])login(u[q]);else menu()}
requestAnimationFrame(loop);boot();
