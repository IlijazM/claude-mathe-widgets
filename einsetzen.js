/*! claude-mathe-widgets · einsetzen.js · https://github.com/IlijazM/claude-mathe-widgets */
(function(){
var CSS=[
".me{position:relative;padding:.75rem 0 1rem;--fs:26px;--acc:var(--text-accent,#185FA5);--mut:var(--text-secondary,#73726c);--ok:var(--text-success,#3B6D11);--warn:var(--text-warning,#BA7517);--wbg:var(--bg-warning,#FAEEDA);--hl:rgba(250,199,117,.6);font-family:var(--font-voice,Georgia),Georgia,'Times New Roman',serif;color:var(--text-primary,#1f1e1d)}",
".me .bk{position:relative}",
".me .bk+.bk{margin-top:1rem;padding-top:.9rem;border-top:1.5px dashed var(--border-strong,rgba(0,0,0,.2))}",
".me .gd{display:grid;grid-template-columns:auto auto auto;justify-content:center;align-items:center;grid-auto-rows:minmax(2.1em,auto);font-size:var(--fs);width:max-content;max-width:100%;margin:0 auto}",
".me .gd>span{white-space:nowrap}.me .la{justify-self:end}.me .eq{padding:0 .32em;justify-self:center}.me .bd{justify-self:start}",
".me .df{color:var(--mut);font-size:.72em}.me .gd>.df.eq{padding:0 .2em}",
".me .t{display:inline-block}.me .op{margin:0 .25em}.me .op.f{margin:0 .06em 0 0}",
".me i{font-style:italic}",
".me sup{font-size:.6em;position:relative;top:-.7em;line-height:0;margin-left:.04em}",
".me .fr{display:inline-flex;flex-direction:column;align-items:center;font-size:.78em;line-height:1.12;vertical-align:middle;margin:0 .06em}.me .fr>span:last-child{border-top:1.5px solid currentColor;padding:0 .12em;min-width:100%;text-align:center;box-sizing:border-box}",
".me .v{color:var(--acc)}",
".me .gp{box-sizing:content-box;width:1.4ch;min-width:1.1em;height:1.3em;padding:.04em .28em;margin:0 .06em;border:1.5px dashed var(--border-strong,rgba(0,0,0,.3));border-radius:.32em;background:var(--surface-2,#fff);color:inherit;font:inherit;font-size:.85em;text-align:center;outline:none;box-shadow:none;transition:border-color .15s,background .2s,box-shadow .15s,width .12s}",
".me .gp:focus{border-color:var(--acc);border-style:solid;box-shadow:0 0 0 3px var(--bg-accent,#E6F1FB)}",
".me .gp.no{border-color:var(--warn);background:var(--wbg);animation:mewig .4s}.me .gp.em{border-color:var(--warn)}",
".me .ok{color:var(--ok);display:inline-block;animation:mepop .45s cubic-bezier(.3,1.7,.5,1)}",
".me .pz{display:inline-block;border-radius:.3em;padding:0 .18em;background:var(--hl);color:inherit;animation:mepulse 1.1s ease-in-out .3s 4}",
".me .dd{display:inline-block;border-bottom:4.5px double var(--ok);padding:0 .1em .02em}",
".me .in{animation:mein .45s ease-out both}.me .pp{display:inline-block;animation:mepop .5s cubic-bezier(.3,1.7,.5,1) both}",
".me .ctl{display:flex;justify-content:center;align-items:center;gap:10px;flex-wrap:wrap;margin-top:.35rem}",
".me .go{height:38px;padding:0 14px;border-radius:12px;border:none;background:var(--bg-accent,#E6F1FB);color:var(--text-accent,#185FA5);font:500 14px var(--font-sans,system-ui),system-ui,sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:6px}.me .go:hover{filter:brightness(.97)}",
".me .tp{font:14px/1.5 var(--font-sans,system-ui),system-ui,sans-serif;color:var(--mut);text-align:center;margin:.5rem auto 0;max-width:34em}",
".me .tp div{animation:mein .35s ease-out both}.me .tp div+div{margin-top:.25rem}",
".me .kb{display:inline-flex;gap:4px;padding:4px;background:var(--surface-2,#fff);border:1.5px dashed var(--border-strong,rgba(0,0,0,.25));border-radius:12px}",
".me .kb button{-webkit-tap-highlight-color:transparent;min-width:42px;height:36px;border:none;border-radius:9px;background:var(--surface-1,#f5f4ef);color:inherit;font:20px var(--font-voice,Georgia),Georgia,serif;cursor:pointer}",
".me .fx{position:absolute;inset:0;pointer-events:none;z-index:4;overflow:hidden}.me .cf{position:absolute;display:block;pointer-events:none}",
".me .err{font:13px var(--font-sans,system-ui),system-ui,sans-serif;color:var(--text-danger,#A32D2D);text-align:center;padding:4px 0}",
"@keyframes mepop{0%{transform:scale(.3);opacity:0}100%{transform:scale(1);opacity:1}}",
"@keyframes mewig{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}",
"@keyframes mein{from{opacity:0;transform:translateY(-8px)}}",
"@keyframes mepulse{0%,100%{transform:scale(1)}50%{transform:scale(1.35)}}",
"@media (pointer:coarse){.me .gp{font-size:16px}}"
].join("\n");
var HTML="<div class=\"bks\"></div><div class=\"fx\"></div>";
function readCfg(host){
 var a=host.getAttribute('data-config');
 if(a){try{return JSON.parse(a)}catch(e){throw new Error('data-config ist kein gültiges JSON: '+e.message)}}
 return window.CONFIG||null;
}
function fail(host,msg){host.className='';host.innerHTML='<div style="font:13px system-ui,sans-serif;color:var(--text-danger,#A32D2D);text-align:center;padding:8px 0">'+String(msg).replace(/</g,'&lt;')+'</div>'}
function start(host,cfg){
 if(!document.getElementById("me-css")){var st=document.createElement('style');st.id="me-css";st.textContent=CSS;document.head.appendChild(st)}
 host.className="me";host.innerHTML=HTML;
 try{run(cfg,host)}catch(e){fail(host,'Widget-Fehler: '+(e&&e.message||e))}
}
function boot(){
 var host=document.getElementById("me");
 if(!host){host=document.createElement('div');host.id="me";document.body.appendChild(host)}
 if(host.getAttribute('data-started'))return;
 var t0=Date.now();
 (function tryIt(){
  var cfg;try{cfg=readCfg(host)}catch(e){return fail(host,e.message)}
  if(cfg){host.setAttribute('data-started','1');return start(host,cfg)}
  if(Date.now()-t0<3000)return setTimeout(tryIt,50);
  fail(host,'Keine CONFIG gefunden – data-config am Container fehlt.');
 })();
}
window["MatheEinsetzen"]=function(cfg){var host=document.getElementById("me");if(host){host.setAttribute('data-started','1');start(host,cfg)}};

function run(C,host){
/* ---------- CONFIG prüfen ---------- */
if(!C||typeof C!=='object')throw new Error('CONFIG fehlt.');
const MODE=String(C.mode||'').toLowerCase().trim();
if(MODE!=='luecken'&&MODE!=='lücken'&&MODE!=='probe')throw new Error('CONFIG: "mode" muss "luecken" oder "probe" sein.');
const LU=MODE!=='probe';
let FNS=Array.isArray(C.functions)?C.functions.map((d,k)=>typeof d==='string'?{name:'fgh'[k],expr:d}:d):(C.expr!=null?[{name:C.name||'f',expr:C.expr}]:[]);
FNS=FNS.filter(d=>d&&d.expr!=null&&String(d.expr).trim());
if(!FNS.length)throw new Error('CONFIG: "expr" (die Funktion) fehlt.');
if(FNS.length>(LU?1:3))throw new Error(LU?'Im Modus "luecken" geht genau eine Funktion.':'Höchstens 3 Funktionen.');
const BKS=host.querySelector('.bks'),FX=host.querySelector('.fx');

/* ---------- Brüche ---------- */
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a||1};
function Q(n,d){if(d===undefined)d=1;if(!d)throw new Error('Division durch 0');if(d<0){n=-n;d=-d}const g=gcd(n,d);n/=g;d/=g;if(Math.abs(n)>1e13||d>1e13)throw new Error('Zahlen zu groß');return{n,d}}
const qa=(a,b)=>Q(a.n*b.d+b.n*a.d,a.d*b.d),qm=(a,b)=>Q(a.n*b.n,a.d*b.d),qd=(a,b)=>{if(!b.n)throw new Error('Division durch 0');return Q(a.n*b.d,a.d*b.n)};
const qneg=a=>Q(-a.n,a.d),qabs=a=>Q(Math.abs(a.n),a.d),qeq=(a,b)=>a.n===b.n&&a.d===b.d,qz=a=>a.n===0,q1=a=>a.n===1&&a.d===1,ONE=Q(1),ZERO=Q(0);
function qdec(t){const p=t.split('.');const f=p[1]||'';return Q(parseInt((p[0]||'0')+f,10),Math.pow(10,f.length))}
const qpowi=(a,n)=>{let r=ONE;for(let k=0;k<n;k++)r=qm(r,a);return r};
const qnum=v=>{if(typeof v==='number'&&isFinite(v)){for(const d of[1,2,3,4,5,6,8,10,100,1000]){const r=Math.round(v*d);if(Math.abs(v*d-r)<1e-9)return Q(r,d)}}if(typeof v==='string'){const r=parseAns(v);if(r)return r}throw new Error('CONFIG: "x" muss eine Zahl sein.')};

/* ---------- Polynom einlesen: Summe aus a·xⁿ (n = 0, 1, 2, …) ---------- */
function prep(src){let s=String(src).replace(/^\s*[a-zA-Z]\s*\(\s*x\s*\)\s*=|^\s*y\s*=/,'');
 s=s.replace(/[−–]/g,'-').replace(/[·×∙⋅]/g,'*').replace(/[÷:]/g,'/').replace(/(\d),(\d)/g,'$1.$2');
 const SUP='⁰¹²³⁴⁵⁶⁷⁸⁹';s=s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]+/g,m=>'^'+[...m].map(c=>SUP.indexOf(c)).join(''));return s}
function lex(s){const tk=[];let i=0;
 while(i<s.length){const c=s[i];if(/\s/.test(c)){i++;continue}
  if(/[\d.]/.test(c)){let j=i;while(j<s.length&&/[\d.]/.test(s[j]))j++;const t=s.slice(i,j);if(t==='.'||(t.match(/\./g)||[]).length>1)throw new Error('Die Zahl „'+t+'“ versteh ich nicht.');tk.push({t:'n',v:qdec(t),raw:t});i=j;continue}
  if(c==='x'||c==='X'){tk.push({t:'x'});i++;continue}
  if('+-*/^()'.includes(c)){tk.push({t:c});i++;continue}
  throw new Error('„'+c+'“ kann das Widget nicht – nur Summen aus a·xⁿ, z. B. x² − 4 oder 2x³ − x + 1.')}
 return tk}
function parsePoly(src){const tk=lex(prep(src));let p=0;const pk=()=>tk[p],nx=()=>tk[p++];
 const starts=t=>t&&(t.t==='n'||t.t==='x'||t.t==='(');
 const mul=(a,b)=>({c:qm(a.c,b.c),e:a.e+b.e});
 function T(){let a=U();for(;;){const t=pk();if(t&&t.t==='*'){nx();a=mul(a,U())}else if(t&&t.t==='/'){nx();const b=U();if(b.e)throw new Error('x im Nenner kann das Widget nicht.');a={c:qd(a.c,b.c),e:a.e}}else if(starts(t))a=mul(a,Pw());else return a}}
 function U(){if(pk()&&pk().t==='-'){nx();const a=U();return{c:qneg(a.c),e:a.e}}if(pk()&&pk().t==='+'){nx();return U()}return Pw()}
 function Pw(){const a=Pr();if(pk()&&pk().t==='^'){nx();let neg=false;if(pk()&&pk().t==='-'){nx();neg=true}const t=nx();if(!t||t.t!=='n'||t.v.d!==1||neg)throw new Error('Exponenten müssen ganze Zahlen ≥ 0 sein.');const n=t.v.n;if(n>6)throw new Error('Exponent zu groß.');return{c:qpowi(a.c,n),e:a.e*n}}return a}
 function Pr(){const t=nx();if(!t)throw new Error('Da fehlt noch was am Ende.');
  if(t.t==='n')return{c:t.v,e:0};if(t.t==='x')return{c:ONE,e:1};
  if(t.t==='('){const a=T();if(!pk()||nx().t!==')')throw new Error('Klammern mit + oder − darin kann das Widget nicht – bitte erst ausmultiplizieren.');return a}
  throw new Error('Unerwartet: „'+t.t+'“')}
 const terms=[];let s=1;if(pk()&&(pk().t==='+'||pk().t==='-'))s=nx().t==='-'?-1:1;
 for(;;){const a=T();const v=s<0?qneg(a.c):a.c;terms.push({s:v.n<0?-1:1,c:qabs(v),e:a.e});if(!pk())break;const o=nx();if(o.t!=='+'&&o.t!=='-')throw new Error('Unerwartet: „'+o.t+'“');s=o.t==='-'?-1:1}
 if(terms.length>6)throw new Error('Höchstens 6 Summanden.');
 return terms}
const evalP=(T,x)=>T.reduce((a,t)=>qa(a,qm(Q(t.s),qm(t.c,qpowi(x,t.e)))),ZERO);

/* ---------- Anzeige ---------- */
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const fi=n=>String(n).replace('-','−');
const fr=(a,b)=>'<span class="fr"><span>'+a+'</span><span>'+b+'</span></span>';
function qh(q,inl){if(q.d===1)return fi(q.n);const s=q.n<0?'−':'';if(!inl&&[2,4,5,8,10,20,25,50,100].includes(q.d))return s+String(Math.abs(q.n)/q.d).replace('.',',');return inl?s+Math.abs(q.n)+'/'+q.d:s+fr(Math.abs(q.n),q.d)}
const X='<i>x</i>';
const par=q=>q.n<0||q.d!==1?'('+qh(q,1)+')':qh(q);
const mono=(c,e)=>e===0?qh(c):(q1(c)?'':qh(c))+X+(e>1?'<sup>'+e+'</sup>':'');
const opH=(i,s)=>i===0?(s<0?'<span class="op f">−</span>':''):'<span class="op">'+(s<0?'−':'+')+'</span>';
const polyH=T=>T.map((t,i)=>opH(i,t.s)+'<span class="t">'+mono(t.c,t.e)+'</span>').join('');
const nm=n=>'<i>'+esc(n)+'</i>';

/* ---------- Eingaben ---------- */
function parseAns(raw){let s=String(raw).replace(/[−–]/g,'-').replace(/,/g,'.').replace(/\s+/g,'').replace(/[÷:]/g,'/');
 if(!s)return null;while(/^\(.*\)$/.test(s))s=s.slice(1,-1);
 const m=s.match(/^([+-]?)(\d+(?:\.\d*)?|\.\d+)(?:\/\(?([+-]?)(\d+(?:\.\d*)?)\)?)?$/);if(!m)return false;
 try{let v=qdec(m[2]);if(m[4]!==undefined){const d=qdec(m[4]);if(!d.n)return false;v=qd(v,d);if(m[3]==='-')v=qneg(v)}if(m[1]==='-')v=qneg(v);return v}catch(e){return false}}
function same(v,want,raw){if(qeq(v,want))return true;const m=String(raw).replace(/,/g,'.').match(/\.(\d+)\s*$/);if(!m||/\//.test(raw)||m[1].length<2)return false;
 return Math.abs(v.n/v.d-want.n/want.d)<=0.5*Math.pow(10,-m[1].length)+1e-12}
const TIP={
 lx:'Schau im Graphen: Wo trifft die Kurve die x-Achse? Dort ist x die Nullstelle.',
 ly:'Setz deine Zahl für x in die Funktion ein und rechne aus.',
 pw:'Hoch 2 heißt: die Zahl mal sich selbst. (−2)² = (−2)·(−2) – Minus mal Minus gibt Plus!',
 pr:'Rechne die Zahl vor dem x mal den eingesetzten Wert (bei x² erst quadrieren).',
 sum:'Rechne jetzt alles von links nach rechts zusammen. Minus eine negative Zahl wird zu Plus.'
};
const coarse=window.matchMedia&&matchMedia('(pointer:coarse)').matches;let kbFor=null;
function kbMake(){const K=document.createElement('div');K.className='kb';[['−','-'],['/','/'],[',',',']].forEach(([l,ch])=>{const b=document.createElement('button');b.type='button';b.textContent=l;b.setAttribute('aria-label',l==='−'?'Minus':l==='/'?'Bruchstrich':'Komma');
  b.addEventListener('pointerdown',ev=>{ev.preventDefault();const i=kbFor;if(!i||!i.isConnected)return;if(ch==='-'){i.value=/^[-−]/.test(i.value)?i.value.replace(/^[-−]/,''):'−'+i.value}else{const a=i.selectionStart!=null?i.selectionStart:i.value.length;i.value=i.value.slice(0,a)+ch+i.value.slice(i.selectionEnd!=null?i.selectionEnd:a);try{i.setSelectionRange(a+1,a+1)}catch(e){}}i.dispatchEvent(new Event('input'))});K.appendChild(b)});return K}

function rel(el){const a=el.getBoundingClientRect(),b=host.getBoundingClientRect();return{x:a.left-b.left,y:a.top-b.top,w:a.width,h:a.height}}
function confetti(el){const b=rel(el),cx=b.x+b.w/2,cy=b.y,cols=['#7F77DD','#1D9E75','#D4537E','#EF9F27','#378ADD','#E24B4A','#97C459'];if(!document.body.animate)return;
 for(let i=0;i<80;i++){const p=document.createElement('span'),w=5+Math.random()*5;p.className='cf';Object.assign(p.style,{left:cx+'px',top:cy+'px',width:w+'px',height:w*(Math.random()<.5?1.8:1)+'px',background:cols[i%cols.length],borderRadius:Math.random()<.3?'50%':'2px'});FX.appendChild(p);
  const a=.15+Math.random()*(Math.PI-.3),v=200+Math.random()*260,vx=Math.cos(a)*v*1.4,vy=-Math.sin(a)*v,g=560,D=1.4+Math.random()*.9,rot=(Math.random()-.5)*1000,kf=[];
  for(let k=0;k<=10;k++){const t=D*k/10;kf.push({transform:'translate('+vx*t+'px,'+(vy*t+g*t*t)+'px) rotate('+rot*t+'deg)',opacity:k<6?1:1-(k-6)/4})}
  p.animate(kf,{duration:D*1000,fill:'forwards'}).finished.then(()=>p.remove())}}
const wait=ms=>new Promise(r=>setTimeout(r,ms));

/* ---------- Block mit Zeilen und Lücken ---------- */
function Block(){
 const el=document.createElement('div');el.className='bk';BKS.appendChild(el);
 const B={el,gaps:[],done:false};
 const gd=document.createElement('div');gd.className='gd';el.appendChild(gd);B.gd=gd;
 B.line=(lab,body,cls)=>{const cells=[['la',lab],['eq','='],['bd',body]].map(([c,h],j)=>{const d=document.createElement('span');d.className=c+' in'+(cls?' '+cls:'');d.style.animationDelay=j*60+'ms';d.innerHTML=h;gd.appendChild(d);return d});fit();
  return{cells,el:cells[2],querySelector(sel){for(const c of cells){const r=c.querySelector(sel);if(r)return r}return null}}};
 B.gap=(want,kind,extra)=>{const i=document.createElement('input');i.className='gp';i.type='text';i.setAttribute('inputmode','decimal');i.setAttribute('autocomplete','off');i.setAttribute('autocorrect','off');i.setAttribute('autocapitalize','off');i.spellcheck=false;i.setAttribute('aria-label','Lücke');
  const g=Object.assign({want,kind,el:i,tries:0,ok:false},extra||{});
  const sz=()=>{i.style.width=(Math.max(1,[...i.value].length)*0.62+0.5)+'em'};sz();
  i.addEventListener('input',()=>{sz();i.classList.remove('no','em')});i.addEventListener('focus',()=>{kbFor=i});
  i.addEventListener('keydown',ev=>{if(ev.key==='Enter'){ev.preventDefault();const open=B.gaps.filter(x=>!x.ok&&x.el);const nx=open.find(x=>x!==g&&!x.el.value.trim());if(nx)nx.el.focus();else B.check()}});
  B.gaps.push(g);return g};
 B.put=(d,sel,g)=>{d.querySelector(sel).replaceWith(g.el)};
 B.ctlMake=onCheck=>{const c=document.createElement('div');c.className='ctl';
  if(coarse){c.appendChild(kbMake())}
  const go=document.createElement('button');go.className='go';go.type='button';go.innerHTML='prüfen <span aria-hidden="true">✓</span>';go.onclick=()=>B.check();c.appendChild(go);
  const tp=document.createElement('div');tp.className='tp';tp.setAttribute('aria-live','polite');el.appendChild(c);el.appendChild(tp);B.ctl=c;B.tp=tp;B.onCheck=onCheck};
 B.say=t=>{const d=document.createElement('div');d.textContent=t;B.tp.appendChild(d)};
 B.lock=(g,html,cls)=>{const s=document.createElement('span');s.className='ok'+(cls?' '+cls:'');s.innerHTML=html;g.el.replaceWith(s);g.el=null;g.ok=true;g.span=s;return s};
 B.check=()=>{if(B.done)return;B.tp.innerHTML='';const open=B.gaps.filter(g=>!g.ok);let any=false,empty=false;
  open.forEach(g=>{const raw=g.el.value.trim();g.raw=raw;g.val=parseAns(raw);if(g.val===null){empty=true;g.el.classList.add('em')}else any=true});
  if(!any){B.say('Füll erst mal die gestrichelten Kästchen aus ✏️');return}
  const tips=[],res=B.onCheck(open);
  open.forEach(g=>{if(g.ok||g.val===null||g.skip){g.skip=false;return}g.tries++;g.el.classList.remove('no');void g.el.offsetWidth;g.el.classList.add('no');if(g.tries>=2&&TIP[g.kind]&&!tips.includes(TIP[g.kind]))tips.push(TIP[g.kind])});
  tips.slice(0,2).forEach(t=>B.say('💡 '+t));
  if(!res){const f=B.gaps.find(g=>!g.ok&&g.el&&g.el.classList.contains('no'))||B.gaps.find(g=>!g.ok&&g.el);if(f)f.el.focus()}};
 B.focus=()=>setTimeout(()=>{const f=B.gaps.find(g=>!g.ok&&g.el);if(f)try{f.el.focus({preventScroll:true})}catch(e){}},350);
 return B}

/* ---------- Modus „luecken“: f([ ]) = [ ] ---------- */
function luecken(F){
 const T=parsePoly(F.expr),B=Block(),name=F.name||'f';
 let XS=null;if(C.x!=null){XS=(Array.isArray(C.x)?C.x:[C.x]).map(qnum)}
 const pulse=C.pulse!==false;
 B.line(nm(name)+'('+X+')',polyH(T),'df');
 const d=B.line(nm(name)+'(<span class="g1"></span>)','<span class="g2"></span>');
 const gx=B.gap(null,'lx'),gy=B.gap(null,'ly');B.put(d,'.g1',gx);B.put(d,'.g2',gy);
 B.ctlMake(open=>{
  if(!gx.ok&&gx.val){const okx=!XS||XS.some(v=>same(gx.val,v,gx.raw));if(okx){const v=XS?XS.find(v=>same(gx.val,v,gx.raw)):gx.val;gx.want=v;B.lock(gx,qh(v,1))}}
  if(!gx.ok){if(gy.val)gy.skip=true;return false}
  const y=evalP(T,gx.want);
  if(!gy.ok&&gy.val&&same(gy.val,y,gy.raw)){const s=B.lock(gy,qh(y,1),pulse&&qz(y)?'pz':'');if(pulse&&qz(y))s.classList.add('pz')}
  if(gy.ok){B.done=true;B.ctl.remove();setTimeout(()=>confetti(d.el),250);return true}
  return false});
 B.focus()}

/* ---------- Modus „probe“: f(−2) = (−2)² − 4 = … ---------- */
async function probe(){
 if(C.x==null)throw new Error('CONFIG: "x" (der eingesetzte Wert) fehlt.');
 const xv=qnum(C.x),single=FNS.length===1,pulse=C.pulse!==false&&single;
 const blocks=FNS.map(F=>{const T=parsePoly(F.expr);return{F,T,name:F.name||'f'}});
 for(let k=0;k<blocks.length;k++){const o=blocks[k];await probeBlock(o,xv,pulse);if(k<blocks.length-1)await wait(300)}
}
function probeBlock(o,xv,pulse){return new Promise(resolve=>{
 const{T,name}=o,B=Block();
 B.line(nm(name)+'('+X+')',polyH(T),'df');
 const vH='<span class="v pp">'+par(xv)+'</span>',vH1='<span class="v pp">'+qh(xv,1)+'</span>';
 const vvH=xv.n<0||xv.d!==1?vH:vH1;
 const sub=T.map((t,i)=>{const body=t.e===0?qh(t.c):(q1(t.c)?'':qh(t.c)+'·')+vvH+(t.e>1?'<sup>'+t.e+'</sup>':'');return opH(i,t.s)+'<span class="t">'+body+'</span>'}).join('');
 const r1=B.line(nm(name)+'('+qh(xv,1)+')',sub);
 r1.el.querySelectorAll('.pp').forEach((e,j)=>e.style.animationDelay=(250+j*160)+'ms');
 const needRow2=T.some(t=>t.e>0&&!(t.e===1&&q1(t.c)&&xv.n>=0));
 const tv=T.map(t=>qm(t.c,qpowi(xv,t.e))),y=evalP(T,xv);
 let stage=0;
 function row2(){const parts=T.map((t,i)=>opH(i,t.s)+(t.e===0?'<span class="t">'+qh(t.c)+'</span>':'<span class="g" data-i="'+i+'"></span>'));
  const d=B.line('',parts.join(''));T.forEach((t,i)=>{if(t.e>0){const g=B.gap(tv[i],t.e>1?'pw':'pr',{row:2});B.put(d,'.g[data-i="'+i+'"]',g)}});B.focus()}
 function row3(){const d=B.line('','<span class="g3"></span>');const g=B.gap(y,'sum',{row:3});B.put(d,'.g3',g);B.r3=d;B.focus()}
 B.ctlMake(open=>{let all=true;
  open.forEach(g=>{if(g.val&&same(g.val,g.want,g.raw)){B.lock(g,g.row===2&&(g.want.n<0)?'('+qh(g.want,1)+')':qh(g.want,1))}else all=false});
  if(!all)return false;
  if(stage===2){stage=3;setTimeout(row3,300);return true}
  B.done=true;B.ctl.remove();
  const s=B.r3.querySelector('.ok');if(pulse&&qz(y))s.classList.add('pz');
  const w=document.createElement('span');w.className='dd';s.replaceWith(w);w.appendChild(s);
  setTimeout(()=>confetti(B.r3.el),250);resolve();return true});
 setTimeout(()=>{if(needRow2){stage=2;row2()}else{stage=3;row3()}},300+T.length*160);
})}

/* ---------- Breite anpassen ---------- */
function fit(){let fs=26;host.style.setProperty('--fs',fs+'px');const W=host.clientWidth;if(!W)return;
 let guard=0;while(guard++<20&&fs>14&&[...host.querySelectorAll('.gd')].some(l=>l.scrollWidth>l.clientWidth+1||l.scrollWidth>W)){fs-=1;host.style.setProperty('--fs',fs+'px')}}
let rz;window.addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(fit,120)});

if(LU)luecken(FNS[0]);else{FNS.forEach(F=>parsePoly(F.expr));probe().catch(e=>fail(host,'Widget-Fehler: '+(e&&e.message||e)))}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
