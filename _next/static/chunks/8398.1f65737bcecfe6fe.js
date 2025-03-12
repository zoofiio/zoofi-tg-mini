"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8398],{88398:function(e,t,s){s.d(t,{default:function(){return _}});let a=()=>"9.1.0",i=e=>e.toString(16).padStart(2,"0"),n=e=>{let t=new Uint8Array((e||40)/2);return window.crypto.getRandomValues(t),Array.from(t,i).join("")},r=()=>"undefined"!=typeof window?n(10):new Date().getTime().toString(36);class o{}o.makeRequest=(e,t)=>({id:r(),method:e,params:t,env:{sdkVersion:a()}}),o.makeResponse=(e,t,s)=>({id:e,success:!0,version:s,data:t}),o.makeErrorResponse=(e,t,s)=>({id:e,success:!1,error:t,version:s}),(f=p||(p={})).sendTransactions="sendTransactions",f.rpcCall="rpcCall",f.getChainInfo="getChainInfo",f.getSafeInfo="getSafeInfo",f.getTxBySafeTxHash="getTxBySafeTxHash",f.getSafeBalances="getSafeBalances",f.signMessage="signMessage",f.signTypedMessage="signTypedMessage",f.getEnvironmentInfo="getEnvironmentInfo",f.getOffChainSignature="getOffChainSignature",f.requestAddressBook="requestAddressBook",f.wallet_getPermissions="wallet_getPermissions",f.wallet_requestPermissions="wallet_requestPermissions",(w||(w={})).requestAddressBook="requestAddressBook";class c{constructor(e=null,t=!1){this.allowedOrigins=null,this.callbacks=new Map,this.debugMode=!1,this.isServer="undefined"==typeof window,this.isValidMessage=({origin:e,data:t,source:s})=>{let a=!this.isServer&&s===window.parent,i=void 0!==t.version&&parseInt(t.version.split(".")[0]),n=!0;return Array.isArray(this.allowedOrigins)&&(n=void 0!==this.allowedOrigins.find(t=>t.test(e))),!!t&&a&&"number"==typeof i&&i>=1&&n},this.logIncomingMessage=e=>{console.info(`Safe Apps SDK v1: A message was received from origin ${e.origin}. `,e.data)},this.onParentMessage=e=>{this.isValidMessage(e)&&(this.debugMode&&this.logIncomingMessage(e),this.handleIncomingMessage(e.data))},this.handleIncomingMessage=e=>{let{id:t}=e,s=this.callbacks.get(t);s&&(s(e),this.callbacks.delete(t))},this.send=(e,t)=>{let s=o.makeRequest(e,t);if(this.isServer)throw Error("Window doesn't exist");return window.parent.postMessage(s,"*"),new Promise((e,t)=>{this.callbacks.set(s.id,s=>{if(!s.success){t(Error(s.error));return}e(s)})})},this.allowedOrigins=e,this.debugMode=t,this.isServer||window.addEventListener("message",this.onParentMessage)}}let l=e=>"object"==typeof e&&null!=e&&"domain"in e&&"types"in e&&"message"in e;s(56957);class u{constructor(e){this.communicator=e}async getBySafeTxHash(e){if(!e)throw Error("Invalid safeTxHash");return(await this.communicator.send(p.getTxBySafeTxHash,{safeTxHash:e})).data}async signMessage(e){return(await this.communicator.send(p.signMessage,{message:e})).data}async signTypedMessage(e){if(!l(e))throw Error("Invalid typed data");return(await this.communicator.send(p.signTypedMessage,{typedData:e})).data}async send({txs:e,params:t}){if(!e||!e.length)throw Error("No transactions were passed");return(await this.communicator.send(p.sendTransactions,{txs:e,params:t})).data}}let d="eth_call",h=(e="latest")=>e,g=(e=!1)=>e,m=e=>Number.isInteger(e)?`0x${e.toString(16)}`:e;class y{constructor(e){this.communicator=e,this.call=this.buildRequest({call:d,formatters:[null,h]}),this.getBalance=this.buildRequest({call:"eth_getBalance",formatters:[null,h]}),this.getCode=this.buildRequest({call:"eth_getCode",formatters:[null,h]}),this.getStorageAt=this.buildRequest({call:"eth_getStorageAt",formatters:[null,m,h]}),this.getPastLogs=this.buildRequest({call:"eth_getLogs"}),this.getBlockByHash=this.buildRequest({call:"eth_getBlockByHash",formatters:[null,g]}),this.getBlockByNumber=this.buildRequest({call:"eth_getBlockByNumber",formatters:[m,g]}),this.getTransactionByHash=this.buildRequest({call:"eth_getTransactionByHash"}),this.getTransactionReceipt=this.buildRequest({call:"eth_getTransactionReceipt"}),this.getTransactionCount=this.buildRequest({call:"eth_getTransactionCount",formatters:[null,h]}),this.getGasPrice=this.buildRequest({call:"eth_gasPrice"}),this.getEstimateGas=e=>this.buildRequest({call:"eth_estimateGas"})([e]),this.setSafeSettings=this.buildRequest({call:"safe_setSettings"})}buildRequest(e){let{call:t,formatters:s}=e;return async e=>(s&&Array.isArray(e)&&s.forEach((t,s)=>{t&&(e[s]=t(e[s]))}),(await this.communicator.send(p.rpcCall,{call:t,params:e||[]})).data)}}var f,p,w,b=s(42782),S=s(60689),v=s(50782);class q extends Error{constructor(e,t,s){super(e),this.code=t,this.data=s,Object.setPrototypeOf(this,q.prototype)}}class M{constructor(e){this.communicator=e}async getPermissions(){return(await this.communicator.send(p.wallet_getPermissions,void 0)).data}async requestPermissions(e){if(!this.isPermissionRequestValid(e))throw new q("Permissions request is invalid",4001);try{return(await this.communicator.send(p.wallet_requestPermissions,e)).data}catch{throw new q("Permissions rejected",4001)}}isPermissionRequestValid(e){return e.every(e=>"object"==typeof e&&Object.keys(e).every(e=>!!Object.values(w).includes(e)))}}let k=(e,t)=>t.some(t=>t.parentCapability===e);class B{constructor(e){this.communicator=e}async getChainInfo(){return(await this.communicator.send(p.getChainInfo,void 0)).data}async getInfo(){return(await this.communicator.send(p.getSafeInfo,void 0)).data}async experimental_getBalances({currency:e="usd"}={}){return(await this.communicator.send(p.getSafeBalances,{currency:e})).data}async check1271Signature(e,t="0x"){let s=await this.getInfo(),a=(0,b.R)({abi:[{constant:!1,inputs:[{name:"_dataHash",type:"bytes32"},{name:"_signature",type:"bytes"}],name:"isValidSignature",outputs:[{name:"",type:"bytes4"}],payable:!1,stateMutability:"nonpayable",type:"function"}],functionName:"isValidSignature",args:[e,t]}),i={call:d,params:[{to:s.safeAddress,data:a},"latest"]};try{return"0x1626ba7e"===(await this.communicator.send(p.rpcCall,i)).data.slice(0,10).toLowerCase()}catch(e){return!1}}async check1271SignatureBytes(e,t="0x"){let s=await this.getInfo(),a=(0,b.R)({abi:[{constant:!1,inputs:[{name:"_data",type:"bytes"},{name:"_signature",type:"bytes"}],name:"isValidSignature",outputs:[{name:"",type:"bytes4"}],payable:!1,stateMutability:"nonpayable",type:"function"}],functionName:"isValidSignature",args:[e,t]}),i={call:d,params:[{to:s.safeAddress,data:a},"latest"]};try{return"0x20c13b0b"===(await this.communicator.send(p.rpcCall,i)).data.slice(0,10).toLowerCase()}catch(e){return!1}}calculateMessageHash(e){return(0,S.r)(e)}calculateTypedMessageHash(e){let t="object"==typeof e.domain.chainId?e.domain.chainId.toNumber():Number(e.domain.chainId),s=e.primaryType;if(!s){let t=Object.values(e.types),a=Object.keys(e.types).filter(e=>t.every(t=>t.every(({type:t})=>t.replace("[","").replace("]","")!==e)));if(0===a.length||a.length>1)throw Error("Please specify primaryType");s=a[0]}return(0,v.Jv)({message:e.message,domain:{...e.domain,chainId:t,verifyingContract:e.domain.verifyingContract,salt:e.domain.salt},types:e.types,primaryType:s})}async getOffChainSignature(e){return(await this.communicator.send(p.getOffChainSignature,e)).data}async isMessageSigned(e,t="0x"){let s;if("string"==typeof e&&(s=async()=>{let s=this.calculateMessageHash(e);return await this.isMessageHashSigned(s,t)}),l(e)&&(s=async()=>{let s=this.calculateTypedMessageHash(e);return await this.isMessageHashSigned(s,t)}),s)return await s();throw Error("Invalid message type")}async isMessageHashSigned(e,t="0x"){for(let s of[this.check1271Signature.bind(this),this.check1271SignatureBytes.bind(this)])if(await s(e,t))return!0;return!1}async getEnvironmentInfo(){return(await this.communicator.send(p.getEnvironmentInfo,void 0)).data}async requestAddressBook(){return(await this.communicator.send(p.requestAddressBook,void 0)).data}}!function(e,t,s,a){var i,n=arguments.length,r=n<3?t:null===a?a=Object.getOwnPropertyDescriptor(t,s):a;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,s,a);else for(var o=e.length-1;o>=0;o--)(i=e[o])&&(r=(n<3?i(r):n>3?i(t,s,r):i(t,s))||r);n>3&&r&&Object.defineProperty(t,s,r)}([(e,t,s)=>{let a=s.value;return s.value=async function(){let e=new M(this.communicator),s=await e.getPermissions();if(k(t,s)||(s=await e.requestPermissions([{[t]:{}}])),!k(t,s))throw new q("Permissions rejected",4001);return a.apply(this)},s}],B.prototype,"requestAddressBook",null);class R{constructor(e={}){let{allowedDomains:t=null,debug:s=!1}=e;this.communicator=new c(t,s),this.eth=new y(this.communicator),this.txs=new u(this.communicator),this.safe=new B(this.communicator),this.wallet=new M(this.communicator)}}var _=R}}]);