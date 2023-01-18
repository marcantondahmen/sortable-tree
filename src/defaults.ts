/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import { NodeComponent } from './Node';
import { DropResultData, NodeData, Styles } from './types';

export const defaultRenderLabel = (data: NodeData): string => {
	return data.text;
};

export const defaultStyles: Styles = {
	tree: 'tree',
	node: 'tree__node',
	nodeHover: 'tree__node--hover',
	nodeDropBefore: 'tree__node--drop-before',
	nodeDropInside: 'tree__node--drop-inside',
	nodeDropAfter: 'tree__node--drop-after',
	label: 'tree__label',
	subnodes: 'tree__subnodes',
	collapseButton: 'tree__collapse',
};

export const defaultOnChange = (result: DropResultData): void => {};

export const defaultConfirm = (
	moved: NodeComponent,
	parentNode: NodeComponent
): boolean => {
	return true;
};
