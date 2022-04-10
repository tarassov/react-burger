import { createSlice } from "@reduxjs/toolkit";
import { fetchIngredients } from "../actions/ingredients-actions";
import { postOrder } from "../actions/orders-actions";

const initialState = {
	error: false,
	errorMessage: "",
	orderModal: false,
	ingredientModal: false,
	loading: false,
};
export const systemSlice = createSlice({
	name: "system",
	initialState,
	reducers: {
		fireError: (state, action) => {
			state.error = true;
			state.errorMessage = action.payload;
		},
		closeModal: (state) => {
			state.orderModal = false;
			state.error = false;
			state.ingredientModal = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchIngredients.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(fetchIngredients.rejected, (state) => {
			state.loading = false;
		});
		builder.addCase(fetchIngredients.fulfilled, (state) => {
			state.loading = false;
		});
		builder.addCase(postOrder.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(postOrder.rejected, (state) => {
			state.loading = false;
			state.error = true;
			state.errorMessage = "Галактический сбой.";
		});
		builder.addCase(postOrder.fulfilled, (state) => {
			state.orderModal = true;
			state.loading = false;
		});
		builder.addCase("ingredients/select", (state) => {
			state.ingredientModal = true;
		});
	},
});

const systemReducers = systemSlice.reducer;

export default systemReducers;
