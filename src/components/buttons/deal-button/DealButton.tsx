import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";

import { Typography } from "components/typography";

import { ActiveDeal, IRestaurant } from "types/restaurant";
import LikeButton from "../like-button";
import { GetSingleDealProps } from "types/single-deal";

type Props = TouchableOpacityProps & {
  deal: ActiveDeal;
  openDeal: (params: GetSingleDealProps) => void;
  restaurant: IRestaurant;
  onLike: (is_favourited: boolean, deal_id: string) => Promise<void>;
};

const DealButton: FC<Props> = ({ openDeal, restaurant, deal, onLike }) => {
  return (
    <TouchableOpacity
      key={deal._id}
      style={tw` border-dashed flex-row justify-between border-[1.25px] border-primary-lighter p-3 rounded-md`}
      onPress={() =>
        openDeal({
          deal_id: deal._id,
          location_id: restaurant._id,
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
