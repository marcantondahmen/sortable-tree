/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */
import { NodeComponent } from './Node';
import { SortableTreeOptions, Styles } from './types';
export default class SortableTree {
    static ICON_COLLAPSED: string;
    static ICON_OPEN: string;
    private renderLabel;
    private root;
    private nodeCollection;
    readonly lockRootLevel: boolean;
    readonly styles: Styles;
    readonly onChange: Function;
    readonly confirm: Function;
    readonly initCollapseLevel: number;
    constructor({ nodes, element, renderLabel, styles, lockRootLevel, onChange, initCollapseLevel, confirm, }: SortableTreeOptions);
    getNode(guid: string): NodeComponent;
    findNode(key: string, value: unknown): NodeComponent;
    onDrop(moved: NodeComponent, parentNode: NodeComponent): void;
    private defineElements;
    private render;
    private parseTree;
}
