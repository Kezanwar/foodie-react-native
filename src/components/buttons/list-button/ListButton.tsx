import { TouchableOpacity, TouchableOpacityProps, View } from "react-native";
import React, { FC, ReactNode } from "react";
import { Entypo } from "@expo/vector-icons";
import { Typography } from "components/typography";
import tw from "theme/tailwind";

type Props = TouchableOpacityProps & {
  icon: ReactNode;
  text: string;
  withBorder?: boolean;
};

const chevronCol = tw.color("grey-500");

const ListButton: FC<Props> = ({ icon, onPress, text, withBorder }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`py-3.5 flex-row  items-center  gap-3 ${
        withBorder ? "border-b border-b-grey-200" : ""
      }`}
    >
      {icon}
      <Typography
        variant="body1"
        color="text.primary"
        style="font-regular leading-[0]  text-4"
      >
        {text}
      </Typography>
      <View style={tw`flex-1 items-end`}>
        <Entypo name="chevron-small-right" size={24} color={chevronCol} />
      </View>
    </TouchableOpacity>
  );
};

export default ListButton;
