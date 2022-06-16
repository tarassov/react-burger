import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postOrder } from "../actions/orders-actions";

export interface ISystemState {
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
		loading: (state: ISystemState) => {
			state.loading = true;
		},
		loaded: (state: ISystemState) => {
			state.loading = false;
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
