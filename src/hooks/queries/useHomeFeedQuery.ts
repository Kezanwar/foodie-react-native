import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeed } from "lib/api/api";

import { HOME_FEED_QUERY } from "constants/react-query";

import { useAppSelector } from "hooks/useAppSelector";
import { DealInfinitePage } from "types/deals";
import { parseFiltersToParams } from "util/api";
import { minutes } from "util/time";

const useHomeFeedQuery = (page: number = 0) => {
  const location = useAppSelector((state) => state.location.location?.coords);
  const { cuisines, dietary_requirements } = useAppSelector(
    (state) => state.home.filters
  );

  const cuisinesParam = parseFiltersToParams("cuisines", cuisines);

  const dietaryParam = parseFiltersToParams(
    "dietary_requirements",
    dietary_requirements
  );

  const lon = location?.longitude || 0;
  const lat = location?.latitude || 0;

  const query = useInfiniteQuery<DealInfinitePage, Error>({
    initialPageParam: page,
    queryFn: ({ pageParam }) =>
      getFeed(pageParam as number, lon, lat, cuisinesParam, dietaryParam),
    enabled: !!location,
    queryKey: [
      `${HOME_FEED_QUERY}-${cuisinesParam}-${dietaryParam}-${lon}-${lat}`,
    ],
    getNextPageParam: (LastPage) => LastPage.nextCursor,
    staleTime: minutes(20),
  });

  return query;
};

export default useHomeFeedQuery;
