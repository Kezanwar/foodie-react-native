import { useQuery } from "@tanstack/react-query";
import { getPreferences } from "lib/api/api";
import { POPULAR_RESTUARANTS_QUERY } from "constants/react-query";

import { minutes } from "util/time";

const usePopularRestaurantsQuery = () => {
  const query = useQuery({
    queryKey: [POPULAR_RESTUARANTS_QUERY],
    queryFn: getPreferences,
    staleTime: minutes(20),
  });

  return query;
};

export default usePopularRestaurantsQuery;
