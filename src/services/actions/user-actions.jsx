import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "../../api/user-api";

export const login = createAsyncThunk("user/login", async (credentials) => {
	const response = await userApi.postOrder(credentials);
	return response;
});

export const logout = createAction("user/logout");
