import { FlatList, SafeAreaView, Text, View } from "react-native";
import React, { FC, useMemo } from "react";
import tw from "theme/tailwind";
import useFollowingQuery from "hooks/queries/useFollowingQuery";
import RestaurantCard from "features/rest-card/RestaurantCard";
import { Typography } from "components/typography";
import HeaderContainer from "components/header-container";
import BackButton from "components/buttons/back-button";
import { FAVOURITES_STACK } from "constants/routes";

const Following: FC<any> = ({ navigation }) => {
  const { data, refetch, isRefetching, fetchNextPage } = useFollowingQuery(0);

  const following = useMemo(
    () => data?.pages.map((p) => p.restaurants).flat(1) || [],
    [data]
  );

  const navToRest = (location_id: string) =>
    navigation.navigate(FAVOURITES_STACK.SINGLE_RESTAURANT, {
      location_id,
      stack: FAVOURITES_STACK,
    });

  return (
    <SafeAreaView style={tw`bg-white`}>
      <HeaderContainer>
        <BackButton withPad={false} onPress={navigation.goBack} />
        <View style={tw` gap-1`}>
          <Typography style="font-semi-bold leading-[0] text-4.5" variant="h6">
            Following
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Restaurants you are following
          </Typography>
        </View>
      </HeaderContainer>
      <FlatList
        onRefresh={refetch}
        refreshing={isRefetching}
        contentContainerStyle={tw`bg-grey-200 gap-3`}
        data={following}
        renderItem={({ item }) => (
          <RestaurantCard
            type="list"
            location={item.location}
            restaurant={item.restaurant}
            navToRest={navToRest}
          />
        )}
        keyExtractor={(item) => item.location._id}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={1}
      />
    </SafeAreaView>
  );
};

export default Following;
