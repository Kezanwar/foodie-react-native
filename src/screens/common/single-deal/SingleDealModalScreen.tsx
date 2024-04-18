import { TouchableOpacity, View } from "react-native";
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

import { Image } from "expo-image";
import { SingleDealState } from "hocs/single-deal-context/SingleDealContext";
import { navigate } from "hocs/app-ready/providers/navigation/Navigation";

const SingleDealModalScreen: FC<SingleDealState & { close: () => void }> = ({
  deal_id,
  location_id,
  stack,
  close,
  linkRestaurant,
}) => {
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

  const navRest = () => {
    if (linkRestaurant) {
      close();
      navigate(stack?.SINGLE_RESTAURANT, {
        location_id,
        stack,
      });
    }
  };

  if (isLoading) return <LoadingScreen />;

  if (!deal || isError)
    return (
      <EmptyState
        title="Oops!"
        description="Sorry we can't seem to find that deal, it may have been deleted"
        action={() => {}}
        actionText="Go back"
      />
    );

  return (
    <View style={tw`flex-1 bg-white`}>
      <View style={tw`px-6 py-6 relative`}>
        <View style={tw` gap-2`}>
          <View style={tw`flex-row justify-between mb-1`}>
            <View style={tw`flex-row items-start gap-2`}>
              <AntDesign
                name="tago"
                size={20}
                color={tw.color("primary-main")}
                style={tw`-mt-0.5`}
              />
              <Typography
                variant="h6"
                style="font-semi-bold text-4.3 max-w-[90%] "
              >
                {deal.name}
              </Typography>
            </View>
            <View style={tw`items-start justify-end  -m-0.5  flex-row gap-1`}>
              <ShareButton onPress={() => {}} />
              <LikeButton liked={deal.is_favourited} onPress={onLike} />
            </View>
          </View>

          <Typography
            variant="body2"
            color="text.secondary"
            style="leading-[1.6]"
          >
            {deal.description.trim()}
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
        <Divider my="6" />
        <View style={tw` flex-row  items-center gap-4`}>
          <TouchableOpacity
            activeOpacity={linkRestaurant ? 0.8 : 1}
            onPress={navRest}
          >
            <Image
              style={tw` rounded-full  w-18  h-18  `}
              source={{ uri: deal.restaurant.avatar }}
            />
          </TouchableOpacity>
          <View style={tw`gap-2`}>
            <TouchableOpacity
              activeOpacity={linkRestaurant ? 0.8 : 1}
              onPress={navRest}
            >
              <Typography variant="h6" style="font-semi-bold text-4.3 max-w-80">
                {deal.restaurant.name}
                <Typography
                  variant="h6"
                  style="font-light text-4"
                  color="text.secondary"
                >
                  {"  "}({deal.location.nickname})
                </Typography>
              </Typography>
            </TouchableOpacity>
            <View style={tw`gap-3 items-center flex-row`}>
              <FollowButton onPress={onFollow} following={deal.is_following} />
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
      </View>
    </View>
  );
};

export default SingleDealModalScreen;
