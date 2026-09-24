/*! claude-mathe-widgets · ableiten.js · https://github.com/IlijazM/claude-mathe-widgets */
(function(){
var CSS=[
".md{position:relative;padding:.75rem 0 1rem;--fs:24px;--acc:var(--text-accent,#185FA5);--mut:var(--text-secondary,#73726c);--ok:var(--text-success,#3B6D11);--warn:var(--text-warning,#BA7517);--wbg:var(--bg-warning,#FAEEDA);font-family:var(--font-voice,Georgia),Georgia,'Times New Roman',serif;color:var(--text-primary,#1f1e1d)}",
".md .bk{position:relative}",
".md .bk+.bk{margin-top:1.2rem;padding-top:1rem;border-top:1.5px dashed var(--border-strong,rgba(0,0,0,.2))}",
".md .sc{overflow-x:auto;padding:.5rem 2px .9rem}",
".md .gd{display:grid;grid-auto-rows:minmax(calc(var(--fs)*2.3),auto);align-items:center;justify-items:start;column-gap:.3em;font-size:var(--fs);width:max-content;margin:0 auto}",
".md .lb{justify-self:end;white-space:nowrap;padding-right:.2em}",
".md .c{position:relative;display:inline-flex;align-items:center;white-space:nowrap}",
".md .op{margin:0 .28em 0 .12em}.md .op.f{margin:0 .06em 0 0}",
".md i{font-style:italic}",
".md sup{font-size:.62em;position:relative;top:-.72em;line-height:0;margin-left:.05em;display:inline-flex;align-items:center}",
".md .fr{display:inline-flex;flex-direction:column;align-items:center;font-size:.8em;line-height:1.15;vertical-align:middle;margin:0 .08em}",
".md .fr>span:first-child{padding:0 .15em .08em}.md .fr>span:last-child{border-top:1.5px solid currentColor;padding:.1em .15em 0;min-width:100%;text-align:center;box-sizing:border-box}",
".md .rt{display:inline-flex;align-items:flex-start}.md .rt .ra{border-top:1.5px solid currentColor;padding:0 .08em;margin-left:.02em}.md .rt .ri{font-size:.55em;top:.1em;margin-right:-.35em}",
".md .fr sup{top:-.42em}.md .fr>span:last-child{padding-top:.22em}",
".md .gp{box-sizing:content-box;width:1.4ch;min-width:1.1em;height:1.3em;padding:.04em .28em;margin:0 .06em;border:1.5px dashed var(--border-strong,rgba(0,0,0,.3));border-radius:.32em;background:var(--surface-2,#fff);color:inherit;font:inherit;font-size:.85em;text-align:center;outline:none;box-shadow:none;transition:border-color .15s,background .2s,box-shadow .15s,width .12s}",
".md sup .gp{font-size:1em;border-radius:.4em}",
".md .gp:focus{border-color:var(--acc);border-style:solid;box-shadow:0 0 0 3px var(--bg-accent,#E6F1FB)}",
".md .gp.no{border-color:var(--warn);background:var(--wbg);animation:mdwig .4s}",
".md .gp.em{border-color:var(--warn)}",
".md .ok{color:var(--ok);display:inline-flex;align-items:center;animation:mdpop .45s cubic-bezier(.3,1.7,.5,1)}",
".md .nt{position:absolute;left:0;top:100%;margin-top:1px;font:12px var(--font-sans,system-ui),system-ui,sans-serif;color:var(--acc);white-space:nowrap}",
".md .st{position:relative;opacity:.55;transition:opacity .4s}.md .st::after{content:'';position:absolute;left:-.1em;right:-.1em;top:52%;height:2px;background:var(--mut);opacity:.7;border-radius:2px;transform:rotate(-14deg) scaleX(0);transform-origin:left center;animation:mdst .35s ease-out forwards}",
".md .in{animation:mdin .45s ease-out both}",
".md .ul{grid-column:2/-1;align-self:start;justify-self:stretch;height:5px;margin-top:-.1em;border-top:1.5px solid var(--ok);border-bottom:1.5px solid var(--ok);transform-origin:left;transform:scaleX(0);animation:mdul .6s ease-out forwards}",
".md .ctl{display:flex;justify-content:center;align-items:center;gap:10px;flex-wrap:wrap;margin-top:.2rem}",
".md .go{height:38px;padding:0 14px;border-radius:12px;border:none;background:var(--bg-accent,#E6F1FB);color:var(--text-accent,#185FA5);font:500 14px var(--font-sans,system-ui),system-ui,sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:6px}.md .go:hover{filter:brightness(.97)}",
".md .cb{height:1.5em;padding:0 .45em;border:1.5px dashed var(--border-strong,rgba(0,0,0,.3));border-radius:.4em;background:transparent;color:var(--mut);font:inherit;font-size:.8em;cursor:pointer;margin-left:.2em;transition:all .15s}",
".md .cb:hover{background:var(--surface-1,#f5f4ef)}.md .cb.on{border-style:solid;border-color:transparent;background:transparent;color:var(--text-primary,#1f1e1d);font-size:1em;padding:0 .1em;animation:mdpop .45s cubic-bezier(.3,1.7,.5,1)}",
".md .tp{font:14px/1.5 var(--font-sans,system-ui),system-ui,sans-serif;color:var(--mut);text-align:center;margin:.55rem auto 0;max-width:34em;min-height:0}",
".md .tp div{animation:mdin .35s ease-out both}.md .tp div+div{margin-top:.25rem}",
".md .fx{position:absolute;inset:0;pointer-events:none;z-index:4;overflow:hidden}.md .cf{position:absolute;display:block;pointer-events:none}",
".md .kb{position:absolute;z-index:6;display:flex;gap:4px;padding:4px;background:var(--surface-2,#fff);border:1.5px dashed var(--border-strong,rgba(0,0,0,.25));border-radius:12px;animation:mdin .15s ease-out}",
".md .kb button{-webkit-tap-highlight-color:transparent;min-width:42px;height:36px;border:none;border-radius:9px;background:var(--surface-1,#f5f4ef);color:inherit;font:20px var(--font-voice,Georgia),Georgia,serif;cursor:pointer}",
".md .err{font:13px var(--font-sans,system-ui),system-ui,sans-serif;color:var(--text-danger,#A32D2D);text-align:center;padding:4px 0}",
"@keyframes mdpop{0%{transform:scale(.3);opacity:0}100%{transform:scale(1);opacity:1}}",
"@keyframes mdwig{0%,100%{transform:translateX(0)}25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}",
"@keyframes mdin{from{opacity:0;transform:translateY(-8px)}}",
"@keyframes mdst{to{transform:rotate(-14deg) scaleX(1)}}",
"@keyframes mdul{to{transform:scaleX(1)}}",
"@media (pointer:coarse){.md .gp{font-size:16px}}"
].join("\n");
var HTML="<div class=\"bks\"></div><div class=\"fx\"></div>";
function readCfg(host){
 var a=host.getAttribute('data-config');
 if(a){try{return JSON.parse(a)}catch(e){throw new Error('data-config ist kein gültiges JSON: '+e.message)}}
 return window.CONFIG||null;
}
function fail(host,msg){host.className='';host.innerHTML='<div style="font:13px system-ui,sans-serif;color:var(--text-danger,#A32D2D);text-align:center;padding:8px 0">'+String(msg).replace(/</g,'&lt;')+'</div>'}
function start(host,cfg){
 if(!document.getElementById("md-css")){var st=document.createElement('style');st.id="md-css";st.textContent=CSS;document.head.appendChild(st)}
 host.className="md";host.innerHTML=HTML;
 try{run(cfg,host)}catch(e){fail(host,'Widget-Fehler: '+(e&&e.message||e))}
}
function boot(){
 var host=document.getElementById("md");
 if(!host){host=document.createElement('div');host.id="md";document.body.appendChild(host)}
 if(host.getAttribute('data-started'))return;
 var t0=Date.now();
 (function tryIt(){
  var cfg;try{cfg=readCfg(host)}catch(e){return fail(host,e.message)}
  if(cfg){host.setAttribute('data-started','1');return start(host,cfg)}
  if(Date.now()-t0<3000)return setTimeout(tryIt,50);
  fail(host,'Keine CONFIG gefunden – data-config am Container fehlt.');
 })();
}
window["MatheAbleiten"]=function(cfg){var host=document.getElementById("md");if(host){host.setAttribute('data-started','1');start(host,cfg)}};

function run(C,host){
/* ---------- CONFIG prüfen ---------- */
if(!C||typeof C!=='object')throw new Error('CONFIG fehlt.');
const MODE=String(C.mode||'').toLowerCase().trim();
if(MODE!=='ableiten'&&MODE!=='aufleiten')throw new Error('CONFIG: "mode" muss "ableiten" oder "aufleiten" sein.');
const SRC=C.expr!=null?C.expr:(C['function']!=null?C['function']:C.f);
if(SRC==null||!String(SRC).trim())throw new Error('CONFIG: "expr" (die Funktion) fehlt.');
const NAME=String(C.name||'f').trim()||'f';
const AB=MODE==='ableiten';
const BKS=host.querySelector('.bks'),FX=host.querySelector('.fx');

/* ---------- Brüche ---------- */
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a||1};
function Q(n,d){if(d===undefined)d=1;if(!d)throw new Error('Division durch 0');if(d<0){n=-n;d=-d}const g=gcd(n,d);n/=g;d/=g;if(Math.abs(n)>1e12||d>1e12)throw new Error('Zahlen zu groß');return{n,d}}
const qa=(a,b)=>Q(a.n*b.d+b.n*a.d,a.d*b.d),qs=(a,b)=>Q(a.n*b.d-b.n*a.d,a.d*b.d),qm=(a,b)=>Q(a.n*b.n,a.d*b.d),qd=(a,b)=>{if(!b.n)throw new Error('Division durch 0');return Q(a.n*b.d,a.d*b.n)};
const qneg=a=>Q(-a.n,a.d),qabs=a=>Q(Math.abs(a.n),a.d),qeq=(a,b)=>a.n===b.n&&a.d===b.d,qz=a=>a.n===0,q1=a=>a.n===1&&a.d===1,ONE=Q(1),ZERO=Q(0);
function qdec(t){const p=t.split('.');const f=p[1]||'';return Q(parseInt((p[0]||'0')+f,10),Math.pow(10,f.length))}
function qpow(a,q){
 if(q.d===1){let r=ONE;const b=q.n<0?qd(ONE,a):a;for(let k=0;k<Math.abs(q.n);k++)r=qm(r,b);return r}
 if(q1(a))return ONE;
 const rt=v=>{const r=Math.round(Math.pow(v,1/q.d));return Math.pow(r,q.d)===v?r:null};
 if(a.n>0){const n=rt(a.n),d=rt(a.d);if(n!==null&&d!==null)return qpow(Q(n,d),Q(q.n))}
 throw new Error('Diese Zahl hoch Bruch kann ich nicht exakt ausrechnen.');
}

/* ---------- Funktion einlesen ---------- */
const SUP='⁰¹²³⁴⁵⁶⁷⁸⁹';
function prep(src){
 let s=String(src).replace(/^\s*[a-zA-Z][′'″‴]*\s*\(\s*x\s*\)\s*=|^\s*y\s*=/,'');
 s=s.replace(/[−–]/g,'-').replace(/[·×∙⋅]/g,'*').replace(/[÷:]/g,'/').replace(/(\d),(\d)/g,'$1.$2');
 const FR={'½':'(1/2)','⅓':'(1/3)','⅔':'(2/3)','¼':'(1/4)','¾':'(3/4)','⅕':'(1/5)','⅛':'(1/8)'};
 s=s.replace(/[½⅓⅔¼¾⅕⅛]/g,c=>FR[c]).replace(/∛/g,'³√').replace(/∜/g,'⁴√');
 s=s.replace(/([⁰¹²³⁴⁵⁶⁷⁸⁹]+)\s*√/g,(m,k)=>'√['+[...k].map(c=>SUP.indexOf(c)).join('')+']');
 s=s.replace(/[⁻⁺]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+(?:[⁄][⁰¹²³⁴⁵⁶⁷⁸⁹]+)?/g,m=>'^('+[...m].map(c=>c==='⁻'?'-':c==='⁺'?'':c==='⁄'?'/':SUP.indexOf(c)).join('')+')');
 return s}
function lex(s){const tk=[];let i=0;
 while(i<s.length){const c=s[i];
  if(/\s/.test(c)){i++;continue}
  if(/[\d.]/.test(c)){let j=i;while(j<s.length&&/[\d.]/.test(s[j]))j++;const t=s.slice(i,j);if(t==='.'||(t.match(/\./g)||[]).length>1)throw new Error('Die Zahl „'+t+'“ versteh ich nicht.');tk.push({t:'n',v:qdec(t),raw:t});i=j;continue}
  if(c==='x'||c==='X'){tk.push({t:'x'});i++;continue}
  if(c==='√'){let k=2;i++;if(s[i]==='['){const j=s.indexOf(']',i);k=parseInt(s.slice(i+1,j),10);i=j+1;if(!(k>=2))throw new Error('Wurzel-Index versteh ich nicht.')}tk.push({t:'r',k});continue}
  if(s.startsWith('sqrt',i)){tk.push({t:'r',k:2});i+=4;continue}
  if('+-*/^()'.includes(c)){tk.push({t:c});i++;continue}
  if(/[a-zA-Z]/.test(c)){let j=i;while(j<s.length&&/[a-zA-Z]/.test(s[j]))j++;throw new Error('„'+s.slice(i,j)+'“ kann das Widget noch nicht – nur Summen aus a·xⁿ (Potenzen, Wurzeln, Brüche mit x).')}
  throw new Error('Das Zeichen „'+c+'“ versteh ich nicht.')}
 return tk}
function parseSum(tk){let p=0;const pk=()=>tk[p],nx=()=>tk[p++];
 const starts=t=>t&&(t.t==='n'||t.t==='x'||t.t==='r'||t.t==='(');
 function S(){const terms=[];let s=1;
  if(pk()&&(pk().t==='+'||pk().t==='-'))s=nx().t==='-'?-1:1;
  terms.push({s,a:T()});
  while(pk()&&(pk().t==='+'||pk().t==='-')){const o=nx().t;terms.push({s:o==='-'?-1:1,a:T()})}
  return terms}
 function T(){let a=I();while(pk()&&(pk().t==='*'||pk().t==='/')){const o=nx().t,b=I();a=o==='*'?{k:'mul',a,b}:{k:'div',a,b}}return a}
 function I(){let a=U();while(starts(pk())){const b=Pw();a={k:'mul',a,b,imp:true}}return a}
 function U(){if(pk()&&pk().t==='-'){nx();return{k:'neg',a:U()}}if(pk()&&pk().t==='+'){nx();return U()}return Pw()}
 function Pw(){const a=Pr();if(pk()&&pk().t==='^'){nx();return{k:'pow',a,b:U()}}return a}
 function Pr(){const t=nx();if(!t)throw new Error('Da fehlt noch was am Ende.');
  if(t.t==='n')return{k:'n',v:t.v,raw:t.raw};if(t.t==='x')return{k:'x'};
  if(t.t==='('){const terms=S();if(!pk()||nx().t!==')')throw new Error('Klammer zu fehlt.');return{k:'par',terms}}
  if(t.t==='r')return{k:'root',n:t.k,a:Pw()};
  throw new Error('Unerwartet: „'+t.t+'“')}
 const r=S();if(p<tk.length)throw new Error('Unerwartet: „'+(tk[p].raw||tk[p].t)+'“');return r}
/* Ausdruck → Monom c·x^e */
function ev(nd){switch(nd.k){
 case 'n':return{c:nd.v,e:ZERO,x:false,rt:false,dn:false};
 case 'x':return{c:ONE,e:ONE,x:true,rt:false,dn:false};
 case 'neg':{const a=ev(nd.a);return Object.assign({},a,{c:qneg(a.c)})}
 case 'par':{if(nd.terms.length!==1)throw new Error('Klammern mit + oder − darin kann das Widget noch nicht – bitte erst ausmultiplizieren.');const a=ev(nd.terms[0].a);return Object.assign({},a,{c:nd.terms[0].s<0?qneg(a.c):a.c})}
 case 'mul':{const a=ev(nd.a),b=ev(nd.b);return{c:qm(a.c,b.c),e:qa(a.e,b.e),x:a.x||b.x,rt:a.rt||b.rt,dn:a.dn||b.dn}}
 case 'div':{const a=ev(nd.a),b=ev(nd.b);if(qz(b.c))throw new Error('Division durch 0');return{c:qd(a.c,b.c),e:qs(a.e,b.e),x:a.x||b.x,rt:a.rt||b.rt,dn:a.dn||b.dn||b.x}}
 case 'pow':{const a=ev(nd.a),b=ev(nd.b);if(b.x)throw new Error('x im Exponenten (wie 2ˣ) kann das Widget noch nicht.');return{c:qpow(a.c,b.c),e:qm(a.e,b.c),x:a.x,rt:a.rt,dn:a.dn}}
 case 'root':{const a=ev(nd.a),q=Q(1,nd.n);return{c:qpow(a.c,q),e:qm(a.e,q),x:a.x,rt:a.rt||a.x,dn:a.dn}}
}}
/* sichtbarer Zahlenfaktor (für: braucht das Umschreiben eine Lücke für die Zahl?) */
function lit(nd){
 if(nd.k==='neg')return lit(nd.a);
 if(nd.k==='mul'){const a=lit(nd.a),b=lit(nd.b);return a&&b?qm(a,b):null}
 if(nd.k==='div'){const a=lit(nd.a),b=ev(nd.b);return a&&q1(qabs(b.c))?a:null}
 if(nd.k==='par')return nd.terms.length===1?lit(nd.terms[0].a):null;
 const v=ev(nd);if(!v.x)return qabs(v.c);return q1(qabs(v.c))?ONE:null}

/* ---------- Anzeige ---------- */
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const fi=n=>String(n).replace('-','−');
const fr=(a,b)=>'<span class="fr"><span>'+a+'</span><span>'+b+'</span></span>';
function qh(q,inl){if(q.d===1)return fi(q.n);const s=q.n<0?'−':'';return inl?s+Math.abs(q.n)+'/'+q.d:s+fr(Math.abs(q.n),q.d)}
const X='<i>x</i>';
const strip=nd=>nd.k==='par'&&nd.terms.length===1?(nd.terms[0].s>0?nd.terms[0].a:{k:'neg',a:nd.terms[0].a}):nd;
function h(nd,inl){switch(nd.k){
 case 'n':return esc(nd.raw.replace('.',','));
 case 'x':return X;
 case 'neg':return '−'+h(nd.a,inl);
 case 'par':return '('+nd.terms.map((t,i)=>(i?(t.s<0?' − ':' + '):(t.s<0?'−':''))+h(t.a,inl)).join('')+')';
 case 'mul':{const imp=nd.imp&&!(nd.b.k==='n');return h(nd.a,inl)+(imp?'':'·')+h(nd.b,inl)}
 case 'div':return inl?h(nd.a,1)+'/'+h(nd.b,1):fr(h(strip(nd.a)),h(strip(nd.b)));
 case 'pow':return h(nd.a,inl)+'<sup>'+h(strip(nd.b),1)+'</sup>';
 case 'root':return '<span class="rt">'+(nd.n!==2?'<sup class="ri">'+nd.n+'</sup>':'')+'√<span class="ra">'+h(strip(nd.a),inl)+'</span></span>';
}}
/* c·x^e hübsch (c ohne Vorzeichen erwartet, Vorzeichen macht der Operator) */
function mono(c,e){
 if(qz(e))return qh(c);
 const cs=q1(c)?'':qh(c);
 return cs+X+(q1(e)?'':'<sup>'+qh(e,1)+'</sup>')}
const nameH=(b,p)=>'<i>'+esc(b)+'</i>'+(p===0?'':p===1?'′':p===2?'″':p===3?'‴':'<sup>('+p+')</sup>');
const nameT=(b,p)=>b+(p===0?'':p===1?'′':p===2?'″':p===3?'‴':'('+p+')');

/* ---------- Eingaben prüfen ---------- */
function parseAns(raw){let s=String(raw).replace(/[−–]/g,'-').replace(/,/g,'.').replace(/\s+/g,'').replace(/[÷:]/g,'/');
 if(!s)return null;
 while(/^\(.*\)$/.test(s))s=s.slice(1,-1);
 const m=s.match(/^([+-]?)(\d+(?:\.\d*)?|\.\d+)(?:\/\(?([+-]?)(\d+(?:\.\d*)?)\)?)?$/);
 if(!m)return false;
 try{let v=qdec(m[2]);if(m[4]!==undefined){const d=qdec(m[4]);if(!d.n)return false;v=qd(v,d);if(m[3]==='-')v=qneg(v)}if(m[1]==='-')v=qneg(v);return v}catch(e){return false}}
function same(v,want,raw){if(qeq(v,want))return true;
 const m=String(raw).replace(/,/g,'.').match(/\.(\d+)\s*$/);if(!m||/\//.test(raw)||m[1].length<2)return false;
 return Math.abs(v.n/v.d-want.n/want.d)<=0.5*Math.pow(10,-m[1].length)+1e-12}
const TIP={
 fac:'Der alte Exponent wandert als Faktor nach vorne. Welcher Exponent steht oben am x?',
 exm:'Neuer Exponent = alter Exponent minus 1.',
 cst:'Eine Zahl ganz allein ändert sich nie – wie steil ist eine waagrechte Linie?',
 mul:'Nimm die beiden Zahlen vor dem x aus der Zeile darüber mal.',
 keep:'Der Exponent aus der Zeile darüber bleibt einfach gleich.',
 den:'Erst den Exponenten um 1 erhöhen – und genau durch diesen neuen Exponenten teilst du.',
 exp:'Neuer Exponent = alter Exponent plus 1.',
 div:'Rechne den Bruch aus der Zeile darüber aus: Zahl oben geteilt durch Zahl unten. Brüche wie 1/3 sind erlaubt.',
 ln:'Die Zahl vor dem 1/x bleibt einfach stehen – aus 1/x wird ln|x|.',
 rwr:'Die Wurzel ist ein Hoch-Bruch: √x = x hoch 1/2, die k-te Wurzel ist hoch 1/k. Steht unter der Wurzel schon ein Exponent, kommt der in den Zähler.',
 rwf:'Steht x im Nenner, darf es nach oben wandern – dabei bekommt der Exponent ein Minus.',
 rwc:'Die Zahl im Nenner teilt die Zahl oben (bzw. die Zahl unter der Wurzel wird mitgewurzelt).'
};

/* ---------- Konfetti ---------- */
function rel(el){const a=el.getBoundingClientRect(),b=host.getBoundingClientRect();return{x:a.left-b.left,y:a.top-b.top,w:a.width,h:a.height}}
function confetti(el){const b=rel(el),cx=b.x+b.w/2,cy=b.y,cols=['#7F77DD','#1D9E75','#D4537E','#EF9F27','#378ADD','#E24B4A','#97C459'];
 if(!document.body.animate)return;
 for(let i=0;i<80;i++){const p=document.createElement('span'),w=5+Math.random()*5;p.className='cf';Object.assign(p.style,{left:cx+'px',top:cy+'px',width:w+'px',height:w*(Math.random()<.5?1.8:1)+'px',background:cols[i%cols.length],borderRadius:Math.random()<.3?'50%':'2px'});FX.appendChild(p);
  const a=.15+Math.random()*(Math.PI-.3),v=200+Math.random()*260,vx=Math.cos(a)*v*1.4,vy=-Math.sin(a)*v,g=560,D=1.4+Math.random()*.9,rot=(Math.random()-.5)*1000,kf=[];
  for(let k=0;k<=10;k++){const t=D*k/10;kf.push({transform:'translate('+vx*t+'px,'+(vy*t+g*t*t)+'px) rotate('+rot*t+'deg)',opacity:k<6?1:1-(k-6)/4})}
  p.animate(kf,{duration:D*1000,fill:'forwards'}).finished.then(()=>p.remove())}}

/* ---------- Minus/Bruch-Tasten fürs Handy ---------- */
const coarse=window.matchMedia&&matchMedia('(pointer:coarse)').matches;
let KB=null,kbFor=null;
function kbShow(inp){if(!coarse)return;if(!KB){KB=document.createElement('div');KB.className='kb';[['−','-'],['/','/'],[',',',']].forEach(([l,ch])=>{const b=document.createElement('button');b.type='button';b.textContent=l;b.setAttribute('aria-label',l==='−'?'Minus':l==='/'?'Bruchstrich':'Komma');
  b.addEventListener('pointerdown',ev=>{ev.preventDefault();const i=kbFor;if(!i)return;if(ch==='-'){i.value=/^[-−]/.test(i.value)?i.value.replace(/^[-−]/,''):'−'+i.value}else{const a=i.selectionStart!=null?i.selectionStart:i.value.length;i.value=i.value.slice(0,a)+ch+i.value.slice(i.selectionEnd!=null?i.selectionEnd:a);try{i.setSelectionRange(a+1,a+1)}catch(e){}}i.dispatchEvent(new Event('input'))});KB.appendChild(b)});host.appendChild(KB)}
 kbFor=inp;KB.style.display='flex';const r=rel(inp);KB.style.top=(r.y+r.h+8)+'px';KB.style.left=Math.max(0,Math.min(host.clientWidth-150,r.x+r.w/2-70))+'px'}
function kbHide(){if(KB)KB.style.display='none';kbFor=null}

/* ---------- Terme bauen ---------- */
let terms0;
{const tk=lex(prep(SRC));const sum=parseSum(tk);
 if(sum.length>6)throw new Error('Höchstens 6 Summanden, bitte – sonst wird es zu breit.');
 terms0=sum.map(t=>{const m=ev(t.a);const v=t.s<0?qneg(m.c):m.c;const hx=m.x&&!qz(m.e);
  const L=lit(t.a);return{ts:t.s,nd:t.a,s:v.n<0?-1:1,c:qabs(v),e:hx?m.e:ZERO,x:hx,rw:hx&&(m.rt||m.dn),rt:m.rt,cg:hx&&(m.rt||m.dn)&&(!L||!qeq(L,qabs(v)))}});
 if(terms0.every(t=>qz(t.c)))throw new Error('Die Funktion ist überall 0 – da gibt es nichts zu tun.');
}

const blocks=[];
function G(want,kind,opt){return Object.assign({want,kind,tries:0,ok:false},opt||{})}
function mkBlock(terms,base,p){
 const K=terms.length,B={terms,base,p,K,stages:[],cur:-1,C:false,done:false};
 const opH=(i,s)=>i===0?(s<0?'<span class="op f">−</span>':''):'<span class="op">'+(s<0?'−':'+')+'</span>';
 const row1=terms.map((t,i)=>[opH(i,t.nd?t.ts:t.s),t.nd?h(t.nd):mono(t.c,t.e)]);
 if(terms.some(t=>t.rw))B.stages.push({lab:'=',cells:terms.map((t,i)=>t.rw?[opH(i,t.s),t.cg?{g:G(t.c,'rwc')}:(q1(t.c)?'':qh(t.c)),X,{g:G(t.e,t.rt?'rwr':'rwf'),sup:1}]:row1[i])});
 const dn=AB?nameH(base,p+1):nameH(base.toUpperCase(),0);
 if(AB){
  B.stages.push({lab:dn+'('+X+') =',cells:terms.map((t,i)=>t.x?[opH(i,t.s),{g:G(t.e,'fac',{paren:1})},'·'+(q1(t.c)?'':qh(t.c))+X,{g:G(qs(t.e,ONE),'exm'),sup:1}]:[opH(i,t.s),{g:G(ZERO,'cst',{cst:1})}])});
  B.stages.push({lab:'=',res:1,cells:terms.map((t,i)=>t.x?[opH(i,t.s),{g:G(qm(t.e,t.c),'mul',{paren:0})},X,{g:G(qs(t.e,ONE),'keep'),sup:1}]:[])});
 }else{
  B.stages.push({lab:dn+'('+X+') =',cells:terms.map((t,i)=>{const e1=qa(t.e,ONE);
   if(qz(e1))return[opH(i,t.s),{g:G(t.c,'ln')},'·ln|'+X+'|','<span class="nt">Sonderfall: 1/<i>x</i> → ln|<i>x</i>|</span>'];
   return[opH(i,t.s),{fr:qh(t.c,1),g:G(e1,'den')},'·'+X,{g:G(e1,'exp'),sup:1}]})});
  B.stages.push({lab:'=',res:1,cells:terms.map((t,i)=>{const e1=qa(t.e,ONE);
   if(qz(e1))return[opH(i,t.s),(q1(t.c)?'':qh(t.c))+'&#8201;ln|'+X+'|'];
   return[opH(i,t.s),{g:G(qd(t.c,e1),'div')},X,{g:G(e1,'keep'),sup:1}]})});
 }
 const el=document.createElement('div');el.className='bk';
 el.innerHTML='<div class="sc"><div class="gd"></div></div><div class="ctl"></div><div class="tp" aria-live="polite"></div>';
 BKS.appendChild(el);B.el=el;B.gd=el.querySelector('.gd');B.ctl=el.querySelector('.ctl');B.tp=el.querySelector('.tp');
 B.gd.style.gridTemplateColumns='auto repeat('+K+',auto)'+(AB?'':' auto');
 B.r1=[];B.gd.appendChild(cellL(1,nameH(base,p)+'('+X+') ='));
 row1.forEach((parts,i)=>B.r1.push(B.gd.appendChild(cell(1,i+2,parts))));
 const go=document.createElement('button');go.className='go';go.type='button';go.innerHTML='prüfen <span aria-hidden="true">✓</span>';go.onclick=()=>check(B);B.go=go;B.ctl.appendChild(go);
 blocks.push(B);next(B);return B}
function cellL(r,html){const d=document.createElement('div');d.className='lb';d.style.gridRow=r;d.style.gridColumn=1;d.innerHTML=html;return d}
function cell(r,col,parts,B){const d=document.createElement('div');d.className='c';d.style.gridRow=r;d.style.gridColumn=col;
 parts.forEach(pt=>{if(typeof pt==='string'){d.insertAdjacentHTML('beforeend',pt);return}
  const w=gapEl(pt.g,B);
  if(pt.sup){const s=document.createElement('sup');s.appendChild(w);d.appendChild(s)}
  else if(pt.fr!=null){const f=document.createElement('span');f.className='fr';const a=document.createElement('span');a.innerHTML=pt.fr;const b=document.createElement('span');b.appendChild(w);f.appendChild(a);f.appendChild(b);d.appendChild(f)}
  else d.appendChild(w)});
 return d}
function size(i){const n=Math.max(1,[...i.value].length);i.style.width=(n*0.62+0.5)+'em'}
function gapEl(g,B){const w=document.createElement('span');w.className='gw';if(!B){w.innerHTML=qh(g.want);return w}
 const i=document.createElement('input');i.className='gp';i.type='text';i.setAttribute('inputmode','decimal');i.setAttribute('autocomplete','off');i.setAttribute('autocorrect','off');i.setAttribute('autocapitalize','off');i.spellcheck=false;i.setAttribute('aria-label','Lücke');
 i.addEventListener('input',()=>{size(i);i.classList.remove('no','em')});
 i.addEventListener('focus',()=>kbShow(i));i.addEventListener('blur',()=>setTimeout(()=>{if(kbFor===i&&document.activeElement!==i)kbHide()},120));
 i.addEventListener('keydown',ev=>{if(ev.key==='Enter'){ev.preventDefault();const S=B.stages[B.cur],open=S.gaps.filter(x=>!x.ok),k=open.indexOf(g);const nx=open.slice(k+1).find(x=>!x.el.value.trim());if(nx)nx.el.focus();else check(B)}});
 size(i);g.el=i;g.w=w;w.appendChild(i);return w}

function next(B){
 B.cur++;const S=B.stages[B.cur],r=B.cur+2;S.gaps=[];S.row=r;
 const lab=cellL(r,S.lab);lab.classList.add('in');B.gd.appendChild(lab);
 S.els=S.cells.map((parts,i)=>{parts.forEach(pt=>{if(pt&&pt.g){S.gaps.push(pt.g);pt.g.col=i}});const c=cell(r,i+2,parts,B);c.classList.add('in');c.style.animationDelay=(i*70+60)+'ms';B.gd.appendChild(c);return c});
 if(S.res&&!AB){const c=document.createElement('div');c.className='c in';c.style.gridRow=r;c.style.gridColumn=B.K+2;c.style.animationDelay=(B.K*70+60)+'ms';
  const cb=document.createElement('button');cb.type='button';cb.className='cb';cb.textContent='+ C';cb.setAttribute('aria-pressed','false');
  cb.onclick=()=>{B.C=!B.C;cb.classList.toggle('on',B.C);cb.setAttribute('aria-pressed',B.C);cb.innerHTML=B.C?'+&#8201;<i>C</i>':'+ C';if(B.C&&B.cHint){B.cHint=false;B.tp.innerHTML=''}};
  c.appendChild(cb);B.gd.appendChild(c);B.cb=cb}
 fit();
 if(!S.gaps.length){if(AB||B.cur<B.stages.length-1)stageDone(B);return}
 setTimeout(()=>{const f=S.gaps.find(g=>!g.ok);if(f&&f.el&&(B.cur>0||blocks.length>1))try{f.el.focus({preventScroll:true})}catch(e){}},400)}

function lock(g,B){const S=B.stages[B.cur];
 const neg=g.want.n<0,html=(g.paren&&neg?'(':'')+qh(g.want,!!(g.el.closest('sup')||g.el.closest('.fr')))+(g.paren&&neg?')':'');
 const sp=document.createElement('span');sp.className='ok';sp.innerHTML=html;g.w.replaceChild(sp,g.el);if(kbFor===g.el)kbHide();g.el=null;
 if(g.cst){sp.classList.add('st');B.r1[g.col].classList.add('st')}}
function check(B){if(B.done)return;const S=B.stages[B.cur];let all=true,any=false;const tips=[];
 S.gaps.forEach(g=>{if(g.ok)return;const raw=g.el.value.trim(),v=parseAns(raw);
  if(v===null){all=false;g.el.classList.add('em');return}
  any=true;
  if(v&&same(v,g.want,raw)){g.ok=true;lock(g,B);return}
  all=false;g.tries++;g.el.classList.remove('no');void g.el.offsetWidth;g.el.classList.add('no');
  if(g.tries>=2&&!tips.includes(TIP[g.kind]))tips.push(TIP[g.kind])});
 B.tp.innerHTML='';
 if(!any&&!all){say(B,'Füll erst mal die gestrichelten Kästchen aus ✏️');return}
 tips.slice(0,2).forEach(t=>say(B,'💡 '+t));
 if(all)stageDone(B);
 else{const f=S.gaps.find(g=>!g.ok&&g.el.classList.contains('no'))||S.gaps.find(g=>!g.ok);if(f)f.el.focus()}}
function say(B,t){const d=document.createElement('div');d.textContent=t;B.tp.appendChild(d)}
function stageDone(B){
 if(B.cur<B.stages.length-1){setTimeout(()=>next(B),350);return}
 if(!AB&&!B.C){B.cHint=true;B.tp.innerHTML='';say(B,'Alle Lücken stimmen! 🙌 Nur ganz hinten fehlt noch etwas, das beim Aufleiten immer dazugehört 😉');B.cb.animate&&B.cb.animate([{transform:'scale(1)'},{transform:'scale(1.25)'},{transform:'scale(1)'}],{duration:500});return}
 finish(B)}
function finish(B){B.done=true;B.go.remove();B.tp.innerHTML='';
 const S=B.stages[B.cur];
 /* Ergebniszeile schön zusammenfassen: + −6 → − 6, x¹ → x, x⁰ fällt weg */
 const out=B.terms.map(t=>{
  if(AB){if(!t.x)return null;const v=qm(qm(t.e,t.c),Q(t.s));return{v,e:qs(t.e,ONE)}}
  const e1=qa(t.e,ONE);if(qz(e1))return{v:qm(t.c,Q(t.s)),ln:1};return{v:qm(qd(t.c,e1),Q(t.s)),e:e1}});
 let first=true;
 out.forEach((o,i)=>{const el=S.els[i];if(!o){el.innerHTML='';return}
  const s=o.v.n<0?-1:1,a=qabs(o.v);
  const op=first?(s<0?'<span class="op f">−</span>':''):'<span class="op">'+(s<0?'−':'+')+'</span>';first=false;
  const body=o.ln?(q1(a)?'':qh(a))+'&#8201;ln|'+X+'|':mono(a,o.e);
  el.innerHTML=op+'<span class="ok">'+body+'</span>'});
 if(first){S.els[0].innerHTML='<span class="ok">0</span>'}
 if(!AB&&B.cb){const c=B.cb.parentNode;c.innerHTML='<span class="op">+</span><span class="ok"><i>C</i></span>'}
 const ul=document.createElement('div');ul.className='ul';ul.style.gridRow=S.row+1;B.gd.appendChild(ul);
 fit();setTimeout(()=>confetti(ul),350);
 if(AB){const nt=[];B.terms.forEach((t,i)=>{if(!t.x)return;const v=qm(qm(t.e,t.c),Q(t.s));nt.push({s:v.n<0?-1:1,c:qabs(v),e:qs(t.e,ONE),x:!qz(qs(t.e,ONE)),rw:false})});
  if(nt.length){const b=document.createElement('button');b.className='go';b.type='button';b.innerHTML='nochmal ableiten <span aria-hidden="true">→</span> '+nameT(B.base,B.p+2);
   b.onclick=()=>{b.remove();const nb=mkBlock(nt,B.base,B.p+1);setTimeout(()=>{try{nb.el.scrollIntoView({behavior:'smooth',block:'nearest'})}catch(e){}},50)};B.ctl.appendChild(b)}}
}

/* ---------- Breite anpassen ---------- */
function fit(){let fs=24;host.style.setProperty('--fs',fs+'px');const W=host.clientWidth;if(!W)return;
 let guard=0;while(guard++<20&&fs>15&&blocks.some(B=>B.gd.scrollWidth>W-4)){fs-=1;host.style.setProperty('--fs',fs+'px')}}
let rz;window.addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(fit,120)});


mkBlock(terms0,NAME,0);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
