/*! For license information please see main.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.SortableTree=t():e.SortableTree=t()}(self,(()=>(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{default:()=>A});const n=e=>`<span>${e.title}</span>`,o={tree:"tree",node:"tree__node",nodeHover:"tree__node--hover",nodeDragging:"tree__node--dragging",nodeDropBefore:"tree__node--drop-before",nodeDropInside:"tree__node--drop-inside",nodeDropAfter:"tree__node--drop-after",label:"tree__label",subnodes:"tree__subnodes",collapse:"tree__collapse"},r=({nodes:e,movedNode:t,srcParentNode:n,targetParentNode:o})=>{},s=(e,t)=>{},a=(e,t)=>{return n=void 0,o=void 0,s=function*(){return!0},new((r=void 0)||(r=Promise))((function(e,t){function a(e){try{i(s.next(e))}catch(e){t(e)}}function l(e){try{i(s.throw(e))}catch(e){t(e)}}function i(t){var n;t.done?e(t.value):(n=t.value,n instanceof r?n:new r((function(e){e(n)}))).then(a,l)}i((s=s.apply(n,o||[])).next())}));var n,o,r,s},l=(e,t=[],n=null)=>{const o=document.createElement(e);return t.forEach((e=>{o.classList.add(e)})),n&&n.appendChild(o),o};class i extends HTMLElement{static create({data:e,renderLabel:t,styles:n,parent:o,onClick:r}){const s=l(i.TAG_NAME,[n.node],o),a=l("div",[n.label],s),d=l("div",[n.subnodes],s),c=l("span",[n.collapse],s);return a.innerHTML=t(e),c.innerHTML=_.ICON_COLLAPSED,c.addEventListener("click",s.toggle.bind(s)),a.addEventListener("click",(e=>{r(e,s)})),s._data=e,s._label=a,s._nodes=d,s.collapseButton=c,s}get data(){return this._data}get label(){return this._label}get subnodes(){return this._nodes}get guid(){return this._guid}constructor(){super(),this._guid=(()=>{const e=()=>Math.floor(65536*(1+Math.random())).toString(16).substring(1);return`${e()}${e()}-${e()}-${e()}-${e()}-${e()}${e()}${e()}`})()}connectedCallback(){this.setAttribute("draggable","true")}collapse(e){e?(this.removeAttribute("open"),this.collapseButton.innerHTML=_.ICON_COLLAPSED):(this.setAttribute("open","true"),this.collapseButton.innerHTML=_.ICON_OPEN)}toggle(){this.collapse(this.hasAttribute("open"))}reveal(){((e,t)=>{const n=[];let o=this.closest(e);for(;null!==o;)n.push(o),o=o.parentNode.closest(e);return n})(i.TAG_NAME).forEach((e=>{e.collapse(!1)}))}}i.TAG_NAME="tree-node";const d=({node:e,eventName:t,handler:n,tree:o})=>{e.addEventListener(t,(e=>{n(e,o)}),!1)};var c;!function(e){e.BEFORE="BEFORE",e.INSIDE="INSIDE",e.AFTER="AFTER"}(c||(c={}));const u=e=>{const t=e.clientY,n=p(e).label.getBoundingClientRect(),o=Math.round(n.height/4);return n.top+o>t?c.BEFORE:n.bottom-o<t?c.AFTER:c.INSIDE},p=e=>e.target.closest(i.TAG_NAME),h=e=>{const t=e.parentElement.parentElement;return t.tagName.toLowerCase()!==i.TAG_NAME?null:t},f=(e,t)=>{p(e).classList.remove(t.styles.nodeDropAfter,t.styles.nodeDropBefore,t.styles.nodeDropInside)},g=(e,t)=>{e.stopPropagation();const n=e.target;n.tagName.toLowerCase()===i.TAG_NAME&&(e.dataTransfer.setData("text",n.guid),e.dataTransfer.effectAllowed="move",n.classList.add(t.styles.nodeDragging))},v=(e,t)=>{return n=void 0,o=void 0,s=function*(){e.stopPropagation(),e.preventDefault(),f(e,t);const n=p(e);if(!n)return!1;const o=h(n),r=e.dataTransfer.getData("text"),s=u(e),a=t.getNode(r),l=h(a);if(a.contains(n))return!1;if(t.lockRootLevel&&!n.parentElement.closest(i.TAG_NAME)&&(s===c.BEFORE||s===c.AFTER))return!1;if(!(yield t.confirm(a,o)))return!1;if(s===c.BEFORE)return n.parentNode.insertBefore(a,n),t.onDrop(a,l,o),!1;if(s===c.AFTER){const e=n.nextElementSibling;return e?(n.parentNode.insertBefore(a,e),t.onDrop(a,l,o)):(n.parentNode.appendChild(a),t.onDrop(a,l,o)),!1}return n.subnodes.appendChild(a),t.onDrop(a,l,n),!1},new((r=void 0)||(r=Promise))((function(e,t){function a(e){try{i(s.next(e))}catch(e){t(e)}}function l(e){try{i(s.throw(e))}catch(e){t(e)}}function i(t){var n;t.done?e(t.value):(n=t.value,n instanceof r?n:new r((function(e){e(n)}))).then(a,l)}i((s=s.apply(n,o||[])).next())}));var n,o,r,s},E=(e,t)=>{e.preventDefault(),e.dataTransfer.dropEffect="move",((e,t)=>{const n=p(e),o=u(e);n.classList.toggle(t.styles.nodeDropBefore,o===c.BEFORE),n.classList.toggle(t.styles.nodeDropInside,o===c.INSIDE),n.classList.toggle(t.styles.nodeDropAfter,o===c.AFTER)})(e,t)},b=(e,t)=>{f(e,t)},m=(e,t)=>{e.target.classList.remove(t.styles.nodeDragging),f(e,t)};class _{constructor({nodes:e,element:t,renderLabel:l,styles:i,lockRootLevel:d,onChange:c,onClick:u,initCollapseLevel:p,confirm:h}){this.nodeCollection={},e&&(this.defineElements(),this.root=t,this.styles=Object.assign(o,i),this.renderLabel=l||n,this.lockRootLevel=void 0===d||d,this.onChange=c||r,this.onClick=u||s,this.confirm=h||a,this.initCollapseLevel=void 0===p?2:p,t.classList.add(this.styles.tree),this.render({nodes:e,element:t}))}getNode(e){return this.nodeCollection[e]}findNode(e,t){const n=Object.values(this.nodeCollection);for(let o=0;o<n.length;o++){const r=n[o],s=r.data;if(e in s&&s[e]==t)return r}return null}onDrop(e,t,n){const o={nodes:this.parseTree(this.root),movedNode:e,srcParentNode:t,targetParentNode:n};n.collapse(!1),this.onChange(o)}defineElements(){try{customElements.define(i.TAG_NAME,i)}catch(e){}}render({nodes:e,element:t},n=0){n++,e.forEach((e=>{const o=i.create({styles:this.styles,parent:t,renderLabel:this.renderLabel,data:e.data,onClick:this.onClick});((e,t)=>{const n={dragstart:g,drop:v,dragover:E,dragend:m,dragleave:b};for(const[o,r]of Object.entries(n))d({node:e,eventName:o,handler:r,tree:t})})(o,this),o.collapse(n>this.initCollapseLevel),this.nodeCollection[o.guid]=o,e.nodes&&this.render({nodes:e.nodes,element:o.subnodes},n)}))}parseTree(e){const t=Array.from(e.querySelectorAll(`:scope > ${i.TAG_NAME}`)),n=[];return t.forEach((e=>{n.push({element:e,guid:e.guid,subnodes:this.parseTree(e.subnodes)})})),n}}_.ICON_COLLAPSED='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>',_.ICON_OPEN='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>';const A=_;return t.default})()));