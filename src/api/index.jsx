export const API_URL = "https://norma.nomoreparties.space/api/";

export const checkResponse = (response) => {
	return response.ok
		? response.json()
		: response.json().then((e) => Promise.reject(e));
};

export const get = (endpoint) => {
	return fetch(`${API_URL}${endpoint}`, { method: "GET" })
		.then(checkResponse)
		.then((data) => {
			if (data?.success) return data.data;
			return Promise.reject(data);
		});
};

export const post = (endpoint, body) => {
	return fetch(`${API_URL}${endpoint}`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: body,
	})
		.then(checkResponse)
		.then((data) => {
			if (data?.success) return data;
			return Promise.reject(data);
		});
};
