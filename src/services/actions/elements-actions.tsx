import { createAction, nanoid } from "@reduxjs/toolkit";
import { IElement, IIngredient } from "../interfaces/model";

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
