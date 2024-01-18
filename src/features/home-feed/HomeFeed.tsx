import { Alert, FlatList, Share } from "react-native";
import React, { FC } from "react";
import useHomeFeedQuery from "hooks/queries/useHomeFeedQuery";
import DealCard from "components/deal-card";
import tw from "theme/tailwind";
import { LoadingScreen } from "components/loading-screen";
import EmptyState from "components/empty-state/EmptyState";
import { useAppSelector } from "hooks/useAppSelector";
import FilterIcon from "components/svgs/filter-icon";
import { Ionicons } from "@expo/vector-icons";

//https://stackoverflow.com/questions/71286123/reactquery-useinfinitequery-refetching-issue

type Props = { openFilters: () => void; navToLocation: () => void };

const HomeFeed: FC<Props> = ({ openFilters, navToLocation }) => {
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

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!data?.length) {
    const hasFilters = cuisines.length + dietary_requirements.length > 0;
    return (
      <EmptyState
        style="py-8"
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
              name="ios-map-outline"
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
      renderItem={({ item }) => <DealCard onShare={onShare} item={item} />}
      keyExtractor={(item) => `${item.deal.id}-${item.location.id}`}
      onEndReached={() => fetchNextPage()}
      onEndReachedThreshold={1}
    />
  );
};

export default HomeFeed;
