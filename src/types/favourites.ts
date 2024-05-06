export type FavouriteDealRequest = {
  deal_id: string;
  location_id: string;
};

export type FavouriteDealResponse = {
  deal_id: string;
  location_id: string;
  is_favourited: boolean;
};

export type FavouritesInfinitePage = {
  nextCursor: number | undefined;
  deals: ListItem[];
};

type ListItem = {
  _id: string;
  restaurant: {
    _id: string;
    name: string;
    avatar: string;
    cover_photo: string;
  };
  deal: {
    _id: string;
    name: string;
    description: string;
    is_favourited: boolean;
  };
  location: {
    _id: string;
    nickname: string;
  };
};
