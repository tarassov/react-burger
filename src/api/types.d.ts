import { IUser, IOrder } from "../../services/interfaces/model";

export interface IReposnse {
	success: boolean;
	message?: string;
}

export interface IRequest {
	token?: string;
}
export interface IFetchArray<T> extends IReposnse {
	data: Array<T>;
}
export interface ILoginRequest {
	email: string;
	password: string;
}
export interface ILoginResponse extends IReposnse {
	accessToken: string;
	refreshToken: string;
	user: IUser;
}

export interface ILogoutRequest {
	token: string;
}
export interface IUserResponse extends IReposnse {
	user: IUser;
}

export interface IRegisterRequest extends ILoginRequest {
	name: string;
}

export interface IRefreshRequest {
	token: string;
}

export interface IResfreshResponse extends IReposnse {
	accessToken: string;
	refreshToken: string;
	error?: boolean;
}

export interface IPasswordSetRequest {
	password: string;
	token: string;
}

export interface IPasswordForgot {
	email: string;
}

export interface IPostOrderRequest extends IRequest {
	ingredients: Array<string>;
}
export interface IPostOrderResponse extends IReposnse {
	name: string;
	order: IOrder;
}
