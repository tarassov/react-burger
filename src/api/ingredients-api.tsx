import { get, IFetchArray } from ".";
import { IIngredient } from "../services/interfaces/model";

const ingredientsApi = {
	fetchAll: () => {
		const ingredients = get<IFetchArray<IIngredient>>("ingredients");
		return ingredients;
	},
};

export default ingredientsApi;
