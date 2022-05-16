import { patch, post, get } from ".";
import { IReposnse, IRequest } from "./types";
import { IUser } from "../services/model/types";

import {
	ILoginRequest,
	ILoginResponse,
	IRegisterRequest,
	IResfreshResponse,
	IRefreshRequest,
	ILogoutRequest,
	IUserResponse,
	IPasswordForgot,
	IPasswordSetRequest,
} from "./types";
const authPath = "auth";

const userApi = {
	login: (credentials: ILoginRequest) => {
		return post<ILoginRequest, ILoginResponse>(
			`${authPath}/login`,
			credentials
		);
	},
	logout: (refreshToken: string) => {
		return post<ILogoutRequest, IReposnse>(`${authPath}/logout`, {
			token: `${refreshToken}`,
		});
	},
	register: (credentials: IRegisterRequest) => {
		return post<IRegisterRequest, ILoginResponse>(
			`${authPath}/register`,
			credentials
		);
	},
	token: (refreshToken: string) => {
		return post<IRefreshRequest, IResfreshResponse>(`${authPath}/token`, {
			token: `${refreshToken}`,
		});
	},

	update: (data: { user: IUser } & IRequest) => {
		return patch<IUser, IUserResponse>(
			`${authPath}/user`,
			data.user,
			data.token
		);
	},
	getUser: (data: IRequest) => {
		return get<IUserResponse>(`${authPath}/user`, data.token);
	},
	forgotPassword: (email: string) => {
		return post<IPasswordForgot, IReposnse>(`password-reset`, {
			email: email,
		});
	},
	setPassword: (data: IPasswordSetRequest) => {
		return post<IPasswordSetRequest, IReposnse>(`password-reset/reset`, data);
	},
};

export default userApi;
