import React from "react";
import { Image } from "expo-image";
import tw from "theme/tailwind";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { LoadingButton } from "components/buttons/loading-button";
import { CustomTextField } from "components/form/custom-text-field";
import { KeyboardDismissingView } from "components/keyboard-dismmising-view";
import { Logo } from "components/logo";
import { ScrollScreenWrapper } from "components/screen-wrapper";
import { Typography } from "components/typography";

import { useAppSelector } from "hooks/useAppSelector";

import { SECTION_SHADOWS } from "theme/custom-shadows";

const AddEmail: React.FC = (props: any) => {
  useAppSelector((state) => state.theme.theme);

  const onGoBack = () => props.navigation.goBack();

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
            tw`flex-1 py-7 px-6 z-20  bg-white dark:bg-grey-800   rounded-3xl`,
            SECTION_SHADOWS.topShadowSection,
          ]}
        >
          <Typography variant="h6" style={" font-semi-bold mb-6 "}>
            Add email address
          </Typography>

          <View style={tw`gap-4  flex-1`}>
            <CustomTextField
              autoComplete="email"
              placeholder={"Email address"}
            />
          </View>
          <View style={tw`flex-1 h-[100] justify-end`}>
            <LoadingButton text="Done" />
            <TouchableOpacity style={tw`mt-4`} onPress={onGoBack}>
              <Typography
                variant="body2"
                color="primary.main"
                style="text-center font-semi-bold "
              >
                Go back
              </Typography>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </KeyboardDismissingView>
    </ScrollScreenWrapper>
  );
};

export default AddEmail;
