import { FEED_QUERY } from "constants/react-query";

export const createFeedQueryKey = (
  lat: number,
  lon: number,
  cuisines: string,
  dietary_requirements: string,
  search_text: string
) => {
  return `${FEED_QUERY}-${cuisines}-${dietary_requirements}-${lon}-${lat}-${search_text}`;
};
