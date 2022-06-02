export interface IIngredient {
	_id: string;
	name: string;
	type: "bun" | "sauce" | "main";
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
	bun_type?: "bottom" | "top";
}
interface IGroupedIngredient extends IIngredient {
	count: number;
}
export interface IElement extends IIngredient {
	id: string;
	sortIndex: number;
}

export type TOrderStatus = "done";

export interface IOrder {
	_id: string;
	number: number;
	createdAt: string;
	ingredients: IIngredient[];
	name: string;
	owner: IUser;
	price: number;
	status: TOrderStatus;
	updatedAt?: string;
}

export interface IUser {
	name: string;
	email: string;
	createdAt?: string;
	updatedAt?: string;
}
