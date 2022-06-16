import { IIngredient } from "../types";

export const ingredientBun: IIngredient = {
	_id: "bunid",
	name: "Som bun",
	type: "bun",
	proteins: 0,
	fat: 0,
	carbohydrates: 0,
	calories: 0,
	price: 100,
	image: "",
	image_mobile: "",
	image_large: "",
	__v: 0,
};

export const ingredientSauce: IIngredient = {
	_id: "sauceid",
	name: "Some sauce",
	type: "sauce",
	proteins: 0,
	fat: 0,
	carbohydrates: 0,
	calories: 0,
	price: 100,
	image: "",
	image_mobile: "",
	image_large: "",
	__v: 0,
};

export const ingredientMain: IIngredient = {
	_id: "mainid",
	name: "Some sauce",
	type: "main",
	proteins: 0,
	fat: 0,
	carbohydrates: 0,
	calories: 0,
	price: 100,
	image: "",
	image_mobile: "",
	image_large: "",
	__v: 0,
};

export const ingredientsMockList = [
	ingredientBun,
	ingredientMain,
	ingredientSauce,
];
