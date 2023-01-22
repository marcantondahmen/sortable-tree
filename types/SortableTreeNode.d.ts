/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */
import { SortableTreeKeyValue, SortableTreeNodeCreationOptions } from '.';
export declare class SortableTreeNodeComponent extends HTMLElement {
    static TAG_NAME: string;
    static create({ data, renderLabel, styles, parent, onClick, }: SortableTreeNodeCreationOptions): SortableTreeNodeComponent;
    private collapseButton;
    private _label;
    private _nodes;
    private _guid;
    private _data;
    get data(): SortableTreeKeyValue;
    get label(): HTMLElement;
    get subnodes(): HTMLElement;
    get guid(): string;
    constructor();
    connectedCallback(): void;
    collapse(state: boolean): void;
    toggle(): void;
    reveal(): void;
}
