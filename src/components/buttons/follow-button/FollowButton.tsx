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
      style={tw`rounded-full min-w-17 border items-center justify-center ${
        following ? "border-primary-main  min-w-22 " : " border-grey-800"
      } py-1.5 px-2.5`}
    >
      <Typography
        variant="body2"
        color={following ? "primary.main" : "text.primary"}
        style="-m-1 font-regular text-3.5 "
      >
        {following ? "Following" : "Follow"}
      </Typography>
    </TouchableOpacity>
  );
};

export default FollowButton;
