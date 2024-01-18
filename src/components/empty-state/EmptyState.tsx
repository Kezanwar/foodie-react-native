import { View } from "react-native";
import React, { FC, ReactNode } from "react";
import tw from "theme/tailwind";
import { Typography } from "components/typography";
import { AntDesign } from "@expo/vector-icons";

import RoundedButton from "components/buttons/rounded-button/RoundedButton";

type Props = {
  title: string;
  style?: string;
  description: string;
  actionText: string;
  action: () => void;
  actionIcon?: ReactNode;
};

const EmptyState: FC<Props> = ({
  title,
  description,
  action,
  actionText,
  style = "",
  actionIcon,
}) => {
  return (
    <View style={tw`p-6 flex-1 bg-white items-center ${style}`}>
      <AntDesign name="frowno" size={24} color={tw.color("primary-main")} />
      <Typography
        variant="h6"
        style="font-medium text-center mb-3 mt-5 text-xl"
        color="text.primary"
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        style="text-center mb-5"
        color="text.secondary"
      >
        {description}
      </Typography>
      <RoundedButton icon={actionIcon} onPress={action} text={actionText} />
    </View>
  );
};

export default EmptyState;
