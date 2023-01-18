/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import { registerEvents } from './events';
import { NodeComponent } from './Node';
import { NodeData, SortableTreeOptions, Styles } from './types';
import { create } from './utils';

const defaultRenderLabel = (data: NodeData): string => {
	return data.text;
};

const defaultStyles: Styles = {
	nodeHover: 'tree__node--hover',
	nodeDropBefore: 'tree__node--drop-before',
	nodeDropInside: 'tree__node--drop-inside',
	nodeDropAfter: 'tree__node--drop-after',
	label: 'tree__label',
	subnodes: 'tree__subnodes',
};

export default class SortableTree {
	private renderLabel: Function;

	readonly lockRootLevel: boolean;

	readonly styles: Styles;

	constructor({
		nodes,
		element,
		renderLabel,
		styles,
		lockRootLevel,
	}: SortableTreeOptions) {
		this.defineElements();

		this.styles = Object.assign(defaultStyles, styles);
		this.renderLabel = renderLabel || defaultRenderLabel;
		this.lockRootLevel =
			typeof lockRootLevel === 'undefined' ? true : lockRootLevel;

		this.render({
			nodes,
			element,
		});
	}

	defineElements(): void {
		try {
			customElements.define(NodeComponent.TAG_NAME, NodeComponent);
		} catch {}
	}

	render({ nodes, element }: SortableTreeOptions): void {
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
}
