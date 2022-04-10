import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "../actions/ingredients-actions";
import {
	ingredientsAdapter,
	initialState,
} from "../adapters/ingredients-adapters";

export const ingredientSlice = createSlice({
	name: "ingredients",
	initialState,
	reducers: {
		select: (state, action) => {
			state.selected = action.payload;
		},
		unselect: (state) => {
			state.selected = {};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchIngredients.pending, (state) => {
			state.loading = true;
			state.error = false;
		});
		builder.addCase(fetchIngredients.fulfilled, (state, action) => {
			ingredientsAdapter.upsertMany(state, action.payload);
			state.error = false;
			state.loading = false;
		});
		builder.addCase(fetchIngredients.rejected, (state) => {
			state.error = true;
			state.loading = false;
		});
	},
});

const ingredientReducers = ingredientSlice.reducer;
export default ingredientReducers;
