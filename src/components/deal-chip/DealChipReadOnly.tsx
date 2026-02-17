import React, { FC } from "react";
import { Dimensions, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import tw from "theme/tailwind";

type Props = {
  label: string;
  icon?: boolean;
  applyMaxWidth?: boolean;
};

const iconCol = tw.color("primary-light");

const MAX_LABEL_WIDTH = Dimensions.get("window").width * 0.33;

const DealChipReadOnly: FC<Props> = ({
  label,
  icon = true,
  applyMaxWidth = false,
}) => {
  return (
    <View
      style={tw`border-dashed flex-row items-center justify-between  gap-1.5 border border-grey-300 px-2.5 py-1.5 rounded-full `}
    >
      {icon && <AntDesign name="tag" size={16} color={iconCol} />}
      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[
          tw`font-medium text-3.25 ${!icon ? "text-type-light-disabled" : ""}`,
          icon && applyMaxWidth && { flexShrink: 1, maxWidth: MAX_LABEL_WIDTH },
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

export default DealChipReadOnly;
