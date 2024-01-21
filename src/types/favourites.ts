export type FavouriteDealRequest = {
  deal_id: string;
  location_id: string;
};

export type FavouriteDealResponse = {
  deal_id: string;
  location_id: string;
  is_favourited: boolean;
};
