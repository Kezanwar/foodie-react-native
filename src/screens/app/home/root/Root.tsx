import { SafeAreaView, ScrollView } from "react-native";
import React, { FC, useCallback, useEffect, useRef } from "react";

import { useScrollToTop } from "@react-navigation/native";

import tw from "theme/tailwind";
import LocalStorage from "lib/storage";

import { COMMON_ROUTES, HOME_STACK } from "constants/routes";
import { LoadingScreen } from "components/loading-screen";
import usePreferencesQuery from "hooks/queries/usePreferencesQuery";
import useRequestLocation from "hooks/useRequestLocation";

import HomeFeed from "features/home-feed/HomeFeed";

import {
  FilterSheet,
  FilterScreenHeader,
  useFilterSheet,
} from "features/filter-sheet";
import LocationProtectedContent from "components/location-protected-content/LocationProtectedContent";

const Home: FC<any> = (props) => {
  const requestLocation = useRequestLocation();

  const { data, isLoading } = usePreferencesQuery();
  const hasInitialPref = LocalStorage.getInitialPreferencesDone();

  useEffect(() => {
    if (
      !isLoading &&
      !hasInitialPref &&
      !data?.data?.preferences?.cuisines?.length
    ) {
      props.navigation.navigate(COMMON_ROUTES.PREFERENCES);
      LocalStorage.setInitialPreferencesDone();
    }
  }, [isLoading, data?.data?.preferences?.cuisines, true]);

  useEffect(() => {
    requestLocation();
  }, []);

  const feedRef = useRef<ScrollView>(null);

  useScrollToTop(feedRef);

  const {
    filterSheetRef,
    toggleFilterSheet,
    handleLocationPress,
    onFilterSheetDismissed,
  } = useFilterSheet();

  const navToRest = useCallback(
    (location_id: string) =>
      props.navigation.navigate(HOME_STACK.SINGLE_RESTAURANT, {
        location_id,
        stack: HOME_STACK,
      }),
    []
  );

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <SafeAreaView style={tw`bg-white `}>
        <FilterScreenHeader
          onFilterPress={toggleFilterSheet}
          onLocationPress={handleLocationPress}
        />
      </SafeAreaView>
      <LocationProtectedContent>
        <HomeFeed
          navToRest={navToRest}
          ref={feedRef}
          navigation={props.navigation}
          navToLocation={handleLocationPress}
          openFilters={toggleFilterSheet}
        />
      </LocationProtectedContent>
      <FilterSheet
        onDismissedSheet={onFilterSheetDismissed}
        ref={filterSheetRef}
      />
    </>
  );
};

export default Home;

//https://github.com/TanStack/query/discussions/4252#discussioncomment-3823114
