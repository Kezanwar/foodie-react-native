import { ScrollView, View } from "react-native";
import React, { FC } from "react";

import tw from "theme/tailwind";
import { AntDesign } from "@expo/vector-icons";

import { LoadingScreen } from "components/loading-screen";
import { Typography } from "components/typography";
import Divider from "components/divider";
import { ChipContainer } from "components/chip";
import ChipReadOnly from "components/chip/ChipReadOnly";
import FollowButton from "components/buttons/follow-button";
import EmptyState from "components/empty-state/EmptyState";

import useMutateFavouriteDeal from "hooks/queries/useMutateFavouriteDeal";
import useMutateFollowingRest from "hooks/queries/useMututateFollowingRest";

import { Image } from "expo-image";
import useSingleRestaurantQuery from "hooks/queries/useSingleRestaurantQuery";
import RestaurantInfoTabs from "features/restaurant-info-tabs";
import { DynamicStack } from "constants/routes";

import { RouteParams as DealRouteParams } from "../single-deal/SingleDeal";
import DealButton from "components/buttons/deal-button";

import CoverBackButton from "components/cover-back-button";

export type RouteParams = {
  location_id: string;
  show_cover_photo: boolean;
  should_deal_show_cover: boolean;
  stack: DynamicStack;
};

const iconCol = tw.color("primary-main");

const SingleRestaurant: FC = ({ route, navigation }: any) => {
  const { location_id, show_cover_photo, should_deal_show_cover, stack } =
    route.params as RouteParams;

  const {
    data: restaurant,
    isLoading,
    isError,
  } = useSingleRestaurantQuery({
    location_id,
  });

  const mutateFav = useMutateFavouriteDeal();

  const onLike = async (is_favourited: boolean, deal_id: string) => {
    if (restaurant)
      try {
        mutateFav.mutate({
          deal_id: deal_id,
          location_id: restaurant._id,
          is_favourited,
        });
      } catch (error) {
        console.log(error);
      }
  };

  const navToDeal = (data: DealRouteParams) => {
    data.stack = stack;
    navigation.navigate(stack.SINGLE_DEAL, data);
  };

  const mutateFollow = useMutateFollowingRest();

  const onFollow = async () => {
    if (restaurant)
      try {
        mutateFollow.mutate({
          location_id: restaurant._id,
          rest_id: restaurant.restaurant.id,
          is_following: restaurant.is_following,
        });
      } catch (error) {
        console.log(error);
      }
  };

  if (isLoading) return <LoadingScreen />;

  if (!restaurant || isError)
    return (
      <EmptyState
        title="Oops!"
        description="Sorry we can't seem to find that deal, it may have been deleted"
        action={navigation.goBack}
        actionText="Go back"
      />
    );

  return (
    <View style={tw`flex-1 bg-white`}>
      <CoverBackButton
        cover_photo={restaurant.restaurant.cover_photo}
        goBack={navigation.goBack}
        show_cover_photo={show_cover_photo}
      />
      <ScrollView>
        <View style={tw`px-6 relative`}>
          <View style={tw`mt-3 flex-row  items-center gap-4`}>
            <Image
              transition={500}
              style={tw` rounded-full  w-18  h-18  `}
              source={{ uri: restaurant.restaurant.avatar }}
            />

            <View style={tw`gap-2`}>
              <Typography
                variant="h6"
                style="font-semi-bold text-4.25 max-w-80"
              >
                {restaurant.restaurant.name}
                <Typography
                  variant="h6"
                  style="font-light text-4"
                  color="text.secondary"
                >
                  {"  "}({restaurant.nickname})
                </Typography>
              </Typography>
              <View style={tw`gap-3 items-center flex-row`}>
                <FollowButton
                  onPress={onFollow}
                  following={restaurant.is_following}
                />
                <Typography
                  variant="body2"
                  color="success.main"
                  style=" font-medium  text-3.25"
                >
                  {restaurant.distance_miles.toFixed(1)} Miles
                </Typography>
              </View>
            </View>
          </View>
          <Divider my="6" />
          <View style={tw` gap-2`}>
            <View style={tw`flex-row justify-between`}>
              <View style={tw`flex-row items-center gap-2 `}>
                <AntDesign name="isv" size={19} color={iconCol} />
                <Typography
                  variant="h6"
                  style="font-semi-bold text-4.25 max-w-[89%] leading-0"
                >
                  Restaurant Bio
                </Typography>
              </View>
            </View>

            <Typography
              variant="body2"
              color="text.secondary"
              style="leading-[1.6]"
            >
              {restaurant.restaurant.bio}
            </Typography>
          </View>
          <ChipContainer style="mt-5">
            {restaurant.cuisines.map(({ name, slug }) => (
              <ChipReadOnly key={slug} size="lg" label={name} />
            ))}
            {restaurant.dietary_requirements.map(({ name, slug }) => (
              <ChipReadOnly key={slug} size="lg" label={name} />
            ))}
          </ChipContainer>
          <Divider my="6" />
          <View style={tw`flex-row  items-center gap-2 mb-4`}>
            <AntDesign name="tago" size={20} color={iconCol} />
            <Typography
              variant="h6"
              style="font-semi-bold text-4.25  leading-0"
            >
              Deals
            </Typography>
          </View>
          <View style={tw`gap-3`}>
            {restaurant.active_deals.map((deal) => {
              return (
                <DealButton
                  deal={deal}
                  key={deal._id}
                  onLike={onLike}
                  restaurant={restaurant}
                  navToDeal={navToDeal}
                  should_deal_show_cover={should_deal_show_cover}
                />
              );
            })}
          </View>
          <Divider style="mt-6 mb-3" />
        </View>
        <RestaurantInfoTabs
          initialIndex={show_cover_photo ? 0 : 1}
          address={restaurant.address}
          email={restaurant.email}
          geometry={restaurant.geometry}
          name={restaurant.restaurant.name}
          phone_number={restaurant.phone_number}
          booking_link={restaurant.restaurant?.booking_link}
          opening_times={restaurant.opening_times}
        />
      </ScrollView>
    </View>
  );
};

export default SingleRestaurant;
