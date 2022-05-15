import { post } from "..";
import { IPostOrderRequest, IPostOrderResponse } from "./orders-api-interface";

const elementsApi = {
	postOrder: (data: IPostOrderRequest) => {
		return post<IPostOrderRequest, IPostOrderResponse>(
			"orders",
			{ ingredients: data.ingredients },
			data.token
		);
	},
};

export default elementsApi;
