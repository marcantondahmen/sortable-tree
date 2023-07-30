import { nodes } from './nodes';
import SortableTree from 'sortable-tree';

new SortableTree({
	nodes,
	element: document.getElementById('tree-unlock-root'),
	lockRootLevel: false,
	stateId: 'tree-unlock-root',
});
