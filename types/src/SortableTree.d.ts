/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */
import { SortableTreeNodeComponent, SortableTreeOptions, SortableTreeStyles, SortableTreeOnChangeFunction, SortableTreeOnClickFunction, SortableTreeConfirmFunction } from '.';
export declare class SortableTree {
    static ICON_COLLAPSED: string;
    static ICON_OPEN: string;
    private renderLabel;
    private nodeCollection;
    readonly root: HTMLElement;
    readonly lockRootLevel: boolean;
    readonly disableSorting: boolean;
    readonly styles: SortableTreeStyles;
    readonly onChange: SortableTreeOnChangeFunction;
    readonly onClick: SortableTreeOnClickFunction;
    readonly confirm: SortableTreeConfirmFunction;
    readonly initCollapseLevel: number;
    constructor({ nodes, element, renderLabel, styles, lockRootLevel, onChange, onClick, initCollapseLevel, confirm, disableSorting, }: SortableTreeOptions);
    getNode(guid: string): SortableTreeNodeComponent;
    findNode(key: string, value: unknown): SortableTreeNodeComponent;
    onDrop(movedNode: SortableTreeNodeComponent, srcParentNode: SortableTreeNodeComponent, targetParentNode: SortableTreeNodeComponent): void;
    private defineElements;
    private render;
    private parseTree;
}
