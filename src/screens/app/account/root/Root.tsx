import { Alert, FlatList, SafeAreaView, ScrollView, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { FC, useCallback, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import tw from "theme/tailwind";

import { endSession } from "lib/axios";
import LocalStorage from "lib/storage";

import { CAROUSEL_ITEM_WIDTH } from "constants/theme";

import { ACCOUNT_STACK, COMMON_ROUTES } from "constants/routes";

import UserAvatar from "components/user-avatar";
import { Typography } from "components/typography";
import FilterIcon from "components/svgs/filter-icon";
import ListButton from "components/buttons/list-button";
import SectionCard from "components/section-card/SectionCard";
import HeaderContainer from "components/header-container";
import CarouselDivider from "components/separators/carousel-divider";
import DealCard from "features/deal-card";

import useAppDispatch from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import { onLogout } from "store/global-actions";

type Props = any;

const Root: FC<Props> = ({ navigation }) => {
  const { user } = useAppSelector((state) => state.auth);
  const [recentlyViewed, setRecentlyViewed] = useState(
    LocalStorage.getRecentlyViewedDisplay()
  );

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

  const setRecent = useCallback(() => {
    setRecentlyViewed(LocalStorage.getRecentlyViewedDisplay());
  }, []);

  useFocusEffect(setRecent);

  if (!user) {
    return null;
  }

  return (
    <View style={tw`flex-1`}>
      <SafeAreaView style={tw`bg-white`}>
        <HeaderContainer style={"flex-row items-center justify-between"}>
          <View>
            <Typography variant="h6" style={`font-bold leading-tight  `}>
              Account
            </Typography>
            <TouchableOpacity onPress={onLogoutPress}>
              <Typography
                variant="body2"
                color="text.secondary"
                style={`font-regular mt-1 leading-[1.2]`}
              >
                Sign out
              </Typography>
            </TouchableOpacity>
          </View>

          <UserAvatar
            avatarUrl={user.avatar}
            firstName={user?.first_name}
            lastName={user.last_name}
          />
        </HeaderContainer>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-3`}
        style={tw`bg-grey-200  flex-1`}
      >
        <SectionCard>
          <ListButton
            withBorder
            icon={
              <AntDesign
                name="infocirlceo"
                size={19}
                color={tw.color("primary-main")}
              />
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
              <AntDesign
                name="hearto"
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
                name="adduser"
                size={19}
                color={tw.color("primary-main")}
              />
            }
            onPress={onFollowPress}
            text="Following"
          />
        </SectionCard>
        <SectionCard>
          <Typography
            variant="h6"
            style={`font-bold text-5 mb-2 leading-tight  `}
          >
            Settings
          </Typography>
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
        </SectionCard>
        {!!recentlyViewed.length && (
          <SectionCard>
            <Typography style="font-bold leading-[0] text-4.5" variant="h6">
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
        )}
      </ScrollView>
    </View>
  );
};

export default Root;
