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
		dragleave: dragleaveHandler,
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

const getDropType = (event: DragEvent): DropType => {
	const y = event.clientY;
	const target = getNode(event);
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

const getNode = (event: DragEvent): NodeComponent => {
	return (event.target as HTMLElement).closest(
		NodeComponent.TAG_NAME
	) as NodeComponent;
};

const toggleStyles = (event: DragEvent, tree: SortableTree): void => {
	const target = getNode(event);
	const dropType = getDropType(event);

	target.classList.toggle(
		tree.styles.nodeDropBefore,
		dropType === DropType.BEFORE
	);

	target.classList.toggle(
		tree.styles.nodeDropInside,
		dropType === DropType.INSIDE
	);

	target.classList.toggle(
		tree.styles.nodeDropAfter,
		dropType === DropType.AFTER
	);
};

const removeStyles = (event: DragEvent, tree: SortableTree): void => {
	const target = getNode(event);

	target.classList.remove(
		tree.styles.nodeDropAfter,
		tree.styles.nodeDropBefore,
		tree.styles.nodeDropInside
	);
};

const dragstartHandler = (event: DragEvent, tree: SortableTree): void => {
	event.stopPropagation();

	event.dataTransfer.setData('text', (event.target as HTMLElement).id);
	event.dataTransfer.effectAllowed = 'move';
};

const dropHandler = (event: DragEvent, tree: SortableTree): boolean => {
	event.stopPropagation();
	event.preventDefault();

	removeStyles(event, tree);

	const target = getNode(event);

	if (!target) {
		return false;
	}

	const parentNode = target.parentElement.parentElement as NodeComponent;
	const id = event.dataTransfer.getData('text');
	const dropType = getDropType(event);
	const moved = document.getElementById(id) as NodeComponent;

	if (moved.contains(target)) {
		return false;
	}

	if (
		tree.lockRootLevel &&
		!target.parentElement.closest(NodeComponent.TAG_NAME) &&
		(dropType === DropType.BEFORE || dropType === DropType.AFTER)
	) {
		return false;
	}

	if (dropType === DropType.BEFORE) {
		target.parentNode.insertBefore(moved, target);
		tree.onDrop(moved, parentNode);

		return false;
	}

	if (dropType === DropType.AFTER) {
		const next = target.nextElementSibling;

		if (next) {
			target.parentNode.insertBefore(moved, next);
			tree.onDrop(moved, parentNode);
		} else {
			target.parentNode.appendChild(moved);
			tree.onDrop(moved, parentNode);
		}

		return false;
	}

	target.subnodes.appendChild(moved);
	tree.onDrop(moved, target);

	return false;
};

const dragoverHandler = (event: DragEvent, tree: SortableTree): void => {
	event.preventDefault();
	event.dataTransfer.dropEffect = 'move';

	toggleStyles(event, tree);
};

const dragleaveHandler = (event: DragEvent, tree: SortableTree): void => {
	removeStyles(event, tree);
};

const dragendHandler = (event: DragEvent, tree: SortableTree): void => {
	removeStyles(event, tree);
};
