import { AsyncThunk, SerializedError, unwrapResult } from "@reduxjs/toolkit";

import { useNavigate } from "react-router-dom";
import { IReposnse, ILoginRequest, IRegisterRequest } from "../api/types";
import {
	login,
	logout,
	register as registerAction,
	dismissErrors as dismissErrorsAction,
	token,
	authenticate,
} from "../services/actions/user-actions";
import { useAppDispatch, useAppSelector } from "../services/store/store";
import { useStorage } from "./use-storage";

export function useAuth() {
	const dispatch = useAppDispatch();
	const user = useAppSelector((store) => store.user);
	const [savedToken, setSavedToken] = useStorage<string>("refreshToken", "");
	const [accessToken, setAccessToken] = useStorage<string>("accessToken", "");
	const [accessTokenExpire, setAccessTokenExpire] = useStorage<number>(
		"accessTokenExpire",
		0
	);
	const navigate = useNavigate();
	const dismissErrors = () => {
		if (user.error) dispatch(dismissErrorsAction());
	};

	const signIn = async (credentials: ILoginRequest) => {
		return dispatch(login(credentials))
			.then(unwrapResult)
			.then((result) => {
				setSavedToken(result.refreshToken);
				if (result.accessToken) {
					setAccessToken(result.accessToken.replace("Bearer ", ""));
					setAccessTokenExpire(Date.now() + 600000);
				}
			})
			.catch((e: SerializedError) => console.log(e));
	};

	const signOut = async () => {
		dispatch(logout(savedToken()));
		setSavedToken("");
		setAccessToken("");
		setAccessTokenExpire(0);
	};

	const register = async (credentials: IRegisterRequest) => {
		return dispatch(registerAction(credentials))
			.then(unwrapResult)
			.then((result) => {
				() => {
					setSavedToken(result.refreshToken);
				};
			})
			.catch((e: SerializedError) => console.log(e.message));
	};

	const secureDispatch = async <PayloadType, T extends IReposnse>(
		action: AsyncThunk<T, PayloadType, object>,
		payload: PayloadType,
		forceRefresh = false
	) => {
		return refreshToken(forceRefresh)
			.then((result) => {
				if (result.error) {
					setSavedToken("");
					dispatch(authenticate(false));
					navigate("/login");
				} else {
					if (result.refreshToken) setSavedToken(result.refreshToken);
					if (result.accessToken) {
						setAccessToken(result.accessToken.replace("Bearer ", ""));
						setAccessTokenExpire(Date.now() + 600000);
					}
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
		if (!savedToken()) return { error: true };
		const currentToken = accessToken();

		if (accessToken() && accessTokenExpire() > Date.now() && !forceRefresh) {
			return {
				refreshToken: savedToken(),
				accessToken: currentToken,
			};
		} else {
			return dispatch(token(savedToken()))
				.then(unwrapResult)
				.catch(() => {
					return { error: true };
				});
		}
	};

	const checkAuth = async () => {
		if (savedToken()) {
			dispatch(authenticate(true));
			if (accessToken()) {
				refreshToken(false).then((result) => {
					if (result.error) {
						setSavedToken("");
						dispatch(authenticate(false));
						navigate("/login");
					} else {
						if (result.refreshToken) setSavedToken(result.refreshToken);
						if (result.accessToken) {
							setAccessToken(result.accessToken.replace("Bearer ", ""));
							setAccessTokenExpire(Date.now() + 600000);
						}
					}
				});
			}
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
		accessToken,
	};
}
