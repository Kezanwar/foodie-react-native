import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getFeed } from "lib/api/api";

import { HOME_FEED_QUERY } from "constants/react-query";

import { useAppSelector } from "hooks/useAppSelector";
import { DealInfinitePage, ISearchFilterList } from "types/deals";
import { parseFiltersToParams } from "util/api";

const useHomeFeedQuery = (
  page: number = 0,
  cuisines?: ISearchFilterList,
  dietary_requirements?: ISearchFilterList
) => {
  const location = useAppSelector((state) => state.location.location?.coords);

  const cuisinesParam = cuisines
    ? parseFiltersToParams("cuisines", cuisines)
    : "";

  const dietaryParam = dietary_requirements
    ? parseFiltersToParams("dietary_requirements", dietary_requirements)
    : "";

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
    staleTime: 20 * (60 * 1000),
  });

  return query;
};

export default useHomeFeedQuery;
