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
  subtle?: boolean;
};

const FullWidthButton: React.FC<Props> = ({
  text = "",
  isLoading,
  subtle = false,
  ...rest
}) => {
  return (
    <TouchableOpacity
      {...rest}
      style={tw`w-full p-3 rounded-md ${
        subtle ? "border border-grey-950" : "bg-grey-900 dark:bg-grey-200"
      } items-center`}
    >
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Typography
          variant="h6"
          color={subtle ? "text.primary" : "white"}
          style={"text-[3.75] font-semi-bold leading-[0]"}
        >
          {text}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

export default FullWidthButton;
