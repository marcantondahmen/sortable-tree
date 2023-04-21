/*
 * Sortable Tree
 *
 * (c) 2023 Marc Anton Dahmen, MIT license
 */

import {
	SortableTreeParsedNodeComponentData,
	SortableTreeState,
} from './types';

export const saveState = (
	stateId: string,
	data: SortableTreeParsedNodeComponentData[]
): void => {
	const state: SortableTreeState[] = [];
	const walk = (
		nodeData: SortableTreeParsedNodeComponentData
	): SortableTreeState => {
		const subState: SortableTreeState[] = [];
		const _state: SortableTreeState = [
			nodeData.element.getAttribute('open') ? 1 : 0,
			subState,
		];

		nodeData.subnodes.forEach((subNodeData) => {
			subState.push(walk(subNodeData));
		});

		return _state;
	};

	data.forEach((nodeData) => {
		state.push(walk(nodeData));
	});

	sessionStorage.setItem(createStateId(stateId), JSON.stringify(state));
};

export const applyState = (
	stateId: string,
	data: SortableTreeParsedNodeComponentData[]
): void => {
	const saved = sessionStorage.getItem(createStateId(stateId));

	if (!saved) {
		return;
	}

	const state = JSON.parse(saved);
	const walk = (
		nodeData: SortableTreeParsedNodeComponentData,
		state: SortableTreeState
	): void => {
		const [elementState, substates] = state;

		nodeData.element.collapse(elementState === 0);

		if (!substates) {
			return;
		}

		nodeData.subnodes.forEach((subNodeData, index) => {
			if (typeof substates[index] !== 'undefined') {
				walk(subNodeData, substates[index]);
			}
		});
	};

	data.forEach((nodeData, index) => {
		walk(nodeData, state[index]);
	});
};

const createStateId = (id: string): string => {
	return `sortableTreeState-${id.replace(/[^\w]+/, '-')}`;
};
