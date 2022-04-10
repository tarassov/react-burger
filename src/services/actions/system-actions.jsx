import { createAction } from "@reduxjs/toolkit";

export const fireError = createAction(
	"system/fireError",
	function prepare(message) {
		return {
			payload: message,
		};
	}
);

export const closeModal = createAction("system/closeModal");
