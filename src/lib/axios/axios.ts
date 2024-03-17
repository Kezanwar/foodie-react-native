import axios from "axios";
import { baseUrl } from "lib/env/env";
import ls from "lib/storage/storage";
// config

// import { navigate } from '@app/components/RootNavigator/RootNavigator';
// import { GUEST_ROUTES } from '@app/constants/routes';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // logout when response is 401

    // if (error.response.status === 401) {
    //   console.log(error);
    //   return navigate(GUEST_ROUTES.LOGOUT);
    // }
    return Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    );
  }
);

export default axiosInstance;

export const setSession = (accessToken: string) => {
  ls.storeAccessToken(accessToken);
  axiosInstance.defaults.headers["x-auth-token"] = accessToken;
  console.log(accessToken);
};

export const endSession = async () => {
  ls.clearStorage();
  delete axiosInstance.defaults.headers["x-auth-token"];
};

// export const hardEndSession = async () => {
//   await clearAllTokens();
//   delete axiosInstance.defaults.headers.common.Authorization;
// };
