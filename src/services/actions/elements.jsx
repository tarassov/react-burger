import { createAsyncThunk, createAction, nanoid } from "@reduxjs/toolkit";
import elementsApi from "../../api/elements-api";

export const add = createAction("elements/add", function prepare(ingredient) {
	return {
		payload: {
			...ingredient,
			id: ingredient.type === "bun" ? ingredient.type : nanoid(),
			createdAt: new Date().toISOString(),
		},
	};
});

export const remove = createAction(
	"elements/remove",
	function prepare(element) {
		return {
			payload: element.id,
		};
	}
);

export const update = createAction(
	"elements/update",
	function prepare(elements) {
		return {
			payload: elements,
		};
	}
);

export const postOrder = createAsyncThunk(
	"elements/postOrder",
	async (entities) => {
		const ids = entities.map((ingredient) => ingredient._id);
		const response = await elementsApi.postOrder(ids);
		return response;
	}
);
