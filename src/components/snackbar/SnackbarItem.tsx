import React, { FC } from "react";
import { View, Text } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { ISnackbarMessage } from "store/snackbar/snackbar.slice";
import tw from "theme/tailwind";
import variantStyles from "theme/variant-styles";

type Props = {
  message: ISnackbarMessage;
};

const SnackbarItem: FC<Props> = ({ message }) => {
  return (
    <Animated.View
      entering={FadeInDown}
      style={tw`flex-row items-center bg-grey-900 dark:bg-grey-100 shadow-lg gap-2 p-3 rounded-lg`}
    >
      {React.cloneElement(variantStyles[message.variant]?.icon, {
        color: tw.color(`${message.variant}-main`),
        style: tw`mt-0`,
      })}
      <Text style={tw`font-regular text-white dark:text-grey-950 w-full`}>
        {message.message}
      </Text>
    </Animated.View>
  );
};

export default SnackbarItem;
