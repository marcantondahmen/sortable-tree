/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import { guid } from './utils';

export class NodeComponent extends HTMLElement {
	static TAG_NAME = 'tree-node';

	private _label: HTMLElement;

	private _nodes: HTMLElement;

	set label(element: HTMLElement) {
		this._label = element;
	}

	get label(): HTMLElement {
		return this._label;
	}

	set subnodes(element: HTMLElement) {
		this._nodes = element;
	}

	get subnodes(): HTMLElement {
		return this._nodes;
	}

	constructor() {
		super();
	}

	connectedCallback() {
		this.setAttribute('id', guid());
		this.setAttribute('draggable', 'true');
	}
}
