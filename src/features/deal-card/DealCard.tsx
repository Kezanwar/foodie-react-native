import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import React, { FC } from "react";
import { IFeedDeal } from "types/feed";
import { AntDesign } from "@expo/vector-icons";
import tw from "theme/tailwind";
import { Typography } from "components/typography";

import ShareButton from "components/buttons/share-button";
import LikeButton from "components/buttons/like-button";
import { GetSingleDealProps } from "types/single-deal";
import ls from "lib/storage/storage";

const { setRecentlyViewedDisplay } = ls;

type Props = {
  item: IFeedDeal;
  onShare: (name: string) => void;
  onLike: (item: IFeedDeal) => void;
  openDeal: (data: GetSingleDealProps) => void;
  type: "carousel" | "list";
  showActions?: boolean;
};

const DealCard: FC<Props> = ({
  item,
  onShare,
  onLike,
  openDeal,
  type,
  showActions = true,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        setRecentlyViewedDisplay(item);
        openDeal({
          deal_id: item.deal._id,
          location_id: item.location._id,
        });
      }}
      activeOpacity={0.8}
      style={tw`bg-white  ${type === "list" ? "px-5 py-6" : "w-[70vw]"}   `}
    >
      <View style={tw`relative`}>
        <Image
          style={tw`h-35 rounded-md `}
          source={{ uri: item.restaurant.cover_photo }}
        />
      </View>

      <View style={tw` mt-5 flex-row items-start justify-between`}>
        <View style={tw`gap-1.5`}>
          <View style={tw`flex-row gap-1.5 ${showActions ? "max-w-66" : ""}`}>
            <AntDesign
              name="tago"
              size={20}
              color={tw.color("primary-main")}
              style={tw`-mt-0.5`}
            />
            <Typography variant="subheader" style="text-4.3  mb-1">
              {item.deal.name}
            </Typography>
          </View>

          <Typography variant="body2" style=" text-3.75 font-normal">
            {item.restaurant.name}{" "}
            {type === "list" && (
              <Typography
                variant="body2"
                color="text.secondary"
                style=" text-3.25 font-normal"
              >
                ({item.location.nickname})
              </Typography>
            )}
          </Typography>
        </View>
        <View style={tw`gap-3`}>
          {type === "list" && showActions && (
            <View style={tw`items-start justify-end  -m-0.5  flex-row gap-1`}>
              <ShareButton onPress={() => onShare(item.deal.name)} />
              <LikeButton
                liked={item.deal.is_favourited}
                onPress={() => onLike(item)}
              />
            </View>
          )}
          {item.location.distance_miles && type === "list" && (
            <Typography
              variant="body2"
              color="success.main"
              style=" font-medium  text-3.25"
            >
              {item.location.distance_miles.toFixed(1)} Miles
            </Typography>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DealCard;
