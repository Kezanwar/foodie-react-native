import { configureStore } from "@reduxjs/toolkit";

// reducers
import authReducer from "./slices/auth/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
