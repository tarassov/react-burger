import type { AnyAction, Middleware, MiddlewareAPI } from "redux";
import * as feed from "../actions/feed-actions";
import { AppDispatch, RootState } from "../store/store";

export const socketMiddleware = (baseUrl: string): Middleware => {
	return (store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action: AnyAction) => {
			const { dispatch } = store;

			if (feed.connect.match(action)) {
				try {
					const endpoint = action.payload;
					socket = new WebSocket(`${baseUrl}/${endpoint}`);
				} catch (e) {
					dispatch(feed.error());
				}
			}

			if (feed.disconnect.match(action)) {
				dispatch(feed.closing());
				socket?.close();
				socket = null;
			}

			if (socket) {
				socket.onopen = () => {
					dispatch(feed.connected());
				};

				socket.onerror = () => {
					dispatch(feed.error());
				};

				socket.onmessage = (event) => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					const { ...restParsedData } = parsedData;
					dispatch(feed.fetched(restParsedData));
				};

				socket.onclose = (e) => {
					if (e.target === socket) dispatch(feed.close());
				};
			}
			next(action);
		};
	};
};
