import { Coordinates } from "types/geometry";
export type IFeedDeal = {
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
    distance_miles?: number;
    coordinates?: Coordinates;
  };
};

export type IFeedDealResponse = IFeedDeal[];

export type DealInfinitePage = {
  nextCursor: number | undefined;
  deals: IFeedDealResponse;
};

export type ISearchFilterList = string[] | undefined;
