import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { FC, ReactNode } from "react";
import tw from "theme/tailwind";

type Props = TouchableOpacityProps & {
  children: ReactNode;
  buttonStyle?: string;
};

const IconButton: FC<Props> = ({ onPress, children, buttonStyle = "" }) => {
  return (
    <TouchableOpacity onPress={onPress} style={tw`px-0.75  ${buttonStyle}`}>
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;
