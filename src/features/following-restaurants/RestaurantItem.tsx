import { View, Animated } from "react-native";
import React, { FC, useCallback } from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import tw from "theme/tailwind";

import RestaurantAvatar from "components/restaurant-avatar";
import { Typography } from "components/typography";
import { TouchableOpacity } from "react-native-gesture-handler";

import { AntDesign } from "@expo/vector-icons";

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
  unfollowRest: (location_id: string, rest_id: string) => void;
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
}) => {
  const renderLeftActions: RenderRightActions = useCallback((_, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [0, 10, 30, 50],
    });
    return (
      <Animated.View
        style={[
          tw`h-full`,
          {
            transform: [{ translateX: trans }],
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

  return (
    <Swipeable renderRightActions={renderLeftActions}>
      <TouchableOpacity
        onPress={() => navToRest(location._id)}
        style={tw` px-5 py-2.5 flex-row  flex-wrap gap-3  items-center`}
      >
        <RestaurantAvatar size="md" source={{ uri: restaurant.avatar }} />
        <View>
          <Typography style=" font-medium leading-[1.3] text-4" variant="body1">
            {restaurant.name}
          </Typography>
          {location?.nickname && (
            <Typography
              style="text-3.25"
              variant="body2"
              color="text.secondary"
            >
              {location.nickname}
            </Typography>
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default RestaurantItem;
