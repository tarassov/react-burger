import { configureStore } from "@reduxjs/toolkit";
import elementsReducer from "../reducers/elements";

import ingredientReducer from "../reducers/ingredients";

const store = configureStore({
	reducer: {
		ingredients: ingredientReducer,
		elements: elementsReducer,
	},
});

export default store;
