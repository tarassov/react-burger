import { configureStore } from "@reduxjs/toolkit";
import elementsReducers from "../reducers/elements-reducers";

import ingredientReducers from "../reducers/ingredients-reducers";
import orderReducers from "../reducers/order-reducers";
import systemReducers from "../reducers/system-reducers";

const store = configureStore({
	reducer: {
		ingredients: ingredientReducers,
		elements: elementsReducers,
		order: orderReducers,
		system: systemReducers,
	},
});

export default store;
