import { nodes } from './nodes';
import SortableTree from 'sortable-tree';

new SortableTree({
	nodes,
	element: document.getElementById('tree-onclick'),
	stateId: 'tree-onclick',
	onClick: async (event, node) => {
		alert(`You clicked on "${node.data.title}".`);
	},
});
