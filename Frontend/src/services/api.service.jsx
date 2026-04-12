import axios from 'axios';

const BASE_URL = "https://blog-app-seven-neon.vercel.app/api/v1"

const api = axios.create({
    baseURL: BASE_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const res = await axios.post(
                    `${BASE_URL}/auth/refresh-token`,
                    { refreshToken }
                );
                const { accessToken, refreshToken: newRefreshToken } = res.data.data;
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', newRefreshToken);
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch {
                localStorage.clear();
                window.location.href = '/auth';
            }
        }
        return Promise.reject(error);
    }
);

export default api;