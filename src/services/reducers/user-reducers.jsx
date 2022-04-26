import { createSlice } from "@reduxjs/toolkit";
import { get, login, register, token, update } from "../actions/user-actions";

const initialState = {
	authenticated: false,
	pendingAuthentication: true,
	userLoaded: false,
	error: false,
	pending: false,
	email: "",
	name: "",
	errorMessage: "",
	accessToken: null,
	accessTokenExpire: Date.now(),
};
const pending = (state) => {
	state.pending = true;
	state.errorMessage = "";
};
const fulfilled = (state, action) => {
	state.error = false;
	state.pending = false;
	state.authenticated = true;
	state.pendingAuthentication = false;
	state.email = action.payload.user.email;
	state.name = action.payload.user.name;
	state.accessToken = action.payload.accessToken;
	state.accessTokenExpire = Date.now() + 600000;
	state.errorMessage = "";
	state.userLoaded = true;
};
const rejected = (state, action) => {
	state.errorMessage = action.error.message;
	state.error = true;
	state.pending = false;
};
export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logout: () => {
			return { ...initialState, pendingAuthentication: false };
		},
		authenticate: (state, action) => {
			state.authenticated = action.payload;
			state.pendingAuthentication = false;
		},
		dismissErrors: (state) => {
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
		builder.addCase(login.rejected, (state, payload) =>
			rejected(state, payload)
		);
		builder.addCase(register.pending, (state) => pending(state));
		builder.addCase(register.fulfilled, (state, action) =>
			fulfilled(state, action)
		);
		builder.addCase(register.rejected, (state, payload) =>
			rejected(state, payload)
		);
		builder.addCase(token.fulfilled, (state, action) => {
			state.authenticated = true;
			state.accessToken = action.payload.accessToken;
			state.accessTokenExpire = Date.now() + 600000;
		});
		builder.addCase(token.rejected, () => {
			return { ...initialState, pendingAuthentication: false };
		});
		builder.addCase(get.pending, (state) => pending(state));
		builder.addCase(get.fulfilled, (state, action) => {
			state.email = action.payload.email;
			state.name = action.payload.name;
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

export default userReducers;
