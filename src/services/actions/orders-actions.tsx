import { createAsyncThunk } from "@reduxjs/toolkit";
import { IRequest } from "../../api";
import elementsApi from "../../api/orders/orders-api";
import {
	IPostOrderRequest,
	IPostOrderResponse,
} from "../../api/orders/orders-api-interface";

export const postOrder = createAsyncThunk<
	IPostOrderResponse,
	IPostOrderRequest & IRequest
>("order/postOrder", async (data) => {
	const response = await elementsApi.postOrder(data);
	return response;
});
