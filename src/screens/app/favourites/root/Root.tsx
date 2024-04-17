import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";

import { FlatList } from "react-native-gesture-handler";
import { Fader } from "react-native-ui-lib";

import { Typography } from "components/typography";

import CarouselDivider from "components/separators/carousel-divider";

import RestaurantCard from "components/rest-card/RestaurantCard";
import useFollowFavouritesQuery from "hooks/queries/useFollowFavouritesQuery";
import { FAVOURITES_STACK } from "constants/routes";
import SectionCard from "components/section-card/SectionCard";

type Props = any;

const Root: FC<Props> = ({ navigation }) => {
  // const { data } = useFollowFavouritesQuery();

  // const navToRest = (location_id: string) =>
  //   navigation.navigate(FAVOURITES_STACK.SINGLE_RESTAURANT, {
  //     location_id,
  //     show_cover_photo: true,
  //     stack: FAVOURITES_STACK,
  //   });

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <SectionCard>
        <Typography variant={"body1"}>Test</Typography>
      </SectionCard>
      {/* <View style={tw`bg-grey-200 gap-3`}> */}
      {/* <SectionCard>
          <SectionHeader
            subtext="Recently followed by you."
            title="Restaurants"
            onSeeAll={() => {}}
          />
          <View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={data?.following.slice(0, 3)}
              ItemSeparatorComponent={() => <CarouselDivider />}
              snapToAlignment="start"
              decelerationRate={"fast"}
              keyExtractor={(item) => item._id}
              snapToInterval={Dimensions.get("window").width * 0.74}
              renderItem={({ item }) => {
                return (
                  <RestaurantCard
                    location={item.location}
                    navToRest={navToRest}
                    restaurant={item.restaurant}
                  />
                );
              }}
            />
            <Fader visible size={30} position={Fader.position.END} />
          </View>
        </SectionCard>
        <SectionCard>
          <SectionHeader
            subtext="Recently favourited by you."
            title="Deals"
            onSeeAll={() => {}}
          />

          <FlatList
            contentContainerStyle={tw` gap-3`}
            data={data?.favourites.slice(0, 6)}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item._id}
                style={tw` border-dashed justify-between border-[1.25px] border-primary-lighter p-3 rounded-md`}
                // onPress={() =>
                //   navToDeal({
                //     deal_id: deal._id,
                //     location_id: restaurant._id,
                //     show_cover_photo: should_deal_show_cover,
                //   })
                // }
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  style="text-3.25 font-medium"
                >
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.primary"
                  style="text-3.25 font-medium"
                >
                  {item.name}
                </Typography>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => `${item._id}-`}
          />
        </SectionCard> */}
      {/* </View> */}
    </SafeAreaView>
  );
};

export default Root;

const SectionHeader: FC<{
  title: string;
  subtext: string;
  onSeeAll: () => void;
}> = ({ onSeeAll, subtext, title }) => {
  return (
    <View style={tw`flex-row items-center justify-between`}>
      <View style={tw`mb-5  gap-0.75`}>
        <Typography style="font-semi-bold leading-[0] text-4.5" variant="h6">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtext}
        </Typography>
      </View>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll}>
          <Typography variant="body2" color="primary.main">
            See All
          </Typography>
        </TouchableOpacity>
      )}
    </View>
  );
};
