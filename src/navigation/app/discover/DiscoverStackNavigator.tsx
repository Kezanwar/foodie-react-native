import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DISCOVER_STACK } from "constants/routes";

import Root from "screens/app/discover/root";
import SingleDeal from "screens/common/single-deal";
import SingleRestaurant from "screens/common/single-restaurant";
import Category from "screens/app/discover/category";

const DiscoverStack = createNativeStackNavigator();

type Props = {};

const DiscoverStackNavigator: FC<Props> = () => {
  return (
    <DiscoverStack.Navigator>
      <DiscoverStack.Screen
        name={DISCOVER_STACK.ROOT}
        options={{ headerShown: false }}
        component={Root}
      />
      <DiscoverStack.Screen
        name={DISCOVER_STACK.SINGLE_DEAL}
        options={{ headerShown: false }}
        component={SingleDeal}
      />
      <DiscoverStack.Screen
        name={DISCOVER_STACK.SINGLE_RESTAURANT}
        options={{ headerShown: false }}
        component={SingleRestaurant}
      />
      <DiscoverStack.Screen
        name={DISCOVER_STACK.CATEGORY}
        options={{ headerShown: false }}
        component={Category}
      />
    </DiscoverStack.Navigator>
  );
};

export default DiscoverStackNavigator;
