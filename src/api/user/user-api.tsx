import { patch, post, get, IReposnse, IRequest } from "..";
import { IUser } from "../../services/interfaces";
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
} from "./user-api-interface";
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
	getUser: (token: string) => {
		return get<IUserResponse>(`${authPath}/user`, token);
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
