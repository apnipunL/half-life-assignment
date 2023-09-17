import axios from 'axios'
import {getLoggedUserAccessToken} from "../util/local-storage-util";
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000'
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = getLoggedUserAccessToken();
        if (accessToken) {
            if (config.headers) config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
