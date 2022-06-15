import { postOrder } from "../../services/actions/orders-actions";
import orderReducers, {
	initialState,
} from "../../services/reducers/order-reducers";
import { store } from "../../services/store/store";

describe("redux: post order actions and reducers tests", () => {
	test("Should have correct initial state", () => {
		const state = store.getState().order;
		expect(state).toEqual(initialState);
	});

	test("Should have correct state after postOrder pending", () => {
		const action = { type: postOrder.pending.type };
		expect(orderReducers(initialState, action)).toEqual({
			...initialState,
			posting: true,
		});
	});
	test("Should have correct state after postOrder rejected", () => {
		const action = {
			type: postOrder.rejected.type,
			error: { message: "some error" },
		};
		expect(orderReducers(initialState, action)).toEqual({
			...initialState,
			error: true,
			errorMessage: "some error",
		});
	});
	test("Should have correct state after postOrder fulfilled", () => {
		const action = {
			type: postOrder.fulfilled.type,
			payload: { order: { number: 1 } },
		};
		expect(orderReducers(initialState, action)).toEqual({
			...initialState,
			orderNumber: 1,
		});
	});
});
