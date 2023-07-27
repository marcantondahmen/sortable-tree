/*
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import { SortableTreeNodeComponent } from './SortableTreeNode';
import {
	SortableTreeConfirmFunction,
	SortableTreeDropResultData,
	SortableTreeIcons,
	SortableTreeKeyValue,
	SortableTreeOnChangeFunction,
	SortableTreeOnClickFunction,
	SortableTreeRenderLabelFunction,
	SortableTreeStyles,
} from './types';

export const defaultRenderLabel: SortableTreeRenderLabelFunction = (
	data: SortableTreeKeyValue
): string => {
	return `<span>${data.title}</span>`;
};

export const defaultIcons: SortableTreeIcons = {
	collapsed: `
		<svg
		xmlns="http://www.w3.org/2000/svg" 
		width="1em" 
		height="1em" 
		fill="currentColor" 
		class="bi bi-caret-right-fill" 
		viewBox="0 0 16 16">
			<path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
		</svg>`,
	open: `
		<svg 
		xmlns="http://www.w3.org/2000/svg" 
		width="1em" 
		height="1em" 
		fill="currentColor" 
		class="bi bi-caret-down-fill" 
		viewBox="0 0 16 16">
			<path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
		</svg>
	`,
};

export const defaultStyles: SortableTreeStyles = {
	tree: 'tree',
	node: 'tree__node',
	nodeHover: 'tree__node--hover',
	nodeDragging: 'tree__node--dragging',
	nodeDropBefore: 'tree__node--drop-before',
	nodeDropInside: 'tree__node--drop-inside',
	nodeDropAfter: 'tree__node--drop-after',
	label: 'tree__label',
	subnodes: 'tree__subnodes',
	collapse: 'tree__collapse',
};

export const defaultOnChange: SortableTreeOnChangeFunction = async ({
	nodes,
	movedNode,
	srcParentNode,
	targetParentNode,
}: SortableTreeDropResultData): Promise<void> => {};

export const defaultOnClick: SortableTreeOnClickFunction = async (
	event: Event,
	node: SortableTreeNodeComponent
): Promise<void> => {};

export const defaultConfirm: SortableTreeConfirmFunction = async (
	movedNode: SortableTreeNodeComponent,
	targetParentNode: SortableTreeNodeComponent
): Promise<boolean> => {
	return true;
};
