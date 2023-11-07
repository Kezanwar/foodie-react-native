import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { FC } from "react";
import { Typography } from "components/typography";

type Props = TouchableOpacityProps & {
  label: string;
  textStyle?: string;
};

const TextButton: FC<Props> = ({ label, onPress, style, textStyle = "" }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Typography
        variant="body2"
        color="primary.main"
        style={`text-center font-semi-bold ${textStyle}`}
      >
        {label}
      </Typography>
    </TouchableOpacity>
  );
};

export default TextButton;
