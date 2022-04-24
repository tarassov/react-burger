import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../actions/user-actions";

const initialState = {
	authenticated: false,
	error: false,
	pending: false,
	email: "",
	name: "",
	errorMessage: "",
};
const pending = (state) => {
	state.pending = true;
	state.errorMessage = "";
};
const fulfilled = (state, action) => {
	state.error = false;
	state.pending = false;
	state.authenticated = true;
	state.email = action.payload.user.email;
	state.name = action.payload.user.name;
	state.errorMessage = "";
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
			return initialState;
		},
		dismissErrors: (state) => {
			return {
				...initialState,
				authenticated: state.authenticated,
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
	},
});

const userReducers = userSlice.reducer;

export default userReducers;
