import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { IElement } from "../interfaces/model";
import { RootState } from "../store/store";

export interface IElementsState extends EntityState<IElement> {
	totalPrice: number;
	order: {
		orderNumber: string;
		posting: boolean;
		error: boolean;
	};
	groupedCart: IGroupedCart;
	maxIndex: number;
}

export interface IGroupedCart {
	[name: string]: number;
}

export const elementsAdapter = createEntityAdapter<IElement>({
	sortComparer: (a, b) => a.sortIndex - b.sortIndex,
});

export const initialState = elementsAdapter.getInitialState({
	totalPrice: 0,
	order: { orderNumber: "", posting: false, error: false },
	groupedCart: {},
	maxIndex: 0,
}) as IElementsState;

const selectors = elementsAdapter.getSelectors(
	(state: RootState) => state.elements
);
export const { selectAll: selectAllElements } = selectors;
