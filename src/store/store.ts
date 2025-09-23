import { configureStore } from "@reduxjs/toolkit";

// reducers
import authReducer from "./auth";
import snackbarReducer from "./snackbar";
import themeReducer from "./theme";
import createAccountReducer from "./create-account";
import preferencesReducer from "./preferences";
import locationReducer from "./location";
import filtersReducer from "./filters";
import discoverReducer from "./discover";
import singleDealReducer from "./single-deal";
import notificationsReducer from "./notifications";
import debugReducer from "./debug";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    snackbar: snackbarReducer,
    theme: themeReducer,
    createAccount: createAccountReducer,
    preferences: preferencesReducer,
    location: locationReducer,
    filters: filtersReducer,
    discover: discoverReducer,
    singleDeal: singleDealReducer,
    notifications: notificationsReducer,
    debug: debugReducer,
  },
});
