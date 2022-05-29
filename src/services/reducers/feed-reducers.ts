import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../adapters/feed-adapters";

export const feedSlice = createSlice({
	name: "feed",
	initialState,
	reducers: {
		onGet: (state, action) => {
			console.log(action.payload);
		},
	},
	extraReducers: {},
});

const feedReducers = feedSlice.reducer;
export default feedReducers;
