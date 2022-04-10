import { post } from ".";

const elementsApi = {
	postOrder: (ids) => {
		return post("orders", JSON.stringify({ ingredients: ids }));
	},
};

export default elementsApi;
