const API_URL = "https://norma.nomoreparties.space/api/";

const ingredientsApi = {
	async fetchAll() {
		fetch(`${API_URL}/ingredients`, { method: "GET" })
			.then((response) => {
				if (!response.ok) {
					return Promise.reject(response.status);
				}
				return response.json();
			})
			.catch((e) => console.log(e));
	},
};

export default ingredientsApi;
