import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { FC, ReactNode } from "react";
import { Typography } from "components/typography";
import tw from "theme/tailwind";

type Props = TouchableOpacityProps & {
  icon: ReactNode;
  text: string;
  withBorder?: boolean;
};

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
        style="font-light leading-[0]  text-4"
      >
        {text}
      </Typography>
    </TouchableOpacity>
  );
};

export default ListButton;
