import { GestureResponderEvent } from "react-native";
import React, { FC } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import IconButton from "../icon-button";
import tw from "theme/tailwind";

type Props = {
  liked: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

const LikeButton: FC<Props> = ({ liked, onPress }) => {
  return (
    <IconButton onPress={onPress}>
      <FontAwesome
        name={liked ? "heart" : "heart-o"}
        size={19}
        color={liked ? tw.color("error-main") : tw.color("grey-900")}
      />
    </IconButton>
  );
};

export default LikeButton;
