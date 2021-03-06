import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { IIngredient } from "../model/types";
import { RootState } from "../store/store";

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
} = ingredientsAdapter.getSelectors<RootState>((state) => state.ingredients);
