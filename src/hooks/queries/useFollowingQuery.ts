import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getFollowing } from "lib/api";

import { minutes } from "utils/time";

import { FollowingInfinitePage } from "types/following";
import { FOLLOWING } from "constants/react-query";

const useFollowingQuery = (page: number = 0) => {
  const query = useInfiniteQuery<FollowingInfinitePage, Error>({
    initialPageParam: page,
    queryFn: ({ pageParam }) => getFollowing(pageParam as number),
    queryKey: [FOLLOWING],
    getNextPageParam: (LastPage) => LastPage.nextCursor,
    staleTime: minutes(10),
  });

  return query;
};

export const usePurgeFollowingQuery = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: [FOLLOWING] });
};

export default useFollowingQuery;

export type FollowingQState =
  | {
      pageParams: number[];
      pages: FollowingInfinitePage[];
    }
  | undefined;
