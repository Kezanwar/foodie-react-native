import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getHomeFeed } from "lib/api";
import { useAppSelector } from "hooks/useAppSelector";
import { parseFiltersToParams } from "utils/api";
import { minutes } from "utils/time";
import { createLocationFeedQueryKey } from "utils/queries";
import { useMemo } from "react";
import { HomeFeedInfinitePage } from "types/home-feed";

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

  const key = createLocationFeedQueryKey(
    lat,
    lon,
    cuisinesParam,
    dietaryParam,
    ""
  );

  const query = useInfiniteQuery<HomeFeedInfinitePage, Error>({
    initialPageParam: page,
    queryFn: ({ pageParam }) =>
      getHomeFeed(pageParam as number, lon, lat, cuisinesParam, dietaryParam),
    queryKey: [key],
    getNextPageParam: (LastPage) => LastPage.nextCursor,
    staleTime: minutes(10),
    placeholderData: keepPreviousData,
  });

  return query;
};

export default useHomeFeedQuery;

export type FeedQState =
  | {
      pageParams: number[];
      pages: HomeFeedInfinitePage[];
    }
  | undefined;
