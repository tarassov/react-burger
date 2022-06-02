import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	IRequest,
	IPostOrderRequest,
	IPostOrderResponse,
} from "../../api/types";

import api from "../../api/orders-api";

export const postOrder = createAsyncThunk<
	IPostOrderResponse,
	IPostOrderRequest & IRequest
>("order/postOrder", async (data) => {
	const response = await api.postOrder(data);
	return response;
});
