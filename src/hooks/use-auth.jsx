import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
	login,
	logout,
	register as registerAction,
	dismissErrors as dismissErrorsAction,
	token,
	authenticated,
} from "../services/actions/user-actions";
import { useStorage } from "./use-storage";

export function useAuth() {
	const dispatch = useDispatch();
	const user = useSelector((store) => store.user);
	const [storedValue, setValue] = useStorage("refreshToken", null);

	const dismissErrors = () => {
		if (user.error) dispatch(dismissErrorsAction());
	};

	const signIn = async (credentials) => {
		dispatch(login(credentials))
			.then(unwrapResult)
			.then((result) => {
				setValue(result.refreshToken);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const signOut = async () => {
		dispatch(logout());
		setValue(null);
	};

	const register = async (credentials) => {
		dispatch(registerAction(credentials))
			.then(unwrapResult)
			.then((result) => {
				setValue(result.refreshToken);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const secureDispatch = async (action, payload) => {
		refreshToken()
			.then((result) => {
				setValue(result.refreshToken);
				dispatch(action({ ...payload, token: result.accessToken }));
			})
			.catch((e) => {
				Promise.reject(e);
			});
	};
	const refreshToken = () => {
		if (user.accessToken && user.accessTokenExpire > Date.now()) {
			return new Promise((resolve) =>
				resolve({ refreshToken: storedValue, accessToken: user.accessToken })
			);
		} else {
			return dispatch(token(storedValue))
				.then(unwrapResult)
				.catch((e) => {
					Promise.reject(e);
				});
		}
	};

	const checkAuth = async () => {
		if (storedValue) {
			dispatch(authenticated());
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
