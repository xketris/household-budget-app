import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: string | undefined;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
}

const initialState: UserState = {
  id: undefined,
  email: undefined,
  firstName: undefined,
  lastName: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set: (state, action) => {
      state = action.payload;
    },
  },
});

export const { set } = userSlice.actions;

export default userSlice.reducer;
