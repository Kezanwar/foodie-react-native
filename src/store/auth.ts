import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { onLogout } from "store/global-actions";
import { IUser } from "types/auth";

// types

interface authSliceState {
  isInitialized: boolean;
  isAuthenticated: boolean;
  user: IUser | null;
  maintenanceMode: boolean;
  updateRequired: boolean;
}

const initialState: authSliceState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  maintenanceMode: false,
  updateRequired: false,
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
    updateUser: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
    },
    authLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
    },
    setUpdateRequired: (state, { payload }: PayloadAction<boolean>) => {
      state.updateRequired = payload;
    },
    setMaintenanceMode: (state, { payload }: PayloadAction<boolean>) => {
      state.maintenanceMode = payload;
    },
    setIsInitialized: (state, { payload }: PayloadAction<boolean>) => {
      state.isInitialized = payload;
    },
  },
  extraReducers: (builder) => builder.addCase(onLogout, () => initialState),
});

// export for use around the app
export const {
  authLogin,
  authLogout,
  updateUser,
  setUpdateRequired,
  setMaintenanceMode,
  setIsInitialized,
} = authSlice.actions;

// export for store
const authReducer = authSlice.reducer;

export default authReducer;
