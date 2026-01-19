import React, { FC, useMemo } from "react";
import useFollowingQuery from "hooks/queries/useFollowingQuery";
import { ACCOUNT_STACK } from "constants/routes";
import RestaurantItem from "./RestaurantItem";
import Divider from "components/divider";
import Animated, { LinearTransition } from "react-native-reanimated";
import { useAppSelector } from "hooks/useAppSelector";
import LoadingSpinner from "components/loading-spinner";
import EmptyState from "components/empty-state/EmptyState";
import useMutateRestFollows from "hooks/useMutateRestFollows";

type Props = {
  navigation: any;
};

const FollowingRestaurants: FC<Props> = ({ navigation }) => {
  const { data, refetch, isRefetching, isLoading, fetchNextPage } =
    useFollowingQuery(0);

  const following = useMemo(
    () => data?.pages.map((p) => p.restaurants).flat(1) || [],
    [data],
  );

  const navToRest = (location_id: string) =>
    navigation.navigate(ACCOUNT_STACK.SINGLE_RESTAURANT, {
      location_id,
      stack: ACCOUNT_STACK,
    });

  const userLocationCoords = useAppSelector(
    (state) => state.location.location?.coords,
  );

  const { unfollow } = useMutateRestFollows();

  const onUnFollow = async (location_id: string) => {
    unfollow(location_id);
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <Animated.FlatList
      itemLayoutAnimation={LinearTransition.springify()}
      onRefresh={refetch}
      ListEmptyComponent={
        <EmptyState
          title="No Restaurants To Show"
          description="You haven't followeed any Restaurants yet, go back to your feed and find some Restaurants that interest you!"
        />
      }
      refreshing={isRefetching}
      data={following}
      ItemSeparatorComponent={() => <Divider my="0" />}
      renderItem={({ item }) => (
        <RestaurantItem
          unfollowRest={onUnFollow}
          location={item.location}
          restaurant={item.restaurant}
          navToRest={navToRest}
          userCoordinates={userLocationCoords}
        />
      )}
      keyExtractor={(item) => item.location._id}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={1}
    />
  );
};

export default FollowingRestaurants;
