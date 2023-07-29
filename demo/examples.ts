import SortableTree, { SortableTreeNodeData } from '../src';

/**
 * Example node data.
 */
const nodes: SortableTreeNodeData[] = [
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

/**
 * Basic configuration.
 */
new SortableTree({
	nodes,
	element: document.getElementById('tree-basic'),
	stateId: 'tree-basic',
});

/**
 * Custom labels.
 */
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

/**
 * Custom icons.
 */
new SortableTree({
	nodes,
	element: document.getElementById('tree-icons'),
	icons: {
		collapsed: '',
		open: '',
	},
	stateId: 'tree-icons',
});

/**
 * Confirmation dialog.
 */
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

/**
 * Change events handling.
 */
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

/**
 * Click event handling.
 */
new SortableTree({
	nodes,
	element: document.getElementById('tree-onclick'),
	stateId: 'tree-onclick',
	onClick: async (event, node) => {
		alert(`You clicked on "${node.data.title}".`);
	},
});

/**
 * Finding and revealing nodes.
 */
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

/**
 * Disable sorting.
 */
new SortableTree({
	nodes,
	element: document.getElementById('tree-no-sort'),
	stateId: 'tree-no-sort',
	initCollapseLevel: 1,
	disableSorting: true,
	onClick: async (event, node) => {
		alert(`You clicked on "${node.data.title}".`);
	},
});

/**
 * Unlocking root.
 */
new SortableTree({
	nodes,
	element: document.getElementById('tree-unlock-root'),
	lockRootLevel: false,
	stateId: 'tree-unlock-root',
});

/**
 * No theme.
 */
new SortableTree({
	nodes,
	element: document.getElementById('tree-unstyled'),
	stateId: 'tree-unstyled',
	initCollapseLevel: 4,
	styles: {
		tree: 'my-tree',
		node: 'my-tree__node',
		label: 'my-tree__label',
		subnodes: 'my-tree__subnodes',
		collapse: 'my-tree__collapse',
	},
});
