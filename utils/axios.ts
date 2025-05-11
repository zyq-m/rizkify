import axios from "axios";
import { getData, storeData } from "./asyncStorage";

export const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const api = axios.create({
	baseURL: BASE_URL,
});

// Handle access token
api.interceptors.request.use(
	async (config) => {
		const accessToken = await getData("accessToken");

		if (accessToken) {
			config.headers["Authorization"] = `Bearer ${accessToken}`;
		}

		return config;
	},
	(error) => {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Handle refreshToken
// Resource: https://www.thedutchlab.com/insights/using-axios-interceptors-for-refreshing-your-api-token
api.interceptors.response.use(
	function (response) {
		return response;
	},
	async function (error) {
		const originalRequest = error.config;
		if (
			originalRequest &&
			error.response.status === 403 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			const newToken = await renewToken();
			// Store access token
			await storeData("accessToken", newToken.data.accessToken);

			axios.defaults.headers.common[
				"Authorization"
			] = `Bearer ${newToken.data.accessToken}`;

			return api(originalRequest);
		}
		return Promise.reject(error);
	}
);

async function renewToken() {
	const refreshToken = await getData("refreshToken");

	return axios({
		url: `${BASE_URL}/api/auth/refresh`,
		method: "POST",
		headers: {
			Authorization: `Bearer ${refreshToken}`,
		},
	});
}

export default api;
