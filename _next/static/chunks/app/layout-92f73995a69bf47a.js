(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{714:function(e,t,n){Promise.resolve().then(n.t.bind(n,9697,23)),Promise.resolve().then(n.bind(n,7418)),Promise.resolve().then(n.t.bind(n,5563,23))},7418:function(e,t,n){"use strict";n.d(t,{PageLayout:function(){return O}});var r=n(5075),i=n(8110),s=n(580),a=n(4440),u=n(7929),l=class extends u.l{constructor(e={}){super(),this.config=e,this.#e=new Map}#e;build(e,t,n){let r=t.queryKey,a=t.queryHash??(0,i.Rm)(r,t),u=this.get(a);return u||(u=new s.A({client:e,queryKey:r,queryHash:a,options:e.defaultQueryOptions(t),state:n,defaultOptions:e.getQueryDefaults(r)}),this.add(u)),u}add(e){this.#e.has(e.queryHash)||(this.#e.set(e.queryHash,e),this.notify({type:"added",query:e}))}remove(e){let t=this.#e.get(e.queryHash);t&&(e.destroy(),t===e&&this.#e.delete(e.queryHash),this.notify({type:"removed",query:e}))}clear(){a.V.batch(()=>{this.getAll().forEach(e=>{this.remove(e)})})}get(e){return this.#e.get(e)}getAll(){return[...this.#e.values()]}find(e){let t={exact:!0,...e};return this.getAll().find(e=>(0,i._x)(t,e))}findAll(e={}){let t=this.getAll();return Object.keys(e).length>0?t.filter(t=>(0,i._x)(e,t)):t}notify(e){a.V.batch(()=>{this.listeners.forEach(t=>{t(e)})})}onFocus(){a.V.batch(()=>{this.getAll().forEach(e=>{e.onFocus()})})}onOnline(){a.V.batch(()=>{this.getAll().forEach(e=>{e.onOnline()})})}},o=n(1481),c=class extends u.l{constructor(e={}){super(),this.config=e,this.#t=new Set,this.#n=new Map,this.#r=0}#t;#n;#r;build(e,t,n){let r=new o.m({mutationCache:this,mutationId:++this.#r,options:e.defaultMutationOptions(t),state:n});return this.add(r),r}add(e){this.#t.add(e);let t=f(e);if("string"==typeof t){let n=this.#n.get(t);n?n.push(e):this.#n.set(t,[e])}this.notify({type:"added",mutation:e})}remove(e){if(this.#t.delete(e)){let t=f(e);if("string"==typeof t){let n=this.#n.get(t);if(n){if(n.length>1){let t=n.indexOf(e);-1!==t&&n.splice(t,1)}else n[0]===e&&this.#n.delete(t)}}}this.notify({type:"removed",mutation:e})}canRun(e){let t=f(e);if("string"!=typeof t)return!0;{let n=this.#n.get(t),r=n?.find(e=>"pending"===e.state.status);return!r||r===e}}runNext(e){let t=f(e);if("string"!=typeof t)return Promise.resolve();{let n=this.#n.get(t)?.find(t=>t!==e&&t.state.isPaused);return n?.continue()??Promise.resolve()}}clear(){a.V.batch(()=>{this.#t.forEach(e=>{this.notify({type:"removed",mutation:e})}),this.#t.clear(),this.#n.clear()})}getAll(){return Array.from(this.#t)}find(e){let t={exact:!0,...e};return this.getAll().find(e=>(0,i.X7)(t,e))}findAll(e={}){return this.getAll().filter(t=>(0,i.X7)(e,t))}notify(e){a.V.batch(()=>{this.listeners.forEach(t=>{t(e)})})}resumePausedMutations(){let e=this.getAll().filter(e=>e.state.isPaused);return a.V.batch(()=>Promise.all(e.map(e=>e.continue().catch(i.ZT))))}};function f(e){return e.options.scope?.id}var d=n(1050),h=n(6719);function y(e){return{onFetch:(t,n)=>{let r=t.options,s=t.fetchOptions?.meta?.fetchMore?.direction,a=t.state.data?.pages||[],u=t.state.data?.pageParams||[],l={pages:[],pageParams:[]},o=0,c=async()=>{let n=!1,c=e=>{Object.defineProperty(e,"signal",{enumerable:!0,get:()=>(t.signal.aborted?n=!0:t.signal.addEventListener("abort",()=>{n=!0}),t.signal)})},f=(0,i.cG)(t.options,t.fetchOptions),d=async(e,r,s)=>{if(n)return Promise.reject();if(null==r&&e.pages.length)return Promise.resolve(e);let a={client:t.client,queryKey:t.queryKey,pageParam:r,direction:s?"backward":"forward",meta:t.options.meta};c(a);let u=await f(a),{maxPages:l}=t.options,o=s?i.Ht:i.VX;return{pages:o(e.pages,u,l),pageParams:o(e.pageParams,r,l)}};if(s&&a.length){let e="backward"===s,t={pages:a,pageParams:u},n=(e?function(e,{pages:t,pageParams:n}){return t.length>0?e.getPreviousPageParam?.(t[0],t,n[0],n):void 0}:p)(r,t);l=await d(t,n,e)}else{let t=e??a.length;do{let e=0===o?u[0]??r.initialPageParam:p(r,l);if(o>0&&null==e)break;l=await d(l,e),o++}while(o<t)}return l};t.options.persister?t.fetchFn=()=>t.options.persister?.(c,{client:t.client,queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},n):t.fetchFn=c}}}function p(e,{pages:t,pageParams:n}){let r=t.length-1;return t.length>0?e.getNextPageParam(t[r],t,n[r],n):void 0}var m=class{#i;#s;#a;#u;#l;#o;#c;#f;constructor(e={}){this.#i=e.queryCache||new l,this.#s=e.mutationCache||new c,this.#a=e.defaultOptions||{},this.#u=new Map,this.#l=new Map,this.#o=0}mount(){this.#o++,1===this.#o&&(this.#c=d.j.subscribe(async e=>{e&&(await this.resumePausedMutations(),this.#i.onFocus())}),this.#f=h.N.subscribe(async e=>{e&&(await this.resumePausedMutations(),this.#i.onOnline())}))}unmount(){this.#o--,0===this.#o&&(this.#c?.(),this.#c=void 0,this.#f?.(),this.#f=void 0)}isFetching(e){return this.#i.findAll({...e,fetchStatus:"fetching"}).length}isMutating(e){return this.#s.findAll({...e,status:"pending"}).length}getQueryData(e){let t=this.defaultQueryOptions({queryKey:e});return this.#i.get(t.queryHash)?.state.data}ensureQueryData(e){let t=this.defaultQueryOptions(e),n=this.#i.build(this,t),r=n.state.data;return void 0===r?this.fetchQuery(e):(e.revalidateIfStale&&n.isStaleByTime((0,i.KC)(t.staleTime,n))&&this.prefetchQuery(t),Promise.resolve(r))}getQueriesData(e){return this.#i.findAll(e).map(({queryKey:e,state:t})=>[e,t.data])}setQueryData(e,t,n){let r=this.defaultQueryOptions({queryKey:e}),s=this.#i.get(r.queryHash),a=s?.state.data,u=(0,i.SE)(t,a);if(void 0!==u)return this.#i.build(this,r).setData(u,{...n,manual:!0})}setQueriesData(e,t,n){return a.V.batch(()=>this.#i.findAll(e).map(({queryKey:e})=>[e,this.setQueryData(e,t,n)]))}getQueryState(e){let t=this.defaultQueryOptions({queryKey:e});return this.#i.get(t.queryHash)?.state}removeQueries(e){let t=this.#i;a.V.batch(()=>{t.findAll(e).forEach(e=>{t.remove(e)})})}resetQueries(e,t){let n=this.#i;return a.V.batch(()=>(n.findAll(e).forEach(e=>{e.reset()}),this.refetchQueries({type:"active",...e},t)))}cancelQueries(e,t={}){let n={revert:!0,...t};return Promise.all(a.V.batch(()=>this.#i.findAll(e).map(e=>e.cancel(n)))).then(i.ZT).catch(i.ZT)}invalidateQueries(e,t={}){return a.V.batch(()=>(this.#i.findAll(e).forEach(e=>{e.invalidate()}),e?.refetchType==="none")?Promise.resolve():this.refetchQueries({...e,type:e?.refetchType??e?.type??"active"},t))}refetchQueries(e,t={}){let n={...t,cancelRefetch:t.cancelRefetch??!0};return Promise.all(a.V.batch(()=>this.#i.findAll(e).filter(e=>!e.isDisabled()).map(e=>{let t=e.fetch(void 0,n);return n.throwOnError||(t=t.catch(i.ZT)),"paused"===e.state.fetchStatus?Promise.resolve():t}))).then(i.ZT)}fetchQuery(e){let t=this.defaultQueryOptions(e);void 0===t.retry&&(t.retry=!1);let n=this.#i.build(this,t);return n.isStaleByTime((0,i.KC)(t.staleTime,n))?n.fetch(t):Promise.resolve(n.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(i.ZT).catch(i.ZT)}fetchInfiniteQuery(e){return e.behavior=y(e.pages),this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(i.ZT).catch(i.ZT)}ensureInfiniteQueryData(e){return e.behavior=y(e.pages),this.ensureQueryData(e)}resumePausedMutations(){return h.N.isOnline()?this.#s.resumePausedMutations():Promise.resolve()}getQueryCache(){return this.#i}getMutationCache(){return this.#s}getDefaultOptions(){return this.#a}setDefaultOptions(e){this.#a=e}setQueryDefaults(e,t){this.#u.set((0,i.Ym)(e),{queryKey:e,defaultOptions:t})}getQueryDefaults(e){let t=[...this.#u.values()],n={};return t.forEach(t=>{(0,i.to)(e,t.queryKey)&&Object.assign(n,t.defaultOptions)}),n}setMutationDefaults(e,t){this.#l.set((0,i.Ym)(e),{mutationKey:e,defaultOptions:t})}getMutationDefaults(e){let t=[...this.#l.values()],n={};return t.forEach(t=>{(0,i.to)(e,t.mutationKey)&&Object.assign(n,t.defaultOptions)}),n}defaultQueryOptions(e){if(e._defaulted)return e;let t={...this.#a.queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return t.queryHash||(t.queryHash=(0,i.Rm)(t.queryKey,t)),void 0===t.refetchOnReconnect&&(t.refetchOnReconnect="always"!==t.networkMode),void 0===t.throwOnError&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode="offlineFirst"),t.queryFn===i.CN&&(t.enabled=!1),t}defaultMutationOptions(e){return e?._defaulted?e:{...this.#a.mutations,...e?.mutationKey&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){this.#i.clear(),this.#s.clear()}},g=n(355),b=n(4892);let v=new m;function O(e){let{children:t}=e,[n,i]=b.useState(!1);return b.useEffect(()=>{console.info("inited"),i(!0)},[]),(0,r.jsx)(g.aH,{client:v,children:n&&t})}},5586:function(e,t){"use strict";let n;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{DOMAttributeNames:function(){return r},default:function(){return a},isEqualNode:function(){return s}});let r={acceptCharset:"accept-charset",className:"class",htmlFor:"for",httpEquiv:"http-equiv",noModule:"noModule"};function i(e){let{type:t,props:n}=e,i=document.createElement(t);for(let e in n){if(!n.hasOwnProperty(e)||"children"===e||"dangerouslySetInnerHTML"===e||void 0===n[e])continue;let s=r[e]||e.toLowerCase();"script"===t&&("async"===s||"defer"===s||"noModule"===s)?i[s]=!!n[e]:i.setAttribute(s,n[e])}let{children:s,dangerouslySetInnerHTML:a}=n;return a?i.innerHTML=a.__html||"":s&&(i.textContent="string"==typeof s?s:Array.isArray(s)?s.join(""):""),i}function s(e,t){if(e instanceof HTMLElement&&t instanceof HTMLElement){let n=t.getAttribute("nonce");if(n&&!e.getAttribute("nonce")){let r=t.cloneNode(!0);return r.setAttribute("nonce",""),r.nonce=n,n===e.nonce&&e.isEqualNode(r)}}return e.isEqualNode(t)}function a(){return{mountedInstances:new Set,updateHead:e=>{let t={};e.forEach(e=>{if("link"===e.type&&e.props["data-optimized-fonts"]){if(document.querySelector('style[data-href="'+e.props["data-href"]+'"]'))return;e.props.href=e.props["data-href"],e.props["data-href"]=void 0}let n=t[e.type]||[];n.push(e),t[e.type]=n});let r=t.title?t.title[0]:null,i="";if(r){let{children:e}=r.props;i="string"==typeof e?e:Array.isArray(e)?e.join(""):""}i!==document.title&&(document.title=i),["meta","base","link","style","script"].forEach(e=>{n(e,t[e]||[])})}}}n=(e,t)=>{let n=document.getElementsByTagName("head")[0],r=n.querySelector("meta[name=next-head-count]"),a=Number(r.content),u=[];for(let t=0,n=r.previousElementSibling;t<a;t++,n=(null==n?void 0:n.previousElementSibling)||null){var l;(null==n?void 0:null==(l=n.tagName)?void 0:l.toLowerCase())===e&&u.push(n)}let o=t.map(i).filter(e=>{for(let t=0,n=u.length;t<n;t++)if(s(u[t],e))return u.splice(t,1),!1;return!0});u.forEach(e=>{var t;return null==(t=e.parentNode)?void 0:t.removeChild(e)}),o.forEach(e=>n.insertBefore(e,r)),r.content=(a-u.length+o.length).toString()},("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},4555:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{cancelIdleCallback:function(){return r},requestIdleCallback:function(){return n}});let n="undefined"!=typeof self&&self.requestIdleCallback&&self.requestIdleCallback.bind(window)||function(e){let t=Date.now();return self.setTimeout(function(){e({didTimeout:!1,timeRemaining:function(){return Math.max(0,50-(Date.now()-t))}})},1)},r="undefined"!=typeof self&&self.cancelIdleCallback&&self.cancelIdleCallback.bind(window)||function(e){return clearTimeout(e)};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5563:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{default:function(){return v},handleClientScriptLoad:function(){return m},initScriptLoader:function(){return g}});let r=n(5706),i=n(997),s=n(5075),a=r._(n(2214)),u=i._(n(4892)),l=n(889),o=n(5586),c=n(4555),f=new Map,d=new Set,h=["onLoad","onReady","dangerouslySetInnerHTML","children","onError","strategy","stylesheets"],y=e=>{if(a.default.preinit){e.forEach(e=>{a.default.preinit(e,{as:"style"})});return}if("undefined"!=typeof window){let t=document.head;e.forEach(e=>{let n=document.createElement("link");n.type="text/css",n.rel="stylesheet",n.href=e,t.appendChild(n)})}},p=e=>{let{src:t,id:n,onLoad:r=()=>{},onReady:i=null,dangerouslySetInnerHTML:s,children:a="",strategy:u="afterInteractive",onError:l,stylesheets:c}=e,p=n||t;if(p&&d.has(p))return;if(f.has(t)){d.add(p),f.get(t).then(r,l);return}let m=()=>{i&&i(),d.add(p)},g=document.createElement("script"),b=new Promise((e,t)=>{g.addEventListener("load",function(t){e(),r&&r.call(this,t),m()}),g.addEventListener("error",function(e){t(e)})}).catch(function(e){l&&l(e)});for(let[n,r]of(s?(g.innerHTML=s.__html||"",m()):a?(g.textContent="string"==typeof a?a:Array.isArray(a)?a.join(""):"",m()):t&&(g.src=t,f.set(t,b)),Object.entries(e))){if(void 0===r||h.includes(n))continue;let e=o.DOMAttributeNames[n]||n.toLowerCase();g.setAttribute(e,r)}"worker"===u&&g.setAttribute("type","text/partytown"),g.setAttribute("data-nscript",u),c&&y(c),document.body.appendChild(g)};function m(e){let{strategy:t="afterInteractive"}=e;"lazyOnload"===t?window.addEventListener("load",()=>{(0,c.requestIdleCallback)(()=>p(e))}):p(e)}function g(e){e.forEach(m),[...document.querySelectorAll('[data-nscript="beforeInteractive"]'),...document.querySelectorAll('[data-nscript="beforePageRender"]')].forEach(e=>{let t=e.id||e.getAttribute("src");d.add(t)})}function b(e){let{id:t,src:n="",onLoad:r=()=>{},onReady:i=null,strategy:o="afterInteractive",onError:f,stylesheets:h,...y}=e,{updateScripts:m,scripts:g,getIsSsr:b,appDir:v,nonce:O}=(0,u.useContext)(l.HeadManagerContext),q=(0,u.useRef)(!1);(0,u.useEffect)(()=>{let e=t||n;q.current||(i&&e&&d.has(e)&&i(),q.current=!0)},[i,t,n]);let C=(0,u.useRef)(!1);if((0,u.useEffect)(()=>{!C.current&&("afterInteractive"===o?p(e):"lazyOnload"===o&&("complete"===document.readyState?(0,c.requestIdleCallback)(()=>p(e)):window.addEventListener("load",()=>{(0,c.requestIdleCallback)(()=>p(e))})),C.current=!0)},[e,o]),("beforeInteractive"===o||"worker"===o)&&(m?(g[o]=(g[o]||[]).concat([{id:t,src:n,onLoad:r,onReady:i,onError:f,...y}]),m(g)):b&&b()?d.add(t||n):b&&!b()&&p(e)),v){if(h&&h.forEach(e=>{a.default.preinit(e,{as:"style"})}),"beforeInteractive"===o)return n?(a.default.preload(n,y.integrity?{as:"script",integrity:y.integrity,nonce:O,crossOrigin:y.crossOrigin}:{as:"script",nonce:O,crossOrigin:y.crossOrigin}),(0,s.jsx)("script",{nonce:O,dangerouslySetInnerHTML:{__html:"(self.__next_s=self.__next_s||[]).push("+JSON.stringify([n,{...y,id:t}])+")"}})):(y.dangerouslySetInnerHTML&&(y.children=y.dangerouslySetInnerHTML.__html,delete y.dangerouslySetInnerHTML),(0,s.jsx)("script",{nonce:O,dangerouslySetInnerHTML:{__html:"(self.__next_s=self.__next_s||[]).push("+JSON.stringify([0,{...y,id:t}])+")"}}));"afterInteractive"===o&&n&&a.default.preload(n,y.integrity?{as:"script",integrity:y.integrity,nonce:O,crossOrigin:y.crossOrigin}:{as:"script",nonce:O,crossOrigin:y.crossOrigin})}return null}Object.defineProperty(b,"__nextScript",{value:!0});let v=b;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9697:function(){}},function(e){e.O(0,[607,286,504,673,744],function(){return e(e.s=714)}),_N_E=e.O()}]);