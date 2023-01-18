/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import { NodeData, SortableTreeOptions } from './types';
import { create } from './utils';

const defaultRenderLabel = (data: NodeData): string => {
	return data.text;
};

export default class SortableTree {
	constructor({ nodes, element, renderLabel }: SortableTreeOptions) {
		this.render({
			nodes,
			element,
			renderLabel: renderLabel || defaultRenderLabel,
		});
	}

	render({ nodes, element, renderLabel }: SortableTreeOptions) {
		nodes.forEach((data: NodeData) => {
			const node = create('div', ['tree__node'], {}, element);
			const label = create(
				'div',
				['tree__label'],
				Object.assign(data.attributes, { draggable: 'true' }),
				node
			);
			const subnodes = create('div', ['tree__subnodes'], {}, node);

			label.innerHTML = renderLabel(data);

			if (data.nodes) {
				this.render({
					nodes: data.nodes,
					element: subnodes,
					renderLabel,
				});
			}
		});
	}
}
