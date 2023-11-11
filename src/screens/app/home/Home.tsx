import { Linking, SafeAreaView, View } from "react-native";
import React, { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import tw from "theme/tailwind";

import {
  getInitialPreferencesDone,
  setInitialPreferencesDone,
  shouldUseCurrentLocation,
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

import TextButton from "components/buttons/text-button";
import LocationErrorAlert from "components/location-error-alert";
import { useFocusEffect } from "@react-navigation/native";

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

  useFocusEffect(() => {
    console.log(shouldUseCurrentLocation());
  });

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
        {locationError && <LocationErrorAlert error={locationError} />}
      </SafeAreaView>
      <ScreenWrapper>
        <View style={tw`px-6 gap-8`}>
          <TextButton label="Logout" onPress={logout} />
          <TextButton label="Preferences" onPress={pref} />
        </View>
      </ScreenWrapper>
    </>
  );
};

export default Home;
