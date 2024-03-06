import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SINGLE_DEAL_QUERY, SINGLE_REST_QUERY } from "constants/react-query";
import useSnackbar from "hooks/useSnackbar";
import { followRestaurant, unFollowRestaurant } from "lib/api/api";

import { ISingleDeal } from "types/single-deal";
import { FollowRestRequest } from "types/following";
import { IRestaurant } from "types/restaurant";

const useMutateFollowingRest = () => {
  const queryClient = useQueryClient();
  const enqeueSnack = useSnackbar();

  const mutateAdd = useMutation({
    mutationFn: (body: FollowRestRequest) => followRestaurant(body),
    onSuccess: ({ data: { is_following, location_id } }) => {
      queryClient.setQueriesData(
        {
          predicate: (query) =>
            query.queryKey.every((q) => {
              if (typeof q === "string") {
                return q.includes(SINGLE_DEAL_QUERY) && q.includes(location_id);
              } else return false;
            }),
        },
        (oldData: ISingleDeal | undefined): ISingleDeal | undefined => {
          if (oldData) {
            return { ...oldData, is_following };
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
            newData.is_following = is_following;
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
    mutationFn: (body: FollowRestRequest) => unFollowRestaurant(body),
    onSuccess: ({ data: { is_following, location_id } }) => {
      queryClient.setQueriesData(
        {
          predicate: (query) =>
            query.queryKey.every((q) => {
              if (typeof q === "string") {
                return q.includes(SINGLE_DEAL_QUERY) && q.includes(location_id);
              } else return false;
            }),
        },
        (oldData: ISingleDeal | undefined): ISingleDeal | undefined => {
          if (oldData) {
            return { ...oldData, is_following };
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
            newData.is_following = is_following;
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

export default useMutateFollowingRest;
