import { View, Text } from "react-native";
import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HOME_STACK } from "constants/routes";
import Home from "screens/app/home";

const HomeStack = createNativeStackNavigator();

type Props = {};

const HomeStackNavigator: FC = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={HOME_STACK.ROOT} component={Home} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
