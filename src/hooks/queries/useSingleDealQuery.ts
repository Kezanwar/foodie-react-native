import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleDeal } from "lib/api/api";
import { SINGLE_DEAL_QUERY } from "constants/react-query";
import { useCallback } from "react";
import { minutes } from "util/time";
import { GetSingleDealProps, ILatLong, ISingleDeal } from "types/single-deal";
import { useAppSelector } from "hooks/useAppSelector";

const getSingleDealKey = (data: GetSingleDealProps & ILatLong) =>
  `${SINGLE_DEAL_QUERY}-${data.deal_id}-${data.location_id}-${data.lat}-${data.long}`;

const useSingleDealQuery = (data: GetSingleDealProps) => {
  const location = useAppSelector((state) => state.location.location?.coords);

  const long = location?.longitude || 0;
  const lat = location?.latitude || 0;

  const dataWithLocation = { ...data, lat, long };

  const query = useQuery({
    queryKey: [getSingleDealKey(dataWithLocation)],
    queryFn: () => getSingleDeal(dataWithLocation),
    staleTime: minutes(10),
  });

  return query;
};

export const useUpdateSingleDealFavouriteState = () => {
  const client = useQueryClient();

  const location = useAppSelector((state) => state.location.location?.coords);

  const long = location?.longitude || 0;
  const lat = location?.latitude || 0;

  const update = useCallback(
    (data: GetSingleDealProps) =>
      client.setQueryData(
        [getSingleDealKey({ ...data, lat, long })],
        (oldData: ISingleDeal): ISingleDeal => {
          return { ...oldData, is_favourited: !oldData.is_favourited };
        }
      ),
    [location]
  );
  return update;
};

export default useSingleDealQuery;
