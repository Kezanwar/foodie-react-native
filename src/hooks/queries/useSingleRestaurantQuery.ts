import { useQuery } from "@tanstack/react-query";
import { getSingleRest } from "lib/api/api";
import { SINGLE_REST_QUERY } from "constants/react-query";

import { minutes } from "util/time";

import { GetSingleRestProps } from "types/restaurant";

export const getSingleRestKey = (data: GetSingleRestProps) =>
  `${SINGLE_REST_QUERY}-${data.location_id}`;

const useSingleRestaurantQuery = (data: GetSingleRestProps) => {
  const query = useQuery({
    queryKey: [getSingleRestKey(data)],
    queryFn: () => getSingleRest(data),
    staleTime: minutes(20),
  });

  return query;
};

export default useSingleRestaurantQuery;
