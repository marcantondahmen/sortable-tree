/*! For license information please see main.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.SortableTree=t():e.SortableTree=t()}(self,(()=>(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},t={};e.d(t,{SortableTree:()=>b,B:()=>_});const n=e=>`<span>${e.title}</span>`,o={tree:"tree",node:"tree__node",nodeHover:"tree__node--hover",nodeDragging:"tree__node--dragging",nodeDropBefore:"tree__node--drop-before",nodeDropInside:"tree__node--drop-inside",nodeDropAfter:"tree__node--drop-after",label:"tree__label",subnodes:"tree__subnodes",collapse:"tree__collapse"},r=({nodes:e,movedNode:t,srcParentNode:n,targetParentNode:o})=>{},s=(e,t)=>{},a=(e,t)=>{return n=void 0,o=void 0,s=function*(){return!0},new((r=void 0)||(r=Promise))((function(e,t){function a(e){try{i(s.next(e))}catch(e){t(e)}}function l(e){try{i(s.throw(e))}catch(e){t(e)}}function i(t){var n;t.done?e(t.value):(n=t.value,n instanceof r?n:new r((function(e){e(n)}))).then(a,l)}i((s=s.apply(n,o||[])).next())}));var n,o,r,s};const l=({node:e,eventName:t,handler:n,tree:o})=>{e.addEventListener(t,(e=>{n(e,o)}),!1)};var i;!function(e){e.BEFORE="BEFORE",e.INSIDE="INSIDE",e.AFTER="AFTER"}(i||(i={}));const d=e=>{const t=e.clientY,n=c(e).label.getBoundingClientRect(),o=Math.round(n.height/4);return n.top+o>t?i.BEFORE:n.bottom-o<t?i.AFTER:i.INSIDE},c=e=>e.target.closest(_.TAG_NAME),u=e=>{const t=e.parentElement.parentElement;return t.tagName.toLowerCase()!==_.TAG_NAME?null:t},p=(e,t)=>{c(e).classList.remove(t.styles.nodeDropAfter,t.styles.nodeDropBefore,t.styles.nodeDropInside)},h=(e,t)=>{e.stopPropagation();const n=e.target;n.tagName.toLowerCase()===_.TAG_NAME&&(e.dataTransfer.setData("text",n.guid),e.dataTransfer.effectAllowed="move",n.classList.add(t.styles.nodeDragging))},f=(e,t)=>{return n=void 0,o=void 0,s=function*(){e.stopPropagation(),e.preventDefault(),p(e,t);const n=c(e);if(!n)return!1;const o=u(n),r=e.dataTransfer.getData("text"),s=d(e),a=t.getNode(r),l=u(a);if(a.contains(n))return!1;if(t.lockRootLevel&&!n.parentElement.closest(_.TAG_NAME)&&(s===i.BEFORE||s===i.AFTER))return!1;if(!(yield t.confirm(a,o)))return!1;if(s===i.BEFORE)return n.parentNode.insertBefore(a,n),t.onDrop(a,l,o),!1;if(s===i.AFTER){const e=n.nextElementSibling;return e?(n.parentNode.insertBefore(a,e),t.onDrop(a,l,o)):(n.parentNode.appendChild(a),t.onDrop(a,l,o)),!1}return n.subnodes.appendChild(a),t.onDrop(a,l,n),!1},new((r=void 0)||(r=Promise))((function(e,t){function a(e){try{i(s.next(e))}catch(e){t(e)}}function l(e){try{i(s.throw(e))}catch(e){t(e)}}function i(t){var n;t.done?e(t.value):(n=t.value,n instanceof r?n:new r((function(e){e(n)}))).then(a,l)}i((s=s.apply(n,o||[])).next())}));var n,o,r,s},g=(e,t)=>{e.preventDefault(),e.dataTransfer.dropEffect="move",((e,t)=>{const n=c(e),o=d(e);n.classList.toggle(t.styles.nodeDropBefore,o===i.BEFORE),n.classList.toggle(t.styles.nodeDropInside,o===i.INSIDE),n.classList.toggle(t.styles.nodeDropAfter,o===i.AFTER)})(e,t)},v=(e,t)=>{p(e,t)},E=(e,t)=>{e.target.classList.remove(t.styles.nodeDragging),p(e,t)};class b{constructor({nodes:e,element:t,renderLabel:l,styles:i,lockRootLevel:d,onChange:c,onClick:u,initCollapseLevel:p,confirm:h}){this.nodeCollection={},e&&(t?(this.defineElements(),this.root=t,this.styles=Object.assign(o,i),this.renderLabel=l||n,this.lockRootLevel=void 0===d||d,this.onChange=c||r,this.onClick=u||s,this.confirm=h||a,this.initCollapseLevel=void 0===p?2:p,t.classList.add(this.styles.tree),this.render({nodes:e,element:t})):console.error('Error: "element" is not a valid HTML element!'))}getNode(e){return this.nodeCollection[e]}findNode(e,t){const n=Object.values(this.nodeCollection);for(let o=0;o<n.length;o++){const r=n[o],s=r.data;if(e in s&&s[e]==t)return r}return null}onDrop(e,t,n){const o={nodes:this.parseTree(this.root),movedNode:e,srcParentNode:t,targetParentNode:n};n.collapse(!1),this.onChange(o)}defineElements(){try{customElements.define(_.TAG_NAME,_)}catch(e){}}render({nodes:e,element:t},n=0){n++,e.forEach((e=>{const o=_.create({styles:this.styles,parent:t,renderLabel:this.renderLabel,data:e.data,onClick:this.onClick});((e,t)=>{const n={dragstart:h,drop:f,dragover:g,dragend:E,dragleave:v};for(const[o,r]of Object.entries(n))l({node:e,eventName:o,handler:r,tree:t})})(o,this),o.collapse(n>this.initCollapseLevel),this.nodeCollection[o.guid]=o,e.nodes&&this.render({nodes:e.nodes,element:o.subnodes},n)}))}parseTree(e){const t=Array.from(e.querySelectorAll(`:scope > ${_.TAG_NAME}`)),n=[];return t.forEach((e=>{n.push({element:e,guid:e.guid,subnodes:this.parseTree(e.subnodes)})})),n}}b.ICON_COLLAPSED='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>',b.ICON_OPEN='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>';const m=(e,t=[],n=null)=>{const o=document.createElement(e);return t.forEach((e=>{o.classList.add(e)})),n&&n.appendChild(o),o};class _ extends HTMLElement{static create({data:e,renderLabel:t,styles:n,parent:o,onClick:r}){const s=m(_.TAG_NAME,[n.node],o),a=m("div",[n.label],s),l=m("div",[n.subnodes],s),i=m("span",[n.collapse],s);return a.innerHTML=t(e),i.innerHTML=b.ICON_COLLAPSED,i.addEventListener("click",s.toggle.bind(s)),a.addEventListener("click",(e=>{r(e,s)})),s._data=e,s._label=a,s._nodes=l,s.collapseButton=i,s}get data(){return this._data}get label(){return this._label}get subnodes(){return this._nodes}get guid(){return this._guid}constructor(){super(),this._guid=(()=>{const e=()=>Math.floor(65536*(1+Math.random())).toString(16).substring(1);return`${e()}${e()}-${e()}-${e()}-${e()}-${e()}${e()}${e()}`})()}connectedCallback(){this.setAttribute("draggable","true")}collapse(e){e?(this.removeAttribute("open"),this.collapseButton.innerHTML=b.ICON_COLLAPSED):(this.setAttribute("open","true"),this.collapseButton.innerHTML=b.ICON_OPEN)}toggle(){this.collapse(this.hasAttribute("open"))}reveal(){((e,t)=>{const n=[];let o=this.closest(e);for(;null!==o;)n.push(o),o=o.parentNode.closest(e);return n})(_.TAG_NAME).forEach((e=>{e.collapse(!1)}))}}return _.TAG_NAME="sortable-tree-node",t.SortableTree})()));