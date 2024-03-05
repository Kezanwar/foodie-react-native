import { Address } from "./address";
import { Geometry } from "./geometry";
import { IOpeningTimes } from "./opening-times";
import { Option } from "./options";

export type GetSingleRestProps = {
  location_id: string;
};

export interface IRestaurant {
  _id: string;
  nickname: string;
  address: Address;
  phone_number: string;
  email: string;
  opening_times: IOpeningTimes;
  restaurant: Restaurant;
  cuisines: Option[];
  dietary_requirements: Option[];
  active_deals: ActiveDeal[];
  distance_miles: number;
  is_following: boolean;
  geometry: Geometry;
}

export interface Restaurant {
  id: string;
  name: string;
  avatar: string;
  cover_photo: string;
  bio: string;
  booking_link?: string;
}

export interface ActiveDeal {
  _id: string;
  name: string;
  is_favourited: boolean;
}
