import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { DefaultValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Animated, { FadeInDown } from "react-native-reanimated";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { Image } from "expo-image";
import { Feather } from "@expo/vector-icons";

import tw from "theme/tailwind";
import { SECTION_SHADOWS } from "theme/custom-shadows";

import { Logo } from "components/logo";
import { ScrollScreenWrapper } from "components/screen-wrapper";
import { Typography } from "components/typography";
import { KeyboardDismissingView } from "components/keyboard-dismmising-view";
import { LoadingButton } from "components/buttons/loading-button";
import { Or } from "components/separators/or";
import Alert from "components/alert/Alert";
import { GoogleButton } from "components/buttons/google-button";
import RHFTextField from "components/form/RHF/RHFTextField";

import { useAppSelector } from "hooks/useAppSelector";
import { LoginSchema } from "lib/validation/auth";
import { loginGoogle, loginJWT } from "lib/api/api";
import { catchErrorHandler } from "util/error";
import { authLogin } from "store/auth/auth.slice";
import { setSession } from "lib/axios/axios";
import { androidOAuthClientId, iOSOAuthClientId } from "lib/env/env";
import useAppDispatch from "hooks/useAppDispatch";
import { AUTH_ROUTES } from "constants/routes";

WebBrowser.maybeCompleteAuthSession();

type FormValues = {
  email: string;
  password: string;
};

const iconColor = tw.color("grey-700");

const SignIn = (props: any) => {
  useAppSelector((state) => state.theme.theme);
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [, response, prompAsync] = Google.useAuthRequest({
    iosClientId: iOSOAuthClientId,
    androidClientId: androidOAuthClientId,
  });

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const onCreateAcc = () => {
    props.navigation.navigate(AUTH_ROUTES.SIGN_UP);
  };

  const defaultValues: DefaultValues<FormValues> = {
    email: "",
    password: "",
  };

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const onFormSuccess: SubmitHandler<FormValues> = async (data) => {
    try {
      setIsLoading(true);
      const res = await loginJWT(data);
      const { user, accessToken } = res?.data;
      dispatch(authLogin(user));
      setSession(accessToken);
    } catch (error) {
      catchErrorHandler(error, (error) => {
        setError("root.afterSubmit", error);
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (token: string) => {
    try {
      setGoogleLoading(true);
      const res = await loginGoogle(token);
      const { user, accessToken } = res?.data;
      dispatch(authLogin(user));
      setSession(accessToken);
    } catch (error) {
      catchErrorHandler(error, (error) => {
        setError("root.afterSubmit", error);
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  const onGoogleSignIn = () => {
    prompAsync();
  };

  useEffect(() => {
    if (response?.type === "success") {
      if (response.authentication?.accessToken)
        loginWithGoogle(response.authentication?.accessToken);
    }
  }, [response]);

  return (
    <ScrollScreenWrapper>
      <KeyboardDismissingView
        containerStyle={tw`flex-1`}
        style={tw`flex-1 gap-10`}
      >
        <View style={tw`flex-1 px-6`}>
          <Logo width={180} height={60} />
          <Typography
            variant="body2"
            color="text.secondary"
            style={"mt-4 mb-8"}
          >
            Welcome back, lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Ea, molestiae.
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
            tw`flex-1 py-8 px-6 z-20  bg-white dark:bg-grey-950   rounded-3xl`,
            SECTION_SHADOWS.topShadowSection,
          ]}
        >
          {/* <ThemeToggle /> */}

          <View style={tw`gap-4  flex-1`}>
            <RHFTextField
              control={control}
              name="email"
              autoComplete="email"
              placeholder={"Email address"}
            />
            <RHFTextField
              name="password"
              control={control}
              placeholder={"Password"}
              secureTextEntry={showPassword}
              actionOnPress={toggleShowPassword}
              actionIcon={
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={18}
                  color={iconColor}
                />
              }
            />
            {errors?.root?.afterSubmit && (
              <Alert
                align="center"
                variant="error"
                content={errors?.root?.afterSubmit?.message}
              />
            )}
            <LoadingButton
              isLoading={isLoading}
              onPress={handleSubmit(onFormSuccess)}
              text="Login"
            />
            <Or />
            <GoogleButton
              loading={googleLoading}
              onPress={onGoogleSignIn}
              variant="login"
            />
          </View>
          <Text
            style={tw`font-light text-center text-sm mt-12 mb-2   text-type-light-secondary`}
          >
            New here?
          </Text>
          <TouchableOpacity onPress={onCreateAcc}>
            <Typography
              variant="body2"
              color="primary.main"
              style="text-center font-semi-bold"
            >
              Create an account
            </Typography>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardDismissingView>
    </ScrollScreenWrapper>
  );
};

export default SignIn;
