import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  HOME_FEED_QUERY,
  SINGLE_DEAL_QUERY,
  SINGLE_REST_QUERY,
} from "constants/react-query";
import useSnackbar from "hooks/useSnackbar";
import { favouriteDeal, unFavouriteDeal } from "lib/api/api";
import { FavouriteDealRequest } from "types/favourites";
import { FeedQState } from "./useHomeFeedQuery";
import { ISingleDeal } from "types/single-deal";
import { IRestaurant } from "types/restaurant";

const useMutateFavouriteDeal = () => {
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
      queryClient.setQueriesData(
        {
          predicate: (query) =>
            query.queryKey.every((q) => {
              if (typeof q === "string") {
                return q.includes(
                  `${SINGLE_DEAL_QUERY}-${deal_id}-${location_id}`
                );
              } else return false;
            }),
        },
        (oldData: ISingleDeal | undefined): ISingleDeal | undefined => {
          if (oldData) {
            return { ...oldData, is_favourited };
          } else return undefined;
        }
      );

      queryClient.setQueriesData(
        {
          predicate: (query) =>
            query.queryKey.every((q) => {
              if (typeof q === "string") {
                return q.includes(`${SINGLE_REST_QUERY}-${location_id}`);
              } else return false;
            }),
        },
        (oldData: IRestaurant | undefined): IRestaurant | undefined => {
          if (oldData) {
            const newData = { ...oldData };
            for (let d of newData.active_deals) {
              if (d._id === deal_id) {
                d.is_favourited = is_favourited;
              }
            }
            return newData;
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
      queryClient.setQueriesData(
        {
          predicate: (query) =>
            query.queryKey.every((q) => {
              if (typeof q === "string") {
                return q.includes(
                  `${SINGLE_DEAL_QUERY}-${deal_id}-${location_id}`
                );
              } else return false;
            }),
        },
        (oldData: ISingleDeal | undefined): ISingleDeal | undefined => {
          if (oldData) {
            return { ...oldData, is_favourited };
          } else return undefined;
        }
      );

      queryClient.setQueriesData(
        {
          predicate: (query) =>
            query.queryKey.every((q) => {
              if (typeof q === "string") {
                return q.includes(`${SINGLE_REST_QUERY}-${location_id}`);
              } else return false;
            }),
        },
        (oldData: IRestaurant | undefined): IRestaurant | undefined => {
          if (oldData) {
            const newData = { ...oldData };
            for (let d of newData.active_deals) {
              if (d._id === deal_id) {
                d.is_favourited = is_favourited;
              }
            }
            return newData;
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

export default useMutateFavouriteDeal;
