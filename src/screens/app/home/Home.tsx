import { Linking, SafeAreaView, View } from "react-native";
import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import tw from "theme/tailwind";

import {
  getInitialPreferencesDone,
  setInitialPreferencesDone,
} from "lib/storage/storage";
import { endSession } from "lib/axios/axios";
import { authLogout } from "store/auth/auth.slice";
import { COMMON_ROUTES } from "constants/routes";

import { LoadingScreen } from "components/loading-screen";
import ScreenWrapper from "components/screen-wrapper/ScrollScreenWrapper";
import LocationButton from "components/buttons/location-button";
import FilterButton from "components/buttons/filter-button";

import useAppDispatch from "hooks/useAppDispatch";
import usePreferencesQuery from "hooks/queries/usePreferencesQuery";
import { useAppSelector } from "hooks/useAppSelector";
import useRequestLocation from "hooks/useRequestLocation";
import Alert from "components/alert/Alert";
import { Typography } from "components/typography";
import TextButton from "components/buttons/text-button";

const Home = (props: any) => {
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

  const pref = () => {
    props.navigation.navigate(COMMON_ROUTES.PREFERENCES);
  };

  const navigateLocation = () =>
    props.navigation.navigate(COMMON_ROUTES.LOCATION);

  const openSettings = () => Linking.openSettings();

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <SafeAreaView style={tw`bg-white `}>
        <View
          style={tw`px-6 border-b-[0.5px] border-b-grey-250 py-3 flex-row items-center justify-between`}
        >
          <LocationButton onPress={navigateLocation} />
          <FilterButton />
        </View>
        {locationError && (
          <View style={tw`px-6 mt-4`}>
            <Alert variant="error" align="center" content={locationError} />
            <Typography
              style="mt-4 text-center"
              color="text.secondary"
              variant="body2"
            >
              Sorry, we can't show you any Deals until you enable Location
              Permissions for Foodie.
            </Typography>
            <TextButton
              label="Open Settings"
              style={tw`mt-4`}
              onPress={openSettings}
            />
          </View>
        )}
      </SafeAreaView>
      <ScreenWrapper>
        {/* <View style={tw`px-6 gap-8`}>
          <TextButton label="Logout" onPress={logout} />
          <TextButton label="Preferences" onPress={pref} />
        </View> */}
      </ScreenWrapper>
    </>
  );
};

export default Home;
