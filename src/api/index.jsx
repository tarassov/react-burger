import axios from "axios";

export const API_URL = "https://norma.nomoreparties.space/api/";

const checkSuccess = (response) => {
	return response.data?.success ? response.data : Promise.reject(response.data);
};

export const get = (endpoint, token = undefined) => {
	return axios(`${API_URL}${endpoint}`, {
		method: "GET",
		headers: { "Content-Type": "application/json", Authorization: token },
	}).then(checkSuccess);
};

export const post = (endpoint, body, token = undefined) => {
	return axios(`${API_URL}${endpoint}`, {
		method: "POST",
		headers: { "Content-Type": "application/json", Authorization: token },
		data: body,
	}).then(checkSuccess);
};
export const patch = (endpoint, body, token = undefined) => {
	return axios(`${API_URL}${endpoint}`, {
		method: "PATCH",
		headers: { "Content-Type": "application/json", Authorization: token },
		data: body,
	}).then(checkSuccess);
};
