import { createEntityAdapter } from "@reduxjs/toolkit";

export const ingredientsAdapter = createEntityAdapter({
	selectId: (ingredient) => ingredient._id,
});

export const initialState = ingredientsAdapter.getInitialState({
	selected: {},
	loading: false,
	error: false,
});

export const { selectAll: selectAllIngredients } =
	ingredientsAdapter.getSelectors((state) => state.ingredients);
