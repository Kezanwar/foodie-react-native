import { useQuery } from "@tanstack/react-query";
import { getOptions } from "lib/api/api";

import { OPTIONS_QUERY } from "constants/react-query";

import { minutes } from "util/time";

const useOptionsQuery = () => {
  const query = useQuery({
    queryKey: [OPTIONS_QUERY],
    queryFn: getOptions,
    enabled: true,
    staleTime: minutes(20),
  });

  return query;
};

export default useOptionsQuery;
