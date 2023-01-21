/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import {
	defaultConfirm,
	defaultOnChange,
	defaultRenderLabel,
	defaultStyles,
} from './defaults';
import { registerEvents } from './events';
import { NodeComponent } from './Node';
import {
	DropResultData,
	NodeCollection,
	ParsedNodeComponentData,
	NodeData,
	SortableTreeOptions,
	Styles,
} from './types';

export default class SortableTree {
	static ICON_COLLAPSED =
		'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>';

	static ICON_OPEN =
		'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>';

	private renderLabel: Function;

	private root: HTMLElement;

	private nodeCollection: NodeCollection = {};

	readonly lockRootLevel: boolean;

	readonly styles: Styles;

	readonly onChange: Function;

	readonly confirm: Function;

	readonly initCollapseLevel: number;

	constructor({
		nodes,
		element,
		renderLabel,
		styles,
		lockRootLevel,
		onChange,
		initCollapseLevel,
		confirm,
	}: SortableTreeOptions) {
		this.defineElements();

		this.root = element;
		this.styles = Object.assign(defaultStyles, styles);
		this.renderLabel = renderLabel || defaultRenderLabel;
		this.lockRootLevel =
			typeof lockRootLevel === 'undefined' ? true : lockRootLevel;
		this.onChange = onChange || defaultOnChange;
		this.confirm = confirm || defaultConfirm;
		this.initCollapseLevel =
			typeof initCollapseLevel === 'undefined' ? 2 : initCollapseLevel;

		element.classList.add(this.styles.tree);

		this.render({
			nodes,
			element,
		});
	}

	getNode(guid: string): NodeComponent {
		return this.nodeCollection[guid];
	}

	findNode(key: string, value: unknown): NodeComponent {
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

	onDrop(moved: NodeComponent, parentNode: NodeComponent): void {
		const result: DropResultData = {
			nodes: this.parseTree(this.root),
			moved,
			parentNode,
		};

		parentNode.collapse(false);
		this.onChange(result);
	}

	private defineElements(): void {
		try {
			customElements.define(NodeComponent.TAG_NAME, NodeComponent);
		} catch {}
	}

	private render(
		{ nodes, element }: SortableTreeOptions,
		level: number = 0
	): void {
		level++;

		nodes.forEach((nodeData: NodeData) => {
			const node = NodeComponent.create({
				styles: this.styles,
				parent: element,
				renderLabel: this.renderLabel,
				data: nodeData.data,
			});

			registerEvents(node, this);
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

	private parseTree(container: HTMLElement): ParsedNodeComponentData[] {
		const nodes = Array.from(
			container.querySelectorAll(`:scope > ${NodeComponent.TAG_NAME}`)
		);
		const data: ParsedNodeComponentData[] = [];

		nodes.forEach((node: NodeComponent) => {
			data.push({
				element: node,
				guid: node.guid,
				subnodes: this.parseTree(node.subnodes),
			});
		});

		return data;
	}
}
