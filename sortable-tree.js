/*! For license information please see sortable-tree.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.SortableTree=t():e.SortableTree=t()}(self,(()=>(()=>{"use strict";var e,t={886:(e,t,n)=>{n.d(t,{SortableTree:()=>m});const o=e=>`<span>${e.title}</span>`,r={tree:"tree",node:"tree__node",nodeHover:"tree__node--hover",nodeDragging:"tree__node--dragging",nodeDropBefore:"tree__node--drop-before",nodeDropInside:"tree__node--drop-inside",nodeDropAfter:"tree__node--drop-after",label:"tree__label",subnodes:"tree__subnodes",collapse:"tree__collapse"},s=({nodes:e,movedNode:t,srcParentNode:n,targetParentNode:o})=>{},a=(e,t)=>{},l=(e,t)=>{return n=void 0,o=void 0,s=function*(){return!0},new((r=void 0)||(r=Promise))((function(e,t){function a(e){try{i(s.next(e))}catch(e){t(e)}}function l(e){try{i(s.throw(e))}catch(e){t(e)}}function i(t){var n;t.done?e(t.value):(n=t.value,n instanceof r?n:new r((function(e){e(n)}))).then(a,l)}i((s=s.apply(n,o||[])).next())}));var n,o,r,s};const i=({node:e,eventName:t,handler:n,tree:o})=>{e.addEventListener(t,(e=>{n(e,o)}),!1)};var d;!function(e){e.BEFORE="BEFORE",e.INSIDE="INSIDE",e.AFTER="AFTER"}(d||(d={}));const c=e=>{const t=e.clientY,n=u(e).label.getBoundingClientRect(),o=Math.round(n.height/4);return n.top+o>t?d.BEFORE:n.bottom-o<t?d.AFTER:d.INSIDE},u=e=>e.target.closest(A.TAG_NAME),p=e=>{const t=e.parentElement.parentElement;return t.tagName.toLowerCase()!==A.TAG_NAME?null:t},f=(e,t)=>{u(e).classList.remove(t.styles.nodeDropAfter,t.styles.nodeDropBefore,t.styles.nodeDropInside)},h=(e,t)=>{e.stopPropagation();const n=e.target;n.tagName.toLowerCase()===A.TAG_NAME&&(e.dataTransfer.setData("text",n.guid),e.dataTransfer.effectAllowed="move",n.classList.add(t.styles.nodeDragging))},g=(e,t)=>{return n=void 0,o=void 0,s=function*(){e.stopPropagation(),e.preventDefault(),f(e,t);const n=u(e);if(!n)return!1;const o=p(n),r=e.dataTransfer.getData("text"),s=c(e),a=t.getNode(r),l=p(a);if(a.contains(n))return!1;if(t.lockRootLevel&&!n.parentElement.closest(A.TAG_NAME)&&(s===d.BEFORE||s===d.AFTER))return!1;if(s===d.BEFORE)return!!(yield t.confirm(a,o))&&(n.parentNode.insertBefore(a,n),t.onDrop(a,l,o),!1);if(s===d.AFTER){if(!(yield t.confirm(a,o)))return!1;const e=n.nextElementSibling;return e?(n.parentNode.insertBefore(a,e),t.onDrop(a,l,o)):(n.parentNode.appendChild(a),t.onDrop(a,l,o)),!1}return!!(yield t.confirm(a,n))&&(n.subnodes.appendChild(a),t.onDrop(a,l,n),!1)},new((r=void 0)||(r=Promise))((function(e,t){function a(e){try{i(s.next(e))}catch(e){t(e)}}function l(e){try{i(s.throw(e))}catch(e){t(e)}}function i(t){var n;t.done?e(t.value):(n=t.value,n instanceof r?n:new r((function(e){e(n)}))).then(a,l)}i((s=s.apply(n,o||[])).next())}));var n,o,r,s},v=(e,t)=>{e.preventDefault(),e.dataTransfer.dropEffect="move",((e,t)=>{const n=u(e),o=c(e);n.classList.toggle(t.styles.nodeDropBefore,o===d.BEFORE),n.classList.toggle(t.styles.nodeDropInside,o===d.INSIDE),n.classList.toggle(t.styles.nodeDropAfter,o===d.AFTER)})(e,t)},b=(e,t)=>{f(e,t)},E=(e,t)=>{e.target.classList.remove(t.styles.nodeDragging),f(e,t)};class m{constructor({nodes:e,element:t,renderLabel:n,styles:i,lockRootLevel:d,onChange:c,onClick:u,initCollapseLevel:p,confirm:f}){this.nodeCollection={},e&&(t?(this.defineElements(),this.root=t,this.styles=Object.assign(r,i),this.renderLabel=n||o,this.lockRootLevel=void 0===d||d,this.onChange=c||s,this.onClick=u||a,this.confirm=f||l,this.initCollapseLevel=void 0===p?2:p,t.classList.add(this.styles.tree),this.render({nodes:e,element:t})):console.error('Error: "element" is not a valid HTML element!'))}getNode(e){return this.nodeCollection[e]}findNode(e,t){const n=Object.values(this.nodeCollection);for(let o=0;o<n.length;o++){const r=n[o],s=r.data;if(e in s&&s[e]==t)return r}return null}onDrop(e,t,n){const o={nodes:this.parseTree(this.root),movedNode:e,srcParentNode:t,targetParentNode:n};n.collapse(!1),this.onChange(o)}defineElements(){try{customElements.define(A.TAG_NAME,A)}catch(e){}}render({nodes:e,element:t},n=0){n++,e.forEach((e=>{const o=A.create({styles:this.styles,parent:t,renderLabel:this.renderLabel,data:e.data,onClick:this.onClick});((e,t)=>{const n={dragstart:h,drop:g,dragover:v,dragend:E,dragleave:b};for(const[o,r]of Object.entries(n))i({node:e,eventName:o,handler:r,tree:t})})(o,this),o.collapse(n>this.initCollapseLevel),this.nodeCollection[o.guid]=o,e.nodes&&this.render({nodes:e.nodes,element:o.subnodes},n)}))}parseTree(e){const t=Array.from(e.querySelectorAll(`:scope > ${A.TAG_NAME}`)),n=[];return t.forEach((e=>{n.push({element:e,guid:e.guid,subnodes:this.parseTree(e.subnodes)})})),n}}m.ICON_COLLAPSED='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>',m.ICON_OPEN='<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>';const _=(e,t=[],n=null)=>{const o=document.createElement(e);return t.forEach((e=>{o.classList.add(e)})),n&&n.appendChild(o),o};class A extends HTMLElement{static create({data:e,renderLabel:t,styles:n,parent:o,onClick:r}){const s=_(A.TAG_NAME,[n.node],o),a=_("div",[n.label],s),l=_("div",[n.subnodes],s),i=_("span",[n.collapse],s);return a.innerHTML=t(e),i.innerHTML=m.ICON_COLLAPSED,i.addEventListener("click",s.toggle.bind(s)),a.addEventListener("click",(e=>{r(e,s)})),s._data=e,s._label=a,s._nodes=l,s.collapseButton=i,s}get data(){return this._data}get label(){return this._label}get subnodes(){return this._nodes}get guid(){return this._guid}constructor(){super(),this._guid=(()=>{const e=()=>Math.floor(65536*(1+Math.random())).toString(16).substring(1);return`${e()}${e()}-${e()}-${e()}-${e()}-${e()}${e()}${e()}`})()}connectedCallback(){this.setAttribute("draggable","true")}collapse(e){e?(this.removeAttribute("open"),this.collapseButton.innerHTML=m.ICON_COLLAPSED):(this.setAttribute("open","true"),this.collapseButton.innerHTML=m.ICON_OPEN)}toggle(){this.collapse(this.hasAttribute("open"))}reveal(){((e,t)=>{const n=[];let o=this.closest(e);for(;null!==o;)n.push(o),o=o.parentNode.closest(e);return n})(A.TAG_NAME).forEach((e=>{e.collapse(!1)}))}}A.TAG_NAME="sortable-tree-node",n(439)}},n={};function o(e){var r=n[e];if(void 0!==r)return r.exports;var s=n[e]={exports:{}};return t[e](s,s.exports,o),s.exports}o.m=t,e=[],o.O=(t,n,r,s)=>{if(!n){var a=1/0;for(c=0;c<e.length;c++){for(var[n,r,s]=e[c],l=!0,i=0;i<n.length;i++)(!1&s||a>=s)&&Object.keys(o.O).every((e=>o.O[e](n[i])))?n.splice(i--,1):(l=!1,s<a&&(a=s));if(l){e.splice(c--,1);var d=r();void 0!==d&&(t=d)}}return t}s=s||0;for(var c=e.length;c>0&&e[c-1][2]>s;c--)e[c]=e[c-1];e[c]=[n,r,s]},o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={597:0};o.O.j=t=>0===e[t];var t=(t,n)=>{var r,s,[a,l,i]=n,d=0;if(a.some((t=>0!==e[t]))){for(r in l)o.o(l,r)&&(o.m[r]=l[r]);if(i)var c=i(o)}for(t&&t(n);d<a.length;d++)s=a[d],o.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return o.O(c)},n=self.webpackChunkSortableTree=self.webpackChunkSortableTree||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var r=o.O(void 0,[577],(()=>o(886)));return(r=o.O(r)).SortableTree})()));