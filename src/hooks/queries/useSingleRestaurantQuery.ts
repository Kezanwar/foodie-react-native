import { useQuery } from "@tanstack/react-query";
import { getSingleRest } from "lib/api/api";
import { SINGLE_REST_QUERY } from "constants/react-query";

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

export default useSingleRestaurantQuery;
