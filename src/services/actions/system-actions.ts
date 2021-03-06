import { createAction } from "@reduxjs/toolkit";

export const fireError = createAction<string>("system/fireError");

export const closeModal = createAction("system/closeModal");

export const loading = createAction("system/loading");
export const loaded = createAction("system/loaded");
