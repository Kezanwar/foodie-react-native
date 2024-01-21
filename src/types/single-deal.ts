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
  restaurant: Restaurant;
  is_favourited: boolean;
  location: Location;
  distance_miles: number;
}

interface Location {
  location_id: string;
  nickname: string;
  geometry: Geometry;
}

interface Geometry {
  type: string;
  coordinates: number[];
}

interface Restaurant {
  id: string;
  name: string;
  avatar: string;
  cover_photo: string;
}
