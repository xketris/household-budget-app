import axios, { AxiosRequestConfig } from "axios"
import { getAccessToken, logoutUser, refreshAccessToken } from "./auth";
import { store } from "@/state/store";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
    baseURL: "http://192.168.1.10:5001/api",
    headers: { 
        "Content-Type": "application/json",
    }
})

api.interceptors.request.use(async (config: any) => {
    const token = await getAccessToken();
    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

api.interceptors.response.use(
    (response: any) => {console.log(response); return response}, 
    async (error: any) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (originalRequest.url?.includes("/auth/refresh")) {
            return Promise.reject(error);
        }

        if(error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await refreshAccessToken();

                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${newAccessToken}`,
                };

                return api(originalRequest);
            } catch (err) {
                store.dispatch(logoutUser());
                return Promise.reject(err);
            }
        }
        return Promise.reject(error)
    }
)


export default api;