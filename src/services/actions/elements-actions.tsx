import { createAction, nanoid } from "@reduxjs/toolkit";
import { IElement } from "../adapters/elements-adapters";
import { IIngredient } from "../adapters/ingredients-adapters";

export const add = createAction(
	"elements/add",
	function prepare(ingredient: IIngredient) {
		return {
			payload: {
				...ingredient,
				id: ingredient.type === "bun" ? ingredient.type : nanoid(),
			} as IElement,
		};
	}
);

export const remove = createAction(
	"elements/remove",
	function prepare(element: IElement) {
		return {
			payload: element.id,
		};
	}
);

export const update = createAction(
	"elements/update",
	function prepare(elements: Array<IElement>) {
		return {
			payload: elements,
		};
	}
);
