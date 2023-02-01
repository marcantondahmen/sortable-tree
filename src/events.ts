/*
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import SortableTree from '.';
import { SortableTreeNodeComponent } from './SortableTreeNode';
import { SortableTreeListenerOptions } from './types';

export const registerEvents = (
	node: SortableTreeNodeComponent,
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
}: SortableTreeListenerOptions): void => {
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

const closestNode = (event: DragEvent): SortableTreeNodeComponent => {
	return (event.target as HTMLElement).closest(
		SortableTreeNodeComponent.TAG_NAME
	) as SortableTreeNodeComponent;
};

const parentNode = (
	node: SortableTreeNodeComponent
): SortableTreeNodeComponent => {
	const parent = node?.parentElement.parentElement;

	if (parent?.tagName.toLowerCase() !== SortableTreeNodeComponent.TAG_NAME) {
		return null;
	}

	return parent as SortableTreeNodeComponent;
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

	const node = event.target as SortableTreeNodeComponent;

	if (node.tagName.toLowerCase() !== SortableTreeNodeComponent.TAG_NAME) {
		return;
	}

	event.dataTransfer.setData('text', node.guid);
	event.dataTransfer.effectAllowed = 'move';

	node.classList.add(tree.styles.nodeDragging);
};

const dropHandler = async (
	event: DragEvent,
	tree: SortableTree
): Promise<boolean> => {
	event.stopPropagation();
	event.preventDefault();

	removeStyles(event, tree);

	const targetNode = closestNode(event);

	if (!targetNode) {
		return false;
	}

	const targetParentNode = parentNode(targetNode);
	const guid = event.dataTransfer.getData('text');
	const dropType = calculateDropType(event);
	const movedNode = tree.getNode(guid);

	if (!movedNode || movedNode?.contains(targetNode)) {
		return false;
	}

	const srcParentNode = parentNode(movedNode);

	if (
		tree.lockRootLevel &&
		!targetNode?.parentElement.closest(
			SortableTreeNodeComponent.TAG_NAME
		) &&
		(dropType === DropType.BEFORE || dropType === DropType.AFTER)
	) {
		return false;
	}

	if (dropType === DropType.BEFORE) {
		if (!(await tree.confirm(movedNode, targetParentNode))) {
			return false;
		}

		targetNode.parentNode.insertBefore(movedNode, targetNode);
		tree.onDrop(movedNode, srcParentNode, targetParentNode);

		return false;
	}

	if (dropType === DropType.AFTER) {
		if (!(await tree.confirm(movedNode, targetParentNode))) {
			return false;
		}

		const next = targetNode.nextElementSibling;

		if (next) {
			targetNode.parentNode.insertBefore(movedNode, next);
			tree.onDrop(movedNode, srcParentNode, targetParentNode);
		} else {
			targetNode.parentNode.appendChild(movedNode);
			tree.onDrop(movedNode, srcParentNode, targetParentNode);
		}

		return false;
	}

	if (!(await tree.confirm(movedNode, targetNode))) {
		return false;
	}

	targetNode.subnodes.appendChild(movedNode);
	tree.onDrop(movedNode, srcParentNode, targetNode);

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
	const node = event.target as SortableTreeNodeComponent;

	node.classList.remove(tree.styles.nodeDragging);
	removeStyles(event, tree);
};
