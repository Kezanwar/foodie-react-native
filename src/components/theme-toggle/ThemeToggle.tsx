import { DARK, LIGHT } from "constants/theme";
import useAppDispatch from "hooks/useAppDispatch";
import { useAppSelector } from "hooks/useAppSelector";
import React from "react";
import { TouchableOpacity } from "react-native";
import { setTheme } from "store/theme/theme.slice";
import tw from "theme/tailwind";
import { useAppColorScheme } from "twrnc";

import { Feather } from "@expo/vector-icons";

type Props = {};

const ThemeToggle: React.FC<Props> = (props) => {
  const [, , setColorScheme] = useAppColorScheme(tw);

  const theme = useAppSelector((state) => state.theme.theme);

  const dispatch = useAppDispatch();

  const toggleColorScheme = () => {
    const newTheme = theme === LIGHT ? DARK : LIGHT;
    setColorScheme(newTheme);
    dispatch(setTheme(newTheme));
  };

  return (
    <TouchableOpacity style={tw`w-6`} onPress={toggleColorScheme}>
      {theme === DARK ? (
        <Feather name="sun" size={22} color="white" />
      ) : (
        <Feather name="moon" size={22} color={tw.color("grey-950")} />
      )}
    </TouchableOpacity>
  );
};

export default ThemeToggle;
