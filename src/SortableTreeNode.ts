/*
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import {
	SortableTreeIcons,
	SortableTreeKeyValue,
	SortableTreeNodeCreationOptions,
} from './types';
import { create, id, queryParents } from './utils';

export class SortableTreeNodeComponent extends HTMLElement {
	static TAG_NAME = 'sortable-tree-node';

	static create({
		data,
		renderLabel,
		icons,
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
		collapseButton.innerHTML = icons.collapsed;
		collapseButton.addEventListener('click', node.toggle.bind(node));
		label.addEventListener('click', (event: Event) => {
			onClick(event, node);
		});

		if (draggable) {
			node.setAttribute('draggable', 'true');
		}

		node._data = data;
		node._icons = icons;
		node._label = label;
		node._nodes = subnodes;
		node._collapseButton = collapseButton;

		return node;
	}

	private _collapseButton: HTMLElement;

	private _icons: SortableTreeIcons;

	private _label: HTMLElement;

	private _nodes: HTMLElement;

	private _id: string;

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

	get id(): string {
		return this._id;
	}

	constructor() {
		super();
		this._id = id();
	}

	collapse(state: boolean): void {
		if (state) {
			this.removeAttribute('open');
			this._collapseButton.innerHTML = this._icons.collapsed;
		} else {
			this.setAttribute('open', 'true');
			this._collapseButton.innerHTML = this._icons.open;
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
