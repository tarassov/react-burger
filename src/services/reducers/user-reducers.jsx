import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	loggedIn: false,
};
export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state) => {
			state.loggedIn = true;
		},
		logout: (state) => {
			state.loggedIn = true;
		},
	},
	extraReducers: {},
});

const userReducers = userSlice.reducer;

export default userReducers;
