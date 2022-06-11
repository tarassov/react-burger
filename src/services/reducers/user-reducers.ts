import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginRequest, ILoginResponse } from "../../api/types";
import {
	AuthenticateAction,
	get,
	login,
	logout,
	register,
	token,
	update,
} from "../actions/user-actions";

export interface IUserState {
	authenticated: boolean;
	pendingAuthentication: boolean;
	userLoaded: boolean;
	error: boolean;
	pending: boolean;
	email: string;
	name: string;
	errorMessage: string | undefined;
	// accessToken: string | undefined;
	// accessTokenExpire: number;
}

const initialState: IUserState = {
	authenticated: false,
	pendingAuthentication: true,
	userLoaded: false,
	error: false,
	pending: false,
	email: "",
	name: "",
	errorMessage: "",
	// accessToken: undefined,
	// accessTokenExpire: Date.now(),
};
const pending = (state: IUserState) => {
	state.pending = true;
	state.errorMessage = "";
};
const fulfilled = (
	state: IUserState,
	action: PayloadAction<
		ILoginResponse,
		string,
		{
			arg: ILoginRequest;
			requestId: string;
			requestStatus: "fulfilled";
		},
		never
	>
) => {
	state.error = false;
	state.pending = false;
	state.authenticated = true;
	state.pendingAuthentication = false;
	state.email = action.payload.user.email;
	state.name = action.payload.user.name;
	state.errorMessage = "";
	state.userLoaded = true;
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: () => {
			return { ...initialState, pendingAuthentication: false };
		},
		authenticate: (state: IUserState, action: AuthenticateAction) => {
			state.authenticated = action.payload;
			state.pendingAuthentication = false;
		},
		dismissErrors: (state: IUserState) => {
			return {
				...initialState,
				authenticated: state.authenticated,
				pendingAuthentication: false,
				name: state.name,
				email: state.email,
			};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(login.pending, (state) => pending(state));
		builder.addCase(login.fulfilled, (state, action) =>
			fulfilled(state, action)
		);
		builder.addCase(login.rejected, (state, payload) => {
			state.errorMessage = payload.error.message;
			state.error = true;
			state.pending = false;
		});
		builder.addCase(logout.fulfilled, () => {
			return { ...initialState, pendingAuthentication: false };
		});
		builder.addCase(register.pending, (state) => pending(state));
		builder.addCase(register.fulfilled, (state, action) =>
			fulfilled(state, action)
		);
		builder.addCase(register.rejected, (state, payload) => {
			state.errorMessage = payload.error.message;
			state.error = true;
			state.pending = false;
		});
		builder.addCase(token.fulfilled, (state) => {
			state.authenticated = true;
		});
		builder.addCase(token.rejected, () => {
			return { ...initialState, pendingAuthentication: false };
		});
		builder.addCase(get.pending, (state) => pending(state));
		builder.addCase(get.fulfilled, (state, action) => {
			state.email = action.payload.user.email;
			state.name = action.payload.user.name;
			state.userLoaded = true;
			state.pending = false;
		});
		builder.addCase(get.rejected, (state) => {
			state.authenticated = true;
			state.email = "";
			state.name = "";
			state.pending = false;
		});
		builder.addCase(update.fulfilled, (state, action) => {
			state.email = action.payload.user.email;
			state.name = action.payload.user.name;
			state.userLoaded = true;
			state.pending = false;
		});
	},
});

const userReducers = userSlice.reducer;

export const userActions = userSlice.actions;

export default userReducers;
