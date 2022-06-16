import axios, { AxiosError, AxiosResponse } from "axios";
export const BASE_URL = "https://norma.nomoreparties.space/api/";
axios.defaults.baseURL = BASE_URL;

const instance = axios.create({
	baseURL: BASE_URL,
});

const checkSuccess = (response: AxiosResponse) => {
	return response.data?.success ? response.data : Promise.reject(response.data);
};

const handleErrors = (e: AxiosError) => {
	if (e.response) {
		if (e.response.status === 404) {
			throw "not found";
		} else {
			throw e.response?.data;
		}
	} else {
		throw "Unknown error";
	}
};

export const get = <ResponseType>(
	endpoint: string,
	token?: string
): Promise<ResponseType> => {
	return instance
		.get<ResponseType>(endpoint, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
		})
		.then(checkSuccess)
		.catch(handleErrors);
};

export const post = <RequestType, ResponseType>(
	endpoint: string,
	body: RequestType,
	token?: string
): Promise<ResponseType> => {
	return instance
		.post<ResponseType>(endpoint, JSON.stringify(body), {
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
		})
		.then(checkSuccess)
		.catch(handleErrors);
};

export const patch = <RequestType, ResponseType>(
	endpoint: string,
	body: RequestType,
	token?: string
): Promise<ResponseType> => {
	return instance
		.patch<ResponseType>(endpoint, JSON.stringify(body), {
			headers: {
				"Content-Type": "application/json",
				Authorization: token ? `Bearer ${token}` : "",
			},
		})
		.then(checkSuccess)
		.catch(handleErrors);
};

export default instance;
