import { IReposnse, post } from ".";
import { IOrder } from "../services/interfaces";

export interface IPostOrderBody {
	ingredients: string[];
}
export interface IPostOrderResponse extends IReposnse {
	name: string;
	order: IOrder;
}

const elementsApi = {
	postOrder: (ids: string[], token: string) => {
		return post<IPostOrderBody, IPostOrderResponse>(
			"orders",
			{ ingredients: ids },
			token
		);
	},
};

export default elementsApi;
