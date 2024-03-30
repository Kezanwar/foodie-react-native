import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FAVOURITES_STACK } from "constants/routes";

import Root from "screens/app/favourites/root";
import SingleDeal from "screens/common/single-deal";
import SingleRestaurant from "screens/common/single-restaurant";

const FavouritesStack = createNativeStackNavigator();

type Props = {};

const FavouritesStackNavigator: FC<Props> = () => {
  return (
    <FavouritesStack.Navigator>
      <FavouritesStack.Screen
        name={FAVOURITES_STACK.ROOT}
        options={{ headerShown: false }}
        component={Root}
      />
      <FavouritesStack.Screen
        name={FAVOURITES_STACK.SINGLE_DEAL}
        options={{ headerShown: false }}
        component={SingleDeal}
      />
      <FavouritesStack.Screen
        name={FAVOURITES_STACK.SINGLE_RESTAURANT}
        options={{ headerShown: false }}
        component={SingleRestaurant}
      />
    </FavouritesStack.Navigator>
  );
};

export default FavouritesStackNavigator;
