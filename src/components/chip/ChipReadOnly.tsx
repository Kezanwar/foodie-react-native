import { Text, View } from "react-native";
import React, { FC } from "react";

import tw from "theme/tailwind";

type Props = {
  label: string;
  size?: "md" | "lg";
  variant?: "filled" | "outlined";
};

const ChipReadOnly: FC<Props> = React.memo(
  ({ label, size = "md", variant = "filled" }) => {
    return (
      <View
        style={tw`py-1 px-3 ${
          variant === "filled" ? " bg-grey-800" : "border border-grey-200"
        } rounded-full`}
      >
        <Text
          style={tw`font-light text-white  text-[${
            size === "md" ? "2.5" : "3.15"
          }]`}
        >
          {label}
        </Text>
      </View>
    );
  }
);

export default ChipReadOnly;
