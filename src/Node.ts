/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import SortableTree from './SortableTree';
import { KeyValue, NodeCreationOptions } from './types';
import { create, guid, queryParents } from './utils';

export class NodeComponent extends HTMLElement {
	static TAG_NAME = 'tree-node';

	static create({
		data,
		renderLabel,
		styles,
		parent,
	}: NodeCreationOptions): NodeComponent {
		const node = create(
			NodeComponent.TAG_NAME,
			[styles.node],
			parent
		) as NodeComponent;

		const label = create('div', [styles.label], node);
		const subnodes = create('div', [styles.subnodes], node);
		const collapseButton = create('span', [styles.collapse], node);

		label.innerHTML = renderLabel(data);
		collapseButton.innerHTML = SortableTree.ICON_COLLAPSED;
		collapseButton.addEventListener('click', node.toggle.bind(node));

		node._data = data;
		node._label = label;
		node._nodes = subnodes;
		node.collapseButton = collapseButton;

		return node;
	}

	private collapseButton: HTMLElement;

	private _label: HTMLElement;

	private _nodes: HTMLElement;

	private _guid: string;

	private _data: KeyValue;

	get data(): KeyValue {
		return this._data;
	}

	get label(): HTMLElement {
		return this._label;
	}

	get subnodes(): HTMLElement {
		return this._nodes;
	}

	get guid(): string {
		return this._guid;
	}

	constructor() {
		super();
		this._guid = guid();
	}

	connectedCallback(): void {
		this.setAttribute('draggable', 'true');
	}

	collapse(state: boolean): void {
		if (state) {
			this.removeAttribute('open');
			this.collapseButton.innerHTML = SortableTree.ICON_COLLAPSED;
		} else {
			this.setAttribute('open', 'true');
			this.collapseButton.innerHTML = SortableTree.ICON_OPEN;
		}
	}

	toggle(): void {
		this.collapse(this.hasAttribute('open'));
	}

	reveal(): void {
		const nodes = queryParents(NodeComponent.TAG_NAME, this);

		nodes.forEach((node: NodeComponent) => {
			node.collapse(false);
		});
	}
}
