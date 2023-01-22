/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import { SortableTree, SortableTreeNodeComponent } from '.';

export interface SortableTreeKeyValue {
	[key: string]: unknown;
}

export interface SortableTreeNodeData {
	data: SortableTreeKeyValue;
	nodes: SortableTreeNodeData[];
}

export interface SortableTreeNodeCollection {
	[key: string]: SortableTreeNodeComponent;
}

export interface SortableTreeNodeCreationOptions {
	styles: SortableTreeStyles;
	renderLabel: Function;
	data: SortableTreeKeyValue;
	parent: HTMLElement;
	onClick: Function;
}

export type SortableTreeRenderLabelFunction = (
	data: SortableTreeKeyValue
) => string;

export type SortableTreeOnChangeFunction = ({
	nodes,
	movedNode,
	srcParentNode,
	targetParentNode,
}: SortableTreeDropResultData) => void;

export type SortableTreeOnClickFunction = (
	event: Event,
	node: SortableTreeNodeComponent
) => void;

export type SortableTreeConfirmFunction = (
	movedNode: SortableTreeNodeComponent,
	targetParentNode: SortableTreeNodeComponent
) => Promise<boolean>;

export interface SortableTreeOptions {
	nodes: SortableTreeNodeData[];
	element: HTMLElement;
	renderLabel?: SortableTreeRenderLabelFunction;
	styles?: SortableTreeStyles;
	lockRootLevel?: boolean;
	onChange?: SortableTreeOnChangeFunction;
	onClick?: SortableTreeOnClickFunction;
	initCollapseLevel?: number;
	confirm?: SortableTreeConfirmFunction;
}

export interface SortableTreeStyles {
	tree?: string;
	node?: string;
	nodeHover?: string;
	nodeDragging?: string;
	nodeDropBefore?: string;
	nodeDropInside?: string;
	nodeDropAfter?: string;
	label?: string;
	subnodes?: string;
	collapse?: string;
}

export interface SortableTreeListenerOptions {
	node: SortableTreeNodeComponent;
	eventName: string;
	handler: Function;
	tree: SortableTree;
}

export interface SortableTreeParsedNodeComponentData {
	guid: string;
	element: SortableTreeNodeComponent;
	subnodes: SortableTreeParsedNodeComponentData[];
}

export interface SortableTreeDropResultData {
	nodes: SortableTreeParsedNodeComponentData[];
	movedNode: SortableTreeNodeComponent;
	targetParentNode: SortableTreeNodeComponent;
	srcParentNode: SortableTreeNodeComponent;
}
