import { API_URL } from ".";

const checkResponse = (response) => {
	return response.ok
		? response.json()
		: response.json().then((e) => Promise.reject(e));
};

const elementsApi = {
	postOrder: (ids) => {
		return fetch(`${API_URL}orders`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ingredients: ids }),
		})
			.then(checkResponse)
			.then((data) => {
				if (data?.success) return data;
				return Promise.reject(data);
			});
	},
};

export default elementsApi;
