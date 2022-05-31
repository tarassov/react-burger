import { createEntityAdapter, EntityState } from "@reduxjs/toolkit";
import { TOrderStatus } from "../model/types";
import { RootState } from "../store/store";
export interface IFeedOrder {
	_id: string;
	number: number;
	createdAt: string;
	ingredients: string[];
	name: string;
	price: number;
	status: TOrderStatus;
	updatedAt?: string;
}

export interface IFeedState extends EntityState<IFeedOrder> {
	total: number;
	totalToday: number;
	connecting: boolean;
	error: boolean;
}

export const feedAdapter = createEntityAdapter<IFeedOrder>({
	selectId: (order) => order._id,
});

export const initialState = feedAdapter.getInitialState({
	total: 0,
	totalToday: 0,
}) as IFeedState;

export const { selectAll: selectAllOrders, selectById: selectOrderById } =
	feedAdapter.getSelectors((state: RootState) => state.feed);
