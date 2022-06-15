import { initialState } from "../../services/adapters/feed-adapters";
import { store } from "../../services/store/store";

describe("redux: feed reducers tests", () => {
	test("Should have correct initial state", () => {
		const state = store.getState().feed;
		expect(state).toEqual(initialState);
	});

	test.todo("Should have correct state after connec");
	test.todo("Should have correct state after connected");
	test.todo("Should have correct state after fetched");
	test.todo("Should have correct state after error");
	test.todo("Should have correct state after closing");
	test.todo("Should have correct state after close");
	test.todo("Should have correct state after fetchOne");
});
