import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";
import { getItem, removeItem, setItem } from "./storage";
import { store } from "@/state/store";
import { setAccessToken } from "@/state/user/userSlice";

const refresh = async (refreshToken: string) => {
    const res = await api.post("/auth/refresh", { refreshToken });
    return res;
}

export const loadUser = createAsyncThunk(
    "user/load", 
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/auth/current");
            const token  = await getAccessToken();
            return {
                user: res.data.user,
                accessToken: token
            }
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to load user"
            );
        }
    }
)

export const loginUser = createAsyncThunk(
    'user/login', 
    async (credentials: {email: string, password: string}, { rejectWithValue }) => {
        try {
            const res = await api.post("/auth/login", credentials);
            const { accessToken, refreshToken, user } = res.data;

            setTokens(accessToken, refreshToken);
            const firstTime = await getItem("isFirstTime");
            await setItem("isFirstTime", false);

            return { user, accessToken, newUser: !!firstTime };
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
)

export const logoutUser = createAsyncThunk(
    'user/logout', 
    async (_, { rejectWithValue }) => {
        try {
            await removeTokens();
            return true; 
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to remove tokens"
            );
        }
    }
)

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
    store.dispatch(setAccessToken(newAccessToken))
    return newAccessToken;
}