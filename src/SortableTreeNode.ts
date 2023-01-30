/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import SortableTree from '.';
import { SortableTreeKeyValue, SortableTreeNodeCreationOptions } from './types';
import { create, guid, queryParents } from './utils';

export class SortableTreeNodeComponent extends HTMLElement {
	static TAG_NAME = 'sortable-tree-node';

	static create({
		data,
		renderLabel,
		styles,
		parent,
		onClick,
		draggable,
	}: SortableTreeNodeCreationOptions): SortableTreeNodeComponent {
		const node = create(
			SortableTreeNodeComponent.TAG_NAME,
			[styles.node],
			parent
		) as SortableTreeNodeComponent;

		const label = create('div', [styles.label], node);
		const subnodes = create('div', [styles.subnodes], node);
		const collapseButton = create('span', [styles.collapse], node);

		label.innerHTML = renderLabel(data);
		collapseButton.innerHTML = SortableTree.ICON_COLLAPSED;
		collapseButton.addEventListener('click', node.toggle.bind(node));
		label.addEventListener('click', (event: Event) => {
			onClick(event, node);
		});

		if (draggable) {
			node.setAttribute('draggable', 'true');
		}

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

	private _data: SortableTreeKeyValue;

	get data(): SortableTreeKeyValue {
		return this._data;
	}

	get label(): HTMLElement {
		return this._label;
	}

	get subnodes(): HTMLElement {
		return this._nodes;
	}

	get subnodesData(): SortableTreeKeyValue[] {
		const data: SortableTreeKeyValue[] = [];
		const nodes = Array.from(this._nodes.children);

		nodes.forEach((node: SortableTreeNodeComponent) => {
			data.push(node.data);
		});

		return data;
	}

	get guid(): string {
		return this._guid;
	}

	constructor() {
		super();
		this._guid = guid();
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
		const nodes = queryParents(SortableTreeNodeComponent.TAG_NAME, this);

		nodes.forEach((node: SortableTreeNodeComponent) => {
			node.collapse(false);
		});
	}
}
