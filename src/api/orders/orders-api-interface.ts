import { IReposnse, IRequest } from "..";
import { IOrder } from "../../services/interfaces/model";

export interface IPostOrderRequest extends IRequest {
	ingredients: Array<string>;
}
export interface IPostOrderResponse extends IReposnse {
	name: string;
	order: IOrder;
}
