import { BlogItem } from "./blog";
import { Option } from "./options";

export interface DiscoverResponse {
  restaurants: PopularRestaurants[];
  cuisines: Option[];
  blogs: BlogItem[];
}

export interface PopularRestaurants {
  _id: string;
  restaurant: Restaurant;
  location: Location;
}

interface Restaurant {
  id: string;
  name: string;
  avatar: string;
  cover_photo: string;
  followers: number;
}

interface Location {
  id: string;
  nickname: string;
  distance_miles: number;
}
