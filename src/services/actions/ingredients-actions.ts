import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import ingredientsApi from "../../api/ingredients-api";

export const fetchIngredients = createAsyncThunk(
	"ingredients/fetchAll",
	async () => {
		const response = await ingredientsApi.fetchAll();
		return response.data;
	}
);

export const unselectIngredient = createAction("ingredients/unselect");
