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
    readonly confirm: Function;
    readonly initCollapseLevel: number;
    iconShowSubnodes: string;
    iconHideSubnodes: string;
    constructor({ nodes, element, renderLabel, styles, lockRootLevel, onChange, initCollapseLevel, confirm, }: SortableTreeOptions);
    private defineElements;
    private render;
    private toggleCollapseButton;
    private parseTree;
    onDrop(moved: NodeComponent, parentNode: NodeComponent): void;
}
