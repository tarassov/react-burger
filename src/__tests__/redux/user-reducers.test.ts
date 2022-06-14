import { AnyAction } from "@reduxjs/toolkit";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
	login,
	logout,
	authenticate,
} from "../../services/actions/user-actions";
import { store } from "../../services/store/store";
import MockAdapter from "axios-mock-adapter";
import userReducers from "../../services/reducers/user-reducers";
import instance from "../../api";

let axiosMock: MockAdapter;

const mockEmail = "test@test.com";
const mockName = "john smith";
const mockPassword = "123456789abcdef";
const loginFail = "email or password are incorrect";

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
const loggedState = {
	authenticated: true,
	pendingAuthentication: false,
	userLoaded: true,
	error: false,
	pending: false,
	email: mockEmail,
	name: mockName,
	errorMessage: "",
};

describe("redux: user action and reducers tests", () => {
	beforeEach(() => {
		axiosMock = new MockAdapter(instance);
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
					email: mockEmail,
					password: mockPassword,
				}) as unknown as AnyAction
			)
			.then(() => {
				expect(store.getActions()).toEqual(
					expect.arrayContaining(expectedActions)
				);
			});
	});

	test("Should be correct state after login", () => {
		const loginAction = {
			type: login.fulfilled.type,
			payload: {
				user: {
					email: mockEmail,
					name: mockName,
				},
				accessToken: "accessToken",
				refreshToken: "refreshToken",
			},
		};
		expect(userReducers(initialState, loginAction)).toEqual({
			...initialState,
			name: mockName,
			email: mockEmail,
			userLoaded: true,
			pendingAuthentication: false,
			authenticated: true,
		});
	});

	test("Should be correct state after logout", () => {
		expect(userReducers(loggedState, logout.fulfilled)).toEqual({
			...initialState,
			pendingAuthentication: false,
		});
	});

	test("Should be correct state after successful authenticate", () => {
		expect(userReducers(initialState, authenticate(true))).toEqual({
			...initialState,
			pendingAuthentication: false,
			authenticated: true,
		});
	});

	test("Should create login actions login fails", () => {
		axiosMock.onPost("/auth/login").reply(401, {
			success: false,
			message: loginFail,
		});
		const store = mockStore(initialState);

		const expectedActions = [
			expect.objectContaining({ type: login.pending.type }),
			expect.objectContaining({
				type: login.rejected.type,
				error: {
					message: loginFail,
				},
			}),
		];

		store
			.dispatch(
				login({
					email: mockEmail,
					password: mockPassword,
				}) as unknown as AnyAction
			)
			.then(() => {
				expect(store.getActions()).toEqual(
					expect.arrayContaining(expectedActions)
				);
			});
	});

	test("Should be correct state after login fails", () => {
		const loginFailAction = {
			type: login.rejected.type,
			error: {
				message: loginFail,
			},
		};
		expect(userReducers(initialState, loginFailAction)).toEqual({
			...initialState,
			error: true,
			pending: false,
			pendingAuthentication: false,
			errorMessage: loginFail,
		});
	});
});
