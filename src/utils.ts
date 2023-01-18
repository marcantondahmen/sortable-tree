/*!
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

export const create = (
	tag: string,
	classes: string[] = [],
	attributes: object = {},
	parent: HTMLElement | null = null
): any => {
	const element = document.createElement(tag);

	classes.forEach((cls) => {
		element.classList.add(cls);
	});

	for (const [key, value] of Object.entries(attributes)) {
		element.setAttribute(key, value);
	}

	if (parent) {
		parent.appendChild(element);
	}

	return element;
};
