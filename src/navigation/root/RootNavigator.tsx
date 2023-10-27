import React, { FC } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppSelector } from "hooks/useAppSelector";
import SignIn from "screens/guest/sign-in";
import SignUp from "screens/guest/sign-up";
import PrivacyPolicy from "screens/common/privacy-policy";
import Home from "screens/app/home";
import AppTabNavigator from "navigation/app";
import AddEmailPassword from "screens/guest/add-email-password";
import AddDetails from "screens/guest/add-details";

const RootStack = createNativeStackNavigator();

const RootNavigator: FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const isLoggedIn = auth.isAuthenticated && auth.isInitialized && auth.user;

  return (
    <RootStack.Navigator>
      {isLoggedIn ? (
        // App navigator
        <RootStack.Group screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="App" component={AppTabNavigator} />
        </RootStack.Group>
      ) : (
        // Auth screens
        <RootStack.Group screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="SignIn" component={SignIn} />
          <RootStack.Screen name="SignUp" component={SignUp} />
          <RootStack.Screen name="AddDetails" component={AddDetails} />
          <RootStack.Screen name="AddEmail" component={AddEmailPassword} />
        </RootStack.Group>
      )}
      {/* Common modal screens */}
      <RootStack.Group screenOptions={{ presentation: "modal" }}>
        <RootStack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
