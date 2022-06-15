import { add, remove } from "../../services/actions/elements-actions";
import { initialState } from "../../services/adapters/elements-adapters";
import {
	ingredientBun,
	ingredientMain,
} from "../../services/model/mock-data/ingredient-mock";
import { IIngredient } from "../../services/model/types";
import elementsReducers from "../../services/reducers/elements-reducers";
import { store } from "../../services/store/store";

const testElement: IIngredient & { id: string } = {
	...ingredientMain,
	id: "elementid", //generated id
};
const bunElement = {
	...ingredientBun,
	id: "elementbunid",
};

const stateWithElements = {
	...initialState,
	ids: [testElement.id, "bun"],
	entities: {
		[testElement.id]: { ...testElement, sortIndex: 1 },
		bun: { ...testElement, id: "bun", sortIndex: 0 },
	},
};
const addAction = { type: add.type, payload: testElement };

describe("redux: burger elements action and reducers tests", () => {
	test("Should have correct initial state", () => {
		const state = store.getState().elements;
		expect(state).toEqual(initialState);
	});

	test("Should add burger element to store", () => {
		const newState = elementsReducers(initialState, addAction);
		expect(newState.ids.length).toEqual(1);
		expect(newState.entities[testElement.id]?.name).toEqual(testElement.name);
	});

	test("Should add burger bun element to the top of the list", () => {
		const addBunAction = {
			type: add.type,
			payload: bunElement,
		};
		elementsReducers(initialState, addAction);
		const newState = elementsReducers(initialState, addBunAction);
		expect(newState.entities[bunElement.id]?.sortIndex).toEqual(0);
	});

	test("Should remove element from the constructor", () => {
		const removeAction = {
			type: remove.type,
			payload: testElement.id,
		};
		const newState = elementsReducers(stateWithElements, removeAction);
		expect(newState.ids.length).toEqual(stateWithElements.ids.length - 1);
	});

	test.todo("Should replace bun element with other bun");
});
