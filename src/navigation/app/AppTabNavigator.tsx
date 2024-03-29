import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./home";
import { DiscoverStackNavigator } from "./discover";

import { AntDesign } from "@expo/vector-icons";
import tw from "theme/tailwind";
import AccountStackNavigator from "./account";

const Tab = createBottomTabNavigator();

const FOCUSED_COL = tw.color("primary-main");
const BLUR_COL = tw.color("grey-500");

const AppTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="home"
              size={23}
              color={focused ? FOCUSED_COL : BLUR_COL}
            />
          ),
          tabBarLabelStyle: { display: "none" },
        }}
        name="Home"
        component={HomeStackNavigator}
      />
      <Tab.Screen
        name="Search"
        component={DiscoverStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="search1"
              size={23}
              color={focused ? FOCUSED_COL : BLUR_COL}
            />
          ),
          tabBarLabelStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={DiscoverStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="hearto"
              size={23}
              color={focused ? FOCUSED_COL : BLUR_COL}
            />
          ),
          tabBarLabelStyle: { display: "none" },
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStackNavigator}
        options={{
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name="user"
              size={23}
              color={focused ? FOCUSED_COL : BLUR_COL}
            />
          ),
          tabBarLabelStyle: { display: "none" },
        }}
      />
    </Tab.Navigator>
  );
};

export default AppTabNavigator;
