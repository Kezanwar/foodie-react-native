import { Text, TouchableOpacity } from "react-native";
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
  }, [isLoading, data?.data?.preferences?.cuisines]);

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
    <ScreenWrapper>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <Text>{JSON.stringify(location)}</Text>
      <TouchableOpacity onPress={pref}>
        <Text>Preferences</Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

export default Home;
