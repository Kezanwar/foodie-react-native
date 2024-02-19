import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DISCOVER_STACK } from "constants/routes";

import Root from "screens/app/account/discover/Root";

const DiscoverStack = createNativeStackNavigator();

type Props = {};

const DiscoverStackNavigator: FC<Props> = (props) => {
  return (
    <DiscoverStack.Navigator>
      <DiscoverStack.Screen
        name={DISCOVER_STACK.ROOT}
        options={{ headerShown: false }}
        component={Root}
      />
    </DiscoverStack.Navigator>
  );
};

export default DiscoverStackNavigator;
