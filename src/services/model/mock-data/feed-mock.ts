import { IFeedOrder } from "../../adapters/feed-adapters";

const orderMock1: IFeedOrder = {
	_id: "1",
	number: 0,
	createdAt: "",
	ingredients: [],
	name: "",
	price: 0,
	status: "done",
};

const orderMock2: IFeedOrder = {
	_id: "2",
	number: 0,
	createdAt: "",
	ingredients: [],
	name: "",
	price: 0,
	status: "done",
};

export const feedMockData = [orderMock1, orderMock2];
