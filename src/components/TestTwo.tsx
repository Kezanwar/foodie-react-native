import React, { FC } from "react";
import { Text, TouchableOpacity } from "react-native";

import tw from "lib/theme/tailwind";
import useAppDispatch from "hooks/useAppDispatch";
import { increment } from "store/slices/auth/auth.slice";

const TestTwo: FC = () => {
  const dispatch = useAppDispatch();

  const onPress = () => {
    dispatch(increment());
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={tw`font-black text-3xl mb-8 dark:text-white`}>
        increment
      </Text>
    </TouchableOpacity>
  );
};

export default TestTwo;
