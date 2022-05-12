import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface IIngredient {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
}

export interface IIngredientsState extends EntityState<IIngredient> {
	loading: boolean;
	error: boolean;
}

export const ingredientsAdapter = createEntityAdapter<IIngredient>({
	selectId: (ingredient) => ingredient._id,
});

export const initialState = ingredientsAdapter.getInitialState({
	loading: false,
	error: false,
}) as IIngredientsState;

export const {
	selectAll: selectAllIngredients,
	selectById: selectIngredientById,
} = ingredientsAdapter.getSelectors((state: RootState) => state.ingredients);
