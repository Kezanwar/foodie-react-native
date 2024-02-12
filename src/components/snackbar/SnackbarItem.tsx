import React, { FC } from "react";
import { Text } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";
import { ISnackbarMessage } from "store/snackbar/snackbar.slice";
import tw from "theme/tailwind";
import variantStyles from "theme/variant-styles";

type Props = {
  message: ISnackbarMessage;
};

const SnackbarItem: FC<Props> = ({ message }) => {
  return (
    <Animated.View
      entering={FadeInUp}
      exiting={FadeOutUp}
      style={tw`flex-row items-start bg-grey-800 dark:bg-grey-100 shadow-lg gap-2 p-3 rounded-lg`}
    >
      {React.cloneElement(variantStyles[message.variant]?.icon, {
        color: tw.color(`${message.variant}-main`),
        style: tw`mt-0`,
      })}
      <Text
        style={tw`mt-0.5 font-regular text-white dark:text-grey-950 max-w-[90%]`}
      >
        {message.message}
      </Text>
    </Animated.View>
  );
};

export default SnackbarItem;
