var _={dragStart:!0},ee={delay:0,distance:3},de=(t,l,i)=>Math.min(Math.max(t,l),i),te=t=>typeof t=="string",ye=([t,l],i,d)=>{const c=(y,h)=>h===0?0:Math.ceil(y/h)*h;return[c(i,t),c(d,l)]},ce=(t,l)=>t.some(i=>l.some(d=>i.contains(d)));function re(t,l){if(t===void 0)return;if(ne(t))return t.getBoundingClientRect();if(typeof t=="object"){const{top:d=0,left:c=0,right:y=0,bottom:h=0}=t;return{top:d,right:window.innerWidth-y,bottom:window.innerHeight-h,left:c}}if(t==="parent")return l.parentNode.getBoundingClientRect();const i=document.querySelector(t);if(i===null)throw new Error("The selector provided for bound doesn't exists in the document.");return i.getBoundingClientRect()}var k=(t,l,i)=>t.style.setProperty(l,i),ne=t=>t instanceof HTMLElement,we=function(t,l={}){let i,d,{bounds:c,axis:y="both",gpuAcceleration:h=!0,legacyTranslate:oe=!1,transform:L,applyUserSelectHack:z=!0,disabled:ae=!1,ignoreMultitouch:I=!1,recomputeBounds:x=_,grid:U,threshold:E=ee,position:p,cancel:R,handle:$,defaultClass:X="neodrag",defaultClassDragging:W="neodrag-dragging",defaultClassDragged:N="neodrag-dragged",defaultPosition:fe={x:0,y:0},onDragStart:ge,onDrag:he,onDragEnd:pe}=l,A=!1,S=!1,ie=0,M=!1,Y=!1,w=0,b=0,C=0,D=0,j=0,F=0,{x:q,y:H}=p?{x:(p==null?void 0:p.x)??0,y:(p==null?void 0:p.y)??0}:fe;O(q,H);let f,v,B,G,J,se="",me=!!p;x={..._,...x},E={...ee,...E??{}};let P=new Set;function le(e){A&&!S&&Y&&M&&J&&(S=!0,function(r){Q("neodrag:start",ge,r)}(e),m.add(W),z&&(se=K.userSelect,K.userSelect="none"))}const K=document.body.style,m=t.classList;function O(e=w,r=b){if(!L){if(oe){let a=`${+e}px, ${+r}px`;return k(t,"transform",h?`translate3d(${a}, 0)`:`translate(${a})`)}return k(t,"translate",`${+e}px ${+r}px`)}const o=L({offsetX:e,offsetY:r,rootNode:t});te(o)&&k(t,"transform",o)}function Q(e,r,o){const a=function(s){return{offsetX:w,offsetY:b,rootNode:t,currentNode:J,event:s}}(o);t.dispatchEvent(new CustomEvent(e,{detail:a})),r==null||r(a)}const T=addEventListener,V=new AbortController,Z={signal:V.signal,capture:!1};function ue(){let e=t.offsetWidth/v.width;return isNaN(e)&&(e=1),e}return k(t,"touch-action","none"),T("pointerdown",e=>{if(ae||e.button===2)return;if(P.add(e.pointerId),I&&P.size>1)return e.preventDefault();if(x.dragStart&&(f=re(c,t)),te($)&&te(R)&&$===R)throw new Error("`handle` selector can't be same as `cancel` selector");if(m.add(X),B=function(n,u){if(!n)return[u];if(ne(n))return[n];if(Array.isArray(n))return n;const g=u.querySelectorAll(n);if(g===null)throw new Error("Selector passed for `handle` option should be child of the element on which the action is applied");return Array.from(g.values())}($,t),G=function(n,u){if(!n)return[];if(ne(n))return[n];if(Array.isArray(n))return n;const g=u.querySelectorAll(n);if(g===null)throw new Error("Selector passed for `cancel` option should be child of the element on which the action is applied");return Array.from(g.values())}(R,t),i=/(both|x)/.test(y),d=/(both|y)/.test(y),ce(G,B))throw new Error("Element being dragged can't be a child of the element on which `cancel` is applied");const r=e.composedPath()[0];if(!B.some(n=>{var u;return n.contains(r)||((u=n.shadowRoot)==null?void 0:u.contains(r))})||ce(G,[r]))return;J=B.length===1?t:B.find(n=>n.contains(r)),A=!0,ie=Date.now(),E.delay||(M=!0),v=t.getBoundingClientRect();const{clientX:o,clientY:a}=e,s=ue();i&&(C=o-q/s),d&&(D=a-H/s),f&&(j=o-v.left,F=a-v.top)},Z),T("pointermove",e=>{if(!A||I&&P.size>1)return;if(!S){if(M||Date.now()-ie>=E.delay&&(M=!0,le(e)),!Y){const s=e.clientX-C,n=e.clientY-D;Math.sqrt(s**2+n**2)>=E.distance&&(Y=!0,le(e))}if(!S)return}x.drag&&(f=re(c,t)),e.preventDefault(),v=t.getBoundingClientRect();let r=e.clientX,o=e.clientY;const a=ue();if(f){const s={left:f.left+j,top:f.top+F,right:f.right+j-v.width,bottom:f.bottom+F-v.height};r=de(r,s.left,s.right),o=de(o,s.top,s.bottom)}if(Array.isArray(U)){let[s,n]=U;if(isNaN(+s)||s<0)throw new Error("1st argument of `grid` must be a valid positive number");if(isNaN(+n)||n<0)throw new Error("2nd argument of `grid` must be a valid positive number");let u=r-C,g=o-D;[u,g]=ye([s/a,n/a],u,g),r=C+u,o=D+g}i&&(w=Math.round((r-C)*a)),d&&(b=Math.round((o-D)*a)),q=w,H=b,Q("neodrag",he,e),O()},Z),T("pointerup",e=>{P.delete(e.pointerId),A&&(S&&(T("click",r=>r.stopPropagation(),{once:!0,signal:V.signal,capture:!0}),x.dragEnd&&(f=re(c,t)),m.remove(W),m.add(N),z&&(K.userSelect=se),Q("neodrag:end",pe,e),i&&(C=w),d&&(D=b)),A=!1,S=!1,M=!1,Y=!1)},Z),{destroy:()=>V.abort(),update:e=>{var o,a;y=e.axis||"both",ae=e.disabled??!1,I=e.ignoreMultitouch??!1,$=e.handle,c=e.bounds,x=e.recomputeBounds??_,R=e.cancel,z=e.applyUserSelectHack??!0,U=e.grid,h=e.gpuAcceleration??!0,oe=e.legacyTranslate??!0,L=e.transform,E={...ee,...e.threshold??{}};const r=m.contains(N);m.remove(X,N),X=e.defaultClass??"neodrag",W=e.defaultClassDragging??"neodrag-dragging",N=e.defaultClassDragged??"neodrag-dragged",m.add(X),r&&m.add(N),me&&(q=w=((o=e.position)==null?void 0:o.x)??w,H=b=((a=e.position)==null?void 0:a.y)??b,O())}}};export{we as d};
