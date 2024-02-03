import { GestureResponderEvent } from "react-native";
import React, { FC } from "react";
import { AntDesign } from "@expo/vector-icons";
import IconButton from "../icon-button";
import tw from "theme/tailwind";

type Props = {
  liked: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

const LikeButton: FC<Props> = ({ liked, onPress }) => {
  return (
    <IconButton onPress={onPress}>
      <AntDesign
        name={liked ? "heart" : "hearto"}
        size={19}
        color={liked ? tw.color("error-main") : tw.color("grey-900")}
      />
    </IconButton>
  );
};

export default LikeButton;
