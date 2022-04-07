import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchIngredients } from "../actions/ingredients";

export const ingredientsAdapter = createEntityAdapter({
	selectId: (ingredient) => ingredient._id,
});

const initialState = ingredientsAdapter.getInitialState({
	loading: false,
	error: false,
});

export const ingredientSlice = createSlice({
	name: "ingredients",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchIngredients.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchIngredients.fulfilled, (state, action) => {
			ingredientsAdapter.upsertMany(state, action.payload);
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

export const { selectAll: selectAllIngredients } =
	ingredientsAdapter.getSelectors((state) => state.ingredients);
