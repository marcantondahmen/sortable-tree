import { nodes } from './nodes';
import SortableTree from 'sortable-tree';

new SortableTree({
	nodes,
	element: document.getElementById('tree-icons'),
	icons: {
		collapsed: '',
		open: '',
	},
	stateId: 'tree-icons',
});
