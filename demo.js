(()=>{var e={299:()=>{class e extends HTMLElement{constructor(){super()}connectedCallback(){this.classList.add("toc"),"loading"===document.readyState?document.addEventListener("DOMContentLoaded",this.render.bind(this)):this.render()}render(){const e=Array.from(document.querySelectorAll("h2")),t=[];if(!e)return;e.forEach((e=>{e.id=e.textContent.toLowerCase().replace(/\W+/g,"-"),t.push({href:`#${e.id}`,text:e.textContent})})),t.forEach((e=>{const t=document.createElement("a");t.href=e.href,t.textContent=e.text,this.appendChild(t)}));const r=new IntersectionObserver((e=>{e.forEach((e=>{const t=e.target.getAttribute("id"),r=document.querySelector(`demo-toc a[href="#${t}"]`);try{e.intersectionRatio>0?r.classList.add("active"):r.classList.remove("active")}catch(e){}}))}));Array.from(document.querySelectorAll("h2")).forEach((e=>{r.observe(e)}))}}customElements.define("demo-toc",e)}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var c=t[o]={exports:{}};return e[o](c,c.exports,r),c.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";r(299)})()})();