import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000'
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = JSON.parse(localStorage.getItem("access_token"));
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
