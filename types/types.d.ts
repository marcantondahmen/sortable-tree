/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */
import { NodeComponent } from './Node';
import SortableTree from './SortableTree';
interface Attributes {
    [key: string]: string;
}
export interface NodeData {
    text: string;
    attributes: Attributes;
    nodes: NodeData[];
}
export interface SortableTreeOptions {
    nodes: NodeData[];
    element: HTMLElement;
    renderLabel?: Function;
    styles?: Styles;
    lockRootLevel?: boolean;
    onChange?: Function;
    initCollapseLevel?: number;
    confirm?: Function;
}
export interface Styles {
    tree?: string;
    node?: string;
    nodeHover?: string;
    nodeDropBefore?: string;
    nodeDropInside?: string;
    nodeDropAfter?: string;
    label?: string;
    subnodes?: string;
    collapseButton?: string;
}
export interface ListenerOptions {
    node: NodeComponent;
    eventName: string;
    handler: Function;
    tree: SortableTree;
}
export interface NodeComponentData {
    id: string;
    element: NodeComponent;
    subnodes: NodeComponentData[];
}
export interface DropResultData {
    nodes: NodeComponentData[];
    moved: NodeComponent;
    parentNode: NodeComponent;
}
export {};
