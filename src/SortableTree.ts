/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import { registerEvents } from './events';
import { NodeComponent } from './Node';
import {
	DropResultData,
	NodeComponentData,
	NodeData,
	SortableTreeOptions,
	Styles,
} from './types';
import { create } from './utils';

const defaultRenderLabel = (data: NodeData): string => {
	return data.text;
};

const defaultStyles: Styles = {
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

const defaultOnChange = (result: DropResultData): void => {};

export default class SortableTree {
	private renderLabel: Function;

	private root: HTMLElement;

	readonly lockRootLevel: boolean;

	readonly styles: Styles;

	readonly onChange: Function;

	readonly initCollapseLevel: number;

	iconShowSubnodes =
		'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16"><path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/></svg>';

	iconHideSubnodes =
		'<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-caret-down-fill" viewBox="0 0 16 16"><path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/></svg>';

	constructor({
		nodes,
		element,
		renderLabel,
		styles,
		lockRootLevel,
		onChange,
		initCollapseLevel,
	}: SortableTreeOptions) {
		this.defineElements();

		this.root = element;
		this.styles = Object.assign(defaultStyles, styles);
		this.renderLabel = renderLabel || defaultRenderLabel;
		this.lockRootLevel =
			typeof lockRootLevel === 'undefined' ? true : lockRootLevel;
		this.onChange = onChange || defaultOnChange;
		this.initCollapseLevel =
			typeof initCollapseLevel === 'undefined' ? 2 : initCollapseLevel;

		element.classList.add(this.styles.tree);

		this.render({
			nodes,
			element,
		});
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

		nodes.forEach((data: NodeData) => {
			const node = create(
				NodeComponent.TAG_NAME,
				[this.styles.node],
				data.attributes,
				element
			);

			const label = create('div', [this.styles.label], {}, node);
			const subnodes = create('div', [this.styles.subnodes], {}, node);
			const collapseButton = create(
				'span',
				[this.styles.collapseButton],
				{},
				node
			);

			this.toggleCollapseButton(
				node,
				collapseButton,
				level > this.initCollapseLevel
			);

			collapseButton.addEventListener('click', () => {
				this.toggleCollapseButton(
					node,
					collapseButton,
					node.hasAttribute('open')
				);
			});

			node.label = label;
			node.subnodes = subnodes;

			label.innerHTML = this.renderLabel(data);
			registerEvents(node, this);

			if (data.nodes) {
				this.render(
					{
						nodes: data.nodes,
						element: subnodes,
					},
					level
				);
			}
		});
	}

	private toggleCollapseButton(
		node: NodeComponent,
		button: HTMLElement,
		state: boolean
	): void {
		if (state) {
			node.removeAttribute('open');
			button.innerHTML = this.iconShowSubnodes;
		} else {
			node.setAttribute('open', 'true');
			button.innerHTML = this.iconHideSubnodes;
		}
	}

	private parseTree(container: HTMLElement): NodeComponentData[] {
		const nodes = Array.from(
			container.querySelectorAll(`:scope > ${NodeComponent.TAG_NAME}`)
		);
		const data: NodeComponentData[] = [];

		nodes.forEach((node: NodeComponent) => {
			data.push({
				element: node,
				id: node.id,
				subnodes: this.parseTree(node.subnodes),
			});
		});

		return data;
	}

	onDrop(moved: NodeComponent, parentNode: NodeComponent): void {
		const result: DropResultData = {
			nodes: this.parseTree(this.root),
			moved,
			parentNode,
		};
		const button = parentNode.querySelector(
			`:scope > .${this.styles.collapseButton}`
		) as HTMLElement;

		this.toggleCollapseButton(parentNode, button, false);
		this.onChange(result);
	}
}
