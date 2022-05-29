import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { IOrder } from "../model/types";

export interface IFeedState extends EntityState<IOrder> {
	total: number;
}

export interface IGroupedCart {
	[name: string]: number;
}

export const feedAdapter = createEntityAdapter<IOrder>();

export const initialState = feedAdapter.getInitialState({
	total: 0,
}) as IFeedState;
