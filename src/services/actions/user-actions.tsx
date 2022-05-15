import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Location } from "history";
import { push } from "redux-first-history";
import { IReposnse, IRequest } from "../../api";
import {
	ILoginRequest,
	ILoginResponse,
	IPasswordSetRequest,
	IRegisterRequest,
	IResfreshResponse,
	IUserResponse,
} from "../../api/user/user-api.d";
import userApi from "../../api/user/user-api";
import { IUser } from "../interfaces/model";

export const login = createAsyncThunk<ILoginResponse, ILoginRequest>(
	"user/login",
	async (credentials) => {
		const response = await userApi.login(credentials);
		return response;
	}
);

export const logout = createAsyncThunk<IReposnse, string>(
	"user/logout",
	async (token) => {
		const response = await userApi.logout(token);
		return response;
	}
);
export const register = createAsyncThunk<ILoginResponse, IRegisterRequest>(
	"user/register",
	async (credentials) => {
		const response = await userApi.register(credentials);
		return response;
	}
);

export const forgotPassword = createAsyncThunk<
	IReposnse,
	{ email: string; location: Location }
>("user/forgotPassword", async (payload, thunkApi) => {
	const response = await userApi.forgotPassword(payload.email);
	if (response.success) {
		thunkApi.dispatch(push("reset-password", { from: payload.location }));
	}
	return response;
});

export const setPassword = createAsyncThunk<IReposnse, IPasswordSetRequest>(
	"user/setPassword",
	async (values, thunkApi) => {
		const response = await userApi.setPassword(values);
		if (response.success) thunkApi.dispatch(push("login"));
		return response;
	}
);

export const update = createAsyncThunk<
	IUserResponse,
	{ user: IUser } & IRequest
>("user/update", async (data) => {
	const response = await userApi.update(data);
	return response;
});

export const token = createAsyncThunk<IResfreshResponse, string>(
	"user/token",
	async (resfreshToken) => {
		const response = await userApi.token(resfreshToken);
		return response;
	}
);

export const get = createAsyncThunk<IUserResponse, IRequest>(
	"user/get",
	async (data) => {
		const response = await userApi.getUser(data);
		return response;
	}
);

export const authenticate = createAction<boolean>("user/authenticate");

export const dismissErrors = createAction("user/dismissErrors");
