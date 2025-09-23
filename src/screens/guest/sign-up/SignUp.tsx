import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "theme/tailwind";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { Logo } from "components/logo";
import { ScrollScreenWrapper } from "components/screen-wrapper";
import Typography from "components/typography";
import { GoogleButton } from "components/buttons/google-button";

import { catchErrorHandler } from "utils/error";
import { authLogin } from "store/auth";
import { setSession } from "lib/axios";

import { SECTION_SHADOWS } from "theme/custom-shadows";
import { androidOAuthClientId, iOSOAuthClientId } from "lib/env";
import useAppDispatch from "hooks/useAppDispatch";
import { ErrorObject } from "types/error";
import { registerApple, registerGoogle } from "lib/api";
import Alert from "components/alert/Alert";
import { AUTH_ROUTES } from "constants/routes";
import TextButton from "components/buttons/text-button";
import { useAppSelector } from "hooks/useAppSelector";
import { isIOS } from "constants/theme";
import {
  AppleAuthenticationScope,
  signInAsync,
} from "expo-apple-authentication";
import AppleButton from "components/buttons/apple-button";
import EmailButton from "components/buttons/email-button";

WebBrowser.maybeCompleteAuthSession();

const SignUp = (props: any) => {
  // useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<ErrorObject | null>(null);

  const [, response, prompAsync] = Google.useAuthRequest({
    iosClientId: iOSOAuthClientId,
    androidClientId: androidOAuthClientId,
  });

  const onCreateAcc = () => {
    props.navigation.navigate(AUTH_ROUTES.SIGN_IN);
  };

  const onSignUp = () => props.navigation.navigate(AUTH_ROUTES.ADD_DETAILS);

  const pushToken = useAppSelector(
    (state) => state.notifications.expoPushToken
  );

  const registerWithGoogle = async (token: string) => {
    try {
      setGoogleLoading(true);
      const res = await registerGoogle(token, pushToken);
      const { user, accessToken } = res?.data;
      dispatch(authLogin(user));
      setSession(accessToken);
    } catch (error) {
      catchErrorHandler(error, (error) => {
        setError(error);
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const onGoogleRegister = () => {
    prompAsync();
  };

  const onAppleRegister = async () => {
    try {
      const credential = await signInAsync({
        requestedScopes: [
          AppleAuthenticationScope.FULL_NAME,
          AppleAuthenticationScope.EMAIL,
        ],
      });
      const res = await registerApple(credential, pushToken);
      const { user, accessToken } = res?.data;
      dispatch(authLogin(user));
      setSession(accessToken);
    } catch (e) {
      //@ts-ignore
      if (e.code === "ERR_REQUEST_CANCELED") {
        // handle that the user canceled the sign-in flow
      } else {
        catchErrorHandler(e, (error) => {
          setError(error);
        });
      }
    }
  };

  useEffect(() => {
    if (response?.type === "success") {
      if (response.authentication?.accessToken)
        registerWithGoogle(response.authentication?.accessToken);
    }
  }, [response]);

  return (
    <ScrollScreenWrapper>
      <View style={tw`flex-1 px-5`}>
        <Logo width={180} height={60} />
        <Typography variant="body2" color="text.secondary" style={"mt-4 mb-8"}>
          Explore your neighborhood’s best food deals, hidden specials, and
          offers you never knew about.
        </Typography>
        <Image
          style={tw`h-[120] opacity-30 right-[-40] bottom-[-200%] absolute w-[140] -z-10  `}
          source={{
            uri: "https://thefoodieappuk.s3.eu-north-1.amazonaws.com/assets/yellow-orange-blur.png",
          }}
        />
      </View>

      <Animated.View
        entering={FadeInDown}
        style={[
          tw`flex-1 py-6 px-5 z-20  bg-white dark:bg-grey-800   rounded-3xl`,
          isIOS && SECTION_SHADOWS.topShadowSection,
        ]}
      >
        <View style={tw`gap-3  flex-1`}>
          <EmailButton onPress={onSignUp} />
          <GoogleButton
            onPress={onGoogleRegister}
            loading={googleLoading}
            variant="register"
          />
          <AppleButton variant="register" onPress={onAppleRegister} />
        </View>

        {error?.message && (
          <View style={tw`items-center`}>
            <Alert
              style="mt-8"
              align="center"
              variant="error"
              content={error.message}
            />
          </View>
        )}
        <Text
          style={tw`font-light text-center text-sm mt-12 mb-2   text-type-light-secondary`}
        >
          Already have an account?
        </Text>
        <TextButton label="Sign in" onPress={onCreateAcc} />
      </Animated.View>
    </ScrollScreenWrapper>
  );
};

export default SignUp;
