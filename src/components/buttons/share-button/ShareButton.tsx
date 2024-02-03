import { GestureResponderEvent } from "react-native";
import React, { FC } from "react";
import IconButton from "../icon-button";
import tw from "theme/tailwind";
import { Ionicons } from "@expo/vector-icons";

type Props = { onPress: (e: GestureResponderEvent) => void };

const ShareButton: FC<Props> = ({ onPress }) => {
  return (
    <IconButton style={tw`-m-0.5 `} onPress={onPress}>
      <Ionicons
        name="md-share-outline"
        size={20}
        color={tw.color("grey-900")}
      />
    </IconButton>
  );
};

export default ShareButton;
