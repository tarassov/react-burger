import { createAction } from "@reduxjs/toolkit";

export const fireError = createAction(
	"system/fireError",
	function prepare(message) {
		return {
			payload: message,
		};
	}
);

export const showOrder = createAction(
	"system/showOrder",
	function prepare(visible) {
		return {
			payload: visible,
		};
	}
);
export const hideOrder = createAction("system/hideOrder");

export const closeModal = createAction("system/closeModal");
