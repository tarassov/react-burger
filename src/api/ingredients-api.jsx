import { API_URL } from ".";

const checkResponse = (response) => {
	return response.ok
		? response.json()
		: response.json().then((e) => Promise.reject(e));
};

const ingredientsApi = {
	fetchAll: () => {
		return fetch(`${API_URL}ingredients`, { method: "GET" })
			.then(checkResponse)
			.then((data) => {
				if (data?.success) return data.data;
				return Promise.reject(data);
			});
	},
};

export default ingredientsApi;
