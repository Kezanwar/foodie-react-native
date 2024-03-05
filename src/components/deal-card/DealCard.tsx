import { TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import React, { FC } from "react";
import { IFeedDeal } from "types/feed";
import { AntDesign } from "@expo/vector-icons";
import tw from "theme/tailwind";
import { Typography } from "components/typography";

import ShareButton from "components/buttons/share-button";
import LikeButton from "components/buttons/like-button";
import { RouteParams } from "screens/common/single-deal/SingleDeal";

type Props = {
  item: IFeedDeal;
  onShare: (name: string) => void;
  onLike: (item: IFeedDeal) => void;
  navToDeal: (data: RouteParams) => void;
};

const DealCard: FC<Props> = ({ item, onShare, onLike, navToDeal }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navToDeal({
          deal_id: item.deal.id,
          location_id: item.location.id,
          show_cover_photo: true,
        })
      }
      activeOpacity={0.8}
      style={tw` bg-white px-6 py-6 `}
    >
      <View style={tw`relative`}>
        <Image
          style={tw`h-40 rounded-md`}
          source={{ uri: item.restaurant.cover_photo }}
        />
      </View>

      <View style={tw`mt-5`}>
        <View style={tw` flex-row items-start justify-between`}>
          <View style={tw`gap-1.5`}>
            <View style={tw`flex-row gap-1.5  max-w-60`}>
              <AntDesign
                name="tago"
                size={20}
                color={tw.color("primary-main")}
                style={tw`-mt-0.5`}
              />
              <Typography variant="subheader" style="text-4.5 mb-1">
                {item.deal.name}
              </Typography>
            </View>

            <Typography variant="body2" style=" text-3.75 font-normal">
              {item.restaurant.name}{" "}
              <Typography
                variant="body2"
                color="text.secondary"
                style=" text-3.25 font-normal"
              >
                ({item.location.nickname})
              </Typography>
            </Typography>
          </View>
          <View style={tw`gap-3`}>
            <View style={tw`items-start justify-end  -m-0.5  flex-row gap-2.5`}>
              <ShareButton onPress={() => onShare(item.deal.name)} />
              <LikeButton
                liked={item.deal.is_favourited}
                onPress={() => onLike(item)}
              />
            </View>
            <Typography
              variant="body2"
              color="success.main"
              style=" font-medium  text-3.25"
            >
              {item.location.distance_miles.toFixed(1)} Miles
            </Typography>
          </View>
        </View>

        <Typography
          variant="body2"
          color="text.secondary"
          style="text-3.25 mt-3 leading-[1.6]"
          numberOfLines={2}
        >
          {item.deal.description}
        </Typography>
      </View>
    </TouchableOpacity>
  );
};

export default DealCard;
