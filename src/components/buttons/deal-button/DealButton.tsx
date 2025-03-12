import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";
import { AntDesign } from "@expo/vector-icons";
import Typography from "components/typography";

import { ActiveDeal, IRestaurant } from "types/restaurant";
import LikeButton from "../like-button";
import { GetSingleDealProps } from "types/single-deal";

type Props = TouchableOpacityProps & {
  deal: ActiveDeal;
  openDeal: (params: GetSingleDealProps) => void;
  restaurant: IRestaurant;
  onLike: (is_favourited: boolean, deal_id: string) => Promise<void>;
};

const iconCol = tw.color("primary-light");

const DealButton: FC<Props> = ({ openDeal, restaurant, deal, onLike }) => {
  return (
    <TouchableOpacity
      key={deal._id}
      style={tw` border-dashed flex-row justify-between border border-grey-300 p-3 rounded-lg`}
      onPress={() =>
        openDeal({
          deal_id: deal._id,
          location_id: restaurant._id,
        })
      }
    >
      <View style={tw`flex-row gap-2 items-center`}>
        <AntDesign name="tago" size={18} color={iconCol} />
        <Typography
          variant="body2"
          color="text.primary"
          style="text-3.5  font-semi-bold"
        >
          {deal.name}
        </Typography>
      </View>

      <LikeButton
        onPress={() => onLike(deal.is_favourited, deal._id)}
        liked={deal.is_favourited}
      />
    </TouchableOpacity>
  );
};

export default DealButton;
