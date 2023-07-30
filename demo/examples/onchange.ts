import { nodes } from './nodes';
import SortableTree from 'sortable-tree';

new SortableTree({
	nodes,
	element: document.getElementById('tree-onchange'),
	stateId: 'tree-onchange',
	onChange: async ({ nodes, movedNode, srcParentNode, targetParentNode }) => {
		alert("Check out the browser's console to see the updated node data.");

		console.log({
			nodes,
			movedNode,
			srcParentNode,
			targetParentNode,
		});
	},
});
