import { FlatList, SafeAreaView, View } from "react-native";
import React, { FC, useMemo } from "react";
import tw from "theme/tailwind";
import { Typography } from "components/typography";
import HeaderContainer from "components/header-container";
import BackButton from "components/buttons/back-button";
import useFavouritesQuery from "hooks/queries/useFavouritesQuery";
import DealCard from "features/deal-card";
import { IFeedDeal } from "types/feed";

const Favourites: FC<any> = ({ navigation }) => {
  const { data, refetch, isRefetching, fetchNextPage } = useFavouritesQuery(0);

  const favourites = useMemo(
    () => data?.pages.map((p) => p.deals).flat(1) || [],
    [data]
  );

  return (
    <SafeAreaView style={tw`bg-white`}>
      <HeaderContainer>
        <BackButton withPad={false} onPress={navigation.goBack} />
        <View style={tw` gap-1`}>
          <Typography style="font-semi-bold leading-[0] text-4.5" variant="h6">
            Favourites
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Deals you have favourited
          </Typography>
        </View>
      </HeaderContainer>
      <FlatList
        onRefresh={refetch}
        refreshing={isRefetching}
        contentContainerStyle={tw`bg-grey-200 gap-3 pb-25`}
        data={favourites}
        renderItem={({ item }) => (
          <DealCard
            type="list"
            item={item as IFeedDeal}
            onLike={() => {}}
            onShare={() => {}}
            openDeal={() => {}}
          />
        )}
        keyExtractor={(item) => `${item.location._id}-${item.deal._id}`}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={1}
      />
    </SafeAreaView>
  );
};

export default Favourites;
