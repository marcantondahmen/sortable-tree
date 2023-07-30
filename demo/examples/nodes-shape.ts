import { SortableTreeNodeData } from 'sortable-tree';

const nodes: SortableTreeNodeData[] = [
	{
		data: {
			title: 'Homepage',
			path: '/',
		},
		nodes: [
			{
				data: {
					title: 'Page',
					path: '/page',
				},
				nodes: [
					// { ... }, { ... }
				],
			},
			// { ... }, { ... }
		],
	},
];
