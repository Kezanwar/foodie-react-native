import { ActivityIndicator, View } from "react-native";
import React, { FC } from "react";
import { Typography } from "components/typography";
import tw from "theme/tailwind";
import TextButton from "components/buttons/text-button";

type Props = {
  headerText: string;
  rightActionText?: string;
  rightActionOnPress?: () => void;
  loading?: boolean;
  mb?: boolean;
  fontSize?: "large" | "medium";
};

const TextActionHeader: FC<Props> = ({
  headerText,
  rightActionText = "",
  rightActionOnPress,
  loading,
  mb = true,
  fontSize = "large",
}) => {
  return (
    <View
      style={tw` ${mb ? "mb-4" : ""} flex-row items-center justify-between `}
    >
      <Typography
        variant="h6"
        style={`font-semi-bold leading-tight ${
          fontSize === "medium" ? "text-5" : ""
        } `}
      >
        {headerText}
      </Typography>
      {loading ? (
        <ActivityIndicator size={"small"} color={tw.color("primary-main")} />
      ) : (
        <TextButton
          label={rightActionText}
          textStyle="font-medium leading-tight"
          onPress={rightActionOnPress}
        />
      )}
    </View>
  );
};

export default TextActionHeader;
