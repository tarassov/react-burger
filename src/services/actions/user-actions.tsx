import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { push } from "redux-first-history";
import { IReposnse } from "../../api";
import {
	ILoginRequest,
	ILoginResponse,
	IPasswordSetRequest,
	IRegisterRequest,
	IUserResponse,
} from "../../api/user/types";
import userApi from "../../api/user/user-api";
import { IUser } from "../interfaces";

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
export const register = createAsyncThunk<IReposnse, IRegisterRequest>(
	"user/register",
	async (credentials) => {
		const response = await userApi.register(credentials);
		return response;
	}
);

export const forgotPassword = createAsyncThunk<
	IReposnse,
	{ email: string; location: string }
>("user/forgotPassword", async (payload, thunkApi) => {
	const response = await userApi.forgotPassword(payload.email);
	if (response.success)
		thunkApi.dispatch(push("reset-password", { from: payload.location }));
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
	{ user: IUser; token: string }
>("user/update", async (data) => {
	const response = await userApi.update(data.user, data.token);
	return response;
});

export const token = createAsyncThunk<IReposnse, string>(
	"user/token",
	async (resfreshToken) => {
		const response = await userApi.token(resfreshToken);
		return response;
	}
);

export const get = createAsyncThunk<IUser, { token: string }>(
	"user/get",
	async (data) => {
		const response = await userApi.getUser(data.token);
		return response.user;
	}
);

export const authenticate = createAction("user/authenticate");

export const dismissErrors = createAction("user/dismissErrors");
