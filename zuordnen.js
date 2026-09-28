/*! claude-mathe-widgets · zuordnen.js · https://github.com/IlijazM/claude-mathe-widgets */
(function(){
var CSS=[
".mz{position:relative;padding:.5rem 0 1rem;--ax:var(--text-secondary,#73726c);--gr:var(--border,rgba(0,0,0,.08));--acc:var(--text-accent,#185FA5);--mut:var(--text-secondary,#73726c);--ok:var(--text-success,#3B6D11);--warn:var(--text-warning,#BA7517);--wbg:var(--bg-warning,#FAEEDA);font-family:var(--font-voice,Georgia),Georgia,'Times New Roman',serif;color:var(--text-primary,#1f1e1d)}",
".mz .gs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}",
".mz .cd{position:relative;display:flex;flex-direction:column;margin:0;padding:6px 6px 0;border:1.5px dashed var(--border-strong,rgba(0,0,0,.22));border-radius:14px;background:transparent;color:inherit;font:inherit;text-align:left;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:border-color .2s,background .2s,box-shadow .2s}",
".mz .cd:hover{background:var(--surface-1,#f5f4ef)}",
".mz .cd.sel{border-style:solid;border-color:var(--acc);box-shadow:0 0 0 3px var(--bg-accent,#E6F1FB)}",
".mz .cd.right{border-style:solid;border-color:var(--ok);cursor:default}.mz .cd.right:hover{background:transparent}",
".mz .cd.wrong{border-color:var(--warn);background:var(--wbg);animation:mzwig .4s}",
".mz .cd svg{display:block;width:100%;height:auto}",
".mz .lt{position:absolute;left:8px;top:6px;z-index:1;min-width:24px;height:24px;padding:0 5px;box-sizing:border-box;border-radius:8px;background:var(--surface-1,#f5f4ef);font:500 14px/24px var(--font-sans,system-ui),system-ui,sans-serif;text-align:center;color:var(--text-primary,#1f1e1d)}",
".mz .cd.sel .lt{background:var(--bg-accent,#E6F1FB);color:var(--acc)}.mz .cd.right .lt{background:var(--ok);color:var(--surface-0,#fff)}",
".mz .ft{min-height:2em;display:flex;align-items:center;justify-content:center;font-size:18px;border-top:1.5px dashed var(--border-strong,rgba(0,0,0,.14));margin:0 -6px;padding:2px 6px;white-space:nowrap;overflow:hidden}",
".mz .ft .ph{font:13px var(--font-sans,system-ui),system-ui,sans-serif;color:var(--text-muted,#9a9893)}.mz .cd.right .ft{color:var(--ok)}",
".mz .ts{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-top:14px}",
".mz .tm{display:inline-flex;align-items:center;gap:8px;height:auto;min-height:42px;margin:0;padding:4px 12px;border:1.5px dashed var(--border-strong,rgba(0,0,0,.22));border-radius:12px;background:var(--surface-2,#fff);color:var(--text-primary,#1f1e1d);font:19px var(--font-voice,Georgia),Georgia,serif;cursor:pointer;-webkit-tap-highlight-color:transparent;transition:all .2s}",
".mz .tm:hover{background:var(--surface-1,#f5f4ef)}.mz .tm.sel{border-style:solid;border-color:var(--acc);box-shadow:0 0 0 3px var(--bg-accent,#E6F1FB)}",
".mz .tm .lt{position:static;min-width:22px;height:22px;line-height:22px;font-size:13px;background:var(--bg-accent,#E6F1FB);color:var(--acc)}",
".mz .tm.used{opacity:.75}.mz .tm.right{border-style:solid;border-color:var(--ok);color:var(--ok);cursor:default;opacity:1}.mz .tm.right .lt{background:var(--ok);color:var(--surface-0,#fff)}",
".mz i{font-style:italic}.mz sup{font-size:.62em;vertical-align:.6em;line-height:0}",
".mz .ctl{display:flex;justify-content:center;margin-top:14px}",
".mz .go{height:38px;padding:0 14px;border-radius:12px;border:none;background:var(--bg-accent,#E6F1FB);color:var(--text-accent,#185FA5);font:500 14px var(--font-sans,system-ui),system-ui,sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:6px}.mz .go:hover{filter:brightness(.97)}",
".mz .tp{font:14px/1.5 var(--font-sans,system-ui),system-ui,sans-serif;color:var(--mut);text-align:center;margin:.5rem auto 0;max-width:34em}.mz .tp div{animation:mzin .35s ease-out both}.mz .tp div+div{margin-top:.25rem}",
".mz .tl{font:15px var(--font-sans,system-ui),system-ui,sans-serif;fill:var(--ax)}.mz .al{font:italic 17px var(--font-voice,Georgia),Georgia,serif;fill:var(--text-primary,#1f1e1d)}",
".mz .cv{fill:none;stroke-width:3.5;stroke-linecap:round;stroke-linejoin:round;transition:stroke .4s}",
".mz .fx{position:absolute;inset:0;pointer-events:none;z-index:4;overflow:hidden}.mz .cf{position:absolute;display:block;pointer-events:none}",
".mz .err{font:13px var(--font-sans,system-ui),system-ui,sans-serif;color:var(--text-danger,#A32D2D);text-align:center;padding:4px 0}",
"@keyframes mzdraw{to{stroke-dashoffset:0}}",
"@keyframes mzwig{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}",
"@keyframes mzin{from{opacity:0;transform:translateY(-8px)}}",
"@keyframes mzpop{0%{transform:scale(.3);opacity:0}100%{transform:scale(1);opacity:1}}",
".mz .pop{animation:mzpop .4s cubic-bezier(.3,1.7,.5,1)}"
].join("\n");
var HTML="<div class=\"gs\"></div><div class=\"ts\"></div><div class=\"ctl\"></div><div class=\"tp\" aria-live=\"polite\"></div><div class=\"fx\"></div>";
function readCfg(host){
 var a=host.getAttribute('data-config');
 if(a){try{return JSON.parse(a)}catch(e){throw new Error('data-config ist kein gültiges JSON: '+e.message)}}
 return window.CONFIG||null;
}
function fail(host,msg){host.className='';host.innerHTML='<div style="font:13px system-ui,sans-serif;color:var(--text-danger,#A32D2D);text-align:center;padding:8px 0">'+String(msg).replace(/</g,'&lt;')+'</div>'}
function start(host,cfg){
 if(!document.getElementById("mz-css")){var st=document.createElement('style');st.id="mz-css";st.textContent=CSS;document.head.appendChild(st)}
 host.className="mz";host.innerHTML=HTML;
 try{run(cfg,host)}catch(e){fail(host,'Widget-Fehler: '+(e&&e.message||e))}
}
function boot(){
 var host=document.getElementById("mz");
 if(!host){host=document.createElement('div');host.id="mz";document.body.appendChild(host)}
 if(host.getAttribute('data-started'))return;
 var t0=Date.now();
 (function tryIt(){
  var cfg;try{cfg=readCfg(host)}catch(e){return fail(host,e.message)}
  if(cfg){host.setAttribute('data-started','1');return start(host,cfg)}
  if(Date.now()-t0<3000)return setTimeout(tryIt,50);
  fail(host,'Keine CONFIG gefunden – data-config am Container fehlt.');
 })();
}
window["MatheZuordnen"]=function(cfg){var host=document.getElementById("mz");if(host){host.setAttribute('data-started','1');start(host,cfg)}};

function run(C,host){
if(!C||typeof C!=='object')throw new Error('CONFIG fehlt.');
const SRC=(Array.isArray(C.functions)?C.functions:[]).map(d=>typeof d==='string'?d:d&&d.expr).filter(s=>s!=null&&String(s).trim());
if(SRC.length<2||SRC.length>6)throw new Error('CONFIG: "functions" braucht 2 bis 6 Funktionsterme.');

/* ---------- Term lesen (wie funktionen.js) ---------- */
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
 s=s.replace(/sqrt/g,'√').replace(/pi/g,'π').replace(/(\d)\.(\d)/g,'$1,$2').replace(/²/g,'^2').replace(/³/g,'^3');
 s=s.replace(/\^\(([^()]*)\)/g,'<sup>$1</sup>').replace(/\^\s*(−?[\w,]+)/g,'<sup>$1</sup>');
 return s.replace(/(^|[^a-z])(x|e)(?![a-z])/g,'$1<i>$2</i>')}
const FS=SRC.map((s,k)=>{try{return{src:s,f:parse(s)}}catch(e){throw new Error('Term '+(k+1)+' („'+s+'“): '+e.message)}});

/* ---------- Bereich ---------- */
let[x0,x1]=Array.isArray(C.x)&&C.x[1]>C.x[0]?C.x:[-4,4];
let y0,y1;
if(Array.isArray(C.y)&&C.y[1]>C.y[0])[y0,y1]=C.y;else{const v=[];FS.forEach(F=>{for(let i=0;i<=120;i++){const y=F.f(x0+(x1-x0)*i/120);if(isFinite(y))v.push(y)}});v.sort((a,b)=>a-b);
 let lo=v.length?v[Math.floor(v.length*.05)]:-5,hi=v.length?v[Math.ceil(v.length*.95)-1]:5;lo=Math.min(lo,0);hi=Math.max(hi,0);y0=Math.floor(lo)-1;y1=Math.ceil(hi)+1;if(y1-y0<6){y0-=1;y1+=1}}

/* ---------- Karten zeichnen ---------- */
const NS='http://www.w3.org/2000/svg',W=300,H=230,PL=12,PR=12,PT=34,PB=12,pw=W-PL-PR,ph=H-PT-PB;
const sx=x=>PL+(x-x0)/(x1-x0)*pw,sy=y=>PT+(y1-y)/(y1-y0)*ph;
const stp=r=>r<=10?1:r<=20?2:5,dx=stp(x1-x0),dy=stp(y1-y0);
const fmt=v=>String(+v.toFixed(2)).replace('.',',').replace('-','−');
const LET='ABCDEF';
const GS=host.querySelector('.gs'),TS=host.querySelector('.ts'),CT=host.querySelector('.ctl'),TP=host.querySelector('.tp'),FX=host.querySelector('.fx');
const uid='mz'+Math.random().toString(36).slice(2,7);
const cards=FS.map((F,k)=>{
 const b=document.createElement('button');b.type='button';b.className='cd';b.setAttribute('aria-label','Graph '+LET[k]);
 b.innerHTML='<span class="lt">'+LET[k]+'</span>';
 const svg=document.createElementNS(NS,'svg');svg.setAttribute('viewBox','0 0 '+W+' '+H);svg.setAttribute('aria-hidden','true');b.appendChild(svg);
 const el=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const q in a)e.setAttribute(q,a[q]);(p||svg).appendChild(e);return e};
 el('defs',{}).innerHTML='<clipPath id="'+uid+'c'+k+'"><rect x="'+PL+'" y="'+PT+'" width="'+pw+'" height="'+ph+'"/></clipPath>';
 const gG=el('g',{stroke:'var(--gr)','stroke-width':1});
 const ax=Math.min(Math.max(sy(0),PT),PT+ph),ay=Math.min(Math.max(sx(0),PL),PL+pw);
 for(let v=Math.ceil(x0);v<=x1+1e-9;v++){const X=sx(v);el('line',{x1:X,x2:X,y1:PT,y2:PT+ph},gG);if(v%dx===0&&v!==0&&v!==-1&&X>PL+8&&X<PL+pw-8){el('text',{x:X,y:ax+17,'text-anchor':'middle',class:'tl'}).textContent=fmt(v)}}
 for(let v=Math.ceil(y0);v<=y1+1e-9;v++){const Y=sy(v);el('line',{x1:PL,x2:PL+pw,y1:Y,y2:Y},gG);if(v%dy===0&&v!==0&&v!==-1&&Y>PT+10&&Y<PT+ph-6){el('text',{x:ay-6,y:Y+5,'text-anchor':'end',class:'tl'}).textContent=fmt(v)}}
 el('line',{x1:PL,x2:PL+pw,y1:ax,y2:ax,stroke:'var(--ax)','stroke-width':1.4});el('line',{x1:ay,x2:ay,y1:PT+ph,y2:PT-6,stroke:'var(--ax)','stroke-width':1.4});
 el('text',{x:PL+pw-2,y:ax-7,class:'al','text-anchor':'end'}).textContent='x';el('text',{x:ay+7,y:PT+8,class:'al'}).textContent='y';
 let d='',pen=false,py=null;for(let i=0;i<=400;i++){const x=x0+(x1-x0)*i/400,y=F.f(x);
  if(!isFinite(y)||Math.abs(y)>1e4||(py!==null&&Math.abs(y-py)>(y1-y0)*1.5)){pen=false;py=isFinite(y)?y:null;continue}
  d+=(pen?'L':'M')+sx(x).toFixed(1)+' '+sy(Math.max(y0-(y1-y0),Math.min(y1+(y1-y0),y))).toFixed(1);pen=true;py=y}
 const cv=el('path',{d,class:'cv',stroke:'#378ADD','clip-path':'url(#'+uid+'c'+k+')'});
 if(C.animate!==false&&cv.getTotalLength){const L=cv.getTotalLength();cv.style.strokeDasharray=L;cv.style.strokeDashoffset=L;cv.style.animation='mzdraw 1.1s ease-in-out '+(k*.25)+'s forwards'}
 const ft=document.createElement('span');ft.className='ft';ft.innerHTML='<span class="ph">Term antippen</span>';b.appendChild(ft);
 GS.appendChild(b);return{k,el:b,cv,ft,term:-1,right:false}});

/* Terme gemischt (fest, damit ein Neu-Laden gleich aussieht; nie in Graph-Reihenfolge) */
let order=SRC.map((s,i)=>i);const hs=s=>[...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
order.sort((a,b)=>hs(SRC[a]+'#'+a)-hs(SRC[b]+'#'+b));if(order.every((v,i)=>v===i))order.push(order.shift());
const terms=order.map(i=>{const b=document.createElement('button');b.type='button';b.className='tm';b.innerHTML='<span class="tx"><i>y</i> = '+pretty(SRC[i])+'</span>';b.setAttribute('aria-label','Term '+SRC[i]);TS.appendChild(b);return{i,el:b,card:-1,right:false}});

/* ---------- Antippen-Paare ---------- */
let sel=null;
function paint(){cards.forEach(c=>{c.el.classList.toggle('sel',sel&&sel.t==='c'&&sel.k===c.k);c.el.setAttribute('aria-pressed',sel&&sel.t==='c'&&sel.k===c.k?'true':'false');
  if(c.term>=0){const T=terms[c.term];if(c.ft.dataset.t!==String(c.term)){c.ft.innerHTML='<span class="pop">'+pretty(SRC[T.i])+'</span>';c.ft.dataset.t=String(c.term)}}else if(c.ft.dataset.t!=='-'){c.ft.innerHTML='<span class="ph">Term antippen</span>';c.ft.dataset.t='-'}});
 terms.forEach((T,j)=>{T.el.classList.toggle('sel',sel&&sel.t==='t'&&sel.k===j);T.el.classList.toggle('used',T.card>=0&&!T.right);
  const lt=T.el.querySelector('.lt');if(T.card>=0){if(!lt)T.el.insertAdjacentHTML('afterbegin','<span class="lt pop">'+LET[T.card]+'</span>');else lt.textContent=LET[T.card]}else if(lt)lt.remove()})}
function pair(k,j){const c=cards[k],T=terms[j];
 if(c.term>=0)terms[c.term].card=-1;if(T.card>=0)cards[T.card].term=-1;
 c.term=j;T.card=k;c.el.classList.remove('wrong');sel=null;TP.innerHTML='';paint()}
cards.forEach(c=>c.el.addEventListener('click',()=>{if(done||c.right)return;
 if(sel&&sel.t==='t'){pair(c.k,sel.k);return}
 sel=sel&&sel.t==='c'&&sel.k===c.k?null:{t:'c',k:c.k};paint()}));
terms.forEach((T,j)=>T.el.addEventListener('click',()=>{if(done||T.right)return;
 if(sel&&sel.t==='c'){pair(sel.k,j);return}
 sel=sel&&sel.t==='t'&&sel.k===j?null:{t:'t',k:j};paint()}));

/* ---------- prüfen ---------- */
const go=document.createElement('button');go.className='go';go.type='button';go.innerHTML='prüfen <span aria-hidden="true">✓</span>';CT.appendChild(go);
const say=t=>{const d=document.createElement('div');d.textContent=t;TP.appendChild(d)};
let done=false,fails=0;
go.onclick=()=>{if(done)return;TP.innerHTML='';sel=null;
 if(cards.some(c=>c.term<0)){paint();say('Ordne erst jedem Graphen einen Term zu ✏️ (erst Graph antippen, dann Term – oder umgekehrt).');return}
 let wrong=0;
 cards.forEach(c=>{if(c.right)return;const T=terms[c.term];
  if(T.i===c.k){c.right=T.right=true;c.el.classList.add('right');c.el.classList.remove('wrong');T.el.classList.add('right');c.cv.setAttribute('stroke','#1D9E75');c.el.setAttribute('aria-disabled','true');T.el.setAttribute('aria-disabled','true')}
  else{wrong++;c.el.classList.remove('wrong');void c.el.offsetWidth;c.el.classList.add('wrong')}});
 paint();
 if(!wrong){done=true;CT.innerHTML='';setTimeout(()=>confetti(GS),250);return}
 fails++;
 say(wrong===1?'Einer passt noch nicht – der ist markiert. Tausch ihn einfach um 🙂':wrong+' passen noch nicht – die sind markiert. Tausch sie einfach um 🙂');
 if(fails>=2)say('💡 Tipp: Setz x = 0 in die Terme ein – dann weißt du, wo sie die y-Achse schneiden. Und: Gerade, Parabel oder Kurve, die immer steiler wird?')};

function rel(e){const a=e.getBoundingClientRect(),b=host.getBoundingClientRect();return{x:a.left-b.left,y:a.top-b.top,w:a.width,h:a.height}}
function confetti(e){if(!document.body.animate)return;const b=rel(e),cx=b.x+b.w/2,cy=b.y+b.h*.6,cols=['#7F77DD','#1D9E75','#D4537E','#EF9F27','#378ADD','#E24B4A','#97C459'];
 for(let i=0;i<90;i++){const p=document.createElement('span'),w=5+Math.random()*5;p.className='cf';Object.assign(p.style,{left:cx+'px',top:cy+'px',width:w+'px',height:w*(Math.random()<.5?1.8:1)+'px',background:cols[i%cols.length],borderRadius:Math.random()<.3?'50%':'2px'});FX.appendChild(p);
  const a=.15+Math.random()*(Math.PI-.3),v=220+Math.random()*280,vx=Math.cos(a)*v*1.4,vy=-Math.sin(a)*v,g=560,D=1.4+Math.random()*.9,rot=(Math.random()-.5)*1000,kf=[];
  for(let k=0;k<=10;k++){const t=D*k/10;kf.push({transform:'translate('+vx*t+'px,'+(vy*t+g*t*t)+'px) rotate('+rot*t+'deg)',opacity:k<6?1:1-(k-6)/4})}
  p.animate(kf,{duration:D*1000,fill:'forwards'}).finished.then(()=>p.remove())}}
paint();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
