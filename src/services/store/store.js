import { configureStore } from "@reduxjs/toolkit";
import elementsReducers from "../reducers/elements-reducers";
import ingredientReducers from "../reducers/ingredients-reducers";
import orderReducers from "../reducers/order-reducers";

const store = configureStore({
	reducer: {
		ingredients: ingredientReducers,
		elements: elementsReducers,
		order: orderReducers,
	},
});

export default store;
