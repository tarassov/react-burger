import { get } from ".";
import { IIngredient } from "../services/interfaces/model";
import { IFetchArray } from "./types";

const ingredientsApi = {
	fetchAll: () => {
		const ingredients = get<IFetchArray<IIngredient>>("ingredients");
		return ingredients;
	},
};

export default ingredientsApi;
