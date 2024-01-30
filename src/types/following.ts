export type FollowRestRequest = {
  location_id: string;
  rest_id: string;
};

export type FollowRestResponse = {
  location_id: string;
  rest_id: string;
  is_following: boolean;
};
