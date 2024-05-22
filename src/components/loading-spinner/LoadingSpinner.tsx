import { ActivityIndicator } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";

type Props = {
  mt?: number;
};

const PRIM = tw.color("primary-main");

const LoadingSpinner: FC<Props> = ({ mt = 5 }) => {
  return (
    <ActivityIndicator style={tw`mt-[${mt}]`} color={PRIM} size={"small"} />
  );
};

export default LoadingSpinner;
