/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */
export declare class NodeComponent extends HTMLElement {
    static TAG_NAME: string;
    private _label;
    private _nodes;
    set label(element: HTMLElement);
    get label(): HTMLElement;
    set subnodes(element: HTMLElement);
    get subnodes(): HTMLElement;
    constructor();
    connectedCallback(): void;
}
