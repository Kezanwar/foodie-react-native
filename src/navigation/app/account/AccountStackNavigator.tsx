import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ACCOUNT_STACK } from "constants/routes";
import Root from "screens/app/account/root";
import Profile from "screens/app/account/profile";

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
    </AccountStack.Navigator>
  );
};

export default AccountStackNavigator;
