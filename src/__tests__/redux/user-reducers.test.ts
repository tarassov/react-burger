import { AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { login } from "../../services/actions/user-actions";
import { store } from "../../services/store/store";
import MockAdapter from "axios-mock-adapter";

const axiosMock = new MockAdapter(axios);

const mockStore = configureMockStore([thunk]);

const initialState = {
	authenticated: false,
	pendingAuthentication: true,
	userLoaded: false,
	error: false,
	pending: false,
	email: "",
	name: "",
	errorMessage: "",
};

describe("redux user test ", () => {
	beforeEach(() => {
		axiosMock.onPost("/auth/login").reply(200, {
			success: true,
			accessToken: "accessToken",
			refresToken: "refreshToken",
		});
	});

	afterEach(() => {
		axiosMock.restore();
	});

	test("Should return the initial state", () => {
		const state = store.getState().user;
		expect(state).toEqual(initialState);
	});

	test("Should create login actions", () => {
		const store = mockStore(initialState);

		const expectedActions = [
			expect.objectContaining({ type: login.pending.type }),
			expect.objectContaining({
				type: login.fulfilled.type,
				payload: {
					success: true,
					accessToken: "accessToken",
					refresToken: "refreshToken",
				},
			}),
		];

		store
			.dispatch(
				login({
					email: "test@example.com",
					password: "123456789abcdef",
				}) as unknown as AnyAction
			)
			.then(() => {
				expect(store.getActions()).toEqual(
					expect.arrayContaining(expectedActions)
				);
			});
	});
});
