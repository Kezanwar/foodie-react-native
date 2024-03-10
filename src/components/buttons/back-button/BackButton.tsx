import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";

import { AntDesign } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
  isAbsolute?: boolean;
  withPad?: boolean;
};

const iconCol = tw.color("primary-main");

const BackButton: FC<Props> = ({ isAbsolute, withPad = true, ...rest }) => {
  return (
    <TouchableOpacity
      {...rest}
      style={tw`${
        isAbsolute
          ? "absolute left-6 top-12 bg-[#46484970] shadow-lg rounded-full px-2 py-0.5"
          : `${withPad ? "px-6" : ""}  mb-3`
      }`}
    >
      <AntDesign
        name="arrowleft"
        size={18}
        color={isAbsolute ? "white" : iconCol}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
