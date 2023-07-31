import { SortableTreeNodeData } from 'sortable-tree';

const nodes: SortableTreeNodeData[] = [
	{
		data: { prop: 'value', anotherProp: 'value' },
		nodes: [
			{
				data: { prop: 'value', anotherProp: 'value' },
				nodes: [
					// More nodes
				],
			},
			// More nodes
		],
	},
	// More nodes
];
