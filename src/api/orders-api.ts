import { post, get } from ".";
import { IFeedOrder } from "../services/adapters/feed-adapters";
import { IPostOrderRequest, IPostOrderResponse } from "./types";

const elementsApi = {
	postOrder: (data: IPostOrderRequest) => {
		return post<IPostOrderRequest, IPostOrderResponse>(
			"orders",
			{ ingredients: data.ingredients },
			data.token
		);
	},

	getOrder: (data: { number: string }) => {
		return get<{ success: boolean; orders: Array<IFeedOrder> }>(
			`orders\\${data.number}`
		);
	},
};

export default elementsApi;
