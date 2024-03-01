import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { FC } from "react";

import { Typography } from "components/typography";

import tw from "theme/tailwind";
import { TypographyTextColors } from "components/typography/Typography";

type Props = TouchableOpacityProps & {
  bgColor: string;
  color: TypographyTextColors;
  text: string;
};

const ChipButton: FC<Props> = ({ bgColor, color, text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`bg-${bgColor} px-3 py-1 rounded-full`}
    >
      <Typography style="font-regular text-3" variant="body2" color={color}>
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

export default ChipButton;
