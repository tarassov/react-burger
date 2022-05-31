import type { AnyAction, Middleware, MiddlewareAPI } from "redux";
import * as feed from "../actions/feed-actions";
import { AppDispatch, RootState } from "../store/store";
//TODO: https://redux-toolkit.js.org/api/createListenerMiddleware rewrite
export const feedMiddleware = (wsUrl: string): Middleware => {
	return (store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action: AnyAction) => {
			const { dispatch } = store;

			if (feed.connect.match(action)) {
				try {
					socket = new WebSocket(`${wsUrl}`);
				} catch (e) {
					dispatch(feed.error());
				}
			}

			if (feed.disconnect.match(action)) {
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

				socket.onclose = () => {
					dispatch(feed.close());
				};
			}

			next(action);
		};
	};
};
