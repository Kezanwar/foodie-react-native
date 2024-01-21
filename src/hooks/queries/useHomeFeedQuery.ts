import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { favouriteDeal, getFeed, unFavouriteDeal } from "lib/api/api";

import { HOME_FEED_QUERY } from "constants/react-query";

import { useAppSelector } from "hooks/useAppSelector";
import { DealInfinitePage } from "types/feed";
import { parseFiltersToParams } from "util/api";
import { minutes } from "util/time";
import { FavouriteDealRequest } from "types/favourites";
import useSnackbar from "hooks/useSnackbar";

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

  const key = `${HOME_FEED_QUERY}-${cuisinesParam}-${dietaryParam}-${lon}-${lat}`;

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

export const useMutateFavouriteDeal = () => {
  const queryClient = useQueryClient();
  const enqeueSnack = useSnackbar();

  const mutateAdd = useMutation({
    mutationFn: (body: FavouriteDealRequest) => favouriteDeal(body),
    onSuccess: ({ data: { deal_id, is_favourited, location_id } }) => {
      queryClient.setQueriesData(
        {
          predicate: (query) =>
            query.queryKey.every((q) => {
              if (typeof q === "string") {
                return q.includes(HOME_FEED_QUERY);
              } else return false;
            }),
        },
        (oldData: FeedQState) => {
          if (oldData) {
            //return pages with updated favourited item
            //need to check location_id and deal_id match
            const newPages = oldData.pages.map(({ deals, nextCursor }) => ({
              nextCursor,
              deals: deals?.map((item) =>
                item.deal.id === deal_id && item.location.id === location_id
                  ? {
                      ...item,
                      deal: { ...item.deal, is_favourited },
                    }
                  : item
              ),
            }));
            return {
              pages: newPages,
              pageParams: [...oldData.pageParams],
            };
          } else return undefined;
        }
      );
    },
    onError: (error) => {
      enqeueSnack({ message: error.message, variant: "error" });
    },
  });

  const mutateRemove = useMutation({
    mutationFn: (body: FavouriteDealRequest) => unFavouriteDeal(body),
    onSuccess: ({ data: { deal_id, is_favourited, location_id } }) => {
      queryClient.setQueriesData(
        {
          predicate: (query) =>
            query.queryKey.every((q) => {
              if (typeof q === "string") {
                return q.includes(HOME_FEED_QUERY);
              } else return false;
            }),
        },
        (oldData: FeedQState) => {
          if (oldData) {
            //return pages with updated favourited item
            //need to check location_id and deal_id match
            const newPages = oldData.pages.map(({ deals, nextCursor }) => ({
              nextCursor,
              deals: deals?.map((item) =>
                item.deal.id === deal_id && item.location.id === location_id
                  ? {
                      ...item,
                      deal: { ...item.deal, is_favourited },
                    }
                  : item
              ),
            }));
            return {
              pages: newPages,
              pageParams: [...oldData.pageParams],
            };
          } else return undefined;
        }
      );
    },
    onError: (error) => {
      enqeueSnack({ message: error.message, variant: "error" });
    },
  });

  return [mutateAdd, mutateRemove];
};
