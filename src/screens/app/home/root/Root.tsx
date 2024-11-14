import { SafeAreaView, ScrollView } from "react-native";
import React, { FC, useCallback, useEffect, useRef } from "react";

import { useScrollToTop } from "@react-navigation/native";

import tw from "theme/tailwind";
import LocalStorage from "lib/storage";

import { COMMON_ROUTES } from "constants/routes";

import { LoadingScreen } from "components/loading-screen";

import useAppDispatch from "hooks/useAppDispatch";
import usePreferencesQuery from "hooks/queries/usePreferencesQuery";
import { useAppSelector } from "hooks/useAppSelector";
import useRequestLocation from "hooks/useRequestLocation";

import HomeFeed from "features/home-feed/HomeFeed";
import { RootHeader } from "features/headers/home";
import { HomeFilterSheet } from "features/home-filter-sheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { onSaveFilterForm } from "store/home/home.slice";

import LocationStatus from "components/location-status/LocationStatus";

const Home: FC<any> = (props) => {
  const dispatch = useAppDispatch();
  const requestLocation = useRequestLocation();
  const { location, error: locationError } = useAppSelector(
    (state) => state.location
  );

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

  const hasLocation = !locationError && location;

  const filterRef = useRef<BottomSheetModal>(null);
  const isFilterOpen = useRef<boolean>(false);

  const presentModal = useCallback(() => {
    filterRef?.current?.present();
    isFilterOpen.current = true;
  }, []);

  const dismissModal = useCallback(() => {
    filterRef?.current?.dismiss();
    dispatch(onSaveFilterForm());
    isFilterOpen.current = false;
  }, []);

  const onDismissedModal = () => {
    isFilterOpen.current = false;
    dispatch(onSaveFilterForm());
  };

  const handleLocationPress = () =>
    props.navigation.navigate(COMMON_ROUTES.LOCATION);

  const handleFilterPress = () => {
    isFilterOpen.current ? dismissModal() : presentModal();
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <SafeAreaView style={tw`bg-white `}>
        <RootHeader
          onFilterPress={handleFilterPress}
          onLocationPress={handleLocationPress}
        />
      </SafeAreaView>
      <LocationStatus />
      {hasLocation && (
        <HomeFeed
          ref={feedRef}
          navigation={props.navigation}
          navToLocation={handleLocationPress}
          openFilters={handleFilterPress}
        />
      )}
      <HomeFilterSheet onDismissedModal={onDismissedModal} ref={filterRef} />
    </>
  );
};

export default Home;

//https://github.com/TanStack/query/discussions/4252#discussioncomment-3823114
