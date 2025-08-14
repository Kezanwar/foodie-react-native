import { Pressable, View } from "react-native";
import React, { FC } from "react";
import Typography from "components/typography";
import tw from "theme/tailwind";
import Feather from "@expo/vector-icons/Feather";

type Props = {
  label: string;
  value: boolean;
  error?: string;
  handleChange: (b: boolean) => void;
  containerStyle?: string;
};

const CustomCheckbox: FC<Props> = ({
  label,
  value,
  handleChange,
  error,
  containerStyle,
}) => {
  return (
    <View style={tw`${containerStyle || ""}`}>
      <Pressable
        onPress={() => {
          handleChange(!value);
        }}
        style={tw`flex-row items-center`}
      >
        <View
          style={tw`w-5 h-5 rounded border-2 border-grey-400  dark:border-grey-600 
          ${
            value
              ? "bg-primary-light border-primary-light"
              : "bg-white dark:bg-grey-900"
          } 
          items-center justify-center`}
        >
          {value && <Feather name="check" size={16} color="white" />}
        </View>
        <Typography
          color="text.secondary"
          style={"font-regular text-sm ml-2 leading-[0] flex-1"}
          numberOfLines={2}
        >
          {label}
        </Typography>
      </Pressable>
      {error && (
        <Typography
          variant="body2"
          style="text-[3] mt-1 ml-8"
          color="error.main"
        >
          {error}
        </Typography>
      )}
    </View>
  );
};

export default CustomCheckbox;
