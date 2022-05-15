import { get } from ".";
import { IIngredient } from "../services/model/types";
import { IFetchArray } from "./types";

const ingredientsApi = {
	fetchAll: () => {
		const ingredients = get<IFetchArray<IIngredient>>("ingredients");
		return ingredients;
	},
};

export default ingredientsApi;
