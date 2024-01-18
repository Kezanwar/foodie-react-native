import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { FC } from "react";

import { Typography } from "components/typography";
import { IColVariants } from "types/colors";

import tw from "theme/tailwind";

type Props = TouchableOpacityProps & {
  color: IColVariants;
  text: string;
};

const ChipButton: FC<Props> = ({ color, text }) => {
  return (
    <TouchableOpacity style={tw`bg-${color}-main px-2 py-0.5 rounded-full`}>
      <Typography
        style="font-semi-bold text-2.75"
        variant="body2"
        color="white"
      >
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

export default ChipButton;
