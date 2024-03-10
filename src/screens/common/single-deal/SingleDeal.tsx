import { ScrollView, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";

import tw from "theme/tailwind";
import { AntDesign } from "@expo/vector-icons";

import { LoadingScreen } from "components/loading-screen";
import { Typography } from "components/typography";
import Divider from "components/divider";
import { ChipContainer } from "components/chip";
import ChipReadOnly from "components/chip/ChipReadOnly";

import LikeButton from "components/buttons/like-button";
import ShareButton from "components/buttons/share-button";
import FollowButton from "components/buttons/follow-button";
import EmptyState from "components/empty-state/EmptyState";

import useSingleDealQuery from "hooks/queries/useSingleDealQuery";
import useMutateFavouriteDeal from "hooks/queries/useMutateFavouriteDeal";
import useMutateFollowingRest from "hooks/queries/useMututateFollowingRest";

import { GetSingleDealProps } from "types/single-deal";
import { Image } from "expo-image";
import { DynamicStack } from "constants/routes";
import RestaurantInfoTabs from "features/restaurant-info-tabs";
import { RouteParams as RestRouteParams } from "../single-restaurant/SingleRestaurant";
import CoverBackButton from "components/cover-back-button";

export type RouteParams = GetSingleDealProps & {
  show_cover_photo: boolean;
  stack?: DynamicStack;
};

const SingleDeal: FC = ({ route, navigation }: any) => {
  const { deal_id, location_id, show_cover_photo, stack } =
    route.params as RouteParams;

  const {
    data: deal,
    isLoading,
    isError,
  } = useSingleDealQuery({
    deal_id,
    location_id,
  });

  const mutateFav = useMutateFavouriteDeal();

  const onLike = async () => {
    if (deal)
      try {
        mutateFav.mutate({
          deal_id: deal._id,
          location_id: deal.location._id,
          is_favourited: deal.is_favourited,
        });
      } catch (error) {
        console.log(error);
      }
  };

  const mutateFollow = useMutateFollowingRest();

  const onFollow = async () => {
    if (deal)
      try {
        mutateFollow.mutate({
          location_id: deal.location._id,
          rest_id: deal.restaurant.id,
          is_following: deal.is_following,
        });
      } catch (error) {
        console.log(error);
      }
  };

  const navRest = () =>
    navigation.navigate(stack?.SINGLE_RESTAURANT, {
      location_id,
      should_deal_show_cover: true,
      stack,
    } as RestRouteParams);

  if (isLoading) return <LoadingScreen />;

  if (!deal || isError)
    return (
      <EmptyState
        title="Oops!"
        description="Sorry we can't seem to find that deal, it may have been deleted"
        action={navigation.goBack}
        actionText="Go back"
      />
    );

  return (
    <>
      <View style={tw`flex-1 bg-white`}>
        <CoverBackButton
          cover_photo={deal.restaurant.cover_photo}
          goBack={navigation.goBack}
          show_cover_photo={show_cover_photo}
        />

        <ScrollView contentContainerStyle={tw`pb-20`}>
          <View style={tw`px-6 relative`}>
            <View style={tw` pt-3 flex-row  items-center gap-4`}>
              <TouchableOpacity onPress={navRest}>
                <Image
                  transition={500}
                  style={tw` rounded-full  w-18  h-18  `}
                  source={{ uri: deal.restaurant.avatar }}
                />
              </TouchableOpacity>

              <View style={tw`gap-2`}>
                <Typography
                  variant="h6"
                  style="font-semi-bold text-4.25 max-w-80"
                >
                  {deal.restaurant.name}
                  <Typography
                    variant="h6"
                    style="font-light text-4"
                    color="text.secondary"
                  >
                    {"  "}({deal.location.nickname})
                  </Typography>
                </Typography>
                <View style={tw`gap-3 items-center flex-row`}>
                  <FollowButton
                    onPress={onFollow}
                    following={deal.is_following}
                  />
                  <Typography
                    variant="body2"
                    color="success.main"
                    style=" font-medium  text-3.25"
                  >
                    {deal.distance_miles.toFixed(1)} Miles
                  </Typography>
                </View>
              </View>
            </View>

            <Divider my="6" />

            <View style={tw` gap-2`}>
              <View style={tw`flex-row justify-between`}>
                <View style={tw`flex-row items-start gap-2`}>
                  <AntDesign
                    name="tago"
                    size={20}
                    color={tw.color("primary-main")}
                    style={tw`-mt-0.5`}
                  />
                  <Typography
                    variant="h6"
                    style="font-semi-bold text-4.25 max-w-[89%] "
                  >
                    {deal.name}
                  </Typography>
                </View>
                <View
                  style={tw`items-start justify-end  -m-0.5  flex-row gap-2.5`}
                >
                  <ShareButton onPress={navigation.goBack} />
                  <LikeButton liked={deal.is_favourited} onPress={onLike} />
                </View>
              </View>

              <Typography
                variant="body2"
                color="text.secondary"
                style="leading-[1.6]"
              >
                {deal.description}
              </Typography>
            </View>
            <ChipContainer style="mt-5">
              {deal.cuisines.map(({ name, slug }) => (
                <ChipReadOnly key={slug} size="lg" label={name} />
              ))}
              {deal.dietary_requirements.map(({ name, slug }) => (
                <ChipReadOnly key={slug} size="lg" label={name} />
              ))}
            </ChipContainer>
            <Divider style="mt-6 mb-3" />
          </View>

          <RestaurantInfoTabs
            address={deal.location.address}
            email={deal.location.email}
            geometry={deal.location.geometry}
            name={deal.restaurant.name}
            phone_number={deal.location.phone_number}
            booking_link={deal.restaurant?.booking_link}
            opening_times={deal.location.opening_times}
            initialIndex={show_cover_photo ? 0 : 1}
          />
        </ScrollView>
      </View>
    </>
  );
};

export default SingleDeal;
