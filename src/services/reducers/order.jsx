import { createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../actions/order";

const initialState = {
	orderNumber: "",
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
			console.log(action.payload);
			state.orderNumber = action.payload.order.number;
		});
		builder.addCase(postOrder.rejected, (state, payload) => {
			console.log(payload);
			state.errorMessage = payload.error.message;
			state.error = true;
			state.posting = false;
		});
	},
});

const orderReducer = orderSlice.reducer;

export default orderReducer;
