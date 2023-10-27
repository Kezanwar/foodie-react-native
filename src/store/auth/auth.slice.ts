import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "types/auth";

// types

interface authSliceState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
}

const initialState: authSliceState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    authLogin: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },
    initializeFailed: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
    },
  },
});

// export for use around the app
export const { authLogin, initializeFailed } = authSlice.actions;

// export for store
const authReducer = authSlice.reducer;

export default authReducer;
