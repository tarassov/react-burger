import { fetchIngredients } from "../../services/actions/ingredients-actions";
import { IIngredientsState } from "../../services/adapters/ingredients-adapters";
import { ingredientsMockList } from "../../services/model/mock-data/ingredient-mock";
import ingredientReducers from "../../services/reducers/ingredients-reducers";
import { store } from "../../services/store/store";

export const initialState: IIngredientsState = {
	loading: false,
	error: false,
	ids: [],
	entities: {},
};

describe("redux: ingredients action and reducers tests", () => {
	test("Should have correct initial state", () => {
		const state = store.getState().ingredients;
		expect(state).toEqual(initialState);
	});

	test("Should have correct state after fetch pending", () => {
		const action = { type: fetchIngredients.pending };
		expect(ingredientReducers(initialState, action)).toEqual({
			...initialState,
			loading: true,
		});
	});

	test("Should have correct state after fetch rejected", () => {
		const action = { type: fetchIngredients.rejected };
		expect(ingredientReducers(initialState, action)).toEqual({
			...initialState,
			error: true,
		});
	});
	test("Should have correct state after fetch fulfilled", () => {
		const action = {
			type: fetchIngredients.fulfilled,
			payload: ingredientsMockList,
		};
		const expectedIds = ingredientsMockList.map((ingredient) => {
			return ingredient._id;
		});
		const newState = ingredientReducers(initialState, action);
		expect(newState.ids).toEqual(expectedIds);
	});
});
