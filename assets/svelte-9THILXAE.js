var jn=Object.getPrototypeOf;var Hn=Reflect.get;var ke=r=>{throw TypeError(r)};var qe=(r,e,n)=>e.has(r)||ke("Cannot "+n);var O=(r,e,n)=>(qe(r,e,"read from private field"),n?n.call(r):e.get(r)),$r=(r,e,n)=>e.has(r)?ke("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(r):e.set(r,n);var jr=(r,e,n)=>(qe(r,e,"access private method"),n);var Be=(r,e,n)=>Hn(jn(r),n,e);import{D as sn}from"./esm-env-rsSWfq8L.js";const Yn="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(Yn);let mr=!1;function Kn(){mr=!0}Kn();const ye=1,be=2,un=4,Wn=8,Gn=16,Jn=1,Zn=2,fn=4,Xn=8,Qn=16,rt=1,et=2,nt=4,tt=1,it=2,P=Symbol(),st="http://www.w3.org/2000/svg";var xr=Array.isArray,ge=Array.from,ut=Object.defineProperty,er=Object.getOwnPropertyDescriptor,an=Object.getOwnPropertyDescriptors,on=Object.prototype,ft=Array.prototype,Fr=Object.getPrototypeOf;function pr(r){return typeof r=="function"}const D=()=>{};function at(r){return typeof(r==null?void 0:r.then)=="function"}function ot(r){return r()}function Zr(r){for(var e=0;e<r.length;e++)r[e]()}const q=2,ln=4,Br=8,ne=16,B=32,zr=64,ce=128,cr=256,Xr=512,$=1024,sr=2048,Tr=4096,j=8192,Sr=16384,cn=32768,vr=65536,lt=1<<17,vn=1<<19,_n=1<<20,nr=Symbol("$state"),dn=Symbol("legacy props"),ct=Symbol("");function pn(r){return r===this.v}function te(r,e){return r!=r?e==e:r!==e||r!==null&&typeof r=="object"||typeof r=="function"}function vt(r,e){return r!==e}function Ee(r){return!te(r,this.v)}function _t(r){throw new Error("effect_in_teardown")}function dt(){throw new Error("effect_in_unowned_derived")}function pt(r){throw new Error("effect_orphan")}function ht(){throw new Error("effect_update_depth_exceeded")}function wt(r){throw new Error("props_invalid_value")}function yt(){throw new Error("state_descriptors_fixed")}function bt(){throw new Error("state_prototype_fixed")}function gt(){throw new Error("state_unsafe_local_read")}function Et(){throw new Error("state_unsafe_mutation")}function N(r){return{f:0,v:r,reactions:null,equals:pn,version:0}}function Ai(r){return hn(N(r))}function Er(r,e=!1){var t;const n=N(r);return e||(n.equals=Ee),mr&&E!==null&&E.l!==null&&((t=E.l).s??(t.s=[])).push(n),n}function Ni(r,e=!1){return hn(Er(r,e))}function hn(r){return T!==null&&T.f&q&&(H===null?Pt([r]):H.push(r)),r}function C(r,e){return T!==null&&Cr()&&T.f&(q|ne)&&(H===null||!H.includes(r))&&Et(),wr(r,e)}function wr(r,e){return r.equals(e)||(r.v=e,r.version=In(),wn(r,sr),Cr()&&g!==null&&g.f&$&&!(g.f&B)&&(I!==null&&I.includes(r)?(z(g,sr),se(g)):ir===null?It([r]):ir.push(r))),e}function wn(r,e){var n=r.reactions;if(n!==null)for(var t=Cr(),i=n.length,s=0;s<i;s++){var u=n[s],o=u.f;o&sr||!t&&u===g||(z(u,e),o&($|cr)&&(o&q?wn(u,Tr):se(u)))}}function Qr(r){var e=q|sr;g===null?e|=cr:g.f|=_n;var n=T!==null&&T.f&q?T:null;const t={children:null,ctx:E,deps:null,equals:pn,f:e,fn:r,reactions:null,v:null,version:0,parent:n??g};return n!==null&&(n.children??(n.children=[])).push(t),t}function mt(r){const e=Qr(r);return e.equals=Ee,e}function yn(r){var e=r.children;if(e!==null){r.children=null;for(var n=0;n<e.length;n+=1){var t=e[n];t.f&q?me(t):W(t)}}}function xt(r){for(var e=r.parent;e!==null;){if(!(e.f&q))return e;e=e.parent}return null}function bn(r){var e,n=g;R(xt(r));try{yn(r),e=Dn(r)}finally{R(n)}return e}function gn(r){var e=bn(r),n=(ar||r.f&cr)&&r.deps!==null?Tr:$;z(r,n),r.equals(e)||(r.v=e,r.version=In())}function me(r){yn(r),qr(r,0),z(r,Sr),r.v=r.children=r.deps=r.ctx=r.reactions=null}function En(r){g===null&&T===null&&pt(),T!==null&&T.f&cr&&dt(),Se&&_t()}function Tt(r,e){var n=e.last;n===null?e.last=e.first=r:(n.next=r,r.prev=n,e.last=r)}function Ar(r,e,n,t=!0){var i=(r&zr)!==0,s=g,u={ctx:E,deps:null,deriveds:null,nodes_start:null,nodes_end:null,f:r|sr,first:null,fn:e,last:null,next:null,parent:i?null:s,prev:null,teardown:null,transitions:null,version:0};if(n){var o=yr;try{ze(!0),Vr(u),u.f|=cn}catch(a){throw W(u),a}finally{ze(o)}}else e!==null&&se(u);var l=n&&u.deps===null&&u.first===null&&u.nodes_start===null&&u.teardown===null&&(u.f&_n)===0;if(!l&&!i&&t&&(s!==null&&Tt(u,s),T!==null&&T.f&q)){var f=T;(f.children??(f.children=[])).push(u)}return u}function Oi(){return T===null?!1:!ar}function xe(r){const e=Ar(Br,null,!1);return z(e,$),e.teardown=r,e}function ve(r){En();var e=g!==null&&(g.f&B)!==0&&E!==null&&!E.m;if(e){var n=E;(n.e??(n.e=[])).push({fn:r,effect:g,reaction:T})}else{var t=Ur(r);return t}}function St(r){return En(),Nr(r)}function At(r){const e=Ar(zr,r,!0);return()=>{W(e)}}function Ur(r){return Ar(ln,r,!1)}function Ci(r,e){var n=E,t={effect:null,ran:!1};n.l.r1.push(t),t.effect=Nr(()=>{r(),!t.ran&&(t.ran=!0,C(n.l.r2,!0),Y(e))})}function Pi(){var r=E;Nr(()=>{if(A(r.l.r2)){for(var e of r.l.r1){var n=e.effect;n.f&$&&z(n,Tr),Pr(n)&&Vr(n),e.ran=!1}r.l.r2.v=!1}})}function Nr(r){return Ar(Br,r,!0)}function Ii(r){return K(r)}function K(r,e=0){return Ar(Br|ne|e,r,!0)}function M(r,e=!0){return Ar(Br|B,r,!0,e)}function mn(r){var e=r.teardown;if(e!==null){const n=Se,t=T;Ue(!0),k(null);try{e.call(null)}finally{Ue(n),k(t)}}}function xn(r){var e=r.deriveds;if(e!==null){r.deriveds=null;for(var n=0;n<e.length;n+=1)me(e[n])}}function Tn(r,e=!1){var n=r.first;for(r.first=r.last=null;n!==null;){var t=n.next;W(n,e),n=t}}function Nt(r){for(var e=r.first;e!==null;){var n=e.next;e.f&B||W(e),e=n}}function W(r,e=!0){var n=!1;if((e||r.f&vn)&&r.nodes_start!==null){for(var t=r.nodes_start,i=r.nodes_end;t!==null;){var s=t===i?null:fe(t);t.remove(),t=s}n=!0}Tn(r,e&&!n),xn(r),qr(r,0),z(r,Sr);var u=r.transitions;if(u!==null)for(const l of u)l.stop();mn(r);var o=r.parent;o!==null&&o.first!==null&&Sn(r),r.next=r.prev=r.teardown=r.ctx=r.deps=r.fn=r.nodes_start=r.nodes_end=null}function Sn(r){var e=r.parent,n=r.prev,t=r.next;n!==null&&(n.next=t),t!==null&&(t.prev=n),e!==null&&(e.first===r&&(e.first=t),e.last===r&&(e.last=n))}function X(r,e){var n=[];Te(r,n,!0),An(n,()=>{W(r),e&&e()})}function An(r,e){var n=r.length;if(n>0){var t=()=>--n||e();for(var i of r)i.out(t)}else e()}function Te(r,e,n){if(!(r.f&j)){if(r.f^=j,r.transitions!==null)for(const u of r.transitions)(u.is_global||n)&&e.push(u);for(var t=r.first;t!==null;){var i=t.next,s=(t.f&vr)!==0||(t.f&B)!==0;Te(t,e,s?n:!1),t=i}}}function tr(r){Nn(r,!0)}function Nn(r,e){if(r.f&j){Pr(r)&&Vr(r),r.f^=j;for(var n=r.first;n!==null;){var t=n.next,i=(n.f&vr)!==0||(n.f&B)!==0;Nn(n,i?e:!1),n=t}if(r.transitions!==null)for(const s of r.transitions)(s.is_global||e)&&s.in()}}let re=!1,_e=[];function On(){re=!1;const r=_e.slice();_e=[],Zr(r)}function Or(r){re||(re=!0,queueMicrotask(On)),_e.push(r)}function Ot(){re&&On()}function ie(r){throw new Error("lifecycle_outside_component")}const Cn=0,Ct=1;let Kr=!1,Wr=Cn,kr=!1,yr=!1,Se=!1;function ze(r){yr=r}function Ue(r){Se=r}let fr=[],br=0;let T=null;function k(r){T=r}let g=null;function R(r){g=r}let H=null;function Pt(r){H=r}let I=null,L=0,ir=null;function It(r){ir=r}let Pn=0,ar=!1,E=null;function Ve(r){E=r}function In(){return++Pn}function Cr(){return!mr||E!==null&&E.l===null}function Pr(r){var u,o;var e=r.f;if(e&sr)return!0;if(e&Tr){var n=r.deps,t=(e&cr)!==0;if(n!==null){var i;if(e&Xr){for(i=0;i<n.length;i++)((u=n[i]).reactions??(u.reactions=[])).push(r);r.f^=Xr}for(i=0;i<n.length;i++){var s=n[i];if(Pr(s)&&gn(s),t&&g!==null&&!ar&&!((o=s==null?void 0:s.reactions)!=null&&o.includes(r))&&(s.reactions??(s.reactions=[])).push(r),s.version>r.version)return!0}}t||z(r,$)}return!1}function Dt(r,e){for(var n=e;n!==null;){if(n.f&ce)try{n.fn(r);return}catch{n.f^=ce}n=n.parent}throw Kr=!1,r}function $t(r){return(r.f&Sr)===0&&(r.parent===null||(r.parent.f&ce)===0)}function Ae(r,e,n,t){if(Kr){if(n===null&&(Kr=!1),$t(e))throw r;return}n!==null&&(Kr=!0);{Dt(r,e);return}}function Dn(r){var c;var e=I,n=L,t=ir,i=T,s=ar,u=H,o=E,l=r.f;I=null,L=0,ir=null,T=l&(B|zr)?null:r,ar=!yr&&(l&cr)!==0,H=null,E=r.ctx;try{var f=(0,r.fn)(),a=r.deps;if(I!==null){var v;if(qr(r,L),a!==null&&L>0)for(a.length=L+I.length,v=0;v<I.length;v++)a[L+v]=I[v];else r.deps=a=I;if(!ar)for(v=L;v<a.length;v++)((c=a[v]).reactions??(c.reactions=[])).push(r)}else a!==null&&L<a.length&&(qr(r,L),a.length=L);return f}finally{I=e,L=n,ir=t,T=i,ar=s,H=u,E=o}}function Rt(r,e){let n=e.reactions;if(n!==null){var t=n.indexOf(r);if(t!==-1){var i=n.length-1;i===0?n=e.reactions=null:(n[t]=n[i],n.pop())}}n===null&&e.f&q&&(I===null||!I.includes(e))&&(z(e,Tr),e.f&(cr|Xr)||(e.f^=Xr),qr(e,0))}function qr(r,e){var n=r.deps;if(n!==null)for(var t=e;t<n.length;t++)Rt(r,n[t])}function Vr(r){var e=r.f;if(!(e&Sr)){z(r,$);var n=g,t=E;g=r;try{e&ne?Nt(r):Tn(r),xn(r),mn(r);var i=Dn(r);r.teardown=typeof i=="function"?i:null,r.version=Pn}catch(s){Ae(s,r,n,t||r.ctx)}finally{g=n}}}function $n(){br>1e3&&(br=0,ht()),br++}function Rn(r){var e=r.length;if(e!==0){$n();var n=yr;yr=!0;try{for(var t=0;t<e;t++){var i=r[t];i.f&$||(i.f^=$);var s=[];Ln(i,s),Lt(s)}}finally{yr=n}}}function Lt(r){var e=r.length;if(e!==0)for(var n=0;n<e;n++){var t=r[n];if(!(t.f&(Sr|j)))try{Pr(t)&&(Vr(t),t.deps===null&&t.first===null&&t.nodes_start===null&&(t.teardown===null?Sn(t):t.fn=null))}catch(i){Ae(i,t,null,t.ctx)}}}function Mt(){if(kr=!1,br>1001)return;const r=fr;fr=[],Rn(r),kr||(br=0)}function se(r){Wr===Cn&&(kr||(kr=!0,queueMicrotask(Mt)));for(var e=r;e.parent!==null;){e=e.parent;var n=e.f;if(n&(zr|B)){if(!(n&$))return;e.f^=$}}fr.push(e)}function Ln(r,e){var n=r.first,t=[];r:for(;n!==null;){var i=n.f,s=(i&B)!==0,u=s&&(i&$)!==0,o=n.next;if(!u&&!(i&j))if(i&Br){if(s)n.f^=$;else try{Pr(n)&&Vr(n)}catch(v){Ae(v,n,null,n.ctx)}var l=n.first;if(l!==null){n=l;continue}}else i&ln&&t.push(n);if(o===null){let v=n.parent;for(;v!==null;){if(r===v)break r;var f=v.next;if(f!==null){n=f;continue r}v=v.parent}}n=o}for(var a=0;a<t.length;a++)l=t[a],e.push(l),Ln(l,e)}function Ne(r){var e=Wr,n=fr;try{$n();const i=[];Wr=Ct,fr=i,kr=!1,Rn(n);var t=r==null?void 0:r();return Ot(),(fr.length>0||i.length>0)&&Ne(),br=0,t}finally{Wr=e,fr=n}}async function Di(){await Promise.resolve(),Ne()}function A(r){var a;var e=r.f,n=(e&q)!==0;if(n&&e&Sr){var t=bn(r);return me(r),t}if(T!==null){H!==null&&H.includes(r)&&gt();var i=T.deps;I===null&&i!==null&&i[L]===r?L++:I===null?I=[r]:I.push(r),ir!==null&&g!==null&&g.f&$&&!(g.f&B)&&ir.includes(r)&&(z(g,sr),se(g))}else if(n&&r.deps===null)for(var s=r,u=s.parent,o=s;u!==null;)if(u.f&q){var l=u;o=l,u=l.parent}else{var f=u;(a=f.deriveds)!=null&&a.includes(o)||(f.deriveds??(f.deriveds=[])).push(o);break}return n&&(s=r,Pr(s)&&gn(s)),r.v}function Y(r){const e=T;try{return T=null,r()}finally{T=e}}const Ft=~(sr|Tr|$);function z(r,e){r.f=r.f&Ft|e}function $i(r){return ue().get(r)}function Ri(r,e){return ue().set(r,e),e}function Li(r){return ue().has(r)}function Mi(){return ue()}function ue(r){return E===null&&ie(),E.c??(E.c=new Map(kt(E)||void 0))}function kt(r){let e=r.p;for(;e!==null;){const n=e.c;if(n!==null)return n;e=e.p}return null}function je(r,e=1){var n=+A(r);return C(r,n+e),n}function qt(r,e=!1,n){E={p:E,c:null,e:null,m:!1,s:r,x:null,l:null},mr&&!e&&(E.l={s:null,u:null,r1:[],r2:N(!1)})}function Bt(r){const e=E;if(e!==null){const u=e.e;if(u!==null){var n=g,t=T;e.e=null;try{for(var i=0;i<u.length;i++){var s=u[i];R(s.effect),k(s.reaction),Ur(s.fn)}}finally{R(n),k(t)}}E=e.p,e.m=!0}return{}}function Mn(r){if(!(typeof r!="object"||!r||r instanceof EventTarget)){if(nr in r)de(r);else if(!Array.isArray(r))for(let e in r){const n=r[e];typeof n=="object"&&n&&nr in n&&de(n)}}}function de(r,e=new Set){if(typeof r=="object"&&r!==null&&!(r instanceof EventTarget)&&!e.has(r)){e.add(r),r instanceof Date&&r.getTime();for(let t in r)try{de(r[t],e)}catch{}const n=Fr(r);if(n!==Object.prototype&&n!==Array.prototype&&n!==Map.prototype&&n!==Set.prototype&&n!==Date.prototype){const t=an(n);for(let i in t){const s=t[i].get;if(s)try{s.call(r)}catch{}}}}}function hr(r,e=null,n){if(typeof r!="object"||r===null||nr in r)return r;const t=Fr(r);if(t!==on&&t!==ft)return r;var i=new Map,s=xr(r),u=N(0);s&&i.set("length",N(r.length));var o;return new Proxy(r,{defineProperty(l,f,a){(!("value"in a)||a.configurable===!1||a.enumerable===!1||a.writable===!1)&&yt();var v=i.get(f);return v===void 0?(v=N(a.value),i.set(f,v)):C(v,hr(a.value,o)),!0},deleteProperty(l,f){var a=i.get(f);if(a===void 0)f in l&&i.set(f,N(P));else{if(s&&typeof f=="string"){var v=i.get("length"),c=Number(f);Number.isInteger(c)&&c<v.v&&C(v,c)}C(a,P),He(u)}return!0},get(l,f,a){var p;if(f===nr)return r;var v=i.get(f),c=f in l;if(v===void 0&&(!c||(p=er(l,f))!=null&&p.writable)&&(v=N(hr(c?l[f]:P,o)),i.set(f,v)),v!==void 0){var _=A(v);return _===P?void 0:_}return Reflect.get(l,f,a)},getOwnPropertyDescriptor(l,f){var a=Reflect.getOwnPropertyDescriptor(l,f);if(a&&"value"in a){var v=i.get(f);v&&(a.value=A(v))}else if(a===void 0){var c=i.get(f),_=c==null?void 0:c.v;if(c!==void 0&&_!==P)return{enumerable:!0,configurable:!0,value:_,writable:!0}}return a},has(l,f){var _;if(f===nr)return!0;var a=i.get(f),v=a!==void 0&&a.v!==P||Reflect.has(l,f);if(a!==void 0||g!==null&&(!v||(_=er(l,f))!=null&&_.writable)){a===void 0&&(a=N(v?hr(l[f],o):P),i.set(f,a));var c=A(a);if(c===P)return!1}return v},set(l,f,a,v){var S;var c=i.get(f),_=f in l;if(s&&f==="length")for(var p=a;p<c.v;p+=1){var w=i.get(p+"");w!==void 0?C(w,P):p in l&&(w=N(P),i.set(p+"",w))}c===void 0?(!_||(S=er(l,f))!=null&&S.writable)&&(c=N(void 0),C(c,hr(a,o)),i.set(f,c)):(_=c.v!==P,C(c,hr(a,o)));var h=Reflect.getOwnPropertyDescriptor(l,f);if(h!=null&&h.set&&h.set.call(v,a),!_){if(s&&typeof f=="string"){var d=i.get("length"),y=Number(f);Number.isInteger(y)&&y>=d.v&&C(d,y+1)}He(u)}return!0},ownKeys(l){A(u);var f=Reflect.ownKeys(l).filter(c=>{var _=i.get(c);return _===void 0||_.v!==P});for(var[a,v]of i)v.v!==P&&!(a in l)&&f.push(a);return f},setPrototypeOf(){bt()}})}function He(r,e=1){C(r,r.v+e)}var Ye,Fn,kn;function zt(){if(Ye===void 0){Ye=window;var r=Element.prototype,e=Node.prototype;Fn=er(e,"firstChild").get,kn=er(e,"nextSibling").get,r.__click=void 0,r.__className="",r.__attributes=null,r.__styles=null,r.__e=void 0,Text.prototype.__t=void 0}}function Ir(r=""){return document.createTextNode(r)}function or(r){return Fn.call(r)}function fe(r){return kn.call(r)}function Fi(r,e){return or(r)}function ki(r,e){{var n=or(r);return n instanceof Comment&&n.data===""?fe(n):n}}function qi(r,e=1,n=!1){let t=r;for(;e--;)t=fe(t);return t}function Ut(r){r.textContent=""}let qn=!1;function Bi(r){}function zi(r=1){}function Vt(r,e){if(e){const n=document.body;r.autofocus=!0,Or(()=>{document.activeElement===n&&r.focus()})}}let Ke=!1;function jt(){Ke||(Ke=!0,document.addEventListener("reset",r=>{Promise.resolve().then(()=>{var e;if(!r.defaultPrevented)for(const n of r.target.elements)(e=n.__on_r)==null||e.call(n)})},{capture:!0}))}function Ht(r,e,n,t=!0){t&&n();for(var i of e)r.addEventListener(i,n);xe(()=>{for(var s of e)r.removeEventListener(s,n)})}function Oe(r){var e=T,n=g;k(null),R(null);try{return r()}finally{k(e),R(n)}}function Yt(r,e,n,t=n){r.addEventListener(e,()=>Oe(n));const i=r.__on_r;i?r.__on_r=()=>{i(),t()}:r.__on_r=t,jt()}const Bn=new Set,pe=new Set;function Ce(r,e,n,t){function i(s){if(t.capture||Lr.call(e,s),!s.cancelBubble)return Oe(()=>n.call(this,s))}return r.startsWith("pointer")||r.startsWith("touch")||r==="wheel"?Or(()=>{e.addEventListener(r,i,t)}):e.addEventListener(r,i,t),i}function Ui(r,e,n,t={}){var i=Ce(e,r,n,t);return()=>{r.removeEventListener(e,i,t)}}function Vi(r,e,n,t,i){var s={capture:t,passive:i},u=Ce(r,e,n,s);(e===document.body||e===window||e===document)&&xe(()=>{e.removeEventListener(r,u,s)})}function Kt(r){for(var e=0;e<r.length;e++)Bn.add(r[e]);for(var n of pe)n(r)}function Lr(r){var y;var e=this,n=e.ownerDocument,t=r.type,i=((y=r.composedPath)==null?void 0:y.call(r))||[],s=i[0]||r.target,u=0,o=r.__root;if(o){var l=i.indexOf(o);if(l!==-1&&(e===document||e===window)){r.__root=e;return}var f=i.indexOf(e);if(f===-1)return;l<=f&&(u=l)}if(s=i[u]||r.target,s!==e){ut(r,"currentTarget",{configurable:!0,get(){return s||n}});var a=T,v=g;k(null),R(null);try{for(var c,_=[];s!==null;){var p=s.assignedSlot||s.parentNode||s.host||null;try{var w=s["__"+t];if(w!==void 0&&!s.disabled)if(xr(w)){var[h,...d]=w;h.apply(s,[r,...d])}else w.call(s,r)}catch(S){c?_.push(S):c=S}if(r.cancelBubble||p===e||p===null)break;s=p}if(c){for(let S of _)queueMicrotask(()=>{throw S});throw c}}finally{r.__root=e,delete r.currentTarget,k(a),R(v)}}}function ji(r){var e;e=document.head.appendChild(Ir());try{K(()=>r(e),vn)}finally{}}function Pe(r){var e=document.createElement("template");return e.innerHTML=r,e.content}function lr(r,e){var n=g;n.nodes_start===null&&(n.nodes_start=r,n.nodes_end=e)}function Hi(r,e){var n=(e&tt)!==0,t=(e&it)!==0,i,s=!r.startsWith("<!>");return()=>{i===void 0&&(i=Pe(s?r:"<!>"+r),n||(i=or(i)));var u=t?document.importNode(i,!0):i.cloneNode(!0);if(n){var o=or(u),l=u.lastChild;lr(o,l)}else lr(u,u);return u}}function Yi(r,e,n="svg"){var t=!r.startsWith("<!>"),i=`<${n}>${t?r:"<!>"+r}</${n}>`,s;return()=>{if(!s){var u=Pe(i),o=or(u);s=or(o)}var l=s.cloneNode(!0);return lr(l,l),l}}function Ki(r=""){{var e=Ir(r+"");return lr(e,e),e}}function Wi(){var r=document.createDocumentFragment(),e=document.createComment(""),n=Ir();return r.append(e,n),lr(e,n),r}function Gi(r,e){r!==null&&r.before(e)}function Wt(r){return r.endsWith("capture")&&r!=="gotpointercapture"&&r!=="lostpointercapture"}const Gt=["beforeinput","click","change","dblclick","contextmenu","focusin","focusout","input","keydown","keyup","mousedown","mousemove","mouseout","mouseover","mouseup","pointerdown","pointermove","pointerout","pointerover","pointerup","touchend","touchmove","touchstart"];function Jt(r){return Gt.includes(r)}const Zt={formnovalidate:"formNoValidate",ismap:"isMap",nomodule:"noModule",playsinline:"playsInline",readonly:"readOnly",srcobject:"srcObject"};function Xt(r){return r=r.toLowerCase(),Zt[r]??r}const Qt=["touchstart","touchmove"];function ri(r){return Qt.includes(r)}let ee=!0;function We(r){ee=r}function Ji(r,e){var n=e==null?"":typeof e=="object"?e+"":e;n!==(r.__t??(r.__t=r.nodeValue))&&(r.__t=n,r.nodeValue=n==null?"":n+"")}function Zi(r,e){return ei(r,e)}const _r=new Map;function ei(r,{target:e,anchor:n,props:t={},events:i,context:s,intro:u=!0}){zt();var o=new Set,l=v=>{for(var c=0;c<v.length;c++){var _=v[c];if(!o.has(_)){o.add(_);var p=ri(_);e.addEventListener(_,Lr,{passive:p});var w=_r.get(_);w===void 0?(document.addEventListener(_,Lr,{passive:p}),_r.set(_,1)):_r.set(_,w+1)}}};l(ge(Bn)),pe.add(l);var f=void 0,a=At(()=>{var v=n??e.appendChild(Ir());return M(()=>{if(s){qt({});var c=E;c.c=s}i&&(t.$$events=i),ee=u,f=r(v,t)||{},ee=!0,s&&Bt()}),()=>{var p;for(var c of o){e.removeEventListener(c,Lr);var _=_r.get(c);--_===0?(document.removeEventListener(c,Lr),_r.delete(c)):_r.set(c,_)}pe.delete(l),he.delete(f),v!==n&&((p=v.parentNode)==null||p.removeChild(v))}});return he.set(f,a),f}let he=new WeakMap;function Xi(r){const e=he.get(r);e&&e()}const ni=[];function Qi(r,e=!1){return Gr(r,new Map,"",ni)}function Gr(r,e,n,t,i=null){if(typeof r=="object"&&r!==null){const u=e.get(r);if(u!==void 0)return u;if(r instanceof Map)return new Map(r);if(r instanceof Set)return new Set(r);if(xr(r)){const o=[];e.set(r,o),i!==null&&e.set(i,o);for(let l=0;l<r.length;l+=1)o.push(Gr(r[l],e,n,t));return o}if(Fr(r)===on){const o={};e.set(r,o),i!==null&&e.set(i,o);for(var s in r)o[s]=Gr(r[s],e,n,t);return o}if(r instanceof Date)return structuredClone(r);if(typeof r.toJSON=="function")return Gr(r.toJSON(),e,n,t,r)}if(r instanceof EventTarget)return r;try{return structuredClone(r)}catch{return r}}const oe=0,Hr=1,le=2;function rs(r,e,n,t,i){var s=r,u=Cr(),o=E,l=P,f,a,v,c=(u?N:Er)(void 0),_=(u?N:Er)(void 0),p=!1;function w(d,y){p=!0,y&&(R(h),k(h),Ve(o));try{d===oe&&n&&(f?tr(f):f=M(()=>n(s))),d===Hr&&t&&(a?tr(a):a=M(()=>t(s,c))),d===le&&i&&(v?tr(v):v=M(()=>i(s,_))),d!==oe&&f&&X(f,()=>f=null),d!==Hr&&a&&X(a,()=>a=null),d!==le&&v&&X(v,()=>v=null)}finally{y&&(Ve(null),k(null),R(null),Ne())}}var h=K(()=>{if(l!==(l=e())){if(at(l)){var d=l;p=!1,d.then(y=>{d===l&&(wr(c,y),w(Hr,!0))},y=>{if(d===l)throw wr(_,y),w(le,!0),_.v}),Or(()=>{p||w(oe,!0)})}else wr(c,l),w(Hr,!1);return()=>l=P}})}function es(r,e,n,t=null,i=!1){var s=r,u=null,o=null,l=null,f=i?vr:0;K(()=>{l!==(l=!!e())&&(l?(u?tr(u):u=M(()=>n(s)),o&&X(o,()=>{o=null})):(o?tr(o):t&&(o=M(()=>t(s))),u&&X(u,()=>{u=null})))},f)}function ns(r,e,n){var t=r,i=P,s,u=Cr()?vt:te;K(()=>{u(i,i=e())&&(s&&X(s),s=M(()=>n(t)))})}function ts(r,e){return e}function ti(r,e,n,t){for(var i=[],s=e.length,u=0;u<s;u++)Te(e[u].e,i,!0);var o=s>0&&i.length===0&&n!==null;if(o){var l=n.parentNode;Ut(l),l.append(n),t.clear(),Q(r,e[0].prev,e[s-1].next)}An(i,()=>{for(var f=0;f<s;f++){var a=e[f];o||(t.delete(a.k),Q(r,a.prev,a.next)),W(a.e,!o)}})}function is(r,e,n,t,i,s=null){var u=r,o={items:new Map,first:null},l=(e&un)!==0;if(l){var f=r;u=f.appendChild(Ir())}var a=null,v=!1;K(()=>{var c=n(),_=xr(c)?c:c==null?[]:ge(c),p=_.length;if(!(v&&p===0)){v=p===0;{var w=T;ii(_,o,u,i,e,(w.f&j)!==0,t)}s!==null&&(p===0?a?tr(a):a=M(()=>s(u)):a!==null&&X(a,()=>{a=null})),n()}})}function ii(r,e,n,t,i,s,u){var $e,Re,Le,Me;var o=(i&Wn)!==0,l=(i&(ye|be))!==0,f=r.length,a=e.items,v=e.first,c=v,_,p=null,w,h=[],d=[],y,S,b,m;if(o)for(m=0;m<f;m+=1)y=r[m],S=u(y,m),b=a.get(S),b!==void 0&&(($e=b.a)==null||$e.measure(),(w??(w=new Set)).add(b));for(m=0;m<f;m+=1){if(y=r[m],S=u(y,m),b=a.get(S),b===void 0){var F=c?c.e.nodes_start:n;p=ui(F,e,p,p===null?e.first:p.next,y,S,m,t,i),a.set(S,p),h=[],d=[],c=p.next;continue}if(l&&si(b,y,m,i),b.e.f&j&&(tr(b.e),o&&((Re=b.a)==null||Re.unfix(),(w??(w=new Set)).delete(b))),b!==c){if(_!==void 0&&_.has(b)){if(h.length<d.length){var G=d[0],x;p=G.prev;var J=h[0],ur=h[h.length-1];for(x=0;x<h.length;x+=1)Ge(h[x],G,n);for(x=0;x<d.length;x+=1)_.delete(d[x]);Q(e,J.prev,ur.next),Q(e,p,J),Q(e,ur,G),c=G,p=ur,m-=1,h=[],d=[]}else _.delete(b),Ge(b,c,n),Q(e,b.prev,b.next),Q(e,b,p===null?e.first:p.next),Q(e,p,b),p=b;continue}for(h=[],d=[];c!==null&&c.k!==S;)(s||!(c.e.f&j))&&(_??(_=new Set)).add(c),d.push(c),c=c.next;if(c===null)continue;b=c}h.push(b),p=b,c=b.next}if(c!==null||_!==void 0){for(var Dr=_===void 0?[]:ge(_);c!==null;)(s||!(c.e.f&j))&&Dr.push(c),c=c.next;var ae=Dr.length;if(ae>0){var Vn=i&un&&f===0?n:null;if(o){for(m=0;m<ae;m+=1)(Le=Dr[m].a)==null||Le.measure();for(m=0;m<ae;m+=1)(Me=Dr[m].a)==null||Me.fix()}ti(e,Dr,Vn,a)}}o&&Or(()=>{var Fe;if(w!==void 0)for(b of w)(Fe=b.a)==null||Fe.apply()}),g.first=e.first&&e.first.e,g.last=p&&p.e}function si(r,e,n,t){t&ye&&wr(r.v,e),t&be?wr(r.i,n):r.i=n}function ui(r,e,n,t,i,s,u,o,l){var f=(l&ye)!==0,a=(l&Gn)===0,v=f?a?Er(i):N(i):i,c=l&be?N(u):u,_={i:c,v,k:s,a:null,e:null,prev:n,next:t};try{return _.e=M(()=>o(r,v,c),qn),_.e.prev=n&&n.e,_.e.next=t&&t.e,n===null?e.first=_:(n.next=_,n.e.next=_.e),t!==null&&(t.prev=_,t.e.prev=_.e),_}finally{}}function Ge(r,e,n){for(var t=r.next?r.next.e.nodes_start:n,i=e?e.e.nodes_start:n,s=r.e.nodes_start;s!==t;){var u=fe(s);i.before(s),s=u}}function Q(r,e,n){e===null?r.first=n:(e.next=n,e.e.next=n&&n.e),n!==null&&(n.prev=e,n.e.prev=e&&e.e)}function ss(r,e,n,t,i){var s=r,u="",o;K(()=>{u!==(u=e()??"")&&(o!==void 0&&(W(o),o=void 0),u!==""&&(o=M(()=>{var l=u+"",f=Pe(l);lr(or(f),f.lastChild),s.before(f)})))})}function us(r,e,n,t,i){var o;var s=(o=e.$$slots)==null?void 0:o[n],u=!1;s===!0&&(s=e[n==="default"?"children":n],u=!0),s===void 0?i!==null&&i(r):s(r,u?()=>t:t)}function fs(r,e,...n){var t=r,i=D,s;K(()=>{i!==(i=e())&&(s&&(W(s),s=null),s=M(()=>i(t,...n)))},vr)}function as(r,e,n){var t=r,i,s;K(()=>{i!==(i=e())&&(s&&(X(s),s=null),i&&(s=M(()=>n(t,i))))},vr)}function os(r,e,n,t,i,s){var u,o,l=null,f=r,a;K(()=>{const v=e()||null;var c=v==="svg"?st:null;v!==u&&(a&&(v===null?X(a,()=>{a=null,o=null}):v===o?tr(a):(W(a),We(!1))),v&&v!==o&&(a=M(()=>{if(l=c?document.createElementNS(c,v):document.createElement(v),lr(l,l),t){var _=l.appendChild(Ir());t(l,_)}g.nodes_end=l,f.before(l)})),u=v,u&&(o=u),We(!0))},vr)}function ls(r,e,n){Ur(()=>{var t=Y(()=>e(r,n==null?void 0:n())||{});if(n&&(t!=null&&t.update)){var i=!1,s={};Nr(()=>{var u=n();Mn(u),i&&te(s,u)&&(s=u,t.update(u))}),i=!0}if(t!=null&&t.destroy)return()=>t.destroy()})}function cs(r,e){var n=r.__attributes??(r.__attributes={});n.value===(n.value=e)||r.value===e&&(e!==0||r.nodeName!=="PROGRESS")||(r.value=e)}function fi(r,e,n,t){var i=r.__attributes??(r.__attributes={});i[e]!==(i[e]=n)&&(e==="style"&&"__styles"in r&&(r.__styles={}),e==="loading"&&(r[ct]=n),n==null?r.removeAttribute(e):typeof n!="string"&&zn(r).includes(e)?r[e]=n:r.setAttribute(e,n))}function vs(r,e,n,t,i=!1,s=!1,u=!1){var o=e||{},l=r.tagName==="OPTION";for(var f in e)f in n||(n[f]=null);t!==void 0&&(n.class=n.class?n.class+" "+t:t);var a=zn(r),v=r.__attributes??(r.__attributes={});for(const h in n){let d=n[h];if(l&&h==="value"&&d==null){r.value=r.__value="",o[h]=d;continue}var c=o[h];if(d!==c){o[h]=d;var _=h[0]+h[1];if(_!=="$$"){if(_==="on"){const y={},S="$$"+h;let b=h.slice(2);var p=Jt(b);if(Wt(b)&&(b=b.slice(0,-7),y.capture=!0),!p&&c){if(d!=null)continue;r.removeEventListener(b,o[S],y),o[S]=null}if(d!=null)if(p)r[`__${b}`]=d,Kt([b]);else{let m=function(F){o[h].call(this,F)};o[S]=Ce(b,r,m,y)}}else if(h==="style"&&d!=null)r.style.cssText=d+"";else if(h==="autofocus")Vt(r,!!d);else if(h==="__value"||h==="value"&&d!=null)r.value=r[h]=r.__value=d;else{var w=h;i||(w=Xt(w)),d==null&&!s?(v[h]=null,r.removeAttribute(h)):a.includes(w)&&(s||typeof d!="string")?r[w]=d:typeof d!="function"&&fi(r,w,d)}h==="style"&&"__styles"in r&&(r.__styles={})}}}return o}var Je=new Map;function zn(r){var e=Je.get(r.nodeName);if(e)return e;Je.set(r.nodeName,e=[]);for(var n,t=Fr(r),i=Element.prototype;i!==t;){n=an(t);for(var s in n)n[s].set&&e.push(s);t=Fr(t)}return e}function _s(r,e){var n=r.__className,t=ai(e);(n!==t||qn)&&(e==null?r.removeAttribute("class"):r.className=t,r.__className=t)}function ai(r){return r??""}function ds(r,e,n,t){var i=r.__styles??(r.__styles={});i[e]!==n&&(i[e]=n,n==null?r.style.removeProperty(e):r.style.setProperty(e,n,""))}const oi=()=>performance.now(),rr={tick:r=>requestAnimationFrame(r),now:()=>oi(),tasks:new Set};function Un(r){rr.tasks.forEach(e=>{e.c(r)||(rr.tasks.delete(e),e.f())}),rr.tasks.size!==0&&rr.tick(Un)}function li(r){let e;return rr.tasks.size===0&&rr.tick(Un),{promise:new Promise(n=>{rr.tasks.add(e={c:r,f:n})}),abort(){rr.tasks.delete(e)}}}function Yr(r,e){r.dispatchEvent(new CustomEvent(e))}function ci(r){if(r==="float")return"cssFloat";if(r==="offset")return"cssOffset";if(r.startsWith("--"))return r;const e=r.split("-");return e.length===1?e[0]:e[0]+e.slice(1).map(n=>n[0].toUpperCase()+n.slice(1)).join("")}function Ze(r){const e={},n=r.split(";");for(const t of n){const[i,s]=t.split(":");if(!i||s===void 0)break;const u=ci(i.trim());e[u]=s.trim()}return e}const vi=r=>r;function ps(r,e,n,t){var i=(r&rt)!==0,s=(r&et)!==0,u=i&&s,o=(r&nt)!==0,l=u?"both":i?"in":"out",f,a=e.inert,v,c;function _(){var y=T,S=g;k(null),R(null);try{return f??(f=n()(e,(t==null?void 0:t())??{},{direction:l}))}finally{k(y),R(S)}}var p={is_global:o,in(){var y;if(e.inert=a,!i){c==null||c.abort(),(y=c==null?void 0:c.reset)==null||y.call(c);return}s||v==null||v.abort(),Yr(e,"introstart"),v=we(e,_(),c,1,()=>{Yr(e,"introend"),v==null||v.abort(),v=f=void 0})},out(y){if(!s){y==null||y(),f=void 0;return}e.inert=!0,Yr(e,"outrostart"),c=we(e,_(),v,0,()=>{Yr(e,"outroend"),y==null||y()})},stop:()=>{v==null||v.abort(),c==null||c.abort()}},w=g;if((w.transitions??(w.transitions=[])).push(p),i&&ee){var h=o;if(!h){for(var d=w.parent;d&&d.f&vr;)for(;(d=d.parent)&&!(d.f&ne););h=!d||(d.f&cn)!==0}h&&Ur(()=>{Y(()=>p.in())})}}function we(r,e,n,t,i){var s=t===1;if(pr(e)){var u,o=!1;return Or(()=>{if(!o){var h=e({direction:s?"in":"out"});u=we(r,h,n,t,i)}}),{abort:()=>{o=!0,u==null||u.abort()},deactivate:()=>u.deactivate(),reset:()=>u.reset(),t:()=>u.t()}}if(n==null||n.deactivate(),!(e!=null&&e.duration))return i(),{abort:D,deactivate:D,reset:D,t:()=>t};const{delay:l=0,css:f,tick:a,easing:v=vi}=e;var c=[];if(s&&n===void 0&&(a&&a(0,1),f)){var _=Ze(f(0,1));c.push(_,_)}var p=()=>1-t,w=r.animate(c,{duration:l});return w.onfinish=()=>{var h=(n==null?void 0:n.t())??1-t;n==null||n.abort();var d=t-h,y=e.duration*Math.abs(d),S=[];if(y>0){if(f)for(var b=Math.ceil(y/16.666666666666668),m=0;m<=b;m+=1){var F=h+d*v(m/b),G=f(F,1-F);S.push(Ze(G))}p=()=>{var x=w.currentTime;return h+d*v(x/y)},a&&li(()=>{if(w.playState!=="running")return!1;var x=p();return a(x,1-x),!0})}w=r.animate(S,{duration:y,fill:"forwards"}),w.onfinish=()=>{p=()=>t,a==null||a(t,1-t),i()}},{abort:()=>{w&&(w.cancel(),w.effect=null,w.onfinish=D)},deactivate:()=>{i=D},reset:()=>{t===0&&(a==null||a(1,0))},t:()=>p()}}function hs(r,e,n=e){var t=Cr();Yt(r,"input",()=>{var i=Xe(r)?Qe(r.value):r.value;n(i),t&&i!==(i=e())&&(r.value=i??"")}),Nr(()=>{var i=e();Xe(r)&&i===Qe(r.value)||r.type==="date"&&!i&&!r.value||i!==r.value&&(r.value=i??"")})}function Xe(r){var e=r.type;return e==="number"||e==="range"}function Qe(r){return r===""?null:+r}function rn(r,e){return r===e||(r==null?void 0:r[nr])===e}function ws(r={},e,n,t){return Ur(()=>{var i,s;return Nr(()=>{i=s,s=[],Y(()=>{r!==n(...s)&&(e(r,...s),i&&rn(n(...i),r)&&e(null,...i))})}),()=>{Or(()=>{s&&rn(n(...s),r)&&e(null,...s)})}}),r}function ys(r,e){Ht(window,["resize"],()=>Oe(()=>e(window[r])))}function bs(r){return function(...e){var n=e[0];return n.stopPropagation(),r==null?void 0:r.apply(this,e)}}function gs(r){return function(...e){var n=e[0];return n.preventDefault(),r==null?void 0:r.apply(this,e)}}function Es(r=!1){const e=E,n=e.l.u;if(!n)return;let t=()=>Mn(e.s);if(r){let i=0,s={};const u=Qr(()=>{let o=!1;const l=e.s;for(const f in l)l[f]!==s[f]&&(s[f]=l[f],o=!0);return o&&i++,i});t=()=>A(u)}n.b.length&&St(()=>{en(e,t),Zr(n.b)}),ve(()=>{const i=Y(()=>n.m.map(ot));return()=>{for(const s of i)typeof s=="function"&&s()}}),n.a.length&&ve(()=>{en(e,t),Zr(n.a)})}function en(r,e){if(r.l.s)for(const n of r.l.s)A(n);e()}function ms(r,e){var s;var n=(s=r.$$events)==null?void 0:s[e.type],t=xr(n)?n.slice():n==null?[]:[n];for(var i of t)i.call(this,e)}function _i(r){E===null&&ie(),mr&&E.l!==null?di(E).m.push(r):ve(()=>{const e=Y(r);if(typeof e=="function")return e})}function xs(r){E===null&&ie(),_i(()=>()=>Y(r))}function di(r){var e=r.l;return e.u??(e.u={a:[],b:[],m:[]})}function Ie(r,e,n){if(r==null)return e(void 0),n&&n(void 0),D;const t=Y(()=>r.subscribe(e,n));return t.unsubscribe?()=>t.unsubscribe():t}let Mr=!1;function Ts(r,e,n){const t=n[e]??(n[e]={store:null,source:Er(void 0),unsubscribe:D});if(t.store!==r)if(t.unsubscribe(),t.store=r??null,r==null)t.source.v=void 0,t.unsubscribe=D;else{var i=!0;t.unsubscribe=Ie(r,s=>{i?t.source.v=s:C(t.source,s)}),i=!1}return A(t.source)}function Ss(r,e,n){let t=n[e];return t&&t.store!==r&&(t.unsubscribe(),t.unsubscribe=D),r}function As(r,e){return r.set(e),e}function Ns(){const r={};return xe(()=>{for(var e in r)r[e].unsubscribe()}),r}function Os(){Mr=!0}function pi(r){var e=Mr;try{return Mr=!1,[r(),Mr]}finally{Mr=e}}const hi={get(r,e){if(!r.exclude.includes(e))return r.props[e]},set(r,e){return!1},getOwnPropertyDescriptor(r,e){if(!r.exclude.includes(e)&&e in r.props)return{enumerable:!0,configurable:!0,value:r.props[e]}},has(r,e){return r.exclude.includes(e)?!1:e in r.props},ownKeys(r){return Reflect.ownKeys(r.props).filter(e=>!r.exclude.includes(e))}};function Cs(r,e,n){return new Proxy({props:r,exclude:e},hi)}const wi={get(r,e){if(!r.exclude.includes(e))return A(r.version),e in r.special?r.special[e]():r.props[e]},set(r,e,n){return e in r.special||(r.special[e]=bi({get[e](){return r.props[e]}},e,fn)),r.special[e](n),je(r.version),!0},getOwnPropertyDescriptor(r,e){if(!r.exclude.includes(e)&&e in r.props)return{enumerable:!0,configurable:!0,value:r.props[e]}},deleteProperty(r,e){return r.exclude.includes(e)||(r.exclude.push(e),je(r.version)),!0},has(r,e){return r.exclude.includes(e)?!1:e in r.props},ownKeys(r){return Reflect.ownKeys(r.props).filter(e=>!r.exclude.includes(e))}};function Ps(r,e){return new Proxy({props:r,exclude:e,special:{},version:N(0)},wi)}const yi={get(r,e){let n=r.props.length;for(;n--;){let t=r.props[n];if(pr(t)&&(t=t()),typeof t=="object"&&t!==null&&e in t)return t[e]}},set(r,e,n){let t=r.props.length;for(;t--;){let i=r.props[t];pr(i)&&(i=i());const s=er(i,e);if(s&&s.set)return s.set(n),!0}return!1},getOwnPropertyDescriptor(r,e){let n=r.props.length;for(;n--;){let t=r.props[n];if(pr(t)&&(t=t()),typeof t=="object"&&t!==null&&e in t){const i=er(t,e);return i&&!i.configurable&&(i.configurable=!0),i}}},has(r,e){if(e===nr||e===dn)return!1;for(let n of r.props)if(pr(n)&&(n=n()),n!=null&&e in n)return!0;return!1},ownKeys(r){const e=[];for(let n of r.props){pr(n)&&(n=n());for(const t in n)e.includes(t)||e.push(t)}return e}};function Is(...r){return new Proxy({props:r},yi)}function nn(r){for(var e=g,n=g;e!==null&&!(e.f&(B|zr));)e=e.parent;try{return R(e),r()}finally{R(n)}}function bi(r,e,n,t){var G;var i=(n&Jn)!==0,s=!mr||(n&Zn)!==0,u=(n&Xn)!==0,o=(n&Qn)!==0,l=!1,f;u?[f,l]=pi(()=>r[e]):f=r[e];var a=nr in r||dn in r,v=((G=er(r,e))==null?void 0:G.set)??(a&&u&&e in r?x=>r[e]=x:void 0),c=t,_=!0,p=!1,w=()=>(p=!0,_&&(_=!1,o?c=Y(t):c=t),c);f===void 0&&t!==void 0&&(v&&s&&wt(),f=w(),v&&v(f));var h;if(s)h=()=>{var x=r[e];return x===void 0?w():(_=!0,p=!1,x)};else{var d=nn(()=>(i?Qr:mt)(()=>r[e]));d.f|=lt,h=()=>{var x=A(d);return x!==void 0&&(c=void 0),x===void 0?c:x}}if(!(n&fn))return h;if(v){var y=r.$$legacy;return function(x,J){return arguments.length>0?((!s||!J||y||l)&&v(J?h():x),x):h()}}var S=!1,b=!1,m=Er(f),F=nn(()=>Qr(()=>{var x=h(),J=A(m);return S?(S=!1,b=!0,J):(b=!1,m.v=x)}));return i||(F.equals=Ee),function(x,J){if(arguments.length>0){const ur=J?A(F):s&&u?hr(x):x;return F.equals(ur)||(S=!0,C(m,ur),p&&c!==void 0&&(c=ur),Y(()=>A(F))),x}return A(F)}}function Ds(){const r=E;return r===null&&ie(),e=>n=>{var i;const t=(i=r.s.$$events)==null?void 0:i[e];if(t){const s=xr(t)?t.slice():[t];for(const u of s)u.call(r.x,n);return!n.defaultPrevented}return!0}}function Rr(r){C(r,r.v+1)}const dr=[];function gi(r,e){return{subscribe:Ei(r,e).subscribe}}function Ei(r,e=D){let n=null;const t=new Set;function i(o){if(te(r,o)&&(r=o,n)){const l=!dr.length;for(const f of t)f[1](),dr.push(f,r);if(l){for(let f=0;f<dr.length;f+=2)dr[f][0](dr[f+1]);dr.length=0}}}function s(o){i(o(r))}function u(o,l=D){const f=[o,l];return t.add(f),t.size===1&&(n=e(i,s)||D),o(r),()=>{t.delete(f),t.size===0&&n&&(n(),n=null)}}return{set:i,update:s,subscribe:u}}function $s(r,e,n){const t=!Array.isArray(r),i=t?[r]:r;if(!i.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const s=e.length<2;return gi(n,(u,o)=>{let l=!1;const f=[];let a=0,v=D;const c=()=>{if(a)return;v();const p=e(t?f[0]:f,u,o);s?u(p):v=typeof p=="function"?p:D},_=i.map((p,w)=>Ie(p,h=>{f[w]=h,a&=~(1<<w),l&&c()},()=>{a|=1<<w}));return l=!0,c(),function(){Zr(_),v(),l=!1}})}function Rs(r){let e;return Ie(r,n=>e=n)(),e}var U,V,Z,gr,Jr;const De=class De extends Map{constructor(n){super();$r(this,gr);$r(this,U,new Map);$r(this,V,N(0));$r(this,Z,N(0));if(n){for(var[t,i]of n)super.set(t,i);O(this,Z).v=super.size}}has(n){var t=O(this,U),i=t.get(n);if(i===void 0){var s=super.get(n);if(s!==void 0)i=N(0),t.set(n,i);else return A(O(this,V)),!1}return A(i),!0}forEach(n,t){jr(this,gr,Jr).call(this),super.forEach(n,t)}get(n){var t=O(this,U),i=t.get(n);if(i===void 0){var s=super.get(n);if(s!==void 0)i=N(0),t.set(n,i);else{A(O(this,V));return}}return A(i),super.get(n)}set(n,t){var v;var i=O(this,U),s=i.get(n),u=super.get(n),o=super.set(n,t),l=O(this,V);if(s===void 0)i.set(n,N(0)),C(O(this,Z),super.size),Rr(l);else if(u!==t){Rr(s);var f=l.reactions===null?null:new Set(l.reactions),a=f===null||!((v=s.reactions)!=null&&v.every(c=>f.has(c)));a&&Rr(l)}return o}delete(n){var t=O(this,U),i=t.get(n),s=super.delete(n);return i!==void 0&&(t.delete(n),C(O(this,Z),super.size),C(i,-1),Rr(O(this,V))),s}clear(){if(super.size!==0){super.clear();var n=O(this,U);C(O(this,Z),0);for(var t of n.values())C(t,-1);Rr(O(this,V)),n.clear()}}keys(){return A(O(this,V)),super.keys()}values(){return jr(this,gr,Jr).call(this),super.values()}entries(){return jr(this,gr,Jr).call(this),super.entries()}[Symbol.iterator](){return this.entries()}get size(){return A(O(this,Z)),super.size}};U=new WeakMap,V=new WeakMap,Z=new WeakMap,gr=new WeakSet,Jr=function(){A(O(this,V));var n=O(this,U);if(O(this,Z).v!==n.size)for(var t of Be(De.prototype,this,"keys").call(this))n.has(t)||n.set(t,N(0));for(var[,i]of O(this,U))A(i)};let tn=De;const mi=r=>r;function xi(r){const e=r-1;return e*e*e+1}function Ls(r,{delay:e=0,duration:n=400,easing:t=mi}={}){const i=+getComputedStyle(r).opacity;return{delay:e,duration:n,easing:t,css:s=>`opacity: ${s*i}`}}function Ms(r,{delay:e=0,duration:n=400,easing:t=xi,axis:i="y"}={}){const s=getComputedStyle(r),u=+s.opacity,o=i==="y"?"height":"width",l=parseFloat(s[o]),f=i==="y"?["top","bottom"]:["left","right"],a=f.map(d=>`${d[0].toUpperCase()}${d.slice(1)}`),v=parseFloat(s[`padding${a[0]}`]),c=parseFloat(s[`padding${a[1]}`]),_=parseFloat(s[`margin${a[0]}`]),p=parseFloat(s[`margin${a[1]}`]),w=parseFloat(s[`border${a[0]}Width`]),h=parseFloat(s[`border${a[1]}Width`]);return{delay:e,duration:n,easing:t,css:d=>`overflow: hidden;opacity: ${Math.min(d*20,1)*u};${o}: ${d*l}px;padding-${f[0]}: ${d*v}px;padding-${f[1]}: ${d*c}px;margin-${f[0]}: ${d*_}px;margin-${f[1]}: ${d*p}px;border-${f[0]}-width: ${d*w}px;border-${f[1]}-width: ${d*h}px;`}}export{Di as $,Zi as A,Xi as B,At as C,Is as D,qi as E,mt as F,Qi as G,Es as H,_i as I,Ki as J,Ji as K,hs as L,fi as M,as as N,$s as O,Rs as P,Ei as Q,ji as R,tn as S,ss as T,Ns as U,Ts as V,Ci as W,Mn as X,Ni as Y,Pi as Z,Oi as _,Ai as a,St as a0,Ui as a1,Yi as a2,is as a3,ts as a4,Ps as a5,Ss as a6,_s as a7,Vi as a8,us as a9,ws as aa,ds as ab,xs as ac,Kt as ad,ls as ae,cs as af,rs as ag,zi as ah,Bi as ai,ps as aj,Ms as ak,os as al,st as am,ms as an,Ls as ao,ys as ap,Ds as aq,bs as ar,gs as as,As as at,Os as au,Ye as av,C as b,Y as c,A as d,Qr as e,qt as f,$i as g,Li as h,Wi as i,ki as j,es as k,fs as l,Gi as m,D as n,Bt as o,hr as p,bi as q,Fi as r,Ri as s,Hi as t,ve as u,Ii as v,vs as w,Cs as x,ns as y,Mi as z};
