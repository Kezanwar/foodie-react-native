import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import {
  DefaultValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Animated, { FadeInDown } from "react-native-reanimated";
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
import { GoogleButton } from "components/buttons/google-button";
import RHFTextField from "components/form/RHF/RHFTextField";

import { useAppSelector } from "hooks/useAppSelector";
import { LoginSchema } from "lib/validation/auth";

type FormValues = {
  email: string;
  password: string;
};

const iconColor = tw.color("grey-700");

const SignIn = (props: any) => {
  useAppSelector((state) => state.theme.theme);
  const [showPassword, setShowPassword] = useState(true);
  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const onCreateAcc = () => {
    props.navigation.navigate("SignUp");
  };

  const defaultValues: DefaultValues<FormValues> = {
    email: "",
    password: "",
  };

  const { handleSubmit, control, setValue, getValues } = useForm<FormValues>({
    mode: "onChange",
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const onSuccess: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  const onError: SubmitErrorHandler<FormValues> = (error) => {
    console.log(error);
  };

  return (
    <ScrollScreenWrapper>
      <KeyboardDismissingView
        containerStyle={tw`flex-1`}
        style={tw`flex-1 gap-10`}
      >
        <View style={tw`flex-1 px-6`}>
          <Logo width={180} height={60} />
          <Text
            style={tw`font-light text-sm mt-4 max-w-full mb-8  text-type-light-secondary`}
          >
            Welcome back, lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Ea, molestiae.
          </Text>

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
          {/* <Typography variant="h6" style={" font-semi-bold mb-6 "}>
            Sign in
          </Typography> */}

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
            <LoadingButton
              onPress={handleSubmit(onSuccess, onError)}
              text="Login"
            />
            <Or />
            <GoogleButton variant="login" />
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
              Register
            </Typography>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardDismissingView>
    </ScrollScreenWrapper>
  );
};

export default SignIn;
