import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HOME_STACK } from "constants/routes";

import { Filters } from "screens/app/home/filters";
import { Root } from "screens/app/home/root";

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
        name={HOME_STACK.FILTERS}
        options={{ headerShown: false }}
        component={Filters}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
