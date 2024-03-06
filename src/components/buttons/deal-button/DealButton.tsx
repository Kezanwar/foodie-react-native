import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";

import { RouteParams } from "screens/common/single-deal/SingleDeal";
import { Typography } from "components/typography";

import { ActiveDeal, IRestaurant } from "types/restaurant";
import LikeButton from "../like-button";

type Props = TouchableOpacityProps & {
  deal: ActiveDeal;
  navToDeal: (params: RouteParams) => void;
  restaurant: IRestaurant;
  should_deal_show_cover: boolean;
  onLike: (is_favourited: boolean, deal_id: string) => Promise<void>;
};

const DealButton: FC<Props> = ({
  deal,
  navToDeal,
  restaurant,
  should_deal_show_cover,
  onLike,
}) => {
  return (
    <TouchableOpacity
      key={deal._id}
      style={tw` border-dashed flex-row justify-between border-[1.25px] border-primary-lighter p-3 rounded-md`}
      onPress={() =>
        navToDeal({
          deal_id: deal._id,
          location_id: restaurant._id,
          show_cover_photo: should_deal_show_cover,
        })
      }
    >
      <Typography
        variant="body2"
        color="text.primary"
        style="text-3.25 font-medium"
      >
        {deal.name}
      </Typography>
      <LikeButton
        onPress={() => onLike(deal.is_favourited, deal._id)}
        liked={deal.is_favourited}
      />
    </TouchableOpacity>
  );
};

export default DealButton;
