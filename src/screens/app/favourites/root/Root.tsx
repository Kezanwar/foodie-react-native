import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useMemo } from "react";
import tw from "theme/tailwind";

import { FlatList } from "react-native-gesture-handler";

import { Typography } from "components/typography";

import CarouselDivider from "components/separators/carousel-divider";

import RestaurantCard from "features/rest-card/RestaurantCard";

import SectionCard from "components/section-card/SectionCard";
import useFollowingQuery from "hooks/queries/useFollowingQuery";
import { FAVOURITES_STACK } from "constants/routes";
import { CAROUSEL_ITEM_WIDTH } from "constants/theme";
import useFavouritesQuery from "hooks/queries/useFavouritesQuery";
import DealCard from "features/deal-card";
import { IFeedDeal } from "types/feed";
import useAppDispatch from "hooks/useAppDispatch";
import { setSingleDeal } from "store/single-deal/single-deal.slice";
import { GetSingleDealProps } from "types/single-deal";

type Props = any;

const Root: FC<Props> = ({ navigation }) => {
  const { data: followData } = useFollowingQuery(0);

  const dispatch = useAppDispatch();

  const following = useMemo(() => {
    return followData?.pages[0].restaurants.slice(0, 4) || [];
  }, [followData]);

  const { data: favData } = useFavouritesQuery(0);

  const favs = useMemo(() => {
    return favData?.pages[0].deals.slice(0, 4) || [];
  }, [favData]);

  const navToRest = (location_id: string) =>
    navigation.navigate(FAVOURITES_STACK.SINGLE_RESTAURANT, {
      location_id,
      stack: FAVOURITES_STACK,
    });

  const openDeal = (data: GetSingleDealProps) => {
    dispatch(
      setSingleDeal({
        deal_id: data.deal_id,
        location_id: data.location_id,
        stack: FAVOURITES_STACK,
        linkRestaurant: true,
      })
    );
  };

  const seeAllFollowing = () => navigation.navigate(FAVOURITES_STACK.FOLLOWING);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`bg-grey-200 gap-3`}>
        <SectionCard>
          <SectionHeader
            subtext="Recently favourited by you"
            title="Deals"
            onSeeAll={() => {}}
          />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={favs}
            ItemSeparatorComponent={() => <CarouselDivider />}
            snapToAlignment="start"
            decelerationRate={"fast"}
            keyExtractor={(item) => item._id}
            snapToInterval={CAROUSEL_ITEM_WIDTH}
            renderItem={({ item }) => {
              return (
                <DealCard
                  type="carousel"
                  item={item as IFeedDeal}
                  onShare={(name) => {}}
                  onLike={(item) => {}}
                  openDeal={openDeal}
                  // location={item.location}
                  // navToRest={navToRest}
                  // restaurant={item.restaurant}
                />
              );
            }}
          />
        </SectionCard>
        <SectionCard>
          <SectionHeader
            subtext="Restaurants recently followed by you"
            title="Following"
            onSeeAll={seeAllFollowing}
          />

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={following}
            ItemSeparatorComponent={() => <CarouselDivider />}
            snapToAlignment="start"
            decelerationRate={"fast"}
            keyExtractor={(item) => item._id}
            snapToInterval={CAROUSEL_ITEM_WIDTH}
            renderItem={({ item }) => {
              return (
                <RestaurantCard
                  type="carousel"
                  location={item.location}
                  navToRest={navToRest}
                  restaurant={item.restaurant}
                />
              );
            }}
          />
        </SectionCard>

        <SectionCard>
          <SectionHeader
            subtext="The last 5 deals you've viewed"
            title="Recently Viewed"
          />
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={favs}
            ItemSeparatorComponent={() => <CarouselDivider />}
            snapToAlignment="start"
            decelerationRate={"fast"}
            keyExtractor={(item) => item._id}
            snapToInterval={CAROUSEL_ITEM_WIDTH}
            renderItem={({ item }) => {
              return (
                <DealCard
                  type="carousel"
                  item={item as IFeedDeal}
                  onShare={(name) => {}}
                  onLike={(item) => {}}
                  openDeal={openDeal}
                  // location={item.location}
                  // navToRest={navToRest}
                  // restaurant={item.restaurant}
                />
              );
            }}
          />
        </SectionCard>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Root;

const SectionHeader: FC<{
  title: string;
  subtext: string;
  onSeeAll?: () => void;
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
