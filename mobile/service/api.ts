import axios from "axios"
import { getAccessToken, refreshAccessToken } from "./auth";
import { store } from "@/state/store";
import { logout } from "@/state/user/userSlice";

const api = axios.create({
    headers: { 
        "Content-Type": "application/json",
    }
})

// api.interceptors.request.use(async (config: any) => {
//     const token = await getAccessToken();
//     if(token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// })

// api.interceptors.response.use(
//     (response: any) => response, 
//     async (error: any) => {
//         const originalRequest = error.config;
//         if(error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 const newAccessToken = await refreshAccessToken();
//                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//                 return api(originalRequest);
//             } catch (err) {
//                 store.dispatch(logout());
//                 return Promise.reject(err);
//             }
//         }
//         return Promise.reject(error)
//     }
// )


export default api;