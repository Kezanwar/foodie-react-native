import { Alert, FlatList, ScrollView, Share } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import useHomeFeedQuery from "hooks/queries/useHomeFeedQuery";
import tw from "theme/tailwind";
import EmptyState from "components/empty-state/EmptyState";
import { useAppSelector } from "hooks/useAppSelector";
import FilterIcon from "components/svgs/filter-icon";
import { Ionicons } from "@expo/vector-icons";
import LoadingState from "components/loading-state";

import { LocationFeedCard } from "features/location-card";
import { DEEP_LINK_BASE_URL } from "lib/env";
import { ILocationFeedItem } from "types/feed";

//https://stackoverflow.com/questions/71286123/reactquery-useinfinitequery-refetching-issue

export type HomeFeedRef = ScrollView;

type Props = {
  openFilters: () => void;
  navToLocation: () => void;
  navigation: any;
  navToRest: (location_id: string) => void;
};

const HomeFeed = forwardRef<HomeFeedRef, Props>(
  ({ openFilters, navToLocation, navToRest }, ref) => {
    const {
      data: feedData,
      fetchNextPage,
      refetch,
      isRefetching,
      isLoading,
    } = useHomeFeedQuery(0);

    const data = useMemo(
      () => feedData?.pages.map((p) => p.locations).flat(1) || [],
      [feedData]
    );

    const { cuisines, dietary_requirements } = useAppSelector(
      (state) => state.filters.filters
    );

    const onShare = useCallback(async (title: string, location_id: string) => {
      try {
        await Share.share({
          url: `${DEEP_LINK_BASE_URL}/single-restaurant/${location_id}`,
          message: "Check out this Restaurant on the Foodie App.",
          title,
        });
        // if (result.action === Share.sharedAction) {
        //   if (result.activityType) {
        //     // shared with activity type of result.activityType
        //   } else {
        //     // shared
        //   }
        // } else if (result.action === Share.dismissedAction) {
        //   // dismissed
        // }
      } catch (error: any) {
        Alert.alert(error.message);
      }
    }, []);

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
        ref={ref as React.LegacyRef<FlatList<ILocationFeedItem>>}
        onRefresh={refetch}
        refreshing={isRefetching}
        contentContainerStyle={tw`bg-grey-200 gap-3`}
        data={data}
        renderItem={({ item }) => (
          <LocationFeedCard
            navToRest={navToRest}
            onShare={onShare}
            item={item}
          />
        )}
        keyExtractor={(item) => item.location._id}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={1}
      />
    );
  }
);

export default HomeFeed;
