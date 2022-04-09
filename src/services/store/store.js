import { configureStore } from "@reduxjs/toolkit";
import elementsReducer from "../reducers/elements";
import ingredientReducer from "../reducers/ingredients";
import orderReducer from "../reducers/order";

const store = configureStore({
	reducer: {
		ingredients: ingredientReducer,
		elements: elementsReducer,
		order: orderReducer,
	},
});

export default store;
