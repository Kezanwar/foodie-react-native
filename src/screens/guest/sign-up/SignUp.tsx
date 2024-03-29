import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import tw from "theme/tailwind";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { Logo } from "components/logo";
import { ScrollScreenWrapper } from "components/screen-wrapper";
import { Typography } from "components/typography";
import { FullWidthButton } from "components/buttons/full-width-button";
import { Or } from "components/separators/or";
import { GoogleButton } from "components/buttons/google-button";

import { catchErrorHandler } from "util/error";
import { authLogin } from "store/auth/auth.slice";
import { setSession } from "lib/axios/axios";

import { SECTION_SHADOWS } from "theme/custom-shadows";
import { androidOAuthClientId, iOSOAuthClientId } from "lib/env/env";
import useAppDispatch from "hooks/useAppDispatch";
import { ErrorObject } from "types/error";
import { registerGoogle } from "lib/api/api";
import Alert from "components/alert/Alert";
import { AUTH_ROUTES } from "constants/routes";
import TextButton from "components/buttons/text-button";

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

  const registerWithGoogle = async (token: string) => {
    try {
      setGoogleLoading(true);
      const res = await registerGoogle(token);
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

  useEffect(() => {
    if (response?.type === "success") {
      if (response.authentication?.accessToken)
        registerWithGoogle(response.authentication?.accessToken);
    }
  }, [response]);

  return (
    <ScrollScreenWrapper>
      <View style={tw`flex-1 px-6`}>
        <Logo width={180} height={60} />
        <Typography variant="body2" color="text.secondary" style={"mt-4 mb-8"}>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta,
          impedit.
        </Typography>
        <Image
          style={tw`h-[120] opacity-30 right-[-40] bottom-[-200%] absolute w-[140]  `}
          source={{
            uri: "https://foodie-s3.s3.eu-west-2.amazonaws.com/yellow-orange-blur.png",
          }}
        />
      </View>

      <Animated.View
        entering={FadeInDown}
        style={[
          tw`flex-1 py-8 px-6 z-20  bg-white dark:bg-grey-800   rounded-3xl`,
          SECTION_SHADOWS.topShadowSection,
        ]}
      >
        <View style={tw`gap-4  flex-1`}>
          <FullWidthButton onPress={onSignUp} text="Create an account" />
          <Or />
          <GoogleButton
            onPress={onGoogleRegister}
            loading={googleLoading}
            variant="register"
          />
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
