import { useInfiniteQuery } from "@tanstack/react-query";
import { getFeed } from "lib/api";

import { useAppSelector } from "hooks/useAppSelector";
import { DealInfinitePage } from "types/deal-feed";

import { minutes } from "utils/time";

import { parseFiltersToParams } from "utils/api";
import { useMemo } from "react";
import { createDealFeedQueryKey } from "utils/queries";

const useCategoryFeedQuery = (page: number = 0, category: string) => {
  const location = useAppSelector((state) => state.location.location?.coords);

  const lon = location?.longitude || 0;
  const lat = location?.latitude || 0;

  const catParam = useMemo(
    () => parseFiltersToParams("cuisines", category),
    [category]
  );

  const key = createDealFeedQueryKey(lat, lon, catParam, "", "");

  const query = useInfiniteQuery<DealInfinitePage, Error>({
    initialPageParam: page,
    queryFn: ({ pageParam }) =>
      getFeed(pageParam as number, lon, lat, catParam, ""),
    queryKey: [key],
    getNextPageParam: (LastPage) => LastPage.nextCursor,
    staleTime: minutes(10),
  });

  return query;
};

export default useCategoryFeedQuery;

export type FeedQState =
  | {
      pageParams: number[];
      pages: DealInfinitePage[];
    }
  | undefined;
