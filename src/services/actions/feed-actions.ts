import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IRequest } from "../../api/types";
import { IFeedOrder } from "../adapters/feed-adapters";

import api from "../../api/orders-api";

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

export const fetchOneOrder = createAsyncThunk<
	{ success: boolean; orders: Array<IFeedOrder> },
	{ number: string } & IRequest
>("feed/fetchOne", async (data) => {
	const response = await api.getOrder(data);
	return response;
});
