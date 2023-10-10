import tw from "lib/tailwind";
import React, { FC } from "react";
import { Text } from "react-native";

const Test: FC = () => {
  return <Text style={tw`font-black text-3xl`}>foodie</Text>;
};

export default Test;
