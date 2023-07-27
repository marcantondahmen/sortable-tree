/*
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import {
	defaultConfirm,
	defaultIcons,
	defaultOnChange,
	defaultOnClick,
	defaultRenderLabel,
	defaultStyles,
} from './defaults';
import { registerEvents } from './events';
import { SortableTreeNodeComponent } from './SortableTreeNode';
import { applyState, saveState } from './state';
import {
	SortableTreeConfirmFunction,
	SortableTreeDropResultData,
	SortableTreeIcons,
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
	private renderLabel: SortableTreeRenderLabelFunction;

	private nodeCollection: SortableTreeNodeCollection = {};

	private observer: MutationObserver;

	readonly root: HTMLElement;

	readonly lockRootLevel: boolean;

	readonly disableSorting: boolean;

	readonly icons: SortableTreeIcons;

	readonly styles: SortableTreeStyles;

	readonly onChange: SortableTreeOnChangeFunction;

	readonly onClick: SortableTreeOnClickFunction;

	readonly confirm: SortableTreeConfirmFunction;

	readonly initCollapseLevel: number;

	constructor({
		nodes,
		element,
		renderLabel,
		icons,
		styles,
		lockRootLevel,
		onChange,
		onClick,
		initCollapseLevel,
		confirm,
		disableSorting,
		stateId,
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
		this.icons = { ...defaultIcons, ...icons };
		this.styles = { ...defaultStyles, ...styles };
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

		if (stateId) {
			applyState(stateId, this.parseTree(this.root));

			this.initStateObserver(stateId);
		}
	}

	getNode(id: string): SortableTreeNodeComponent {
		return this.nodeCollection[id];
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

	destroy(): void {
		this.observer.disconnect();
		this.observer = null;
	}

	initStateObserver(stateId: string): void {
		const observerOptions = {
			childList: true,
			attributes: true,
			subtree: true,
		};

		const observer = new MutationObserver(() => {
			saveState(stateId, this.parseTree(this.root));
		});

		observer.observe(this.root, observerOptions);
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
				icons: this.icons,
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

			this.nodeCollection[node.id] = node;

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
				id: node.id,
				subnodes: this.parseTree(node.subnodes),
			});
		});

		return data;
	}
}
