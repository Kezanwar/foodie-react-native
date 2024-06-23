import { View } from "react-native";
import React, { FC, useMemo } from "react";

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

import useSingleRestaurantQuery from "hooks/queries/useSingleRestaurantQuery";
import RestaurantInfoTabs from "features/restaurant-info-tabs";
import { DynamicStack } from "constants/routes";

import DealButton from "components/buttons/deal-button";

import CoverBackButton from "components/cover-back-button";

import { GetSingleDealProps } from "types/single-deal";

import { setSingleDeal } from "store/single-deal/single-deal.slice";
import useAppDispatch from "hooks/useAppDispatch";
import RestaurantAvatar from "components/restaurant-avatar";
import { useAppSelector } from "hooks/useAppSelector";
import { getDistanceInMiles } from "utils/distance";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

export type RouteParams = {
  location_id: string;
  stack: DynamicStack;
};

const iconCol = tw.color("primary-main");

const SingleRestaurant: FC = ({ route, navigation }: any) => {
  const { location_id, stack } = route.params as RouteParams;

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

  const mutateFollow = useMutateFollowingRest();

  const onFollow = async () => {
    if (restaurant)
      try {
        mutateFollow.mutate({
          location_id: restaurant._id,
          rest_id: restaurant.restaurant._id,
          is_following: restaurant.is_following,
        });
      } catch (error) {
        console.log(error);
      }
  };

  const dispatch = useAppDispatch();

  const openDeal = (data: GetSingleDealProps) => {
    dispatch(
      setSingleDeal({
        deal_id: data.deal_id,
        location_id: data.location_id,
        stack: stack,
        linkRestaurant: true,
      })
    );
  };

  const userLocationCoords = useAppSelector(
    (state) => state.location.location?.coords
  );

  const distance = useMemo(() => {
    if (restaurant && userLocationCoords) {
      return getDistanceInMiles(restaurant.coordinates, [
        userLocationCoords?.longitude,
        userLocationCoords?.latitude,
      ]);
    } else return 0;
  }, [restaurant?.coordinates, userLocationCoords]);

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    if (event.contentOffset.y < 160) {
      scrollY.value = Math.max(event.contentOffset.y, 0);
    }
  });

  const topstylez = useAnimatedStyle(() => {
    return {
      height: Math.max(160 - scrollY.value, 100),
    };
  });

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
      <Animated.View style={topstylez}>
        <CoverBackButton
          cover_photo={restaurant.restaurant.cover_photo}
          goBack={navigation.goBack}
        />
      </Animated.View>

      <Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
        <View style={tw`px-5 relative`}>
          <View style={tw`mt-4 flex-row  items-center gap-4`}>
            <RestaurantAvatar
              size="lg"
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
                  style="font-light text-3.5"
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
                  {distance.toFixed(1)} Miles
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
                  Bio
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
                  openDeal={openDeal}
                />
              );
            })}
          </View>
          <Divider style="mt-6 mb-3" />
        </View>
        <RestaurantInfoTabs
          initialIndex={1}
          address={restaurant.address}
          email={restaurant.email}
          coordinates={restaurant.coordinates}
          name={restaurant.restaurant.name}
          phone_number={restaurant.phone_number}
          booking_link={restaurant.restaurant?.booking_link}
          opening_times={restaurant.opening_times}
        />
      </Animated.ScrollView>
    </View>
  );
};

export default SingleRestaurant;
