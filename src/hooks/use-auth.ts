import { AsyncThunk, SerializedError, unwrapResult } from "@reduxjs/toolkit";

import { useNavigate } from "react-router-dom";
import { IReposnse, ILoginRequest, IRegisterRequest } from "../api/types";
import { fireError } from "../services/actions/system-actions";
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

const MAX_RETRY_NUMBER = 3;

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

	const saveTokens = (result: {
		refreshToken: string;
		accessToken: string;
	}) => {
		setSavedToken(result.refreshToken);
		if (result.accessToken) {
			setAccessToken(result.accessToken.replace("Bearer ", ""));
			setAccessTokenExpire(Date.now() + 600000);
		}
	};

	const signIn = async (credentials: ILoginRequest) => {
		return dispatch(login(credentials))
			.then(unwrapResult)
			.then(saveTokens)
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
			.then(saveTokens)
			.catch((e: SerializedError) => console.log(e.message));
	};

	const secureDispatch = async <PayloadType, T extends IReposnse>(
		action: AsyncThunk<T, PayloadType, object>,
		payload: PayloadType,
		forceRefresh = false,
		retry = 0
	) => {
		return refreshToken(forceRefresh)
			.then((result) => {
				if (result.error) {
					saveTokens(result);
					dispatch(authenticate(false));
					navigate("/login");
				} else {
					saveTokens(result);
					dispatch(
						action({
							...payload,
							token: accessToken(),
						})
					)
						.then(unwrapResult)
						.catch((res: SerializedError) => {
							if (
								res?.message === "jwt expired" ||
								res?.message === "invalid token" ||
								res?.message === "jwt malformed" ||
								res?.message === "invalid signature"
							) {
								if (retry < MAX_RETRY_NUMBER) {
									retry++;
									secureDispatch(action, payload, true, retry);
								} else {
									dispatch(fireError("Галактический сбой"));
								}
							} else {
								dispatch(fireError("Галактический сбой"));
							}
						});
				}
			})
			.catch((e) => console.log(e));
	};
	const refreshToken = async (
		forceRefresh: boolean
	): Promise<{
		error?: boolean;
		refreshToken: string;
		accessToken: string;
	}> => {
		if (!savedToken())
			return { error: true, refreshToken: "", accessToken: "" };
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
					return { error: true, refreshToken: "", accessToken: "" };
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
						saveTokens(result);
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
