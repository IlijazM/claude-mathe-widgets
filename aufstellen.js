/*! claude-mathe-widgets · aufstellen.js · https://github.com/IlijazM/claude-mathe-widgets */
(function(){
var CSS=[
".ma{position:relative;padding:.5rem 0 1rem;--fs:26px;--ax:var(--text-secondary,#73726c);--gr:var(--border,rgba(0,0,0,.08));--acc:var(--text-accent,#185FA5);--mut:var(--text-secondary,#73726c);--ok:var(--text-success,#3B6D11);--warn:var(--text-warning,#BA7517);--wbg:var(--bg-warning,#FAEEDA);font-family:var(--font-voice,Georgia),Georgia,'Times New Roman',serif;color:var(--text-primary,#1f1e1d)}",
".ma svg{display:block;width:100%;height:auto;user-select:none}",
".ma .tl{font:13px var(--font-sans,system-ui),system-ui,sans-serif;fill:var(--ax)}.ma .al{font:italic 17px var(--font-voice,Georgia),Georgia,serif;fill:var(--text-primary,#1f1e1d)}",
".ma .pl{font:13px var(--font-sans,system-ui),system-ui,sans-serif;fill:var(--text-primary,#1f1e1d);paint-order:stroke;stroke:var(--surface-0,#fff);stroke-width:4px;stroke-linejoin:round}",
".ma .cv{fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;transition:stroke .4s}",
".ma .dt{transform-box:fill-box;transform-origin:center;animation:mapop .45s ease-out backwards}",
".ma .fm{display:flex;justify-content:center;align-items:center;flex-wrap:nowrap;white-space:nowrap;font-size:var(--fs);min-height:2.4em;margin-top:.4rem}",
".ma i{font-style:italic}",
".ma sup{font-size:.62em;position:relative;top:-.72em;line-height:0;margin-left:.05em;display:inline-flex;align-items:center}",
".ma .fr{display:inline-flex;flex-direction:column;align-items:center;font-size:.78em;line-height:1.12;vertical-align:middle;margin:0 .06em}.ma .fr>span:last-child{border-top:1.5px solid currentColor;padding:0 .12em;min-width:100%;text-align:center;box-sizing:border-box}",
".ma .op{margin:0 .28em}",
".ma .gp{box-sizing:content-box;width:1.4ch;min-width:1.1em;height:1.3em;padding:.04em .28em;margin:0 .06em;border:1.5px dashed var(--border-strong,rgba(0,0,0,.3));border-radius:.32em;background:var(--surface-2,#fff);color:inherit;font:inherit;font-size:.85em;text-align:center;outline:none;box-shadow:none;transition:border-color .15s,background .2s,box-shadow .15s,width .12s}",
".ma sup .gp{font-size:1em;border-radius:.4em}",
".ma .gp:focus{border-color:var(--acc);border-style:solid;box-shadow:0 0 0 3px var(--bg-accent,#E6F1FB)}",
".ma .gp.no{border-color:var(--warn);background:var(--wbg);animation:mawig .4s}.ma .gp.em{border-color:var(--warn)}",
".ma .ok{color:var(--ok);display:inline-flex;align-items:center;animation:mapop2 .45s cubic-bezier(.3,1.7,.5,1)}",
".ma .dd{display:inline-flex;align-items:center;border-bottom:4.5px double var(--ok);padding:0 .12em .04em;animation:main .45s ease-out both}",
".ma .ctl{display:flex;justify-content:center;align-items:center;gap:10px;flex-wrap:wrap;margin-top:.3rem}",
".ma .go{height:38px;padding:0 14px;border-radius:12px;border:none;background:var(--bg-accent,#E6F1FB);color:var(--text-accent,#185FA5);font:500 14px var(--font-sans,system-ui),system-ui,sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:6px}.ma .go:hover{filter:brightness(.97)}",
".ma .tp{font:14px/1.5 var(--font-sans,system-ui),system-ui,sans-serif;color:var(--mut);text-align:center;margin:.5rem auto 0;max-width:34em}.ma .tp div{animation:main .35s ease-out both}.ma .tp div+div{margin-top:.25rem}",
".ma .kb{display:inline-flex;gap:4px;padding:4px;background:var(--surface-2,#fff);border:1.5px dashed var(--border-strong,rgba(0,0,0,.25));border-radius:12px}",
".ma .kb button{-webkit-tap-highlight-color:transparent;min-width:42px;height:36px;border:none;border-radius:9px;background:var(--surface-1,#f5f4ef);color:inherit;font:20px var(--font-voice,Georgia),Georgia,serif;cursor:pointer}",
".ma .fx{position:absolute;inset:0;pointer-events:none;z-index:4;overflow:hidden}.ma .cf{position:absolute;display:block;pointer-events:none}",
"@keyframes madraw{to{stroke-dashoffset:0}}",
"@keyframes mapop{0%{transform:scale(0)}70%{transform:scale(1.4)}100%{transform:scale(1)}}",
"@keyframes mapop2{0%{transform:scale(.3);opacity:0}100%{transform:scale(1);opacity:1}}",
"@keyframes mawig{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}",
"@keyframes main{from{opacity:0;transform:translateY(-8px)}}",
"@media (pointer:coarse){.ma .gp{font-size:16px}}"
].join("\n");
var HTML="<svg viewBox=\"0 0 680 400\" role=\"img\" aria-label=\"Graph einer Funktion mit markierten Punkten\"></svg><div class=\"fm\"></div><div class=\"ctl\"></div><div class=\"tp\" aria-live=\"polite\"></div><div class=\"fx\"></div>";
function readCfg(host){
 var a=host.getAttribute('data-config');
 if(a){try{return JSON.parse(a)}catch(e){throw new Error('data-config ist kein gültiges JSON: '+e.message)}}
 return window.CONFIG||null;
}
function fail(host,msg){host.className='';host.innerHTML='<div style="font:13px system-ui,sans-serif;color:var(--text-danger,#A32D2D);text-align:center;padding:8px 0">'+String(msg).replace(/</g,'&lt;')+'</div>'}
function start(host,cfg){
 if(!document.getElementById("ma-css")){var st=document.createElement('style');st.id="ma-css";st.textContent=CSS;document.head.appendChild(st)}
 host.className="ma";host.innerHTML=HTML;
 try{run(cfg,host)}catch(e){fail(host,'Widget-Fehler: '+(e&&e.message||e))}
}
function boot(){
 var host=document.getElementById("ma");
 if(!host){host=document.createElement('div');host.id="ma";document.body.appendChild(host)}
 if(host.getAttribute('data-started'))return;
 var t0=Date.now();
 (function tryIt(){
  var cfg;try{cfg=readCfg(host)}catch(e){return fail(host,e.message)}
  if(cfg){host.setAttribute('data-started','1');return start(host,cfg)}
  if(Date.now()-t0<3000)return setTimeout(tryIt,50);
  fail(host,'Keine CONFIG gefunden – data-config am Container fehlt.');
 })();
}
window["MatheAufstellen"]=function(cfg){var host=document.getElementById("ma");if(host){host.setAttribute('data-started','1');start(host,cfg)}};

function run(C,host){
/* ---------- Brüche ---------- */
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a||1};
function Q(n,d){if(d===undefined)d=1;if(!d)throw new Error('Division durch 0');if(d<0){n=-n;d=-d}const g=gcd(n,d);return{n:n/g,d:d/g}}
const qd=(a,b)=>Q(a.n*b.d,a.d*b.n),qneg=a=>Q(-a.n,a.d),qeq=(a,b)=>a.n===b.n&&a.d===b.d,V=q=>q.n/q.d;
function qdec(t){const p=t.split('.');const f=p[1]||'';return Q(parseInt((p[0]||'0')+f,10),Math.pow(10,f.length))}
function parseAns(raw){let s=String(raw).replace(/[−–]/g,'-').replace(/,/g,'.').replace(/\s+/g,'').replace(/[÷:]/g,'/');
 if(!s)return null;while(/^\(.*\)$/.test(s))s=s.slice(1,-1);
 const m=s.match(/^([+-]?)(\d+(?:\.\d*)?|\.\d+)(?:\/\(?([+-]?)(\d+(?:\.\d*)?)\)?)?$/);if(!m)return false;
 try{let v=qdec(m[2]);if(m[4]!==undefined){const d=qdec(m[4]);if(!d.n)return false;v=qd(v,d);if(m[3]==='-')v=qneg(v)}if(m[1]==='-')v=qneg(v);return v}catch(e){return false}}
function same(v,want,raw){if(qeq(v,want))return true;const m=String(raw).replace(/,/g,'.').match(/\.(\d+)\s*$/);if(!m||/\//.test(raw)||m[1].length<2)return false;
 return Math.abs(V(v)-V(want))<=0.5*Math.pow(10,-m[1].length)+1e-12}
function num(v,key){if(typeof v==='string'){const r=parseAns(v);if(r)return r}
 if(typeof v!=='number'||!isFinite(v))throw new Error('CONFIG: "'+key+'" muss eine Zahl sein.');
 for(const d of[1,2,3,4,5,6,8,10,100,1000]){const r=Math.round(v*d);if(Math.abs(v*d-r)<1e-9)return Q(r,d)}throw new Error('CONFIG: "'+key+'" bitte als einfache Zahl oder Bruch angeben.')}

/* ---------- CONFIG prüfen ---------- */
if(!C||typeof C!=='object')throw new Error('CONFIG fehlt.');
const TY={linear:'linear',linea:'linear',gerade:'linear',potenz:'potenz',power:'potenz',exponentiell:'exp',exponential:'exp',exp:'exp'}[String(C.type||'').toLowerCase().trim()];
if(!TY)throw new Error('CONFIG: "type" muss "linear", "potenz" oder "exponentiell" sein.');
const NAME=String(C.name||'f').trim()||'f';
let P;
if(TY==='linear'){if(C.m==null||C.b==null)throw new Error('CONFIG: Für "linear" braucht es "m" und "b".');P={m:num(C.m,'m'),b:num(C.b,'b')}}
else if(TY==='potenz'){if(C.a==null||C.n==null)throw new Error('CONFIG: Für "potenz" braucht es "a" und "n".');P={a:num(C.a,'a'),n:num(C.n,'n')};if(P.n.d!==1||P.n.n<1||P.n.n>5)throw new Error('CONFIG: "n" muss eine ganze Zahl von 1 bis 5 sein.');if(!P.a.n)throw new Error('CONFIG: "a" darf nicht 0 sein.')}
else{if(C.a==null||C.b==null)throw new Error('CONFIG: Für "exponentiell" braucht es "a" und "b".');P={a:num(C.a,'a'),b:num(C.b,'b')};if(V(P.b)<=0||V(P.b)===1)throw new Error('CONFIG: "b" muss größer als 0 und ungleich 1 sein.');if(!P.a.n)throw new Error('CONFIG: "a" darf nicht 0 sein.')}
const f=TY==='linear'?x=>V(P.m)*x+V(P.b):TY==='potenz'?x=>V(P.a)*Math.pow(x,P.n.n):x=>V(P.a)*Math.pow(V(P.b),x);

/* ---------- Bereich und Punkte ---------- */
let[x0,x1]=Array.isArray(C.x)&&C.x[1]>C.x[0]?C.x:(TY==='exp'?[-3,4]:[-5,5]);
const isInt=v=>Math.abs(v-Math.round(v))<1e-9;
let pts=[];
if(Array.isArray(C.points)&&C.points.length){pts=C.points.map(p=>Array.isArray(p)?{x:+p[0],y:+p[1]}:{x:+p.x,y:+p.y}).filter(p=>isFinite(p.x)&&isFinite(p.y))}
else{const cand=[];for(let x=Math.ceil(x0);x<=x1;x++){const y=f(x);if(isFinite(y)&&isInt(y)&&Math.abs(y)<=12)cand.push({x,y:Math.round(y)})}
 cand.sort((a,b)=>Math.abs(a.x)-Math.abs(b.x)||b.x-a.x);
 const want=TY==='linear'?2:3;for(const c of cand){if(pts.length>=want)break;if(!pts.some(p=>p.y===c.y&&TY!=='potenz'))pts.push(c)}
 if(pts.length<want)for(const c of cand){if(pts.length>=want)break;if(!pts.includes(c))pts.push(c)}}
let y0,y1;
if(Array.isArray(C.y)&&C.y[1]>C.y[0])[y0,y1]=C.y;
else{const ys=pts.map(p=>p.y).concat([0]);let lo=Math.min(...ys),hi=Math.max(...ys);
 y0=Math.floor(lo)-2;y1=Math.ceil(hi)+2;if(y1-y0<6){const c=(y0+y1)/2;y0=Math.floor(c-3);y1=Math.ceil(c+3)}}

/* ---------- Zeichnen ---------- */
const svg=host.querySelector('svg'),NS='http://www.w3.org/2000/svg',W=680,H=400,PL=40,PR=24,PT=22,PB=30,pw=W-PL-PR,ph=H-PT-PB;
const el=(t,a,p)=>{const e=document.createElementNS(NS,t);for(const k in a)e.setAttribute(k,a[k]);(p||svg).appendChild(e);return e};
const sx=x=>PL+(x-x0)/(x1-x0)*pw,sy=y=>PT+(y1-y)/(y1-y0)*ph;
const fmt=v=>String(+v.toFixed(2)).replace('.',',').replace('-','−');
const stp=r=>r<=12?1:r<=24?2:5,dx=stp(x1-x0),dy=stp(y1-y0),uid='ma'+Math.random().toString(36).slice(2,7);
el('defs',{}).innerHTML='<clipPath id="'+uid+'c"><rect x="'+PL+'" y="'+PT+'" width="'+pw+'" height="'+ph+'"/></clipPath><marker id="'+uid+'a" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1L9 5L1 9" fill="none" stroke="var(--text-secondary,#73726c)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></marker>';
const gG=el('g',{stroke:'var(--gr)','stroke-width':1});
const ax=Math.min(Math.max(sy(0),PT),PT+ph),ay=Math.min(Math.max(sx(0),PL),PL+pw);
for(let v=Math.ceil(x0);v<=x1+1e-9;v++){const X=sx(v);el('line',{x1:X,x2:X,y1:PT,y2:PT+ph},gG);if(v%dx===0&&v!==0&&X>PL+8&&X<PL+pw-14){el('line',{x1:X,x2:X,y1:ax-4,y2:ax+4,stroke:'var(--ax)','stroke-width':1.2});el('text',{x:X,y:ax+19,'text-anchor':'middle',class:'tl'}).textContent=fmt(v)}}
for(let v=Math.ceil(y0);v<=y1+1e-9;v++){const Y=sy(v);el('line',{x1:PL,x2:PL+pw,y1:Y,y2:Y},gG);if(v%dy===0&&v!==0&&Y>PT+12&&Y<PT+ph-8){el('line',{x1:ay-4,x2:ay+4,y1:Y,y2:Y,stroke:'var(--ax)','stroke-width':1.2});el('text',{x:ay-8,y:Y+4,'text-anchor':'end',class:'tl'}).textContent=fmt(v)}}
el('line',{x1:PL,x2:PL+pw+10,y1:ax,y2:ax,stroke:'var(--ax)','stroke-width':1.4,'marker-end':'url(#'+uid+'a)'});
el('line',{x1:ay,x2:ay,y1:PT+ph,y2:PT-10,stroke:'var(--ax)','stroke-width':1.4,'marker-end':'url(#'+uid+'a)'});
el('text',{x:PL+pw+6,y:ax-10,class:'al','text-anchor':'end'}).textContent='x';
el('text',{x:ay+10,y:PT-2,class:'al'}).textContent='y';
if(sx(0)>=PL&&sx(0)<=PL+pw&&sy(0)>=PT&&sy(0)<=PT+ph)el('text',{x:ay-7,y:ax+18,'text-anchor':'end',class:'tl'}).textContent='0';
let d='',pen=false;for(let i=0;i<=600;i++){const x=x0+(x1-x0)*i/600,y=f(x);if(!isFinite(y)||Math.abs(y)>1e4){pen=false;continue}d+=(pen?'L':'M')+sx(x).toFixed(1)+' '+sy(Math.max(y0-(y1-y0),Math.min(y1+(y1-y0),y))).toFixed(1);pen=true}
const cv=el('path',{d,class:'cv',stroke:'#378ADD','clip-path':'url(#'+uid+'c)'});
if(C.animate!==false&&cv.getTotalLength){const L=cv.getTotalLength();cv.style.strokeDasharray=L;cv.style.strokeDashoffset=L;cv.style.animation='madraw 1.3s ease-in-out forwards'}
pts.forEach((p,i)=>{if(p.x<x0||p.x>x1||p.y<y0||p.y>y1)return;const c=el('circle',{cx:sx(p.x),cy:sy(p.y),r:6,fill:'var(--text-primary,#1f1e1d)',stroke:'var(--surface-0,#fff)','stroke-width':2,class:'dt'});c.style.animationDelay=(C.animate!==false?1.3+i*.15:0)+'s';
 if(C.coords){const t=el('text',{x:sx(p.x)+10,y:sy(p.y)-10,class:'pl dt'});t.textContent='('+fmt(p.x)+' | '+fmt(p.y)+')';t.style.animationDelay=c.style.animationDelay}});

/* ---------- Vorlage mit Lücken ---------- */
const FM=host.querySelector('.fm'),CT=host.querySelector('.ctl'),TP=host.querySelector('.tp'),FX=host.querySelector('.fx');
const X='<i>x</i>',nameH='<i>'+String(NAME).replace(/</g,'&lt;')+'</i>('+X+')&#8201;=&#8201;';
const TIP={
 m:'Geh auf dem Graphen genau 1 nach rechts: Um wie viel geht es hoch (+) oder runter (−)? Das ist m.',
 b:'Wo schneidet der Graph die y-Achse? Diese Zahl ist b.',
 pa:'Setz x = 1 ein: 1 hoch irgendwas ist 1 – also ist f(1) genau a.',
 pn:'Schau bei x = 2: f(2) = a · 2ⁿ. Wie oft musst du mit 2 malnehmen?',
 ea:'Bei x = 0 ist b⁰ = 1 – also ist f(0) genau a.',
 eb:'Geh von x = 0 zu x = 1: Mit welcher Zahl wird der y-Wert malgenommen?'
};
const gaps=[];
function gap(want,kind){const i=document.createElement('input');i.className='gp';i.type='text';i.setAttribute('inputmode','decimal');i.setAttribute('autocomplete','off');i.setAttribute('autocorrect','off');i.setAttribute('autocapitalize','off');i.spellcheck=false;i.setAttribute('aria-label','Lücke '+(kind.length>1?kind.slice(1):kind));
 const g={want,kind,el:i,tries:0,ok:false};const sz=()=>{i.style.width=(Math.max(1,[...i.value].length)*0.62+0.5)+'em'};sz();
 i.addEventListener('input',()=>{sz();i.classList.remove('no','em')});i.addEventListener('focus',()=>{kbFor=i});
 i.addEventListener('keydown',ev=>{if(ev.key==='Enter'){ev.preventDefault();const nx=gaps.find(x=>!x.ok&&x!==g&&!x.el.value.trim());if(nx)nx.el.focus();else check()}});
 gaps.push(g);return g}
const sp=h=>{const s=document.createElement('span');s.innerHTML=h;return s};
FM.appendChild(sp(nameH));
if(TY==='linear'){FM.appendChild(gap(P.m,'m').el);FM.appendChild(sp(X));FM.appendChild(sp('<span class="op">+</span>'));FM.appendChild(gap(P.b,'b').el)}
else if(TY==='potenz'){FM.appendChild(gap(P.a,'pa').el);FM.appendChild(sp('<span class="op">·</span>'+X));const s=document.createElement('sup');s.appendChild(gap(P.n,'pn').el);FM.appendChild(s)}
else{FM.appendChild(gap(P.a,'ea').el);FM.appendChild(sp('<span class="op">·</span>'));FM.appendChild(gap(P.b,'eb').el);const s=document.createElement('sup');s.innerHTML=X;FM.appendChild(s)}
const coarse=window.matchMedia&&matchMedia('(pointer:coarse)').matches;let kbFor=null;
if(coarse){const K=document.createElement('div');K.className='kb';[['−','-'],['/','/'],[',',',']].forEach(([l,ch])=>{const b=document.createElement('button');b.type='button';b.textContent=l;b.setAttribute('aria-label',l==='−'?'Minus':l==='/'?'Bruchstrich':'Komma');
  b.addEventListener('pointerdown',ev=>{ev.preventDefault();const i=kbFor;if(!i||!i.isConnected)return;if(ch==='-'){i.value=/^[-−]/.test(i.value)?i.value.replace(/^[-−]/,''):'−'+i.value}else{const a=i.selectionStart!=null?i.selectionStart:i.value.length;i.value=i.value.slice(0,a)+ch+i.value.slice(i.selectionEnd!=null?i.selectionEnd:a);try{i.setSelectionRange(a+1,a+1)}catch(e){}}i.dispatchEvent(new Event('input'))});K.appendChild(b)});CT.appendChild(K)}
const go=document.createElement('button');go.className='go';go.type='button';go.innerHTML='prüfen <span aria-hidden="true">✓</span>';go.onclick=()=>check();CT.appendChild(go);
const say=t=>{const d=document.createElement('div');d.textContent=t;TP.appendChild(d)};
const fi=n=>String(n).replace('-','−');
function qh(q,inl){if(q.d===1)return fi(q.n);const s=q.n<0?'−':'';if([2,4,5,8,10,20,25,50,100].includes(q.d))return s+String(Math.abs(q.n)/q.d).replace('.',',');return inl?s+Math.abs(q.n)+'/'+q.d:s+'<span class="fr"><span>'+Math.abs(q.n)+'</span><span>'+q.d+'</span></span>'}
function check(){if(done)return;TP.innerHTML='';let any=false,all=true;const tips=[];
 gaps.forEach(g=>{if(g.ok)return;const raw=g.el.value.trim(),v=parseAns(raw);if(v===null){all=false;g.el.classList.add('em');return}any=true;
  if(v&&same(v,g.want,raw)){g.ok=true;const s=document.createElement('span');s.className='ok';s.innerHTML=qh(g.want,g.kind==='pn');g.el.replaceWith(s);return}
  all=false;g.tries++;g.el.classList.remove('no');void g.el.offsetWidth;g.el.classList.add('no');if(g.tries>=2)tips.push(TIP[g.kind])});
 if(!any&&!all){say('Füll erst mal die gestrichelten Kästchen aus ✏️');return}
 tips.slice(0,2).forEach(t=>say('💡 '+t));
 if(all)finish();else{const n=gaps.find(g=>!g.ok&&g.el.classList.contains('no'))||gaps.find(g=>!g.ok);if(n)n.el.focus()}}
let done=false;
function pretty(){const one=q=>q.n===q.d,mone=q=>q.n===-q.d;
 if(TY==='linear'){const{m,b}=P;let s='';if(m.n)s=(one(m)?'':mone(m)?'−':qh(m))+X;if(b.n){if(s)s+='<span class="op">'+(b.n<0?'−':'+')+'</span>'+qh(Q(Math.abs(b.n),b.d));else s=qh(b)}return s||'0'}
 if(TY==='potenz'){const{a,n}=P;return(one(a)?'':mone(a)?'−':qh(a)+'<span class="op">·</span>')+X+(n.n===1?'':'<sup>'+n.n+'</sup>')}
 const{a,b}=P;const bb=b.d===1?qh(b):'('+qh(b,1)+')';return(one(a)?'':mone(a)?'−':qh(a)+'<span class="op">·</span>')+bb+'<sup>'+X+'</sup>'}
function finish(){done=true;CT.innerHTML='';TP.innerHTML='';
 setTimeout(()=>{FM.innerHTML='';FM.appendChild(sp(nameH));const r=document.createElement('span');r.className='dd';r.innerHTML=pretty();FM.appendChild(r);fit();cv.setAttribute('stroke','#1D9E75');setTimeout(()=>confetti(r),300)},450)}
function rel(e){const a=e.getBoundingClientRect(),b=host.getBoundingClientRect();return{x:a.left-b.left,y:a.top-b.top,w:a.width,h:a.height}}
function confetti(e){if(!document.body.animate)return;const b=rel(e),cx=b.x+b.w/2,cy=b.y,cols=['#7F77DD','#1D9E75','#D4537E','#EF9F27','#378ADD','#E24B4A','#97C459'];
 for(let i=0;i<80;i++){const p=document.createElement('span'),w=5+Math.random()*5;p.className='cf';Object.assign(p.style,{left:cx+'px',top:cy+'px',width:w+'px',height:w*(Math.random()<.5?1.8:1)+'px',background:cols[i%cols.length],borderRadius:Math.random()<.3?'50%':'2px'});FX.appendChild(p);
  const a=.15+Math.random()*(Math.PI-.3),v=200+Math.random()*260,vx=Math.cos(a)*v*1.4,vy=-Math.sin(a)*v,g=560,D=1.4+Math.random()*.9,rot=(Math.random()-.5)*1000,kf=[];
  for(let k=0;k<=10;k++){const t=D*k/10;kf.push({transform:'translate('+vx*t+'px,'+(vy*t+g*t*t)+'px) rotate('+rot*t+'deg)',opacity:k<6?1:1-(k-6)/4})}
  p.animate(kf,{duration:D*1000,fill:'forwards'}).finished.then(()=>p.remove())}}
function fit(){let fs=26;host.style.setProperty('--fs',fs+'px');let g=0;while(g++<20&&fs>14&&FM.scrollWidth>FM.clientWidth+1){fs-=1;host.style.setProperty('--fs',fs+'px')}}
fit();let rz;window.addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(fit,120)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
