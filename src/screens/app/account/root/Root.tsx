import { Alert, View } from "react-native";
import React, { FC } from "react";
import { StaticScreenWrapper } from "components/screen-wrapper";
import tw from "theme/tailwind";
import UserAvatar from "components/user-avatar";
import { useAppSelector } from "hooks/useAppSelector";
import { Typography } from "components/typography";
import { Ionicons } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";
import FilterIcon from "components/svgs/filter-icon";
import ListButton from "components/buttons/list-button";
import { ACCOUNT_STACK, COMMON_ROUTES } from "constants/routes";
import { FullWidthButton } from "components/buttons/full-width-button";
import useAppDispatch from "hooks/useAppDispatch";
import { authLogout } from "store/auth/auth.slice";
import { endSession } from "lib/axios/axios";
import { useQueryClient } from "@tanstack/react-query";

type Props = any;

const Root: FC<Props> = ({ navigation }) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const client = useQueryClient();

  const onLocationPress = () => navigation.navigate(COMMON_ROUTES.LOCATION);
  const onPreferencesPress = () =>
    navigation.navigate(COMMON_ROUTES.PREFERENCES);
  const onProfilePress = () => navigation.navigate(ACCOUNT_STACK.PROFILE);

  const logout = () => {
    dispatch(authLogout());
    endSession();
    client.clear();
  };

  const onLogoutPress = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => logout(), style: "destructive" },
    ]);
  };

  if (!isAuthenticated || !user) return null;

  return (
    <StaticScreenWrapper>
      <View style={tw`px-6 gap-8 flex-1 `}>
        <View style={tw`flex-row items-center justify-between gap-4`}>
          <Typography variant="h6" style={`font-semi-bold leading-tight  `}>
            Account
          </Typography>
          <UserAvatar
            avatarUrl={user.avatar}
            firstName={user?.first_name}
            lastName={user.last_name}
          />
        </View>

        <View>
          <ListButton
            icon={<FilterIcon />}
            onPress={onPreferencesPress}
            withBorder
            text="Preferences"
          />
          <ListButton
            withBorder
            icon={
              <Ionicons
                name="map-outline"
                size={19}
                color={tw.color("primary-main")}
              />
            }
            onPress={onLocationPress}
            text="Location"
          />
          <ListButton
            withBorder
            icon={
              <AntDesign
                name="user"
                size={19}
                color={tw.color("primary-main")}
              />
            }
            onPress={onProfilePress}
            text="Profile"
          />
          <ListButton
            icon={
              <Ionicons
                name="notifications-outline"
                size={19}
                color={tw.color("primary-main")}
              />
            }
            onPress={onLocationPress}
            text="Notifications"
          />
        </View>
        <View style={tw`flex-1`} />
        <FullWidthButton onPress={onLogoutPress} text="Sign Out" />
      </View>
    </StaticScreenWrapper>
  );
};

export default Root;
