export type FollowRestRequest = {
  location_id: string;
  rest_id: string;
};

export type FollowRestResponse = {
  location_id: string;
  rest_id: string;
  is_following: boolean;
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
  distance_miles: number;
}
