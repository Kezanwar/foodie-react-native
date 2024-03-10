import { FEED_QUERY } from "constants/react-query";

export const createFeedQueryKey = (
  lat: number,
  lon: number,
  cuisines: string,
  dietary_requirements: string
) => {
  return `${FEED_QUERY}-${cuisines}-${dietary_requirements}-${lon}-${lat}`;
};
