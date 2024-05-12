import React, { FC, useMemo } from "react";
import tw from "theme/tailwind";
import useFollowingQuery from "hooks/queries/useFollowingQuery";
import { ACCOUNT_STACK } from "constants/routes";
import RestaurantItem from "./RestaurantItem";
import Divider from "components/divider";
import { FlatList } from "react-native";

type Props = {
  navigation: any;
};

const FollowingRestaurants: FC<Props> = ({ navigation }) => {
  const { data, refetch, isRefetching, fetchNextPage } = useFollowingQuery(0);

  const following = useMemo(
    () => data?.pages.map((p) => p.restaurants).flat(1) || [],
    [data]
  );

  const navToRest = (location_id: string) =>
    navigation.navigate(ACCOUNT_STACK.SINGLE_RESTAURANT, {
      location_id,
      stack: ACCOUNT_STACK,
    });

  return (
    <FlatList
      onRefresh={refetch}
      refreshing={isRefetching}
      contentContainerStyle={tw`bg-white pb-18`}
      data={following}
      ItemSeparatorComponent={() => <Divider my="0" />}
      renderItem={({ item }) => (
        <RestaurantItem
          location={item.location}
          restaurant={item.restaurant}
          navToRest={navToRest}
        />
      )}
      keyExtractor={(item) => item.location._id}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={1}
    />
  );
};

export default FollowingRestaurants;
