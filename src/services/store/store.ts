import { configureStore } from "@reduxjs/toolkit";
import elementsReducers from "../reducers/elements-reducers";

import ingredientReducers from "../reducers/ingredients-reducers";
import orderReducers from "../reducers/order-reducers";
import systemReducers from "../reducers/system-reducers";
import userReducers from "../reducers/user-reducers";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import { useDispatch } from "react-redux";

const { createReduxHistory, routerMiddleware, routerReducer } =
	createReduxHistoryContext({ history: createBrowserHistory() });

export const store = configureStore({
	reducer: {
		router: routerReducer,
		ingredients: ingredientReducers,
		elements: elementsReducers,
		order: orderReducers,
		system: systemReducers,
		user: userReducers,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(routerMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const history = createReduxHistory(store);
