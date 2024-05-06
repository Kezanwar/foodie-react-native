import { useInfiniteQuery } from "@tanstack/react-query";
import { getFavourites } from "lib/api/api";

import { minutes } from "util/time";

import { FAVOURITES } from "constants/react-query";
import { FavouritesInfinitePage } from "types/favourites";

const useFavouritesQuery = (page: number = 0) => {
  const query = useInfiniteQuery<FavouritesInfinitePage, Error>({
    initialPageParam: page,
    queryFn: ({ pageParam }) => getFavourites(pageParam as number),
    queryKey: [FAVOURITES],
    getNextPageParam: (LastPage) => LastPage.nextCursor,
    staleTime: minutes(10),
  });

  return query;
};

export default useFavouritesQuery;

export type FavouritesQState =
  | {
      pageParams: number[];
      pages: FavouritesInfinitePage[];
    }
  | undefined;
