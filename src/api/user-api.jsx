import { patch, post, get } from ".";
const authPath = "auth";
const userApi = {
	login: (credentials) => {
		return post(`${authPath}/login`, JSON.stringify(credentials));
	},
	register: (credentials) => {
		return post(`${authPath}/register`, JSON.stringify(credentials));
	},
	token: (refreshToken) => {
		return post(
			`${authPath}/token`,
			JSON.stringify({ token: `${refreshToken}` })
		);
	},
	update: (data, token) => {
		return patch(`${authPath}/user`, JSON.stringify(data), token);
	},
	getUser: (token) => {
		return get(`${authPath}/user`, token);
	},
};

export default userApi;
