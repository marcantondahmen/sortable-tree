import { nodes } from './nodes';
import SortableTree from 'sortable-tree';

new SortableTree({
	nodes,
	element: document.getElementById('tree-icons'),
	icons: {
		collapsed: '<span class="my-icon"></span>',
		open: '<span class="my-icon"></span>',
	},
	stateId: 'tree-icons',
});
