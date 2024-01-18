import { Typography } from "components/typography";
import React, { FC, ReactNode } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import tw from "theme/tailwind";

type Props = TouchableOpacityProps & {
  text: string;
  icon?: ReactNode;
};

const RoundedButton: FC<Props> = ({ text = "", icon, ...rest }) => {
  return (
    <TouchableOpacity
      {...rest}
      style={tw`px-3 py-2 flex-row gap-2 rounded-md bg-primary-main-04 items-center`}
    >
      {icon}
      <Typography variant="body2" style="font-semi-bold" color="primary.main">
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

export default RoundedButton;
