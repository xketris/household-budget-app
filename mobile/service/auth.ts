import api from "./api";
import { getItem, removeItem, setItem } from "./storage";

const login = async (credentials: {login: string, password: string}) => {
    const res = await api.post("/auth/login", credentials);
    return res;
}

const refresh = async (refreshToken: string) => {
    const res = await api.post("/auth/refresh", { refreshToken });
    return res;
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
    const { accessToken: newAccessToken } = {accessToken: ""}; // To be implemented

    await setItem("accessToken", newAccessToken);
    return newAccessToken;
}