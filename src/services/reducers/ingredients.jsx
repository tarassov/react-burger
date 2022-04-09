import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "../actions/ingredients";
import { ingredientsAdapter, initialState } from "../adapters/ingredients";

export const ingredientSlice = createSlice({
	name: "ingredients",
	initialState,
	reducers: {},
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

const ingredientReducer = ingredientSlice.reducer;
export default ingredientReducer;
