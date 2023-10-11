import { useQuery } from "@tanstack/react-query";
import { getOptions } from "lib/api/api";

import { OPTIONS_QUERY } from "constants/react-query";

const useOptionsQuery = () => {
  const query = useQuery({
    queryKey: [OPTIONS_QUERY],
    queryFn: getOptions,
    enabled: true,
    staleTime: 20 * (60 * 1000),
  });

  return query;
};

export default useOptionsQuery;
