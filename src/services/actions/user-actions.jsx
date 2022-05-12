import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { push } from "redux-first-history";
import userApi from "../../api/user-api";

export const login = createAsyncThunk("user/login", async (credentials) => {
	const response = await userApi.login(credentials);
	return response;
});

export const logout = createAsyncThunk("user/logout", async (token) => {
	const response = await userApi.logout(token);
	return response;
});
export const register = createAsyncThunk(
	"user/register",
	async (credentials) => {
		const response = await userApi.register(credentials);
		return response;
	}
);

export const forgotPassword = createAsyncThunk(
	"user/forgotPassword",
	async (payload, thunkApi) => {
		const response = await userApi.forgotPassword(payload.email);
		if (response.success)
			thunkApi.dispatch(push("reset-password", { from: payload.location }));
		return response;
	}
);

export const setPassword = createAsyncThunk(
	"user/setPassword",
	async (values, thunkApi) => {
		const response = await userApi.setPassword(values);
		if (response.success) thunkApi.dispatch(push("login"));
		return response;
	}
);

export const update = createAsyncThunk("user/update", async (data) => {
	const response = await userApi.update(data.user, data.token);
	return response;
});

export const token = createAsyncThunk("user/token", async (resfreshToken) => {
	const response = await userApi.token(resfreshToken);
	return response;
});

//export const logout = createAction("user/logout");

export const get = createAsyncThunk("user/get", async (data) => {
	const response = await userApi.getUser(data.token);
	return response.user;
});

export const authenticate = createAction("user/authenticate");

export const dismissErrors = createAction("user/dismissErrors");
