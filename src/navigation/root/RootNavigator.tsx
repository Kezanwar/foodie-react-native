import React, { FC } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAppSelector } from "hooks/useAppSelector";
import SignIn from "screens/guest/sign-in";
import SignUp from "screens/guest/sign-up";
import PrivacyPolicy from "screens/common/privacy-policy";

import AppTabNavigator from "navigation/app";
import AddEmailPassword from "screens/guest/add-email-password";
import AddDetails from "screens/guest/add-details";
import { AUTH_ROUTES, COMMON_ROUTES } from "constants/routes";
import ConfirmEmail from "screens/common/confirm-email/ConfirmEmail";
import Preferences from "screens/common/preferences";

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
            <RootStack.Screen
              name={AUTH_ROUTES.CONFIRM_EMAIL}
              component={ConfirmEmail}
            />
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
      <RootStack.Group>
        <RootStack.Screen
          name={COMMON_ROUTES.PRIVACY_POLICY}
          component={PrivacyPolicy}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name={COMMON_ROUTES.PREFERENCES}
          component={Preferences}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
