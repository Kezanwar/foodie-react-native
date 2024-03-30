import { useQuery } from "@tanstack/react-query";
import { getFavouritesAndFollowing } from "lib/api/api";
import { FOLLOW_FAVOURITES_QUERY } from "constants/react-query";

import { minutes } from "util/time";

import { useAppSelector } from "hooks/useAppSelector";

export interface FollowFavQuery {
  following: Following[];
  favourites: Favourite[];
}

export interface Following {
  _id: string;
  restaurant: Restaurant;
  location: Location;
}

export interface Restaurant {
  id: string;
  name: string;
  avatar: string;
  cover_photo: string;
}

export interface Location {
  nickname: string;
  _id: string;
}

export interface Favourite {
  _id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
}

const useFollowFavouritesQuery = () => {
  const location = useAppSelector((state) => state.location.location?.coords);

  const lon = location?.longitude || 0;
  const lat = location?.latitude || 0;

  const key = `${FOLLOW_FAVOURITES_QUERY}-${lon}-${lat}`;

  const query = useQuery({
    queryKey: [key],
    queryFn: () => getFavouritesAndFollowing(lon, lat),
    staleTime: minutes(20),
  });

  return query;
};

export default useFollowFavouritesQuery;
