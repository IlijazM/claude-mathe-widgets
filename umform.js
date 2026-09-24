/*! claude-mathe-widgets · umform.js · https://github.com/IlijazM/claude-mathe-widgets */
(function(){
var CSS=".ml{position:relative;padding:.75rem 0 2rem;--fs:26px;--hl:rgba(250,199,117,.65);--acc:var(--text-accent,#185FA5);--red:var(--text-danger,#A32D2D);--mut:var(--text-secondary,#73726c);--ok:var(--text-success,#3B6D11);font-family:var(--font-voice,Georgia),Georgia,'Times New Roman',serif;color:var(--text-primary,#1f1e1d)}\n.ml .row{display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr) 288px;align-items:center;min-height:calc(var(--fs)*2.2);position:relative}\n.ml .sd{display:flex;align-items:center;font-size:var(--fs);white-space:nowrap;min-width:0}\n.ml .l{justify-content:flex-end}.ml .eqs{font-size:var(--fs);padding:0 .4em}\n.ml .tk{display:inline-flex;align-items:center;position:relative;border-radius:.22em;padding:0 .05em;line-height:1.3}\n.ml .o{margin:0 .22em}.ml .sg.f{margin:0 .06em 0 0}.ml .rt,.ml .fn{margin:0 .04em 0 .22em}.ml .u{margin-left:.22em;color:var(--mut)}.ml .p{color:var(--mut)}\n.ml i{font-style:italic}.ml i.ti{font-style:normal}.ml i.tg{color:var(--red)}.ml .b,.ml .b i,.ml .b.u{color:var(--acc)}\n.ml sup{font-size:.58em;position:relative;top:-.62em;line-height:0;margin-left:.04em}.ml sub{font-size:.58em;position:relative;top:.38em;line-height:0}.ml sup.ri{margin:0 -.1em 0 0}\n.ml .fr{display:inline-flex;flex-direction:column;align-items:center;font-size:.78em;line-height:1.12;vertical-align:middle}.ml .fr>span:last-child{border-top:1.5px solid currentColor;padding:0 .12em;min-width:100%;text-align:center}\n.ml .hid{visibility:hidden}\n.ml .st{position:relative;display:inline-block}.ml .st::after{content:'';position:absolute;left:-.1em;right:-.1em;top:50%;height:2px;background:var(--mut);opacity:.5;border-radius:2px;transform:rotate(-20deg) scaleX(0);transform-origin:left center;animation:mlst .35s ease-out forwards}.ml .st.now::after{animation:none;transform:rotate(-20deg) scaleX(1)}\n@keyframes mlst{to{transform:rotate(-20deg) scaleX(1)}}\n.ml .land{animation:mlland .55s ease-out}\n@keyframes mlland{0%{transform:scale(1)}35%{transform:scale(1.38);background:var(--hl)}100%{transform:scale(1);background:transparent}}\n.ml .pop{animation:mlpop .5s cubic-bezier(.3,1.7,.5,1)}\n@keyframes mlpop{0%{transform:scale(.2);opacity:0}100%{transform:scale(1);opacity:1}}\n.ml .fx{position:absolute;inset:0;pointer-events:none;font-size:var(--fs);z-index:3}\n.ml .cl{position:absolute;margin:0!important;box-sizing:border-box;display:flex;align-items:center;justify-content:center;white-space:nowrap}\n.ml .ct{position:relative;display:flex;align-items:center;gap:8px;font-family:var(--font-sans,system-ui),system-ui,sans-serif}\n.ml .bar{flex-shrink:0;width:1.5px;height:calc(var(--fs)*1.05);border-radius:1px;background:var(--border-strong,rgba(0,0,0,.16));margin:0 10px 0 16px}\n.ml .grp{display:inline-flex;align-items:stretch;height:40px;border:1.5px dashed var(--border-strong,rgba(0,0,0,.22));border-radius:13px;background:var(--surface-2,#fff);padding:2px}\n.ml .fd{display:inline-flex;align-items:center;justify-content:center;gap:6px;height:100%;min-width:54px;padding:0 9px 0 11px;margin:0;border:none;border-radius:10px;background:transparent;box-shadow:none;color:var(--text-primary,#1f1e1d);font:19px var(--font-voice,Georgia),Georgia,serif;cursor:pointer;transition:background .15s}\n.ml .fd:hover{background:var(--surface-1,#f5f4ef)}.ml .fd.on{background:var(--bg-accent,#E6F1FB);color:var(--text-accent,#185FA5)}.ml .pv{min-width:72px}\n.ml .fd>.ti{font-size:12px;color:var(--text-muted,#9a9893)}.ml .fv{display:inline-flex;align-items:center}\n.ml .sep{width:0;border-left:1.5px dashed var(--border-strong,rgba(0,0,0,.22));margin:6px 2px}\n.ml .ph{display:inline-block;width:12px;height:15px;border:1.5px dashed var(--text-muted,#9a9893);border-radius:3px;opacity:.8}\n.ml .menu{position:absolute;top:calc(100% + 6px);z-index:6;display:flex;flex-direction:column;gap:2px;min-width:132px;padding:5px;background:var(--surface-2,#fff);border:1.5px dashed var(--border-strong,rgba(0,0,0,.22));border-radius:13px;box-shadow:0 10px 28px rgba(0,0,0,.08);animation:mltray .18s ease-out}\n.ml .mi{display:flex;align-items:center;gap:12px;width:100%;height:38px;margin:0;padding:0 10px;border:none;border-radius:9px;background:transparent;box-shadow:none;color:var(--text-primary,#1f1e1d);font:19px var(--font-voice,Georgia),Georgia,serif;cursor:pointer;text-align:left}\n.ml .mi:hover{background:var(--surface-1,#f5f4ef)}.ml .mi.sel{background:var(--bg-accent,#E6F1FB);color:var(--text-accent,#185FA5)}\n.ml .mv{display:inline-flex;align-items:center;min-width:28px}.ml .lb{margin-left:auto;font:13px var(--font-sans,system-ui),system-ui,sans-serif;color:var(--text-secondary,#73726c)}\n.ml .fd .tk,.ml .mi .tk{line-height:1;padding:0}.ml .fd .o,.ml .mi .o{margin:0 .12em}\n.ml .go{flex-shrink:0;height:38px;padding:0 13px;border-radius:12px;border:none;background:var(--bg-accent,#E6F1FB);color:var(--text-accent,#185FA5);font:500 14px var(--font-sans,system-ui),system-ui,sans-serif;cursor:pointer;display:inline-flex;align-items:center;gap:5px}\n.ml .go:hover{filter:brightness(.97)}.ml .go i{font-size:16px}\n@keyframes mltray{from{opacity:0;transform:translateY(-6px)}}\n.ml .gh{color:var(--text-muted,#9a9893);opacity:.55}\n.ml .cf{position:absolute;display:block;pointer-events:none}\n.ml .mg{position:absolute;border-radius:14px;border:2px solid transparent;--mgb:var(--bg-pro,#EEEDFE);background:linear-gradient(var(--mgb),var(--mgb)) padding-box,conic-gradient(from var(--a),#7F77DD,#1D9E75,#D4537E,#EF9F27,#7F77DD) border-box;animation:mlspin 1.3s linear infinite}\n@property --a{syntax:'<angle>';inherits:false;initial-value:0deg}\n@keyframes mlspin{to{--a:360deg}}\n.ml .sk{position:absolute;font:14px system-ui;color:#EF9F27;animation:mltw .8s ease-in-out infinite alternate}.ml .sk:nth-child(2){color:#D4537E;animation-delay:.3s}.ml .sk:nth-child(3){color:#7F77DD;animation-delay:.55s}\n@keyframes mltw{from{opacity:.15;transform:scale(.5) rotate(0)}to{opacity:1;transform:scale(1.15) rotate(45deg)}}\n.ml .ul{position:absolute;height:5px;border-top:1.5px solid var(--ok);border-bottom:1.5px solid var(--ok);transform-origin:left;transform:scaleX(0);animation:mlul .6s ease-out forwards}.ml .ul.now{animation:none;transform:none}\n@keyframes mlul{to{transform:scaleX(1)}}\n.ml .hp{position:absolute;right:0;bottom:0;width:30px;height:30px;padding:0;border:none;background:transparent;color:var(--text-muted,#9a9893);font-size:18px;cursor:pointer}\n.ml .err{font:13px var(--font-sans,system-ui);color:var(--red);text-align:center;padding:4px 0}\n@media (max-width:560px){.ml .row{grid-template-columns:minmax(0,1fr) auto minmax(0,1fr)}.ml .ctl{grid-column:1/-1;justify-self:center}.ml .bar{display:none}.ml .ctl:empty{display:none}.ml .ct{margin:2px 0 10px}}";
var HTML="<div class=\"rows\"></div><div class=\"fx\"></div>";
function readCfg(host){
 var a=host.getAttribute('data-config');
 if(a){try{return JSON.parse(a)}catch(e){throw new Error('data-config ist kein gültiges JSON: '+e.message)}}
 return window.CONFIG||null;
}
function fail(host,msg){host.className='';host.innerHTML='<div style="font:13px system-ui,sans-serif;color:var(--text-danger,#A32D2D);text-align:center;padding:8px 0">'+String(msg).replace(/</g,'&lt;')+'</div>'}
function start(host,cfg){
 if(!document.getElementById("ml-css")){var st=document.createElement('style');st.id="ml-css";st.textContent=CSS;document.head.appendChild(st)}
 host.className="ml";host.innerHTML=HTML;
 try{run(cfg)}catch(e){fail(host,'Widget-Fehler: '+(e&&e.message||e))}
}
function boot(){
 var host=document.getElementById("ml");
 if(!host){host=document.createElement('div');host.id="ml";document.body.appendChild(host)}
 if(host.getAttribute('data-started'))return;
 var t0=Date.now();
 (function tryIt(){
  var cfg;try{cfg=readCfg(host)}catch(e){return fail(host,e.message)}
  if(cfg){host.setAttribute('data-started','1');return start(host,cfg)}
  if(Date.now()-t0<3000)return setTimeout(tryIt,50);
  fail(host,'Keine CONFIG gefunden – data-config am Container fehlt.');
 })();
}
window["MatheUmform"]=function(cfg){var host=document.getElementById("ml");if(host){host.setAttribute('data-started','1');start(host,cfg)}};
function run(CONFIG){
(function(){
const C=CONFIG,TG=C.target||'x',SPD=C.speed||1,VARS=C.vars||[];
const UNITS=(C.units||['m','cm','mm','km','s','min','h','g','kg','l','ml','N','J','W','kW','kWh','V','A','Pa','Hz','€','°C','K','mol']).filter(u=>u!==TG&&!VARS.includes(u));
const FN=['sqrt','log','lg','ln'],OPS=['×','÷','+','−','^','√','log'],OPL={'×':'mal','÷':'geteilt','+':'plus','−':'minus','^':'hoch','√':'Wurzel','log':'Logarithmus'};
const gcd=(a,b)=>{a=Math.abs(a);b=Math.abs(b);while(b)[a,b]=[b,a%b];return a||1};
const A=x=>{if(!isFinite(x))return{a:NaN};for(const d of[1,2,3,4,5,6,7,8,9,10,12,16,20,25,50,100,1000]){const r=Math.round(x*d);if(Math.abs(x*d-r)<1e-9&&Math.abs(r)<1e12)return Q(r,d)}return{a:x}};
const Q=(n,d=1)=>{if(d===0)return{a:NaN};if(!Number.isInteger(n)||!Number.isInteger(d)||Math.abs(n)>1e12||Math.abs(d)>1e12)return A(n/d);if(d<0){n=-n;d=-d}const g=gcd(n,d);return{n:n/g,d:d/g}};
const isA=q=>'a' in q,V=q=>isA(q)?q.a:q.n/q.d,bad=q=>isA(q)&&isNaN(q.a);
const add=(a,b)=>isA(a)||isA(b)?A(V(a)+V(b)):Q(a.n*b.d+b.n*a.d,a.d*b.d);
const mul=(a,b)=>isA(a)||isA(b)?A(V(a)*V(b)):Q(a.n*b.n,a.d*b.d);
const neg=a=>isA(a)?{a:-a.a}:{n:-a.n,d:a.d},inv=a=>isA(a)?A(1/a.a):Q(a.d,a.n),abs=a=>V(a)<0?neg(a):a;
const zero=a=>Math.abs(V(a))<1e-12,q1=a=>!isA(a)&&a.n===1&&a.d===1,qeq=(a,b)=>Math.abs(V(a)-V(b))<1e-10;
const iroot=(x,r)=>{if(x<0){if(r%2===0)return null;const y=iroot(-x,r);return y===null?null:-y}const y=Math.round(Math.pow(x,1/r));return Math.pow(y,r)===x?y:null};
function qpow(q,e){if(bad(q)||bad(e))return{a:NaN};
 if(!isA(q)&&!isA(e)){let p=e.n;const r=e.d,rn=iroot(q.n,r),rd=iroot(q.d,r);
  if(rn!==null&&rd!==null){let b=Q(rn,rd);if(p<0){b=inv(b);p=-p}if(p>60)return A(Math.pow(V(b),p));let o=Q(1);for(let i=0;i<p;i++)o=mul(o,b);return o}
  if(q.n<0)return r%2?A(Math.pow(-V(q),V(e))*(p%2?-1:1)):{a:NaN}}
 const x=V(q),y=V(e);if(x<0&&!Number.isInteger(y))return{a:NaN};return A(Math.pow(x,y))}
const qlog=(b,c)=>V(c)<=0||V(b)<=0||qeq(b,Q(1))?{a:NaN}:A(Math.log(V(c))/Math.log(V(b)));
const mOf=m=>Object.entries(m).filter(([,e])=>!zero(e)).sort((a,b)=>a[0]<b[0]?-1:1);
const mMerge=(a,b)=>{const o={...a};for(const[k,e]of Object.entries(b))o[k]=o[k]?add(o[k],e):e;for(const k in o)if(zero(o[k]))delete o[k];return o};
const mScale=(a,s)=>{const o={};for(const[k,e]of Object.entries(a)){const x=mul(e,s);if(!zero(x))o[k]=x}return o};
const mKey=m=>mOf(m).map(([k,e])=>k+'^'+V(e).toFixed(8)).join(',');
const T=(k,v={},u={},c=null,pm=false)=>({k,v,u,c,pm}),num=k=>T(k),pre=t=>T(t.k,t.v,t.u,null,t.pm),G=S=>T(Q(1),{},{},{f:'grp',a:S});
const pure=t=>!t.c&&!mOf(t.v).length&&!mOf(t.u).length;
const tMul=(a,b)=>{if(a.c&&b.c)throw new Error('mul');return T(mul(a.k,b.k),mMerge(a.v,b.v),mMerge(a.u,b.u),a.c||b.c,a.pm||b.pm)};
const tInv=t=>{if(t.c&&t.c.f!=='exp')throw new Error('inv');return T(inv(t.k),mScale(t.v,Q(-1)),mScale(t.u,Q(-1)),t.c?{f:'exp',p:t.c.p,a:t.c.a.map(x=>({...x,k:neg(x.k)}))}:null,t.pm)};
const tNeg=t=>({...t,k:neg(t.k)});
const sKey=S=>S.map(t=>V(t.k).toFixed(8)+'*'+tKey(t)).join('|');
const cKey=c=>c?c.f+':'+V(c.p||Q(0)).toFixed(8)+'['+sKey(c.a)+']':'';
const tKey=t=>mKey(t.v)+'#'+mKey(t.u)+'#'+cKey(t.c)+(t.pm?'±':'');
const tEq=(a,b)=>qeq(a.k,b.k)&&tKey(a)===tKey(b);
const hasVar=S=>S.some(t=>mOf(t.v).length||(t.c&&hasVar(t.c.a)));
const powT=(m,p)=>{const k=qpow(m.k,p);if(bad(k))return null;return T(k,mScale(m.v,p),mScale(m.u,p),null,!isA(p)&&p.d===1&&p.n%2===0?false:m.pm)};
function simpT(t,dist){
 if(zero(t.k))return[];if(!t.c)return[t];
 const c=t.c,a=norm(c.a).side,P=pre(t),o=a.length===1?a[0]:null,re=x=>simpT(x,dist);
 const triv=q1(P.k)&&!mOf(P.v).length&&!mOf(P.u).length&&!P.pm;
 if(c.f==='grp'){if(!a.length)return[];if(o)return re(tMul(P,o));if(dist||triv)return a.flatMap(x=>re(tMul(P,x)));return[{...P,c:{f:'grp',a}}]}
 if(c.f==='pow'){if(!a.length)return[];
  if(o&&!o.c){const r=powT(o,c.p);if(r&&!isA(r.k))return re(tMul(P,r))}
  if(o&&o.c){const oc=o.c,op=powT(pre(o),c.p);if(op){
   if(oc.f==='root'&&qeq(oc.p,c.p))return re(tMul(tMul(P,op),G(oc.a)));
   if(oc.f==='pow')return re(tMul(tMul(P,op),T(Q(1),{},{},{f:'pow',p:mul(oc.p,c.p),a:oc.a})));
   if(oc.f==='exp')return re(tMul(tMul(P,op),T(Q(1),{},{},{f:'exp',p:oc.p,a:oc.a.map(x=>({...x,k:mul(x.k,c.p)}))})))}}
  if(q1(c.p))return re(tMul(P,G(a)));return[{...P,c:{f:'pow',p:c.p,a}}]}
 if(c.f==='root'){if(!a.length)return[];const e=inv(c.p);
  if(o&&!o.c){const r=powT(o,e);if(r&&!isA(r.k))return re(tMul(P,r))}
  if(o&&o.c&&o.c.f==='pow'&&qeq(o.c.p,c.p)){const op=powT(pre(o),e);if(op&&!isA(op.k))return re(tMul(tMul(P,op),G(o.c.a)))}
  return[{...P,c:{f:'root',p:c.p,a}}]}
 if(c.f==='log'){
  if(o&&pure(o)&&V(o.k)>0){const r=qlog(c.p,o.k);if(!isA(r))return re(tMul(P,num(r)))}
  if(o&&o.c&&o.c.f==='exp'&&qeq(o.c.p,c.p)&&!mOf(o.v).length&&!mOf(o.u).length&&V(o.k)>0){const r=qlog(c.p,o.k);if(!isA(r))return re(tMul(P,G([...(zero(r)?[]:[num(r)]),...o.c.a])))}
  return[{...P,c:{f:'log',p:c.p,a}}]}
 if(c.f==='exp'){if(!a.length)return[P];if(o&&pure(o)){const r=qpow(c.p,o.k);if(!isA(r))return re(tMul(P,num(r)))}return[{...P,c:{f:'exp',p:c.p,a}}]}
 return[t]}
function norm(S){
 let it=[];S.forEach((t,i)=>{for(const r of simpT(t,S.length>1))it.push({t:r,o:[i]})});
 if(it.length>1&&it.some(x=>x.t.c&&x.t.c.f==='grp'))it=it.flatMap(x=>x.t.c&&x.t.c.f==='grp'?simpT(x.t,true).map(r=>({t:r,o:x.o})):[x]);
 const res=[],ix=new Map();
 for(const{t,o}of it){const k=tKey(t);if(ix.has(k)){const g=res[ix.get(k)];g.t={...g.t,k:add(g.t.k,t.k)};o.forEach(v=>g.src.add(v))}else{ix.set(k,res.length);res.push({t,src:new Set(o)})}}
 const side=[],cl=[];
 res.forEach(g=>{if(zero(g.t.k))cl.push({src:g.src,dst:new Set()});else{cl.push({src:g.src,dst:new Set([side.length])});side.push(g.t)}});
 S.forEach((t,i)=>{if(!cl.some(c=>c.src.has(i)))cl.push({src:new Set([i]),dst:new Set()})});
 if(!side.length){side.push(num(Q(0)));const all=new Set();cl.forEach(c=>c.src.forEach(v=>all.add(v)));cl.length=0;cl.push({src:all,dst:new Set([0])})}
 for(let m=true;m;){m=false;for(let i=0;i<cl.length&&!m;i++)for(let j=i+1;j<cl.length;j++)if([...cl[i].src].some(v=>cl[j].src.has(v))){cl[j].src.forEach(v=>cl[i].src.add(v));cl[j].dst.forEach(v=>cl[i].dst.add(v));cl.splice(j,1);m=true;break}}
 return{side,cl}}
const isTg=t=>!t.c&&q1(t.k)&&!t.pm&&mOf(t.v).length===1&&t.v[TG]&&q1(t.v[TG])&&!mOf(t.u).length;
const solved=eq=>eq.some((S,s)=>S.length===1&&isTg(S[0])&&!hasVar(eq[1-s]));
function applyOp(eq,op,m){
 const out={next:[],cl:[],gh:[]};
 eq.forEach(S=>{
  if(op==='+'||op==='−'){const all=S.concat([op==='+'?m:tNeg(m)]),r=norm(all);let g=0;r.cl.forEach(c=>{if(!c.dst.size)c.dst.add(r.side.length+g++)});out.next.push(r.side);out.gh.push(g);out.cl.push(r.cl.map(c=>({...c,move:c.src.size===1&&c.dst.size===1&&c.dst.values().next().value<r.side.length&&tEq(all[[...c.src][0]],r.side[[...c.dst][0]])})));return}
  const X=op==='×'?S.map(t=>tMul(t,m)):op==='÷'?S.map(t=>tMul(t,tInv(m))):[T(Q(1),{},{},{f:op==='^'?'pow':op==='√'?'root':'log',p:m.k,a:S})];
  const r=norm(X);out.next.push(r.side);out.gh.push(0);out.cl.push([{src:new Set([0]),dst:new Set(r.side.map((_,i)=>i)),move:false}])});
 if(op==='√'&&!isA(m.k)&&m.k.d===1&&m.k.n%2===0){const hv=out.next.map(hasVar);[0,1].forEach(s=>{if(!hv[s]&&hv[1-s]&&out.next[s].length===1)out.next[s][0]={...out.next[s][0],pm:true}})}
 return out}
/* rendering */
const term10=d=>{while(d%2===0)d/=2;while(d%5===0)d/=5;return d===1};
const dec=(x,k)=>String(+x.toFixed(k)).replace('.',',').replace('-','−');
const numH=q=>bad(q)?'?':isA(q)?'≈'+dec(q.a,3):q.d===1?String(q.n).replace('-','−'):term10(q.d)&&q.d<=10000?dec(q.n/q.d,4):`<span class="fr"><span>${String(q.n).replace('-','−')}</span><span>${q.d}</span></span>`;
const sH=q=>(V(q)<0?'−':'')+numH(abs(q));
const tk=(h,c,ti)=>({h,c,ti});
const vH=(x,e)=>`<span data-p="v:${x}"><i class="${x===TG?'tg':''}">${x}</i>${q1(e)?'':`<sup data-p="e">${sH(e)}</sup>`}</span>`;
const unitH=u=>{const P=mOf(u).filter(([,e])=>V(e)>0),N=mOf(u).filter(([,e])=>V(e)<0);if(!P.length&&!N.length)return'';const f=([k,e])=>k+(qeq(abs(e),Q(1))?'':`<sup>${numH(abs(e))}</sup>`);return(P.length?P.map(f).join('·'):'1')+(N.length?'/'+N.map(f).join('·'):'')};
const rootH=p=>(qeq(p,Q(2))?'':`<sup class="ri">${numH(p)}</sup>`)+'√';
const logH=p=>isA(p)&&Math.abs(p.a-Math.E)<1e-9?'ln':`log<sub>${numH(p)}</sub>`;
function body(t,ti){
 const out=[],pv=mOf(t.v).filter(([,e])=>V(e)>0),nv=mOf(t.v).filter(([,e])=>V(e)<0),uh=unitH(t.u),k=abs(t.k);
 const frac=!isA(k)&&(nv.length||(k.d!==1&&(pv.length||!term10(k.d))));
 if(frac){const nu=((k.n!==1||!pv.length)?`<span data-p="k">${k.n}</span>`:'')+pv.map(([x,e])=>vH(x,e)).join('');const de=(k.d!==1?k.d:'')+nv.map(([x,e])=>vH(x,abs(e))).join('');
  out.push(tk(`<span class="fr"><span>${nu}</span><span data-p="den">${de}</span></span>`,'n',ti));if(uh)out.push(tk(uh,'u',ti));if(uh&&t.c)out.push(tk('×','o',ti))}
 else{if(!q1(k)||(!pv.length&&!t.c))out.push(tk(`<span data-p="k">${numH(k)}</span>`,'n',ti));if(uh)out.push(tk(uh,'u',ti));if(uh&&(pv.length||t.c))out.push(tk('×','o',ti));else if(!uh&&t.c&&t.c.f==='exp'&&!q1(k))out.push(tk('×','o',ti));pv.forEach(([x,e])=>out.push(tk(vH(x,e),'v',ti)))}
 if(t.c){const c=t.c,inn=rS(c.a,ti),par=a=>[tk('(','p',ti),...a,tk(')','p',ti)];
  if(c.f==='grp')out.push(...par(inn));
  else if(c.f==='pow')out.push(...(inn.length===1?inn:par(inn)),tk(`<sup>${sH(c.p)}</sup>`,'n sp',ti));
  else if(c.f==='root')out.push(tk(rootH(c.p),'o rt',ti),...(inn.length===1?inn:par(inn)));
  else if(c.f==='log')out.push(tk(logH(c.p),'o fn',ti),...par(inn));
  else if(c.f==='exp')out.push(tk(`<span data-p="b">${numH(c.p)}</span><sup>${inn.map(x=>/\bo\b/.test(x.c)&&!/\bf\b/.test(x.c)?' '+x.h+' ':x.h).join('')}</sup>`,'n',ti))}
 return out}
function rT(t,ti,first){const n=V(t.k)<0,o=[];
 if(t.pm)o.push(tk(n?'∓':'±','o sg'+(first?' f':''),ti));else if(!first)o.push(tk(n?'−':'+','o sg',ti));else if(n)o.push(tk('−','o sg f',ti));
 return o.concat(body({...t,k:abs(t.k)},ti))}
const rS=(S,ti)=>S.length?S.flatMap((t,i)=>rT(t,ti??i,i===0)):[tk('0','n',ti??0)];
function opToks(S,op,m){
 const pm=op==='+'||op==='−',oti=pm?S.length:0,base=rS(S).map((x,i)=>({...x,role:'src',src:i,ti:pm?x.ti:0}));
 const B=(h,c)=>({...tk(h,c+' b',oti),role:'op'}),Nw=h=>({...tk(h,'p',oti),role:'new'});
 const mn=V(m.k)<0,mb=body({...m,k:abs(m.k)},oti).map(x=>({...x,c:x.c+' b',role:'op'}));
 const mP=f=>mn||f?[B('(','p'),...(mn?[B('−','o sg f')]:[]),...mb,B(')','p')]:mb;
 const wrap=(a,w)=>w?[Nw('('),...a,Nw(')')]:a;
 if(pm)return base.concat([B(op,'o sg')],mP(false));
 if(op==='×'||op==='÷')return[...wrap(base,S.length>1),B(op,'o'),...mP(mOf(m.u).length&&mb.length>1)];
 if(op==='^')return[...wrap(base,base.length>1),B(`<sup>${sH(m.k)}</sup>`,'n sp')];
 if(op==='√')return[B(rootH(m.k),'o rt'),...wrap(base,base.length>1)];
 return[B(logH(m.k),'o fn'),...wrap(base,true)]}
function strikes(S,op,m,toks){
 const r=[],P=(i,sel)=>r.push({i,sel});
 if(op==='+'||op==='−'){const all=S.concat([op==='+'?m:tNeg(m)]),used=new Set();
  for(let i=0;i<all.length;i++)for(let j=i+1;j<all.length;j++)if(!used.has(i)&&!used.has(j)&&tKey(all[i])===tKey(all[j])&&zero(add(all[i].k,all[j].k))){used.add(i);used.add(j)}
  toks.forEach((x,k)=>{if(used.has(x.ti))P(k)});return r}
 if(S.length!==1)return r;
 const t=S[0],bi=toks.map((x,i)=>x.role==='src'?i:-1).filter(i=>i>=0),find=f=>bi.find(i=>f(toks[i])),hit=(i,sel)=>{if(i!==undefined){P(i,sel);return 1}return 0};let h=0;
 if(op==='÷'){
  if(!q1(abs(m.k))&&qeq(abs(t.k),abs(m.k)))h+=hit(find(x=>x.h.includes('data-p="k"')),'[data-p="k"]');
  if(V(m.k)<0&&V(t.k)<0)h+=hit(find(x=>/\bsg\b/.test(x.c)));
  for(const[x]of mOf(m.v))if(t.v[x]&&qeq(t.v[x],m.v[x]))h+=hit(find(y=>y.h.includes(`data-p="v:${x}"`)),`[data-p="v:${x}"]`);
  if(mOf(m.u).length&&mKey(m.u)===mKey(t.u))h+=hit(find(y=>/\bu\b/.test(y.c)))}
 if(op==='×'){const dk=isA(t.k)?Q(1):Q(t.k.d),dv=mScale(Object.fromEntries(mOf(t.v).filter(([,e])=>V(e)<0)),Q(-1));
  if((!q1(dk)||mOf(dv).length)&&!mOf(m.u).length&&qeq(m.k,dk)&&mKey(m.v)===mKey(dv))h+=hit(find(y=>y.h.includes('data-p="den"')),'[data-p="den"]')}
 if(op==='√'){const vs=mOf(t.v);
  if(!t.c&&vs.length===1&&qeq(vs[0][1],m.k)&&!q1(m.k))h+=hit(find(y=>y.h.includes('data-p="e"')),'[data-p="e"]');
  if(t.c&&t.c.f==='pow'&&qeq(t.c.p,m.k))h+=hit(find(y=>/\bsp\b/.test(y.c)))}
 if(op==='^'&&t.c&&t.c.f==='root'&&qeq(t.c.p,m.k))h+=hit(find(y=>/\brt\b/.test(y.c)));
 if(op==='log'&&t.c&&t.c.f==='exp'&&qeq(t.c.p,m.k))h+=hit(find(y=>y.h.includes('data-p="b"')),'[data-p="b"]');
 if(h)toks.forEach((x,i)=>{if(x.role==='op'&&!/\bp\b/.test(x.c))P(i)});
 return r}
function gather(eq){
 const it=[],seen=new Set(),ad=m=>{if(zero(m.k)||bad(m.k))return;m={...m,k:abs(m.k)};const k=V(m.k).toFixed(8)+tKey(m);if(!seen.has(k)){seen.add(k);it.push(m)}};
 const walk=S=>S.forEach(t=>{const P={...pre(t),pm:false},vs=mOf(t.v);
  if(!t.c)ad(P);
  if((vs.length||t.c)&&(!q1(abs(P.k))||mOf(P.u).length))ad(T(P.k,{},P.u));
  vs.forEach(([x,e])=>{ad(T(Q(1),{[x]:Q(1)}));if(V(e)>0&&!q1(e))ad(T(Q(1),{[x]:e}));if(!q1(abs(e)))ad(num(abs(e)))});
  if(!isA(t.k)&&t.k.d!==1)ad(num(Q(t.k.d)));
  if(t.c){if(t.c.f!=='grp')ad(num(t.c.p));if(t.c.f!=='exp')walk(t.c.a)}});
 eq.forEach(walk);return it}
const okFor=(op,m)=>{const p=pure(m);if(op==='^')return p;if(op==='√')return p&&!isA(m.k)&&m.k.d===1&&m.k.n>=2;if(op==='log')return p&&V(m.k)>0&&!qeq(m.k,Q(1));return true};
const SUP={'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹','−':'⁻','+':'⁺',x:'ˣ',',':'˒'},SUB={'0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉'};
function plain(toks){const d=document.createElement('div');d.innerHTML=toks.map(x=>/\bo\b/.test(x.c)&&!/\b(f|rt|fn)\b/.test(x.c)?' '+x.h+' ':x.h).join('');
 const cv=(sel,M)=>d.querySelectorAll(sel).forEach(s=>s.replaceWith([...s.textContent].map(c=>M[c]??c).join('')));cv('sup',SUP);cv('sub',SUB);
 d.querySelectorAll('.fr').forEach(f=>f.replaceWith(f.children[0].textContent+'/'+f.children[1].textContent));return d.textContent.replace(/\s+/g,' ').trim()}
const label=m=>(V(m.k)<0?'−':'')+plain(body({...m,k:abs(m.k)},0));
const itemH=m=>(V(m.k)<0?'<span class="tk o sg f">−</span>':'')+body({...m,k:abs(m.k)},0).map(x=>`<span class="tk ${x.c}">${x.h}</span>`).join('');
/* parser */
function parse(str){
 const s=str.replace(/²/g,'^2').replace(/³/g,'^3').replace(/[−–]/g,'-').replace(/[×·]/g,'*').replace(/[÷\/]/g,':'),tk=[];let i=0;
 while(i<s.length){const ch=s[i];if(/\s/.test(ch)){i++;continue}
  let m=/^\d+(?:[.,]\d+)?/.exec(s.slice(i));if(m){tk.push({t:'n',v:m[0].replace(',','.')});i+=m[0].length;continue}
  m=/^[A-Za-zäöüÄÖÜßµΩ€°]+/.exec(s.slice(i));if(m){const w=m[0];if(FN.includes(w)||UNITS.includes(w)||VARS.includes(w)||w===TG)tk.push({t:'id',v:w});else for(const c of w)tk.push({t:'id',v:c});i+=w.length;continue}
  tk.push(ch==='√'?{t:'id',v:'sqrt'}:{t:'o',v:ch});i++}
 let p=0;const eat=v=>{if(tk[p]&&tk[p].v===v&&tk[p].t!=='n'){p++;return true}return false},need=v=>{if(!eat(v))throw new Error(v)};
 const one=S=>{if(S.length!==1)throw new Error('term');return S[0]};
 const expr=()=>{let S=term();for(;;){if(eat('+'))S=S.concat(term());else if(eat('-'))S=S.concat(term().map(tNeg));else return S}};
 const term=()=>{let S=unary();for(;;){const t=tk[p];if(!t)return S;if(t.v==='*'&&t.t==='o'){p++;S=[tMul(one(S),one(unary()))]}else if(t.v===':'&&t.t==='o'){p++;S=[tMul(one(S),tInv(one(unary())))]}else if(t.t==='n'||t.t==='id'||t.v==='(')S=[tMul(one(S),one(power()))];else return S}};
 const unary=()=>eat('-')?unary().map(tNeg):eat('+')?unary():power();
 const power=()=>{let b=prim();if(eat('^')){let e=unary();const e0=e[0];if(e.length===1&&e0.c&&e0.c.f==='grp'&&q1(e0.k)&&!mOf(e0.v).length)e=e0.c.a;
  const bt=one(b);if(e.length===1&&pure(e[0])){const n=e[0].k;if(!bt.c&&q1(bt.k)&&(mOf(bt.v).length+mOf(bt.u).length)>0)b=[powT(bt,n)];else b=[T(Q(1),{},{},{f:'pow',p:n,a:b})]}
  else if(pure(bt)&&V(bt.k)>0)b=[T(Q(1),{},{},{f:'exp',p:bt.k,a:e})];else throw new Error('pow')}return b};
 const grp=()=>{need('(');const S=expr();need(')');return S};
 const prim=()=>{const t=tk[p++];if(!t)throw new Error('end');
  if(t.t==='n'){const[a,b='']=t.v.split('.');return[num(Q(parseInt(a+b,10),10**b.length))]}
  if(t.v==='('){p--;const S=grp();return S.length===1?S:[G(S)]}
  if(t.t==='id'){if(t.v==='sqrt')return[T(Q(1),{},{},{f:'root',p:Q(2),a:tk[p]&&tk[p].v==='('?grp():power()})];
   if(['log','lg','ln'].includes(t.v)){let b=t.v==='ln'?{a:Math.E}:Q(10);if(eat('_'))b=one(prim()).k;return[T(Q(1),{},{},{f:'log',p:b,a:grp()})]}
   if(UNITS.includes(t.v))return[T(Q(1),{},{[t.v]:Q(1)})];return[T(Q(1),{[t.v]:Q(1)})]}
  throw new Error(t.v)};
 const L=expr();need('=');const R=expr();if(p<tk.length)throw new Error('rest');return[L,R]}
/* ui */
const R0=document.getElementById('ml'),ROWS=R0.querySelector('.rows'),FX=R0.querySelector('.fx');let rows=[],busy=false;
const ms=x=>x/SPD,wait=x=>new Promise(r=>setTimeout(r,ms(x)));
function rel(el){const a=el.getBoundingClientRect(),b=R0.getBoundingClientRect();return{x:a.left-b.left,y:a.top-b.top,w:a.width,h:a.height}}
function tokEl(x,h){const e=document.createElement('span');e.className='tk '+x.c+(h?' hid':'');e.innerHTML=x.h;x.el=e;return e}
function mkRow(kind,toks,eq,hide){
 const r={kind,toks,eq,el:document.createElement('div')};r.el.className='row '+kind;
 const L=document.createElement('div'),E=document.createElement('div'),Rr=document.createElement('div'),ct=document.createElement('div');
 L.className='sd l';Rr.className='sd r';E.className='eqs'+(hide?' hid':'');E.textContent='=';ct.className='ctl';
 toks[0].forEach(x=>L.appendChild(tokEl(x,hide)));toks[1].forEach(x=>Rr.appendChild(tokEl(x,hide)));
 r.sides=[L,Rr];r.eqEl=E;r.ct=ct;r.el.append(L,E,Rr,ct);if(kind==='eq')buildCtl(r);ROWS.appendChild(r.el);return r}
const ICON={'^':'<svg width="22" height="20" viewBox="0 0 22 20" aria-hidden="true"><rect x="1.5" y="6.5" width="11" height="12" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="14.5" y="1" width="6.5" height="7" rx="1.8" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>','√':'<svg width="27" height="20" viewBox="0 0 27 20" aria-hidden="true"><path d="M1.5 11.5l3-1.3 4.2 8.3L13.8 1.5H25.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/><rect x="15" y="5.5" width="9.5" height="11" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>','log':'<span style="font-size:16px">log</span><svg width="9" height="11" viewBox="0 0 9 11" style="margin-top:10px" aria-hidden="true"><rect x=".75" y=".75" width="7.5" height="9.5" rx="1.8" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>'};
const opH=o=>ICON[o]||o,CHEV='<i class="ti ti-chevron-down" aria-hidden="true"></i>',PH='<span class="ph"></span>';let openTray=null;
function closeTray(){if(openTray){openTray.t.remove();openTray.b.classList.remove('on');openTray=null;R0.style.paddingBottom=''}}
document.addEventListener('click',e=>{if(openTray&&!e.target.closest('.ct'))closeTray()});
function buildCtl(r){
 const E=(t,c)=>{const e=document.createElement(t);e.className=c;return e},c=E('div','ct'),bar=E('span','bar'),g=E('div','grp'),bo=E('button','fd'),sep=E('span','sep'),bv=E('button','fd pv'),gb=E('button','go');
 gb.innerHTML='weiter <i class="ti ti-arrow-right" aria-hidden="true"></i>';bo.setAttribute('aria-label','Rechenart');bv.setAttribute('aria-label','Zahl');r.items=gather(r.eq);r.sel={op:'',i:-1};
 const paint=()=>{const{op,i}=r.sel;bo.innerHTML=`<span class="fv">${op?opH(op):PH}</span>${CHEV}`;bv.innerHTML=`<span class="fv">${i>=0?itemH(r.items[i]):PH}</span>${CHEV}`;
  const same=r.applied&&r.applied.op===op&&r.applied.i===i;gb.style.visibility=op&&i>=0&&!same?'visible':'hidden'};
 const tray=(kind,btn)=>{const was=openTray&&openTray.b===btn;closeTray();if(was)return;const t=E('div','menu');
  const list=kind==='op'?OPS.map(o=>({h:`<span class="mv">${opH(o)}</span><span class="lb">${OPL[o]}</span>`,v:o,l:OPL[o]})):r.items.map((m,i)=>({h:`<span class="mv">${itemH(m)}</span>`,v:i,l:label(m),ok:!r.sel.op||okFor(r.sel.op,m)})).filter(x=>x.ok!==false);
  list.forEach(x=>{const b=E('button','mi'+((kind==='op'?r.sel.op:r.sel.i)===x.v?' sel':''));b.innerHTML=x.h;b.setAttribute('aria-label',x.l);
   b.onclick=e=>{e.stopPropagation();if(kind==='op'){r.sel.op=x.v;if(r.sel.i>=0&&!okFor(x.v,r.items[r.sel.i]))r.sel.i=-1;paint();closeTray();if(r.sel.i<0)tray('val',bv)}else{r.sel.i=x.v;paint();closeTray()}};t.appendChild(b)});
  t.style.left=g.offsetLeft+btn.offsetLeft+'px';c.appendChild(t);btn.classList.add('on');openTray={t,b:btn};
  const rb=R0.getBoundingClientRect();let mb=t.getBoundingClientRect();if(mb.right>rb.right-2){t.style.left=Math.max(0,t.offsetLeft-(mb.right-rb.right+2))+'px';mb=t.getBoundingClientRect()}if(mb.bottom>rb.bottom-12)R0.style.paddingBottom=(mb.bottom-rb.bottom+44)+'px'};
 bo.onclick=e=>{e.stopPropagation();if(!busy)tray('op',bo)};bv.onclick=e=>{e.stopPropagation();if(!busy)tray('val',bv)};
 gb.onclick=()=>{if(!busy&&r.sel.op&&r.sel.i>=0){closeTray();goRow(r,r.sel.op,r.sel.i,true)}};
 g.append(bo,sep,bv);c.append(bar,g,gb);r.ct.appendChild(c);Object.assign(r,{paint});paint()}
function clone(el,r){const c=el.cloneNode(true);c.classList.remove('hid','land','pop');c.classList.add('cl');Object.assign(c.style,{left:r.x+'px',top:r.y+'px',width:r.w+'px',height:r.h+'px'});FX.appendChild(c);return c}
const ez='cubic-bezier(.55,0,.25,1)';
async function land(de){de.classList.remove('hid');de.classList.add('land');setTimeout(()=>de.classList.remove('land'),600);await wait(280)}
async function fly(se,de){const s=rel(se),d=rel(de),c=clone(se,s);
 await c.animate([{transform:'none'},{transform:`translate(${d.x-s.x}px,${d.y-s.y}px)`}],{duration:ms(380),easing:ez,fill:'forwards'}).finished;c.remove();await land(de)}
async function flyFrom(sr,de,delay){await wait(delay);const d=rel(de),s={x:sr.x+sr.w/2-d.w/2,y:sr.y+sr.h/2-d.h/2,w:d.w,h:d.h},c=clone(de,s);
 await c.animate([{transform:'scale(.6)',opacity:.3},{transform:`translate(${d.x-s.x}px,${d.y-s.y}px)`,opacity:1}],{duration:ms(520),easing:ez,fill:'forwards'}).finished;c.remove();await land(de)}
const show=r=>{r.el.querySelectorAll('.hid').forEach(e=>e.classList.remove('hid'))};
async function animOp(r,O){
 for(let s=0;s<2;s++){for(const x of O.toks[s])if(x.role==='src')await fly(r.toks[s][x.src].el,x.el);if(!s)await fly(r.eqEl,O.eqEl)}
 const sr=rel(r.ct.querySelector('.pv'));
 for(let s=0;s<2;s++){O.toks[s].filter(x=>x.role==='new').forEach(x=>{x.el.classList.remove('hid');x.el.classList.add('pop')});
  await Promise.all(O.toks[s].filter(x=>x.role==='op').map((x,j)=>flyFrom(sr,x.el,j*70)))}}
async function strike(O,stk,anim){for(let s=0;s<2;s++)for(const{i,sel}of stk[s]){const el=O.toks[s][i].el,t=sel?el.querySelector(sel)||el:el;t.classList.add('st');if(!anim)t.classList.add('now');else await wait(140)}}
async function magic(se,de,N){
 const rs=se.map(rel);if(!rs.length)return;let D;
 if(de.length){const R=de.map(rel),x1=Math.min(...R.map(r=>r.x)),x2=Math.max(...R.map(r=>r.x+r.w)),y1=Math.min(...R.map(r=>r.y)),y2=Math.max(...R.map(r=>r.y+r.h));D={x:x1,y:y1,w:x2-x1,h:y2-y1}}
 else{const rr=rel(N.el),cx=(Math.min(...rs.map(r=>r.x))+Math.max(...rs.map(r=>r.x+r.w)))/2;D={x:cx,y:rr.y+rr.h/2-rs[0].h/2,w:0,h:rs[0].h}}
 const sc=.72,gap=2,tw=rs.reduce((a,r)=>a+r.w*sc,0)+gap*(rs.length-1),cx=D.x+D.w/2,cy=D.y+D.h/2,H=Math.max(D.h,...rs.map(r=>r.h*sc))+12,W0=Math.max(tw,D.w)+26,W1=D.w?D.w+22:18;
 const box=document.createElement('div');box.className='mg';Object.assign(box.style,{left:cx-W0/2+'px',top:cy-H/2+'px',width:W0+'px',height:H+'px'});
 box.innerHTML='<span class="sk" style="left:-9px;top:-11px">✦</span><span class="sk" style="right:-8px;top:-13px">✦</span><span class="sk" style="left:46%;bottom:-15px">✦</span>';FX.appendChild(box);
 box.animate([{opacity:0,transform:'scale(.4)'},{opacity:1,transform:'scale(1)'}],{duration:ms(300),easing:'cubic-bezier(.3,1.5,.5,1)'});await wait(240);
 let x=cx-tw/2;const cl=se.map((el,i)=>{const r=rs[i],c=clone(el,r),sx=x+r.w*sc/2,tx=sx-(r.x+r.w/2),ty=cy-(r.y+r.h/2);x+=r.w*sc+gap;
  c.animate([{transform:'none'},{transform:`translate(${tx}px,${ty}px) scale(${sc})`}],{duration:ms(560),easing:ez,fill:'forwards'});return{c,tx,ty,sx}});
 await wait(1250);
 cl.forEach(o=>o.c.animate([{transform:`translate(${o.tx}px,${o.ty}px) scale(${sc})`,opacity:1},{transform:`translate(${o.tx+cx-o.sx}px,${o.ty}px) scale(.1)`,opacity:0}],{duration:ms(340),easing:'ease-in',fill:'forwards'}));
 box.animate([{left:cx-W0/2+'px',width:W0+'px'},{left:cx-W1/2+'px',width:W1+'px'}],{duration:ms(420),easing:'ease-in-out',fill:'forwards'});
 await wait(360);cl.forEach(o=>o.c.remove());
 const rv=de.map(el=>{const c=clone(el,rel(el));c.classList.add('pop');return c});await wait(750);
 de.forEach(el=>el.classList.remove('hid'));rv.forEach(c=>c.remove());
 await box.animate([{opacity:1},{opacity:0}],{duration:ms(260),fill:'forwards'}).finished;box.remove()}
async function animRes(O,N,cls){
 for(let s=0;s<2;s++){
  const mn=c=>Math.min(...c.src),C=[...cls[s]].sort((a,b)=>mn(a)-mn(b));
  for(const c of C){const src=O.toks[s].filter(x=>c.src.has(x.ti)),dst=N.toks[s].filter(x=>c.dst.has(x.ti)),sg=x=>/\bsg\b/.test(x.c),ns=src.filter(x=>!sg(x)),nd=dst.filter(x=>!sg(x));
   if(c.move&&ns.length===nd.length){dst.filter(sg).forEach(x=>{x.el.classList.remove('hid');x.el.classList.add('pop')});for(let j=0;j<ns.length;j++)await fly(ns[j].el,nd[j].el)}
   else await magic(src.map(x=>x.el),dst.map(x=>x.el),N)}
  if(!s)await fly(O.eqEl,N.eqEl)}
 show(N)}
function fit(){let fs=parseFloat(getComputedStyle(R0).getPropertyValue('--fs'))||26;
 const over=()=>rows.some(r=>r.sides.some(s=>{const a=s.getBoundingClientRect(),f=s.firstElementChild,l=s.lastElementChild;return f&&(f.getBoundingClientRect().left<a.left-1||l.getBoundingClientRect().right>a.right+1)}));
 while(over()&&fs>14){fs-=2;R0.style.setProperty('--fs',fs+'px')}}
function underline(N,anim){const ts=[...N.toks[0],...N.toks[1]].filter(x=>!/\bgh\b/.test(x.c)).map(x=>x.el).concat(N.eqEl).map(rel),b=rel(N.el),x1=Math.min(...ts.map(r=>r.x)),x2=Math.max(...ts.map(r=>r.x+r.w)),y2=Math.max(...ts.map(r=>r.y+r.h));
 const u=document.createElement('div');u.className='ul'+(anim?'':' now');Object.assign(u.style,{left:x1-b.x-4+'px',width:x2-x1+8+'px',top:y2-b.y+3+'px'});N.el.appendChild(u)}
async function goRow(r,op,i,anim){
 busy=true;closeTray();const k=rows.indexOf(r);rows.slice(k+1).forEach(x=>x.el.remove());rows=rows.slice(0,k+1);FX.innerHTML='';R0.querySelectorAll('.err').forEach(e=>e.remove());
 r.applied={op,i};r.paint();const m=r.items[i];
 try{const res=applyOp(r.eq,op,m),ot=r.eq.map(S=>opToks(S,op,m)),stk=r.eq.map((S,s)=>strikes(S,op,m,ot[s]));
  const O=mkRow('op',ot,null,anim);rows.push(O);fit();
  if(anim)await animOp(r,O);await strike(O,stk,anim);if(anim)await wait(500);
  const N=mkRow('eq',res.next.map((S,s)=>rS(S).concat(...Array.from({length:res.gh[s]},(_,j)=>[tk('+','o sg gh',S.length+j),tk('0','n gh',S.length+j)]))),res.next,anim);rows.push(N);fit();
  if(anim){N.ct.style.visibility='hidden';await animRes(O,N,res.cl);N.ct.style.visibility=''}
  if(solved(res.next)){N.el.classList.add('done');N.ct.style.visibility='hidden';underline(N,anim);if(anim)setTimeout(()=>confetti(N),350)}}
 catch(e){console.error(e)}
 busy=false}
const OPN={'*':'×','·':'×',x:'×',mal:'×','/':'÷',':':'÷',geteilt:'÷','-':'−',minus:'−',plus:'+',hoch:'^',pow:'^',wurzel:'√',sqrt:'√',root:'√'};
function confetti(N){const u=N.el.querySelector('.ul'),b=rel(u||N.el),cx=b.x+b.w/2,cy=b.y,cols=['#7F77DD','#1D9E75','#D4537E','#EF9F27','#378ADD','#E24B4A','#97C459'];
 for(let i=0;i<80;i++){const p=document.createElement('span'),w=5+Math.random()*5;p.className='cf';Object.assign(p.style,{left:cx+'px',top:cy+'px',width:w+'px',height:w*(Math.random()<.5?1.8:1)+'px',background:cols[i%cols.length],borderRadius:Math.random()<.3?'50%':'2px'});FX.appendChild(p);
  const a=.15+Math.random()*(Math.PI-.3),v=200+Math.random()*260,vx=Math.cos(a)*v*1.4,vy=-Math.sin(a)*v,g=560,D=1.4+Math.random()*.9,rot=(Math.random()-.5)*1000,kf=[];
  for(let k=0;k<=10;k++){const t=D*k/10;kf.push({transform:`translate(${vx*t}px,${vy*t+g*t*t}px) rotate(${rot*t}deg)`,opacity:k<6?1:1-(k-6)/4})}
  p.animate(kf,{duration:D*1000,fill:'forwards'}).finished.then(()=>p.remove())}}
function help(){const st=rows.filter(r=>r.applied).map(r=>r.applied.op+' '+label(r.items[r.applied.i])),L=rows[rows.length-1],cur=plain(rS(L.eq[0]))+' = '+plain(rS(L.eq[1]));
 const msg=`Hilf mir beim nächsten Schritt: ${C.equation} (gesucht: ${TG}). Bisherige Schritte: ${st.join(' | ')||'keine'}. Aktuell: ${cur}`;if(typeof sendPrompt==='function')sendPrompt(msg)}
try{const eq0=parse(C.equation);rows.push(mkRow('eq',eq0.map(S=>rS(S)),eq0,false));fit();
 const hp=document.createElement('button');hp.className='hp';hp.setAttribute('aria-label','Hilfe');hp.innerHTML='<i class="ti ti-lifebuoy" aria-hidden="true"></i>';hp.onclick=help;R0.appendChild(hp);
 (async()=>{const st=C.steps||[];for(let j=0;j<st.length;j++){const r=rows[rows.length-1];if(!r.paint||r.el.classList.contains('done'))break;const op=OPN[st[j].op]||st[j].op;if(!OPS.includes(op))break;
  let m;try{m=one0(parse('0='+st[j].val)[1]);m={...m,k:abs(m.k)}}catch(e){break}let i=r.items.findIndex(x=>tEq(x,m));if(i<0){r.items.push(m);i=r.items.length-1}
  r.sel={op,i};r.paint();await goRow(r,op,i,!!C.animateLast&&j===st.length-1)}})()}
catch(e){ROWS.innerHTML=`<div class="err">${C.equation}</div>`}
function one0(S){if(S.length!==1)throw 0;return S[0]}
})();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
