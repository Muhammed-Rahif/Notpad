import{c as ne,g as Ur}from"./any-base-B1025x16.js";function te(oe){throw new Error('Could not dynamically require "'+oe+'". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.')}var ye={exports:{}};/*!
    localForage -- Offline Storage, Improved
    Version 1.10.0
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/var Ue;function Yr(){return Ue||(Ue=1,function(oe,Wr){(function(z){oe.exports=z()})(function(){return function z(M,K,E){function C(T,U){if(!K[T]){if(!M[T]){var v=typeof te=="function"&&te;if(!U&&v)return v(T,!0);if(b)return b(T,!0);var h=new Error("Cannot find module '"+T+"'");throw h.code="MODULE_NOT_FOUND",h}var I=K[T]={exports:{}};M[T][0].call(I.exports,function(A){var Y=M[T][1][A];return C(Y||A)},I,I.exports,z,M,K,E)}return K[T].exports}for(var b=typeof te=="function"&&te,B=0;B<E.length;B++)C(E[B]);return C}({1:[function(z,M,K){(function(E){var C=E.MutationObserver||E.WebKitMutationObserver,b;if(C){var B=0,T=new C(A),U=E.document.createTextNode("");T.observe(U,{characterData:!0}),b=function(){U.data=B=++B%2}}else if(!E.setImmediate&&typeof E.MessageChannel<"u"){var v=new E.MessageChannel;v.port1.onmessage=A,b=function(){v.port2.postMessage(0)}}else"document"in E&&"onreadystatechange"in E.document.createElement("script")?b=function(){var D=E.document.createElement("script");D.onreadystatechange=function(){A(),D.onreadystatechange=null,D.parentNode.removeChild(D),D=null},E.document.documentElement.appendChild(D)}:b=function(){setTimeout(A,0)};var h,I=[];function A(){h=!0;for(var D,W,N=I.length;N;){for(W=I,I=[],D=-1;++D<N;)W[D]();N=I.length}h=!1}M.exports=Y;function Y(D){I.push(D)===1&&!h&&b()}}).call(this,typeof ne<"u"?ne:typeof self<"u"?self:typeof window<"u"?window:{})},{}],2:[function(z,M,K){var E=z(1);function C(){}var b={},B=["REJECTED"],T=["FULFILLED"],U=["PENDING"];M.exports=v;function v(l){if(typeof l!="function")throw new TypeError("resolver must be a function");this.state=U,this.queue=[],this.outcome=void 0,l!==C&&Y(this,l)}v.prototype.catch=function(l){return this.then(null,l)},v.prototype.then=function(l,p){if(typeof l!="function"&&this.state===T||typeof p!="function"&&this.state===B)return this;var y=new this.constructor(C);if(this.state!==U){var w=this.state===T?l:p;I(y,w,this.outcome)}else this.queue.push(new h(y,l,p));return y};function h(l,p,y){this.promise=l,typeof p=="function"&&(this.onFulfilled=p,this.callFulfilled=this.otherCallFulfilled),typeof y=="function"&&(this.onRejected=y,this.callRejected=this.otherCallRejected)}h.prototype.callFulfilled=function(l){b.resolve(this.promise,l)},h.prototype.otherCallFulfilled=function(l){I(this.promise,this.onFulfilled,l)},h.prototype.callRejected=function(l){b.reject(this.promise,l)},h.prototype.otherCallRejected=function(l){I(this.promise,this.onRejected,l)};function I(l,p,y){E(function(){var w;try{w=p(y)}catch(x){return b.reject(l,x)}w===l?b.reject(l,new TypeError("Cannot resolve promise with itself")):b.resolve(l,w)})}b.resolve=function(l,p){var y=D(A,p);if(y.status==="error")return b.reject(l,y.value);var w=y.value;if(w)Y(l,w);else{l.state=T,l.outcome=p;for(var x=-1,L=l.queue.length;++x<L;)l.queue[x].callFulfilled(p)}return l},b.reject=function(l,p){l.state=B,l.outcome=p;for(var y=-1,w=l.queue.length;++y<w;)l.queue[y].callRejected(p);return l};function A(l){var p=l&&l.then;if(l&&(typeof l=="object"||typeof l=="function")&&typeof p=="function")return function(){p.apply(l,arguments)}}function Y(l,p){var y=!1;function w(P){y||(y=!0,b.reject(l,P))}function x(P){y||(y=!0,b.resolve(l,P))}function L(){p(x,w)}var O=D(L);O.status==="error"&&w(O.value)}function D(l,p){var y={};try{y.value=l(p),y.status="success"}catch(w){y.status="error",y.value=w}return y}v.resolve=W;function W(l){return l instanceof this?l:b.resolve(new this(C),l)}v.reject=N;function N(l){var p=new this(C);return b.reject(p,l)}v.all=ae;function ae(l){var p=this;if(Object.prototype.toString.call(l)!=="[object Array]")return this.reject(new TypeError("must be an array"));var y=l.length,w=!1;if(!y)return this.resolve([]);for(var x=new Array(y),L=0,O=-1,P=new this(C);++O<y;)$(l[O],O);return P;function $(J,k){p.resolve(J).then(ie,function(X){w||(w=!0,b.reject(P,X))});function ie(X){x[k]=X,++L===y&&!w&&(w=!0,b.resolve(P,x))}}}v.race=H;function H(l){var p=this;if(Object.prototype.toString.call(l)!=="[object Array]")return this.reject(new TypeError("must be an array"));var y=l.length,w=!1;if(!y)return this.resolve([]);for(var x=-1,L=new this(C);++x<y;)O(l[x]);return L;function O(P){p.resolve(P).then(function($){w||(w=!0,b.resolve(L,$))},function($){w||(w=!0,b.reject(L,$))})}}},{1:1}],3:[function(z,M,K){(function(E){typeof E.Promise!="function"&&(E.Promise=z(2))}).call(this,typeof ne<"u"?ne:typeof self<"u"?self:typeof window<"u"?window:{})},{2:2}],4:[function(z,M,K){var E=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function C(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function b(){try{if(typeof indexedDB<"u")return indexedDB;if(typeof webkitIndexedDB<"u")return webkitIndexedDB;if(typeof mozIndexedDB<"u")return mozIndexedDB;if(typeof OIndexedDB<"u")return OIndexedDB;if(typeof msIndexedDB<"u")return msIndexedDB}catch{return}}var B=b();function T(){try{if(!B||!B.open)return!1;var e=typeof openDatabase<"u"&&/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent)&&!/Chrome/.test(navigator.userAgent)&&!/BlackBerry/.test(navigator.platform),n=typeof fetch=="function"&&fetch.toString().indexOf("[native code")!==-1;return(!e||n)&&typeof indexedDB<"u"&&typeof IDBKeyRange<"u"}catch{return!1}}function U(e,n){e=e||[],n=n||{};try{return new Blob(e,n)}catch(t){if(t.name!=="TypeError")throw t;for(var r=typeof BlobBuilder<"u"?BlobBuilder:typeof MSBlobBuilder<"u"?MSBlobBuilder:typeof MozBlobBuilder<"u"?MozBlobBuilder:WebKitBlobBuilder,o=new r,a=0;a<e.length;a+=1)o.append(e[a]);return o.getBlob(n.type)}}typeof Promise>"u"&&z(3);var v=Promise;function h(e,n){n&&e.then(function(r){n(null,r)},function(r){n(r)})}function I(e,n,r){typeof n=="function"&&e.then(n),typeof r=="function"&&e.catch(r)}function A(e){return typeof e!="string"&&(console.warn(e+" used as a key, but it is not a string."),e=String(e)),e}function Y(){if(arguments.length&&typeof arguments[arguments.length-1]=="function")return arguments[arguments.length-1]}var D="local-forage-detect-blob-support",W=void 0,N={},ae=Object.prototype.toString,H="readonly",l="readwrite";function p(e){for(var n=e.length,r=new ArrayBuffer(n),o=new Uint8Array(r),a=0;a<n;a++)o[a]=e.charCodeAt(a);return r}function y(e){return new v(function(n){var r=e.transaction(D,l),o=U([""]);r.objectStore(D).put(o,"key"),r.onabort=function(a){a.preventDefault(),a.stopPropagation(),n(!1)},r.oncomplete=function(){var a=navigator.userAgent.match(/Chrome\/(\d+)/),t=navigator.userAgent.match(/Edge\//);n(t||!a||parseInt(a[1],10)>=43)}}).catch(function(){return!1})}function w(e){return typeof W=="boolean"?v.resolve(W):y(e).then(function(n){return W=n,W})}function x(e){var n=N[e.name],r={};r.promise=new v(function(o,a){r.resolve=o,r.reject=a}),n.deferredOperations.push(r),n.dbReady?n.dbReady=n.dbReady.then(function(){return r.promise}):n.dbReady=r.promise}function L(e){var n=N[e.name],r=n.deferredOperations.pop();if(r)return r.resolve(),r.promise}function O(e,n){var r=N[e.name],o=r.deferredOperations.pop();if(o)return o.reject(n),o.promise}function P(e,n){return new v(function(r,o){if(N[e.name]=N[e.name]||ge(),e.db)if(n)x(e),e.db.close();else return r(e.db);var a=[e.name];n&&a.push(e.version);var t=B.open.apply(B,a);n&&(t.onupgradeneeded=function(i){var f=t.result;try{f.createObjectStore(e.storeName),i.oldVersion<=1&&f.createObjectStore(D)}catch(u){if(u.name==="ConstraintError")console.warn('The database "'+e.name+'" has been upgraded from version '+i.oldVersion+" to version "+i.newVersion+', but the storage "'+e.storeName+'" already exists.');else throw u}}),t.onerror=function(i){i.preventDefault(),o(t.error)},t.onsuccess=function(){var i=t.result;i.onversionchange=function(f){f.target.close()},r(i),L(e)}})}function $(e){return P(e,!1)}function J(e){return P(e,!0)}function k(e,n){if(!e.db)return!0;var r=!e.db.objectStoreNames.contains(e.storeName),o=e.version<e.db.version,a=e.version>e.db.version;if(o&&(e.version!==n&&console.warn('The database "'+e.name+`" can't be downgraded from version `+e.db.version+" to version "+e.version+"."),e.version=e.db.version),a||r){if(r){var t=e.db.version+1;t>e.version&&(e.version=t)}return!0}return!1}function ie(e){return new v(function(n,r){var o=new FileReader;o.onerror=r,o.onloadend=function(a){var t=btoa(a.target.result||"");n({__local_forage_encoded_blob:!0,data:t,type:e.type})},o.readAsBinaryString(e)})}function X(e){var n=p(atob(e.data));return U([n],{type:e.type})}function pe(e){return e&&e.__local_forage_encoded_blob}function Ye(e){var n=this,r=n._initReady().then(function(){var o=N[n._dbInfo.name];if(o&&o.dbReady)return o.dbReady});return I(r,e,e),r}function ze(e){x(e);for(var n=N[e.name],r=n.forages,o=0;o<r.length;o++){var a=r[o];a._dbInfo.db&&(a._dbInfo.db.close(),a._dbInfo.db=null)}return e.db=null,$(e).then(function(t){return e.db=t,k(e)?J(e):t}).then(function(t){e.db=n.db=t;for(var i=0;i<r.length;i++)r[i]._dbInfo.db=t}).catch(function(t){throw O(e,t),t})}function V(e,n,r,o){o===void 0&&(o=1);try{var a=e.db.transaction(e.storeName,n);r(null,a)}catch(t){if(o>0&&(!e.db||t.name==="InvalidStateError"||t.name==="NotFoundError"))return v.resolve().then(function(){if(!e.db||t.name==="NotFoundError"&&!e.db.objectStoreNames.contains(e.storeName)&&e.version<=e.db.version)return e.db&&(e.version=e.db.version+1),J(e)}).then(function(){return ze(e).then(function(){V(e,n,r,o-1)})}).catch(r);r(t)}}function ge(){return{forages:[],db:null,dbReady:null,deferredOperations:[]}}function We(e){var n=this,r={db:null};if(e)for(var o in e)r[o]=e[o];var a=N[r.name];a||(a=ge(),N[r.name]=a),a.forages.push(n),n._initReady||(n._initReady=n.ready,n.ready=Ye);var t=[];function i(){return v.resolve()}for(var f=0;f<a.forages.length;f++){var u=a.forages[f];u!==n&&t.push(u._initReady().catch(i))}var c=a.forages.slice(0);return v.all(t).then(function(){return r.db=a.db,$(r)}).then(function(s){return r.db=s,k(r,n._defaultConfig.version)?J(r):s}).then(function(s){r.db=a.db=s,n._dbInfo=r;for(var d=0;d<c.length;d++){var m=c[d];m!==n&&(m._dbInfo.db=r.db,m._dbInfo.version=r.version)}})}function $e(e,n){var r=this;e=A(e);var o=new v(function(a,t){r.ready().then(function(){V(r._dbInfo,H,function(i,f){if(i)return t(i);try{var u=f.objectStore(r._dbInfo.storeName),c=u.get(e);c.onsuccess=function(){var s=c.result;s===void 0&&(s=null),pe(s)&&(s=X(s)),a(s)},c.onerror=function(){t(c.error)}}catch(s){t(s)}})}).catch(t)});return h(o,n),o}function Ve(e,n){var r=this,o=new v(function(a,t){r.ready().then(function(){V(r._dbInfo,H,function(i,f){if(i)return t(i);try{var u=f.objectStore(r._dbInfo.storeName),c=u.openCursor(),s=1;c.onsuccess=function(){var d=c.result;if(d){var m=d.value;pe(m)&&(m=X(m));var g=e(m,d.key,s++);g!==void 0?a(g):d.continue()}else a()},c.onerror=function(){t(c.error)}}catch(d){t(d)}})}).catch(t)});return h(o,n),o}function Ke(e,n,r){var o=this;e=A(e);var a=new v(function(t,i){var f;o.ready().then(function(){return f=o._dbInfo,ae.call(n)==="[object Blob]"?w(f.db).then(function(u){return u?n:ie(n)}):n}).then(function(u){V(o._dbInfo,l,function(c,s){if(c)return i(c);try{var d=s.objectStore(o._dbInfo.storeName);u===null&&(u=void 0);var m=d.put(u,e);s.oncomplete=function(){u===void 0&&(u=null),t(u)},s.onabort=s.onerror=function(){var g=m.error?m.error:m.transaction.error;i(g)}}catch(g){i(g)}})}).catch(i)});return h(a,r),a}function Qe(e,n){var r=this;e=A(e);var o=new v(function(a,t){r.ready().then(function(){V(r._dbInfo,l,function(i,f){if(i)return t(i);try{var u=f.objectStore(r._dbInfo.storeName),c=u.delete(e);f.oncomplete=function(){a()},f.onerror=function(){t(c.error)},f.onabort=function(){var s=c.error?c.error:c.transaction.error;t(s)}}catch(s){t(s)}})}).catch(t)});return h(o,n),o}function Ge(e){var n=this,r=new v(function(o,a){n.ready().then(function(){V(n._dbInfo,l,function(t,i){if(t)return a(t);try{var f=i.objectStore(n._dbInfo.storeName),u=f.clear();i.oncomplete=function(){o()},i.onabort=i.onerror=function(){var c=u.error?u.error:u.transaction.error;a(c)}}catch(c){a(c)}})}).catch(a)});return h(r,e),r}function He(e){var n=this,r=new v(function(o,a){n.ready().then(function(){V(n._dbInfo,H,function(t,i){if(t)return a(t);try{var f=i.objectStore(n._dbInfo.storeName),u=f.count();u.onsuccess=function(){o(u.result)},u.onerror=function(){a(u.error)}}catch(c){a(c)}})}).catch(a)});return h(r,e),r}function Xe(e,n){var r=this,o=new v(function(a,t){if(e<0){a(null);return}r.ready().then(function(){V(r._dbInfo,H,function(i,f){if(i)return t(i);try{var u=f.objectStore(r._dbInfo.storeName),c=!1,s=u.openKeyCursor();s.onsuccess=function(){var d=s.result;if(!d){a(null);return}e===0||c?a(d.key):(c=!0,d.advance(e))},s.onerror=function(){t(s.error)}}catch(d){t(d)}})}).catch(t)});return h(o,n),o}function je(e){var n=this,r=new v(function(o,a){n.ready().then(function(){V(n._dbInfo,H,function(t,i){if(t)return a(t);try{var f=i.objectStore(n._dbInfo.storeName),u=f.openKeyCursor(),c=[];u.onsuccess=function(){var s=u.result;if(!s){o(c);return}c.push(s.key),s.continue()},u.onerror=function(){a(u.error)}}catch(s){a(s)}})}).catch(a)});return h(r,e),r}function Je(e,n){n=Y.apply(this,arguments);var r=this.config();e=typeof e!="function"&&e||{},e.name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var o=this,a;if(!e.name)a=v.reject("Invalid arguments");else{var t=e.name===r.name&&o._dbInfo.db,i=t?v.resolve(o._dbInfo.db):$(e).then(function(f){var u=N[e.name],c=u.forages;u.db=f;for(var s=0;s<c.length;s++)c[s]._dbInfo.db=f;return f});e.storeName?a=i.then(function(f){if(f.objectStoreNames.contains(e.storeName)){var u=f.version+1;x(e);var c=N[e.name],s=c.forages;f.close();for(var d=0;d<s.length;d++){var m=s[d];m._dbInfo.db=null,m._dbInfo.version=u}var g=new v(function(_,R){var S=B.open(e.name,u);S.onerror=function(F){var Z=S.result;Z.close(),R(F)},S.onupgradeneeded=function(){var F=S.result;F.deleteObjectStore(e.storeName)},S.onsuccess=function(){var F=S.result;F.close(),_(F)}});return g.then(function(_){c.db=_;for(var R=0;R<s.length;R++){var S=s[R];S._dbInfo.db=_,L(S._dbInfo)}}).catch(function(_){throw(O(e,_)||v.resolve()).catch(function(){}),_})}}):a=i.then(function(f){x(e);var u=N[e.name],c=u.forages;f.close();for(var s=0;s<c.length;s++){var d=c[s];d._dbInfo.db=null}var m=new v(function(g,_){var R=B.deleteDatabase(e.name);R.onerror=function(){var S=R.result;S&&S.close(),_(R.error)},R.onblocked=function(){console.warn('dropInstance blocked for database "'+e.name+'" until all open connections are closed')},R.onsuccess=function(){var S=R.result;S&&S.close(),g(S)}});return m.then(function(g){u.db=g;for(var _=0;_<c.length;_++){var R=c[_];L(R._dbInfo)}}).catch(function(g){throw(O(e,g)||v.resolve()).catch(function(){}),g})})}return h(a,n),a}var qe={_driver:"asyncStorage",_initStorage:We,_support:T(),iterate:Ve,getItem:$e,setItem:Ke,removeItem:Qe,clear:Ge,length:He,key:Xe,keys:je,dropInstance:Je};function Ze(){return typeof openDatabase=="function"}var Q="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",ke="~~local_forage_type~",_e=/^~~local_forage_type~([^~]+)~/,ee="__lfsc__:",fe=ee.length,ue="arbf",ce="blob",be="si08",we="ui08",Ee="uic8",Se="si16",Ie="si32",Re="ur16",Ae="ui32",De="fl32",Ne="fl64",Te=fe+ue.length,xe=Object.prototype.toString;function Be(e){var n=e.length*.75,r=e.length,o,a=0,t,i,f,u;e[e.length-1]==="="&&(n--,e[e.length-2]==="="&&n--);var c=new ArrayBuffer(n),s=new Uint8Array(c);for(o=0;o<r;o+=4)t=Q.indexOf(e[o]),i=Q.indexOf(e[o+1]),f=Q.indexOf(e[o+2]),u=Q.indexOf(e[o+3]),s[a++]=t<<2|i>>4,s[a++]=(i&15)<<4|f>>2,s[a++]=(f&3)<<6|u&63;return c}function se(e){var n=new Uint8Array(e),r="",o;for(o=0;o<n.length;o+=3)r+=Q[n[o]>>2],r+=Q[(n[o]&3)<<4|n[o+1]>>4],r+=Q[(n[o+1]&15)<<2|n[o+2]>>6],r+=Q[n[o+2]&63];return n.length%3===2?r=r.substring(0,r.length-1)+"=":n.length%3===1&&(r=r.substring(0,r.length-2)+"=="),r}function er(e,n){var r="";if(e&&(r=xe.call(e)),e&&(r==="[object ArrayBuffer]"||e.buffer&&xe.call(e.buffer)==="[object ArrayBuffer]")){var o,a=ee;e instanceof ArrayBuffer?(o=e,a+=ue):(o=e.buffer,r==="[object Int8Array]"?a+=be:r==="[object Uint8Array]"?a+=we:r==="[object Uint8ClampedArray]"?a+=Ee:r==="[object Int16Array]"?a+=Se:r==="[object Uint16Array]"?a+=Re:r==="[object Int32Array]"?a+=Ie:r==="[object Uint32Array]"?a+=Ae:r==="[object Float32Array]"?a+=De:r==="[object Float64Array]"?a+=Ne:n(new Error("Failed to get type for BinaryArray"))),n(a+se(o))}else if(r==="[object Blob]"){var t=new FileReader;t.onload=function(){var i=ke+e.type+"~"+se(this.result);n(ee+ce+i)},t.readAsArrayBuffer(e)}else try{n(JSON.stringify(e))}catch(i){console.error("Couldn't convert value into a JSON string: ",e),n(null,i)}}function rr(e){if(e.substring(0,fe)!==ee)return JSON.parse(e);var n=e.substring(Te),r=e.substring(fe,Te),o;if(r===ce&&_e.test(n)){var a=n.match(_e);o=a[1],n=n.substring(a[0].length)}var t=Be(n);switch(r){case ue:return t;case ce:return U([t],{type:o});case be:return new Int8Array(t);case we:return new Uint8Array(t);case Ee:return new Uint8ClampedArray(t);case Se:return new Int16Array(t);case Re:return new Uint16Array(t);case Ie:return new Int32Array(t);case Ae:return new Uint32Array(t);case De:return new Float32Array(t);case Ne:return new Float64Array(t);default:throw new Error("Unkown type: "+r)}}var le={serialize:er,deserialize:rr,stringToBuffer:Be,bufferToString:se};function Ce(e,n,r,o){e.executeSql("CREATE TABLE IF NOT EXISTS "+n.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],r,o)}function nr(e){var n=this,r={db:null};if(e)for(var o in e)r[o]=typeof e[o]!="string"?e[o].toString():e[o];var a=new v(function(t,i){try{r.db=openDatabase(r.name,String(r.version),r.description,r.size)}catch(f){return i(f)}r.db.transaction(function(f){Ce(f,r,function(){n._dbInfo=r,t()},function(u,c){i(c)})},i)});return r.serializer=le,a}function G(e,n,r,o,a,t){e.executeSql(r,o,a,function(i,f){f.code===f.SYNTAX_ERR?i.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?",[n.storeName],function(u,c){c.rows.length?t(u,f):Ce(u,n,function(){u.executeSql(r,o,a,t)},t)},t):t(i,f)},t)}function tr(e,n){var r=this;e=A(e);var o=new v(function(a,t){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(f){G(f,i,"SELECT * FROM "+i.storeName+" WHERE key = ? LIMIT 1",[e],function(u,c){var s=c.rows.length?c.rows.item(0).value:null;s&&(s=i.serializer.deserialize(s)),a(s)},function(u,c){t(c)})})}).catch(t)});return h(o,n),o}function or(e,n){var r=this,o=new v(function(a,t){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(f){G(f,i,"SELECT * FROM "+i.storeName,[],function(u,c){for(var s=c.rows,d=s.length,m=0;m<d;m++){var g=s.item(m),_=g.value;if(_&&(_=i.serializer.deserialize(_)),_=e(_,g.key,m+1),_!==void 0){a(_);return}}a()},function(u,c){t(c)})})}).catch(t)});return h(o,n),o}function Le(e,n,r,o){var a=this;e=A(e);var t=new v(function(i,f){a.ready().then(function(){n===void 0&&(n=null);var u=n,c=a._dbInfo;c.serializer.serialize(n,function(s,d){d?f(d):c.db.transaction(function(m){G(m,c,"INSERT OR REPLACE INTO "+c.storeName+" (key, value) VALUES (?, ?)",[e,s],function(){i(u)},function(g,_){f(_)})},function(m){if(m.code===m.QUOTA_ERR){if(o>0){i(Le.apply(a,[e,u,r,o-1]));return}f(m)}})})}).catch(f)});return h(t,r),t}function ar(e,n,r){return Le.apply(this,[e,n,r,1])}function ir(e,n){var r=this;e=A(e);var o=new v(function(a,t){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(f){G(f,i,"DELETE FROM "+i.storeName+" WHERE key = ?",[e],function(){a()},function(u,c){t(c)})})}).catch(t)});return h(o,n),o}function fr(e){var n=this,r=new v(function(o,a){n.ready().then(function(){var t=n._dbInfo;t.db.transaction(function(i){G(i,t,"DELETE FROM "+t.storeName,[],function(){o()},function(f,u){a(u)})})}).catch(a)});return h(r,e),r}function ur(e){var n=this,r=new v(function(o,a){n.ready().then(function(){var t=n._dbInfo;t.db.transaction(function(i){G(i,t,"SELECT COUNT(key) as c FROM "+t.storeName,[],function(f,u){var c=u.rows.item(0).c;o(c)},function(f,u){a(u)})})}).catch(a)});return h(r,e),r}function cr(e,n){var r=this,o=new v(function(a,t){r.ready().then(function(){var i=r._dbInfo;i.db.transaction(function(f){G(f,i,"SELECT key FROM "+i.storeName+" WHERE id = ? LIMIT 1",[e+1],function(u,c){var s=c.rows.length?c.rows.item(0).key:null;a(s)},function(u,c){t(c)})})}).catch(t)});return h(o,n),o}function sr(e){var n=this,r=new v(function(o,a){n.ready().then(function(){var t=n._dbInfo;t.db.transaction(function(i){G(i,t,"SELECT key FROM "+t.storeName,[],function(f,u){for(var c=[],s=0;s<u.rows.length;s++)c.push(u.rows.item(s).key);o(c)},function(f,u){a(u)})})}).catch(a)});return h(r,e),r}function lr(e){return new v(function(n,r){e.transaction(function(o){o.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",[],function(a,t){for(var i=[],f=0;f<t.rows.length;f++)i.push(t.rows.item(f).name);n({db:e,storeNames:i})},function(a,t){r(t)})},function(o){r(o)})})}function vr(e,n){n=Y.apply(this,arguments);var r=this.config();e=typeof e!="function"&&e||{},e.name||(e.name=e.name||r.name,e.storeName=e.storeName||r.storeName);var o=this,a;return e.name?a=new v(function(t){var i;e.name===r.name?i=o._dbInfo.db:i=openDatabase(e.name,"","",0),e.storeName?t({db:i,storeNames:[e.storeName]}):t(lr(i))}).then(function(t){return new v(function(i,f){t.db.transaction(function(u){function c(g){return new v(function(_,R){u.executeSql("DROP TABLE IF EXISTS "+g,[],function(){_()},function(S,F){R(F)})})}for(var s=[],d=0,m=t.storeNames.length;d<m;d++)s.push(c(t.storeNames[d]));v.all(s).then(function(){i()}).catch(function(g){f(g)})},function(u){f(u)})})}):a=v.reject("Invalid arguments"),h(a,n),a}var dr={_driver:"webSQLStorage",_initStorage:nr,_support:Ze(),iterate:or,getItem:tr,setItem:ar,removeItem:ir,clear:fr,length:ur,key:cr,keys:sr,dropInstance:vr};function hr(){try{return typeof localStorage<"u"&&"setItem"in localStorage&&!!localStorage.setItem}catch{return!1}}function Oe(e,n){var r=e.name+"/";return e.storeName!==n.storeName&&(r+=e.storeName+"/"),r}function mr(){var e="_localforage_support_test";try{return localStorage.setItem(e,!0),localStorage.removeItem(e),!1}catch{return!0}}function yr(){return!mr()||localStorage.length>0}function pr(e){var n=this,r={};if(e)for(var o in e)r[o]=e[o];return r.keyPrefix=Oe(e,n._defaultConfig),yr()?(n._dbInfo=r,r.serializer=le,v.resolve()):v.reject()}function gr(e){var n=this,r=n.ready().then(function(){for(var o=n._dbInfo.keyPrefix,a=localStorage.length-1;a>=0;a--){var t=localStorage.key(a);t.indexOf(o)===0&&localStorage.removeItem(t)}});return h(r,e),r}function _r(e,n){var r=this;e=A(e);var o=r.ready().then(function(){var a=r._dbInfo,t=localStorage.getItem(a.keyPrefix+e);return t&&(t=a.serializer.deserialize(t)),t});return h(o,n),o}function br(e,n){var r=this,o=r.ready().then(function(){for(var a=r._dbInfo,t=a.keyPrefix,i=t.length,f=localStorage.length,u=1,c=0;c<f;c++){var s=localStorage.key(c);if(s.indexOf(t)===0){var d=localStorage.getItem(s);if(d&&(d=a.serializer.deserialize(d)),d=e(d,s.substring(i),u++),d!==void 0)return d}}});return h(o,n),o}function wr(e,n){var r=this,o=r.ready().then(function(){var a=r._dbInfo,t;try{t=localStorage.key(e)}catch{t=null}return t&&(t=t.substring(a.keyPrefix.length)),t});return h(o,n),o}function Er(e){var n=this,r=n.ready().then(function(){for(var o=n._dbInfo,a=localStorage.length,t=[],i=0;i<a;i++){var f=localStorage.key(i);f.indexOf(o.keyPrefix)===0&&t.push(f.substring(o.keyPrefix.length))}return t});return h(r,e),r}function Sr(e){var n=this,r=n.keys().then(function(o){return o.length});return h(r,e),r}function Ir(e,n){var r=this;e=A(e);var o=r.ready().then(function(){var a=r._dbInfo;localStorage.removeItem(a.keyPrefix+e)});return h(o,n),o}function Rr(e,n,r){var o=this;e=A(e);var a=o.ready().then(function(){n===void 0&&(n=null);var t=n;return new v(function(i,f){var u=o._dbInfo;u.serializer.serialize(n,function(c,s){if(s)f(s);else try{localStorage.setItem(u.keyPrefix+e,c),i(t)}catch(d){(d.name==="QuotaExceededError"||d.name==="NS_ERROR_DOM_QUOTA_REACHED")&&f(d),f(d)}})})});return h(a,r),a}function Ar(e,n){if(n=Y.apply(this,arguments),e=typeof e!="function"&&e||{},!e.name){var r=this.config();e.name=e.name||r.name,e.storeName=e.storeName||r.storeName}var o=this,a;return e.name?a=new v(function(t){e.storeName?t(Oe(e,o._defaultConfig)):t(e.name+"/")}).then(function(t){for(var i=localStorage.length-1;i>=0;i--){var f=localStorage.key(i);f.indexOf(t)===0&&localStorage.removeItem(f)}}):a=v.reject("Invalid arguments"),h(a,n),a}var Dr={_driver:"localStorageWrapper",_initStorage:pr,_support:hr(),iterate:br,getItem:_r,setItem:Rr,removeItem:Ir,clear:gr,length:Sr,key:wr,keys:Er,dropInstance:Ar},Nr=function(n,r){return n===r||typeof n=="number"&&typeof r=="number"&&isNaN(n)&&isNaN(r)},Tr=function(n,r){for(var o=n.length,a=0;a<o;){if(Nr(n[a],r))return!0;a++}return!1},Pe=Array.isArray||function(e){return Object.prototype.toString.call(e)==="[object Array]"},q={},Fe={},j={INDEXEDDB:qe,WEBSQL:dr,LOCALSTORAGE:Dr},xr=[j.INDEXEDDB._driver,j.WEBSQL._driver,j.LOCALSTORAGE._driver],re=["dropInstance"],ve=["clear","getItem","iterate","key","keys","length","removeItem","setItem"].concat(re),Br={description:"",driver:xr.slice(),name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1};function Cr(e,n){e[n]=function(){var r=arguments;return e.ready().then(function(){return e[n].apply(e,r)})}}function de(){for(var e=1;e<arguments.length;e++){var n=arguments[e];if(n)for(var r in n)n.hasOwnProperty(r)&&(Pe(n[r])?arguments[0][r]=n[r].slice():arguments[0][r]=n[r])}return arguments[0]}var Lr=function(){function e(n){C(this,e);for(var r in j)if(j.hasOwnProperty(r)){var o=j[r],a=o._driver;this[r]=a,q[a]||this.defineDriver(o)}this._defaultConfig=de({},Br),this._config=de({},this._defaultConfig,n),this._driverSet=null,this._initDriver=null,this._ready=!1,this._dbInfo=null,this._wrapLibraryMethodsWithReady(),this.setDriver(this._config.driver).catch(function(){})}return e.prototype.config=function(r){if((typeof r>"u"?"undefined":E(r))==="object"){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var o in r){if(o==="storeName"&&(r[o]=r[o].replace(/\W/g,"_")),o==="version"&&typeof r[o]!="number")return new Error("Database version must be a number.");this._config[o]=r[o]}return"driver"in r&&r.driver?this.setDriver(this._config.driver):!0}else return typeof r=="string"?this._config[r]:this._config},e.prototype.defineDriver=function(r,o,a){var t=new v(function(i,f){try{var u=r._driver,c=new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");if(!r._driver){f(c);return}for(var s=ve.concat("_initStorage"),d=0,m=s.length;d<m;d++){var g=s[d],_=!Tr(re,g);if((_||r[g])&&typeof r[g]!="function"){f(c);return}}var R=function(){for(var Z=function(Fr){return function(){var Mr=new Error("Method "+Fr+" is not implemented by the current driver"),Me=v.reject(Mr);return h(Me,arguments[arguments.length-1]),Me}},he=0,Pr=re.length;he<Pr;he++){var me=re[he];r[me]||(r[me]=Z(me))}};R();var S=function(Z){q[u]&&console.info("Redefining LocalForage driver: "+u),q[u]=r,Fe[u]=Z,i()};"_support"in r?r._support&&typeof r._support=="function"?r._support().then(S,f):S(!!r._support):S(!0)}catch(F){f(F)}});return I(t,o,a),t},e.prototype.driver=function(){return this._driver||null},e.prototype.getDriver=function(r,o,a){var t=q[r]?v.resolve(q[r]):v.reject(new Error("Driver not found."));return I(t,o,a),t},e.prototype.getSerializer=function(r){var o=v.resolve(le);return I(o,r),o},e.prototype.ready=function(r){var o=this,a=o._driverSet.then(function(){return o._ready===null&&(o._ready=o._initDriver()),o._ready});return I(a,r,r),a},e.prototype.setDriver=function(r,o,a){var t=this;Pe(r)||(r=[r]);var i=this._getSupportedDrivers(r);function f(){t._config.driver=t.driver()}function u(d){return t._extend(d),f(),t._ready=t._initStorage(t._config),t._ready}function c(d){return function(){var m=0;function g(){for(;m<d.length;){var _=d[m];return m++,t._dbInfo=null,t._ready=null,t.getDriver(_).then(u).catch(g)}f();var R=new Error("No available storage method found.");return t._driverSet=v.reject(R),t._driverSet}return g()}}var s=this._driverSet!==null?this._driverSet.catch(function(){return v.resolve()}):v.resolve();return this._driverSet=s.then(function(){var d=i[0];return t._dbInfo=null,t._ready=null,t.getDriver(d).then(function(m){t._driver=m._driver,f(),t._wrapLibraryMethodsWithReady(),t._initDriver=c(i)})}).catch(function(){f();var d=new Error("No available storage method found.");return t._driverSet=v.reject(d),t._driverSet}),I(this._driverSet,o,a),this._driverSet},e.prototype.supports=function(r){return!!Fe[r]},e.prototype._extend=function(r){de(this,r)},e.prototype._getSupportedDrivers=function(r){for(var o=[],a=0,t=r.length;a<t;a++){var i=r[a];this.supports(i)&&o.push(i)}return o},e.prototype._wrapLibraryMethodsWithReady=function(){for(var r=0,o=ve.length;r<o;r++)Cr(this,ve[r])},e.prototype.createInstance=function(r){return new e(r)},e}(),Or=new Lr;M.exports=Or},{3:3}]},{},[4])(4)})}(ye)),ye.exports}var zr=Yr();const Kr=Ur(zr);export{Kr as l};