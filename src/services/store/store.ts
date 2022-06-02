import { configureStore } from "@reduxjs/toolkit";
import elementsReducers from "../reducers/elements-reducers";

import ingredientReducers from "../reducers/ingredients-reducers";
import orderReducers from "../reducers/order-reducers";
import systemReducers from "../reducers/system-reducers";
import userReducers from "../reducers/user-reducers";
import { createReduxHistoryContext } from "redux-first-history";
import { createBrowserHistory } from "history";
import {
	useDispatch,
	TypedUseSelectorHook,
	useSelector as selectorHook,
} from "react-redux";
import * as feed from "../actions/feed-actions";
import { socketMiddleware } from "../middleware/socketMiddleware";
import feedReducers from "../reducers/feed-reducers";

const { createReduxHistory, routerMiddleware, routerReducer } =
	createReduxHistoryContext({ history: createBrowserHistory() });

const baseSocketUrl = "wss://norma.nomoreparties.space";
const socketActions = {
	wsConnect: feed.connect,
	wsDisconnect: feed.disconnect,
	onWsConnected: feed.connected,
	onWsClosing: feed.closing,
	onWsError: feed.error,
	onWsMessage: feed.fetched,
	onWsClose: feed.close,
};

export const store = configureStore({
	reducer: {
		router: routerReducer,
		ingredients: ingredientReducers,
		elements: elementsReducers,
		order: orderReducers,
		system: systemReducers,
		user: userReducers,
		feed: feedReducers,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			routerMiddleware,
			socketMiddleware(baseSocketUrl, socketActions)
		),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;

export const history = createReduxHistory(store);
