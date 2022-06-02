import {
	ActionCreatorWithoutPayload,
	ActionCreatorWithPayload,
} from "@reduxjs/toolkit";
import type { AnyAction, Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../store/store";

export type WsActions = {
	wsConnect: ActionCreatorWithPayload<string>;
	wsDisconnect: ActionCreatorWithoutPayload;
	onWsConnected: ActionCreatorWithoutPayload;
	onWsClosing: ActionCreatorWithoutPayload;
	onWsError: ActionCreatorWithoutPayload;
	onWsMessage: ActionCreatorWithPayload<any>;
	onWsClose: ActionCreatorWithoutPayload;
};

export const socketMiddleware = (
	baseUrl: string,
	wsActions: WsActions
): Middleware => {
	return (store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action: AnyAction) => {
			const { dispatch } = store;

			if (wsActions.wsConnect.match(action)) {
				try {
					const endpoint = action.payload;
					socket = new WebSocket(`${baseUrl}/${endpoint}`);
				} catch (e) {
					dispatch(wsActions.onWsError());
				}
			}

			if (wsActions.wsDisconnect === action.type) {
				dispatch(wsActions.onWsClosing());
				socket?.close();
				socket = null;
			}

			if (socket) {
				socket.onopen = () => {
					dispatch(wsActions.onWsConnected);
				};

				socket.onerror = () => {
					dispatch(wsActions.onWsError());
				};

				socket.onmessage = (event) => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					const { ...restParsedData } = parsedData;
					dispatch(wsActions.onWsMessage(restParsedData));
				};

				socket.onclose = (e) => {
					if (e.target === socket) dispatch(wsActions.onWsClose());
				};
			}
			next(action);
		};
	};
};
