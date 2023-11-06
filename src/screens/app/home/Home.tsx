import { Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import ScreenWrapper from "components/screen-wrapper/ScrollScreenWrapper";
import {
  clearAccessToken,
  getInitialPreferencesDone,
  setInitialPreferencesDone,
} from "lib/storage/storage";
import { authLogout } from "store/auth/auth.slice";
import useAppDispatch from "hooks/useAppDispatch";
import usePreferencesQuery from "hooks/queries/usePreferencesQuery";
import { LoadingScreen } from "components/loading-screen";
import { COMMON_ROUTES } from "constants/routes";
import { useQueryClient } from "@tanstack/react-query";
import { endSession } from "lib/axios/axios";

const Home = (props: any) => {
  const dispatch = useAppDispatch();

  const client = useQueryClient();

  const logout = () => {
    dispatch(authLogout());
    endSession();
    client.clear();
  };

  const pref = () => {
    props.navigation.navigate(COMMON_ROUTES.PREFERENCES);
  };

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

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <ScreenWrapper>
      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pref}>
        <Text>Preferences</Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
};

export default Home;
