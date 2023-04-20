/*
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import { nanoid } from 'nanoid';

export const create = (
	tag: string,
	classes: string[] = [],
	parent: HTMLElement | null = null
): any => {
	const element = document.createElement(tag);

	classes.forEach((cls) => {
		element.classList.add(cls);
	});

	if (parent) {
		parent.appendChild(element);
	}

	return element;
};

export const guid = () => {
	return nanoid();
};

export const queryParents = (
	selector: string,
	element: HTMLElement
): HTMLElement[] => {
	const parents: HTMLElement[] = [];
	let parent = element.closest(selector) as HTMLElement;

	while (parent !== null) {
		parents.push(parent);
		parent = (parent.parentNode as HTMLElement).closest(selector);
	}

	return parents;
};
