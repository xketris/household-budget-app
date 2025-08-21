import { loadUser, loginUser, logoutUser } from "@/service/auth";
import { createSlice } from "@reduxjs/toolkit";


interface UserState {
  newUser: boolean,
  accessToken: string | null,
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null,
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState | null = {
  user: null,
  accessToken: null,
  newUser: false,
  status: "idle"
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.newUser = action.payload.newUser;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
        state.user = null;
        state.accessToken = null;
      });

    builder
      .addCase(loadUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(loadUser.rejected, (state) => {
        state.status = "failed";
        state.user = null;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = null;
        state.accessToken = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = "failed";
        state.user = null;
      });
  }
});

export const { setAccessToken } = userSlice.actions;

export default userSlice.reducer;
