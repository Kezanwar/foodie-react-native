export type ActiveDealReadOnly = {
  deal_id: string;
  name: string;
};

export type IHomeFeedItem = {
  _id: string;
  restaurant: {
    _id: string;
    name: string;
    avatar: string;
    cover_photo: string;
  };
  location: {
    _id: string;
    nickname: string;
    distance_miles: number;
    active_deals: ActiveDealReadOnly[];
  };
};

export type IHomeFeedResponse = IHomeFeedItem[];

export type HomeFeedInfinitePage = {
  nextCursor: number | undefined;
  locations: IHomeFeedResponse;
};
