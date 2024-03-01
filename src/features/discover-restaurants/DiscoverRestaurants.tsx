import { Dimensions, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";
import { Image } from "expo-image";
import { Typography } from "components/typography";
import { FlatList } from "react-native-gesture-handler";
import { Fader } from "react-native-ui-lib";

import StoreFront from "components/svgs/store-front";
import { PopularRestaurants } from "types/discover";
import { useAppSelector } from "hooks/useAppSelector";

const iconCol = tw.color("primary-main");

type Props = {
  restaurants?: PopularRestaurants[];
};

const DiscoverRestaurants: FC<Props> = ({ restaurants }) => {
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
        ItemSeparatorComponent={() => <View style={tw`w-[4vw]`} />}
        snapToAlignment="start"
        decelerationRate={"fast"}
        keyExtractor={(item) => item._id}
        snapToInterval={Dimensions.get("window").width * 0.74}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={tw`w-[70vw] rounded-md`}>
              <Image
                style={tw`h-32 w-[70vw] rounded-md`}
                source={{ uri: item.restaurant.cover_photo }}
              />
              <View
                style={tw`mt-3 gap-1.5 justify-between items-center flex-row flex-wrap `}
              >
                <View style={tw`flex-row flex-wrap gap-1.75 items-center`}>
                  <StoreFront color={iconCol} />
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
