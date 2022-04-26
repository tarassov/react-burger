import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
	login,
	logout,
	register as registerAction,
	dismissErrors as dismissErrorsAction,
	token,
	authenticate,
} from "../services/actions/user-actions";
import { useStorage } from "./use-storage";

export function useAuth() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const [savedToken, setSavedToken] = useStorage("refreshToken", null);

	const dismissErrors = () => {
		if (user.error) dispatch(dismissErrorsAction());
	};

	const signIn = async (credentials) => {
		return dispatch(login(credentials))
			.then(unwrapResult)
			.then((result) => {
				setSavedToken(result.refreshToken);
			});
	};

	const signOut = async () => {
		dispatch(logout());
		setSavedToken(null);
	};

	const register = async (credentials) => {
		return dispatch(registerAction(credentials))
			.then(unwrapResult)
			.then((result) => {
				setSavedToken(result.refreshToken);
			});
	};

	const secureDispatch = async (action, payload) => {
		return refreshToken().then((result) => {
			setSavedToken(result.refreshToken);
			dispatch(action({ ...payload, token: result.accessToken }));
		});
	};
	const refreshToken = () => {
		if (user.accessToken && user.accessTokenExpire > Date.now()) {
			return new Promise((resolve) =>
				resolve({ refreshToken: savedToken, accessToken: user.accessToken })
			);
		} else {
			return dispatch(token(savedToken))
				.then(unwrapResult)
				.catch((e) => {
					Promise.reject(e);
				});
		}
	};

	const checkAuth = async () => {
		if (savedToken) {
			dispatch(authenticate(true));
		} else {
			dispatch(authenticate(false));
		}
	};

	return {
		user,
		checkAuth,
		signIn,
		signOut,
		register,
		dismissErrors,
		secureDispatch,
	};
}
