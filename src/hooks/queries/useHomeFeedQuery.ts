import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeed } from "lib/api/api";

import { useAppSelector } from "hooks/useAppSelector";
import { DealInfinitePage } from "types/feed";
import { parseFiltersToParams } from "utils/api";
import { minutes } from "utils/time";
import { createFeedQueryKey } from "utils/queries";
import { useMemo } from "react";

const useHomeFeedQuery = (page: number = 0) => {
  const location = useAppSelector((state) => state.location.location?.coords);
  const { cuisines, dietary_requirements } = useAppSelector(
    (state) => state.home.filters
  );

  const cuisinesParam = useMemo(() => {
    return parseFiltersToParams("cuisines", cuisines);
  }, [cuisines]);

  const dietaryParam = useMemo(() => {
    return parseFiltersToParams("dietary_requirements", dietary_requirements);
  }, [dietary_requirements]);

  const lon = location?.longitude || 0;
  const lat = location?.latitude || 0;

  const key = createFeedQueryKey(lat, lon, cuisinesParam, dietaryParam, "");

  const query = useInfiniteQuery<DealInfinitePage, Error>({
    initialPageParam: page,
    queryFn: ({ pageParam }) =>
      getFeed(pageParam as number, lon, lat, cuisinesParam, dietaryParam),
    queryKey: [key],
    getNextPageParam: (LastPage) => LastPage.nextCursor,
    staleTime: minutes(10),
  });

  return query;
};

export default useHomeFeedQuery;

export type FeedQState =
  | {
      pageParams: number[];
      pages: DealInfinitePage[];
    }
  | undefined;
