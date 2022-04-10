import { createAction, nanoid } from "@reduxjs/toolkit";

export const add = createAction("elements/add", function prepare(ingredient) {
	return {
		payload: {
			...ingredient,
			id: ingredient.type === "bun" ? ingredient.type : nanoid(),
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
