import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleRest } from "lib/api/api";
import { SINGLE_REST_QUERY } from "constants/react-query";
import { useCallback } from "react";
import { minutes } from "util/time";
import { ILatLong } from "types/single-deal";
import { useAppSelector } from "hooks/useAppSelector";
import { GetSingleRestProps } from "types/restaurant";

export const getSingleRestKey = (data: GetSingleRestProps & ILatLong) =>
  `${SINGLE_REST_QUERY}-${data.location_id}-${data.lat}-${data.long}`;

const useSingleRestaurantQuery = (data: GetSingleRestProps) => {
  const location = useAppSelector((state) => state.location.location?.coords);

  const long = location?.longitude || 0;
  const lat = location?.latitude || 0;

  const dataWithLocation = { ...data, lat, long };

  const query = useQuery({
    queryKey: [getSingleRestKey(dataWithLocation)],
    queryFn: () => getSingleRest(dataWithLocation),
    staleTime: minutes(15),
  });

  return query;
};

export const useUpdateSingleRestState = () => {
  const client = useQueryClient();

  const location = useAppSelector((state) => state.location.location?.coords);

  const long = location?.longitude || 0;
  const lat = location?.latitude || 0;

  // TODO: need to update favourited active deals and is_following
  // TODO: export a method for following and a method for updating fav

  //   const update = useCallback(
  //     (data: GetSingleRestProps) =>
  //       client.setQueryData(
  //         [getSingleRestKey({ ...data, lat, long })],
  //         (oldData: ISingleDeal): ISingleDeal => {
  //           return { ...oldData, is_favourited: !oldData.is_favourited };
  //         }
  //       ),
  //     [location]
  //   );
  //   return update;

  return () => {};
};

export default useSingleRestaurantQuery;
