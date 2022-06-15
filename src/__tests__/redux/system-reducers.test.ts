import { isFulfilled } from "@reduxjs/toolkit";
import { fetchIngredients } from "../../services/actions/ingredients-actions";
import { postOrder } from "../../services/actions/orders-actions";
import { loaded, loading } from "../../services/actions/system-actions";
import systemReducers, {
	initialState,
} from "../../services/reducers/system-reducers";
import { store } from "../../services/store/store";

describe("redux: system reducers tests", () => {
	test("Should have correct initial state", () => {
		const state = store.getState().system;
		expect(state).toEqual(initialState);
	});

	test("Should have loading state when loading", () => {
		expect(systemReducers(initialState, { type: loading.type })).toEqual({
			...initialState,
			loading: true,
		});
	});
	test("Should have not have loading state when loaded", () => {
		expect(systemReducers(initialState, { type: loaded.type })).toEqual({
			...initialState,
			loading: false,
		});
	});

	test("Should have correct state after order post fulfilled", () => {
		expect(
			systemReducers(initialState, { type: postOrder.fulfilled.type })
		).toEqual({ ...initialState, loading: false, orderModal: true });
	});
});
