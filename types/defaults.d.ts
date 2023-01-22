/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */
import { NodeComponent } from './Node';
import { DropResultData, KeyValue, Styles } from './types';
export declare const defaultRenderLabel: (data: KeyValue) => string;
export declare const defaultStyles: Styles;
export declare const defaultOnChange: ({ nodes, movedNode, srcParentNode, targetParentNode, }: DropResultData) => void;
export declare const defaultOnClick: (event: Event, node: NodeComponent) => void;
export declare const defaultConfirm: (movedNode: NodeComponent, targetParentNode: NodeComponent) => Promise<boolean>;
