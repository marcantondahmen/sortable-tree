/*
 * Sortable Tree
 *
 * (c) 2025 Marc Anton Dahmen, MIT license
 */

import { SortableTreeEventHandler, SortableTreeListener } from './types';

export class SortableTreeEventBus {
	private listeners: SortableTreeListener[] = [];

	listen(
		element: HTMLElement,
		eventName: string,
		handler: SortableTreeEventHandler
	): void {
		element.addEventListener(eventName, handler, false);
		this.listeners.push({ element, eventName, handler });
	}

	clear(): void {
		this.listeners.forEach(({ element, eventName, handler }) => {
			element.removeEventListener(eventName, handler);
		});

		this.listeners = [];
	}
}
