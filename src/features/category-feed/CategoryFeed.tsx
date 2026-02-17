import { Alert, FlatList, Share } from "react-native";
import React, { FC, useMemo } from "react";

import DealCard from "features/deal-card";
import tw from "theme/tailwind";
import EmptyState from "components/empty-state/EmptyState";

import LoadingState from "components/loading-state";

import { DISCOVER_STACK } from "constants/routes";

import useCategoryFeedQuery from "hooks/queries/useCategoryFeedQuery";
import useAppDispatch from "hooks/useAppDispatch";

import { Option } from "types/options";
import { GetSingleDealProps } from "types/single-deal";
import { IFeedDeal } from "types/deal-feed";

import { setSingleDeal } from "store/single-deal";
import useMutateDealFavourites from "hooks/useMutateDealFavourites";

//https://stackoverflow.com/questions/71286123/reactquery-useinfinitequery-refetching-issue

type Props = {
  navigation: any;
  category: Option;
};

const CategoryFeed: FC<Props> = ({ category, navigation }) => {
  const {
    data: feedData,
    fetchNextPage,
    refetch,
    isRefetching,
    isLoading,
  } = useCategoryFeedQuery(0, category.slug);

  const data = useMemo(
    () => feedData?.pages.map((p) => p.deals).flat(1) || [],
    [feedData],
  );

  const onShare = async (title: string) => {
    try {
      const result = await Share.share({
        url: "www.thefoodiestaging.app",
        title,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const { favourite, unfavourite } = useMutateDealFavourites();

  const onLike = async (item: IFeedDeal, is_favourited: boolean) => {
    if (!is_favourited) {
      favourite({
        deal_id: item.deal._id,
        location_id: item.location._id,
      });
    } else {
      unfavourite({
        deal_id: item.deal._id,
        location_id: item.location._id,
      });
    }
  };

  const dispatch = useAppDispatch();

  const openDeal = (data: GetSingleDealProps) => {
    dispatch(
      setSingleDeal({
        deal_id: data.deal_id,
        location_id: data.location_id,
        stack: DISCOVER_STACK,
        linkRestaurant: true,
      }),
    );
  };

  if (isLoading) {
    return <LoadingState text="Searching for deals..." />;
  }

  if (!data?.length) {
    return (
      <EmptyState
        title="No results found"
        description={`Sorry, we couldn't find any results.`}
        action={navigation.goBack}
      />
    );
  }

  return (
    <FlatList
      onRefresh={refetch}
      refreshing={isRefetching}
      contentContainerStyle={tw`bg-grey-200 gap-3`}
      data={data}
      renderItem={({ item }) => (
        <DealCard
          openDeal={openDeal}
          onShare={onShare}
          item={item}
          onLike={onLike}
        />
      )}
      keyExtractor={(item) => `${item.deal._id}-${item.location._id}`}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={1}
    />
  );
};

export default CategoryFeed;
