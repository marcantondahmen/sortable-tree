/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */
import { NodeComponent } from './Node';
import { DropResultData, Styles } from './types';
export declare const defaultRenderLabel: (data: any) => string;
export declare const defaultStyles: Styles;
export declare const defaultOnChange: (result: DropResultData) => void;
export declare const defaultConfirm: (moved: NodeComponent, parentNode: NodeComponent) => Promise<boolean>;
