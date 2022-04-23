import { createAction } from "@reduxjs/toolkit";

export const login = createAction("user/login", function prepare(credentials) {
	return {
		payload: credentials,
	};
});

export const logout = createAction("user/logout");
