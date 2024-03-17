import axiosInstance from "lib/axios/axios";
import {
  IUser,
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
import { FollowRestResponse } from "types/following";
import { DiscoverResponse } from "types/discover";
import { GetSingleRestProps, IRestaurant } from "types/restaurant";
import { FollowMutationArg } from "hooks/queries/useMututateFollowingRest";
import { FavMutationArg } from "hooks/queries/useMutateFavouriteDeal";

const AUTH_ENDPOINTS = {
  login: "/auth/login",
  loginWithGoogle: "/auth/login-google",
  register: "/auth/register",
  confirmEmailOTP: "/auth/confirm-email",
  resendEmailOTP: "/auth/confirm-email/resend-otp",
  registerWithGoogle: "/auth/register-google",
  intialize: "/auth/initialize",
  forgotPassword: "/auth/forgot-password",
};

const APP_ENDPOINTS = {
  // options
  getOptions: "/options",
  getPreferences: "/cust/preferences",
  addPreferences: "/cust/preferences/add",
  //home
  getFeed: "/cust/deals/feed",
  //deal
  fav: "/cust/favourites",
  getSingleDeal: "/cust/deals/single",
  //rest
  follow: "/cust/following",
  //account
  patchProfile: "/account/profile",
  //discover
  getDiscover: "/cust/discover",
  getSearchFeed: "/cust/deals/search",
  //restaurant
  getSingleRestaurant: "/cust/restaurant",
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

export const changePassword = (email: string) => {
  return axiosInstance.post(AUTH_ENDPOINTS.forgotPassword, { email });
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
      console.log("Feed API Request");
      return res.data;
    });
};

//* FAVOURITES

export const favouriteDeal = (data: FavMutationArg) => {
  return axiosInstance.post<FavouriteDealResponse>(APP_ENDPOINTS.fav, data);
};

export const unFavouriteDeal = (data: FavMutationArg) => {
  return axiosInstance.patch<FavouriteDealResponse>(APP_ENDPOINTS.fav, data);
};

//* FOLLOWS

export const followRestaurant = (data: FollowMutationArg) => {
  return axiosInstance.post<FollowRestResponse>(APP_ENDPOINTS.follow, data);
};

export const unFollowRestaurant = (data: FollowMutationArg) => {
  return axiosInstance.patch<FollowRestResponse>(APP_ENDPOINTS.follow, data);
};

//* SINGLE DEAL

export const getSingleDeal = async (data: GetSingleDealProps & ILatLong) => {
  return axiosInstance
    .get<ISingleDeal>(APP_ENDPOINTS.getSingleDeal, {
      params: data,
    })
    .then((res) => {
      return res.data;
    });
};

//* ACCOUNT

export const patchProfile = (data: {
  first_name: string;
  last_name: string;
}) => {
  return axiosInstance.patch<IUser>(APP_ENDPOINTS.patchProfile, data);
};

//* DISCOVER

export const getDiscover = (long: number, lat: number) => {
  return axiosInstance.get<DiscoverResponse>(
    `${APP_ENDPOINTS.getDiscover}?lat=${lat}&long=${long}`
  );
};

export const getSearchFeed = async (
  page: number,
  long: number,
  lat: number,
  search_text: string
) => {
  return axiosInstance
    .get<DealInfinitePage>(
      `${APP_ENDPOINTS.getSearchFeed}/?page=${page}&long=${long}&lat=${lat}${search_text}`
    )
    .then((res) => {
      console.log("Search Feed API Request", res.data.deals.length);
      return res.data;
    });
};

//* SINGLE RESTAURANT

export const getSingleRest = async (data: GetSingleRestProps & ILatLong) => {
  return axiosInstance
    .get<IRestaurant>(
      `${APP_ENDPOINTS.getSingleRestaurant}/${data.location_id}`,
      {
        params: {
          lat: data.lat,
          long: data.long,
        },
      }
    )
    .then((res) => {
      return res.data;
    });
};
