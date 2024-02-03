import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import React, { FC, memo } from "react";

import tw from "theme/tailwind";

type Props = TouchableOpacityProps & {
  label: string;
  selected: boolean;
  slug: string;
  onSelect: (slug: string) => void;
};

const ChipSelect: FC<Props> = ({ label, selected, onSelect, slug }) => {
  return (
    <TouchableOpacity
      style={tw`py-1 px-3 rounded-full ${
        selected ? "bg-grey-800" : "bg-grey-200"
      }`}
      onPress={() => onSelect(slug)}
    >
      <Text
        style={tw`font-light text-[3] ${
          selected ? "text-white" : "text-type-light-primary"
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default memo(ChipSelect);
