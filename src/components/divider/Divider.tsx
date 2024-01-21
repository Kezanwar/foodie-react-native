import { Text, View } from "react-native";
import React, { FC } from "react";
import { IColVariants } from "types/colors";
import tw from "theme/tailwind";

type Props = {
  color?: IColVariants;
  my?: string;
};

const Divider: FC<Props> = ({ color = "grey", my = "5" }) => {
  const bg = color === "grey" ? "bg-grey-200" : `bg-${color}-main`;
  return <View style={tw`w-full  h-[1px] ${bg} my-${my}`} />;
};

export default Divider;
