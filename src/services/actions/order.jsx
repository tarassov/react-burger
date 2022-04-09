import { createAsyncThunk } from "@reduxjs/toolkit";
import elementsApi from "../../api/elements-api";

export const postOrder = createAsyncThunk(
	"order/postOrder",
	async (entities) => {
		const ids = entities.map((ingredient) => ingredient._id);
		const response = await elementsApi.postOrder(ids);
		return response;
	}
);
