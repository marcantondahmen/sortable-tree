(self.webpackChunkSortableTree=self.webpackChunkSortableTree||[]).push([[577],{299:()=>{class e extends HTMLElement{constructor(){super()}connectedCallback(){this.classList.add("toc"),setTimeout((()=>{this.render()}),0)}render(){const e=Array.from(document.querySelectorAll("h2")),t=[];if(!e)return;e.forEach((e=>{e.id=e.textContent.toLowerCase().replace(/\W+/,"-"),t.push({href:`#${e.id}`,text:e.textContent})})),t.forEach((e=>{const t=document.createElement("a");t.href=e.href,t.textContent=e.text,this.appendChild(t)}));const r=new IntersectionObserver((e=>{e.forEach((e=>{const t=e.target.getAttribute("id"),r=document.querySelector(`demo-toc a[href="#${t}"]`);try{e.intersectionRatio>0?r.classList.add("active"):r.classList.remove("active")}catch(e){}}))}));Array.from(document.querySelectorAll("h2")).forEach((e=>{r.observe(e)}))}}customElements.define("demo-toc",e)},439:(e,t,r)=>{"use strict";r(299)}}]);