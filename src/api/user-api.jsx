import { post } from ".";

const userApi = {
	postOrder: (credentials) => {
		return post("login", JSON.stringify(credentials));
	},
};

export default userApi;
