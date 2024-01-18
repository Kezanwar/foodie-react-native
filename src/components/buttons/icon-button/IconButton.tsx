import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { FC, ReactNode } from "react";

type Props = TouchableOpacityProps & {
  children: ReactNode;
};

const IconButton: FC<Props> = ({ onPress, children, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

export default IconButton;
