import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { postOrder } from "../actions/elements";

export const elementsAdapter = createEntityAdapter();

const initialState = elementsAdapter.getInitialState({
	totalPrice: 0,
	order: { orderNumber: "", posting: false, error: false },
	groupedCart: {},
});

const countTotalPrice = (state) => {
	return elementsAdapter
		.getSelectors()
		.selectAll(state)
		.reduce(
			(prev, curr) =>
				prev + (curr.type === "bun" ? curr.price * 2 : curr.price),
			0
		);
};

const generateGroupedCart = (state) => {
	const newGroupedCart = {};
	elementsAdapter
		.getSelectors()
		.selectAll(state)
		.forEach((element) => {
			if (newGroupedCart[element._id] === undefined) {
				if (element.type === "bun") {
					newGroupedCart[element._id] = 2;
				} else {
					newGroupedCart[element._id] = 1;
				}
			} else {
				newGroupedCart[element._id] = newGroupedCart[element._id] + 1;
			}
		});
	return newGroupedCart;
};

export const elementsSlice = createSlice({
	name: "elements",
	initialState,
	reducers: {
		remove: (state, action) => {
			elementsAdapter.removeOne(state, action.payload);
			state.totalPrice = countTotalPrice(state);
			state.groupedCart = generateGroupedCart(state);
		},
		add: (state, action) => {
			elementsAdapter.upsertOne(state, action.payload);
			state.totalPrice = countTotalPrice(state);
			state.groupedCart = generateGroupedCart(state);
		},
	},
	extraReducers: (builder) => {
		builder.addCase(postOrder.pending, (state) => {
			state.order.posting = true;
		});
		builder.addCase(postOrder.fulfilled, (state, action) => {
			state.order.error = false;
			state.order.posting = false;
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

const selectors = elementsAdapter.getSelectors((state) => state.elements);
export const { selectAll: selectAllElements } = selectors;
