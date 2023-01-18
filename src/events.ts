/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import { NodeComponent } from './Node';
import SortableTree from './SortableTree';
import { ListenerOptions } from './types';

export const registerEvents = (
	node: NodeComponent,
	tree: SortableTree
): void => {
	const eventMap = {
		dragstart: dragstartHandler,
		drop: dropHandler,
		dragover: dragoverHandler,
		dragend: dragendHandler,
	};

	for (const [eventName, handler] of Object.entries(eventMap)) {
		addListener({
			node,
			eventName,
			handler,
			tree,
		});
	}
};

const addListener = ({
	node,
	eventName,
	handler,
	tree,
}: ListenerOptions): void => {
	node.addEventListener(
		eventName,
		(event: DragEvent) => {
			handler(event, tree);
		},
		false
	);
};

enum DropType {
	BEFORE = 'BEFORE',
	INSIDE = 'INSIDE',
	AFTER = 'AFTER',
}

const getDropType = (event: DragEvent, target: NodeComponent): DropType => {
	const y = event.clientY;
	const rect = target.label.getBoundingClientRect();
	const threshold = Math.round(rect.height / 4);

	if (rect.top + threshold > y) {
		return DropType.BEFORE;
	}

	if (rect.bottom - threshold < y) {
		return DropType.AFTER;
	}

	return DropType.INSIDE;
};

const dragstartHandler = (event: DragEvent, tree: SortableTree): void => {
	event.stopPropagation();

	event.dataTransfer.setData('text', (event.target as HTMLElement).id);
	event.dataTransfer.effectAllowed = 'move';
};

const dropHandler = (event: DragEvent, tree: SortableTree): boolean => {
	event.stopPropagation();
	event.preventDefault();

	const target = (event.target as HTMLElement).closest(
		NodeComponent.TAG_NAME
	) as NodeComponent;

	if (
		tree.lockRootLevel &&
		!target.parentElement.closest(NodeComponent.TAG_NAME)
	) {
		return false;
	}

	if (!target) {
		return false;
	}

	const id = event.dataTransfer.getData('text');
	const dropType = getDropType(event, target);
	const moved = document.getElementById(id);

	if (moved.contains(target)) {
		return false;
	}

	if (dropType === DropType.BEFORE) {
		target.parentNode.insertBefore(moved, target);

		return false;
	}

	if (dropType === DropType.AFTER) {
		const next = target.nextElementSibling;

		if (next) {
			target.parentNode.insertBefore(moved, next);

			return false;
		}

		target.parentNode.appendChild(moved);

		return false;
	}

	target.subnodes.appendChild(moved);

	return false;
};

const dragoverHandler = (event: DragEvent, tree: SortableTree): void => {
	event.preventDefault();
	event.dataTransfer.dropEffect = 'move';
};

const dragendHandler = (event: DragEvent, tree: SortableTree): void => {};
