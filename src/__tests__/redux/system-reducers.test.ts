import { postOrder } from "../../services/actions/orders-actions";
import {
	closeModal,
	fireError,
	loaded,
	loading,
} from "../../services/actions/system-actions";
import systemReducers, {
	ISystemState,
} from "../../services/reducers/system-reducers";
import { store } from "../../services/store/store";

export const initialState: ISystemState = {
	error: false,
	errorMessage: "",
	orderModal: false,
	ingredientModal: false,
	loading: false,
};
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

	test("Should have correct state when loaded", () => {
		expect(systemReducers(initialState, { type: loaded.type })).toEqual({
			...initialState,
			loading: false,
		});
	});

	test("Should have correct state after close modal", () => {
		expect(
			systemReducers(
				{ ...initialState, orderModal: true },
				{ type: closeModal.type }
			)
		).toEqual({
			...initialState,
			orderModal: false,
			ingredientModal: false,
		});
	});

	test("Should have not have loading state when loaded", () => {
		expect(
			systemReducers(initialState, { type: fireError.type, payload: "error" })
		).toEqual({
			...initialState,
			error: true,
			errorMessage: "error",
		});
	});

	test("Should have correct state after order post fulfilled", () => {
		expect(
			systemReducers(initialState, { type: postOrder.fulfilled.type })
		).toEqual({ ...initialState, loading: false, orderModal: true });
	});
});
