import { View } from "react-native";
import React, { FC, ReactNode } from "react";
import tw from "theme/tailwind";

type Props = { children: ReactNode; style?: string };

const ChipContainer: FC<Props> = ({ children, style = "" }) => {
  return <View style={tw`flex-wrap flex-row gap-2  ${style}`}>{children}</View>;
};

export default ChipContainer;
