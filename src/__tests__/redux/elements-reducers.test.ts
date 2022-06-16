import { add, remove, update } from "../../services/actions/elements-actions";
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
const testElement2: IIngredient & { id: string } = {
	...ingredientMain,
	id: "elementid2", //generated id
};
const bunElement = {
	...ingredientBun,
	id: "bun",
};

const bunElement2 = {
	...ingredientBun,
	id: "bun",
};

const stateWithElements = {
	...initialState,
	ids: [testElement.id, bunElement.id],
	entities: {
		[bunElement.id]: { ...bunElement, sortIndex: 0 },
		[testElement.id]: { ...testElement, sortIndex: 1 },
		[testElement2.id]: { ...testElement2, sortIndex: 2 },
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

	test("Should replace bunElement1 with bunElement2", () => {
		const addBunAction = {
			type: add.type,
			payload: bunElement2,
		};
		const newState = elementsReducers(stateWithElements, addBunAction);
		expect(newState.ids.length).toEqual(stateWithElements.ids.length);
		expect(newState.entities["bun"]).toEqual({ ...bunElement2, sortIndex: 0 });
	});

	test("Should update sortIndex", () => {
		const action = {
			type: update.type,
			payload: [
				{ ...testElement, sortIndex: 2 },
				{ ...testElement2, sortIndex: 1 },
			],
		};

		const newState = elementsReducers(stateWithElements, action);
		expect(newState.entities[testElement.id]?.sortIndex).toEqual(2);
		expect(newState.entities[testElement2.id]?.sortIndex).toEqual(1);
	});
});
