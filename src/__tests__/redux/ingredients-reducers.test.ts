import { initialState } from "../../services/adapters/ingredients-adapters";
import { store } from "../../services/store/store";

describe("redux: ingredients action and reducers tests", () => {
	test("Should have correct initial state", () => {
		const state = store.getState().ingredients;
		expect(state).toEqual(initialState);
	});

	test.todo("Should have correct state after fetch pending");
	test.todo("Should have correct state after fetch rejected");
	test.todo("Should have correct state after fetch fulfilled");
});
