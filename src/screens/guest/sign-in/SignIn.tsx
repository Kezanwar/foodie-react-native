import { ScrollView, Text, View } from "react-native";
import React from "react";
import tw from "theme/tailwind";

import { useAppSelector } from "hooks/useAppSelector";
import useAppDispatch from "hooks/useAppDispatch";

import { Logo } from "components/logo";
import { StaticScreenWrapper } from "components/screen-wrapper";

type Props = {};

const SignIn = (props: Props) => {
  return (
    <StaticScreenWrapper>
      <View style={tw` gap-12`}>
        <Logo width={180} height={60} />
        <View>
          <Text style={tw`font-semi-bold text-3xl mb-4 leading-[1.1]`}>
            Sign in
          </Text>
          <Text
            style={tw`font-light text-sm  max-w-[75%]  text-type-light-secondary`}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
          </Text>
        </View>
      </View>
    </StaticScreenWrapper>
  );
};

export default SignIn;
