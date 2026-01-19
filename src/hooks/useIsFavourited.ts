import { useAppSelector } from "./useAppSelector";
import { buildDealFavouriteStateKey } from "store/datasources";

const useIsFavourited = (deal_id: string, location_id: string) => {
  const favourited = useAppSelector(
    (s) =>
      !!s.datasources.deal_favourites[
        buildDealFavouriteStateKey(deal_id, location_id)
      ]
  );
  return favourited;
};

export default useIsFavourited;
