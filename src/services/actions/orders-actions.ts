import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	IRequest,
	IPostOrderRequest,
	IPostOrderResponse,
} from "../../api/types";

import api from "../../api/orders-api";
import { loaded, loading } from "./system-actions";
import { AppDispatch } from "../store/store";

export const postOrder = createAsyncThunk<
	IPostOrderResponse,
	IPostOrderRequest & IRequest,
	{ dispatch: AppDispatch }
>("order/postOrder", async (data, thunkApi) => {
	thunkApi.dispatch(loading());
	const response = await api.postOrder(data);
	thunkApi.dispatch(loaded());
	return response;
});
