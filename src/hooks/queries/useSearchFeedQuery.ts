import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearchFeed } from "lib/api";

import { useAppSelector } from "hooks/useAppSelector";
import { DealInfinitePage } from "types/deal-feed";
import { parseFiltersToParams } from "utils/api";
import { minutes } from "utils/time";
import { createFeedQueryKey } from "utils/queries";
import { useMemo } from "react";

const useSearchFeedQuery = (page: number = 0) => {
  const location = useAppSelector((state) => state.location.location?.coords);
  const text = useAppSelector((state) => state.discover.searchSubmitText);

  const textParam = useMemo(() => {
    return parseFiltersToParams("text", text);
  }, [text]);

  const lon = location?.longitude || 0;
  const lat = location?.latitude || 0;

  const key = createFeedQueryKey(lat, lon, "", "", textParam);

  const query = useInfiniteQuery<DealInfinitePage, Error>({
    initialPageParam: page,
    queryFn: ({ pageParam }) =>
      getSearchFeed(pageParam as number, lon, lat, textParam),
    queryKey: [key],
    getNextPageParam: (LastPage) => LastPage.nextCursor,
    staleTime: minutes(10),
    enabled: !!text,
  });

  return query;
};

export default useSearchFeedQuery;

export type FeedQState =
  | {
      pageParams: number[];
      pages: DealInfinitePage[];
    }
  | undefined;
