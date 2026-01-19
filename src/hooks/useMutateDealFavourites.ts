import useSnackbar from "hooks/useSnackbar";
import { favouriteDeal, unFavouriteDeal } from "lib/api";
import { FavouriteDealItem } from "types/favourites";

import { useCallback } from "react";
import { addDealFavourite, removeDealFavourite } from "store/datasources";
import useAppDispatch from "./useAppDispatch";
import { catchErrorHandler } from "utils/error";
import { usePurgeFavouritesQuery } from "./queries/useFavouritesQuery";

const useMutateDealFavourites = () => {
  const enqeueSnack = useSnackbar();
  const dispatch = useAppDispatch();
  const purge = usePurgeFavouritesQuery();

  const favourite = useCallback(async (item: FavouriteDealItem) => {
    try {
      await favouriteDeal(item);
      dispatch(addDealFavourite(item));
      purge();
    } catch (error) {
      catchErrorHandler(error, (err) => {
        enqeueSnack({ message: err.message, variant: "error" });
      });
    }
  }, []);

  const unfavourite = useCallback(async (item: FavouriteDealItem) => {
    try {
      await unFavouriteDeal(item);
      dispatch(removeDealFavourite(item));
      purge();
    } catch (error) {
      catchErrorHandler(error, (err) => {
        enqeueSnack({ message: err.message, variant: "error" });
      });
    }
  }, []);

  return { favourite, unfavourite };
};

export default useMutateDealFavourites;
