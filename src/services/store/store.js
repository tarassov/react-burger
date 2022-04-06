import { configureStore } from "@reduxjs/toolkit";

import ingredientReducer from "../reducers/ingredients";

const store = configureStore({
	reducer: {
		ingredients: ingredientReducer,
	},
});

export default store;
