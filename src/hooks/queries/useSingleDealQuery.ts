import { useQuery } from "@tanstack/react-query";
import { getSingleDeal } from "lib/api";
import { SINGLE_DEAL_QUERY } from "constants/react-query";

import { minutes } from "utils/time";
import { GetSingleDealProps } from "types/single-deal";

const getSingleDealKey = (data: GetSingleDealProps) =>
  `${SINGLE_DEAL_QUERY}-${data.deal_id}-${data.location_id}`;

const useSingleDealQuery = (data: GetSingleDealProps) => {
  const query = useQuery({
    queryKey: [getSingleDealKey(data)],
    queryFn: () => getSingleDeal(data),
    staleTime: minutes(20),
  });

  return query;
};

export default useSingleDealQuery;
