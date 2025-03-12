import { DEAL_FEED_QUERY, LOCATION_FEED_QUERY } from "constants/react-query";

export const createDealFeedQueryKey = (
  lat: number,
  lon: number,
  cuisines: string,
  dietary_requirements: string,
  search_text: string
) => {
  return `${DEAL_FEED_QUERY}-${cuisines}-${dietary_requirements}-${lon}-${lat}-${search_text}`;
};

export const createLocationFeedQueryKey = (
  lat: number,
  lon: number,
  cuisines: string,
  dietary_requirements: string,
  search_text: string
) => {
  return `${LOCATION_FEED_QUERY}-${cuisines}-${dietary_requirements}-${lon}-${lat}-${search_text}`;
};
