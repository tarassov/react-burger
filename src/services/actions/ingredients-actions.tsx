import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import ingredientsApi from "../../api/ingredients-api";
import { IIngredient } from "../adapters/ingredients-adapters";

interface IFetchIngredients {
	data: Array<IIngredient>;
	success: boolean;
}

export const fetchIngredients = createAsyncThunk(
	"ingredients/fetchAll",
	async () => {
		const response = (await ingredientsApi.fetchAll()) as IFetchIngredients;
		return response.data;
	}
);

export const unselectIngredient = createAction("ingredients/unselect");
