import { SafeAreaView, FlatList as RNFlatList } from "react-native";
import React, { FC, forwardRef, useEffect, useMemo, useRef } from "react";
import { useScrollToTop } from "@react-navigation/native";
import { useAppSelector } from "hooks/useAppSelector";
import useRequestLocation from "hooks/useRequestLocation";
import tw from "theme/tailwind";
import {
  FilterSheet,
  FilterScreenHeader,
  useFilterSheet,
} from "features/filter-sheet";
import useGuestFeedQuery from "hooks/queries/useGuestFeedQuery";
import { Ionicons } from "@expo/vector-icons";
import { GuestLocationFeedCard } from "features/location-card";
import { FlatList } from "react-native-gesture-handler";
import { LoadingScreen } from "components/loading-screen";
import EmptyState from "components/empty-state/EmptyState";
import FilterIcon from "components/svgs/filter-icon";
import LocationProtectedContent from "components/location-protected-content/LocationProtectedContent";
import {
  PromptSignInSheet,
  usePromptSignInSheet,
} from "features/prompt-sign-in-sheet";

type FeedProps = {
  toggleFilterSheet: () => void;
  handleLocationPress: () => void;
  hasFilters: boolean;
  onCardPress: () => void;
};

const Feed = forwardRef<FlatList, FeedProps>(
  (
    { toggleFilterSheet, handleLocationPress, hasFilters, onCardPress },
    ref,
  ) => {
    const {
      data: feedData,
      fetchNextPage,
      refetch,
      isRefetching,
      isLoading,
    } = useGuestFeedQuery(0);

    const data = useMemo(
      () => feedData?.pages.map((p) => p.locations).flat(1) || [],
      [feedData],
    );

    if (isLoading) {
      return <LoadingScreen />;
    }

    if (data.length === 0) {
      return (
        <EmptyState
          title="No results found"
          description={`Sorry, we couldn't find any results ${
            hasFilters
              ? "for your applied filters within your chosen location"
              : "within your chosen location"
          }.`}
          action={hasFilters ? toggleFilterSheet : handleLocationPress}
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
        ref={ref}
        onRefresh={refetch}
        refreshing={isRefetching}
        contentContainerStyle={tw`bg-grey-200 gap-3`}
        data={data}
        renderItem={({ item }) => (
          <GuestLocationFeedCard onPress={onCardPress} item={item} />
        )}
        keyExtractor={(item) => item?.location?._id}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={1}
      />
    );
  },
);

const GuestFeed: FC = (props: any) => {
  const requestLocation = useRequestLocation();

  const { cuisines, dietary_requirements } = useAppSelector(
    (state) => state.filters.filters,
  );

  useEffect(() => {
    requestLocation();
  }, []);

  const feedRef = useRef<FlatList>(null);

  useScrollToTop(feedRef as React.RefObject<RNFlatList>);

  const {
    filterSheetRef,
    toggleFilterSheet,
    handleLocationPress,
    onFilterSheetDismissed,
  } = useFilterSheet();

  const {
    promptSignInRef,
    togglePromptSignInSheet,
    onPromptSignInSheetDismissed,
  } = usePromptSignInSheet();

  const hasFilters = cuisines.length + dietary_requirements.length > 0;

  return (
    <>
      <SafeAreaView style={tw`bg-white`}>
        <FilterScreenHeader
          onFilterPress={toggleFilterSheet}
          onLocationPress={handleLocationPress}
        />
        <FilterSheet
          onDismissedSheet={onFilterSheetDismissed}
          ref={filterSheetRef}
        />
        <PromptSignInSheet
          toggleSheet={togglePromptSignInSheet}
          ref={promptSignInRef}
          onDismiss={onPromptSignInSheetDismissed}
        />
      </SafeAreaView>
      <LocationProtectedContent>
        <Feed
          onCardPress={togglePromptSignInSheet}
          // onCardPress={() => props.navigation.navigate(AUTH_ROUTES.SIGN_UP)}
          handleLocationPress={handleLocationPress}
          hasFilters={hasFilters}
          toggleFilterSheet={toggleFilterSheet}
          ref={feedRef}
        />
      </LocationProtectedContent>
    </>
  );
};

export default GuestFeed;
