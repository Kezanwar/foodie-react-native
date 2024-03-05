import { ScrollView, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { StatusBar } from "expo-status-bar";
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
import { COMMON_ROUTES } from "constants/routes";
import RestaurantInfoTabs from "features/restaurant-info-tabs";
import { RouteParams as RestRouteParams } from "../single-restaurant/SingleRestaurant";

export type RouteParams = GetSingleDealProps & { show_cover_photo: boolean };

const SingleDeal: FC = ({ route, navigation }: any) => {
  const { deal_id, location_id, show_cover_photo } =
    route.params as RouteParams;

  const {
    data: deal,
    isLoading,
    isError,
  } = useSingleDealQuery({
    deal_id,
    location_id,
  });

  const [mutateFavAdd, mutateFavRemove] = useMutateFavouriteDeal();

  const onLike = async () => {
    if (deal)
      try {
        if (!deal.is_favourited) {
          mutateFavAdd.mutate({
            deal_id: deal._id,
            location_id: deal.location._id,
          });
        } else {
          mutateFavRemove.mutate({
            deal_id: deal._id,
            location_id: deal.location._id,
          });
        }
      } catch (error) {
        console.log(error);
      }
  };

  const [mutateFollowAdd, mutateFollowRemove] = useMutateFollowingRest();

  const onFollow = async () => {
    if (deal)
      try {
        if (deal.is_following) {
          mutateFollowRemove.mutate({
            location_id: deal.location._id,
            rest_id: deal.restaurant.id,
          });
        } else {
          mutateFollowAdd.mutate({
            location_id: deal.location._id,
            rest_id: deal.restaurant.id,
          });
        }
      } catch (error) {
        console.log(error);
      }
  };

  const goBack = () => navigation.goBack();

  const navRest = () =>
    navigation.navigate(COMMON_ROUTES.SINGLE_RESTAURANT, {
      location_id,
      should_deal_show_cover: true,
    } as RestRouteParams);

  if (isLoading) return <LoadingScreen />;

  if (!deal || isError)
    return (
      <EmptyState
        title="Oops!"
        description="Sorry we can't seem to find that deal, it may have been deleted"
        action={goBack}
        actionText="Go back"
      />
    );

  return (
    <>
      <StatusBar style="light" />
      <View style={tw`flex-1 bg-white`}>
        {show_cover_photo && (
          <Image
            transition={500}
            style={tw`h-45 w-full `}
            source={{ uri: deal.restaurant.cover_photo }}
          />
        )}

        <ScrollView contentContainerStyle={tw`pb-20`}>
          <View style={tw`px-6 relative`}>
            <View style={tw` pt-6 flex-row  items-center gap-4`}>
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
                  <ShareButton onPress={goBack} />
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
          />
        </ScrollView>
      </View>
    </>
  );
};

export default SingleDeal;
