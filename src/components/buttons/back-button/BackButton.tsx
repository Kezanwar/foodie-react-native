import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";
import { Typography } from "components/typography";

import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = TouchableOpacityProps;

const iconCol = tw.color("grey-500");

const BackButton: FC<Props> = (props) => {
  return (
    <TouchableOpacity {...props} style={tw`gap-1 flex-row items-center`}>
      <MaterialCommunityIcons name="arrow-left" size={20} color={iconCol} />
      <Typography style="font-regular text-3.2 text-grey-500" variant="body1">
        Back
      </Typography>
    </TouchableOpacity>
  );
};

export default BackButton;
