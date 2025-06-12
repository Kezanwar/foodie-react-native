import { TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";
import { Image } from "expo-image";

import Typography from "components/typography";

import RestaurantAvatar from "components/restaurant-avatar";

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

const LocationCarouselCard: FC<Props> = ({
  location,
  restaurant,
  navToRest,
}) => {
  return (
    <TouchableOpacity
      onPress={() => navToRest(location._id)}
      style={tw`${"w-[70vw]"} rounded-md`}
    >
      <Image
        style={tw`h-32 w-full rounded-md`}
        source={{ uri: restaurant.cover_photo }}
      />
      <View
        style={tw`mt-3 gap-1.5  justify-between items-start flex-row flex-wrap `}
      >
        <View style={tw`flex-row flex-wrap gap-2 flex-1 items-center`}>
          <RestaurantAvatar size="md" source={{ uri: restaurant.avatar }} />
          <View>
            <Typography
              style=" font-semi-bold  leading-[1.3] text-4"
              variant="body1"
            >
              {restaurant.name}
            </Typography>

            <Typography
              style="text-3.25"
              variant="body2"
              color="text.secondary"
            >
              {location.nickname}
            </Typography>
          </View>
        </View>
        {location?.distance_miles && (
          <Typography
            variant="body2"
            color="success.main"
            style=" font-medium  pt-.75 text-3.15"
          >
            {location.distance_miles.toFixed(1)} Miles
          </Typography>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default LocationCarouselCard;
