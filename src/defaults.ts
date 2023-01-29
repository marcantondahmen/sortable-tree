/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import { SortableTreeNodeComponent } from './SortableTreeNode';
import {
	SortableTreeConfirmFunction,
	SortableTreeDropResultData,
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

export const defaultOnChange: SortableTreeOnChangeFunction = ({
	nodes,
	movedNode,
	srcParentNode,
	targetParentNode,
}: SortableTreeDropResultData): void => {};

export const defaultOnClick: SortableTreeOnClickFunction = (
	event: Event,
	node: SortableTreeNodeComponent
): void => {};

export const defaultConfirm: SortableTreeConfirmFunction = async (
	movedNode: SortableTreeNodeComponent,
	targetParentNode: SortableTreeNodeComponent
): Promise<boolean> => {
	return true;
};
