import { createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../actions/elements";
import { elementsAdapter, initialState } from "../adapters/elements";

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

const recreateSortIndex = (state) => {
	elementsAdapter.setAll(
		state,
		elementsAdapter
			.getSelectors()
			.selectAll(state)
			.map((element, index) => {
				state.maxIndex = index;
				return {
					...element,
					sortIndex: element.type === "bun" ? 0 : index,
				};
			})
	);
};

export const elementsSlice = createSlice({
	name: "elements",
	initialState,
	reducers: {
		remove: (state, action) => {
			elementsAdapter.removeOne(state, action.payload);
			state.totalPrice = countTotalPrice(state);
			state.groupedCart = generateGroupedCart(state);
			recreateSortIndex(state);
		},
		add: (state, action) => {
			if (action.payload.type == "bun") {
				if (state.entities["bun"]) {
					state.entities["bun"] = { ...action.payload, sortIndex: 0 };
				} else {
					elementsAdapter.upsertOne(state, {
						...action.payload,
						sortIndex: 0,
					});
				}
			} else {
				state.maxIndex = state.maxIndex + 1;
				elementsAdapter.upsertOne(state, {
					...action.payload,
					sortIndex: state.maxIndex,
				});
			}
			state.totalPrice = countTotalPrice(state);
			state.groupedCart = generateGroupedCart(state);
		},
		update: (state, action) => {
			elementsAdapter.upsertMany(state, action.payload);
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
