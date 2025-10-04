/*
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import SortableTree from '.';
import { SortableTreeEventBus } from './SortableTreeEventBus';
import { SortableTreeNodeComponent } from './SortableTreeNode';

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
	icons: SortableTreeIcons;
	styles: SortableTreeStyles;
	renderLabel: Function;
	data: SortableTreeKeyValue;
	parent: HTMLElement;
	onClick: Function;
	draggable: boolean;
	eventBus: SortableTreeEventBus;
}

export type SortableTreeRenderLabelFunction = (
	data: SortableTreeKeyValue
) => string;

export type SortableTreeOnChangeFunction = ({
	nodes,
	movedNode,
	srcParentNode,
	targetParentNode,
}: SortableTreeDropResultData) => Promise<void>;

export type SortableTreeOnClickFunction = (
	event: Event,
	node: SortableTreeNodeComponent
) => Promise<void>;

export type SortableTreeConfirmFunction = (
	movedNode: SortableTreeNodeComponent,
	targetParentNode: SortableTreeNodeComponent
) => Promise<boolean>;

export interface SortableTreeOptions {
	nodes: SortableTreeNodeData[];
	element: HTMLElement;
	renderLabel?: SortableTreeRenderLabelFunction;
	icons?: SortableTreeIcons;
	styles?: SortableTreeStyles;
	lockRootLevel?: boolean;
	onChange?: SortableTreeOnChangeFunction;
	onClick?: SortableTreeOnClickFunction;
	initCollapseLevel?: number;
	confirm?: SortableTreeConfirmFunction;
	disableSorting?: boolean;
	stateId?: string;
}

export interface SortableTreeIcons {
	collapsed?: string;
	open?: string;
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

export type SortableTreeEventHandler = (event: Event) => void;

export interface SortableTreeListener {
	element: HTMLElement;
	eventName: string;
	handler: SortableTreeEventHandler;
}

export interface SortableTreeParsedNodeComponentData {
	id: string;
	element: SortableTreeNodeComponent;
	subnodes: SortableTreeParsedNodeComponentData[];
}

export interface SortableTreeDropResultData {
	nodes: SortableTreeParsedNodeComponentData[];
	movedNode: SortableTreeNodeComponent;
	targetParentNode: SortableTreeNodeComponent;
	srcParentNode: SortableTreeNodeComponent;
}

export type SortableTreeState = [0 | 1, SortableTreeState[]];
