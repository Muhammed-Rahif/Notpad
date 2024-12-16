var O=t=>{throw TypeError(t)};var $=(t,e,r)=>e.has(t)||O("Cannot "+r);var n=(t,e,r)=>($(t,e,"read from private field"),r?r.call(t):e.get(t)),c=(t,e,r)=>e.has(t)?O("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,r),d=(t,e,r,s)=>($(t,e,"write to private field"),s?s.call(t,r):e.set(t,r),r),p=(t,e,r)=>($(t,e,"access private method"),r);var B=(t,e,r,s)=>({set _(i){d(t,e,i,r)},get _(){return n(t,e,s)}});import{a as R,p as x,_ as H,u as S,$ as J,d as o,b as C,a0 as K,c as N,e as j}from"./svelte-9THILXAE.js";var v,E,a,l,f,F,I;class Q{constructor(e,r){c(this,f);c(this,v,R());c(this,E);c(this,a,0);c(this,l,null);n(this,v).v=x(e),d(this,E,r)}get current(){return H()?S(()=>(B(this,a)._++,n(this,a)===1&&p(this,f,F).call(this,!0),()=>{J().then(()=>{B(this,a)._--,n(this,a)===0&&p(this,f,I).call(this)})})):n(this,a)===0&&(p(this,f,F).call(this,!1),p(this,f,I).call(this)),o(n(this,v))}}v=new WeakMap,E=new WeakMap,a=new WeakMap,l=new WeakMap,f=new WeakSet,F=function(e){d(this,l,n(this,E).call(this,r=>{C(n(this,v),x(r))},e)??null)},I=function(){n(this,l)!==null&&(n(this,l).call(this),d(this,l,null))};const q=new Q(null,(t,e)=>{function r(){t(document.activeElement)}if(r(),!!e)return document.addEventListener("focusin",r),document.addEventListener("focusout",r),()=>{document.removeEventListener("focusin",r),document.removeEventListener("focusout",r)}});function D(t){return typeof t=="function"}function T(t){return D(t)?t():t}var h;class et{constructor(e,r={box:"border-box"}){c(this,h,R(x({width:0,height:0})));var s,i;n(this,h).v=x({width:((s=r.initialSize)==null?void 0:s.width)??0,height:((i=r.initialSize)==null?void 0:i.height)??0}),S(()=>{const u=T(e);if(!u)return;const b=new ResizeObserver(g=>{for(const L of g){const m=r.box==="content-box"?L.contentBoxSize:L.borderBoxSize,W=Array.isArray(m)?m:[m];o(n(this,h)).width=W.reduce((_,P)=>Math.max(_,P.inlineSize),0),o(n(this,h)).height=W.reduce((_,P)=>Math.max(_,P.blockSize),0)}});return b.observe(u),()=>{b.disconnect()}})}get width(){return o(n(this,h)).width}get height(){return o(n(this,h)).height}}h=new WeakMap;function M(t,e){if(D(t)){const r=t;return r()??e??r()}return t??e??t}function U(t,e,r,s){const i=Array.isArray(e)?e:[e];for(const u of i)t.addEventListener(u,r,s);return()=>{for(const u of i)t.removeEventListener(u,r,s)}}function rt(t,e,r,s){S(()=>{const i=M(t),u=M(e);if(i!=null)return U(i,u,r,s)})}function V(t,e){switch(t){case"post":S(e);break;case"pre":K(e);break}}function G(t,e,r,s={}){const{lazy:i=!1}=s;let u=!i,b=Array.isArray(t)?[]:void 0;V(e,()=>{const g=Array.isArray(t)?t.map(m=>m()):t();if(!u){u=!0,b=g;return}const L=N(()=>r(g,b));return b=g,L})}function X(t,e,r){G(t,"post",e,r)}function Y(t,e,r){G(t,"pre",e,r)}X.pre=Y;var w,y;class nt{constructor(e){c(this,w,R());c(this,y);S(()=>{C(n(this,w),x(n(this,y))),d(this,y,e())})}get current(){return o(n(this,w))}}w=new WeakMap,y=new WeakMap;var z,A,k;class st{constructor(e){c(this,z);c(this,A,j(()=>M(n(this,z))));c(this,k,j(()=>!o(n(this,A))||!q.current?!1:o(n(this,A)).contains(q.current)));d(this,z,e)}get current(){return o(n(this,k))}}z=new WeakMap,A=new WeakMap,k=new WeakMap;export{et as E,st as I,nt as P,rt as u,X as w};