/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */
import { NodeComponent } from './Node';
import { SortableTreeOptions, Styles } from './types';
export default class SortableTree {
    private renderLabel;
    private root;
    readonly lockRootLevel: boolean;
    readonly styles: Styles;
    readonly onChange: Function;
    constructor({ nodes, element, renderLabel, styles, lockRootLevel, onChange, }: SortableTreeOptions);
    private defineElements;
    private render;
    private parseTree;
    onDrop(moved: NodeComponent, parent: HTMLElement): void;
}
