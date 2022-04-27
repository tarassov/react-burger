import { createAsyncThunk } from "@reduxjs/toolkit";
import elementsApi from "../../api/orders-api";
import { fireError } from "./system-actions";

export const postOrder = createAsyncThunk("order/postOrder", async (data) => {
	const ids = data.elements.map((ingredient) => ingredient._id);

	const response = await elementsApi.postOrder(ids, data.token);
	return response;
});

export const tryToPostOrder = (elements) => {
	return async function (dispatch) {
		if (elements.length === 0) {
			dispatch(fireError("Не выбраны ингредиенты"));
		} else if (elements.find((x) => x.type === "bun") === undefined) {
			dispatch(fireError("Не выбрана булка"));
		} else {
			dispatch(postOrder(elements));
		}
	};
};
