import { removeTokens, setTokens } from "@/service/auth";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  newUser: boolean,
  accessToken: string | null,
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null
}

const initialState: UserState | null = {
  user: null,
  accessToken: null,
  newUser: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const accessToken = action.payload.accessToken;
      const refreshToken = action.payload.refreshToken;
      setTokens(accessToken, refreshToken);

      console.log(action.payload)
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.newUser = false;
      
      
    },
    load: (state, action) => {
      console.log("\n\nBBBBBB\n", state)
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;


      console.log("\n\nCCCC\n", state)
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      removeTokens();
    },
  },
});

export const { login, logout, load } = userSlice.actions;

export default userSlice.reducer;
