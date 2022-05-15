import { createSlice } from "@reduxjs/toolkit";
import { postOrder } from "../actions/orders-actions";
import {
	elementsAdapter,
	IElementsState,
	IGroupedCart,
	initialState,
} from "../adapters/elements-adapters";
import { IElement } from "../model/types";

const countTotalPrice = (state: IElementsState) => {
	return elementsAdapter
		.getSelectors()
		.selectAll(state)
		.reduce(
			(prev, curr) =>
				prev + (curr.type === "bun" ? curr.price * 2 : curr.price),
			0
		);
};

const generateGroupedCart = (state: IElementsState) => {
	const newGroupedCart: IGroupedCart = {};
	elementsAdapter
		.getSelectors()
		.selectAll(state)
		.forEach((element: IElement) => {
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

const recreateSortIndex = (state: IElementsState) => {
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
		builder.addCase(postOrder.fulfilled, (state) => {
			elementsAdapter.removeAll(state);
			state.maxIndex = 0;
			state.groupedCart = {};
			state.totalPrice = 0;
		});
	},
});

const elementsReducers = elementsSlice.reducer;

export default elementsReducers;
