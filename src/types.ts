/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

export interface NodeData {
	text: string;
	attributes: object;
	nodes: NodeData[];
}

export interface SortableTreeOptions {
	nodes: NodeData[];
	element: HTMLElement;
	renderLabel?: Function;
}
