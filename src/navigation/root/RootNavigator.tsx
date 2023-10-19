import React, { FC } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppSelector } from "hooks/useAppSelector";
import SignIn from "screens/guest/sign-in";
import SignUp from "screens/guest/sign-up";
import PrivacyPolicy from "screens/common/privacy-policy";
import Home from "screens/app/home";

const RootStack = createNativeStackNavigator();

const RootNavigator: FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const isLoggedIn = auth.isAuthenticated && auth.user;

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        // App navigator
        <RootStack.Group>
          <RootStack.Screen name="App" component={Home} />
        </RootStack.Group>
      ) : (
        // Auth screens
        <RootStack.Group>
          <RootStack.Screen name="SignIn" component={SignIn} />
          <RootStack.Screen name="SignUp" component={SignUp} />
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
