import axios from "axios";
import { queryClient } from "hocs/app-ready/providers/react-query/ReactQuery";
import { APP_VERSION, baseUrl } from "lib/env";
import LocalStorage from "lib/storage";
import { setMaintenanceMode, setUpdateRequired } from "store/auth";
import { onLogout } from "store/global-actions";
import { store } from "store/store";
// config

const CODES = {
  TOKEN_EXPIRED: 499,
  APP_UPDATE_REQUIRED: 489,
  MAINTENANCE_MODE: 599,
};

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "x-native": "true",
    "x-app-version": APP_VERSION,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    switch (error.response?.status) {
      case CODES.APP_UPDATE_REQUIRED:
        //show update screen
        store.dispatch(setUpdateRequired(true));
        break;
      case CODES.MAINTENANCE_MODE:
        //show maintenance screen
        store.dispatch(setMaintenanceMode(true));
        break;
      case CODES.TOKEN_EXPIRED:
        //end users session
        store.dispatch(onLogout());
        endSession();
        queryClient.clear();
        break;
      default:
        break;
    }

    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export default axiosInstance;

export const setSession = (accessToken: string) => {
  LocalStorage.storeAccessToken(accessToken);
  axiosInstance.defaults.headers["x-auth-token"] = accessToken;
};

export const endSession = async () => {
  LocalStorage.clearLocalStorage();
  delete axiosInstance.defaults.headers["x-auth-token"];
};
