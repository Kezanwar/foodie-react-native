import { View } from "react-native";
import React, { FC, ReactNode } from "react";
import tw from "theme/tailwind";

type Props = { children: ReactNode };

const SectionCard: FC<Props> = ({ children }) => {
  return <View style={tw`bg-white p-6`}>{children}</View>;
};

export default SectionCard;
