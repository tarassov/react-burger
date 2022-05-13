import { AsyncThunk, SerializedError, unwrapResult } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IReposnse } from "../api";
import { ILoginRequest, IRegisterRequest } from "../api/user/user-api.d";
import {
	login,
	logout,
	register as registerAction,
	dismissErrors as dismissErrorsAction,
	token,
	authenticate,
} from "../services/actions/user-actions";
import { RootState, useAppDispatch } from "../services/store/store";
import { useStorage } from "./use-storage";

export function useAuth() {
	const dispatch = useAppDispatch();
	const user = useSelector((store: RootState) => store.user);
	const [savedToken, setSavedToken] = useStorage("refreshToken", "");
	const navigate = useNavigate();
	const dismissErrors = () => {
		if (user.error) dispatch(dismissErrorsAction());
	};

	const signIn = async (credentials: ILoginRequest) => {
		return dispatch(login(credentials))
			.then(unwrapResult)
			.then((result) => {
				setSavedToken(result.refreshToken);
			})
			.catch((e) => console.log(e));
	};

	const signOut = async () => {
		setSavedToken("");
		dispatch(logout(savedToken));
	};

	const register = async (credentials: IRegisterRequest) => {
		return dispatch(registerAction(credentials))
			.then(unwrapResult)
			.then((result) => {
				() => {
					setSavedToken(result.refreshToken);
				};
			})
			.catch((e) => console.log(e.message));
	};

	const secureDispatch = async <PayloadType, T extends IReposnse>(
		action: AsyncThunk<T, PayloadType, object>,
		payload: PayloadType,
		forceRefresh = false
	) => {
		return refreshToken(forceRefresh)
			.then((result) => {
				if (result.error) {
					navigate("/login");
				} else {
					if (result.refreshToken) setSavedToken(result.refreshToken);
					dispatch(
						action({
							...payload,
							token: result.accessToken,
						})
					)
						.then(unwrapResult)
						.catch((res: SerializedError) => {
							if (res?.message === "jwt expired" && !forceRefresh) {
								secureDispatch(action, payload, true);
							}
						});
				}
			})
			.catch((e) => console.log(e));
	};
	const refreshToken = async (forceRefresh: boolean) => {
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
