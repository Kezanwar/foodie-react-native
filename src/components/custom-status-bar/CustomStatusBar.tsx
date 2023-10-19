import React, { FC } from "react";
import { StatusBar } from "expo-status-bar";

import { useAppSelector } from "hooks/useAppSelector";
import { DARK, LIGHT } from "constants/theme";

const CustomStatusBar: FC = () => {
  const theme = useAppSelector((state) => state.theme.theme);

  return <StatusBar style={theme === LIGHT ? DARK : LIGHT} />;
};

export default CustomStatusBar;
