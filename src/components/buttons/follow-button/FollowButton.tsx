import { GestureResponderEvent, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";
import { Typography } from "components/typography";

type Props = {
  onPress: (e: GestureResponderEvent) => void;
  following: boolean;
};

const FollowButton: FC<Props> = ({ onPress, following }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`rounded-full w-17 items-center justify-center ${
        following ? "border border-primary-main  w-22 " : "bg-grey-200 w-17"
      } py-1.75 px-3`}
    >
      <Typography
        variant="body2"
        color={following ? "primary.main" : "text.primary"}
        style="-m-1 text-3.25"
      >
        {following ? "Following" : "Follow"}
      </Typography>
    </TouchableOpacity>
  );
};

export default FollowButton;
