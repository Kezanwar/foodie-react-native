import Typography, { LEADING_TIGHT } from "components/typography";

import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import tw from "theme/tailwind";

type Props = TouchableOpacityProps & {
  text: string;
  isLoading?: boolean;
  subtle?: boolean;
  icon?: ReactNode;
};

const FullWidthButton: React.FC<Props> = ({
  text = "",
  isLoading,
  subtle = false,
  icon,
  ...rest
}) => {
  return (
    <TouchableOpacity
      {...rest}
      style={tw`w-full p-3 flex-row gap-2 justify-center items-center rounded-lg ${
        subtle ? "border border-grey-300" : "bg-grey-900 dark:bg-grey-200"
      } `}
    >
      {isLoading ? <ActivityIndicator size="small" /> : icon}
      <Typography
        variant="h6"
        color={isLoading ? "text.secondary" : subtle ? "text.primary" : "white"}
        style={`text-[3.75] font-bold ${LEADING_TIGHT} `}
      >
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

export default FullWidthButton;
