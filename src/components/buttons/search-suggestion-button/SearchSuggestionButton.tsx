import { TouchableOpacity } from "react-native";
import React, { FC } from "react";
import tw from "theme/tailwind";
import { Typography } from "components/typography";
import { Feather } from "@expo/vector-icons";

type Props = { label: string; onPress: (text: string) => void };

const iconCol = tw.color("primary-main");

const SearchSuggestionButton: FC<Props> = ({ label, onPress }) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(label)}
      style={tw`flex-row gap-3 items-center `}
    >
      <Feather name="arrow-up-right" size={18} color={iconCol} />
      <Typography variant="body1">{label}</Typography>
    </TouchableOpacity>
  );
};

export default SearchSuggestionButton;
