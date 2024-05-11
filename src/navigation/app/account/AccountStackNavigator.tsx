import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ACCOUNT_STACK } from "constants/routes";
import Root from "screens/app/account/root";
import Profile from "screens/app/account/profile";
import Following from "screens/app/account/following";
import SingleRestaurant from "screens/common/single-restaurant";
import Favourites from "screens/app/account/favourites";

const AccountStack = createNativeStackNavigator();

const AccountStackNavigator: FC = () => {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name={ACCOUNT_STACK.ROOT}
        options={{ headerShown: false }}
        component={Root}
      />
      <AccountStack.Screen
        name={ACCOUNT_STACK.PROFILE}
        options={{ headerShown: false }}
        component={Profile}
      />
      <AccountStack.Screen
        name={ACCOUNT_STACK.FOLLOWING}
        options={{ headerShown: false }}
        component={Following}
      />
      <AccountStack.Screen
        name={ACCOUNT_STACK.FAVOURITES}
        options={{ headerShown: false }}
        component={Favourites}
      />
      <AccountStack.Screen
        name={ACCOUNT_STACK.SINGLE_RESTAURANT}
        options={{ headerShown: false }}
        component={SingleRestaurant}
      />
    </AccountStack.Navigator>
  );
};

export default AccountStackNavigator;
