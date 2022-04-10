import { get } from ".";

const ingredientsApi = {
	fetchAll: () => {
		return get("ingredients");
	},
};

export default ingredientsApi;
