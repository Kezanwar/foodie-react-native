import { configureStore } from "@reduxjs/toolkit";

// reducers
import authReducer from "./auth/auth.slice";
import snackbarReducer from "./snackbar/snackbar.slice";
import themeReducer from "./theme/theme.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
    theme: themeReducer,
  },
});
