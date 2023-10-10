import React, { FC } from "react";
import { Text } from "react-native";

import tw from "lib/theme/tailwind";

import { useAppSelector } from "hooks/useAppSelector";

const Test: FC = () => {
  const count = useAppSelector((state) => state.auth.count);
  return (
    <Text style={tw`font-black text-3xl mb-8 dark:text-white`}>
      foodieeee {count}
    </Text>
  );
};

export default Test;
