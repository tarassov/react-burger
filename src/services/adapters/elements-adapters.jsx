import { createEntityAdapter } from "@reduxjs/toolkit";

export const elementsAdapter = createEntityAdapter({
	sortComparer: (a, b) => a.sortIndex - b.sortIndex,
});

export const initialState = elementsAdapter.getInitialState({
	totalPrice: 0,
	order: { orderNumber: "", posting: false, error: false },
	groupedCart: {},
	maxIndex: 0,
});

const selectors = elementsAdapter.getSelectors((state) => state.elements);
export const { selectAll: selectAllElements } = selectors;
