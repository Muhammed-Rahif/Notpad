if(!self.define){let s,e={};const l=(l,i)=>(l=new URL(l+".js",i).href,e[l]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=l,s.onload=e,document.head.appendChild(s)}else s=l,importScripts(l),e()})).then((()=>{let s=e[l];if(!s)throw new Error(`Module ${l} didn’t register its module`);return s})));self.define=(i,n)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const o=s=>l(s,r),a={module:{uri:r},exports:u,require:o};e[r]=Promise.all(i.map((s=>a[s]||o(s)))).then((s=>(n(...s),u)))}}define(["./workbox-3e8df8c8"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"apple-touch-icon-180x180.png",revision:"1ce8426988775fa4728986ba4c5f37ff"},{url:"assets/any-base-B1025x16.js",revision:null},{url:"assets/bits-ui-BpcL6yKj.css",revision:null},{url:"assets/bits-ui-lvcmWuwB.js",revision:null},{url:"assets/caret-pos-DFhiNPYe.js",revision:null},{url:"assets/clsx-B-dksMZM.js",revision:null},{url:"assets/dayjs-DTVXl87N.js",revision:null},{url:"assets/esm-env-rsSWfq8L.js",revision:null},{url:"assets/eventemitter3-DjL91OD9.js",revision:null},{url:"assets/fast-diff-BGhgD5-Y.js",revision:null},{url:"assets/floating-ui_core-BvNeq4VM.js",revision:null},{url:"assets/floating-ui_dom-NHKSciU2.js",revision:null},{url:"assets/floating-ui_utils-DbgHXlWd.js",revision:null},{url:"assets/index-BWFWOa1W.css",revision:null},{url:"assets/index-DCK-dSvZ.js",revision:null},{url:"assets/inline-style-parser-D4u_cg7q.js",revision:null},{url:"assets/internationalized_date-l0sNRNKZ.js",revision:null},{url:"assets/localforage-R4qgMD1V.js",revision:null},{url:"assets/lodash-es-BKPNmaDy.js",revision:null},{url:"assets/lodash.clonedeep-0VCzKUaf.js",revision:null},{url:"assets/lodash.debounce-Jc7hxq4V.js",revision:null},{url:"assets/lodash.isequal-DXWrDRUm.js",revision:null},{url:"assets/lodash.merge-RQavm9Mo.js",revision:null},{url:"assets/lodash.throttle-B5YObLry.js",revision:null},{url:"assets/neodrag_svelte-ChHYWBKd.js",revision:null},{url:"assets/parchment-Crftfyop.js",revision:null},{url:"assets/print-js-uHsC5pcI.js",revision:null},{url:"assets/quill-delta-w-TlnAtT.js",revision:null},{url:"assets/quill-DqW0R8N9.css",revision:null},{url:"assets/quill-wRDW5oQA.js",revision:null},{url:"assets/runed-Drt69-Rv.js",revision:null},{url:"assets/screenfull-DmVOzVZz.js",revision:null},{url:"assets/short-uuid-CKEddFoU.js",revision:null},{url:"assets/style-to-object-CDuECz-0.js",revision:null},{url:"assets/svelte-BmRDRyvJ.js",revision:null},{url:"assets/svelte-put_shortcut-DhGOoDHR.js",revision:null},{url:"assets/svelte-sonner-DKF17Rty.css",revision:null},{url:"assets/svelte-sonner-murQiA9X.js",revision:null},{url:"assets/svelte-toolbelt-qLQpPN8Q.js",revision:null},{url:"assets/swc_helpers-l0sNRNKZ.js",revision:null},{url:"assets/tailwind-merge-CVCfOWck.js",revision:null},{url:"assets/tailwind-variants-BfEarJHW.js",revision:null},{url:"assets/tauri-apps_api-BO7E0eYi.js",revision:null},{url:"assets/tauri-apps_plugin-dialog-DZgT9HaL.js",revision:null},{url:"assets/tauri-apps_plugin-fs-rqF7JPDW.js",revision:null},{url:"assets/tauri-apps_plugin-process-CfKzG15F.js",revision:null},{url:"assets/tauri-apps_plugin-shell-1aDvzwNc.js",revision:null},{url:"assets/uuid-81yIUSUu.js",revision:null},{url:"favicon.ico",revision:"d0ef459f18cbd20c767270c52998aae6"},{url:"favicon.png",revision:"83749520b6d18ecf1283c65cd60e9d44"},{url:"icon512_maskable.png",revision:"991637ab03987f0fe7912ed21915c5d2"},{url:"icon512_rounded.ico",revision:"d41d8cd98f00b204e9800998ecf8427e"},{url:"icon512_rounded.png",revision:"99465e232b31e0a3829e9a75f45188f0"},{url:"index.html",revision:"40739482fdaf5817ec387eb32871981a"},{url:"logo_square.png",revision:"c702335681975947c690519e0c4902d1"},{url:"logo.png",revision:"3cfd47275b37703e6a3bdb8e83b41e81"},{url:"maskable-icon-512x512.png",revision:"54f80d79a0ceecd2ef9960276dac47fe"},{url:"pwa-192x192.png",revision:"c34559b716ca0febb58b0bcf387c0417"},{url:"pwa-512x512.png",revision:"b70b9b3e90875529d7852d120f586895"},{url:"pwa-64x64.png",revision:"1e9b0a0f6452949ff0e70dbd6ab89a76"},{url:"registerSW.js",revision:"67d5bfef42ac42e5bd1c18adb7fd7593"},{url:"screenshot.png",revision:"f7a024ee951c874b82b582f0135e9be9"},{url:"icon512_maskable.png",revision:"991637ab03987f0fe7912ed21915c5d2"},{url:"icon512_rounded.png",revision:"99465e232b31e0a3829e9a75f45188f0"},{url:"manifest.webmanifest",revision:"b53ddad4df8cd25ad3de6210045d49ef"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
