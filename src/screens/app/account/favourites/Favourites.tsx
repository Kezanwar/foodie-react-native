import { FlatList, SafeAreaView, View } from "react-native";
import React, { FC, useMemo } from "react";
import tw from "theme/tailwind";
import { Typography } from "components/typography";
import HeaderContainer from "components/header-container";
import BackButton from "components/buttons/back-button";
import useFavouritesQuery from "hooks/queries/useFavouritesQuery";
import DealCard from "features/deal-card";
import { IFeedDeal } from "types/feed";
import useAppDispatch from "hooks/useAppDispatch";
import { setSingleDeal } from "store/single-deal/single-deal.slice";
import { ACCOUNT_STACK } from "constants/routes";
import { GetSingleDealProps } from "types/single-deal";
import { CenteredTextHeader } from "features/headers/common";

const Favourites: FC<any> = ({ navigation }) => {
  const { data, refetch, isRefetching, fetchNextPage } = useFavouritesQuery(0);

  const favourites = useMemo(
    () => data?.pages.map((p) => p.deals).flat(1) || [],
    [data]
  );

  const dispatch = useAppDispatch();

  const openDeal = (data: GetSingleDealProps) => {
    dispatch(
      setSingleDeal({
        deal_id: data.deal_id,
        location_id: data.location_id,
        stack: ACCOUNT_STACK,
        linkRestaurant: true,
      })
    );
  };

  return (
    <SafeAreaView style={tw`bg-white`}>
      <CenteredTextHeader
        title="Favourites"
        subtitle="Deals you've favourited"
        goBack={navigation.goBack}
      />
      <FlatList
        onRefresh={refetch}
        refreshing={isRefetching}
        contentContainerStyle={tw`bg-grey-200 gap-3 pb-25`}
        data={favourites}
        renderItem={({ item }) => (
          <DealCard
            showActions={false}
            type="list"
            item={item as IFeedDeal}
            onLike={() => {}}
            onShare={() => {}}
            openDeal={openDeal}
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
