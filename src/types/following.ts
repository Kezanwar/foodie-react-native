import { Coordinates } from "./geometry";

export type FollowRestItem = {
  location_id: string;
};

export type FollowingInfinitePage = {
  nextCursor: number | undefined;
  restaurants: ListItem[];
};

type ListItem = {
  _id: string;
  restaurant: Restaurant;
  location: Location;
};
interface Restaurant {
  id: string;
  name: string;
  avatar: string;
  cover_photo: string;
  followers: number;
}

interface Location {
  _id: string;
  nickname: string;
  coordinates: Coordinates;
}
