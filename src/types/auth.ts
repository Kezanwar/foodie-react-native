import { FavouriteDealItem } from "./favourites";
import { FollowRestItem } from "./following";
import { Geometry } from "./geometry";

export type IUser = {
  first_name: string;
  last_name: string;
  email: string;
  email_private: boolean;
  email_confirmed: string;
  auth_method: "jwt" | "google";
  avatar: string;
  geometry?: Geometry;
};

export type LoginJWTData = {
  email: string;
  password: string;
  pushToken?: string;
};

export type InitDatasourcePayload = {
  deal_favourites: FavouriteDealItem[];
  location_follows: FollowRestItem[];
};

export type LoginResponse = {
  user: IUser;
  accessToken: string;
  datasource: InitDatasourcePayload;
};

export type RegisterJWTData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  pushToken?: string;
};

export type InitializeResponse = {
  user: IUser;
  datasource: InitDatasourcePayload;
};
