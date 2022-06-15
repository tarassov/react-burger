import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postOrder } from "../actions/orders-actions";
import { get } from "../actions/user-actions";

interface ISystemState {
	error: boolean;
	errorMessage: string;
	orderModal: boolean;
	ingredientModal: boolean;
	loading: boolean;
}

export const initialState: ISystemState = {
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
		loading: (state) => {
			state.loading = true;
		},
		loaded: (state) => {
			state.loading = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(get.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(postOrder.fulfilled, (state) => {
			state.orderModal = true;
		});
	},
});

const systemReducers = systemSlice.reducer;

export default systemReducers;
