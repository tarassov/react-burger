import axios, { AxiosResponse } from "axios";

//export const API_URL = "https://norma.nomoreparties.space/api/";
axios.defaults.baseURL = "https://norma.nomoreparties.space/api/";
//axios.defaults.headers;

export interface IReposnse {
	success: boolean;
}
export interface IFetchArray<T> extends IReposnse {
	data: Array<T>;
}

const checkSuccess = (response: AxiosResponse) => {
	return response.data?.success ? response.data : Promise.reject(response.data); //todo обрабатывать тут ошибку и передавть в thunk и там вызвать thunkAPI.rejectWithValue
};

export const get = <ResponseType,>(
	endpoint: string,
	token?: string
): Promise<ResponseType> => {
	return axios
		.get<ResponseType>(endpoint, {
			headers: {
				"Content-Type": "application/json",
				Authorization: token || "",
			},
		})
		.then(checkSuccess);
};

export const post = <RequestType, ResponseType>(
	endpoint: string,
	body: RequestType,
	token?: string
): Promise<ResponseType> => {
	return axios
		.post<ResponseType>(endpoint, JSON.stringify(body), {
			headers: {
				"Content-Type": "application/json",
				Authorization: token || "",
			},
		})
		.then(checkSuccess);
};

export const patch = <RequestType, ResponseType>(
	endpoint: string,
	body: RequestType,
	token?: string
): Promise<ResponseType> => {
	return axios
		.patch<ResponseType>(endpoint, JSON.stringify(body), {
			headers: {
				"Content-Type": "application/json",
				Authorization: token || "",
			},
		})
		.then(checkSuccess);
};
