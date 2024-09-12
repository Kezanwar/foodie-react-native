import { View } from "react-native";
import React, { FC, ReactNode } from "react";
import tw from "theme/tailwind";

type Props = { children: ReactNode; style?: string };

const SectionCard: FC<Props> = ({ children, style }) => {
  return <View style={tw`bg-white p-5 ${style || ""}`}>{children}</View>;
};

export default SectionCard;
