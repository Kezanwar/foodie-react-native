import { TouchableOpacity } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";
import { Image } from "expo-image";
import Typography, { LEADING_TIGHT } from "components/typography";
import Feather from "@expo/vector-icons/Feather";

type Props = {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  onPress: () => void;
};

const roundedStyle = tw`w-13 h-13 rounded-full`;

const success_main = tw.color("success-main");

const UserAvatar: FC<Props> = ({ avatarUrl, firstName, lastName, onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={tw.style(roundedStyle, {
        "bg-success-main/20 items-center justify-center": !avatarUrl,
      })}
    >
      {avatarUrl ? (
        <Image style={roundedStyle} source={{ uri: avatarUrl }} />
      ) : !firstName && !lastName ? (
        <Feather name="user" size={23} color={success_main} />
      ) : (
        <Typography
          variant="h6"
          style={`font-regular text-success-main ${LEADING_TIGHT}  text-6`}
        >
          {firstName.charAt(0)}
          {lastName.charAt(0)}
        </Typography>
      )}
    </TouchableOpacity>
  );
};

export default UserAvatar;
