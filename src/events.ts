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

const calculateDropType = (event: DragEvent): DropType => {
	const y = event.clientY;
	const node = closestNode(event);
	const rect = node.label.getBoundingClientRect();
	const threshold = Math.round(rect.height / 4);

	if (rect.top + threshold > y) {
		return DropType.BEFORE;
	}

	if (rect.bottom - threshold < y) {
		return DropType.AFTER;
	}

	return DropType.INSIDE;
};

const closestNode = (event: DragEvent): NodeComponent => {
	return (event.target as HTMLElement).closest(
		NodeComponent.TAG_NAME
	) as NodeComponent;
};

const toggleStyles = (event: DragEvent, tree: SortableTree): void => {
	const target = closestNode(event);
	const dropType = calculateDropType(event);

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
	const target = closestNode(event);

	target.classList.remove(
		tree.styles.nodeDropAfter,
		tree.styles.nodeDropBefore,
		tree.styles.nodeDropInside
	);
};

const dragstartHandler = (event: DragEvent, tree: SortableTree): void => {
	event.stopPropagation();

	const node = event.target as NodeComponent;

	if (node.tagName.toLowerCase() !== NodeComponent.TAG_NAME) {
		return;
	}

	event.dataTransfer.setData('text', node.guid);
	event.dataTransfer.effectAllowed = 'move';

	node.classList.add(tree.styles.nodeDragging);
};

const dropHandler = (event: DragEvent, tree: SortableTree): boolean => {
	event.stopPropagation();
	event.preventDefault();

	removeStyles(event, tree);

	const node = closestNode(event);

	if (!node) {
		return false;
	}

	const parentNode = node.parentElement.parentElement as NodeComponent;
	const guid = event.dataTransfer.getData('text');
	const dropType = calculateDropType(event);
	const moved = tree.getNode(guid);

	if (moved.contains(node)) {
		return false;
	}

	if (
		tree.lockRootLevel &&
		!node.parentElement.closest(NodeComponent.TAG_NAME) &&
		(dropType === DropType.BEFORE || dropType === DropType.AFTER)
	) {
		return false;
	}

	if (!tree.confirm(moved, parentNode)) {
		return false;
	}

	if (dropType === DropType.BEFORE) {
		node.parentNode.insertBefore(moved, node);
		tree.onDrop(moved, parentNode);

		return false;
	}

	if (dropType === DropType.AFTER) {
		const next = node.nextElementSibling;

		if (next) {
			node.parentNode.insertBefore(moved, next);
			tree.onDrop(moved, parentNode);
		} else {
			node.parentNode.appendChild(moved);
			tree.onDrop(moved, parentNode);
		}

		return false;
	}

	node.subnodes.appendChild(moved);
	tree.onDrop(moved, node);

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
	const node = event.target as NodeComponent;

	node.classList.remove(tree.styles.nodeDragging);
	removeStyles(event, tree);
};
