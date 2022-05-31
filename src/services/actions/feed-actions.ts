import { createAction } from "@reduxjs/toolkit";
import { IFeedOrder } from "../adapters/feed-adapters";

export const connect = createAction("feed/connect");

export const disconnect = createAction("feed/disconnect");

export const error = createAction("feed/error");

export const connected = createAction("feed/connected");

export const fetched = createAction<{
	total: number;
	totalToday: number;
	success: boolean;
	orders: Array<IFeedOrder>;
}>("feed/fetched");

export const close = createAction("feed/close");
