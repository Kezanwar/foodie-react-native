import { SafeAreaView, View } from "react-native";
import React, { FC, useEffect, useMemo } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolate,
} from "react-native-reanimated";
import tw from "theme/tailwind";
import { LoadingScreen } from "components/loading-screen";
import Typography from "components/typography";
import Divider from "components/divider";
import { ChipContainer } from "components/chip";
import ChipReadOnly from "components/chip/ChipReadOnly";
import FollowButton from "components/buttons/follow-button";
import EmptyState from "components/empty-state/EmptyState";
import useMutateFavouriteDeal from "hooks/queries/useMutateFavouriteDeal";
import useMutateFollowingRest from "hooks/queries/useMututateFollowingRest";
import useSingleRestaurantQuery from "hooks/queries/useSingleRestaurantQuery";
import RestaurantInfoTabs from "features/restaurant-info-tabs";
import { COMMON_ROUTES, DynamicStack } from "constants/routes";
import DealButton from "components/buttons/deal-button";
import CoverBackButton from "components/cover-back-button";
import { GetSingleDealProps } from "types/single-deal";
import { setSingleDeal } from "store/single-deal";
import useAppDispatch from "hooks/useAppDispatch";
import RestaurantAvatar from "components/restaurant-avatar";
import { useAppSelector } from "hooks/useAppSelector";
import { getDistanceInMiles } from "utils/distance";
import LocalStorage from "lib/storage";
import { IFeedDeal } from "types/deal-feed";
import { isAndroid } from "constants/theme";
import { MapViewRegion } from "../map-view/MapView";

export type RouteParams = {
  location_id: string;
  stack: DynamicStack;
};

const default_error_message =
  "Sorry we can't seem to find that Restaurant, it may have been deleted";

const SingleRestaurant: FC<any> = ({ route, navigation }: any) => {
  const { location_id, stack } = route.params as RouteParams;

  const {
    data: restaurant,
    isLoading,
    isError,
    error,
  } = useSingleRestaurantQuery({
    location_id,
  });

  useEffect(() => {
    setTimeout(() => {
      LocalStorage.addViewLocationStat(location_id);
    }, 1000);
  }, []);

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
    setTimeout(() => {
      LocalStorage.addViewDealStat({
        deal: { _id: data.deal_id },
        location: { _id: data.location_id },
      } as IFeedDeal);
    }, 1000);
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

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      if (!isAndroid && event.contentOffset.y < 160) {
        scrollY.set(Math.max(event.contentOffset.y, 0));
      }
    },
  });

  const navToMap = (region: MapViewRegion) => {
    navigation.navigate(COMMON_ROUTES.MAP_VIEW, { region });
  };

  const topstylez = useAnimatedStyle(() => {
    const height = interpolate(scrollY.value, [0, 160], [160, 100], "clamp");
    return { height };
  });

  if (isLoading) return <LoadingScreen />;

  if (!restaurant || isError)
    return (
      <SafeAreaView style={tw`flex-1 bg-white`}>
        <EmptyState
          title="Oops!"
          description={error?.message || default_error_message}
          action={navigation.goBack}
          actionText="Go back"
        />
      </SafeAreaView>
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
          <View style={tw`mt-5 flex-row  items-center gap-4`}>
            <RestaurantAvatar
              size="lg"
              source={{ uri: restaurant.restaurant.avatar }}
            />
            <View style={tw`gap-2`}>
              <Typography variant="h6" style="font-bold text-4.25 max-w-80">
                {restaurant.restaurant.name}
                <Typography
                  variant="body1"
                  style="text-3.5"
                  color="text.secondary"
                >
                  {" "}
                  ({restaurant.nickname})
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
          <Divider style="mt-6 mb-5" />
          <Typography variant="h6" style={"mb-3 text-3.75"}>
            Bio
          </Typography>
          <Typography variant="body2" color="text.secondary" style=" text-3.5">
            {restaurant.restaurant.bio}
          </Typography>
          <ChipContainer style="mt-5">
            {restaurant.cuisines.map(({ name, slug }) => (
              <ChipReadOnly key={slug} size="lg" label={name} />
            ))}
            {restaurant.dietary_requirements.map(({ name, slug }) => (
              <ChipReadOnly key={slug} size="lg" label={name} />
            ))}
          </ChipContainer>
          <Divider style="mt-6 mb-3" />

          {restaurant.active_deals.length > 0 && (
            <>
              <Typography style={"mb-4 mt-2 text-3.75"} variant="h6">
                Deals
              </Typography>
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
            </>
          )}
        </View>
        <RestaurantInfoTabs
          navToMap={navToMap}
          location_id={location_id}
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
