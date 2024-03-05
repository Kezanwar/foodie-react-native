import { Dimensions, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";
import { Image } from "expo-image";
import { FlatList } from "react-native-gesture-handler";
import { Fader } from "react-native-ui-lib";

import { Typography } from "components/typography";

import { AntDesign } from "@expo/vector-icons";
import CarouselDivider from "components/separators/carousel-divider";

import { PopularRestaurants } from "types/discover";
import { useAppSelector } from "hooks/useAppSelector";

const iconCol = tw.color("primary-main");

type Props = {
  restaurants?: PopularRestaurants[];
  navToRest: (location_id: string) => void;
};

const DiscoverRestaurants: FC<Props> = ({ restaurants, navToRest }) => {
  const location = useAppSelector((state) => state.location.reverseGeocode);

  return restaurants ? (
    <View>
      <View style={tw`mb-5  gap-1`}>
        <Typography style="font-semi-bold leading-[0] text-4.5" variant="h6">
          Popular Restaurants
        </Typography>
        <Typography variant="body2" color="text.secondary">
          near {location?.city}, {location?.subregion}
        </Typography>
      </View>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={restaurants}
        ItemSeparatorComponent={() => <CarouselDivider />}
        snapToAlignment="start"
        decelerationRate={"fast"}
        keyExtractor={(item) => item._id}
        snapToInterval={Dimensions.get("window").width * 0.74}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navToRest(item._id)}
              style={tw`w-[70vw] rounded-md`}
            >
              <Image
                style={tw`h-32 w-full rounded-md`}
                source={{ uri: item.restaurant.cover_photo }}
              />
              <View
                style={tw`mt-3 gap-1.5 justify-between items-center flex-row flex-wrap `}
              >
                <View
                  style={tw`flex-row flex-wrap gap-1.75 flex-1 items-center`}
                >
                  <AntDesign name="isv" size={17} color={iconCol} />
                  <Typography style=" font-medium text-3.75" variant="body1">
                    {item.restaurant.name}
                  </Typography>

                  <Typography
                    style="text-3.25"
                    variant="body1"
                    color="text.secondary"
                  >
                    ({item.location.nickname})
                  </Typography>
                </View>
                <Typography
                  variant="body2"
                  color="success.main"
                  style=" font-medium  text-3.15"
                >
                  {item.location.distance_miles.toFixed(1)} Miles
                </Typography>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <Fader visible size={30} position={Fader.position.END} />
    </View>
  ) : null;
};

export default DiscoverRestaurants;
