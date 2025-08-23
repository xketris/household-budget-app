import { createSlice } from "@reduxjs/toolkit";
import { loadUser, loginUser, logoutUser } from "./userThunks";

interface UserState {
  newUser: boolean,
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
  newUser: false,
  status: "idle"
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.newUser = action.payload.newUser;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'failed';
        state.user = null;
      });

    builder
      .addCase(loadUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
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
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = "failed";
        state.user = null;
      });
  }
});

// export const { } = userSlice.actions;

export default userSlice.reducer;
