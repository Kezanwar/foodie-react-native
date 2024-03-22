import { Alert, FlatList, Share } from "react-native";
import React, { FC, useMemo } from "react";

import DealCard from "components/deal-card";
import tw from "theme/tailwind";
import EmptyState from "components/empty-state/EmptyState";

import { Ionicons } from "@expo/vector-icons";
import LoadingState from "components/loading-state";
import { IFeedDeal } from "types/feed";
import { DISCOVER_STACK } from "constants/routes";

import useMutateFavouriteDeal from "hooks/queries/useMutateFavouriteDeal";
import { RouteParams } from "screens/common/single-deal/SingleDeal";
import useCategoryFeedQuery from "hooks/queries/useCategoryFeedQuery";
import { Option } from "types/options";

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
    [feedData]
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

  const mutateFav = useMutateFavouriteDeal();

  const onLike = async (item: IFeedDeal) => {
    try {
      mutateFav.mutate({
        deal_id: item.deal.id,
        location_id: item.location.id,
        is_favourited: item.deal.is_favourited,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const navToDeal = (data: RouteParams) => {
    data.stack = DISCOVER_STACK;
    navigation.navigate(DISCOVER_STACK.SINGLE_DEAL, data);
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
        actionText={"Error"}
        actionIcon={
          <Ionicons
            name="map-outline"
            size={21}
            color={tw.color("primary-main")}
          />
        }
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
          navToDeal={navToDeal}
          onShare={onShare}
          item={item}
          onLike={onLike}
        />
      )}
      keyExtractor={(item) => `${item.deal.id}-${item.location.id}`}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={1}
    />
  );
};

export default CategoryFeed;
