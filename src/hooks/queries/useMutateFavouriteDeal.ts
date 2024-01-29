import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HOME_FEED_QUERY } from "constants/react-query";
import useSnackbar from "hooks/useSnackbar";
import { favouriteDeal, unFavouriteDeal } from "lib/api/api";
import { FavouriteDealRequest } from "types/favourites";
import { FeedQState } from "./useHomeFeedQuery";

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

export default useMutateFavouriteDeal;
