import AsyncStorage from "@react-native-async-storage/async-storage"

export const setItem = async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value));
}

export const getItem = async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export const removeItem = async (key: string) => {
    await AsyncStorage.removeItem(key);
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