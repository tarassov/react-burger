import { createSlice } from "@reduxjs/toolkit";
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
		builder.addCase(postOrder.fulfilled, (state) => {
			state.orderModal = true;
		});
	},
});

const systemReducers = systemSlice.reducer;

export default systemReducers;
