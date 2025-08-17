import api from "./api";
import { getItem, removeItem, setItem } from "./storage";

const refresh = async (refreshToken: string)=> {
    const res = await api.post("http://192.168.1.10:5001/api/auth/refresh", { refreshToken });
    return res;
}

export const current = async ()=> {
    const res = await api.get("http://192.168.1.10:5001/api/auth/current");
    res.data.accessToken = await getAccessToken();

    return res;
}

export const login = async (credentials: {email: string, password: string}) => {
    try {
        const res = await api.post("http://192.168.1.10:5001/api/auth/login", credentials);
        return res;
    } catch (err: any) {
        console.error('Login error:', err.message);
        throw err;
    }
}

export const getAccessToken = async () => await getItem("accessToken");

export const getRefreshToken = async () => await getItem("refreshToken");

export const setTokens = async (accessToken: string, refreshToken: string) => {
    await setItem("accessToken", accessToken);
    await setItem("refreshToken", refreshToken);
}

export const removeTokens = async () => {
    await removeItem("accessToken");
    await removeItem("refreshToken");
}

export const refreshAccessToken = async () => {
    const refreshToken = await getRefreshToken();
    if(!refreshToken) throw new Error("No refresh token");
    const { data } = await refresh(refreshToken);
    const newAccessToken = data.accessToken;

    await setItem("accessToken", newAccessToken);
    return newAccessToken;
}