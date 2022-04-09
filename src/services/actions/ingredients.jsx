import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import ingredientsApi from "../../api/ingredients-api";

export const fetchIngredients = createAsyncThunk(
	"ingredients/fetchAll",
	async () => {
		const response = await ingredientsApi.fetchAll();
		return response;
	}
);

export const selectIngredient = createAction(
	"ingredients/select",
	function prepare(ingredient) {
		return {
			payload: ingredient,
		};
	}
);

export const unselectIngredient = createAction("ingredients/unselect");
