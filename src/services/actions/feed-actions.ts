import { createAction } from "@reduxjs/toolkit";
import { IFeedOrder } from "../adapters/feed-adapters";

export const startWs = createAction("feed/startWs");

export const onError = createAction<Event>("feed/onError");

export const onOpen = createAction("feed/onOpen");

export const onGet = createAction<{
	total: number;
	totalToday: number;
	success: boolean;
	orders: Array<IFeedOrder>;
}>("feed/onGet");

export const onClose = createAction<Event>("feed/onClose");
