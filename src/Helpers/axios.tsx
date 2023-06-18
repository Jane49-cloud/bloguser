import axios from "axios";
import { getAccessToken } from "../hooks/user.actions";

const axiosService = axios.create({
  baseURL: "https://bloghub-p25a.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosService.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;
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
