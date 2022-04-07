import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { postOrder } from "../actions/elements";

export const elementsAdapter = createEntityAdapter();

const initialState = elementsAdapter.getInitialState({
	totalPrice: 0,
	order: { orderNumber: "", posting: false, error: false },
});

const countTotalPrice = (entities) => {
	return Object.keys(entities).reduce(
		(prev, curr) =>
			prev +
			(entities[curr].type === "bun"
				? entities[curr].price * 2
				: entities[curr].price),
		0
	);
};

export const elementsSlice = createSlice({
	name: "elements",
	initialState,
	reducers: {
		// remove: (state, action) => {
		// 	elementsAdapter.removeOne(state, action.payload);
		// 	state.totalPrice = countTotalPrice(state.entities);
		// },
		remove: elementsAdapter.removeOne,
		add: (state, action) => {
			elementsAdapter.upsertOne(state, action.payload);
			state.totalPrice = countTotalPrice(state.entities);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(postOrder.pending, (state) => {
			state.order.posting = true;
		});
		builder.addCase(postOrder.fulfilled, (state, action) => {
			state.order.error = false;
			state.order.posting = false;
			console.log(action.payload);
			state.order.orderNumber = action.payload.order.number;
		});
		builder.addCase(postOrder.rejected, (state) => {
			state.order.error = true;
			state.order.posting = false;
		});
	},
});

const elementsReducer = elementsSlice.reducer;

export default elementsReducer;

export const { selectAll: selectAllElements } = elementsAdapter.getSelectors(
	(state) => state.elements
);
