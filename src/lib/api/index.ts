//axios
import axiosInstance from "lib/axios";

//types
import {
  IUser,
  InitializeResponse,
  LoginJWTData,
  LoginResponse,
  RegisterJWTData,
} from "types/auth";
import { DealInfinitePage } from "types/deal-feed";
import { FavouriteDealItem, FavouritesInfinitePage } from "types/favourites";
import { IOptions } from "types/options";
import { IPreferences } from "types/preferences";
import { GetSingleDealProps, ISingleDeal } from "types/single-deal";
import { FollowingInfinitePage, FollowRestItem } from "types/following";
import { DiscoverResponse } from "types/discover";
import { GetSingleRestProps, IRestaurant } from "types/restaurant";
import LocalStorage from "lib/storage";
import { HomeFeedInfinitePage } from "types/feed";
import { AppleAuthenticationCredential } from "expo-apple-authentication";

// *OPTIONS

export const getOptions = () => {
  return axiosInstance.get<IOptions>("/options");
};
// *PREFERENCES

export const getPreferences = () => {
  return axiosInstance.get<IPreferences>("/cust/preferences");
};

export const addPreferences = (data: IOptions) => {
  return axiosInstance.post<IPreferences>("/cust/preferences/add", data);
};

//*AUTH

export const loginJWT = (data: LoginJWTData) => {
  return axiosInstance.post<LoginResponse>("/auth/login", data);
};
export const loginGoogle = (token: string, pushToken?: string) => {
  return axiosInstance.post<LoginResponse>("/auth/login-google", {
    token,
    pushToken,
  });
};

export const loginApple = (
  credential: AppleAuthenticationCredential,
  pushToken?: string,
) => {
  return axiosInstance.post<LoginResponse>("/auth/login-apple", {
    credential,
    pushToken,
  });
};

export const confirmEmailOTP = (otp: string) => {
  return axiosInstance.post(`/auth/confirm-email/${otp}`);
};
export const resendEmailOTP = () => {
  return axiosInstance.patch("/auth/confirm-email/resend-otp");
};
export const registerGoogle = (token: string, pushToken?: string) => {
  return axiosInstance.post<LoginResponse>("/auth/register-google", {
    token,
    pushToken,
  });
};

export const registerApple = (
  credential: AppleAuthenticationCredential,
  pushToken?: string,
) => {
  return axiosInstance.post<LoginResponse>("/auth/register-apple", {
    credential,
    pushToken,
  });
};

export const registerJWT = (data: RegisterJWTData) => {
  return axiosInstance.post<LoginResponse>("/auth/register", data);
};

export const initializeJWT = () => {
  return axiosInstance.get<InitializeResponse>("/auth/initialize");
};

export const changePassword = (email: string) => {
  return axiosInstance.post("/auth/forgot-password", { email });
};

export const deleteAccount = () => {
  return axiosInstance.post("/auth/delete");
};

//* GEO

export const saveUserGeo = (long: number, lat: number) => {
  return axiosInstance.post("/cust/geo", { long, lat });
};

//* HOME

export const getHomeFeed = async (
  page: number,
  long: number,
  lat: number,
  cuisines: string,
  dietary_requirements: string,
) => {
  return axiosInstance
    .get<HomeFeedInfinitePage>(
      `/cust/deals/feed/home/?page=${page}&long=${long}&lat=${lat}${
        cuisines + dietary_requirements
      }`,
    )
    .then((res) => {
      return res.data;
    });
};

export const getGuestFeed = async (
  page: number,
  long: number,
  lat: number,
  cuisines: string,
  dietary_requirements: string,
) => {
  return axiosInstance
    .get<HomeFeedInfinitePage>(
      `/cust/deals/feed/guest/?page=${page}&long=${long}&lat=${lat}${
        cuisines + dietary_requirements
      }`,
    )
    .then((res) => {
      return res.data;
    });
};

//* GENERIC DEAL FEED

export const getFeed = async (
  page: number,
  long: number,
  lat: number,
  cuisines: string,
  dietary_requirements: string,
) => {
  return axiosInstance
    .get<DealInfinitePage>(
      `/cust/deals/feed/?page=${page}&long=${long}&lat=${lat}${
        cuisines + dietary_requirements
      }`,
    )
    .then((res) => {
      return res.data;
    });
};

//* FAVOURITES

export const favouriteDeal = (data: FavouriteDealItem) => {
  return axiosInstance.post("/cust/favourites", data);
};

export const unFavouriteDeal = (data: FavouriteDealItem) => {
  return axiosInstance.patch("/cust/favourites", data);
};

export const getFavourites = async (page: number) => {
  return axiosInstance
    .get<FavouritesInfinitePage>(`/cust/favourites/?page=${page}`)
    .then((res) => res.data);
};

//* FOLLOWS

export const followRestaurant = (data: FollowRestItem) => {
  return axiosInstance.post("/cust/following", data);
};

export const unFollowRestaurant = (data: FollowRestItem) => {
  return axiosInstance.patch("/cust/following", data);
};

export const getFollowing = async (page: number) => {
  return axiosInstance
    .get<FollowingInfinitePage>(`/cust/following/?page=${page}`)
    .then((res) => res.data);
};

//* SINGLE DEAL

export const getSingleDeal = async (data: GetSingleDealProps) => {
  return axiosInstance
    .get<ISingleDeal>("/cust/deals/single", {
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
  return axiosInstance.patch<IUser>("/account/profile", data);
};

//* DISCOVER

export const getDiscover = (long: number, lat: number) => {
  return axiosInstance.get<DiscoverResponse>(
    `/cust/discover?lat=${lat}&long=${long}`,
  );
};

export const getSearchFeed = async (
  page: number,
  long: number,
  lat: number,
  search_text: string,
) => {
  return axiosInstance
    .get<DealInfinitePage>(
      `/cust/deals/search/?page=${page}&long=${long}&lat=${lat}${search_text}`,
    )
    .then((res) => {
      return res.data;
    });
};

//* SINGLE RESTAURANT

export const getSingleRest = async (data: GetSingleRestProps) => {
  return axiosInstance
    .get<IRestaurant>(`/cust/restaurant/${data.location_id}`)
    .then((res) => {
      return res.data;
    });
};

export const postStats = async () => {
  const stats = LocalStorage.getStats();

  if (!stats) {
    return;
  }

  try {
    await axiosInstance.post("/cust/stats", {
      stats,
    });
    LocalStorage.clearStats();
  } catch (error) {
    console.log(error);
  }
};
