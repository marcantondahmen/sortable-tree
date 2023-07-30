import { nodes } from './nodes';
import SortableTree from 'sortable-tree';

new SortableTree({
	nodes,
	element: document.getElementById('tree-confirm'),
	stateId: 'tree-confirm',
	confirm: async (movedNode, targetParentNode) => {
		const moved = movedNode.data.title;
		const target = targetParentNode.data.title;

		return confirm(
			`Do you really want to move "${moved}" into "${target}"?`
		);
	},
});
