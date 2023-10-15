import { Text, View } from "react-native";
import React from "react";
import tw from "theme/tailwind";

type Props = {};

const SignIn = (props: Props) => {
  return (
    <View style={tw`bg-white dark:bg-grey-950  flex-1 relative`}>
      <Text>SignIn</Text>
    </View>
  );
};

export default SignIn;
