import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/user-actions";

const initialState = {
	authenticated: false,
	error: false,
	pending: false,
	email: "",
	name: "",
	errorMessage: "",
};
export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: (state) => {
			state.authenticated = false;
			state.email = "";
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => {
			state.pending = true;
			state.errorMessage = "";
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.error = false;
			state.pending = false;
			state.authenticated = true;
			state.email = action.payload.user.email;
			state.name = action.payload.user.name;
			state.errorMessage = "";
		});
		builder.addCase(login.rejected, (state, payload) => {
			state.errorMessage = payload.error.message;
			state.error = true;
			state.pending = false;
		});
	},
});

const userReducers = userSlice.reducer;

export default userReducers;
