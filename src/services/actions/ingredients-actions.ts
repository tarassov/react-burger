import { createAsyncThunk } from "@reduxjs/toolkit";
import ingredientsApi from "../../api/ingredients-api";
import { IIngredient } from "../model/types";
import { AppDispatch } from "../store/store";
import { loaded, loading } from "./system-actions";

export const fetchIngredients = createAsyncThunk<
	Array<IIngredient>,
	void,
	{ dispatch: AppDispatch }
>("ingredients/fetchAll", async (_, thunkApi) => {
	thunkApi.dispatch(loading());
	const response = await ingredientsApi.fetchAll();
	thunkApi.dispatch(loaded());
	return response.data;
});
