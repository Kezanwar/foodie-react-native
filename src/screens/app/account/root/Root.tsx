import { Alert, FlatList, SafeAreaView, ScrollView, View } from "react-native";
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
import TextButton from "components/buttons/text-button";
import { TouchableOpacity } from "react-native-gesture-handler";
import SectionCard from "components/section-card/SectionCard";
import ls from "lib/storage/storage";
import CarouselDivider from "components/separators/carousel-divider";
import { CAROUSEL_ITEM_WIDTH } from "constants/theme";
import DealCard from "features/deal-card";

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

  const recent = ls.getRecentlyViewedDisplay();

  if (!isAuthenticated || !user) return null;

  return (
    <View style={tw`flex-1`}>
      <SafeAreaView style={tw`bg-white`}>
        <View style={tw`flex-row px-6 pb-4  items-center justify-between`}>
          <View>
            <Typography variant="h6" style={`font-semi-bold leading-tight  `}>
              Account
            </Typography>
            <TouchableOpacity onPress={onLogoutPress}>
              <Typography
                variant="body2"
                color="primary.main"
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
        </View>
      </SafeAreaView>
      <ScrollView
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
            onPress={onProfilePress}
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
            onPress={onProfilePress}
            text="Following"
          />
        </SectionCard>
        <SectionCard>
          <Typography
            variant="h6"
            style={`font-semi-bold text-5 mb-2 leading-tight  `}
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
        <SectionCard>
          <Typography style="font-semi-bold leading-[0] text-4.5" variant="h6">
            Recently Viewed
          </Typography>
          <Typography variant="body2" style="mb-6" color="text.secondary">
            The last 5 deals you've viewed
          </Typography>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={recent}
            ItemSeparatorComponent={() => <CarouselDivider />}
            snapToAlignment="start"
            decelerationRate={"fast"}
            keyExtractor={(item) => item._id}
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
      </ScrollView>
    </View>
  );
};

export default Root;
