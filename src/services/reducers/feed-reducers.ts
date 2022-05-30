import { createSlice } from "@reduxjs/toolkit";
import { onGet } from "../actions/feed-actions";
import { feedAdapter, initialState } from "../adapters/feed-adapters";

export const feedSlice = createSlice({
	name: "feed",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(onGet, (state, action) => {
			if (action.payload.success) {
				feedAdapter.removeAll(state);
				feedAdapter.upsertMany(state, action.payload.orders);
				state.total = action.payload.total;
				state.totalToday = action.payload.totalToday;
			}
		});
	},
});

const feedReducers = feedSlice.reducer;
export default feedReducers;
