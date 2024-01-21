import axiosInstance from "lib/axios/axios";
import {
  InitializeResponse,
  LoginJWTData,
  LoginResponse,
  RegisterJWTData,
} from "types/auth";
import { DealInfinitePage } from "types/feed";
import { FavouriteDealRequest, FavouriteDealResponse } from "types/favourites";
import { IOptions } from "types/options";
import { IPreferences } from "types/preferences";
import { GetSingleDealProps, ILatLong, ISingleDeal } from "types/single-deal";

const AUTH_ENDPOINTS = {
  login: "/auth/login",
  loginWithGoogle: "/auth/login-google",
  register: "/auth/register",
  confirmEmailOTP: "/auth/confirm-email",
  resendEmailOTP: "/auth/confirm-email/resend-otp",
  registerWithGoogle: "/auth/register-google",
  intialize: "/auth/initialize",
};

const APP_ENDPOINTS = {
  // options
  getOptions: "/options",
  getPreferences: "cust/preferences",
  addPreferences: "cust/preferences/add",
  //home
  getFeed: "cust/deals/feed",
  //deal
  favDeal: "cust/favourites",
  getSingleDeal: "cust/deals/single",
};

// *OPTIONS

export const getOptions = () => {
  return axiosInstance.get<IOptions>(APP_ENDPOINTS.getOptions);
};
// *PREFERENCES

export const getPreferences = () => {
  return axiosInstance.get<IPreferences>(APP_ENDPOINTS.getPreferences);
};

export const addPreferences = (data: IOptions) => {
  return axiosInstance.post<IPreferences>(APP_ENDPOINTS.addPreferences, data);
};

//*AUTH

export const loginJWT = (data: LoginJWTData) => {
  return axiosInstance.post<LoginResponse>(AUTH_ENDPOINTS.login, data);
};
export const loginGoogle = (token: string) => {
  return axiosInstance.post<LoginResponse>(AUTH_ENDPOINTS.loginWithGoogle, {
    token,
  });
};
export const confirmEmailOTP = (otp: string) => {
  return axiosInstance.post(`${AUTH_ENDPOINTS.confirmEmailOTP}/${otp}`);
};
export const resendEmailOTP = () => {
  return axiosInstance.patch(AUTH_ENDPOINTS.resendEmailOTP);
};
export const registerGoogle = (token: string) => {
  return axiosInstance.post<LoginResponse>(AUTH_ENDPOINTS.registerWithGoogle, {
    token,
  });
};
export const registerJWT = (data: RegisterJWTData) => {
  return axiosInstance.post<LoginResponse>(AUTH_ENDPOINTS.register, data);
};

export const initializeJWT = () => {
  return axiosInstance.get<InitializeResponse>(AUTH_ENDPOINTS.intialize);
};

//* HOME

export const getFeed = async (
  page: number,
  long: number,
  lat: number,
  cuisines: string,
  dietary_requirements: string
) => {
  return axiosInstance
    .get<DealInfinitePage>(
      `${APP_ENDPOINTS.getFeed}/?page=${page}&long=${long}&lat=${lat}${
        cuisines + dietary_requirements
      }`
    )
    .then((res) => {
      console.log("api called");
      return res.data;
    });
};

//* FAVOURITES

export const favouriteDeal = (data: FavouriteDealRequest) => {
  return axiosInstance.post<FavouriteDealResponse>(APP_ENDPOINTS.favDeal, data);
};

export const unFavouriteDeal = (data: FavouriteDealRequest) => {
  return axiosInstance.patch<FavouriteDealResponse>(
    APP_ENDPOINTS.favDeal,
    data
  );
};

//* SINGLE DEAL

export const getSingleDeal = (data: GetSingleDealProps & ILatLong) => {
  return axiosInstance.get<ISingleDeal>(APP_ENDPOINTS.getSingleDeal, {
    params: data,
  });
};
