import { SafeAreaView, ScrollView, View } from "react-native";
import React, { FC } from "react";

import { StatusBar } from "expo-status-bar";
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

type RouteParams = {
  location_id: string;
  show_cover_photo: boolean;
};

const iconCol = tw.color("primary-main");

const SingleRestaurant: FC = ({ route, navigation }: any) => {
  const { location_id, show_cover_photo } = route.params as RouteParams;

  const {
    data: restaurant,
    isLoading,
    isError,
  } = useSingleRestaurantQuery({
    location_id,
  });

  const [mutateFavAdd, mutateFavRemove] = useMutateFavouriteDeal();

  // const onLike = async () => {
  //   if (deal)
  //     try {
  //       if (!deal.is_favourited) {
  //         mutateFavAdd.mutate({
  //           deal_id: deal._id,
  //           location_id: deal.location._id,
  //         });
  //       } else {
  //         mutateFavRemove.mutate({
  //           deal_id: deal._id,
  //           location_id: deal.location._id,
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  // };

  const [mutateFollowAdd, mutateFollowRemove] = useMutateFollowingRest();

  const onFollow = async () => {
    if (restaurant)
      try {
        if (restaurant.is_following) {
          mutateFollowRemove.mutate({
            location_id: restaurant._id,
            rest_id: restaurant.restaurant.id,
          });
        } else {
          mutateFollowAdd.mutate({
            location_id: restaurant._id,
            rest_id: restaurant.restaurant.id,
          });
        }
      } catch (error) {
        console.log(error);
      }
  };

  const goBack = () => navigation.goBack();

  if (isLoading) return <LoadingScreen />;

  if (!restaurant || isError)
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
      <SafeAreaView style={tw`flex-1 bg-white`}>
        {show_cover_photo && (
          <Image
            transition={500}
            style={tw`h-45 w-full `}
            source={{ uri: restaurant.restaurant.cover_photo }}
          />
        )}

        <ScrollView contentContainerStyle={tw`pb-20`}>
          <View style={tw`px-6 relative`}>
            <View style={tw` pt-5 flex-row  items-center gap-4`}>
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

            <Divider />

            <View style={tw` gap-2`}>
              <View style={tw`flex-row justify-between`}>
                <View style={tw`flex-row items-center gap-2`}>
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
            <Divider style="mt-5 mb-2" />
          </View>

          <RestaurantInfoTabs
            initialIndex={1}
            address={restaurant.address}
            email={restaurant.email}
            geometry={restaurant.geometry}
            name={restaurant.restaurant.name}
            phone_number={restaurant.phone_number}
            booking_link={restaurant.restaurant?.booking_link}
            opening_times={restaurant.opening_times}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default SingleRestaurant;
