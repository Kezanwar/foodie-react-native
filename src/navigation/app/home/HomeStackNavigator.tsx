import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HOME_STACK } from "constants/routes";

import { Root } from "screens/app/home/root";

import SingleRestaurant from "screens/common/single-restaurant";

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator: FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name={HOME_STACK.ROOT}
        options={{ headerShown: false }}
        component={Root}
      />

      <HomeStack.Screen
        name={HOME_STACK.SINGLE_RESTAURANT}
        options={{ headerShown: false }}
        component={SingleRestaurant}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
