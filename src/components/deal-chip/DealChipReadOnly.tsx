import React, { FC } from "react";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import tw from "theme/tailwind";

type Props = {
  label: string;
  icon?: boolean;
  applyMaxWidth?: boolean;
};

const iconCol = tw.color("primary-light");

const DealChipReadOnly: FC<Props> = ({
  label,
  icon = true,
  applyMaxWidth = false,
}) => {
  return (
    <View
      style={tw`border-dashed flex-row items-center justify-between  gap-1.5 border border-grey-300 px-2.5 py-1.5 rounded-full `}
    >
      {icon && <AntDesign name="tago" size={16} color={iconCol} />}
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={tw`font-medium text-3.25  ${
          icon && applyMaxWidth ? "flex-shrink-1 max-w-[33vw]" : ""
        } ${!icon ? "text-type-light-disabled" : ""}`}
      >
        {label}
      </Text>
    </View>
  );
};

export default DealChipReadOnly;
