import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
	const navigate = useNavigate();
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

	const secureDispatch = async (action, payload, forceRefresh = false) => {
		return refreshToken(forceRefresh)
			.then((result) => {
				if (result.error) {
					navigate("login");
				} else {
					setSavedToken(result.refreshToken);
					dispatch(action({ ...payload, token: result.accessToken })).then(
						(res) => {
							if (res?.error?.message === "jwt expired" && !forceRefresh) {
								secureDispatch(action, payload, true);
							}
						}
					);
				}
			})
			.catch((e) => console.log(e));
	};
	const refreshToken = async (forceRefresh) => {
		if (!savedToken) return { error: true };

		if (
			user.accessToken &&
			user.accessTokenExpire > Date.now() &&
			!forceRefresh
		) {
			return {
				refreshToken: savedToken,
				accessToken: user.accessToken,
			};
		} else {
			return dispatch(token(savedToken))
				.then(unwrapResult)
				.catch(() => {
					return { error: true };
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
