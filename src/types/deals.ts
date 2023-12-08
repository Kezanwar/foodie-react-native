export type IFeedDeal = {
  _id: string;
  restaurant: {
    id: string;
    name: string;
    avatar: string;
    cover_photo: string;
  };
  deal: {
    id: string;
    name: string;
    description: string;
    is_favourited: boolean;
  };
  location: {
    id: string;
    nickname: string;
    distance_miles: number;
  };
};

export type IFeedDealResponse = IFeedDeal[];

export type DealInfinitePage = {
  nextCursor: number | undefined;
  deals: IFeedDealResponse;
};

export type ISearchFilterList = string[] | undefined;
