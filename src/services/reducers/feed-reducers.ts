import { createSlice } from "@reduxjs/toolkit";
import { fetched, error, connect, connected } from "../actions/feed-actions";
import { feedAdapter, initialState } from "../adapters/feed-adapters";

export const feedSlice = createSlice({
	name: "feed",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(connect, (state) => {
			state.connecting = true;
			state.error = false;
		});
		builder.addCase(connected, (state) => {
			state.connecting = false;
			state.error = false;
		});
		builder.addCase(fetched, (state, action) => {
			if (action.payload.success) {
				feedAdapter.removeAll(state);
				feedAdapter.upsertMany(state, action.payload.orders);
				state.total = action.payload.total;
				state.totalToday = action.payload.totalToday;
				state.connecting = false;
				state.error = false;
			} else {
				state.error = false;
			}
		});
		builder.addCase(error, (state) => {
			state.error = true;
		});
	},
});

const feedReducers = feedSlice.reducer;
export default feedReducers;
