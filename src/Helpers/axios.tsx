import axios from 'axios';

const axiosService = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosService.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axiosService.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export function fetcher(url: string) {
    return axiosService.get(url).then((response) => response.data);
}

export default axiosService;
