import React, { FC } from "react";
import tw from "theme/tailwind";
import { Text, TouchableOpacity } from "react-native";

import useAppDispatch from "hooks/useAppDispatch";
import { increment } from "store/slices/auth/auth.slice";
import useSnackbar from "hooks/useSnackbar";

const TestTwo: FC = () => {
  const dispatch = useAppDispatch();

  const onPress = () => {
    dispatch(increment());
  };

  const enqeueSnackbar = useSnackbar();

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={tw`font-black text-3xl mt-2 dark:text-white`}>
        increment
      </Text>
    </TouchableOpacity>
  );
};

export default TestTwo;
