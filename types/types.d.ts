/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */
import { NodeComponent } from './Node';
import SortableTree from './SortableTree';
export interface KeyValue {
    [key: string]: unknown;
}
export interface NodeData {
    data: KeyValue;
    nodes: NodeData[];
}
export interface NodeCollection {
    [key: string]: NodeComponent;
}
export interface NodeCreationOptions {
    styles: Styles;
    renderLabel: Function;
    data: KeyValue;
    parent: HTMLElement;
    onClick: Function;
}
export interface SortableTreeOptions {
    nodes: NodeData[];
    element: HTMLElement;
    renderLabel?: Function;
    styles?: Styles;
    lockRootLevel?: boolean;
    onChange?: Function;
    onClick?: Function;
    initCollapseLevel?: number;
    confirm?: Function;
}
export interface Styles {
    tree?: string;
    node?: string;
    nodeHover?: string;
    nodeDragging?: string;
    nodeDropBefore?: string;
    nodeDropInside?: string;
    nodeDropAfter?: string;
    label?: string;
    subnodes?: string;
    collapse?: string;
}
export interface ListenerOptions {
    node: NodeComponent;
    eventName: string;
    handler: Function;
    tree: SortableTree;
}
export interface ParsedNodeComponentData {
    guid: string;
    element: NodeComponent;
    subnodes: ParsedNodeComponentData[];
}
export interface DropResultData {
    nodes: ParsedNodeComponentData[];
    movedNode: NodeComponent;
    targetParentNode: NodeComponent;
    srcParentNode: NodeComponent;
}
