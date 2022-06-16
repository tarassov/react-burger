import { IFeedOrder } from "../../adapters/feed-adapters";

export const orderMock1: IFeedOrder = {
	_id: "1",
	number: 112,
	createdAt: "",
	ingredients: [],
	name: "",
	price: 0,
	status: "done",
};

export const orderMock2: IFeedOrder = {
	_id: "2",
	number: 113,
	createdAt: "",
	ingredients: [],
	name: "",
	price: 0,
	status: "done",
};

export const feedMockData = [orderMock1, orderMock2];
