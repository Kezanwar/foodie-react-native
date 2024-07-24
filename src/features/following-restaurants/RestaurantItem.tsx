import { View, Animated } from "react-native";
import React, { FC, useCallback, useMemo } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import tw from "theme/tailwind";

import RestaurantAvatar from "components/restaurant-avatar";
import { Typography } from "components/typography";
import { TouchableOpacity } from "react-native-gesture-handler";

import { AntDesign } from "@expo/vector-icons";
import { getDistanceInMiles } from "utils/distance";
import { Coordinates } from "types/geometry";
import { LocationObjectCoords } from "expo-location";

interface Restaurant {
  id: string;
  name: string;
  avatar: string;
  cover_photo: string;
}

interface Location {
  _id: string;
  nickname: string;
  coordinates: Coordinates;
}

type Props = {
  location: Location;
  restaurant: Restaurant;
  navToRest: (location_id: string) => void;
  unfollowRest: (location_id: string, rest_id: string) => void;
  userCoordinates: LocationObjectCoords | undefined;
};

type RenderRightActions = (
  progressAnimatedValue: Animated.AnimatedInterpolation<string | number>,
  dragAnimatedValue: Animated.AnimatedInterpolation<string | number>,
  swipeable: Swipeable
) => React.ReactNode;

const iconCol = tw.color("error-main");

const RestaurantItem: FC<Props> = ({
  restaurant,
  location,
  navToRest,
  unfollowRest,
  userCoordinates,
}) => {
  const renderLeftActions: RenderRightActions = useCallback((_, dragX) => {
    const transX = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 10, 30, 50],
    });
    const scale = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0.55, 0.3, 0.1, 0],
    });
    return (
      <Animated.View
        style={[
          tw`h-full`,
          {
            transform: [{ translateX: transX }, { scale }],
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => unfollowRest(location._id, restaurant.id)}
          style={tw`h-full px-5 items-center justify-center`}
        >
          <AntDesign name="close" size={24} color={iconCol} />
        </TouchableOpacity>
      </Animated.View>
    );
  }, []);

  const distance = useMemo(() => {
    if (location && userCoordinates) {
      return getDistanceInMiles(location.coordinates, [
        userCoordinates.longitude,
        userCoordinates.latitude,
      ]);
    } else return 0;
  }, [userCoordinates, location]);

  return (
    <Swipeable renderRightActions={renderLeftActions}>
      <TouchableOpacity
        onPress={() => navToRest(location._id)}
        style={tw` px-5 py-2.5 flex-row  flex-wrap gap-3  items-center`}
      >
        <RestaurantAvatar size="md" source={{ uri: restaurant.avatar }} />
        <View>
          <Typography
            style=" font-semi-bold leading-[1.3] text-4"
            variant="body1"
          >
            {restaurant.name}
          </Typography>
          {location?.nickname && (
            <Typography style="text-3.5" variant="body2" color="text.secondary">
              {location.nickname}
            </Typography>
          )}
        </View>
        <View style={tw`flex-1 items-end`}>
          <Typography
            variant="body2"
            color="success.main"
            style=" font-medium  text-3.25"
          >
            {distance.toFixed(1)} Miles
          </Typography>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default RestaurantItem;
