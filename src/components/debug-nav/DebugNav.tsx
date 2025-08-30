import { useAppSelector } from "hooks/useAppSelector";
import React from "react";
import { TouchableOpacity } from "react-native";
import tw from "theme/tailwind";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { COMMON_ROUTES } from "constants/routes";

const DebugMenu = () => {
  const visible = useAppSelector((state) => state.debug.active);
  const nav = useNavigation();

  //@ts-ignore
  const navToDebug = () => nav.navigate(COMMON_ROUTES.DEBUG);

  if (!visible) return null;

  return (
    <TouchableOpacity
      onPress={navToDebug}
      style={tw`bg-error-main mx-4 absolute bottom-24 rounded-full  left-0  z-50  shadow-lg px-2 py-2 `}
    >
      <Ionicons name="bug-outline" size={20} color="white" />
    </TouchableOpacity>
  );
};

export default DebugMenu;
