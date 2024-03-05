import { Alert, FlatList, Share } from "react-native";
import React, { FC } from "react";
import useHomeFeedQuery from "hooks/queries/useHomeFeedQuery";
import DealCard from "components/deal-card";
import tw from "theme/tailwind";
import EmptyState from "components/empty-state/EmptyState";
import { useAppSelector } from "hooks/useAppSelector";
import FilterIcon from "components/svgs/filter-icon";
import { Ionicons } from "@expo/vector-icons";
import LoadingState from "components/loading-state";
import { IFeedDeal } from "types/feed";
import { COMMON_ROUTES } from "constants/routes";

import useMutateFavouriteDeal from "hooks/queries/useMutateFavouriteDeal";
import { RouteParams } from "screens/common/single-deal/SingleDeal";

//https://stackoverflow.com/questions/71286123/reactquery-useinfinitequery-refetching-issue

type Props = {
  openFilters: () => void;
  navToLocation: () => void;
  navigation: any;
};

const HomeFeed: FC<Props> = ({ openFilters, navToLocation, navigation }) => {
  const {
    data: feedData,
    fetchNextPage,
    refetch,
    isRefetching,
    isLoading,
  } = useHomeFeedQuery(0);

  const data = feedData?.pages.map((p) => p.deals).flat(1) || [];

  const { cuisines, dietary_requirements } = useAppSelector(
    (state) => state.home.filters
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

  const [mutateAdd, mutateRemove] = useMutateFavouriteDeal();

  const onLike = async (item: IFeedDeal) => {
    try {
      if (!item.deal.is_favourited) {
        mutateAdd.mutate({
          deal_id: item.deal.id,
          location_id: item.location.id,
        });
      } else {
        mutateRemove.mutate({
          deal_id: item.deal.id,
          location_id: item.location.id,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navToDeal = (data: RouteParams) => {
    navigation.navigate(COMMON_ROUTES.SINGLE_DEAL, data);
  };

  if (isLoading) {
    return <LoadingState text="Searching for deals..." />;
  }

  if (!data?.length) {
    const hasFilters = cuisines.length + dietary_requirements.length > 0;
    return (
      <EmptyState
        title="No results found"
        description={`Sorry, we couldn't find any results ${
          hasFilters
            ? "for your applied filters within your chosen location"
            : "within your chosen location"
        }.`}
        action={hasFilters ? openFilters : navToLocation}
        actionText={hasFilters ? "Adjust Your Filters" : "Change Location"}
        actionIcon={
          hasFilters ? (
            <FilterIcon />
          ) : (
            <Ionicons
              name="map-outline"
              size={21}
              color={tw.color("primary-main")}
            />
          )
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

export default HomeFeed;
