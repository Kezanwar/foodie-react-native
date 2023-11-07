import { SafeAreaView, View } from "react-native";
import React, { useEffect } from "react";

import { useQueryClient } from "@tanstack/react-query";

import {
  getInitialPreferencesDone,
  setInitialPreferencesDone,
} from "lib/storage/storage";

import { authLogout } from "store/auth/auth.slice";
import { COMMON_ROUTES } from "constants/routes";
import { endSession } from "lib/axios/axios";
import { LoadingScreen } from "components/loading-screen";
import ScreenWrapper from "components/screen-wrapper/ScrollScreenWrapper";

import useAppDispatch from "hooks/useAppDispatch";
import usePreferencesQuery from "hooks/queries/usePreferencesQuery";

import { useAppSelector } from "hooks/useAppSelector";
import useRequestLocation from "hooks/useRequestLocation";
import LocationButton from "components/buttons/location-button";
import tw from "theme/tailwind";
import FilterIcon from "components/svgs/filter-icon";
import FilterButton from "components/buttons/filter-button";

const Home = (props: any) => {
  const dispatch = useAppDispatch();
  const requestLocation = useRequestLocation();
  const { location } = useAppSelector((state) => state.location);
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

  useEffect(() => {
    if (location?.coords) {
      console.log(location.coords);
    }
  }, [location?.coords]);

  const logout = () => {
    dispatch(authLogout());
    endSession();
    client.clear();
  };

  const pref = () => {
    props.navigation.navigate(COMMON_ROUTES.PREFERENCES);
  };

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <>
      <SafeAreaView style={tw`bg-white `}>
        <View
          style={tw`px-6 border-b-[0.5px] border-b-grey-250 py-3 flex-row items-center justify-between`}
        >
          <LocationButton />
          <FilterButton />
        </View>
      </SafeAreaView>
      <ScreenWrapper>
        {/* <View style={tw`px-6 gap-8`}>
          <TouchableOpacity onPress={logout}>
            <Text>Logout</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={pref}>
            <Text>Preferences</Text>
          </TouchableOpacity>
        </View> */}
      </ScreenWrapper>
    </>
  );
};

export default Home;
