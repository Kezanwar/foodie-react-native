import { TouchableOpacity } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";
import { Image } from "expo-image";
import Typography, { LEADING_TIGHT } from "components/typography";

type Props = {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  onPress: () => void;
};

const roundedStyle = tw`w-14 h-14 rounded-full`;

const UserAvatar: FC<Props> = ({ avatarUrl, firstName, lastName, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={tw.style(roundedStyle, {
        "bg-success-main items-center justify-center": !avatarUrl,
      })}
    >
      {avatarUrl ? (
        <Image style={roundedStyle} source={{ uri: avatarUrl }} />
      ) : (
        <Typography
          variant="h6"
          style={`font-regular ${LEADING_TIGHT}  text-6`}
          color="white"
        >
          {firstName.charAt(0)}
          {lastName.charAt(0)}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

export default UserAvatar;
