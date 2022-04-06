import { createAsyncThunk } from "@reduxjs/toolkit";
import ingredientsApi from "../../api/ingredients-api";

export const fetchIngredients = createAsyncThunk(
	"ingredients/fetchAll",
	async () => {
		const response = await ingredientsApi.fetchAll();
		return response;
	}
);
