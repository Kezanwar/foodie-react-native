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
import { AUTH_ROUTES } from "constants/routes";
import ConfirmEmail from "screens/common/confirm-email/ConfirmEmail";

const RootStack = createNativeStackNavigator();

const RootNavigator: FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const isLoggedIn = auth.isAuthenticated && auth.isInitialized && auth.user;
  const emailConfirmed = auth?.user?.email_confirmed;

  console.log(auth.user);

  return (
    <RootStack.Navigator>
      {isLoggedIn ? (
        !emailConfirmed ? (
          <RootStack.Group screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="SignUp" component={ConfirmEmail} />
          </RootStack.Group>
        ) : (
          // App navigator
          <RootStack.Group screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="App" component={AppTabNavigator} />
          </RootStack.Group>
        )
      ) : (
        // Auth screens
        <RootStack.Group screenOptions={{ headerShown: false }}>
          <RootStack.Screen name={AUTH_ROUTES.SIGN_UP} component={SignUp} />
          <RootStack.Screen name={AUTH_ROUTES.SIGN_IN} component={SignIn} />
          <RootStack.Screen
            name={AUTH_ROUTES.ADD_DETAILS}
            component={AddDetails}
          />
          <RootStack.Screen
            name={AUTH_ROUTES.ADD_EMAIL_PASSWORD}
            component={AddEmailPassword}
          />
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
