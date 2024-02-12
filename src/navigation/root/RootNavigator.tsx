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
import Location from "screens/common/location";
import AddCustomLocation from "screens/common/add-custom-location";
import SingleDeal from "screens/common/single-deal";
import ForgotPassword from "screens/guest/forgot-password";

// export type RootStackParamList = {
//   App: undefined;

//   [AUTH_ROUTES.CONFIRM_EMAIL]: undefined;
//   [AUTH_ROUTES.SIGN_IN]: undefined;
//   [AUTH_ROUTES.SIGN_UP]: undefined;
//   [AUTH_ROUTES.ADD_EMAIL_PASSWORD]: undefined;
//   [AUTH_ROUTES.ADD_DETAILS]: undefined;

//   [COMMON_ROUTES.SINGLE_DEAL]: undefined;
//   [COMMON_ROUTES.LOCATION]: undefined;
//   [COMMON_ROUTES.PREFERENCES]: undefined;
//   [COMMON_ROUTES.PRIVACY_POLICY]: undefined;
//   [COMMON_ROUTES.ADD_CUSTOM_LOCATION]: undefined;
// };

const RootStack = createNativeStackNavigator();

const RootNavigator: FC = () => {
  const auth = useAppSelector((state) => state.auth);
  const isLoggedIn = auth.isAuthenticated && auth.isInitialized && auth.user;
  const emailConfirmed = auth?.user?.email_confirmed;

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
          <RootStack.Screen
            name={AUTH_ROUTES.FORGOT_PASSWORD}
            component={ForgotPassword}
          />
        </RootStack.Group>
      )}
      {/* Common screens */}
      <RootStack.Group>
        <RootStack.Screen
          name={COMMON_ROUTES.PRIVACY_POLICY}
          component={PrivacyPolicy}
        />
        {isLoggedIn && emailConfirmed && (
          <>
            <RootStack.Screen
              options={{ headerShown: false }}
              name={COMMON_ROUTES.PREFERENCES}
              component={Preferences}
            />
            <RootStack.Screen
              options={{ headerShown: false }}
              name={COMMON_ROUTES.LOCATION}
              component={Location}
            />
            <RootStack.Screen
              options={{
                headerShown: false,
                presentation: "containedModal",
              }}
              name={COMMON_ROUTES.ADD_CUSTOM_LOCATION}
              component={AddCustomLocation}
            />
            <RootStack.Screen
              options={{
                headerShown: false,
                presentation: "modal",
                animation: "slide_from_bottom",
                // gestureDirection: "vertical",
              }}
              name={COMMON_ROUTES.SINGLE_DEAL}
              component={SingleDeal}
            />
          </>
        )}
      </RootStack.Group>
    </RootStack.Navigator>
  );
};

export default RootNavigator;
