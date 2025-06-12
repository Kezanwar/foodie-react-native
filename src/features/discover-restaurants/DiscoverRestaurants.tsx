import { View } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";

import { FlatList } from "react-native-gesture-handler";

import Typography, { LEADING_TIGHT } from "components/typography";

import CarouselDivider from "components/separators/carousel-divider";

import { PopularRestaurants } from "types/discover";
import { useAppSelector } from "hooks/useAppSelector";

import { CAROUSEL_ITEM_WIDTH } from "constants/theme";
import { LocationCarouselCard } from "features/location-card";

type Props = {
  restaurants?: PopularRestaurants[];
  navToRest: (location_id: string) => void;
};

const DiscoverRestaurants: FC<Props> = ({ restaurants, navToRest }) => {
  const location = useAppSelector((state) => state.location.reverseGeocode);

  return restaurants ? (
    <View>
      <View style={tw`mb-5  gap-1`}>
        <Typography style={`font-bold text-4.5 ${LEADING_TIGHT}`} variant="h6">
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
        snapToInterval={CAROUSEL_ITEM_WIDTH}
        renderItem={({ item }) => {
          return (
            <LocationCarouselCard
              location={item.location}
              navToRest={navToRest}
              restaurant={item.restaurant}
            />
          );
        }}
      />
    </View>
  ) : null;
};

export default DiscoverRestaurants;
