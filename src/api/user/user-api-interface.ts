import { IReposnse } from "..";
import { IUser } from "../../services/interfaces";

export interface ILoginRequest {
	email: string;
	passoword: string;
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
	passoword: string;
	token: string;
}

export interface IPasswordForgot {
	email: string;
}
