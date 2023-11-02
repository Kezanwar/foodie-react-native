import { Typography } from "components/typography";
import React from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import tw from "theme/tailwind";

type Props = TouchableOpacityProps & {
  text: string;
  isLoading?: boolean;
};

const LoadingButton: React.FC<Props> = ({ text = "", isLoading, ...rest }) => {
  return (
    <TouchableOpacity
      {...rest}
      style={tw`w-full p-3 bg-grey-950 dark:bg-grey-200 rounded-md items-center`}
    >
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Typography
          variant="h6"
          color="white"
          style="text-[3.75] font-semi-bold leading-[0]"
        >
          {text}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

export default LoadingButton;
