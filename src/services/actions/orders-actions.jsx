import { createAsyncThunk } from "@reduxjs/toolkit";
import elementsApi from "../../api/orders-api";
import { fireError } from "./system-actions";

export const postOrder = createAsyncThunk(
	"order/postOrder",
	async (entities) => {
		const ids = entities.map((ingredient) => ingredient._id);

		const response = await elementsApi.postOrder(ids);
		return response;
	}
);

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
