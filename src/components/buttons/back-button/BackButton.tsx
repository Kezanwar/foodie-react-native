import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";
import Feather from "@expo/vector-icons/Feather";

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
          ? "absolute left-5 top-12 bg-grey-800/60 rounded-full px-2 py-0.5"
          : `${withPad ? "px-5" : ""}  mb-3`
      }`}
    >
      <Feather
        name="arrow-left"
        size={18}
        color={isAbsolute ? "white" : iconCol}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
