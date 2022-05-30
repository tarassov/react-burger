import type { AnyAction, Middleware, MiddlewareAPI } from "redux";
import {
	// onClose,
	// onError,
	onGet,
	onOpen,
	startWs,
} from "../actions/feed-actions";
import { AppDispatch, RootState } from "../store/store";

export const feedMiddleware = (wsUrl: string): Middleware => {
	return (store: MiddlewareAPI<AppDispatch, RootState>) => {
		let socket: WebSocket | null = null;

		return (next) => (action: AnyAction) => {
			const { dispatch } = store;

			if (startWs.match(action)) {
				socket = new WebSocket(`${wsUrl}`);
			}
			if (socket) {
				socket.onopen = () => {
					dispatch(onOpen());
				};

				socket.onerror = (event) => {
					console.log(event);
					//	dispatch({ type: onError(event) });
				};

				socket.onmessage = (event) => {
					const { data } = event;
					const parsedData = JSON.parse(data);
					const { ...restParsedData } = parsedData;
					dispatch(onGet(restParsedData));
				};

				socket.onclose = (event) => {
					console.log(event);
					//	dispatch({ type: onClose(event) });
				};
			}

			next(action);
		};
	};
};
