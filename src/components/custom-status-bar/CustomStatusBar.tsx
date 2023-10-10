import React, { FC } from "react";
import { RnColorScheme } from "twrnc";
import { StatusBar } from "expo-status-bar";

type Props = {
  colorScheme: RnColorScheme;
};

const LIGHT = "light";

const DARK = "dark";

const CustomStatusBar: FC<Props> = ({ colorScheme }) => {
  return <StatusBar style={colorScheme === LIGHT ? DARK : LIGHT} />;
};

export default CustomStatusBar;
