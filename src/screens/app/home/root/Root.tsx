import { SafeAreaView } from "react-native";
import React, { FC, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import tw from "theme/tailwind";

import {
  getInitialPreferencesDone,
  setInitialPreferencesDone,
  shouldUseCurrentLocation,
} from "lib/storage/storage";
import { endSession } from "lib/axios/axios";
import { authLogout } from "store/auth/auth.slice";
import { COMMON_ROUTES, HOME_STACK } from "constants/routes";

import { LoadingScreen } from "components/loading-screen";

import useAppDispatch from "hooks/useAppDispatch";
import usePreferencesQuery from "hooks/queries/usePreferencesQuery";
import { useAppSelector } from "hooks/useAppSelector";
import useRequestLocation from "hooks/useRequestLocation";

import LocationErrorAlert from "components/location-error-alert";

import HomeFeed from "features/home-feed/HomeFeed";
import { RootHeader } from "features/headers/home";

const Home: FC<any> = (props) => {
  const dispatch = useAppDispatch();
  const requestLocation = useRequestLocation();
  const { location, error: locationError } = useAppSelector(
    (state) => state.location
  );
  const client = useQueryClient();
  const { data, isLoading } = usePreferencesQuery();
  const hasInitialPref = getInitialPreferencesDone();

  useEffect(() => {
    if (
      !isLoading &&
      !hasInitialPref &&
      !data?.data?.preferences?.cuisines?.length
    ) {
      props.navigation.navigate(COMMON_ROUTES.PREFERENCES);
      setInitialPreferencesDone();
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

  const handlePressFilters = () => {
    props.navigation.navigate(HOME_STACK.FILTERS);
  };

  const handleLocationPress = () =>
    props.navigation.navigate(COMMON_ROUTES.LOCATION);

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <SafeAreaView style={tw`bg-white `}>
        <RootHeader
          onFilterPress={handlePressFilters}
          onLocationPress={handleLocationPress}
        />
        {locationError && <LocationErrorAlert error={locationError} />}
      </SafeAreaView>
      {/* <TextButton label="Logout" onPress={logout} />
          <TextButton label="Preferences" onPress={pref} /> */}
      {!locationError && <HomeFeed />}
    </>
  );
};

export default Home;

//https://github.com/TanStack/query/discussions/4252#discussioncomment-3823114
