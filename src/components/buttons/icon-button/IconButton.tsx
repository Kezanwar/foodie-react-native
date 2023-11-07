import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from "react-native";
import React, { FC, ReactNode } from "react";
import tw from "theme/tailwind";

type Props = TouchableOpacityProps & {
  children: ReactNode;
};

const IconButton: FC<Props> = ({ onPress, children }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      //   style={tw`w-full p-3 rounded-full bg-`}
    >
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;
