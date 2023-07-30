import { nodes } from './nodes';
import SortableTree from 'sortable-tree';

new SortableTree({
	nodes,
	element: document.getElementById('tree-no-sort'),
	stateId: 'tree-no-sort',
	initCollapseLevel: 1,
	disableSorting: true,
	onClick: async (event, node) => {
		alert(`You clicked on "${node.data.title}".`);
	},
});
