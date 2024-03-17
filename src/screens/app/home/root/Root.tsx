import { SafeAreaView } from "react-native";
import React, { FC, useCallback, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

import tw from "theme/tailwind";
import ls from "lib/storage/storage";

import { endSession } from "lib/axios/axios";
import { authLogout } from "store/auth/auth.slice";
import { COMMON_ROUTES } from "constants/routes";

import { LoadingScreen } from "components/loading-screen";

import useAppDispatch from "hooks/useAppDispatch";
import usePreferencesQuery from "hooks/queries/usePreferencesQuery";
import { useAppSelector } from "hooks/useAppSelector";
import useRequestLocation from "hooks/useRequestLocation";

import LocationErrorAlert from "components/location-error-alert";

import HomeFeed from "features/home-feed/HomeFeed";
import { RootHeader } from "features/headers/home";
import { HomeFilterSheet } from "features/home-filter-sheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

import { onSaveFilterForm } from "store/home/home.slice";

const Home: FC<any> = (props) => {
  const dispatch = useAppDispatch();
  const requestLocation = useRequestLocation();
  const { location, error: locationError } = useAppSelector(
    (state) => state.location
  );
  const client = useQueryClient();
  const { data, isLoading } = usePreferencesQuery();
  const hasInitialPref = ls.getInitialPreferencesDone();

  useEffect(() => {
    if (
      !isLoading &&
      !hasInitialPref &&
      !data?.data?.preferences?.cuisines?.length
    ) {
      props.navigation.navigate(COMMON_ROUTES.PREFERENCES);
      ls.setInitialPreferencesDone();
    }
  }, [isLoading, data?.data?.preferences?.cuisines, true]);

  useEffect(() => {
    requestLocation();
  }, []);

  const logout = () => {
    dispatch(authLogout());
    endSession();
    client.clear();
  };
  const navToPref = () => {
    props.navigation.navigate(COMMON_ROUTES.PREFERENCES);
  };

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
        {locationError && <LocationErrorAlert error={locationError} />}
      </SafeAreaView>

      {/* <TextButton label="Preferences" onPress={navToPref} /> */}
      {/* <TextButton label="Logout" onPress={logout} /> */}
      {!locationError && (
        <HomeFeed
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
