/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */
import { KeyValue, NodeCreationOptions } from './types';
export declare class NodeComponent extends HTMLElement {
    static TAG_NAME: string;
    static create({ data, renderLabel, styles, parent, }: NodeCreationOptions): NodeComponent;
    private collapseButton;
    private _label;
    private _nodes;
    private _guid;
    private _data;
    get data(): KeyValue;
    get label(): HTMLElement;
    get subnodes(): HTMLElement;
    get guid(): string;
    constructor();
    connectedCallback(): void;
    collapse(state: boolean): void;
    toggle(): void;
    reveal(): void;
}
