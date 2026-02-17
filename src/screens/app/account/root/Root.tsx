import { Alert, SafeAreaView, View } from "react-native";

import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import React, { FC } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AntDesign } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import tw from "theme/tailwind";

import { endSession } from "lib/axios";

import { ACCOUNT_STACK, COMMON_ROUTES } from "constants/routes";

import UserAvatar from "components/user-avatar";
import Typography, { LEADING_TIGHT } from "components/typography";
import FilterIcon from "components/svgs/filter-icon";
import ListButton from "components/buttons/list-button";
import SectionCard from "components/section-card/SectionCard";
import HeaderContainer from "components/header-container";

import useAppDispatch from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { onLogout } from "store/global-actions";
import TextButton from "components/buttons/text-button";
import { handleSecretTap } from "store/debug";

type Props = any;

const Root: FC<Props> = ({ navigation }) => {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const client = useQueryClient();

  const onLocationPress = () => navigation.navigate(COMMON_ROUTES.LOCATION);
  const onPreferencesPress = () =>
    navigation.navigate(COMMON_ROUTES.PREFERENCES);
  const onProfilePress = () => navigation.navigate(ACCOUNT_STACK.PROFILE);
  const onFollowPress = () => navigation.navigate(ACCOUNT_STACK.FOLLOWING);
  const onFavouritePress = () => navigation.navigate(ACCOUNT_STACK.FAVOURITES);

  const logout = () => {
    dispatch(onLogout());
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

  if (!user) {
    return null;
  }

  return (
    <View style={tw`flex-1`}>
      <SafeAreaView style={tw`bg-white`}>
        <HeaderContainer style={"flex-row items-center justify-between"}>
          <TouchableWithoutFeedback onPress={() => dispatch(handleSecretTap())}>
            <Typography variant="h6" style={`font-bold ${LEADING_TIGHT}`}>
              Account
            </Typography>
          </TouchableWithoutFeedback>

          <UserAvatar
            onPress={onProfilePress}
            avatarUrl={user.avatar}
            firstName={user?.first_name}
            lastName={user.last_name}
          />
        </HeaderContainer>
      </SafeAreaView>
      <View style={tw`bg-grey-200 gap-3 flex-1`}>
        <SectionCard>
          <ListButton
            withBorder
            icon={
              <Feather name="info" size={19} color={tw.color("primary-main")} />
            }
            onPress={onProfilePress}
            text="Profile"
          />
          <ListButton
            icon={<FilterIcon />}
            onPress={onPreferencesPress}
            withBorder
            text="Preferences"
          />

          <ListButton
            withBorder
            icon={
              <FontAwesome
                name="heart-o"
                size={19}
                color={tw.color("primary-main")}
              />
            }
            onPress={onFavouritePress}
            text="Favourites"
          />
          <ListButton
            icon={
              <AntDesign
                name="user-add"
                size={19}
                color={tw.color("primary-main")}
              />
            }
            onPress={onFollowPress}
            text="Following"
          />
        </SectionCard>
        <SectionCard style="flex-1">
          <Typography
            variant="h6"
            style={`font-bold text-5 mb-3 ${LEADING_TIGHT}`}
          >
            Settings
          </Typography>
          <ListButton
            // withBorder
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
          {/* <ListButton
            icon={
              <Ionicons
                name="notifications-outline"
                size={19}
                color={tw.color("primary-main")}
              />
            }
            onPress={onLocationPress}
            text="Notifications"
          /> */}
          <TextButton
            style={tw`mt-auto mb-7`}
            label="Sign Out"
            onPress={onLogoutPress}
          />
        </SectionCard>
        {/* {!!recentlyViewed.length && (
          <SectionCard>
            <Typography style="font-bold leading-[1] text-4.5" variant="h6">
              Recently Viewed
            </Typography>
            <Typography variant="body2" style="mb-6" color="text.secondary">
              The last 5 deals you've viewed
            </Typography>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={recentlyViewed}
              ItemSeparatorComponent={() => <CarouselDivider />}
              snapToAlignment="start"
              decelerationRate={"fast"}
              keyExtractor={(item, index) =>
                `${index}-${item.deal._id}-${item.location._id}`
              }
              snapToInterval={CAROUSEL_ITEM_WIDTH}
              renderItem={({ item }) => {
                return (
                  <DealCard
                    type="carousel"
                    item={item}
                    onShare={(name) => {}}
                    onLike={(item) => {}}
                    openDeal={() => {}}
                    // location={item.location}
                    // navToRest={navToRest}
                    // restaurant={item.restaurant}
                  />
                );
              }}
            />
          </SectionCard>
        )} */}
      </View>
    </View>
  );
};

export default Root;
