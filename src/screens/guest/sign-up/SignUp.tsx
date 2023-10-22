import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "theme/tailwind";
import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useAppSelector } from "hooks/useAppSelector";

import { Logo } from "components/logo";
import { ScrollScreenWrapper } from "components/screen-wrapper";
import { Typography } from "components/typography";
import { CustomTextField } from "components/form/custom-text-field";
import { KeyboardDismissingView } from "components/keyboard-dismmising-view";
import { LoadingButton } from "components/buttons/loading-button";
import { Or } from "components/separators/or";
import { GoogleButton } from "components/buttons/google-button";

import { SECTION_SHADOWS } from "theme/custom-shadows";
import { TabController } from "react-native-ui-lib";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const SignUp = (props: any) => {
  useAppSelector((state) => state.theme.theme);

  const onCreateAcc = () => {
    props.navigation.navigate("SignIn");
  };

  const onSignUp = () => props.navigation.navigate("AddEmail");
  return (
    <ScrollScreenWrapper>
      <GestureHandlerRootView>
        <KeyboardDismissingView
          containerStyle={tw`flex-1`}
          style={tw`flex-1 gap-10`}
        >
          <View style={tw`flex-1 px-6`}>
            <Logo width={180} height={60} />
            <Text
              style={tw`font-light text-sm mt-4 max-w-full mb-8  text-type-light-secondary`}
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta,
              impedit.
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
              tw`flex-1 py-7 px-6 z-20  bg-white dark:bg-grey-800   rounded-3xl`,
              SECTION_SHADOWS.topShadowSection,
            ]}
          >
            <Typography variant="h6" style={" font-semi-bold mb-6 "}>
              Create account
            </Typography>

            <View style={tw`gap-4  flex-1`}>
              <CustomTextField
                autoComplete="given-name"
                placeholder={"First name"}
              />
              <CustomTextField
                autoComplete="family-name"
                placeholder={"Last name"}
              />
              <LoadingButton onPress={onSignUp} text="Sign up" />
              <Or />
              <GoogleButton variant="register" />
            </View>
            <Text
              style={tw`font-light text-center text-sm mt-12 mb-2   text-type-light-secondary`}
            >
              Already have an account?
            </Text>
            <TouchableOpacity onPress={onCreateAcc}>
              <Typography
                variant="body2"
                color="primary.main"
                style="text-center font-semi-bold "
              >
                Sign in
              </Typography>
            </TouchableOpacity>
          </Animated.View>
        </KeyboardDismissingView>
      </GestureHandlerRootView>
    </ScrollScreenWrapper>
  );
};

export default SignUp;
