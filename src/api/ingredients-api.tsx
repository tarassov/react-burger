import { get, IFetchArray } from ".";
import { IIngredient } from "../services/interfaces";

const ingredientsApi = {
	fetchAll: () => {
		const ingredients = get<IFetchArray<IIngredient>>("ingredients");
		return ingredients;
	},
};

export default ingredientsApi;
