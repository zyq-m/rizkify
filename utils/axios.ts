import axios from 'axios';
import { setItem, getItem } from 'expo-secure-store';

export const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const api = axios.create({
  baseURL: BASE_URL,
});

// Handle access token
api.interceptors.request.use(
  (config) => {
    const accessToken = getItem('accessToken');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Handle refreshToken
// Resource: https://www.thedutchlab.com/insights/using-axios-interceptors-for-refreshing-your-api-token
api.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await renewToken();
      // Store access token
      setItem('accessToken', newToken.data.accessToken);

      axios.defaults.headers.common['Authorization'] =
        `Bearer ${newToken.data.accessToken}`;

      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);

async function renewToken() {
  const refreshToken = getItem('refreshToken');

  return axios({
    url: `${BASE_URL}/auth/refresh`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
}

export default api;
