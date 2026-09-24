/*! claude-mathe-widgets · funktionen.js · https://github.com/IlijazM/claude-mathe-widgets */
(function(){
var CSS=".mp{position:relative;padding:.5rem 0 1rem;--ax:var(--text-secondary,#73726c);--gr:var(--border,rgba(0,0,0,.08));font-family:var(--font-sans,system-ui),system-ui,sans-serif;color:var(--text-primary,#1f1e1d)}\n.mp svg{display:block;width:100%;height:auto;touch-action:none;user-select:none}\n.mp .tl{font-size:12px;fill:var(--ax)}.mp .al{font:italic 16px var(--font-voice,Georgia),Georgia,serif;fill:var(--text-primary,#1f1e1d)}\n.mp .pl{font-size:12px;fill:var(--text-primary,#1f1e1d);paint-order:stroke;stroke:var(--surface-0,#fff);stroke-width:4px;stroke-linejoin:round}\n.mp .cv{fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}\n.mp .lg{display:flex;flex-wrap:wrap;justify-content:center;gap:8px 12px;margin-top:.5rem}\n.mp .li{display:inline-flex;align-items:center;gap:10px;padding:6px 12px;border:0.5px solid var(--border-strong,rgba(0,0,0,.16));border-radius:var(--radius,8px);background:transparent;cursor:pointer;font:18px var(--font-voice,Georgia),Georgia,serif;color:var(--text-primary,#1f1e1d);height:auto}\n.mp .li.off{opacity:.4}.mp .li.off .sw{background:transparent!important}\n.mp .sw{width:22px;height:4px;border-radius:2px;flex-shrink:0}\n.mp .li i{font-style:italic}.mp .li sup{font-size:.62em;vertical-align:.6em;line-height:0}\n.mp .hv{font:13px var(--font-sans,system-ui),system-ui,sans-serif;color:var(--text-secondary,#73726c);min-width:0}\n.mp .err{font-size:13px;color:var(--text-danger,#A32D2D);text-align:center;padding:4px 0}\n@keyframes mpdraw{to{stroke-dashoffset:0}}\n@keyframes mppop{0%{transform:scale(0)}70%{transform:scale(1.4)}100%{transform:scale(1)}}\n.mp .dt{transform-box:fill-box;transform-origin:center;animation:mppop .45s ease-out backwards}";
var HTML="<svg id=\"mps\" viewBox=\"0 0 680 440\" role=\"img\" aria-label=\"Koordinatensystem mit Funktionsgraphen\"></svg><div class=\"lg\" id=\"mpl\"></div>";
function readCfg(host){
 var a=host.getAttribute('data-config');
 if(a){try{return JSON.parse(a)}catch(e){throw new Error('data-config ist kein gültiges JSON: '+e.message)}}
 return window.CONFIG||null;
}
function fail(host,msg){host.className='';host.innerHTML='<div style="font:13px system-ui,sans-serif;color:var(--text-danger,#A32D2D);text-align:center;padding:8px 0">'+String(msg).replace(/</g,'&lt;')+'</div>'}
function start(host,cfg){
 if(!document.getElementById("mp-css")){var st=document.createElement('style');st.id="mp-css";st.textContent=CSS;document.head.appendChild(st)}
 host.className="mp";host.innerHTML=HTML;
 try{run(cfg)}catch(e){fail(host,'Widget-Fehler: '+(e&&e.message||e))}
}
function boot(){
 var host=document.getElementById("mp");
 if(!host){host=document.createElement('div');host.id="mp";document.body.appendChild(host)}
 if(host.getAttribute('data-started'))return;
 var t0=Date.now();
 (function tryIt(){
  var cfg;try{cfg=readCfg(host)}catch(e){return fail(host,e.message)}
  if(cfg){host.setAttribute('data-started','1');return start(host,cfg)}
  if(Date.now()-t0<3000)return setTimeout(tryIt,50);
  fail(host,'Keine CONFIG gefunden – data-config am Container fehlt.');
 })();
}
window["MatheFunktionen"]=function(cfg){var host=document.getElementById("mp");if(host){host.setAttribute('data-started','1');start(host,cfg)}};
function run(CONFIG){
(function(){
const C=CONFIG,W=680,H=440,PL=44,PR=24,PT=22,PB=36,NS='http://www.w3.org/2000/svg';
const COL=['#378ADD','#D4537E','#1D9E75'];
const svg=document.getElementById('mps'),lg=document.getElementById('mpl'),root=document.getElementById('mp');
const fmt=v=>{if(Math.abs(v)<1e-9)v=0;return v.toLocaleString('de-DE',{maximumFractionDigits:2}).replace('-','−')};
const el=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);(p||svg).appendChild(e);return e};
function parse(src){
 let s=String(src).replace(/^\s*[a-zA-Z]\s*\(\s*x\s*\)\s*=|^\s*y\s*=/,'').replace(/[−–]/g,'-').replace(/[·×]/g,'*').replace(/[:÷]/g,'/').replace(/π/g,'pi').replace(/(\d),(\d)/g,'$1.$2');
 const tk=[];let i=0;
 while(i<s.length){const c=s[i];
  if(/\s/.test(c)){i++;continue}
  if(/[\d.]/.test(c)){let j=i;while(j<s.length&&/[\d.]/.test(s[j]))j++;tk.push({t:'n',v:parseFloat(s.slice(i,j))});i=j;continue}
  if(/[a-zA-Z]/.test(c)){let j=i;while(j<s.length&&/[a-zA-Z]/.test(s[j]))j++;let w=s.slice(i,j);i=j;
   while(w.length){const m=w.match(/^(sqrt|sin|cos|tan|abs|exp|ln|lg|log|pi|e|x)/);if(!m)throw new Error('Unbekannt: „'+w[0]+'“');const n=m[1];tk.push(['pi','e','x'].includes(n)?{t:n==='x'?'x':'n',v:n==='pi'?Math.PI:n==='e'?Math.E:0}:{t:'f',v:n});w=w.slice(n.length)}continue}
  if(c==='√'){tk.push({t:'f',v:'sqrt'});i++;continue}
  if(c==='²'||c==='³'){tk.push({t:'^'},{t:'n',v:c==='²'?2:3});i++;continue}
  if('+-*/^()|'.includes(c)){tk.push({t:c});i++;continue}
  throw new Error('Zeichen „'+c+'“ versteh ich nicht')}
 let p=0,ab=0;const pk=()=>tk[p],nx=()=>tk[p++];
 const F={sqrt:Math.sqrt,sin:Math.sin,cos:Math.cos,tan:Math.tan,abs:Math.abs,exp:Math.exp,ln:Math.log,lg:Math.log10,log:Math.log10};
 const starts=t=>t&&(t.t==='n'||t.t==='x'||t.t==='f'||t.t==='('||(t.t==='|'&&ab===0));
 function E(){let a=T();while(pk()&&(pk().t==='+'||pk().t==='-')){const o=nx().t,b=T(),l=a;a=o==='+'?x=>l(x)+b(x):x=>l(x)-b(x)}return a}
 function T(){let a=U();for(;;){const t=pk();if(t&&(t.t==='*'||t.t==='/')){nx();const b=U(),l=a;a=t.t==='*'?x=>l(x)*b(x):x=>l(x)/b(x)}else if(starts(t)){const b=Pw(),l=a;a=x=>l(x)*b(x)}else return a}}
 function U(){const t=pk();if(t&&t.t==='-'){nx();const a=U();return x=>-a(x)}if(t&&t.t==='+'){nx();return U()}return Pw()}
 function Pw(){const a=Pr();if(pk()&&pk().t==='^'){nx();const b=U();return x=>{const u=a(x),v=b(x);if(u<0&&!Number.isInteger(v)){const q=Math.round(1/v);if(Math.abs(1/v-q)<1e-9&&q%2)return-Math.pow(-u,v);return NaN}return Math.pow(u,v)}}return a}
 function Pr(){const t=nx();if(!t)throw new Error('Da fehlt noch was am Ende');
  if(t.t==='n')return()=>t.v;if(t.t==='x')return x=>x;
  if(t.t==='('){const a=E();if(!pk()||nx().t!==')')throw new Error('Klammer zu fehlt');return a}
  if(t.t==='|'){ab++;const a=E();ab--;if(!pk()||nx().t!=='|')throw new Error('Betragsstrich fehlt');return x=>Math.abs(a(x))}
  if(t.t==='f'){const f=F[t.v],a=Pw();return x=>f(a(x))}
  throw new Error('Unerwartet: „'+t.t+'“')}
 const f=E();if(p<tk.length)throw new Error('Unerwartet: „'+(tk[p].t==='n'?tk[p].v:tk[p].t)+'“');return f}
function pretty(src){
 let s=String(src).replace(/^\s*[a-zA-Z]\s*\(\s*x\s*\)\s*=|^\s*y\s*=/,'').trim().replace(/[·×]/g,'*').replace(/&/g,'&amp;').replace(/</g,'&lt;');
 s=s.replace(/\s*\*\s*/g,' · ').replace(/\s*\/\s*/g,'/').replace(/\s*([+=])\s*/g,' $1 ').replace(/(\S)\s*[-−]\s*/g,'$1 − ').replace(/^[-−]/,'−').replace(/\(\s*−\s/g,'(−');
 s=s.replace(/sqrt/g,'√').replace(/pi/g,'π').replace(/(\d)\.(\d)/g,'$1,$2');
 s=s.replace(/\^\(([^()]*)\)/g,'<sup>$1</sup>').replace(/\^\s*(−?[\w,]+)/g,'<sup>$1</sup>');
 return s.replace(/(^|[^a-z])(x|e)(?![a-z])/g,'$1<i>$2</i>')}
const fs=[];let err='';
(C.functions||[]).slice(0,3).forEach((d,k)=>{const o=typeof d==='string'?{expr:d}:d;try{fs.push({name:o.name||'fgh'[k],src:o.expr,f:parse(o.expr),col:o.color||COL[k],on:true})}catch(e){err+=(o.name||'fgh'[k])+': '+e.message+' '}});
let[x0,x1]=C.x||[-5,5];if(!(x1>x0)){x0=-5;x1=5}
let y0,y1;
if(C.y&&C.y[1]>C.y[0])[y0,y1]=C.y;else{const v=[];fs.forEach(F=>{for(let i=0;i<=200;i++){const y=F.f(x0+(x1-x0)*i/200);if(isFinite(y))v.push(y)}});v.sort((a,b)=>a-b);
 if(v.length){let lo=v[Math.floor(v.length*.03)],hi=v[Math.ceil(v.length*.97)-1];lo=Math.min(lo,0);hi=Math.max(hi,0);const pd=(hi-lo||2)*.12;y0=lo-pd;y1=hi+pd}else{y0=-5;y1=5}}
const pw=W-PL-PR,ph=H-PT-PB;
if(C.equal){const ux=pw/(x1-x0),uy=ph/(y1-y0);if(ux<uy){const c=(y0+y1)/2,h=ph/ux/2;y0=c-h;y1=c+h}else{const c=(x0+x1)/2,h=pw/uy/2;x0=c-h;x1=c+h}}
const sx=x=>PL+(x-x0)/(x1-x0)*pw,sy=y=>PT+(y1-y)/(y1-y0)*ph,ix=px=>x0+(px-PL)/pw*(x1-x0);
const nice=r=>{const t=r/10,m=Math.pow(10,Math.floor(Math.log10(t))),q=t/m;return(q<1.5?1:q<3.5?2:q<7.5?5:10)*m};
const dx=nice(x1-x0),dy=C.equal?dx:nice(y1-y0);
el('defs',{}).innerHTML='<clipPath id="mpc"><rect x="'+PL+'" y="'+PT+'" width="'+pw+'" height="'+ph+'"/></clipPath><marker id="mpa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1L9 5L1 9" fill="none" stroke="var(--text-secondary,#73726c)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></marker>';
const gG=el('g',{stroke:'var(--gr)','stroke-width':1});
const ax=Math.min(Math.max(sy(0),PT),PT+ph),ay=Math.min(Math.max(sx(0),PL),PL+pw);
for(let v=Math.ceil(x0/dx)*dx;v<=x1+1e-9;v+=dx){const X=sx(v);el('line',{x1:X,x2:X,y1:PT,y2:PT+ph},gG);if(Math.abs(v)>dx/2&&X>PL+8&&X<PL+pw-14){el('line',{x1:X,x2:X,y1:ax-4,y2:ax+4,stroke:'var(--ax)','stroke-width':1.2});const t=el('text',{x:X,y:ax+18,'text-anchor':'middle',class:'tl'});t.textContent=fmt(v)}}
for(let v=Math.ceil(y0/dy)*dy;v<=y1+1e-9;v+=dy){const Y=sy(v);el('line',{x1:PL,x2:PL+pw,y1:Y,y2:Y},gG);if(Math.abs(v)>dy/2&&Y>PT+14&&Y<PT+ph-8){el('line',{x1:ay-4,x2:ay+4,y1:Y,y2:Y,stroke:'var(--ax)','stroke-width':1.2});const t=el('text',{x:ay-8,y:Y+4,'text-anchor':'end',class:'tl'});t.textContent=fmt(v)}}
el('line',{x1:PL,x2:PL+pw+10,y1:ax,y2:ax,stroke:'var(--ax)','stroke-width':1.4,'marker-end':'url(#mpa)'});
el('line',{x1:ay,x2:ay,y1:PT+ph,y2:PT-10,stroke:'var(--ax)','stroke-width':1.4,'marker-end':'url(#mpa)'});
el('text',{x:PL+pw+6,y:ax-10,class:'al','text-anchor':'end'}).textContent='x';
el('text',{x:ay+10,y:PT-2,class:'al'}).textContent='y';
if(sx(0)>=PL&&sx(0)<=PL+pw&&sy(0)>=PT&&sy(0)<=PT+ph)el('text',{x:ay-7,y:ax+17,'text-anchor':'end',class:'tl'}).textContent='0';
const cG=el('g',{'clip-path':'url(#mpc)'}),N=900,lim=(y1-y0)*4;
fs.forEach((F,k)=>{let d='',pen=false,py=null;
 for(let i=0;i<=N;i++){const x=x0+(x1-x0)*i/N,y=F.f(x);
  if(!isFinite(y)||Math.abs(y-(y0+y1)/2)>lim||(py!==null&&Math.abs(y-py)>(y1-y0)*1.5)){pen=false;py=isFinite(y)?y:null;if(!isFinite(y))continue;if(Math.abs(y-(y0+y1)/2)>lim)continue}
  d+=(pen?'L':'M')+sx(x).toFixed(1)+' '+sy(y).toFixed(1);pen=true;py=y}
 F.path=el('path',{d,class:'cv',stroke:F.col},cG);
 if(C.animate!==false&&d){const L=F.path.getTotalLength();F.path.style.strokeDasharray=L;F.path.style.strokeDashoffset=L;F.path.style.animation='mpdraw 1.3s ease-in-out '+(k*.5)+'s forwards'}});
const roots=(h)=>{const r=[],M=600;let px=x0,pv=h(x0);for(let i=1;i<=M;i++){const x=x0+(x1-x0)*i/M,v=h(x);
  if(isFinite(pv)&&isFinite(v)){if(v===0)r.push(x);else if(pv*v<0){let a=px,b=x,fa=pv;for(let j=0;j<60;j++){const m=(a+b)/2,fm=h(m);if(fa*fm<=0)b=m;else{a=m;fa=fm}}const m=(a+b)/2;if(Math.abs(h(m))<(y1-y0)*1e-3)r.push(m)}}px=x;pv=v}
 return r.filter((x,i)=>i===0||Math.abs(x-r[i-1])>(x1-x0)*1e-3).map(x=>Math.abs(x-Math.round(x*1e4)/1e4)<1e-7?Math.round(x*1e4)/1e4:x)};
const pts=[],mk=C.marks||[],delay=C.animate!==false?.5*fs.length+.9:0;
if(mk.includes('roots'))fs.forEach(F=>roots(F.f).forEach(x=>pts.push({x,y:0,col:F.col,lab:'N'})));
if(mk.includes('yint'))fs.forEach(F=>{const y=F.f(0);if(isFinite(y))pts.push({x:0,y,col:F.col,lab:'Sy'})});
if(mk.includes('intersections')&&fs.length>1)for(let a=0;a<fs.length;a++)for(let b=a+1;b<fs.length;b++)roots(x=>fs[a].f(x)-fs[b].f(x)).forEach(x=>pts.push({x,y:fs[a].f(x),col:'var(--text-primary,#1f1e1d)',lab:'S'}));
(C.points||[]).forEach(p=>pts.push({x:p.x,y:p.y,col:p.color||'var(--text-primary,#1f1e1d)',lab:p.label||'',own:true}));
const pG=el('g',{});
pts.slice(0,12).forEach((p,i)=>{if(p.x<x0||p.x>x1||p.y<y0||p.y>y1)return;const X=sx(p.x),Y=sy(p.y),dl=(delay+i*.12)+'s';
 const c=el('circle',{cx:X,cy:Y,r:5.5,fill:p.col,stroke:'var(--surface-0,#fff)','stroke-width':2,class:'dt'},pG);c.style.animationDelay=dl;
 const txt=p.own?p.lab:p.lab+'('+fmt(p.x)+' | '+fmt(p.y)+')';if(!txt)return;
 const lf=X>PL+pw-120||(X<ay-2&&X>PL+120),dn=Y>ax+2&&Y<PT+ph-24,t=el('text',{x:X+(lf?-10:10),y:dn?Y+20:Y-10,'text-anchor':lf?'end':'start',class:'pl dt'},pG);t.textContent=txt;t.style.animationDelay=dl});
const hG=el('g',{style:'pointer-events:none;opacity:0;transition:opacity .15s'}),hL=el('line',{y1:PT,y2:PT+ph,stroke:'var(--ax)','stroke-width':1,'stroke-dasharray':'4 4'},hG);
const hD=fs.map(F=>el('circle',{r:5,fill:F.col,stroke:'var(--surface-0,#fff)','stroke-width':2},hG));
const rows=fs.map((F,k)=>{const b=document.createElement('button');b.className='li';b.type='button';b.setAttribute('aria-pressed','true');
 b.innerHTML='<span class="sw" style="background:'+F.col+'"></span><span><i>'+F.name+'</i>(<i>x</i>) = '+pretty(F.src)+'</span><span class="hv"></span>';
 b.onclick=()=>{F.on=!F.on;b.classList.toggle('off',!F.on);b.setAttribute('aria-pressed',F.on);F.path.style.opacity=F.on?1:0;hD[k].style.opacity=F.on?1:0};lg.appendChild(b);return b.querySelector('.hv')});
if(err){const e=document.createElement('div');e.className='err';e.textContent=err;root.appendChild(e)}
const mv=ev=>{const r=svg.getBoundingClientRect(),cx=(ev.touches?ev.touches[0].clientX:ev.clientX),px=(cx-r.left)/r.width*W;if(px<PL||px>PL+pw)return lv();const x=ix(px);
 hG.style.opacity=1;hL.setAttribute('x1',px);hL.setAttribute('x2',px);
 fs.forEach((F,k)=>{const y=F.f(x),ok=isFinite(y)&&y>=y0&&y<=y1;hD[k].setAttribute('cx',px);hD[k].setAttribute('cy',ok?sy(y):-99);rows[k].textContent=F.on?'· '+F.name+'('+fmt(x)+') = '+(isFinite(y)?fmt(y):'–'):''})};
const lv=()=>{hG.style.opacity=0;rows.forEach(r=>r.textContent='')};
svg.addEventListener('pointermove',mv);svg.addEventListener('pointerleave',lv);svg.addEventListener('touchmove',mv,{passive:true});
})();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
