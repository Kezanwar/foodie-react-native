import { configureStore } from "@reduxjs/toolkit";

// reducers
import authReducer from "./auth/auth.slice";
import snackbarReducer from "./snackbar/snackbar.slice";
import themeReducer from "./theme/theme.slice";
import createAccountReducer from "./create-account/create-account.slice";
import preferencesReducer from "./preferences/preferences.slice";
import locationReducer from "./location/location.slice";
import homeReducer from "./home/home.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
    theme: themeReducer,
    createAccount: createAccountReducer,
    preferences: preferencesReducer,
    location: locationReducer,
    home: homeReducer,
  },
});
