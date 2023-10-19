import { createSlice } from "@reduxjs/toolkit";
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
  reducers: {},
});

// export for use around the app
export const {} = authSlice.actions;

// export for store
const authReducer = authSlice.reducer;

export default authReducer;
