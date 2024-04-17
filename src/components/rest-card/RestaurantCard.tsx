import { TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";
import { Image } from "expo-image";

import { Typography } from "components/typography";

import { AntDesign } from "@expo/vector-icons";

const iconCol = tw.color("primary-main");

interface Restaurant {
  id: string;
  name: string;
  avatar: string;
  cover_photo: string;
}

interface Location {
  _id: string;
  nickname: string;
  distance_miles?: number;
}

type Props = {
  location: Location;
  restaurant: Restaurant;
  navToRest: (location_id: string) => void;
};

const RestaurantCard: FC<Props> = ({ location, restaurant, navToRest }) => {
  return (
    <TouchableOpacity
      onPress={() => navToRest(location._id)}
      style={tw`w-[70vw] rounded-md`}
    >
      <Image
        style={tw`h-32 w-full rounded-md`}
        source={{ uri: restaurant.cover_photo }}
      />
      <View
        style={tw`mt-3 gap-1.5 justify-between items-center flex-row flex-wrap `}
      >
        <View style={tw`flex-row flex-wrap gap-1.75 flex-1 items-center`}>
          <AntDesign name="isv" size={17} color={iconCol} />
          <Typography style=" font-medium text-3.75" variant="body1">
            {restaurant.name}
          </Typography>

          {/* <Typography
                    style="text-3.25"
                    variant="body1"
                    color="text.secondary"
                  >
                    ({item.location.nickname})
                  </Typography> */}
        </View>
        {location?.distance_miles && (
          <Typography
            variant="body2"
            color="success.main"
            style=" font-medium  text-3.15"
          >
            {location.distance_miles.toFixed(1)} Miles
          </Typography>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
