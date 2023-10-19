import { ScrollView, Text, View } from "react-native";
import React from "react";
import tw from "theme/tailwind";

import { useAppSelector } from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";
import ScreenWrapper from "components/screen-wrapper/ScreenWrapper";
import { Logo } from "components/logo";

type Props = {};

const SignIn = (props: Props) => {
  return (
    <ScreenWrapper>
      <Logo />
      <View style={tw`my-20 items-center gap-4  flex-wrap`}>
        <Text style={tw`font-semi-bold text-4xl`}>Sign in</Text>
        <Text
          style={tw`font-light text-sm  max-w-[75%] text-center text-type-light-secondary`}
        >
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
          necessitatibus quasi ipsum eligendi minima amet eos! Atque
        </Text>
      </View>
    </ScreenWrapper>
  );
};

export default SignIn;
