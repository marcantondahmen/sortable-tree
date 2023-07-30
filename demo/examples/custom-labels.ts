import { nodes } from './nodes';
import SortableTree from 'sortable-tree';

new SortableTree({
	nodes,
	element: document.getElementById('tree-labels'),
	stateId: 'tree-labels',
	// Note that data object that is passed to the render function
	// must have the same shape as the data field in the nodes dataset
	// defined above.
	renderLabel: ({ title, path }) => {
		return `
			<span>
				<span>⌘ ${title}</span>
				<span>↕</span>
			</span>
		`;
	},
});
