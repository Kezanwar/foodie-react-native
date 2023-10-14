import { configureStore } from "@reduxjs/toolkit";

// reducers
import authReducer from "./slices/auth/auth.slice";
import snackbarReducer from "./slices/snackbar/snackbar.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
  },
});
