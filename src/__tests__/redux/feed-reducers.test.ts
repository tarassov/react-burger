import {
	connect,
	connected,
	fetched,
	error,
	closing,
	close,
	fetchOneOrder,
} from "../../services/actions/feed-actions";
import { IFeedState } from "../../services/adapters/feed-adapters";
import {
	feedMockData,
	orderMock1,
	orderMock2,
} from "../../services/model/mock-data/feed-mock";
import feedReducers from "../../services/reducers/feed-reducers";
import { store } from "../../services/store/store";

const initialState: IFeedState = {
	total: 0,
	totalToday: 0,
	connecting: false,
	error: false,
	ids: [],
	entities: {},
};
const loadedState: IFeedState = {
	total: 100,
	totalToday: 2,
	connecting: false,
	error: false,
	ids: ["1", "2"],
	entities: { 1: orderMock1, 2: orderMock2 },
};

describe("redux: feed reducers tests", () => {
	test("Should have correct initial state", () => {
		const state = store.getState().feed;
		expect(state).toEqual(initialState);
	});

	test("Should have correct state after connect", () => {
		expect(feedReducers(initialState, { type: connect.type })).toEqual({
			...initialState,
			connecting: true,
		});
	});
	test("Should have correct state after connected", () => {
		expect(feedReducers(initialState, { type: connected.type })).toEqual(
			initialState
		);
	});
	test("Should have correct state after fetched", () => {
		const action = {
			type: fetched.type,
			payload: {
				orders: feedMockData,
				success: true,
				total: 100,
				totalToday: 2,
			},
		};
		const expectedIds = feedMockData.map((data) => {
			return data.number;
		});
		const newState = feedReducers(initialState, action);
		expect(newState).toEqual(
			expect.objectContaining({ ids: expectedIds, total: 100, totalToday: 2 })
		);
	});
	test("Should have correct state after error", () => {
		expect(feedReducers(initialState, { type: error.type })).toEqual({
			...initialState,
			error: true,
		});
	});
	test("Should have correct state after closing", () =>
		expect(feedReducers(loadedState, { type: closing.type })).toEqual(
			initialState
		));
	test("Should have correct state after close", () =>
		expect(feedReducers(loadedState, { type: close.type })).toEqual(
			initialState
		));
	test("Should have correct state after fetchOne", () => {
		const action = {
			type: fetchOneOrder.fulfilled.type,
			payload: { orders: [orderMock1], success: true },
		};
		const newState = feedReducers(initialState, action);
		expect(newState.ids).toEqual([orderMock1.number]);
	});
});
