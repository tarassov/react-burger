import { patch, post, get, IReposnse } from "..";
import { IUser } from "../../services/interfaces";
import * as types from "./types";
const authPath = "auth";

const userApi = {
	login: (credentials: types.ILoginRequest) => {
		return post<types.ILoginRequest, types.ILoginResponse>(
			`${authPath}/login`,
			credentials
		);
	},
	logout: (refreshToken: string) => {
		return post<types.ILogoutRequest, IReposnse>(`${authPath}/logout`, {
			token: `${refreshToken}`,
		});
	},
	register: (credentials: types.IRegisterRequest) => {
		return post<types.IRegisterRequest, IReposnse>(
			`${authPath}/register`,
			credentials
		);
	},
	token: (refreshToken: string) => {
		return post<types.IRefreshRequest, IReposnse>(`${authPath}/token`, {
			token: `${refreshToken}`,
		});
	},

	update: (data: IUser, token: string) => {
		return patch<IUser, types.IUserResponse>(`${authPath}/user`, data, token);
	},
	getUser: (token: string) => {
		return get<types.IUserResponse>(`${authPath}/user`, token);
	},
	forgotPassword: (email: string) => {
		return post<types.IPasswordForgot, IReposnse>(`password-reset`, {
			email: email,
		});
	},
	setPassword: (data: types.IPasswordSetRequest) => {
		return post<types.IPasswordSetRequest, IReposnse>(
			`password-reset/reset`,
			data
		);
	},
};

export default userApi;
