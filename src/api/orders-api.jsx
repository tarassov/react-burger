import { post } from ".";

const elementsApi = {
	postOrder: (ids, token) => {
		return post("orders", JSON.stringify({ ingredients: ids }), token);
	},
};

export default elementsApi;
