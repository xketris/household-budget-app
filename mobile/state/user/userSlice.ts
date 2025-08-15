import { removeTokens } from "@/service/auth";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null
}

const initialState: UserState | null = {
  user: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set: (state, action) => {
      state = action.payload;
    },
    logout: (state) => {
      state.user = null;
      removeTokens();
    }
  },
});

export const { set, logout } = userSlice.actions;

export default userSlice.reducer;
