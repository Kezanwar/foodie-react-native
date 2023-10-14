import React, { FC } from "react";
import { View, Text } from "react-native";
import { ISnackbarMessage } from "store/slices/snackbar/snackbar.slice";
import tw from "theme/tailwind";
import variantStyles from "theme/variant-styles";

type Props = {
  message: ISnackbarMessage;
};

const SnackbarItem: FC<Props> = ({ message }) => {
  return (
    <View
      style={tw`flex-row items-center bg-white dark:bg-grey-800 shadow-lg gap-2 p-3 rounded-lg`}
    >
      {React.cloneElement(variantStyles[message.variant]?.icon, {
        color: tw.color(`${message.variant}-main`),
        style: tw`mt-0`,
      })}
      <Text style={tw`font-regular dark:text-grey-100 w-full`}>
        {message.message}
      </Text>
    </View>
  );
};

export default SnackbarItem;
