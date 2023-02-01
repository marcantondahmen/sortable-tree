/*
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import {
	defaultConfirm,
	defaultOnChange,
	defaultOnClick,
	defaultRenderLabel,
	defaultStyles,
} from './defaults';
import { registerEvents } from './events';
import { SortableTreeNodeComponent } from './SortableTreeNode';
import {
	SortableTreeConfirmFunction,
	SortableTreeDropResultData,
	SortableTreeNodeCollection,
	SortableTreeNodeData,
	SortableTreeOnChangeFunction,
	SortableTreeOnClickFunction,
	SortableTreeOptions,
	SortableTreeParsedNodeComponentData,
	SortableTreeRenderLabelFunction,
	SortableTreeStyles,
} from './types';

export class SortableTree {
	static ICON_COLLAPSED =
		'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>';

	static ICON_OPEN =
		'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>';

	private renderLabel: SortableTreeRenderLabelFunction;

	private nodeCollection: SortableTreeNodeCollection = {};

	readonly root: HTMLElement;

	readonly lockRootLevel: boolean;

	readonly disableSorting: boolean;

	readonly styles: SortableTreeStyles;

	readonly onChange: SortableTreeOnChangeFunction;

	readonly onClick: SortableTreeOnClickFunction;

	readonly confirm: SortableTreeConfirmFunction;

	readonly initCollapseLevel: number;

	constructor({
		nodes,
		element,
		renderLabel,
		styles,
		lockRootLevel,
		onChange,
		onClick,
		initCollapseLevel,
		confirm,
		disableSorting,
	}: SortableTreeOptions) {
		if (!nodes) {
			return;
		}

		if (!element) {
			console.error('Error: "element" is not a valid HTML element!');
			return;
		}

		this.defineElements();

		this.root = element;
		this.styles = Object.assign(defaultStyles, styles);
		this.renderLabel = renderLabel || defaultRenderLabel;
		this.lockRootLevel =
			typeof lockRootLevel === 'undefined' ? true : lockRootLevel;
		this.onChange = onChange || defaultOnChange;
		this.onClick = onClick || defaultOnClick;
		this.confirm = confirm || defaultConfirm;
		this.initCollapseLevel =
			typeof initCollapseLevel === 'undefined' ? 2 : initCollapseLevel;
		this.disableSorting = disableSorting || false;

		element.classList.add(this.styles.tree);

		this.render({
			nodes,
			element,
		});
	}

	getNode(guid: string): SortableTreeNodeComponent {
		return this.nodeCollection[guid];
	}

	findNode(key: string, value: unknown): SortableTreeNodeComponent {
		const nodes = Object.values(this.nodeCollection);

		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i];
			const data = node.data;

			if (key in data) {
				if (data[key] == value) {
					return node;
				}
			}
		}

		return null;
	}

	onDrop(
		movedNode: SortableTreeNodeComponent,
		srcParentNode: SortableTreeNodeComponent,
		targetParentNode: SortableTreeNodeComponent
	): void {
		const result: SortableTreeDropResultData = {
			nodes: this.parseTree(this.root),
			movedNode,
			srcParentNode,
			targetParentNode: targetParentNode,
		};

		targetParentNode.collapse(false);
		this.onChange(result);
	}

	private defineElements(): void {
		try {
			customElements.define(
				SortableTreeNodeComponent.TAG_NAME,
				SortableTreeNodeComponent
			);
		} catch {}
	}

	private render(
		{ nodes, element }: SortableTreeOptions,
		level: number = 0
	): void {
		level++;

		nodes.forEach((nodeData: SortableTreeNodeData) => {
			const node = SortableTreeNodeComponent.create({
				styles: this.styles,
				parent: element,
				renderLabel: this.renderLabel,
				data: nodeData.data,
				onClick: this.onClick,
				draggable: !this.disableSorting,
			});

			if (!this.disableSorting) {
				registerEvents(node, this);
			}

			node.collapse(level > this.initCollapseLevel);

			this.nodeCollection[node.guid] = node;

			if (nodeData.nodes) {
				this.render(
					{
						nodes: nodeData.nodes,
						element: node.subnodes,
					},
					level
				);
			}
		});
	}

	private parseTree(
		container: HTMLElement
	): SortableTreeParsedNodeComponentData[] {
		const nodes = Array.from(
			container.querySelectorAll(
				`:scope > ${SortableTreeNodeComponent.TAG_NAME}`
			)
		);
		const data: SortableTreeParsedNodeComponentData[] = [];

		nodes.forEach((node: SortableTreeNodeComponent) => {
			data.push({
				element: node,
				guid: node.guid,
				subnodes: this.parseTree(node.subnodes),
			});
		});

		return data;
	}
}
