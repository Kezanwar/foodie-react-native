import { Typography } from "components/typography";
import React from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import tw from "theme/tailwind";

type Props = TouchableOpacityProps & {
  text: string;
};

const LoadingButton: React.FC<Props> = ({ text = "", ...rest }) => {
  return (
    <TouchableOpacity
      {...rest}
      style={tw`w-full p-3 bg-grey-950 rounded-md items-center`}
    >
      <Typography
        variant="h6"
        color="white"
        style="text-[3.75] font-semi-bold leading-[0]"
      >
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

export default LoadingButton;
