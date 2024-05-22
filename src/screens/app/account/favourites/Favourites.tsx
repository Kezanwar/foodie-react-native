import { FlatList, SafeAreaView } from "react-native";
import React, { FC, useMemo } from "react";
import tw from "theme/tailwind";

import useFavouritesQuery from "hooks/queries/useFavouritesQuery";
import DealCard from "features/deal-card";
import { IFeedDeal } from "types/feed";
import useAppDispatch from "hooks/useAppDispatch";
import { setSingleDeal } from "store/single-deal/single-deal.slice";
import { ACCOUNT_STACK } from "constants/routes";
import { GetSingleDealProps } from "types/single-deal";
import { CenteredTextHeader } from "features/headers/common";
import LoadingSpinner from "components/loading-spinner";

const Favourites: FC<any> = ({ navigation }) => {
  const { data, refetch, isRefetching, isLoading, fetchNextPage } =
    useFavouritesQuery(0);

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
    <SafeAreaView style={tw`bg-white flex-1`}>
      <CenteredTextHeader
        title="Favourites"
        subtitle="Deals you've favourited"
        goBack={navigation.goBack}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <FlatList
          onRefresh={refetch}
          refreshing={isRefetching}
          contentContainerStyle={tw`bg-grey-200 gap-3`}
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
      )}
    </SafeAreaView>
  );
};

export default Favourites;
