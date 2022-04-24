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

export const logout = createAction("user/logout");

export const dismissErrors = createAction("user/dismissErrors");
