import { Image, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { IFeedDeal } from "types/deals";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import tw from "theme/tailwind";
import { Typography } from "components/typography";

type Props = { item: IFeedDeal; onShare: (name: string) => void };

const DealCard: FC<Props> = ({ item, onShare }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} style={tw` bg-white px-6 py-6 `}>
      <View style={tw`relative`}>
        <Image
          style={tw`h-40 rounded-md`}
          source={{ uri: item.restaurant.cover_photo }}
        />
        <TouchableOpacity style={tw`absolute top-4 right-4 shadow-md`}>
          <AntDesign
            name={item.deal.is_favourited ? "heart" : "hearto"}
            size={22}
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

{
  /* {feed &&
              feed.map((item) => {
                return (
                  // <View style={tw`border-[0.2px] p-3 rounded-lg border-grey-300`}>
                  <View>
                    <Typography variant="subheader" style="text-5 mb-1">
                      {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      // color="text.secondary"
                      style="mb-2 text-4"
                    >
                      {item.restaurant.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style="mb-4 text-3"
                      numberOfLines={2}
                    >
                      {item.description}
                    </Typography> */
}
{
  /* <View style={tw`flex-row gap-2`}>
                    <Ionicons
                      name="restaurant-outline"
                      size={20}
                      color={tw.color("primary-main")}
                    />
                    <ChipContainer style={"mb-3 "}>
                      {item.cuisines.map((c) => {
                        return <ChipReadOnly label={c.name} />;
                      })}
                    </ChipContainer>
                  </View>
                  <View style={tw`flex-row gap-2`}>
                    <Ionicons
                      name="ios-leaf-outline"
                      size={20}
                      color={tw.color("success-main")}
                    />
                    <ChipContainer style={"mb-3"}>
                      {item.dietary_requirements.map((c) => {
                        return <ChipReadOnly label={c.name} />;
                      })}
                    </ChipContainer>
                  </View> */
}
{
  /* </View> */
}
{
  /* );
              })} */
}
