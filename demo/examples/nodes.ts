import SortableTree, { SortableTreeNodeData } from 'sortable-tree';

export const nodes: SortableTreeNodeData[] = [
	{
		data: { title: 'Homepage', path: '/' },
		nodes: [
			{
				data: {
					title: 'Page Number One',
					path: '/number-one',
				},
				nodes: [
					{
						data: {
							title: 'Subpage',
							path: '/number-one/subpage',
						},
						nodes: [],
					},
					{
						data: {
							title: 'Another Subpage',
							path: '/number-one/another',
						},
						nodes: [
							{
								data: {
									title: 'Deep Nested Page',
									path: '/number-one/another/deep-nested',
								},
								nodes: [],
							},
						],
					},
				],
			},
			{
				data: { title: 'Page Two', path: '/page-two' },
				nodes: [],
			},
			{
				data: { title: 'Third Page', path: '/third-page' },
				nodes: [],
			},
		],
	},
];
