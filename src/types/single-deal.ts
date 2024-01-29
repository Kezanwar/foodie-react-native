import { IOpeningTimes } from "./opening-times";
import { Option } from "./options";

export type GetSingleDealProps = {
  deal_id: string;
  location_id: string;
};

export type ILatLong = {
  lat: number;
  long: number;
};

export interface ISingleDeal {
  _id: string;
  name: string;
  description: string;
  end_date: Date;
  is_expired: boolean;
  cuisines: Option[];
  dietary_requirements: Option[];
  restaurant: ISingleRestaurant;
  is_favourited: boolean;
  is_following: boolean;
  location: ISingleLocation;
  distance_miles: number;
}

interface Address {
  address_line_1: string;
  address_line_2: string;
  postcode: string;
  city: string;
  country: string;
}
export interface ISingleLocation {
  _id: string;
  nickname: string;
  address: Address;
  phone_number: string;
  email: string;
  opening_times: IOpeningTimes;
  geometry: Geometry;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

export interface ISingleRestaurant {
  id: string;
  name: string;
  avatar: string;
  cover_photo: string;
  bio: string;
  booking_link?: string;
}
