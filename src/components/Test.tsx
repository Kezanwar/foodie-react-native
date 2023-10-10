import tw from "lib/theme/tailwind";
import React, { FC } from "react";
import { Text } from "react-native";

const Test: FC = () => {
  return (
    <Text style={tw`font-black text-3xl mb-8 dark:text-white`}>foodieeee</Text>
  );
};

export default Test;
