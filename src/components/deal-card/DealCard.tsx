import { Image, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { IFeedDeal } from "types/feed";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import tw from "theme/tailwind";
import { Typography } from "components/typography";
import { GetSingleDealProps } from "types/single-deal";

type Props = {
  item: IFeedDeal;
  onShare: (name: string) => void;
  onLike: (item: IFeedDeal) => void;
  navToDeal: (data: GetSingleDealProps) => void;
};

const DealCard: FC<Props> = ({ item, onShare, onLike, navToDeal }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navToDeal({ deal_id: item.deal.id, location_id: item.location.id })
      }
      activeOpacity={0.8}
      style={tw` bg-white px-6 py-6 `}
    >
      <View style={tw`relative`}>
        <Image
          style={tw`h-40 rounded-md`}
          source={{ uri: item.restaurant.cover_photo }}
        />
        <TouchableOpacity
          onPress={() => onLike(item)}
          style={tw`absolute top-4 right-4 shadow-md`}
        >
          <AntDesign
            name={item.deal.is_favourited ? "heart" : "hearto"}
            size={24}
            color={item.deal.is_favourited ? tw.color("error-main") : "white"}
          />
        </TouchableOpacity>
      </View>

      <View style={tw` mt-5`}>
        <View style={tw`mb-2 flex-row items-start justify-between`}>
          <View>
            <Typography variant="subheader" style="text-4.5 mb-1">
              {item.deal.name}
            </Typography>
            <Typography
              variant="body2"
              // color="text.secondary"
              style="mb-2 text-3.75"
            >
              {item.restaurant.name} ({item.location.nickname})
            </Typography>
          </View>
          <View style={tw`items-end gap-2`}>
            <Typography
              variant="body2"
              color="success.main"
              style=" font-medium leading-1.2 text-3.25"
            >
              {item.location.distance_miles.toFixed(1)} Miles
            </Typography>
            <TouchableOpacity onPress={() => onShare(item.deal.name)}>
              <Ionicons
                name="md-share-outline"
                size={21}
                color={tw.color("primary-main")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Typography
          variant="body2"
          color="text.secondary"
          style="text-3.25"
          numberOfLines={2}
        >
          {item.deal.description}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

export default DealCard;
