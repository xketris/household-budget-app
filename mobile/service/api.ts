import axios, { AxiosRequestConfig } from "axios"
import { getAccessToken, getRefreshToken, setItem } from "./storage";

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

        if (originalRequest.url?.includes("/auth")) {
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
                return Promise.reject(err);
            }
        }
        return Promise.reject(error)
    }
)

const refresh = async (refreshToken: string) => {
    const res = await api.post("/auth/refresh", { refreshToken });
    return res;
}

export const refreshAccessToken = async () => {
    const refreshToken = await getRefreshToken();
    if(!refreshToken) throw new Error("No refresh token");

    const { data } = await refresh(refreshToken);
    const newAccessToken = data.accessToken;

    await setItem("accessToken", newAccessToken);
    return newAccessToken;
}


export default api;