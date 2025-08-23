import api from "@/service/api";
import { removeTokens, setTokens, getItem, setItem } from "@/service/storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadUser = createAsyncThunk(
    "user/load", 
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.get("/auth/current");

            return {
                user: res.data.user,
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

            await setTokens(accessToken, refreshToken);
            const firstTime = await getItem("isFirstTime");
            await setItem("isFirstTime", false);

            return { user, newUser: !!firstTime };
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
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || "Failed to remove tokens"
            );
        }
    }
)