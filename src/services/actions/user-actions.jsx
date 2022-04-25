import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../api/user-api";

export const login = createAsyncThunk("user/login", async (credentials) => {
	const response = await userApi.login(credentials);
	return response;
});

export const register = createAsyncThunk(
	"user/register",
	async (credentials) => {
		const response = await userApi.register(credentials);
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

export const logout = createAction("user/logout");

export const get = createAsyncThunk("user/get", async (data) => {
	const response = await userApi.getUser(data.token);
	return response.user;
});

export const authenticated = createAction("user/authenticated");

export const dismissErrors = createAction("user/dismissErrors");
