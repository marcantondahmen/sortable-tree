import { nodes } from './nodes';
import SortableTree from 'sortable-tree';

new SortableTree({
	nodes,
	element: document.getElementById('tree-unstyled'),
	stateId: 'tree-unstyled',
	initCollapseLevel: 4,
	styles: {
		tree: 'my-tree',
		node: 'my-tree__node',
		label: 'my-tree__label',
		subnodes: 'my-tree__subnodes',
		collapse: 'my-tree__collapse',
	},
});
