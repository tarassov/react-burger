import { post } from ".";
const authPath = "auth";
const userApi = {
	login: (credentials) => {
		return post(`${authPath}/login`, JSON.stringify(credentials));
	},
	register: (credentials) => {
		return post(`${authPath}/register`, JSON.stringify(credentials));
	},
};

export default userApi;
