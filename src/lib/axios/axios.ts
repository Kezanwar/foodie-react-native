import axios from "axios";
// config

// import { navigate } from '@app/components/RootNavigator/RootNavigator';
// import { GUEST_ROUTES } from '@app/constants/routes';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
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

// export const setSession = async (accessToken) => {
//   if (accessToken) {
//     await storeAccessToken(accessToken);

//     axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//   } else {
//     return await endSession();
//   }
// };

// export const endSession = async () => {
//   await clearAccessToken();
//   delete axiosInstance.defaults.headers.common.Authorization;
// };

// export const hardEndSession = async () => {
//   await clearAllTokens();
//   delete axiosInstance.defaults.headers.common.Authorization;
// };
