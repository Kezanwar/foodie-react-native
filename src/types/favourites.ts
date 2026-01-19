export type FavouriteDealItem = {
  deal_id: string;
  location_id: string;
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
  };
  location: {
    _id: string;
    nickname: string;
  };
};
