export const API_URL = "https://norma.nomoreparties.space/api/";

const checkResponse = (response) => {
	return response.ok
		? response.json()
		: response.status === 404
		? Promise.reject("not found")
		: response.json().then((e) => Promise.reject(e));
};

const checkSuccess = (data) => {
	return data?.success ? data : Promise.reject(data);
};

export const get = (endpoint) => {
	return fetch(`${API_URL}${endpoint}`, { method: "GET" })
		.then(checkResponse)
		.then(checkSuccess);
};

export const post = (endpoint, body) => {
	return fetch(`${API_URL}${endpoint}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: body,
	})
		.then(checkResponse)
		.then(checkSuccess);
};
