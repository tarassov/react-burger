import { createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../actions/orders-actions";

export interface IOrderState {
	orderNumber: number | undefined;
	error: boolean;
	posting: boolean;
	errorMessage: string | undefined;
}

const initialState: IOrderState = {
	orderNumber: undefined,
	error: false,
	posting: false,
	errorMessage: "",
};

export const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(postOrder.pending, (state) => {
			state.posting = true;
		});
		builder.addCase(postOrder.fulfilled, (state, action) => {
			state.error = false;
			state.posting = false;
			state.orderNumber = action.payload.order.number;
		});
		builder.addCase(postOrder.rejected, (state, payload) => {
			state.errorMessage = payload.error.message;
			state.error = true;
			state.posting = false;
		});
	},
});

const orderReducers = orderSlice.reducer;

export default orderReducers;
