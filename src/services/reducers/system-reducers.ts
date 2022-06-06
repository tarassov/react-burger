import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchIngredients } from "../actions/ingredients-actions";
import { postOrder } from "../actions/orders-actions";
import { get } from "../actions/user-actions";

interface ISystemState {
	error: boolean;
	errorMessage: string;
	orderModal: boolean;
	ingredientModal: boolean;
	loading: boolean;
}

const initialState: ISystemState = {
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
		fireError: (state: ISystemState, action: PayloadAction<string>) => {
			state.error = true;
			state.errorMessage = action.payload;
			state.loading = false;
		},
		closeModal: (state: ISystemState) => {
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
		builder.addCase(get.pending, (state) => {
			state.loading = true;
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
