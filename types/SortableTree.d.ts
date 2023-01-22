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
    private nodeCollection;
    readonly root: HTMLElement;
    readonly lockRootLevel: boolean;
    readonly styles: Styles;
    readonly onChange: Function;
    readonly onClick: Function;
    readonly confirm: Function;
    readonly initCollapseLevel: number;
    constructor({ nodes, element, renderLabel, styles, lockRootLevel, onChange, onClick, initCollapseLevel, confirm, }: SortableTreeOptions);
    getNode(guid: string): NodeComponent;
    findNode(key: string, value: unknown): NodeComponent;
    onDrop(movedNode: NodeComponent, srcParentNode: NodeComponent, targetParentNode: NodeComponent): void;
    private defineElements;
    private render;
    private parseTree;
}
