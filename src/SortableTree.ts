/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import { registerEvents } from './events';
import { NodeComponent } from './Node';
import {
	DropResultData,
	NodeComponentData,
	NodeData,
	SortableTreeOptions,
	Styles,
} from './types';
import { create } from './utils';

const defaultRenderLabel = (data: NodeData): string => {
	return data.text;
};

const defaultStyles: Styles = {
	tree: 'tree',
	node: 'tree__node',
	nodeHover: 'tree__node--hover',
	nodeDropBefore: 'tree__node--drop-before',
	nodeDropInside: 'tree__node--drop-inside',
	nodeDropAfter: 'tree__node--drop-after',
	label: 'tree__label',
	subnodes: 'tree__subnodes',
};

const defaultOnChange = (result: DropResultData) => {
	console.log(result);
};

export default class SortableTree {
	private renderLabel: Function;

	private root: HTMLElement;

	readonly lockRootLevel: boolean;

	readonly styles: Styles;

	readonly onChange: Function;

	constructor({
		nodes,
		element,
		renderLabel,
		styles,
		lockRootLevel,
		onChange,
	}: SortableTreeOptions) {
		this.defineElements();

		this.root = element;
		this.styles = Object.assign(defaultStyles, styles);
		this.renderLabel = renderLabel || defaultRenderLabel;
		this.lockRootLevel =
			typeof lockRootLevel === 'undefined' ? true : lockRootLevel;
		this.onChange = onChange || defaultOnChange;

		element.classList.add(this.styles.tree);

		this.render({
			nodes,
			element,
		});
	}

	private defineElements(): void {
		try {
			customElements.define(NodeComponent.TAG_NAME, NodeComponent);
		} catch {}
	}

	private render({ nodes, element }: SortableTreeOptions): void {
		nodes.forEach((data: NodeData) => {
			const node = create(
				NodeComponent.TAG_NAME,
				[this.styles.node],
				data.attributes,
				element
			);

			const label = create('div', [this.styles.label], {}, node);
			const subnodes = create('div', [this.styles.subnodes], {}, node);

			node.label = label;
			node.subnodes = subnodes;

			label.innerHTML = this.renderLabel(data);
			registerEvents(node, this);

			if (data.nodes) {
				this.render({
					nodes: data.nodes,
					element: subnodes,
				});
			}
		});
	}

	private parseTree(container: HTMLElement): NodeComponentData[] {
		const nodes = Array.from(
			container.querySelectorAll(`:scope > ${NodeComponent.TAG_NAME}`)
		);
		const data: NodeComponentData[] = [];

		nodes.forEach((node: NodeComponent) => {
			data.push({
				element: node,
				id: node.id,
				subnodes: this.parseTree(node.subnodes),
			});
		});

		return data;
	}

	onDrop(moved: NodeComponent, parent: HTMLElement): void {
		const result: DropResultData = {
			nodes: this.parseTree(this.root),
			moved,
			parent,
		};

		this.onChange(result);
	}
}
