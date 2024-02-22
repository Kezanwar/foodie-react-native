import { useQuery } from "@tanstack/react-query";
import { getDiscover } from "lib/api/api";
import { POPULAR_RESTUARANTS_QUERY } from "constants/react-query";

import { minutes } from "util/time";

import { useAppSelector } from "hooks/useAppSelector";

const useDiscoverQuery = () => {
  const location = useAppSelector((state) => state.location.location?.coords);

  const lon = location?.longitude || 0;
  const lat = location?.latitude || 0;

  const key = `${POPULAR_RESTUARANTS_QUERY}-${lon}-${lat}`;

  const query = useQuery({
    queryKey: [key],
    queryFn: () => getDiscover(lon, lat),
    staleTime: minutes(20),
  });

  return query;
};

export default useDiscoverQuery;
