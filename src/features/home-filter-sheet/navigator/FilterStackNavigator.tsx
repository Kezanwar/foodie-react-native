import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { FILTER_ROUTES } from "../constants";
import { Cuisines, Root } from "../screens";
import Dietary from "../screens/Dietary";

const FilterStack = createNativeStackNavigator();

const FilterStackNavigator: FC = () => {
  return (
    <NavigationContainer>
      <FilterStack.Navigator>
        <FilterStack.Screen
          options={{ headerShown: false }}
          name={FILTER_ROUTES.ROOT}
          component={Root}
        />
        <FilterStack.Screen
          options={{ headerShown: false }}
          name={FILTER_ROUTES.CUISINES}
          component={Cuisines}
        />
        <FilterStack.Screen
          options={{ headerShown: false }}
          name={FILTER_ROUTES.DIETARY_REQUIREMENTS}
          component={Dietary}
        />
      </FilterStack.Navigator>
    </NavigationContainer>
  );
};

export default FilterStackNavigator;
