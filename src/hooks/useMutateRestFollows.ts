import { usePurgeFollowingQuery } from "./queries/useFollowingQuery";
import useSnackbar from "hooks/useSnackbar";
import { followRestaurant, unFollowRestaurant } from "lib/api";
import { useCallback } from "react";
import { addLocationFollow, removeLocationFollow } from "store/datasources";
import useAppDispatch from "./useAppDispatch";
import { catchErrorHandler } from "utils/error";

const useMutateRestFollows = () => {
  const enqeueSnack = useSnackbar();
  const dispatch = useAppDispatch();
  const purge = usePurgeFollowingQuery();

  const follow = useCallback(async (location_id: string) => {
    try {
      await followRestaurant({ location_id });
      dispatch(addLocationFollow(location_id));
      purge();
    } catch (error) {
      catchErrorHandler(error, (err) => {
        enqeueSnack({ message: err.message, variant: "error" });
      });
    }
  }, []);

  const unfollow = useCallback(async (location_id: string) => {
    try {
      await unFollowRestaurant({ location_id });
      dispatch(removeLocationFollow(location_id));
      purge();
    } catch (error) {
      catchErrorHandler(error, (err) => {
        enqeueSnack({ message: err.message, variant: "error" });
      });
    }
  }, []);

  return { follow, unfollow };
};

export default useMutateRestFollows;
