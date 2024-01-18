import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HOME_STACK } from "constants/routes";

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
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
