import { nodes } from './nodes';
import SortableTree from 'sortable-tree';

const button = document.getElementById('reveal-button');
const tree = new SortableTree({
	nodes,
	element: document.getElementById('tree-find'),
	stateId: 'tree-find',
	initCollapseLevel: 1,
});

button.addEventListener('click', (event) => {
	event.preventDefault();
	const node = tree.findNode('title', 'Deep Nested Page');
	node.reveal();
});
