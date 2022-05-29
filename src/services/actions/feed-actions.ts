import { createAction } from "@reduxjs/toolkit";

export const startWs = createAction("feed/startWs");

export const onError = createAction<Event>("feed/onError");

export const onOpen = createAction("feed/onOpen");

export const onGet = createAction<any>("feed/onGet");

export const onClose = createAction<Event>("feed/onClose");
