import { View } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";

type Props = { spacing?: string; flex?: "flex-1" };

const Spacer: FC<Props> = ({ spacing = "", flex = "" }) => {
  return <View style={tw`${spacing} ${flex}`} />;
};

export default Spacer;
